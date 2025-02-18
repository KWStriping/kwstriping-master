import * as m from '@paraglide/messages';
import { makeStyles } from '@tempo/ui/theme/styles';
import { useQuery } from '@tempo/api/hooks';
import { ProductListDocument } from '@tempo/api/generated/graphql';
import {
  languageEntityUrl,
  productVariantUrl,
  TranslatableEntities,
} from '@tempo/dashboard/oldSrc/translations/urls';
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';
import { Card, ClickAwayListener, Grow, MenuItem, MenuList as Menu } from '@mui/material';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import type { FC } from 'react';
import { useState, useRef } from 'react';

export interface ProductContextSwitcherProps {
  productId: string;
  selectedId: string;
  languageCode: string;
}
const useStyles = makeStyles(
  (theme) => ({
    arrow: {
      color: theme.vars.palette.primary.main,
      transition: theme.transitions.duration.standard + 'ms',
    },
    container: {
      display: 'flex',
      alignItems: 'center',
      paddingBottom: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    label: {
      paddingRight: theme.spacing(1),
    },
    menuContainer: {
      cursor: 'pointer',
      display: 'flex',
      justifyContent: 'space-between',
      minWidth: 90,
      padding: theme.spacing(1),
      position: 'relative',
    },
    menuItem: {
      textAlign: 'justify',
    },
    menuPaper: {
      maxHeight: `calc(100vh - ${theme.spacing(2)}px)`,
      overflow: 'scroll',
    },
    popover: {
      zIndex: 1,
    },
    rotate: {
      transform: 'rotate(180deg)',
    },
  }),
  { name: 'ProductContextSwitcher' }
);
const ProductContextSwitcher: FC<ProductContextSwitcherProps> = ({
  languageCode,
  productId,
  selectedId,
}) => {
  const router = useRouter();
  const { data } = useQuery(ProductListDocument, {
    variables: { id: productId },
  });
  // const styles = useStyles();
  const styles = {};
  const [isExpanded, setExpandedState] = useState(false);
  const anchor = useRef<HTMLDivElement | null>(null);

  const items = [
    {
      label: (m.dashboard_UyUJy() ?? 'Main Product'),
      value: productId,
      onClick: () =>
        void router.push(
          languageEntityUrl(languageCode, TranslatableEntities.products, productId)
        ),
    },
    ...(data?.product?.variants?.map(({ name, sku, id }) => ({
      label: name || sku,
      value: id,
      onClick: () => router.push(productVariantUrl(languageCode, productId, id)),
    })) || []),
  ];

  return (
    <div className={styles.container ?? ''}>
      <Typography className={styles.label ?? ''}>
        {m.dashboard_Ulsq+ ?? 'Translating'}:
      </Typography>
      <div ref={anchor}>
        <Card
          className={styles.menuContainer ?? ''}
          onClick={() => setExpandedState(!isExpanded)}
        >
          <Typography>{items.find(({ value }) => value === selectedId)?.label || '-'}</Typography>
          <ArrowDropDown className={clsx(styles.arrow, isExpanded && styles.rotate)} />
        </Card>
        <Popper
          className={styles.popover ?? ''}
          open={isExpanded}
          anchorEl={anchor.current}
          transition
          disablePortal
          placement="bottom-end"
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin: placement === 'bottom' ? 'right top' : 'right bottom',
              }}
            >
              <Paper className={styles.menuPaper ?? ''}>
                <ClickAwayListener
                  onClickAway={() => setExpandedState(false)}
                  mouseEvent="onClick"
                >
                  <Menu>
                    {items.map(({ label, value, onClick }) => (
                      <MenuItem
                        key={value}
                        className={styles.menuItem ?? ''}
                        onClick={() => {
                          setExpandedState(false);
                          onClick();
                        }}
                      >
                        {label}
                      </MenuItem>
                    ))}
                  </Menu>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </div>
  );
};
ProductContextSwitcher.displayName = 'ProductContextSwitcher';
export default ProductContextSwitcher;
