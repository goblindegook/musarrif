import type { ReactNode } from 'react'
import { Text, type TextProps } from 'react-native'
import { getTextDirection } from '../i18n/direction'
import { useThemeTokens } from '../theme/tokens'

type ArabicTextProps = Omit<TextProps, 'children'> & {
  children: ReactNode
  locale?: string
}

export function ArabicText({ children, locale = 'ar', allowFontScaling, style, ...props }: ArabicTextProps) {
  const theme = useThemeTokens()
  const text = typeof children === 'string' ? children : ''
  const direction = getTextDirection(text, locale)

  return (
    <Text
      {...props}
      accessibilityLanguage={props.accessibilityLanguage ?? locale}
      allowFontScaling={allowFontScaling ?? true}
      style={[
        {
          color: theme.ink,
          fontSize: 32,
          textAlign: direction === 'rtl' ? 'right' : 'left',
          writingDirection: direction,
        },
        style,
      ]}
    >
      {children}
    </Text>
  )
}
