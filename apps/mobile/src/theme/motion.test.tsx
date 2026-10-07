import { renderHook, waitFor } from '@testing-library/react-native'
import { AccessibilityInfo } from 'react-native'
import { useMotionDuration } from './motion'

function mockReduceMotion(enabled: boolean) {
  jest.spyOn(AccessibilityInfo, 'isReduceMotionEnabled').mockResolvedValue(enabled)
  jest.spyOn(AccessibilityInfo, 'addEventListener').mockReturnValue({ remove: jest.fn() } as never)
}

afterEach(() => {
  jest.restoreAllMocks()
})

describe('useMotionDuration', () => {
  test('removes transitions when reduced motion is enabled', async () => {
    mockReduceMotion(true)
    const { result } = await renderHook(() => useMotionDuration(180))

    await waitFor(() => expect(AccessibilityInfo.isReduceMotionEnabled).toHaveBeenCalled())
    expect(result.current).toBe(0)
  })

  test('keeps the requested duration when reduced motion is disabled', async () => {
    mockReduceMotion(false)
    const { result } = await renderHook(() => useMotionDuration(180))

    await waitFor(() => expect(result.current).toBe(180))
  })
})
