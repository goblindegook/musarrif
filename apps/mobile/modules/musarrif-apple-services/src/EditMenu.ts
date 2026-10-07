import { requireNativeModule } from 'expo-modules-core'

interface EditMenuModule {
  present(x: number, y: number, titles: readonly string[]): Promise<number | null>
  lookUp(term: string): Promise<void>
  translate(text: string): Promise<void>
}

const native = () => requireNativeModule<EditMenuModule>('MusarrifEditMenu')

export function presentEditMenu(point: { x: number; y: number }, titles: readonly string[]): Promise<number | null> {
  return native().present(point.x, point.y, titles)
}

export const lookUp = (term: string): Promise<void> => native().lookUp(term)

export const translate = (text: string): Promise<void> => native().translate(text)
