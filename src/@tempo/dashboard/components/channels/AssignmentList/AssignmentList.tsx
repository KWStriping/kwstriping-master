import { Trans } from '@tempo/next/i18n';
import Accordion from '@mui/material/Accordion';
import Divider from '@mui/material/Divider';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';

import AssignmentListFooter from './AssignmentListFooter';
import AssignmentListHeader from './AssignmentListHeader';
import Item from './Item';
import { useExpanderStyles, useStyles } from './styles';
import type { AssignmentListProps } from './types';
import type { ReorderEvent } from '@tempo/dashboard/oldSrc/types';
import SortableContainer from '@tempo/dashboard/components/core/SortableContainer';

const messages = {
  allSelectedMessage: {
    id: 'uKlrEk',
    defaultMessage: 'All available {itemsName} have been selected',
    description: 'all selected items message',
  },
};

const AssignmentList: FC<AssignmentListProps> = (props) => {
  const { items, itemsName, totalCount = 0, loading, removeItem, reorderItem } = props;
  const styles = useStyles();
  const expanderClasses = useExpanderStyles();

  const handleSortStart = () => {
    document.body.classList.add(styles.grabbing);
  };

  const handleSortEnd = (event: ReorderEvent) => {
    document.body.classList.remove(styles.grabbing);
    reorderItem?.(event);
  };

  const hasMoreItemsToBeSelected = totalCount !== items.length;

  return (
    <Accordion classes={expanderClasses}>
      <AssignmentListHeader assignCount={items.length} itemsName={itemsName} loading={loading} />
      <Divider />
      {loading ? (
        <Skeleton className={styles.skeleton ?? ''} />
      ) : (
        <>
          <SortableContainer
            items={items.map(({ id }) => id)}
            // axis="xy"
            // lockAxis="xy"
            // useDragHandle
            onSortStart={handleSortStart}
            onSortEnd={handleSortEnd}
          >
            <div>
              {items.map((item) => (
                <Item
                  key={item.id}
                  // index={itemIndex}
                  item={item}
                  onDelete={removeItem}
                  sortable={!!reorderItem}
                />
              ))}
            </div>
          </SortableContainer>
          {hasMoreItemsToBeSelected ? (
            <AssignmentListFooter {...props} />
          ) : (
            <Typography
              color="textSecondary"
              variant="subtitle1"
              className={styles.infoMessage ?? ''}
            >
              <Trans t={t} i18nKey={'allSelectedMessage'} itemsName={itemsName.toLowerCase()}>
                {messages.allSelectedMessage.defaultMessage}
              </Trans>
            </Typography>
          )}
        </>
      )}
    </Accordion>
  );
};
export default AssignmentList;
