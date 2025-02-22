import type { SvgIconProps } from '@mui/material/SvgIcon';
import { createSvgIcon } from '@mui/material/utils';

const ProductKlasses = createSvgIcon(
  <>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0 6.5V33L20 40L40 33V6.5L20 0L0 6.5ZM2.5 8.69935V31.2263L18.75 36.9138V14.3869L2.5 8.69935ZM21.25 14.3869V36.9138L37.5 31.2263V8.69935L21.25 14.3869ZM34.1436 7.22539L20 2.62872L5.8564 7.22539L20 12.1756L34.1436 7.22539Z"
      fill="currentColor"
    />
  </>,
  'ProductKlasses'
);

export default (props: SvgIconProps) => <ProductKlasses {...props} viewBox="0 0 44 44" />;
