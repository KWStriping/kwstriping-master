import * as m from '@paraglide/messages';
import CardTitle from '@tempo/dashboard/components/core/CardTitle';
import type { ChannelShippingZones } from '@tempo/dashboard/oldSrc/channels/pages/ChannelDetailsPage/types';
import type { FetchMoreProps } from '@tempo/dashboard/oldSrc/types';
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

  return (
    <Card>
      <CardTitle title={m.dashboard_shippingZones() ?? 'Shipping Zones'} />
      <CardContent>
        <Typography>
          {m.dashboard_subtitle() ??
            'Select shipping zones that will be supplied via this channel. You can assign shipping zones to multiple channels.'}
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
        itemsName={m.dashboard_shippingZones() ?? 'Shipping Zones'}
      />
    </Card>
  );
};

export default ShippingZones;
