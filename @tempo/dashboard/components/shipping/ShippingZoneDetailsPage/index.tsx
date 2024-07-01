import * as m from '@paraglide/messages';
import type { UrlObject } from 'url';
// import { useTranslation } from '@tempo/next/i18n';
import type { ConfirmButtonTransitionState } from '@tempo/ui/components/buttons/ConfirmButton';
import Grid from '@tempo/ui/components/Grid';
import { Backlink } from '@tempo/ui/components/Layout/Backlink';
import CardSpacer from '@tempo/dashboard/components/core/CardSpacer';
import CountryList from '@tempo/dashboard/components/core/CountryList';
import Metadata from '@tempo/dashboard/components/core/Metadata';
import PageHeader from '@tempo/dashboard/components/core/PageHeader';
import SaveBar from '@tempo/dashboard/components/core/SaveBar';
import type { MultiAutocompleteChoiceType } from '@tempo/dashboard/components/fields/MultiAutocompleteSelectField';
import type { SingleAutocompleteChoiceType } from '@tempo/dashboard/components/fields/SingleAutocompleteSelectField';
import Form from '@tempo/dashboard/components/forms/Form';
import type { ShippingZoneUpdateFormData } from '@tempo/dashboard/components/ShippingZoneDetailsPage/types';
import type {
  ChannelFragment,
  ShippingErrorFragment,
  ShippingZoneDetailsFragment,
  ShippingZoneQuery,
} from '@tempo/api/generated/graphql';
import type { SubmitPromise } from '@tempo/dashboard/hooks/useForm';
import useStateFromProps from '@tempo/dashboard/hooks/useStateFromProps';
import { getStringOrPlaceholder } from '@tempo/dashboard/oldSrc/misc';
import type { ChannelProps, FetchMoreProps, SearchProps } from '@tempo/dashboard/oldSrc/types';
import createMultiAutocompleteSelectHandler from '@tempo/dashboard/oldSrc/utils/handlers/multiAutocompleteSelectChangeHandler';
import { mapNodeToChoice } from '@tempo/dashboard/oldSrc/utils/maps';
import useMetadataChangeTrigger from '@tempo/dashboard/oldSrc/utils/metadata/useMetadataChangeTrigger';
import Container from '@mui/material/Container';
import { useRouter } from 'next/navigation';
import type { FC } from 'react';

import ShippingZoneInfo from '../ShippingZoneInfo';
import ShippingZoneRates from '../ShippingZoneRates';
import ShippingZoneSettingsCard from '../ShippingZoneSettingsCard';
import { getInitialFormData } from './utils';

export interface ShippingZoneDetailsPageProps extends FetchMoreProps, SearchProps, ChannelProps {
  disabled: boolean;
  errors: ShippingErrorFragment[];
  saveButtonBarState: ConfirmButtonTransitionState;
  shippingZone: ShippingZoneQuery['shippingZone'];
  warehouses: ShippingZoneDetailsFragment['warehouses'];
  onCountryAdd: () => void;
  onCountryRemove: (code: string) => void;
  onDelete: () => void;
  onRateAdd: () => void;
  getRateEditHref: (id: string) => string | UrlObject;
  onRateRemove: (rateId: string) => void;
  onSubmit: (data: ShippingZoneUpdateFormData) => SubmitPromise;
  onWarehouseAdd: () => void;
  allChannels?: Maybe<ChannelFragment[]>;
}

function warehouseToChoice(
  warehouse: Record<'id' | 'name', string>
): SingleAutocompleteChoiceType {
  return {
    label: warehouse.name,
    value: warehouse.id,
  };
}

const ShippingZoneDetailsPage: FC<ShippingZoneDetailsPageProps> = ({
  disabled,
  errors,
  hasMore,
  loading,
  onCountryAdd,
  onCountryRemove,
  onDelete,
  onFetchMore,
  onRateAdd,
  getRateEditHref,
  onRateRemove,
  onSearchChange,
  onSubmit,
  onWarehouseAdd,
  saveButtonBarState,
  selectedChannelId,
  shippingZone,
  warehouses,
  allChannels,
}) => {
  const router = useRouter();

  const initialForm = getInitialFormData(shippingZone);

  const [warehouseDisplayValues, setWarehouseDisplayValues] = useStateFromProps<
    MultiAutocompleteChoiceType[]
  >(mapNodeToChoice(shippingZone?.warehouses));

  const warehouseChoices = warehouses.map(warehouseToChoice);

  const channelChoices = mapNodeToChoice(allChannels);

  const [channelsDisplayValues, setChannelDisplayValues] = useStateFromProps<
    MultiAutocompleteChoiceType[]
  >(mapNodeToChoice(shippingZone?.channels));

  const { makeChangeHandler: makeMetadataChangeHandler } = useMetadataChangeTrigger();

  return (
    <Form initial={initialForm} onSubmit={onSubmit} confirmLeave disabled={disabled}>
      {({ change, data, isSaveDisabled, submit, toggleValue }) => {
        const handleWarehouseChange = createMultiAutocompleteSelectHandler(
          toggleValue,
          setWarehouseDisplayValues,
          warehouseDisplayValues,
          warehouseChoices
        );

        const handleChannelChange = createMultiAutocompleteSelectHandler(
          toggleValue,
          setChannelDisplayValues,
          channelsDisplayValues,
          channelChoices
        );

        const changeMetadata = makeMetadataChangeHandler(change);

        return (
          <Container>
            <Backlink href={'/shipping'}>{m.dashboard_shipping() ?? 'Shipping'}</Backlink>
            <PageHeader title={shippingZone?.name} />
            <Grid>
              <div>
                <ShippingZoneInfo
                  data={data}
                  disabled={disabled}
                  errors={errors}
                  onChange={change}
                />
                <CardSpacer />
                <CountryList
                  countries={shippingZone?.countries}
                  disabled={disabled}
                  emptyText={getStringOrPlaceholder(
                    shippingZone
                      ? t(
                          'dashboard_oCountriesAssigned',
                          'Currently, there are no countries assigned to this shipping zone'
                        )
                      : undefined
                  )}
                  onCountryAssign={onCountryAdd}
                  onCountryUnassign={onCountryRemove}
                  title={m.dashboard_countries() ?? 'Countries'}
                />
                <CardSpacer />
                <ShippingZoneRates
                  disabled={disabled}
                  onRateAdd={onRateAdd}
                  getRateEditHref={getRateEditHref}
                  onRateRemove={onRateRemove}
                  rates={shippingZone?.shippingMethods}
                  selectedChannelId={selectedChannelId}
                  testId="add-rate"
                />
                <CardSpacer />
                <Metadata data={data} onChange={changeMetadata} />
              </div>
              <div>
                <ShippingZoneSettingsCard
                  formData={data}
                  warehousesDisplayValues={warehouseDisplayValues}
                  hasMoreWarehouses={hasMore}
                  loading={loading}
                  onWarehouseChange={handleWarehouseChange}
                  onFetchMoreWarehouses={onFetchMore}
                  onWarehousesSearchChange={onSearchChange}
                  onWarehouseAdd={onWarehouseAdd}
                  warehousesChoices={warehouseChoices}
                  allChannels={allChannels}
                  channelsDisplayValues={channelsDisplayValues}
                  onChannelChange={handleChannelChange}
                />
              </div>
            </Grid>
            <SaveBar
              disabled={isSaveDisabled}
              onCancel={() => router.push('/shipping')}
              onDelete={onDelete}
              onSubmit={submit}
              state={saveButtonBarState}
            />
          </Container>
        );
      }}
    </Form>
  );
};
ShippingZoneDetailsPage.displayName = 'ShippingZoneDetailsPage';
export default ShippingZoneDetailsPage;
