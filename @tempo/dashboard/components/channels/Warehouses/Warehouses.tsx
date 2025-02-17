import * as m from '@paraglide/messages';
import type { SearchWarehousesQuery } from '@tempo/api/generated/graphql';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';

import AssignmentList from '../AssignmentList';
import type { FetchMoreProps, RelayToFlat, ReorderAction } from '@tempo/dashboard/oldSrc/types';
import type { ChannelWarehouses } from '@tempo/dashboard/oldSrc/channels/pages/ChannelDetailsPage/types';
import CardTitle from '@tempo/dashboard/components/core/CardTitle';

export interface WarehousesProps {
  addWarehouse: (id: string) => void;
  removeWarehouse: (id: string) => void;
  searchWarehouses: (searchPhrase: string) => void;
  reorderWarehouses: ReorderAction;
  loading: boolean;
  totalCount: number;
  fetchMoreWarehouses: FetchMoreProps;
  warehouses: ChannelWarehouses;
  warehousesChoices: RelayToFlat<NonNullable<SearchWarehousesQuery['search']>>;
}

const Warehouses: FC<WarehousesProps> = (props) => {
  const {
    addWarehouse,
    removeWarehouse,
    searchWarehouses,
    reorderWarehouses,
    loading,
    totalCount,
    fetchMoreWarehouses,
    warehouses,
    warehousesChoices,
  } = props;

  return (
    <Card>
      <CardTitle title={m.dashboard_warehouses() ?? 'Warehouses'} />
      <CardContent>
        <Typography>
          {m.dashboard_subtitle() ??
            'Assign and sort warehouses that will be used in this channel (warehouses can be assigned in multiple channels).'}
        </Typography>
      </CardContent>
      <AssignmentList
        loading={loading}
        items={warehouses}
        itemsChoices={warehousesChoices}
        addItem={addWarehouse}
        removeItem={removeWarehouse}
        searchItems={searchWarehouses}
        reorderItem={reorderWarehouses}
        fetchMoreItems={fetchMoreWarehouses}
        totalCount={totalCount}
        dataTestId="warehouse"
        inputName="warehouse"
        itemsName={m.dashboard_warehouses() ?? 'Warehouses'}
      />
    </Card>
  );
};
export default Warehouses;
