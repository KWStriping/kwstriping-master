import { Trans, useTranslation } from '@core/i18n';
import Chip from '@core/ui/components/chip/Chip';
import ChannelsAvailabilityDialogChannelsList from '@dashboard/components/channels/ChannelsAvailabilityDialogChannelsList';
import ChannelsAvailabilityDialogContentWrapper from '@dashboard/components/channels/ChannelsAvailabilityDialogWrapper';
import type { AccordionProps } from '@core/ui/components/Accordion/AltAccordion';
import Accordion from '@core/ui/components/Accordion/AltAccordion';
import Checkbox from '@dashboard/components/core/Checkbox';
import { useChannelsSearch } from '@dashboard/components/dialogs/ChannelsAvailabilityDialog/utils';
import type { MultiAutocompleteChoiceType } from '@dashboard/components/fields/MultiAutocompleteSelectField';
import { ProductField } from '@core/api/constants';
import type { ChannelFragment, ExportProductsInput } from '@core/api/graphql';
import type { ChangeEvent, FormChange } from '@dashboard/hooks/useForm';
import useSearchQuery from '@dashboard/hooks/useSearchQuery';
import type { FetchMoreProps } from '@dashboard/oldSrc/types';
import { toggle } from '@dashboard/oldSrc/utils/lists';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@core/ui/theme/styles';
import type { FC, ReactNode } from 'react';

import useProductExportFieldMessages from './messages';

export const attributeNamePrefix = 'attribute-';
export const warehouseNamePrefix = 'warehouse-';
const maxChips = 4;

const inventoryFields = [
  ProductField.ProductWeight,
  ProductField.VariantId,
  ProductField.VariantSku,
  ProductField.VariantWeight,
];

const useStyles = makeStyles(
  (theme) => ({
    accordion: {
      marginBottom: theme.spacing(2),
    },
    checkbox: {
      position: 'relative',
      right: theme.spacing(-1.5),
    },
    chip: {
      marginBottom: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    dialogLabel: {
      marginBottom: theme.spacing(2),
    },
    hr: {
      marginBottom: theme.spacing(3),
      marginTop: theme.spacing(3),
    },
    hrWarehouses: {
      marginBottom: theme.spacing(3),
      marginTop: theme.spacing(1),
    },
    label: {
      '&&': {
        overflow: 'visible',
      },
      '&:first-of-type': {
        paddingTop: 0,
      },
      '&:not(:last-of-type)': {
        borderBottom: `1px solid ${theme.vars.palette.divider}`,
      },
      justifyContent: 'space-between',
      margin: theme.spacing(0),
      padding: theme.spacing(1, 0),
      width: '100%',
    },
    loadMoreContainer: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: theme.spacing(2),
    },
    moreLabel: {
      display: 'inline-block',
      marginBottom: theme.spacing(1),
    },
    optionLabel: {
      fontSize: 14,
      marginLeft: 0,
    },
    quickPeekContainer: {
      marginBottom: theme.spacing(-1),
    },
    warehousesLabel: {
      marginBottom: theme.spacing(2),
    },
    scrollArea: {
      maxHeight: 'calc(100vh - 350px)',
      minHeight: 'auto',
      '@media (min-height: 800px)': {
        minHeight: 440,
      },
      overflowY: 'auto',
      overflowX: 'hidden',
    },
  }),
  {
    name: 'ProductExportDialogInfo',
  }
);

const Option: FC<{
  checked: boolean;
  name: string;
  onChange: (event: ChangeEvent) => void;
  children: ReactNode;
}> = ({ checked, children, name, onChange }) => {
  const styles = useStyles();
  return (
    <FormControlLabel
      classes={{
        label: styles.optionLabel ?? '',
      }}
      color="primary"
      control={
        <Checkbox
          className={styles.checkbox ?? ''}
          checked={checked}
          name={name}
          onChange={onChange}
        />
      }
      className={styles.label ?? ''}
      label={children}
      labelPlacement="start"
    />
  );
};

const FieldAccordion: FC<
  AccordionProps & {
    data: ExportProductsInput;
    fields: ProductField[];
    onChange: (event: ChangeEvent) => void;
    onToggleAll: (field: ProductField[], setTo: boolean) => void;
  }
> = ({ data, fields, onChange, onToggleAll, ...props }) => {
  const styles = useStyles();
  const { t } = useTranslation();
  const getFieldLabel = useProductExportFieldMessages();

  const selectedAll = fields.every((field) => data?.exportInfo?.fields?.includes(field));

  const selectedFields = data?.exportInfo?.fields?.filter((field) => fields.includes(field));

  return (
    <Accordion
      quickPeek={
        !!selectedFields?.length && (
          <div className={styles.quickPeekContainer ?? ''}>
            {selectedFields.slice(0, maxChips).map((field) => (
              <Chip
                className={styles.chip ?? ''}
                label={getFieldLabel(field)}
                onClose={() =>
                  onChange({
                    target: {
                      name: field,
                      value: false,
                    },
                  })
                }
                key={field}
              />
            ))}
            {selectedFields.length > maxChips && (
              <Typography className={styles.moreLabel ?? ''} variant="caption">
                <Trans t={t} i18nKey={'ve/Sph'} number={selectedFields.length - maxChips}>
                  {'and {number} more'}
                </Trans>
              </Typography>
            )}
          </div>
        )
      }
      {...props}
    >
      <Option checked={selectedAll} name="all" onChange={() => onToggleAll(fields, !selectedAll)}>
        <>
          {/* selectt all options */}

          {t('dashboard.QRnYK', 'Select All')}
        </>
      </Option>
      {fields.map((field) => (
        <Option
          checked={data?.exportInfo?.fields?.includes(field)}
          name={field}
          onChange={onChange}
          key={field}
        >
          {getFieldLabel(field)}
        </Option>
      ))}
    </Accordion>
  );
};

export interface ProductExportDialogInfoProps extends FetchMoreProps {
  attributes: MultiAutocompleteChoiceType[];
  channels: ChannelFragment[];
  selectedChannels: ChannelFragment[];
  warehouses: MultiAutocompleteChoiceType[];
  data: ExportProductsInput;
  selectedAttributes: MultiAutocompleteChoiceType[];
  onAttrtibuteSelect: FormChange;
  onWarehouseSelect: FormChange;
  onChange: FormChange;
  onFetch: (query: string) => void;
  onSelectAllWarehouses: FormChange;
  onSelectAllChannels: (items: ChannelFragment[], selected: number) => void;
  onChannelSelect: (option: ChannelFragment) => void;
}

const ProductExportDialogInfo: FC<ProductExportDialogInfoProps> = ({
  attributes,
  channels,
  data,
  hasMore,
  selectedAttributes,
  selectedChannels,
  loading,
  warehouses,
  onAttrtibuteSelect,
  onWarehouseSelect,
  onChannelSelect,
  onChange,
  onFetch,
  onFetchMore,
  onSelectAllChannels,
  onSelectAllWarehouses,
}) => {
  const { t } = useTranslation();
  // const styles = useStyles();
  const styles = {};
  const [query, onQueryChange] = useSearchQuery(onFetch);
  const getFieldLabel = useProductExportFieldMessages();
  const {
    query: channelsQuery,
    onQueryChange: onChannelsQueryChange,
    filteredChannels,
  } = useChannelsSearch(channels);

  const handleFieldChange = (event: ChangeEvent) =>
    onChange({
      target: {
        name: 'exportInfo',
        value: {
          ...data?.exportInfo,
          fields: toggle(event.target.name, data?.exportInfo?.fields, (a, b) => a === b),
        },
      },
    });

  const handleToggleAllFields = (fields: ProductField[], setTo: boolean) =>
    onChange({
      target: {
        name: 'exportInfo',
        value: {
          ...data?.exportInfo,
          fields: setTo
            ? [
                ...data?.exportInfo?.fields,
                ...fields.filter((field) => !data?.exportInfo?.fields?.includes(field)),
              ]
            : data?.exportInfo?.fields?.filter((field) => !fields.includes(field)),
        },
      },
    });

  const selectedInventoryFields = data?.exportInfo?.fields?.filter((field) =>
    inventoryFields.includes(field)
  );
  const selectedAllInventoryFields = selectedInventoryFields.length === inventoryFields.length;

  const handleSelectAllChannels = () => onSelectAllChannels(selectedChannels, channels.length);

  return (
    <>
      <Typography className={styles.dialogLabel ?? ''}>
        <>
          {/* select product informations to be exported */}

          {t('dashboard.wuu4X', 'Information exported:')}
        </>
      </Typography>
      <div className={styles.scrollArea ?? ''}>
        <Accordion
          className={styles.accordion ?? ''}
          title={t('dashboard.channels', 'Channels')}
          quickPeek={
            !!selectedChannels?.length && (
              <div className={styles.quickPeekContainer ?? ''}>
                {selectedChannels.slice(0, maxChips).map((channel) => (
                  <Chip
                    className={styles.chip ?? ''}
                    label={channel.name}
                    onClose={() => onChannelSelect(channel)}
                    key={channel.id}
                  />
                ))}
                {selectedChannels.length > maxChips && (
                  <Typography className={styles.moreLabel ?? ''} variant="caption">
                    <Trans t={t} i18nKey={'ve/Sph'} number={selectedChannels.length - maxChips}>
                      {'and {number} more'}
                    </Trans>
                  </Typography>
                )}
              </div>
            )
          }
          data-test-id="channels"
        >
          <ChannelsAvailabilityDialogContentWrapper
            hasAnyChannelsToDisplay={!!channels.length}
            hasAllSelected={selectedChannels.length === channels.length}
            query={channelsQuery}
            onQueryChange={onChannelsQueryChange}
            toggleAll={handleSelectAllChannels}
          >
            <ChannelsAvailabilityDialogChannelsList
              channels={filteredChannels}
              isChannelSelected={(option) =>
                !!selectedChannels.find((channel) => channel.id === option.id)
              }
              onChange={onChannelSelect}
            />
          </ChannelsAvailabilityDialogContentWrapper>
        </Accordion>
        <FieldAccordion
          className={styles.accordion ?? ''}
          title={t(
            'dashboard.4aYF0',
            'Product Organization'
            // informations about product organization, header
          )}
          data={data}
          fields={[ProductField.Category, ProductField.Collections, ProductField.ProductKlass]}
          onChange={handleFieldChange}
          onToggleAll={handleToggleAllFields}
          data-test-id="organization"
        />
        <Accordion
          className={styles.accordion ?? ''}
          title={t('dashboard.attributes', 'Attributes')}
          quickPeek={
            !!selectedAttributes?.length && (
              <div className={styles.quickPeekContainer ?? ''}>
                {selectedAttributes.slice(0, maxChips).map((attribute) => (
                  <Chip
                    className={styles.chip ?? ''}
                    label={attribute.label}
                    onClose={() =>
                      onAttrtibuteSelect({
                        target: {
                          name: attributeNamePrefix + attribute.value,
                          value: undefined,
                        },
                      })
                    }
                    key={attribute.value}
                  />
                ))}
                {selectedAttributes.length > maxChips && (
                  <Typography className={styles.moreLabel ?? ''} variant="caption">
                    <Trans t={t} i18nKey={'ve/Sph'} number={selectedAttributes.length - maxChips}>
                      {'and {number} more'}
                    </Trans>
                  </Typography>
                )}
              </div>
            )
          }
          data-test-id="attributes"
        >
          <TextField
            name="query"
            value={query}
            onChange={onQueryChange}
            label={t('dashboard.icEbK', 'Search Atrtibuttes')}
            placeholder={t(
              'dashboard.Ic2/h',
              'Search by attribute name'
              // input helper text, search attributes
            )}
            fullWidth
            InputProps={{
              autoComplete: 'off',
              endAdornment: loading && <CircularProgress size={16} />,
            }}
          />
          <Divider className={styles.hr ?? ''} />
          {attributes.map((attribute) => (
            <Option
              checked={data?.exportInfo?.attributes?.includes(attribute.value)}
              name={attributeNamePrefix + attribute.value}
              onChange={onAttrtibuteSelect}
              key={attribute.value}
            >
              {attribute.label}
            </Option>
          ))}
          {(hasMore || loading) && (
            <div className={styles.loadMoreContainer ?? ''}>
              {hasMore && !loading && (
                <Button color="primary" onClick={onFetchMore}>
                  <>
                    {/* button */}

                    {t('dashboard.DJEat', 'Load More')}
                  </>
                </Button>
              )}
              {loading && <CircularProgress size={32} />}
            </div>
          )}
        </Accordion>
        <FieldAccordion
          className={styles.accordion ?? ''}
          title={t(
            'dashboard.j3Cb8',
            'Financial Information'
            // informations about product prices etc, header
          )}
          data={data}
          fields={[ProductField.ChargeTaxes]}
          onChange={handleFieldChange}
          onToggleAll={handleToggleAllFields}
          data-test-id="financial"
        />
        <Accordion
          className={styles.accordion ?? ''}
          title={t(
            'dashboard.jpTLF',
            'Inventory Information'
            // informations about product stock, header
          )}
          quickPeek={
            (!!data?.exportInfo?.warehouses?.length || !!selectedInventoryFields?.length) && (
              <div className={styles.quickPeekContainer ?? ''}>
                {selectedInventoryFields.slice(0, maxChips).map((field) => (
                  <Chip
                    className={styles.chip ?? ''}
                    label={getFieldLabel(field)}
                    onClose={() =>
                      onChange({
                        target: {
                          name: field,
                          value: false,
                        },
                      })
                    }
                  />
                ))}
                {data?.exportInfo?.warehouses
                  .slice(0, maxChips - selectedInventoryFields.length)
                  .map((warehouseId) => (
                    <Chip
                      className={styles.chip ?? ''}
                      label={
                        warehouses.find((warehouse) => warehouse.value === warehouseId).label
                      }
                      onClose={() =>
                        onWarehouseSelect({
                          target: {
                            name: warehouseNamePrefix + warehouseId,
                            value: undefined,
                          },
                        })
                      }
                    />
                  ))}
                {data?.exportInfo?.warehouses?.length + selectedInventoryFields.length >
                  maxChips && (
                  <Typography className={styles.moreLabel ?? ''} variant="caption">
                    <>
                      {t(
                        'dashboard.e/Sph',
                        'and {number} more',
                        // "there are more elements of list that are hidden"
                        {
                          number:
                            data?.exportInfo?.warehouses?.length +
                            selectedInventoryFields.length -
                            maxChips,
                        }
                      )}
                    </>
                  </Typography>
                )}
              </div>
            )
          }
          data-test-id="inventory"
        >
          <div>
            <Option
              checked={selectedAllInventoryFields}
              name="all"
              onChange={() => handleToggleAllFields(inventoryFields, !selectedAllInventoryFields)}
            >
              <>
                {/* selectt all options */}

                {t('dashboard.QRnYK', 'Select All')}
              </>
            </Option>
            {inventoryFields.map((field) => (
              <Option
                checked={data?.exportInfo?.fields?.includes(field)}
                name={field}
                onChange={handleFieldChange}
                key={field}
              >
                {getFieldLabel(field)}
              </Option>
            ))}
          </div>
          <Divider className={styles.hrWarehouses ?? ''} />
          <Typography>{t('dashboard.Rz3hM', 'Export Product Stock Quantity to CSV')}</Typography>
          <div>
            <Option
              checked={warehouses.every(
                (warehouse) => data?.exportInfo?.warehouses?.includes(warehouse.value)
              )}
              name="all-warehouses"
              onChange={onSelectAllWarehouses}
            >
              <>
                {/* option */}

                {t('dashboard.Gm7E5', 'Export stock for all warehouses')}
              </>
            </Option>
          </div>
          <Divider className={styles.hrWarehouses ?? ''} />
          <Typography className={styles.warehousesLabel ?? ''} variant="subtitle1">
            <>
              {/* list of warehouses */}

              {t('dashboard.QMTKI', 'Warehouses A to Z')}
            </>
          </Typography>
          {warehouses.map((warehouse) => (
            <Option
              checked={data?.exportInfo?.warehouses?.includes(warehouse.value)}
              name={warehouseNamePrefix + warehouse.value}
              onChange={onWarehouseSelect}
              key={warehouse.value}
            >
              {warehouse.label}
            </Option>
          ))}
        </Accordion>
        <FieldAccordion
          title={t(
            'dashboard.xC/Ls',
            'SEO Information'
            // informations about product seo, header
          )}
          data={data}
          fields={[
            ProductField.Description,
            ProductField.Name,
            ProductField.ProductMediaItem,
            ProductField.VariantMedia,
          ]}
          onChange={handleFieldChange}
          onToggleAll={handleToggleAllFields}
          data-test-id="seo"
        />
      </div>
    </>
  );
};

ProductExportDialogInfo.displayName = 'ProductExportDialogInfo';
export default ProductExportDialogInfo;
