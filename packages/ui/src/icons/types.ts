import type { SvgIconTypeMap } from '@mui/material/SvgIcon';

export type IconProps = SvgIconTypeMap['props'] & Omit<React.SVGProps<SVGSVGElement>, 'css'>;
