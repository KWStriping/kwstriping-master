import clsx from 'clsx';
import type { HTMLAttributes, HTMLProps, FC } from 'react';
import { ListContext, ListGridContext, useGridStyles, useListContext } from './context';
import type { ListGridTemplate } from './styles';
import { useStyles } from './styles';

export interface BaseListProps extends HTMLAttributes<HTMLElement> {
  gridTemplate: ListGridTemplate;
}
export const BaseList: FC<BaseListProps> = ({ children, gridTemplate, ...props }) => (
  <ListGridContext.Provider value={gridTemplate}>
    <section {...props}>{children}</section>
  </ListGridContext.Provider>
);

export type BaseListItemClassKey =
  | 'row'
  | 'rowBody'
  | 'rowHead'
  | 'rowFoot'
  | 'rowHover'
  | 'rowBodySelected';

export interface BaseListItemProps extends HTMLAttributes<HTMLDivElement | HTMLLIElement> {
  classes?: Record<BaseListItemClassKey, string>;
  hover?: boolean;
  selected?: boolean;
}

export const BaseListItem: FC<BaseListItemProps> = ({
  classes,
  className,
  children,
  hover = true,
  selected,
  ...props
}) => {
  const baseClasses = useStyles();
  const gridClasses = useGridStyles();
  const listSection = useListContext();

  const Component = listSection === 'body' ? 'li' : 'div';

  return (
    <Component
      className={clsx(
        className,
        'OffsetTableRow',
        gridClasses.root,
        classes?.row,
        baseClasses.row,
        listSection === 'body' && classes?.rowBody,
        listSection === 'head' && classes?.rowHead,
        listSection === 'foot' && classes?.rowFoot,
        hover && classes?.rowHover,
        selected && classes?.rowBodySelected
      )}
      aria-selected={selected}
      {...props}
    >
      {children}
    </Component>
  );
};

export type BaseListItemCellClassKey =
  | 'cell'
  | 'cellBody'
  | 'cellHeader'
  | 'cellAction'
  | 'cellCheckbox';

export interface BaseListItemCellProps extends HTMLAttributes<HTMLDivElement> {
  classes?: Record<BaseListItemCellClassKey, string>;
  colSpan?: number;
  padding?: 'action' | 'checkbox' | 'none';
}
export const BaseListItemCell: FC<BaseListItemCellProps> = ({
  classes,
  className,
  children,
  colSpan,
  padding,
  ...props
}) => {
  const baseClasses = useStyles();
  const listSection = useListContext();
  const style = colSpan ? { gridColumn: `span ${colSpan}` } : {};

  return (
    <div
      className={clsx(
        className,
        baseClasses.cell,
        classes?.cell,
        listSection === 'body' && classes?.cellBody,
        listSection === 'head' && classes?.cellHeader,
        padding === 'action' && classes?.cellAction,
        padding === 'checkbox' && classes?.cellCheckbox
      )}
      style={style}
      {...props}
    >
      {children}
    </div>
  );
};

export type BaseListHeaderProps = HTMLProps<HTMLElement>;
export const BaseListHeader: FC<BaseListHeaderProps> = ({ children, ...props }) => (
  <ListContext.Provider value="head">
    <header {...props}>{children}</header>
  </ListContext.Provider>
);

export type BaseListBodyProps = HTMLProps<HTMLUListElement>;
export const BaseListBody: FC<BaseListBodyProps> = ({ children, className, ...props }) => {
  const styles = useStyles();

  return (
    <ListContext.Provider value="body">
      <ul role="feed" className={clsx(styles?.body, className)} {...props}>
        {children}
      </ul>
    </ListContext.Provider>
  );
};

export type BaseListFooterProps = HTMLProps<HTMLElement>;
export const BaseListFooter: FC<BaseListFooterProps> = ({ children, ...props }) => (
  <ListContext.Provider value="foot">
    <footer {...props}>{children}</footer>
  </ListContext.Provider>
);
