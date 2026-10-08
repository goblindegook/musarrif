import {
  Button,
  GlassEffectContainer,
  Host,
  HStack,
  Image,
  Namespace,
  TextField,
  type TextFieldRef,
} from '@expo/ui/swift-ui'
import {
  Animation,
  accessibilityLabel,
  animation,
  buttonStyle,
  frame,
  glassEffect,
  glassEffectId,
  padding,
  textFieldStyle,
} from '@expo/ui/swift-ui/modifiers'
import { useId, useRef, useState } from 'react'
import { useThemeTokens } from '../../theme/tokens'

export function SearchHeader({
  width,
  placeholder,
  filterLabel,
  clearLabel,
  closeLabel,
  query = '',
  filtersActive = false,
  onChangeText,
  onFilter,
}: {
  width: number
  placeholder: string
  filterLabel: string
  clearLabel?: string
  closeLabel?: string
  query?: string
  filtersActive?: boolean
  onChangeText: (value: string) => void
  onFilter: () => void
}) {
  const theme = useThemeTokens()
  const inputRef = useRef<TextFieldRef>(null)
  const glassNamespace = useId()
  const [focused, setFocused] = useState(false)
  const controlWidth = width - 32
  const fieldWidth = controlWidth - 44 - 8
  const textWidth = fieldWidth - (query ? 112 : 72)

  return (
    <Host testID="search-header" style={{ width: controlWidth, height: 44 }} seedColor={theme.accent}>
      <Namespace id={glassNamespace}>
        <GlassEffectContainer spacing={8}>
          <HStack spacing={8} modifiers={[animation(Animation.smooth(), focused)]}>
            <HStack
              spacing={8}
              modifiers={[
                padding({ horizontal: 16 }),
                frame({ width: fieldWidth, height: 44 }),
                glassEffect({ shape: 'capsule', glass: { variant: 'regular', interactive: true } }),
                glassEffectId('search', glassNamespace),
              ]}
            >
              <Image
                testID="search-leading-symbol"
                systemName="magnifyingglass"
                size={20}
                color={theme.ink}
                modifiers={[frame({ width: 32 })]}
              />
              <TextField
                ref={inputRef}
                testID="verb-search-field"
                placeholder={placeholder}
                onTextChange={onChangeText}
                onFocusChange={setFocused}
                modifiers={[textFieldStyle('plain'), frame({ width: textWidth })]}
              />
              {query ? (
                <Button
                  testID="clear-search-action"
                  onPress={() => {
                    void inputRef.current?.clear()
                    onChangeText('')
                  }}
                  modifiers={[
                    buttonStyle('plain'),
                    accessibilityLabel(clearLabel ?? 'Clear search'),
                    frame({ width: 32, height: 44 }),
                  ]}
                >
                  <Image systemName="xmark.circle.fill" size={20} color={theme.inkMuted} />
                </Button>
              ) : null}
            </HStack>
            {focused ? (
              <Button
                testID="close-search-action"
                onPress={() => void inputRef.current?.blur()}
                modifiers={[buttonStyle('plain'), accessibilityLabel(closeLabel ?? 'Close search')]}
              >
                <Image
                  systemName="xmark"
                  size={20}
                  color={theme.ink}
                  modifiers={[
                    frame({ width: 44, height: 44 }),
                    glassEffect({ shape: 'circle', glass: { variant: 'regular', interactive: true } }),
                    glassEffectId('action', glassNamespace),
                  ]}
                />
              </Button>
            ) : (
              <Button onPress={onFilter} modifiers={[buttonStyle('plain'), accessibilityLabel(filterLabel)]}>
                <Image
                  testID="filter-symbol"
                  systemName="line.3.horizontal.decrease"
                  size={20}
                  color={filtersActive ? theme.onAccent : theme.accent}
                  modifiers={[
                    frame({ width: 44, height: 44 }),
                    glassEffect({
                      shape: 'circle',
                      glass: {
                        variant: 'regular',
                        interactive: true,
                        ...(filtersActive ? { tint: theme.accent } : {}),
                      },
                    }),
                    glassEffectId('action', glassNamespace),
                  ]}
                />
              </Button>
            )}
          </HStack>
        </GlassEffectContainer>
      </Namespace>
    </Host>
  )
}
