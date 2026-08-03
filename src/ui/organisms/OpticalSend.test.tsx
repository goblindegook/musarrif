import { act, cleanup, screen, waitFor } from '@testing-library/preact'
import QRCode from 'qrcode'
import { afterEach, expect, it, vi } from 'vitest'
import { renderWithProviders } from '../../test/fixtures'
import { OpticalSend } from './OpticalSend'

// Not imported from production: a test asserting behaviour by importing the same constant
// production uses to produce it would never notice a regression in the constant itself.
const FRAME_INTERVAL_MS = 125

// toCanvas must resolve to a promise now that the component chains a `.catch` onto it.
vi.mock('qrcode', () => ({ default: { toCanvas: vi.fn().mockResolvedValue(undefined) } }))

// Large enough (400 entries) that the gzip output spans multiple OPTICAL_CHUNK_BYTES frames —
// same shape as the LARGE_PAYLOAD fixture in optical-transfer.test.ts, which already asserts
// this produces more than one frame.
const LARGE_PAYLOAD = JSON.stringify({
  version: 1,
  srs: Object.fromEntries(
    Array.from({ length: 400 }, (_, index) => [
      `ktb-${index}|past|indicative|3ms`,
      { interval: index, ef: 2.5, repetitions: index % 5, dueDate: `2026-08-${(index % 28) + 1}` },
    ]),
  ),
})

// setInterval/clearInterval are faked so the frame-cycling test can advance time deterministically;
// everything else (Date, setTimeout, the real gzip/digest work behind encodeFrames) stays
// real, so a plain real-time tick is enough to flush it without touching RTL's waitFor internals.
async function flushPendingWork() {
  for (let tick = 0; tick < 15; tick++) {
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0))
    })
  }
}

afterEach(() => {
  cleanup()
  vi.clearAllMocks()
  vi.useRealTimers()
})

it('explains how to pair the two devices', () => {
  renderWithProviders(<OpticalSend payload='{"version":1}' />)

  expect(
    screen.getByText(
      'On your other device, open Muṣarrif and choose Receive from device, then point its camera at this screen. Keep this screen visible until the other device says it is done.',
    ),
  ).toBeInTheDocument()
})

it('draws the encoded payload as a QR code', async () => {
  renderWithProviders(<OpticalSend payload='{"version":1}' />)

  await waitFor(() => expect(vi.mocked(QRCode.toCanvas)).toHaveBeenCalled())

  const [, frame] = vi.mocked(QRCode.toCanvas).mock.calls[0]
  expect(frame).toMatch(/^0\|1\|[0-9a-f]{8}\|/)
})

it('cycles through multiple frames on an interval and wraps back to the first', async () => {
  vi.useFakeTimers({ toFake: ['setInterval', 'clearInterval'] })

  renderWithProviders(<OpticalSend payload={LARGE_PAYLOAD} />)
  await flushPendingWork()

  const firstFrame = vi.mocked(QRCode.toCanvas).mock.calls[0]?.[1] as string
  expect(firstFrame).toMatch(/^0\|/)
  const total = Number(firstFrame.split('|')[1])
  expect(total).toBeGreaterThan(1)

  // Each draw is queued via a promise (see OpticalSend.tsx), so advancing the interval only
  // schedules the next toCanvas call — a microtask tick is needed for it to actually run.
  await act(async () => {
    vi.advanceTimersByTime(FRAME_INTERVAL_MS)
    await Promise.resolve()
  })
  const secondFrame = vi.mocked(QRCode.toCanvas).mock.calls[1]?.[1] as string
  expect(secondFrame).toMatch(/^1\|/)

  await act(async () => {
    vi.advanceTimersByTime(FRAME_INTERVAL_MS * (total - 1))
    await Promise.resolve()
  })
  const wrappedFrame = vi.mocked(QRCode.toCanvas).mock.calls.at(-1)?.[1] as string
  expect(wrappedFrame).toMatch(/^0\|/)
})
