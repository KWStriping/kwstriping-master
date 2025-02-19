import * as m from '@paraglide/messages';
import { makeStyles } from '@tempo/ui/theme/styles';
import { renderCollection } from '@tempo/ui/utils';
import Skeleton from '@mui/material/Skeleton';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableFooter from '@mui/material/TableFooter';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import clsx from 'clsx';
import type { ReactNode, FC } from 'react';
import type { ListProps } from '@tempo/dashboard/oldSrc/types';
import { maybe } from '@tempo/dashboard/oldSrc/misc';
import { TablePaginationWithContext } from '@tempo/dashboard/components/tables/TablePagination';
import ResponsiveTable from '@tempo/dashboard/components/tables/ResponsiveTable';

export interface TranslatableEntity {
  id: string;
  name: string;
  completion: {
    current: number;
    max: number;
  };
}

export interface TranslationsEntitiesListProps extends ListProps {
  entities: TranslatableEntity[];
  getRowHref: (id: string) => string;
}

const useStyles = makeStyles(
  {
    tableRow: {
      cursor: 'pointer',
    },
    textRight: {
      textAlign: 'right',
    },
    wideColumn: {
      width: '80%',
    },
  },
  { name: 'TranslationsEntitiesList' }
);

const TranslationsEntitiesList: FC<TranslationsEntitiesListProps> = (props) => {
  const { disabled, entities, getRowHref } = props;
  // const styles = useStyles();
  const styles = {};

  return (
    <ResponsiveTable>
      <TableHead>
        <TableRow>
          <TableCell className={styles.wideColumn ?? ''}>
            <>
              {/* entity (product, collection, shipping method) name */}

              {m.dashboard__PF_z() ?? 'Name'}
            </>
          </TableCell>
          <TableCell className={styles.textRight ?? ''}>
            {m.dashboard_WmYSU() ?? 'Completed Translations'}
          </TableCell>
        </TableRow>
      </TableHead>
      <TableFooter>
        <TableRow>
          <TablePaginationWithContext colSpan={2} disabled={disabled} />
        </TableRow>
      </TableFooter>
      <TableBody>
        {renderCollection(
          entities,
          (entity) => (
            <TableRow
              className={clsx(!!entity && styles.tableRow)}
              hover={!!entity}
              href={entity && getRowHref(entity.id)}
              key={entity ? entity.id : 'skeleton'}
            >
              <TableCell>{entity?.name || <Skeleton />}</TableCell>
              <TableCell className={styles.textRight ?? ''}>
                {!!entity?.completion &&
                  maybe<ReactNode>(
                    () => t('dashboard_kRuLs', '{current} of {max}', entity.completion),
                    <Skeleton />
                  )}
              </TableCell>
            </TableRow>
          ),
          () => (
            <TableRow>
              <TableCell colSpan={2}>
                {m.dashboard_cwrgW() ?? 'No translatable entities found'}
              </TableCell>
            </TableRow>
          )
        )}
      </TableBody>
    </ResponsiveTable>
  );
};
TranslationsEntitiesList.displayName = 'TranslationsEntitiesList';
export default TranslationsEntitiesList;
