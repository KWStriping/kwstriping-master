import type { FormHelperTextProps } from '@mui/material/FormHelperText';

export type ExtendedFormHelperTextProps = FormHelperTextProps & {
  'data-test-id': string;
};
