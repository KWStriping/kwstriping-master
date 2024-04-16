import type { ConfirmButtonTransitionState } from '@core/ui/components/buttons/ConfirmButton';
import Grid from '@core/ui/components/Grid';
import ChannelAllocationStrategy from '@dashboard/components/channels/ChannelAllocationStrategy';
import type { FormData } from '@dashboard/components/channels/ChannelForm';
import { ChannelForm } from '@dashboard/components/channels/ChannelForm';
import { ChannelStatus } from '@dashboard/components/channels/ChannelStatus';
import ShippingZones from '@dashboard/components/channels/ShippingZones';
import Warehouses from '@dashboard/components/channels/Warehouses';
import CardSpacer from '@dashboard/components/core/CardSpacer';
import RequirePermissions from '@dashboard/components/core/RequirePermissions';
import SaveBar from '@dashboard/components/core/SaveBar';
import type { SingleAutocompleteChoiceType } from '@dashboard/components/fields/SingleAutocompleteSelectField';
import Form from '@dashboard/components/forms/Form';
import { AllocationStrategy, PermissionCode } from '@core/api/constants';
import type {
  ChannelDetailsFragment,
  ChannelErrorFragment,
  CountryCode,
  CountryFragment,
  SearchWarehousesQuery,
  StockSettingsInput,
} from '@core/api/graphql';
import type { SubmitPromise } from '@dashboard/hooks/useForm';
import useStateFromProps from '@dashboard/hooks/useStateFromProps';
import { validateChannelFormData } from '@dashboard/oldSrc/channels/validation';
import type { FetchMoreProps, RelayToFlat } from '@dashboard/oldSrc/types';
import createSingleAutocompleteSelectHandler from '@dashboard/oldSrc/utils/handlers/singleAutocompleteSelectChangeHandler';
import { mapCountriesToChoices } from '@dashboard/oldSrc/utils/maps';
import { useRouter } from 'next/router';
import { useState } from 'react';

import {
  createShippingZoneAddHandler,
  createShippingZoneRemoveHandler,
  createWarehouseAddHandler,
  createWarehouseRemoveHandler,
  createWarehouseReorderHandler,
} from './handlers';
import type { ChannelShippingZones, ChannelWarehouses } from './types';

export interface ChannelDetailsPageProps<TErrors extends ChannelErrorFragment[]> {
  channel?: ChannelDetailsFragment;
  currencyCodes?: SingleAutocompleteChoiceType[];
  disabled: boolean;
  disabledStatus?: boolean;
  errors: ChannelErrorFragment[];
  saveButtonBarState: ConfirmButtonTransitionState;
  searchShippingZonesData?: SearchData;
  fetchMoreShippingZones: FetchMoreProps;
  channelShippingZones?: ChannelShippingZones;
  allShippingZonesCount: number;
  searchWarehousesData?: SearchData;
  fetchMoreWarehouses: FetchMoreProps;
  channelWarehouses?: ChannelWarehouses;
  allWarehousesCount: number;
  countries: CountryFragment[];
  onDelete?: () => void;
  onSubmit: (data: FormData) => SubmitPromise<TErrors>;
  updateChannelStatus?: () => void;
  searchShippingZones: (query: string) => void;
  searchWarehouses: (query: string) => void;
}

const ChannelDetailsPage = function <TErrors extends ChannelErrorFragment[]>({
  channel,
  currencyCodes,
  disabled,
  disabledStatus,
  onSubmit,
  errors,
  onDelete,
  saveButtonBarState,
  updateChannelStatus,
  searchShippingZones,
  searchShippingZonesData,
  fetchMoreShippingZones,
  channelShippingZones = [],
  allShippingZonesCount,
  searchWarehouses,
  searchWarehousesData,
  fetchMoreWarehouses,
  channelWarehouses = [],
  allWarehousesCount,
  countries,
}: ChannelDetailsPageProps<TErrors>) {
  const router = useRouter();

  const [validationErrors, setValidationErrors] = useState<ChannelErrorFragment[]>([]);

  const [selectedCurrencyCode, setSelectedCurrencyCode] = useState('');
  const [selectedCountryName, setSelectedCountryName] = useStateFromProps(
    channel?.defaultCountry.name || ''
  );

  const countryChoices = mapCountriesToChoices(countries || []);

  const { defaultCountry, stockSettings, ...formData } =
    channel || ({} as ChannelDetailsFragment);
  const initialStockSettings: StockSettingsInput = {
    allocationStrategy: AllocationStrategy.PrioritizeSortingOrder,
    ...stockSettings,
  };
  const initialData: FormData = {
    currencyCode: '',
    name: '',
    slug: '',
    shippingZonesIdsToAdd: [],
    shippingZonesIdsToRemove: [],
    warehousesIdsToAdd: [],
    warehousesIdsToRemove: [],
    defaultCountry: (defaultCountry?.code || '') as CountryCode,
    ...formData,
    ...initialStockSettings,
    shippingZonesToDisplay: channelShippingZones,
    warehousesToDisplay: channelWarehouses,
  };

  const getFilteredWarehousesChoices = (
    warehousesToDisplay: ChannelWarehouses
  ): RelayToFlat<NonNullable<SearchWarehousesQuery['search']>> =>
    getParsedSearchData({ data: searchWarehousesData }).filter(
      ({ id: searchedWarehouseId }) =>
        !warehousesToDisplay.some(({ id }) => id === searchedWarehouseId)
    );

  const handleSubmit = async (data: FormData) => {
    const errors = validateChannelFormData(data);

    setValidationErrors(errors);

    if (errors?.length) {
      return errors;
    }

    return onSubmit(data);
  };

  return (
    <Form confirmLeave onSubmit={handleSubmit} initial={initialData}>
      {({ change, data, submit, set, triggerChange }) => {
        const handleCurrencyCodeSelect = createSingleAutocompleteSelectHandler(
          change,
          setSelectedCurrencyCode,
          currencyCodes
        );
        const handleDefaultCountrySelect = createSingleAutocompleteSelectHandler(
          change,
          setSelectedCountryName,
          countryChoices
        );

        const addShippingZone = createShippingZoneAddHandler(
          data,
          searchShippingZonesData,
          set,
          triggerChange
        );
        const removeShippingZone = createShippingZoneRemoveHandler(data, set, triggerChange);

        const addWarehouse = createWarehouseAddHandler(
          data,
          searchWarehousesData,
          set,
          triggerChange
        );
        const removeWarehouse = createWarehouseRemoveHandler(data, set, triggerChange);
        const reorderWarehouse = createWarehouseReorderHandler(data, set);

        const allErrors = [...errors, ...validationErrors];

        return (
          <>
            <Grid>
              <div>
                <ChannelForm
                  data={data}
                  disabled={disabled}
                  currencyCodes={currencyCodes}
                  countries={countryChoices}
                  selectedCurrencyCode={selectedCurrencyCode}
                  selectedCountryName={selectedCountryName}
                  onChange={change}
                  onCurrencyCodeChange={handleCurrencyCodeSelect}
                  onDefaultCountryChange={handleDefaultCountrySelect}
                  errors={allErrors}
                />
              </div>
              <div>
                {!!updateChannelStatus && (
                  <>
                    <ChannelStatus
                      isActive={channel?.isActive}
                      disabled={disabledStatus}
                      updateChannelStatus={updateChannelStatus}
                    />
                    <CardSpacer />
                  </>
                )}
                <RequirePermissions requiredPermissions={[PermissionCode.ManageShipping]}>
                  <ShippingZones
                    shippingZonesChoices={getFilteredShippingZonesChoices(
                      data?.shippingZonesToDisplay
                    )}
                    shippingZones={data?.shippingZonesToDisplay}
                    addShippingZone={addShippingZone}
                    removeShippingZone={removeShippingZone}
                    searchShippingZones={searchShippingZones}
                    fetchMoreShippingZones={fetchMoreShippingZones}
                    totalCount={allShippingZonesCount}
                    loading={disabled}
                  />
                  <CardSpacer />
                </RequirePermissions>
                <RequirePermissions
                  oneOfPermissions={[
                    PermissionCode.ManageShipping,
                    PermissionCode.ManageOrders,
                    PermissionCode.ManageProducts,
                  ]}
                >
                  <Warehouses
                    warehousesChoices={getFilteredWarehousesChoices(data?.warehousesToDisplay)}
                    warehouses={data?.warehousesToDisplay}
                    addWarehouse={addWarehouse}
                    removeWarehouse={removeWarehouse}
                    searchWarehouses={searchWarehouses}
                    fetchMoreWarehouses={fetchMoreWarehouses}
                    totalCount={allWarehousesCount}
                    reorderWarehouses={reorderWarehouse}
                    loading={disabled}
                  />
                  <CardSpacer />
                </RequirePermissions>
                <ChannelAllocationStrategy data={data} disabled={disabled} onChange={change} />
              </div>
            </Grid>
            <SaveBar
              onCancel={() => router.push('/channels')}
              onSubmit={submit}
              onDelete={onDelete}
              state={saveButtonBarState}
              disabled={disabled}
            />
          </>
        );
      }}
    </Form>
  );
};

ChannelDetailsPage.displayName = 'ChannelDetailsPage';
export default ChannelDetailsPage;
