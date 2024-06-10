import Typography from '@mui/material/Typography';
import type { FC } from 'react';

interface PageSectionHeaderProps {
  title?: string;
  description?: string;
}

const PageSectionHeader: FC<PageSectionHeaderProps> = (props) => {
  const { title, description } = props;

  return (
    <div>
      {title && <Typography variant="h5">{title}</Typography>}
      {description && <Typography variant="body2">{description}</Typography>}
    </div>
  );
};

PageSectionHeader.displayName = 'PageSectionHeader';
export default PageSectionHeader;
