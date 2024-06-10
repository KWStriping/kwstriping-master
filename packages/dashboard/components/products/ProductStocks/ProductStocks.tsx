import { Trans, useTranslation } from '@core/i18n';
import Button from '@core/ui/components/buttons/Button';
import IconButton from '@core/ui/components/buttons/IconButton';
import Link from '@core/ui/components/Link';
import { renderCollection } from '@core/ui/utils';
import CardTitle from '@dashboard/components/core/CardTitle';
import PreviewPill from '@dashboard/components/core/PreviewPill';
import { DateTimeTimezoneField } from '@dashboard/components/fields/DateTimeTimezoneField';
import ControlledCheckbox from '@dashboard/components/forms/ControlledCheckbox';
import FormSpacer from '@dashboard/components/forms/Form/FormSpacer';
import type { ProductErrorFragment, WarehouseFragment } from '@core/api/graphql';
import type { FormChange, FormErrors } from '@dashboard/hooks/useForm';
import type { FormsetAtomicData, FormsetChange } from '@dashboard/hooks/useFormset';
import type { ChannelData, ChannelPriceAndPreorderArgs } from '@dashboard/oldSrc/channels/utils';
import { getFormErrors, getProductErrorMessage } from '@dashboard/oldSrc/utils/errors';
import createNonNegativeValueChangeHandler from '@dashboard/oldSrc/utils/handlers/nonNegativeValueChangeHandler';
import PlusIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Card,
  CardContent,
  ClickAwayListener,
  Grow,
  MenuItem,
  Paper,
  Popper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TextField,
} from '@mui/material';
import Divider from '@mui/material/Divider';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';
import { useState, useRef } from 'react';

import type { ProductCreateData } from '../ProductCreatePage';
import type { ProductCreateData } from '../ProductCreatePage/form';
import type { ProductUpdateData } from '../ProductPage/form';
import { useStyles } from './styles';

export interface ProductStockFormsetData {
  quantityAllocated: number;
}
export type ProductStockInput = FormsetAtomicData<ProductStockFormsetData, string>;
export interface ProductStockFormData {
  sku: string;
  trackInventory: boolean;
  isPreorder: boolean;
  globalThreshold: string;
  globalSoldUnits: number;
  hasPreorderEndDate: boolean;
  preorderEndDateTime?: string;
}

export interface ProductStocksProps {
  productVariantChannelListings?: ChannelData[];
  data: ProductStockFormData;
  disabled: boolean;
  errors: ProductErrorFragment[];
  formErrors:
    | FormErrors<ProductCreateData>
    | FormErrors<ProductUpdateData>
    | FormErrors<ProductCreateData>;
  hasVariants: boolean;
  stocks: ProductStockInput[];
  warehouses: WarehouseFragment[];
  onVariantChannelListingChange?: (
    id: string,
    data: Partial<ChannelPriceAndPreorderArgs>
  ) => void;
  onChange: FormsetChange;
  onChangePreorderEndDate: FormChange;
  onEndPreorderTrigger?: () => void;
  onFormDataChange: FormChange;
  onWarehouseStockAdd: (warehouseId: string) => void;
  onWarehouseStockDelete: (warehouseId: string) => void;
  onWarehouseConfigure: () => void;
}

const ProductStocks: FC<ProductStocksProps> = ({
  data,
  disabled,
  hasVariants,
  errors,
  formErrors: localFormErrors,
  onChangePreorderEndDate,
  stocks,
  warehouses,
  productVariantChannelListings = [],
  onChange,
  onEndPreorderTrigger,
  onFormDataChange,
  onVariantChannelListingChange,
  onWarehouseStockAdd,
  onWarehouseStockDelete,
  onWarehouseConfigure,
}) => {
  const { t } = useTranslation();
  const anchor = useRef<HTMLDivElement>();
  const [lastStockRowFocus, setLastStockRowFocus] = useState(false);
  const [isExpanded, setExpansionState] = useState(false);
  const unitsLeft = parseInt(data?.globalThreshold, 10) - data?.globalSoldUnits;
  const styles = useStyles();
  const warehousesToAssign =
    warehouses?.filter((warehouse) => !stocks.some((stock) => stock.id === warehouse.id)) || [];
  const formErrors = getFormErrors(['sku'], errors);

  const onThresholdChange = createNonNegativeValueChangeHandler(onFormDataChange);

  const handleWarehouseStockAdd = (warehouseId: string) => {
    onWarehouseStockAdd(warehouseId);
    setLastStockRowFocus(true);
  };

  const handleStockInputFocus = (input: HTMLDivElement) => {
    if (lastStockRowFocus && input) {
      input.focus();
      setLastStockRowFocus(false);
    }
  };

  return (
    <Card>
      <CardTitle title={t('dashboard.title', 'Inventory')} />
      <CardContent>
        <div className={styles.skuInputContainer ?? ''}>
          <TextField
            disabled={disabled}
            error={!!formErrors.sku}
            fullWidth
            helperText={getProductErrorMessage(formErrors.sku, t)}
            label={t('dashboard.sku', 'SKU (Stock Keeping Unit)')}
            name="sku"
            onChange={onFormDataChange}
            value={data?.sku}
          />
        </div>
        <ControlledCheckbox
          checked={data?.isPreorder}
          name="isPreorder"
          onChange={
            onEndPreorderTrigger && data?.isPreorder ? onEndPreorderTrigger : onFormDataChange
          }
          disabled={disabled}
          label={
            <>
              {t('dashboard.variantInPreorder', 'Variant currently in preorder')}
              <PreviewPill className={styles.preview ?? ''} />
            </>
          }
        />

        {!data?.isPreorder && (
          <>
            <FormSpacer />
            <ControlledCheckbox
              checked={data?.trackInventory}
              name="trackInventory"
              onChange={onFormDataChange}
              disabled={disabled}
              label={
                <>
                  {t('dashboard.rackInventory', 'Track Inventory')}
                  <Typography variant="caption">
                    {t(
                      'dashboard.rackInventoryDescription',
                      'Active inventory tracking will automatically calculate changes of stock'
                    )}
                  </Typography>
                </>
              }
            />
          </>
        )}
      </CardContent>
      <Divider />
      {!data?.isPreorder && (
        <CardContent className={styles.quantityContainer ?? ''}>
          <Typography>
            <div className={styles.quantityHeader ?? ''}>
              <span>{t('dashboard.quantity', 'Quantity')}</span>
            </div>
          </Typography>
          {!productVariantChannelListings?.length && (
            <>
              <FormSpacer />
              <Typography variant="caption">
                {t(
                  'dashboard.oChannelWarehousesAllocation',
                  'Assign this variant to a channel in the product channel manager to define warehouses allocation'
                )}
              </Typography>
            </>
          )}

          {!warehouses?.length && (
            <Typography color="textSecondary" className={styles.noWarehouseInfo ?? ''}>
              {hasVariants ? (
                <Trans
                  t={t}
                  i18nKey={'configureWarehouseForVariant'}
                  components={{
                    a: <Link onClick={onWarehouseConfigure} />,
                  }}
                >
                  {
                    'There are no warehouses set up for your store. To add stock quantity to the variant please <a>configure a warehouse</a>'
                  }
                </Trans>
              ) : (
                <Trans
                  t={t}
                  i18nKey={'configureWarehouseForProduct'}
                  components={{
                    a: <Link onClick={onWarehouseConfigure} />,
                  }}
                >
                  {
                    'There are no warehouses set up for your store. To add stock quantity to the product please <a>configure a warehouse</a>'
                  }
                </Trans>
              )}
            </Typography>
          )}
        </CardContent>
      )}
      {!!productVariantChannelListings?.length && !!warehouses?.length && !data?.isPreorder && (
        <Table>
          <colgroup>
            <col className={styles.colName ?? ''} />
            <col className={styles.colQuantity ?? ''} />
            <col className={styles.colQuantity ?? ''} />
          </colgroup>
          <TableHead>
            <TableRow>
              <TableCell className={styles.colName ?? ''}>
                {t('dashboard.warehouseName', 'Warehouse Name')}
              </TableCell>
              <TableCell className={styles.colQuantity ?? ''}>
                {t('dashboard.allocated', 'Allocated')}
              </TableCell>
              <TableCell className={styles.colQuantity ?? ''}>
                {t('dashboard.quantity', 'Quantity')}
              </TableCell>
              <TableCell className={styles.colAction ?? ''} />
            </TableRow>
          </TableHead>
          <TableBody>
            {renderCollection(stocks, (stock, index) => {
              const handleQuantityChange = createNonNegativeValueChangeHandler((event) =>
                onChange(stock.id, event.target.value)
              );

              return (
                <TableRow key={stock.id}>
                  <TableCell className={styles.colName ?? ''}>{stock.label}</TableCell>
                  <TableCell className={styles.colQuantity ?? ''}>
                    {stock.data?.quantityAllocated || 0}
                  </TableCell>
                  <TableCell className={styles.colQuantity ?? ''}>
                    <TextField
                      data-test-id="stock-input"
                      disabled={disabled}
                      fullWidth
                      inputProps={{
                        className: styles.input ?? '',
                        min: 0,
                        type: 'number',
                      }}
                      onChange={handleQuantityChange}
                      value={stock.value}
                      inputRef={(input) =>
                        stocks.length === index + 1 && handleStockInputFocus(input)
                      }
                    />
                  </TableCell>
                  <TableCell className={styles.colAction ?? ''}>
                    <IconButton
                      color="secondary"
                      onClick={() => onWarehouseStockDelete(stock.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
            {!!warehousesToAssign?.length && (
              <ClickAwayListener onClickAway={() => setExpansionState(false)}>
                <TableRow
                  className={styles.addRow ?? ''}
                  onClick={() => setExpansionState(!isExpanded)}
                >
                  <TableCell colSpan={3} className={styles.actionableText ?? ''}>
                    <Typography variant="body2">
                      {t('dashboard.assignWarehouse', 'Assign Warehouse')}
                    </Typography>
                  </TableCell>
                  <TableCell className={styles.colAction ?? ''}>
                    <div ref={anchor}>
                      <IconButton
                        data-test-id="add-warehouse"
                        color="secondary"
                        className={styles.actionableText ?? ''}
                      >
                        <PlusIcon />
                      </IconButton>
                      <Popper
                        className={styles.popper ?? ''}
                        open={isExpanded}
                        anchorEl={anchor.current}
                        transition
                        placement="top-end"
                      >
                        {({ TransitionProps }) => (
                          <Grow
                            {...TransitionProps}
                            style={{
                              transformOrigin: 'right top',
                            }}
                          >
                            <Paper className={styles.paper ?? ''} elevation={8}>
                              {warehousesToAssign.map((warehouse) => (
                                <MenuItem
                                  key={warehouse.id}
                                  className={styles.menuItem ?? ''}
                                  onClick={() => handleWarehouseStockAdd(warehouse.id)}
                                >
                                  {warehouse.name}
                                </MenuItem>
                              ))}
                            </Paper>
                          </Grow>
                        )}
                      </Popper>
                    </div>
                  </TableCell>
                </TableRow>
              </ClickAwayListener>
            )}
          </TableBody>
        </Table>
      )}
      {data?.isPreorder && (
        <CardContent>
          <Typography variant="caption" className={styles.caption ?? ''}>
            {t(
              'dashboard.reorderEndDateSetup',
              'Set up an end date of preorder. When end date will be reached product will be automatically taken from preorder to standard selling'
            )}
          </Typography>

          {data?.hasPreorderEndDate && (
            <div className={styles.dateTimeInputs ?? ''}>
              <DateTimeTimezoneField
                name={'preorderEndDateTime'}
                disabled={disabled}
                futureDatesOnly
                fullWidth={false}
                error={localFormErrors.preorderEndDateTime}
                value={data?.preorderEndDateTime}
                onChange={(event) =>
                  onChangePreorderEndDate({
                    target: {
                      name: 'preorderEndDateTime',
                      value: event,
                    },
                  })
                }
              />
            </div>
          )}
          <Button
            name="hasPreorderEndDate"
            color="secondary"
            disabled={disabled}
            onClick={() =>
              onFormDataChange({
                target: {
                  name: 'hasPreorderEndDate',
                  value: !data?.hasPreorderEndDate,
                },
              })
            }
          >
            {data?.hasPreorderEndDate
              ? t('dashboard.ndDateCancel', 'CANCEL END DATE')
              : t('dashboard.ndDateSetup', 'SETUP END DATE')}
          </Button>
          <Typography variant="caption" className={styles.preorderLimitInfo ?? ''}>
            {t(
              'dashboard.reorderProductVariantsAvailability',
              'Preordered products will be available in all warehouses. You can set a threshold for sold quantity. Leaving input blank will be interpreted as no limit to sale. Sold items will be allocated at the warehouse assigned to chosen shipping zone.'
            )}
          </Typography>
          <div className={styles.thresholdRow ?? ''}>
            <TextField
              inputProps={{
                min: 0,
              }}
              disabled={disabled}
              fullWidth
              helperText={t(
                'dashboard.reorderTresholdDescription',
                'Threshold that cannot be exceeded even if per channel thresholds are still available'
              )}
              label={t('dashboard.reorderTresholdLabel', 'Global threshold')}
              name="globalThreshold"
              onChange={onThresholdChange}
              value={data?.globalThreshold ?? ''}
              className={styles.thresholdInput ?? ''}
            />
            {!!productVariantChannelListings?.length && (
              <Typography variant="caption" className={styles.preorderItemsLeftCount ?? ''}>
                {data?.globalThreshold
                  ? t('dashboard.reorderTresholdUnitsLeft', '{{unitsLeft}} units left', {
                      unitsLeft,
                    })
                  : t('dashboard.reorderTresholdUnlimited', 'Unlimited')}
              </Typography>
            )}
          </div>
        </CardContent>
      )}

      {!!productVariantChannelListings?.length && data?.isPreorder && (
        <Table>
          <colgroup>
            <col className={styles.colName ?? ''} />
            <col className={styles.colSoldUnits ?? ''} />
            <col className={styles.colThreshold ?? ''} />
          </colgroup>
          <TableHead>
            <TableRow>
              <TableCell className={styles.colName ?? ''}>
                {t('dashboard.channels', 'Channels')}
              </TableCell>
              <TableCell className={styles.colSoldUnits ?? ''}>
                {t('dashboard.oldUnits', 'Sold units')}
              </TableCell>
              <TableCell className={styles.colThreshold ?? ''}>
                {t('dashboard.channelTreshold', 'Channel threshold')}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {renderCollection(productVariantChannelListings, (listing) => {
              if (!listing) return;

              return (
                <TableRow key={listing.id}>
                  <TableCell className={styles.colName ?? ''}>{listing.name}</TableCell>
                  <TableCell className={styles.colQuantity ?? ''}>
                    {listing?.unitsSold || 0}
                  </TableCell>
                  <TableCell className={styles.colQuantity ?? ''}>
                    <TextField
                      name="channel-threshold"
                      disabled={disabled}
                      fullWidth
                      inputProps={{
                        className: styles.input ?? '',
                        min: 0,
                        type: 'number',
                      }}
                      placeholder={t('dashboard.reorderTresholdUnlimited', 'Unlimited')}
                      onChange={(e) => {
                        onVariantChannelListingChange(listing.id, {
                          costPrice: listing.costPrice,
                          price: listing.price,
                          preorderThreshold:
                            e.target.value === '' ? undefined : Number(e.target.value),
                        });
                      }}
                      value={listing?.preorderThreshold ?? ''}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </Card>
  );
};

ProductStocks.displayName = 'ProductStocks';
export default ProductStocks;
