jest.mock('react-native-safe-area-context', () => require('react-native-safe-area-context/jest/mock').default)
jest.mock('react-native-reanimated', () => {
  const { View } = require('react-native')
  const chain = () => {
    const builder = { duration: () => builder }
    return builder
  }
  return {
    __esModule: true,
    default: { View },
    FadeIn: chain(),
    FadeOut: chain(),
    LinearTransition: chain(),
    useSharedValue: (initial) => ({ value: initial }),
    useAnimatedStyle: () => ({}),
    withSequence: (...steps) => steps.at(-1),
    withTiming: (value) => value,
  }
})
