import { useTheme as useTypedTheme } from '@mui/material/styles';
import type { Theme } from './types';
export * from './types';

export const useTheme = () => useTypedTheme<Theme>();
