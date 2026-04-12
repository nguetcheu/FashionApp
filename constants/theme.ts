/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

const PRIMARY_NAVY = '#1A2340';   // Texte et Titres [cite: 4]
const BG_OFF_WHITE = '#F8F9FB';   // Fond global [cite: 10]
const ACCENT_BEIGE = '#F2EEE9';   // Barre de navigation [cite: 6]
const NEUTRAL_GRAY = '#9DA3B0';   // Sous-titres [cite: 7]
const CARD_WHITE = '#FFFFFF';     // Cartes blanches [cite: 14]

export const Colors = {
  light: {
    text: PRIMARY_NAVY,           // Bleu Marine pour le texte [cite: 11]
    background: BG_OFF_WHITE,     // Fond blanc cassé [cite: 10]
    tint: PRIMARY_NAVY,           // Couleur d'accentuation
    icon: NEUTRAL_GRAY,           // Icônes par défaut [cite: 11]
    tabBar: ACCENT_BEIGE,         // Fond de la barre beige [cite: 39]
    tabIconDefault: NEUTRAL_GRAY,
    tabIconSelected: PRIMARY_NAVY, 
    card: CARD_WHITE,             // Couleur des cartes [cite: 14]
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: '#fff',
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: '#fff',
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'Georgia',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
