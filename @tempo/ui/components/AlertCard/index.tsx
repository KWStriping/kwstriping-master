import Card from '@mui/material/Card';
import type { FC, ReactNode } from 'react';

const AlertCard: FC<{ children: ReactNode }> = ({ children }) => {
  return <Card className={'bg-error py-1.5 px-2'}>{children}</Card>;
};

export default AlertCard;
