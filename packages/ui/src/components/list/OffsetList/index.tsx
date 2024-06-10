import type {
  BaseListBodyProps,
  BaseListFooterProps,
  BaseListHeaderProps,
  BaseListItemCellProps,
  BaseListItemProps,
  BaseListProps,
} from '@core/ui/components/list/BaseList';
import {
  BaseList,
  BaseListBody,
  BaseListFooter,
  BaseListHeader,
  BaseListItem,
  BaseListItemCell,
} from '@core/ui/components/list/BaseList';
import { useTheme } from '@mui/material/styles';
import type { FC } from 'react';
import { useStyles } from './styles';

export const OffsetList: FC<BaseListProps> = BaseList;
export const OffsetListHeader: FC<BaseListHeaderProps> = BaseListHeader;
export const OffsetListFooter: FC<BaseListFooterProps> = BaseListFooter;
export const OffsetListBody: FC<BaseListBodyProps> = (props) => {
  const styles = useStyles();

  return <BaseListBody className={styles.body ?? ''} {...props} />;
};
export const OffsetListItem: FC<BaseListItemProps> = (props) => {
  const styles = useStyles();

  return <BaseListItem classes={styles} {...props} />;
};
export const OffsetListItemCell: FC<Omit<BaseListItemCellProps, 'classes'>> = (props) => {
  const styles = useStyles();

  return <BaseListItemCell classes={styles} {...props} />;
};

export const useOffsetListWidths = () => {
  const theme = useTheme();

  return {
    // n actions - 1 + 2.5 right padding
    actions: (n = 1) => `calc( ${theme.spacing(n - 1 + 2.5)} + ${40 * n}px)`,
    checkbox: '64px',
  };
};
