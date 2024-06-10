import * as m from '@paraglide/messages';
import Grid from '@tempo/ui/components/Grid';
import { Backlink } from '@tempo/ui/components/Layout/Backlink';
import PageHeader from '@tempo/dashboard/components/core/PageHeader';
import RequirePermissions from '@tempo/dashboard/components/core/RequirePermissions';
import { PermissionCode } from '@tempo/api/generated/constants';
import type { ShippingZoneFragment, WeightUnit } from '@tempo/api/generated/constants';
import type { SubmitPromise } from '@tempo/dashboard/hooks/useForm';
import type { ListActions, PageListProps, UserPermissionProps } from '@tempo/dashboard/oldSrc/types';
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
  return (
    <Container>
      <Backlink href={'/configuration'}>
        {m.dashboard_configuration() ?? 'Configuration'}
      </Backlink>
      <PageHeader title={m.dashboard_shipping() ?? 'Shipping'} />
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
