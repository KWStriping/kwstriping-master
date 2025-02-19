import * as m from '@paraglide/messages';
import { Backlink } from '@tempo/ui/components/Layout/Backlink';
import type { ConfirmButtonTransitionState } from '@tempo/ui/components/buttons/ConfirmButton';
import type {
  OrderSettingsFragment,
  ShopOrderSettingsFragment,
} from '@tempo/api/generated/graphql';
import Container from '@mui/material/Container';
import { useRouter } from 'next/navigation';
import type { FC } from 'react';

import OrderSettingsForm, { useOrderSettingsForm } from './form';
import type { OrderSettingsFormData } from './types';
import type { SubmitPromise } from '@tempo/dashboard/hooks/useForm';
import SaveBar from '@tempo/dashboard/components/core/SaveBar';
import PageHeader from '@tempo/dashboard/components/core/PageHeader';

export interface OrderSettingsPageProps {
  orderSettings: OrderSettingsFragment;
  shop: ShopOrderSettingsFragment;
  disabled: boolean;
  saveButtonBarState: ConfirmButtonTransitionState;
  onSubmit: (data: OrderSettingsFormData) => SubmitPromise;
}

const OrderSettingsPage: FC<OrderSettingsPageProps> = ({
  orderSettings,
  shop,
  disabled,
  saveButtonBarState,
  onSubmit,
}) => {
  const router = useRouter();
  const formProps = useOrderSettingsForm(orderSettings, shop, onSubmit, disabled);
  return (
    <Container>
      <Backlink href={'/orders'}>{m.dashboard_orders() ?? 'Orders'}</Backlink>
      <PageHeader title={m.dashboard_orderSettings() ?? 'Order settings'} />
      <OrderSettingsForm disabled={disabled} {...formProps} />
      <SaveBar
        onCancel={() => router.push('/orders')}
        onSubmit={formProps.submit}
        disabled={!!formProps.isSaveDisabled}
        state={saveButtonBarState}
      />
    </Container>
  );
};
OrderSettingsPage.displayName = 'OrderSettingsPage';
export default OrderSettingsPage;
