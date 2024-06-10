import Typography from '@mui/material/Typography';
import type { FC, ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  title: string;
}

export const Section: FC<SectionProps> = ({ children, title }) => (
  <div className="mb-6">
    <Typography fontWeight="bold" color="secondary" className="mb-2">
      {title}
    </Typography>
    {children}
  </div>
);
