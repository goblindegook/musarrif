import { BottomSheet, Button, Group, Host, RNHostView } from '@expo/ui/swift-ui'
import {
  buttonBorderShape,
  buttonStyle,
  labelStyle,
  labelsHidden,
  presentationBackground,
  presentationDragIndicator,
  tint,
} from '@expo/ui/swift-ui/modifiers'
import type { ReactNode } from 'react'
import { ScrollView, Text, useWindowDimensions, View } from 'react-native'
import type { SFSymbol } from 'sf-symbols-typescript'
import { useThemeTokens } from '../theme/tokens'

export const SHEET_MARGIN = 24
const MAX_SHEET_FRACTION = 0.85
const HEADER_HEIGHT = 92
export const SHEET_BODY_PADDING_BOTTOM = 24

/** Room a sheet's children can fill before the body scrolls; for content without an intrinsic height. Cancel the body's bottom padding with a negative margin to run to the bottom edge. */
export function useSheetContentHeight() {
  return useWindowDimensions().height * MAX_SHEET_FRACTION - HEADER_HEIGHT
}

export function SheetButton({
  label,
  onPress,
  prominent = false,
  systemImage,
  testID,
}: {
  label: string
  onPress: () => void
  prominent?: boolean
  systemImage: SFSymbol
  testID?: string
}) {
  const theme = useThemeTokens()
  return (
    <Host seedColor={theme.accent} style={{ width: 48, height: 48 }}>
      <Button
        label={label}
        modifiers={[
          buttonStyle(prominent ? 'glassProminent' : 'glass'),
          buttonBorderShape('circle'),
          labelStyle('iconOnly'),
          labelsHidden(),
          tint(prominent ? theme.accent : theme.ink),
        ]}
        onPress={onPress}
        systemImage={systemImage}
        testID={testID}
      />
    </Host>
  )
}

export function Sheet({
  actions,
  children,
  contentLabel,
  isPresented,
  onDismiss,
  rtl = false,
  testID,
  title,
}: {
  actions: ReactNode
  children: ReactNode
  contentLabel?: string
  isPresented: boolean
  onDismiss: () => void
  rtl?: boolean
  testID?: string
  title: ReactNode
}) {
  const theme = useThemeTokens()
  const { height, width } = useWindowDimensions()

  return (
    <Host style={{ position: 'absolute' }} pointerEvents="none">
      <BottomSheet
        fitToContents
        isPresented={isPresented}
        onIsPresentedChange={(presented) => {
          if (!presented) onDismiss()
        }}
        testID={testID}
      >
        <Group modifiers={[presentationBackground(theme.background), presentationDragIndicator('visible')]}>
          <RNHostView matchContents>
            <View style={{ backgroundColor: theme.background, width }}>
              <View
                style={{
                  alignItems: 'center',
                  flexDirection: rtl ? 'row-reverse' : 'row',
                  justifyContent: 'space-between',
                  minHeight: HEADER_HEIGHT,
                  paddingHorizontal: SHEET_MARGIN,
                  paddingTop: 12,
                }}
              >
                {typeof title === 'string' ? (
                  <Text
                    accessibilityRole="header"
                    style={{ color: theme.ink, flex: 1, fontSize: 22, fontWeight: '700' }}
                  >
                    {title}
                  </Text>
                ) : (
                  title
                )}
                <View style={{ alignItems: 'center', flexDirection: rtl ? 'row-reverse' : 'row', gap: 8 }}>
                  {actions}
                </View>
              </View>
              <ScrollView style={{ maxHeight: height * MAX_SHEET_FRACTION - HEADER_HEIGHT }}>
                <View
                  accessibilityLabel={contentLabel}
                  style={{ gap: 20, paddingBottom: SHEET_BODY_PADDING_BOTTOM, paddingHorizontal: SHEET_MARGIN }}
                >
                  {children}
                </View>
              </ScrollView>
            </View>
          </RNHostView>
        </Group>
      </BottomSheet>
    </Host>
  )
}
