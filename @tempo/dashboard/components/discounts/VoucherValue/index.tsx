import * as m from '@paraglide/messages';
import { renderCollection } from '@tempo/ui/utils';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Skeleton from '@mui/material/Skeleton';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import type { ChangeEvent, FC } from 'react';
import type { VoucherDetailsPageFormData } from '../VoucherDetailsPage';
import CardTitle from '@tempo/dashboard/components/core/CardTitle';
import RadioGroupField from '@tempo/dashboard/components/fields/RadioGroupField';
import TextFieldWithChoice from '@tempo/dashboard/components/fields/TextFieldWithChoice';
import ControlledCheckbox from '@tempo/dashboard/components/forms/ControlledCheckbox';
import { FormSpacer } from '@tempo/dashboard/components/forms/Form/FormSpacer';
import ResponsiveTable from '@tempo/dashboard/components/tables/ResponsiveTable';
import TableHead from '@tempo/dashboard/components/tables/TableHead';
import type { DiscountErrorFragment } from '@tempo/api/generated/graphql';
import type { ChannelInput } from '@tempo/dashboard/oldSrc/discounts/handlers';
import { translateVoucherTypes } from '@tempo/dashboard/oldSrc/discounts/translations';
import { DiscountType } from '@tempo/dashboard/oldSrc/discounts/types';
import { getFormErrors } from '@tempo/dashboard/oldSrc/utils/errors';
import getDiscountErrorMessage from '@tempo/dashboard/oldSrc/utils/errors/discounts';

interface VoucherValueProps {
  data: VoucherDetailsPageFormData;
  errors: DiscountErrorFragment[];
  disabled: boolean;
  variant: string;
  onChange: (event: ChangeEvent<unknown>) => void;
  onChannelChange: (channelId: string, input: ChannelInput) => void;
}

export enum VoucherType {
  EntireOrder = 'ENTIRE_ORDER',
  SpecificProduct = 'SPECIFIC_PRODUCT',
}

const numberOfColumns = 2;

const VoucherValue: FC<VoucherValueProps> = (props) => {
  const { data, disabled, errors, variant, onChange, onChannelChange } = props;

  const formErrors = getFormErrors(['discountValue', 'type'], errors);

  const translatedVoucherTypes = translateVoucherTypes(t);
  const voucherTypeChoices = Object.values(VoucherType).map((type) => ({
    label: translatedVoucherTypes[type],
    value: type,
  }));

  return (
    <Card>
      <CardTitle
        title={t(
          '/oaqFS',
          'Value'
          // section header
        )}
      />
      <CardContent>
        <Typography variant="caption">
          <>
            {t(
              'dashboard_+ROF8',
              'Channels that don’t have assigned discounts will use their parent channel to define the price. Price will be converted to channel’s currency'
            )}
          </>
        </Typography>
        <div className={styles.tableContainer ?? ''}>
          <ResponsiveTable className={styles.table ?? ''}>
            <TableHead colSpan={numberOfColumns} disabled={disabled} items={[]}>
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
                    {/* column title */}

                    {m.dashboard_shOIS() ?? 'Price'}
                  </>
                </span>
              </TableCell>
            </TableHead>
            <TableBody>
              {renderCollection(
                data?.channelListings,
                (listing, index) => {
                  const error = formErrors.discountValue?.channels?.find(
                    (id) => id === listing.id
                  );
                  return (
                    <TableRow key={listing?.id || `skeleton-${index}`}>
                      <TableCell>
                        <Typography>{listing?.name || <Skeleton />}</Typography>
                      </TableCell>
                      <TableCell className={styles.colPrice ?? ''}>
                        {listing ? (
                          <TextFieldWithChoice
                            disabled={disabled}
                            error={!!error?.length}
                            ChoiceProps={{
                              label:
                                data?.discountType === DiscountType.ValueFixed
                                  ? listing.currency
                                  : '%',
                              name: 'discountType' as keyof FormData,
                              values: null,
                            }}
                            helperText={
                              error ? getDiscountErrorMessage(formErrors.discountValue, t) : ''
                            }
                            name={'value'}
                            onChange={(e) =>
                              onChannelChange(listing.id, {
                                discountValue: e.target.value,
                              })
                            }
                            label={m.dashboard_mcHeH() ?? 'Discount Value'}
                            value={listing.discountValue || ''}
                            type="number"
                            fullWidth
                            inputProps={{
                              min: 0,
                            }}
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
        </div>

        <FormSpacer />
        {variant === 'update' && (
          <>
            <RadioGroupField
              choices={voucherTypeChoices}
              disabled={disabled}
              error={!!formErrors.type}
              hint={getDiscountErrorMessage(formErrors.type, t)}
              label={m.dashboard_UHfux() ?? 'Voucher Specific Information'}
              name={'type' as keyof VoucherDetailsPageFormData}
              value={data?.type}
              onChange={onChange}
            />
          </>
        )}
        <FormSpacer />
        <ControlledCheckbox
          name={'applyOncePerOrder' as keyof VoucherDetailsPageFormData}
          label={
            <>
              <>
                {t(
                  'dashboard_3zr/B',
                  'Apply only to a single cheapest eligible product'
                  // voucher application, switch button
                )}
              </>
              <Typography variant="caption">
                <>
                  {m.dashboard_bRk_O() ??
                    'If this option is disabled, discount will be counted for every eligible product'}
                </>
              </Typography>
            </>
          }
          checked={data?.applyOncePerOrder}
          onChange={onChange}
          disabled={disabled}
        />
      </CardContent>
    </Card>
  );
};
export default VoucherValue;
