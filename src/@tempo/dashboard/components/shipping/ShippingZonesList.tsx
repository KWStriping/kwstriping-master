import * as m from '@paraglide/messages';
import { Button } from '@tempo/ui/components/buttons/Button';
import IconButton from '@tempo/ui/components/buttons/IconButton';
import Link from '@tempo/ui/components/Link';
import { makeStyles } from '@tempo/ui/theme/styles';

import type { ShippingZoneFragment } from '@tempo/api/generated/graphql';
import { renderCollection } from '@tempo/ui/utils';
import DeleteIcon from '@mui/icons-material/Delete';
import Card from '@mui/material/Card';
import Skeleton from '@mui/material/Skeleton';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableFooter from '@mui/material/TableFooter';
import TableRow from '@mui/material/TableRow';
import type { ReactNode, FC } from 'react';
import type { ListActions, ListProps } from '@tempo/dashboard/oldSrc/types';
import { shippingZoneAddUrl, shippingZoneUrl } from '@tempo/dashboard/oldSrc/shipping/urls';
import { maybe } from '@tempo/dashboard/oldSrc/misc';
import { TablePaginationWithContext } from '@tempo/dashboard/components/tables/TablePagination';
import TableHead from '@tempo/dashboard/components/tables/TableHead';
import { TableButtonWrapper } from '@tempo/dashboard/components/tables/TableButtonWrapper/TableButtonWrapper';
import ResponsiveTable from '@tempo/dashboard/components/tables/ResponsiveTable';
import Checkbox from '@tempo/dashboard/components/core/Checkbox';
import CardTitle from '@tempo/dashboard/components/core/CardTitle';

export interface ShippingZonesListProps extends ListProps, ListActions {
  shippingZones: ShippingZoneFragment[];
  onRemove: (id: string) => void;
}

const useStyles = makeStyles(
  (theme) => ({
    colAction: {
      '&:last-child': {
        paddingRight: theme.spacing(1),
      },
      width: 92,
    },
    colCountries: {
      width: 180,
    },
  }),
  { name: 'ShippingZonesList' }
);

const numberOfColumns = 4;

const ShippingZonesList: FC<ShippingZonesListProps> = (props) => {
  const {
    disabled,
    settings,
    onRemove,
    onUpdateListSettings,
    shippingZones,
    isChecked,
    selected,
    toggle,
    toggleAll,
    toolbar,
  } = props;
  // const styles = useStyles();
  const styles = {};
  return (
    <Card>
      <CardTitle
        title={m.dashboard_shippingByZoneSectionHeader() ?? 'Shipping By Zone'}
        toolbar={
          <Button href={shippingZoneAddUrl} data-test-id="add-shipping-zone">
            {m.dashboard_createShippingZone() ?? 'Create shipping zone'}
          </Button>
        }
      />
      <ResponsiveTable>
        <colgroup>
          <col />
          <col />
          <col className={styles.colCountries ?? ''} />
          <col className={styles.colAction ?? ''} />
        </colgroup>
        <TableHead
          colSpan={numberOfColumns}
          selected={selected}
          disabled={disabled}
          items={shippingZones}
          toggleAll={toggleAll}
          toolbar={toolbar}
        >
          <TableCell>{m.dashboard_name() ?? 'Name'}</TableCell>
          <TableCell className={styles.colCountries ?? ''}>
            {m.dashboard_countries() ?? 'Countries'}
          </TableCell>
          <TableCell className={styles.colAction ?? ''} />
        </TableHead>
        <TableFooter>
          <TableRow>
            <TablePaginationWithContext
              colSpan={numberOfColumns}
              settings={settings}
              disabled={disabled}
              onUpdateListSettings={onUpdateListSettings}
            />
          </TableRow>
        </TableFooter>
        <TableBody>
          {renderCollection(
            shippingZones,
            (shippingZone) => {
              const isSelected = shippingZone ? isChecked(shippingZone.id) : false;
              return (
                <TableRow
                  hover={!!shippingZone}
                  key={shippingZone ? shippingZone.id : 'skeleton'}
                  selected={isSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isSelected}
                      disabled={disabled}
                      disableClickPropagation
                      onChange={() => toggle(shippingZone.id)}
                      data-test-id={shippingZone.id + '-checkbox'}
                    />
                  </TableCell>
                  <TableCell data-test-id={shippingZone.id + '-name'}>
                    <Link
                      href={shippingZone && shippingZoneUrl(shippingZone.id)}
                      className={'block w-full'}
                    >
                      {maybe<ReactNode>(() => shippingZone.name, <Skeleton />)}
                    </Link>
                  </TableCell>
                  <TableCell className={styles.colCountries ?? ''}>
                    {maybe<ReactNode>(() => shippingZone.countries.length, <Skeleton />)}
                  </TableCell>
                  <TableCell className={styles.colAction ?? ''}>
                    <TableButtonWrapper>
                      <IconButton
                        color="secondary"
                        disabled={disabled}
                        onClick={(event) => {
                          event.stopPropagation();
                          onRemove(shippingZone.id);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableButtonWrapper>
                  </TableCell>
                </TableRow>
              );
            },
            () => (
              <TableRow>
                <TableCell colSpan={numberOfColumns}>
                  {m.dashboard_hK_F_() ?? 'No shipping zones found'}
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </ResponsiveTable>
    </Card>
  );
};
ShippingZonesList.displayName = 'ShippingZonesList';
export default ShippingZonesList;
