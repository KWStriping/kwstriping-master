import { useTheme } from '@mui/material/styles';
import type { DetailedHTMLProps, HTMLAttributes, FC } from 'react';
import { useState } from 'react';

import type {
  BaseListBodyProps,
  BaseListFooterProps,
  BaseListHeaderProps,
  BaseListItemCellProps,
  BaseListItemProps,
  BaseListProps,
} from '../BaseList';
import {
  BaseList,
  BaseListBody,
  BaseListFooter,
  BaseListHeader,
  BaseListItem,
  BaseListItemCell,
} from '../BaseList';
import { ListActionContext, useListAction } from './context';
import { useStyles } from './styles';

export const List: FC<BaseListProps> = BaseList;
export const ListHeader: FC<BaseListHeaderProps> = BaseListHeader;
export const ListFooter: FC<BaseListFooterProps> = BaseListFooter;
export const ListBody: FC<BaseListBodyProps> = BaseListBody;
export const ListItem: FC<BaseListItemProps> = ({ hover: initialHover = true, ...rest }) => {
  const styles = useStyles();
  const [hover, setHover] = useState(true);
  return (
    <ListActionContext.Provider value={setHover}>
      <BaseListItem hover={initialHover && hover} {...rest} classes={styles} />
    </ListActionContext.Provider>
  );
};
export const ListItemCell: FC<BaseListItemCellProps> = (props) => {
  const styles = useStyles();

  return <BaseListItemCell {...props} classes={styles} />;
};

export const ListItemCellAction: FC<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> = (props) => {
  const setHover = useListAction();

  return (
    <div onMouseEnter={() => setHover(false)} onMouseLeave={() => setHover(true)} {...props} />
  );
};

export const useListWidths = () => {
  const theme = useTheme();

  return {
    actions: (n = 1) => `calc( ${theme.spacing(n + 1)} + ${48 * n}px)`,
    checkbox: '64px',
  };
};
