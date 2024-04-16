import { useTranslation } from '@core/i18n';
import Grid from '@core/ui/components/Grid';
import { Backlink } from '@core/ui/components/Layout/Backlink';
import PageHeader from '@dashboard/components/core/PageHeader';
import RequirePermissions from '@dashboard/components/core/RequirePermissions';
import { PermissionCode } from '@core/api/constants';
import type { ShippingZoneFragment, WeightUnit } from '@core/api/constants';
import type { SubmitPromise } from '@dashboard/hooks/useForm';
import type { ListActions, PageListProps, UserPermissionProps } from '@dashboard/oldSrc/types';
import Container from '@mui/material/Container';
import type { FC } from 'react';

import ShippingWeightUnitForm from './ShippingWeightUnitForm';
import ShippingZonesList from './ShippingZonesList';

export interface ShippingZonesListPageProps
  extends PageListProps,
    ListActions,
    UserPermissionProps {
  defaultWeightUnit: WeightUnit;
  shippingZones: ShippingZoneFragment[];
  onRemove: (id: string) => void;
  onSubmit: (unit: WeightUnit) => SubmitPromise;
}

const ShippingZonesListPage: FC<ShippingZonesListPageProps> = ({
  defaultWeightUnit,
  disabled,
  onSubmit,
  ...listProps
}) => {
  const { t } = useTranslation();

  return (
    <Container>
      <Backlink href={'/configuration'}>{t('dashboard.configuration', 'Configuration')}</Backlink>
      <PageHeader title={t('dashboard.shipping', 'Shipping')} />
      <Grid>
        <div>
          <ShippingZonesList disabled={disabled} {...listProps} />
        </div>
        <div>
          <RequirePermissions requiredPermissions={[PermissionCode.ManageSettings]}>
            <ShippingWeightUnitForm
              defaultWeightUnit={defaultWeightUnit}
              disabled={disabled}
              onSubmit={onSubmit}
            />
          </RequirePermissions>
        </div>
      </Grid>
    </Container>
  );
};
ShippingZonesListPage.displayName = 'ShippingZonesListPage';
export default ShippingZonesListPage;
