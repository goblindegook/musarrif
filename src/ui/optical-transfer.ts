const OPTICAL_CHUNK_BYTES = 400

const FRAME_SEPARATOR = '|'

interface FrameCollector {
  readonly digest: string | null
  readonly total: number
  readonly chunks: ReadonlyMap<number, string>
}

export const EMPTY_COLLECTOR: FrameCollector = { digest: null, total: 0, chunks: new Map() }

export async function encodeFrames(payload: string): Promise<readonly string[]> {
  const compressed = await gzip(new TextEncoder().encode(payload))
  const digest = await shortDigest(compressed)
  const total = Math.max(1, Math.ceil(compressed.length / OPTICAL_CHUNK_BYTES))

  return Array.from({ length: total }, (_, seq) => {
    const chunk = compressed.subarray(seq * OPTICAL_CHUNK_BYTES, (seq + 1) * OPTICAL_CHUNK_BYTES)
    return [seq, total, digest, toBase64(chunk)].join(FRAME_SEPARATOR)
  })
}

export function collectFrame(collector: FrameCollector, raw: string): FrameCollector {
  const parts = raw.split(FRAME_SEPARATOR)
  if (parts.length !== 4) return collector

  const [seqText, totalText, digest, data] = parts
  const seq = Number(seqText)
  const total = Number(totalText)
  if (!Number.isInteger(seq) || !Number.isInteger(total)) return collector
  if (total < 1 || seq < 0 || seq >= total) return collector
  if (digest.length === 0 || data.length === 0) return collector

  // A different digest means the sender restarted with different data, so previous chunks are stale.
  const sameDigest = collector.digest === digest
  // Same digest but a conflicting total is a corrupt/adversarial frame, not a legitimate restart — reject it
  // rather than letting it silently override the total already established for this transfer.
  if (sameDigest && collector.total !== total) return collector

  const base = sameDigest ? collector : EMPTY_COLLECTOR
  if (base.chunks.has(seq)) return base

  const chunks = new Map(base.chunks)
  chunks.set(seq, data)
  return { digest, total, chunks }
}

export function isComplete(collector: FrameCollector): boolean {
  return collector.total > 0 && collector.chunks.size === collector.total
}

export async function reassembleFrames(collector: FrameCollector): Promise<string | null> {
  if (!isComplete(collector)) return null

  try {
    const compressed = concat(
      Array.from({ length: collector.total }, (_, seq) => fromBase64(collector.chunks.get(seq) as string)),
    )
    if ((await shortDigest(compressed)) !== collector.digest) return null
    return new TextDecoder().decode(await gunzip(compressed))
  } catch {
    return null
  }
}

export function isOpticalTransferSupported(): boolean {
  return navigator?.mediaDevices?.getUserMedia != null
}

async function gzip(bytes: Uint8Array<ArrayBuffer>): Promise<Uint8Array<ArrayBuffer>> {
  const stream = new Blob([bytes]).stream().pipeThrough(new CompressionStream('gzip'))
  return new Uint8Array(await new Response(stream).arrayBuffer())
}

async function gunzip(bytes: Uint8Array<ArrayBuffer>): Promise<Uint8Array<ArrayBuffer>> {
  const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'))
  return new Uint8Array(await new Response(stream).arrayBuffer())
}

async function shortDigest(bytes: Uint8Array<ArrayBuffer>): Promise<string> {
  const hash = new Uint8Array(await crypto.subtle.digest('SHA-256', bytes))
  return Array.from(hash.subarray(0, 4), (byte) => byte.toString(16).padStart(2, '0')).join('')
}

function toBase64(bytes: Uint8Array<ArrayBuffer>): string {
  return btoa(String.fromCharCode(...bytes))
}

function fromBase64(value: string): Uint8Array<ArrayBuffer> {
  return Uint8Array.from(atob(value), (char) => char.charCodeAt(0))
}

function concat(parts: readonly Uint8Array<ArrayBuffer>[]): Uint8Array<ArrayBuffer> {
  const merged = new Uint8Array(parts.reduce((size, part) => size + part.length, 0))
  parts.reduce((offset, part) => {
    merged.set(part, offset)
    return offset + part.length
  }, 0)
  return merged
}
