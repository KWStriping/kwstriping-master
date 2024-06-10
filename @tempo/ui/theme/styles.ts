import type { Theme } from '@tempo/ui/theme/types';
import muiMakeStyles from '@mui/styles/makeStyles';
import type { ClassNameMap, Styles, WithStylesOptions } from '@mui/styles/withStyles';

export function makeStyles<
  Props extends Record<string, unknown> = {},
  ClassKey extends string = string,
>(
  styles: Styles<Theme, Props, ClassKey>,
  options?: Omit<WithStylesOptions<Theme>, 'withTheme'>
): keyof Props extends never
  ? (props?: unknown) => ClassNameMap<ClassKey>
  : (props: Props) => ClassNameMap<ClassKey> {
  return muiMakeStyles(styles, options);
}

export { useColorScheme } from '@mui/material/styles';
