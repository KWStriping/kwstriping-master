import { AccordionSummary } from '@tempo/ui/components/Accordion';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';

import { useHeaderStyles } from './styles';

interface AssignmentListHeaderProps {
  assignCount: number;
  itemsName: string;
  loading: boolean;
}

const AssignmentListHeader: FC<AssignmentListHeaderProps> = ({
  assignCount,
  itemsName,
  loading,
}) => {
  const { container, skeleton, ...accordion } = useHeaderStyles();

  return (
    <div className={container}>
      <AccordionSummary className={accordion.root}>
        {loading ? (
          <Skeleton className={skeleton} />
        ) : (
          <Typography variant="subtitle2" color="textSecondary">
            {`${assignCount} ${itemsName.toLowerCase()}`}
          </Typography>
        )}
      </AccordionSummary>
    </div>
  );
};

export default AssignmentListHeader;
