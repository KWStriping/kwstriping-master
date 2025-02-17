import * as m from '@paraglide/messages';
import { renderCollection } from '@tempo/ui/utils';
import type { DiscountErrorFragment } from '@tempo/api/generated/graphql';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Skeleton from '@mui/material/Skeleton';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

import type { FC } from 'react';

import type { SaleDetailsPageFormData } from '../SaleDetailsPage';

import SaleValueTextField from './SaleValueTextField';
import type { SaleValueInputOnChangeType } from './types';
import getDiscountErrorMessage from '@tempo/dashboard/oldSrc/utils/errors/discounts';
import { getFormErrors } from '@tempo/dashboard/oldSrc/utils/errors';
import ResponsiveTable from '@tempo/dashboard/components/tables/ResponsiveTable';
import CardTitle from '@tempo/dashboard/components/core/CardTitle';

export interface SaleValueProps {
  data: SaleDetailsPageFormData;
  disabled: boolean;
  errors: DiscountErrorFragment[];
  onChange: SaleValueInputOnChangeType;
}

const numberOfColumns = 2;

const SaleValue: FC<SaleValueProps> = ({ data, disabled, errors, onChange }) => {
  const { type } = data;
  const formErrors = getFormErrors(['value'], errors);

  return (
    <Card>
      <CardTitle
        title={
          m.dashboard_HdMAX() ?? 'Value'
          // sale value, header
        }
      />
      <CardContent className={styles.card ?? ''}>
        <Typography variant="caption" className={styles.info ?? ''}>
          {m.dashboard_channelsSaleInfo() ??
            'Channels that don’t have assigned discounts will use their parent channel to define the price. Price will be converted to channel’s currency.'}
        </Typography>
      </CardContent>
      <ResponsiveTable className={styles.table ?? ''}>
        <colgroup>
          <col />
          <col className={styles.colValue ?? ''} />
        </colgroup>
        <TableHead>
          <TableCell className={styles.colName ?? ''}>
            <span>
              <>
                {/* column title */}

                {m.dashboard_j_T_P() ?? 'Channel name'}
              </>
            </span>
          </TableCell>
          <TableCell className={styles.colType ?? ''}>
            <span>
              <>
                {/* sale value, header */}

                {m.dashboard_HdMAX() ?? 'Value'}
              </>
            </span>
          </TableCell>
        </TableHead>
        <TableBody>
          {renderCollection(
            data?.channelListings,
            (listing, index) => {
              const error = formErrors.value?.channels?.find((id) => id === listing.id);

              return (
                <TableRow key={listing?.id || `skeleton-${index}`} className={styles.row ?? ''}>
                  <TableCell>
                    <Typography>{listing?.name || <Skeleton />}</Typography>
                  </TableCell>
                  <TableCell>
                    {listing ? (
                      <SaleValueTextField
                        dataType={type}
                        helperText={error ? getDiscountErrorMessage(formErrors.value, t) : ''}
                        error={!!error}
                        disabled={disabled}
                        listing={listing}
                        onChange={onChange}
                      />
                    ) : (
                      <Skeleton />
                    )}
                  </TableCell>
                </TableRow>
              );
            },
            () => (
              <TableRow>
                <TableCell colSpan={numberOfColumns}>
                  {m._glQgs() ?? 'No channels found'}
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </ResponsiveTable>
    </Card>
  );
};

SaleValue.displayName = 'SaleValue';
export default SaleValue;
