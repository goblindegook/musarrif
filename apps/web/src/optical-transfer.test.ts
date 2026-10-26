import { expect, it } from 'vitest'
import { collectFrame, EMPTY_COLLECTOR, encodeFrames, isComplete, reassembleFrames } from './optical-transfer'

const SMALL_PAYLOAD = JSON.stringify({ version: 1, settings: { language: 'en' }, favouriteVerbs: ['ktb-1'] })

const OTHER_PAYLOAD = JSON.stringify({ version: 1, settings: { language: 'pt' }, favouriteVerbs: ['drs-1'] })

const LARGE_PAYLOAD = JSON.stringify({
  version: 1,
  srs: Object.fromEntries(
    Array.from({ length: 400 }, (_, index) => [
      `ktb-${index}|past|indicative|3ms`,
      { interval: index, ef: 2.5, repetitions: index % 5, dueDate: `2026-08-${(index % 28) + 1}` },
    ]),
  ),
})

it('round-trips a payload through encoding and reassembly', async () => {
  const frames = await encodeFrames(SMALL_PAYLOAD)
  const collector = frames.reduce(collectFrame, EMPTY_COLLECTOR)

  expect(isComplete(collector)).toBe(true)
  expect(await reassembleFrames(collector)).toBe(SMALL_PAYLOAD)
})

it('splits a large payload across several frames', async () => {
  const frames = await encodeFrames(LARGE_PAYLOAD)

  expect(frames.length).toBeGreaterThan(1)
  expect(await reassembleFrames(frames.reduce(collectFrame, EMPTY_COLLECTOR))).toBe(LARGE_PAYLOAD)
})

it('reassembles when frames arrive out of order and duplicated', async () => {
  const frames = await encodeFrames(LARGE_PAYLOAD)
  const scrambled = [...frames].reverse().concat(frames[0], frames[0], frames.at(-1) as string)

  expect(await reassembleFrames(scrambled.reduce(collectFrame, EMPTY_COLLECTOR))).toBe(LARGE_PAYLOAD)
})

it('reports an incomplete collection until every chunk has arrived', async () => {
  const frames = await encodeFrames(LARGE_PAYLOAD)
  const partial = frames.slice(0, -1).reduce(collectFrame, EMPTY_COLLECTOR)

  expect(isComplete(partial)).toBe(false)
  expect(await reassembleFrames(partial)).toBeNull()
})

it('ignores frames that are malformed or out of range', () => {
  expect(collectFrame(EMPTY_COLLECTOR, 'not-a-frame')).toEqual(EMPTY_COLLECTOR)
  expect(collectFrame(EMPTY_COLLECTOR, '0|0|abcd1234|Zm9v')).toEqual(EMPTY_COLLECTOR)
  expect(collectFrame(EMPTY_COLLECTOR, '5|2|abcd1234|Zm9v')).toEqual(EMPTY_COLLECTOR)
  expect(collectFrame(EMPTY_COLLECTOR, 'x|2|abcd1234|Zm9v')).toEqual(EMPTY_COLLECTOR)
})

it('rejects a frame whose total conflicts with the total already established for the same digest', () => {
  const first = collectFrame(EMPTY_COLLECTOR, '0|3|deadbeef|Zm9v')
  const second = collectFrame(first, '1|2|deadbeef|YmFy')

  expect(second).toEqual(first)
  expect(isComplete(second)).toBe(false)
})

it('restarts collection when the sender switches to a different payload', async () => {
  const first = await encodeFrames(SMALL_PAYLOAD)
  const second = await encodeFrames(OTHER_PAYLOAD)
  const collector = [...first, ...second].reduce(collectFrame, EMPTY_COLLECTOR)

  expect(await reassembleFrames(collector)).toBe(OTHER_PAYLOAD)
})

it('rejects a complete set whose chunks do not match the advertised digest', async () => {
  const frames = await encodeFrames(SMALL_PAYLOAD)
  expect(frames).toHaveLength(1)

  const [seq, total, digest] = (frames[0] as string).split('|')
  const collector = collectFrame(EMPTY_COLLECTOR, [seq, total, digest, btoa('tampered')].join('|'))

  expect(isComplete(collector)).toBe(true)
  expect(await reassembleFrames(collector)).toBeNull()
})
