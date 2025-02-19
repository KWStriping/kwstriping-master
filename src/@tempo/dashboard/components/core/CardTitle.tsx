import CardHeader from '@mui/material/CardHeader';
import type { MouseEvent, FC, ReactNode } from 'react';

interface CardTitleProps {
  children?: ReactNode;
  className?: string;
  title: string | ReactNode;
  subtitle?: string | ReactNode;
  toolbar?: ReactNode;
  onClick?: (event: MouseEvent<unknown>) => void;
  onClose?: () => void;
}

const CardTitle: FC<CardTitleProps> = ({
  className,
  children,
  title,
  subtitle,
  toolbar,
  ...rest
}) => (
  <CardHeader action={toolbar} className={className} title={title} subheader={subtitle} {...rest}>
    {children}
  </CardHeader>
);

CardTitle.displayName = 'CardTitle';
export default CardTitle;
