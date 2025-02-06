import type { BaseListItemProps } from '@tempo/ui/components/list/List';
import { ListItem } from '@tempo/ui/components/list/List';
import { makeStyles } from '@tempo/ui/theme/styles';
import Link from '@tempo/ui/components/Link';
import clsx from 'clsx';
import type { FC } from 'react';

export interface ListItemLinkProps extends Omit<BaseListItemProps, 'onClick' | 'classes'> {
  href?: string;
  className?: string;
  linkClassName?: string;
}

const useStyles = makeStyles(
  {
    link: {
      all: 'inherit',
      display: 'contents',
    },
  },
  { name: 'ListItemLink' }
);

export const ListItemLink: FC<ListItemLinkProps> = ({
  href,
  children,
  linkClassName,
  ...props
}) => {
  if (!href) {
    return <ListItem {...props}>{children}</ListItem>;
  }
  const styles = {};

  return (
    <ListItem {...props}>
      <Link className={clsx(styles.link, linkClassName)} href={href}>
        {children}
      </Link>
    </ListItem>
  );
};

export default ListItemLink;
