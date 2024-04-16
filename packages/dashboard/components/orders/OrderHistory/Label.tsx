import Typography from '@mui/material/Typography';
import type { FC } from 'react';

export enum LabelSizes {
  sm = 12,
  md = 14,
}

interface LabelProps {
  text: string;
  size?: LabelSizes;
}

const Label: FC<LabelProps> = ({ text, size = 12 }) => (
  <Typography variant="caption" color="textSecondary" style={{ fontSize: size }}>
    {text}
  </Typography>
);

export default Label;
