import { useTranslation } from '@core/i18n';
import CardTitle from '@dashboard/components/core/CardTitle';
import type { MultiAutocompleteChoiceType } from '@dashboard/components/fields/MultiAutocompleteSelectField';
import type { ShippingZoneUpdateFormData } from '@dashboard/components/ShippingZoneDetailsPage/types';
import type { ChannelFragment } from '@core/api/graphql';
import type { FormChange } from '@dashboard/hooks/useForm';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import type { FC } from 'react';

import ChannelsSection from './ChannelsSection';
import WarehousesSection from './WarehousesSection';

const messages = {
  title: {
    id: 't/R8nK',
    defaultMessage: 'Settings',
    description: 'ShippingZoneSettingsCard title',
  },
};

export interface ShippingZoneSettingsCardProps {
  formData: ShippingZoneUpdateFormData;
  warehousesDisplayValues: MultiAutocompleteChoiceType[];
  warehousesChoices: MultiAutocompleteChoiceType[];
  onWarehouseAdd: () => void;
  onWarehouseChange: FormChange;
  hasMoreWarehouses: boolean;
  onFetchMoreWarehouses: () => void;
  onWarehousesSearchChange: (query: string) => void;
  channelsDisplayValues: MultiAutocompleteChoiceType[];
  onChannelChange: FormChange;
  allChannels?: Maybe<ChannelFragment[]>;
  loading: boolean;
}

export const ShippingZoneSettingsCard: FC<ShippingZoneSettingsCardProps> = ({
  formData,
  warehousesDisplayValues,
  hasMoreWarehouses,
  loading,
  warehousesChoices,
  onFetchMoreWarehouses,
  onWarehousesSearchChange,
  onWarehouseAdd,
  onWarehouseChange,
  allChannels,
  onChannelChange,
  channelsDisplayValues,
}) => {
  const { t } = useTranslation();

  return (
    <Card>
      <CardTitle title={t('dashboard.title', 'Settings')} />
      <CardContent>
        <ChannelsSection
          channelsDisplayValues={channelsDisplayValues}
          onChange={onChannelChange}
          allChannels={allChannels}
          selectedChannels={formData.channels}
        />
      </CardContent>
      <Divider />
      <CardContent>
        <WarehousesSection
          onAdd={onWarehouseAdd}
          onSearchChange={onWarehousesSearchChange}
          onChange={onWarehouseChange}
          onFetchMore={onFetchMoreWarehouses}
          displayValues={warehousesDisplayValues}
          choices={warehousesChoices}
          selectedWarehouses={formData.warehouses}
          hasMore={hasMoreWarehouses}
          loading={loading}
        />
      </CardContent>
    </Card>
  );
};

export default ShippingZoneSettingsCard;
