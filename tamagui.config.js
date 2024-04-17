// tamagui.config.js

import { createTamagui, createTokens } from '@tamagui/core'

// define your tokens with `createTokens`, it ensures they stay typed
const tokens = createTokens({
  size: {
    // numeric values create both a size token and a space token at the same time
    0: 0,
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    5: 20,
    6: 24,
    // you can also create aliases
    '$4': '$space$2',
  },
  color: {
    // direct colors get auto dark-mode transformations
    red: '#ff0000',
    blue: '#0000ff',
    // you can also create aliases, and reference colors
    primary: '$blue',
    secondary: '$red',
    // or skip auto transformations and define directly
    redDark: '#ff0000',
    blueDark: '#0000ff',
  },
  font: {
    // by default these create lineHeight and letterSpacing scales too
    family: {
      sans: 'Arial, sans-serif',
    },
    size: {
      1: 12,
      2: 14,
      3: 16,
      4: 18,
      5: 20,
      6: 24,
    },
    weight: {
      4: '400',
      5: '500',
      6: '600',
      7: '700',
    },
  },
  radius: {
    // borderRadius etc
    1: 4,
    2: 10,
    3: 20,
    round: 1000,
  },
  zIndex: {
    // for zIndex
    1: 1,
    2: 2,
    3: 3,
    max: 1000,
  },
})

const themes = {
  light: {
    background: '#fff',
    text: '#000',
    ...tokens.color,
  },
  dark: {
    background: '#000',
    text: '#fff',
    ...tokens.color,
  },
}

export const config = createTamagui({
  defaultTheme: 'light',
  shouldAddPrefersColorThemes: true,
  tokens,
  themes,
})

export default config
