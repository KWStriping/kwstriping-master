import { createSvgIcon } from '@mui/material/utils';

export const CircleIndicatorIcon = createSvgIcon(
  <>
    <circle cx="12" cy="12" r="12" fill="currentColor" />
    <circle cx="12" cy="12" r="9" fill="var(--background-paper)" />
  </>,
  'CircleIndicatorIcon'
);
