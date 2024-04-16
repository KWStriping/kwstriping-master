import type SupportedColorScheme from '@mui/material/SupportedColorScheme';
import type { Components, Theme, Palette } from '@mui/material/styles';
// import { buttonOverrides } from "./buttons";
// import { controlOverrides } from "./controls";
// import { inputOverrides } from "./inputs";
// import { tableOverrides } from "./tables";

export const overrides = (
  _colorSchemes: Record<SupportedColorScheme, Palette>,
  _fontFamily: string
): Components<Omit<Theme, 'components'>> => ({
  // ...inputOverrides(colors, mode),
  // ...tableOverrides(colors, fontFamily),
  // ...buttonOverrides(colors, mode),
  // ...controlOverrides(colors),
});
