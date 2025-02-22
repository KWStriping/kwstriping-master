import { createSvgIcon } from '@mui/material/utils';

export const RadioCheckedIcon = createSvgIcon(
  <>
    <circle cx="12" cy="12" r="12" fill="currentColor" />
    <circle cx="12" cy="12" r="5" fill="var(--background-paper)" />
  </>,
  'RadioCheckedIcon'
);
