import { act, cleanup, screen, waitFor } from '@testing-library/preact'
import { afterEach, expect, it, vi } from 'vitest'
import { renderWithProviders } from '../../test/fixtures'
import { encodeFrames } from '../optical-transfer'
import { OpticalReceive } from './OpticalReceive'

const scanner = vi.hoisted(() => ({
  stop: vi.fn(),
  callback: null as ((result?: { getText: () => string }) => void) | null,
  shouldFail: false,
  // Lets a test hold "started" resolution open, so it can unmount the component in the window
  // between decodeFromConstraints being called and its promise settling. Defaults to an
  // already-resolved gate so every other test keeps its original, immediate-resolution timing.
  startGate: null as Promise<void> | null,
  receivedVideo: null as unknown,
}))

vi.mock('@zxing/browser', () => ({
  BrowserQRCodeReader: class {
    decodeFromConstraints(
      _constraints: unknown,
      video: unknown,
      callback: (result?: { getText: () => string }) => void,
    ) {
      scanner.receivedVideo = video
      if (scanner.shouldFail) return Promise.reject(new Error('NotAllowedError'))
      scanner.callback = callback
      return (scanner.startGate ?? Promise.resolve()).then(() => ({ stop: scanner.stop }))
    }
  },
}))

async function flushPendingWork() {
  for (let tick = 0; tick < 15; tick++) {
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0))
    })
  }
}

afterEach(() => {
  cleanup()
  scanner.callback = null
  scanner.shouldFail = false
  scanner.startGate = null
  scanner.receivedVideo = null
  vi.clearAllMocks()
})

it('passes a real video element to the decoder, not a styled-component wrapper', async () => {
  renderWithProviders(<OpticalReceive onComplete={vi.fn()} />)

  await waitFor(() => expect(scanner.receivedVideo).not.toBeNull())

  expect(scanner.receivedVideo).toBeInstanceOf(HTMLVideoElement)
})

it('emits the payload once every frame has been scanned', async () => {
  const payload = JSON.stringify({ version: 1, favouriteVerbs: ['ktb-1'] })
  const frames = await encodeFrames(payload)
  const onComplete = vi.fn()

  renderWithProviders(<OpticalReceive onComplete={onComplete} />)
  await waitFor(() => expect(scanner.callback).not.toBeNull())
  frames.forEach((frame) => {
    act(() => scanner.callback?.({ getText: () => frame }))
  })

  await waitFor(() => expect(onComplete).toHaveBeenCalledWith(payload))
})

it('shows how many parts have arrived while scanning', async () => {
  const frames = await encodeFrames(
    JSON.stringify({
      version: 1,
      srs: Object.fromEntries(Array.from({ length: 400 }, (_, i) => [`ktb-${i}|past|3ms`, { interval: i, ef: 2.5 }])),
    }),
  )
  renderWithProviders(<OpticalReceive onComplete={vi.fn()} />)
  await waitFor(() => expect(scanner.callback).not.toBeNull())
  act(() => scanner.callback?.({ getText: () => frames[0] as string }))

  expect(await screen.findByText(`Received 1 of ${frames.length} parts`)).toBeInTheDocument()
})

it('points the user back to file transfer when the camera cannot be opened', async () => {
  scanner.shouldFail = true

  renderWithProviders(<OpticalReceive onComplete={vi.fn()} />)

  expect(
    await screen.findByText(
      'Muṣarrif could not use the camera. You can still transfer your data with Export data and Import data.',
    ),
  ).toBeInTheDocument()
})

it('releases the camera when the receiver closes', async () => {
  const { unmount } = renderWithProviders(<OpticalReceive onComplete={vi.fn()} />)
  await waitFor(() => expect(scanner.callback).not.toBeNull())

  unmount()

  expect(scanner.stop).toHaveBeenCalled()
})

it('stops a scanner that finishes starting after the receiver has already closed', async () => {
  let releaseStart: () => void = () => {}
  scanner.startGate = new Promise((resolve) => {
    releaseStart = resolve
  })

  const { unmount } = renderWithProviders(<OpticalReceive onComplete={vi.fn()} />)
  // decodeFromConstraints has been called (it set the callback) but its "started" promise is still
  // held open by startGate, so unmounting now lands in the window before controls is assigned.
  await waitFor(() => expect(scanner.callback).not.toBeNull())

  unmount()
  releaseStart()

  await waitFor(() => expect(scanner.stop).toHaveBeenCalled())
})

it('does not re-emit onComplete when its identity changes after the transfer completes', async () => {
  const payload = JSON.stringify({ version: 1, favouriteVerbs: ['ktb-1'] })
  const frames = await encodeFrames(payload)
  const onComplete = vi.fn()

  const { rerender } = renderWithProviders(<OpticalReceive onComplete={(json) => onComplete(json)} />)
  await waitFor(() => expect(scanner.callback).not.toBeNull())
  frames.forEach((frame) => {
    act(() => scanner.callback?.({ getText: () => frame }))
  })
  await waitFor(() => expect(onComplete).toHaveBeenCalledTimes(1))

  // A fresh onComplete identity, as a parent re-rendering for an unrelated reason would produce.
  rerender(<OpticalReceive onComplete={(json) => onComplete(json)} />)
  await flushPendingWork()

  expect(onComplete).toHaveBeenCalledTimes(1)
})

it('does not re-emit onComplete when the still-live scanner recaptures the same looping transfer', async () => {
  const payload = JSON.stringify({ version: 1, favouriteVerbs: ['ktb-1'] })
  const frames = await encodeFrames(payload)
  const onComplete = vi.fn()

  renderWithProviders(<OpticalReceive onComplete={onComplete} />)
  await waitFor(() => expect(scanner.callback).not.toBeNull())
  frames.forEach((frame) => {
    act(() => scanner.callback?.({ getText: () => frame }))
  })
  await waitFor(() => expect(onComplete).toHaveBeenCalledTimes(1))

  // OpticalSend has no acknowledgment channel and loops its frames forever, so the still-live
  // scanner naturally recaptures the exact same frames again — this reproduces that recapture.
  frames.forEach((frame) => {
    act(() => scanner.callback?.({ getText: () => frame }))
  })
  await flushPendingWork()

  expect(onComplete).toHaveBeenCalledTimes(1)
})

it('still emits onComplete for a genuinely different transfer after one has already completed', async () => {
  const firstPayload = JSON.stringify({ version: 1, favouriteVerbs: ['ktb-1'] })
  const firstFrames = await encodeFrames(firstPayload)
  const secondPayload = JSON.stringify({ version: 1, favouriteVerbs: ['drs-1'] })
  const secondFrames = await encodeFrames(secondPayload)
  const onComplete = vi.fn()

  renderWithProviders(<OpticalReceive onComplete={onComplete} />)
  await waitFor(() => expect(scanner.callback).not.toBeNull())
  firstFrames.forEach((frame) => {
    act(() => scanner.callback?.({ getText: () => frame }))
  })
  await waitFor(() => expect(onComplete).toHaveBeenCalledWith(firstPayload))

  secondFrames.forEach((frame) => {
    act(() => scanner.callback?.({ getText: () => frame }))
  })

  await waitFor(() => expect(onComplete).toHaveBeenCalledWith(secondPayload))
  expect(onComplete).toHaveBeenCalledTimes(2)
})
