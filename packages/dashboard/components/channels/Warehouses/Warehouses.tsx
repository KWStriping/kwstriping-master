import { useTranslation } from '@core/i18n';
import CardTitle from '@dashboard/components/core/CardTitle';
import type { SearchWarehousesQuery } from '@core/api/graphql';
import type { ChannelWarehouses } from '@dashboard/oldSrc/channels/pages/ChannelDetailsPage/types';
import type { FetchMoreProps, RelayToFlat, ReorderAction } from '@dashboard/oldSrc/types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';

import AssignmentList from '../AssignmentList';

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

  const { t } = useTranslation();

  return (
    <Card>
      <CardTitle title={t('dashboard.warehouses', 'Warehouses')} />
      <CardContent>
        <Typography>
          {t(
            'dashboard.subtitle',
            'Assign and sort warehouses that will be used in this channel (warehouses can be assigned in multiple channels).'
          )}
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
        itemsName={t('dashboard.warehouses', 'Warehouses')}
      />
    </Card>
  );
};
export default Warehouses;
