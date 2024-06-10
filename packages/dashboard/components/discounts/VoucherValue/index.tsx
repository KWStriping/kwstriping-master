import { useTranslation } from '@core/i18n';
import { renderCollection } from '@core/ui/utils';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Skeleton from '@mui/material/Skeleton';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import type { ChangeEvent, FC } from 'react';
import type { VoucherDetailsPageFormData } from '../VoucherDetailsPage';
import CardTitle from '@dashboard/components/core/CardTitle';
import RadioGroupField from '@dashboard/components/fields/RadioGroupField';
import TextFieldWithChoice from '@dashboard/components/fields/TextFieldWithChoice';
import ControlledCheckbox from '@dashboard/components/forms/ControlledCheckbox';
import { FormSpacer } from '@dashboard/components/forms/Form/FormSpacer';
import ResponsiveTable from '@dashboard/components/tables/ResponsiveTable';
import TableHead from '@dashboard/components/tables/TableHead';
import type { DiscountErrorFragment } from '@core/api/graphql';
import type { ChannelInput } from '@dashboard/oldSrc/discounts/handlers';
import { translateVoucherTypes } from '@dashboard/oldSrc/discounts/translations';
import { DiscountType } from '@dashboard/oldSrc/discounts/types';
import { getFormErrors } from '@dashboard/oldSrc/utils/errors';
import getDiscountErrorMessage from '@dashboard/oldSrc/utils/errors/discounts';

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
  const { t } = useTranslation();

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
              'dashboard.+ROF8',
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

                    {t('dashboard.j3T7P', 'Channel name')}
                  </>
                </span>
              </TableCell>
              <TableCell className={styles.colType ?? ''}>
                <span>
                  <>
                    {/* column title */}

                    {t('dashboard.shOIS', 'Price')}
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
                            label={t('dashboard.mcHeH', 'Discount Value')}
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
                      {t('/glQgs', 'No channels found')}
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
              label={t('dashboard.UHfux', 'Voucher Specific Information')}
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
                  'dashboard.3zr/B',
                  'Apply only to a single cheapest eligible product'
                  // voucher application, switch button
                )}
              </>
              <Typography variant="caption">
                <>
                  {t(
                    'dashboard.bRk1O',
                    'If this option is disabled, discount will be counted for every eligible product'
                  )}
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
