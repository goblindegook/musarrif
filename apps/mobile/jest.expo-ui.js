// SwiftUI views render as one opaque native host in jest, so tests could only reach them through composite props.
// These stand-ins render the same semantics as plain React Native elements for role and label queries.
jest.mock('@expo/ui', () => {
  const React = require('react')
  const { Pressable, Text, View } = require('react-native')
  const passthrough = ({ children }) => React.createElement(View, null, children)
  const FieldGroup = passthrough
  FieldGroup.Section = ({ children, title }) =>
    React.createElement(View, null, title ? React.createElement(Text, null, title) : null, children)
  FieldGroup.SectionHeader = passthrough
  return {
    FieldGroup,
    Switch: ({ label, onValueChange, testID, value }) =>
      React.createElement(Pressable, {
        accessibilityLabel: label,
        accessibilityRole: 'switch',
        accessibilityState: { checked: value },
        onPress: () => onValueChange(!value),
        testID,
      }),
  }
})

jest.mock('@expo/ui/swift-ui', () => {
  const React = require('react')
  const { Pressable, Text, TextInput, View } = require('react-native')
  const passthrough = ({ children, testID }) => React.createElement(View, { testID }, children)
  const tagOf = (option) => option.props.modifiers?.find((modifier) => modifier.$type === 'tag')?.tag
  const accessibleName = (label, modifiers) =>
    label ?? modifiers?.find((modifier) => modifier.$type === 'accessibilityLabel')?.label

  return {
    BottomSheet: ({ children, isPresented, testID }) =>
      isPresented ? React.createElement(View, { testID }, children) : null,
    Button: ({ children, label, modifiers, onPress, testID }) =>
      React.createElement(
        Pressable,
        { accessibilityLabel: accessibleName(label, modifiers), accessibilityRole: 'button', onPress, testID },
        children ?? (label ? React.createElement(Text, null, label) : null),
      ),
    GlassEffectContainer: passthrough,
    Group: passthrough,
    HStack: passthrough,
    Host: passthrough,
    Image: ({ testID }) => React.createElement(View, { testID }),
    Label: ({ title }) => React.createElement(Text, null, title),
    Picker: ({ children, label, onSelectionChange, selection }) =>
      React.createElement(
        View,
        { accessible: true, accessibilityLabel: label, accessibilityRole: 'radiogroup' },
        React.Children.map(children, (option) =>
          React.createElement(
            Pressable,
            {
              accessibilityLabel: option.props.children,
              accessibilityRole: 'radio',
              accessibilityState: { selected: tagOf(option) === selection },
              onPress: () => onSelectionChange(tagOf(option)),
            },
            React.createElement(Text, null, option.props.children),
          ),
        ),
      ),
    ProgressView: ({ value }) =>
      React.createElement(View, {
        accessible: true,
        accessibilityRole: 'progressbar',
        accessibilityValue: { min: 0, max: 1, now: value },
      }),
    RNHostView: ({ children }) => children,
    Text: ({ children }) => React.createElement(Text, null, children),
    TextField: React.forwardRef(({ autoFocus, onTextChange, placeholder, testID }, ref) => {
      React.useImperativeHandle(ref, () => ({ clear: jest.fn().mockResolvedValue(undefined) }))
      return React.createElement(TextInput, { autoFocus, onChangeText: onTextChange, placeholder, testID })
    }),
    Toggle: ({ isOn, label, modifiers, onIsOnChange, testID }) =>
      React.createElement(Pressable, {
        accessibilityLabel: label,
        accessibilityRole: 'switch',
        accessibilityState: {
          checked: isOn,
          disabled: modifiers?.some((modifier) => modifier.$type === 'disabled' && modifier.disabled) ?? false,
        },
        onPress: () => onIsOnChange(!isOn),
        testID,
      }),
    VStack: passthrough,
  }
})
