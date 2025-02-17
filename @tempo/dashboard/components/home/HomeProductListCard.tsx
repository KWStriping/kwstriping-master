import * as m from '@paraglide/messages';
import { Trans } from '@tempo/next/i18n';
import { makeStyles } from '@tempo/ui/theme/styles';
import { gql } from '@tempo/api';
import type { TopProductFragment } from '@tempo/api/generated/graphql';
import { renderCollection } from '@tempo/ui/utils';
import Card from '@mui/material/Card';
import Skeleton from '@mui/material/Skeleton';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';
import type { FC } from 'react';
import { productVariantEditUrl } from '@tempo/dashboard/oldSrc/products/urls';
import { maybe } from '@tempo/dashboard/oldSrc/misc';
import TableCellAvatar from '@tempo/dashboard/components/tables/TableCellAvatar';
import ResponsiveTable from '@tempo/dashboard/components/tables/ResponsiveTable';
import Money from '@tempo/dashboard/components/core/Money';
import CardTitle from '@tempo/dashboard/components/core/CardTitle';

const useStyles = makeStyles(
  (theme) => ({
    avatarProps: {
      height: 64,
      width: 64,
    },
    colAvatar: {
      paddingBottom: theme.spacing(2),
      paddingRight: theme.spacing(1),
      paddingTop: theme.spacing(2),
      width: 112,
    },
    colName: {
      width: 'auto',
    },
    label: {
      paddingLeft: 0,
    },
    noProducts: {
      paddingBottom: 20,
      paddingTop: 20,
    },
    tableRow: {
      cursor: 'pointer',
    },
  }),
  { name: 'HomeProductListCard' }
);

export const TOP_PRODUCT_FRAGMENT = gql(`
  fragment TopProduct on Product {
    id
    name
    thumbnail {
      url
    }
    revenue(period: TODAY) {
      gross {
        amount
        currency
      }
    }
    attributes {
      values {
        edges {
          node {
            id
            name
          }
        }
      }
    }
    quantityOrdered
  }
`);

interface HomeProductListProps {
  testId?: string;
  topProducts: TopProductFragment[];
}

export const HomeProductList: FC<HomeProductListProps> = ({ topProducts, testId }) => {
  const styles = useStyles({});

  return (
    <Card data-test-id={testId}>
      <CardTitle
        title={
          m.dashboard_r_fyf() ?? 'Top Products' // header
        }
      />
      <ResponsiveTable>
        <colgroup>
          <col className={styles.colAvatar ?? ''} />
          <col className={styles.colName ?? ''} />
          <col />
        </colgroup>
        <TableBody>
          {renderCollection(
            topProducts,
            (variant) => (
              <TableRow
                key={variant ? variant.id : 'skeleton'}
                hover={!!variant}
                className={clsx(!!variant && styles.tableRow)}
                href={productVariantEditUrl(variant.product.id, variant.id)}
              >
                <TableCellAvatar
                  className={styles.colAvatar ?? ''}
                  thumbnail={variant.product.thumbnail?.url}
                  avatarProps={styles.avatarProps}
                />

                <TableCell className={styles.label ?? ''}>
                  {variant ? (
                    <>
                      <Typography color={'primary'}>{variant.product.name}</Typography>
                      <Typography color={'textSecondary'}>
                        {maybe(() =>
                          variant.attributes
                            .map((attribute) => attribute.values[0]?.name)
                            .join(' / ')
                        )}
                      </Typography>
                      <Typography color={'textSecondary'}>
                        <Trans t={t} i18nKey={'0opVvi'} count={variant.quantityOrdered ?? 0}>
                          {'{{count}} ordered'}
                        </Trans>
                      </Typography>
                    </>
                  ) : (
                    <Skeleton />
                  )}
                </TableCell>

                <TableCell>
                  <Typography align={'right'}>
                    {variant.revenue?.gross ? (
                      <Money money={variant.revenue.gross} />
                    ) : (
                      <Skeleton />
                    )}
                  </Typography>
                </TableCell>
              </TableRow>
            ),
            () => (
              <TableRow>
                <TableCell colSpan={3} className={styles.noProducts ?? ''}>
                  <Typography>{m.dashboard__Uzbb() ?? 'No products found'}</Typography>
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </ResponsiveTable>
    </Card>
  );
};

HomeProductList.displayName = 'HomeProductList';
export default HomeProductList;
