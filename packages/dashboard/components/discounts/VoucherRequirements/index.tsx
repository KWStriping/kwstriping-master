import { useTranslation } from '@core/i18n';
import { renderCollection } from '@core/ui/utils';
import CardTitle from '@dashboard/components/core/CardTitle';
import PriceField from '@dashboard/components/fields/PriceField';
import RadioGroupField from '@dashboard/components/fields/RadioGroupField';
import { FormSpacer } from '@dashboard/components/forms/Form/FormSpacer';
import ResponsiveTable from '@dashboard/components/tables/ResponsiveTable';
import TableHead from '@dashboard/components/tables/TableHead';
import type { DiscountErrorFragment } from '@core/api/graphql';
import type { ChannelInput } from '@dashboard/oldSrc/discounts/handlers';
import { RequirementsPicker } from '@dashboard/oldSrc/discounts/types';
import { getFormErrors } from '@dashboard/oldSrc/utils/errors';
import getDiscountErrorMessage from '@dashboard/oldSrc/utils/errors/discounts';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Skeleton from '@mui/material/Skeleton';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import type { ChangeEvent } from 'react';

import type { VoucherDetailsPageFormData } from '../VoucherDetailsPage';

interface VoucherRequirementsProps {
  data: VoucherDetailsPageFormData;
  disabled: boolean;
  errors: DiscountErrorFragment[];
  onChange: (event: ChangeEvent<unknown>) => void;
  onChannelChange: (channelId: string, input: ChannelInput) => void;
}

const numberOfColumns = 2;

const VoucherRequirements = ({
  data,
  disabled,
  errors,
  onChange,
  onChannelChange,
}: VoucherRequirementsProps) => {
  const { t } = useTranslation();

  const formErrors = getFormErrors(['minSpent', 'minCheckoutItemsQuantity'], errors);
  const minimalOrderValueText = t(
    'dashboard.h9+8A',
    'Minimal order value'
    // voucher requirement
  );
  const minimalQuantityText = t(
    'dashboard.T/ZvF',
    'Minimum quantity of items'
    // voucher requirement
  );

  const requirementsPickerChoices = [
    {
      label: t(
        'dashboard./hkKO',
        'None'
        // voucher has no requirements
      ),
      value: RequirementsPicker.None,
    },
    {
      label: minimalOrderValueText,
      value: RequirementsPicker.Order,
    },
    {
      label: minimalQuantityText,
      value: RequirementsPicker.Item,
    },
  ];

  return (
    <Card>
      <CardTitle
        title={t(
          'dashboard.hv3HX',
          'Minimum Requirements'
          // voucher requirements, header
        )}
      />
      <CardContent>
        <RadioGroupField
          choices={requirementsPickerChoices}
          disabled={disabled}
          name={'requirementsPicker' as keyof VoucherDetailsPageFormData}
          value={data?.requirementsPicker}
          onChange={onChange}
        />
        {[RequirementsPicker.Order, RequirementsPicker.Item].includes(
          data?.requirementsPicker
        ) && <FormSpacer />}
        {data?.requirementsPicker === RequirementsPicker.Order ? (
          <>
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

                        {t('dashboard.Vinbz', 'Value')}
                      </>
                    </span>
                  </TableCell>
                </TableHead>
                <TableBody>
                  {renderCollection(
                    data?.channelListings,
                    (listing, index) => {
                      const error = formErrors.minSpent?.channels?.find(
                        (id) => id === listing.id
                      );
                      return (
                        <TableRow key={listing?.id || `skeleton-${index}`}>
                          <TableCell>
                            <Typography>{listing?.name || <Skeleton />}</Typography>
                          </TableCell>
                          <TableCell className={styles.colPrice ?? ''}>
                            {listing ? (
                              <PriceField
                                disabled={disabled}
                                error={!!error?.length}
                                hint={
                                  error ? getDiscountErrorMessage(formErrors.minSpent, t) : ''
                                }
                                label={minimalOrderValueText}
                                name="minSpent"
                                value={listing.minSpent || ''}
                                onChange={(e) =>
                                  onChannelChange(listing.id, {
                                    minSpent: e.target.value,
                                  })
                                }
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
          </>
        ) : data?.requirementsPicker === RequirementsPicker.Item ? (
          <TextField
            disabled={disabled}
            error={!!formErrors.minCheckoutItemsQuantity}
            helperText={getDiscountErrorMessage(formErrors.minCheckoutItemsQuantity, t)}
            label={minimalQuantityText}
            name={'minCheckoutItemsQuantity' as keyof VoucherDetailsPageFormData}
            value={data?.minCheckoutItemsQuantity}
            onChange={onChange}
            fullWidth
          />
        ) : null}
      </CardContent>
    </Card>
  );
};
export default VoucherRequirements;
