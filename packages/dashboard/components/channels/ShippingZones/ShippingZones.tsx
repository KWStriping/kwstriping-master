import { useTranslation } from '@core/i18n';
import CardTitle from '@dashboard/components/core/CardTitle';
import type { ChannelShippingZones } from '@dashboard/oldSrc/channels/pages/ChannelDetailsPage/types';
import type { FetchMoreProps } from '@dashboard/oldSrc/types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';

import AssignmentList from '../AssignmentList';

export interface ShippingZonesProps {
  addShippingZone: (id: string) => void;
  removeShippingZone: (id: string) => void;
  searchShippingZones: (searchPhrase: string) => void;
  loading: boolean;
  totalCount: number;
  fetchMoreShippingZones: FetchMoreProps;
  shippingZones: ChannelShippingZones;
  shippingZonesChoices: ChannelShippingZones;
}

const ShippingZones: FC<ShippingZonesProps> = (props) => {
  const {
    addShippingZone,
    removeShippingZone,
    searchShippingZones,
    loading,
    totalCount,
    fetchMoreShippingZones,
    shippingZones,
    shippingZonesChoices,
  } = props;

  const { t } = useTranslation();

  return (
    <Card>
      <CardTitle title={t('dashboard.shippingZones', 'Shipping Zones')} />
      <CardContent>
        <Typography>
          {t(
            'dashboard.subtitle',
            'Select shipping zones that will be supplied via this channel. You can assign shipping zones to multiple channels.'
          )}
        </Typography>
      </CardContent>
      <AssignmentList
        loading={loading}
        items={shippingZones}
        itemsChoices={shippingZonesChoices}
        addItem={addShippingZone}
        removeItem={removeShippingZone}
        searchItems={searchShippingZones}
        fetchMoreItems={fetchMoreShippingZones}
        totalCount={totalCount}
        datatestId="shipping"
        inputName="shippingZone"
        itemsName={t('dashboard.shippingZones', 'Shipping Zones')}
      />
    </Card>
  );
};

export default ShippingZones;
