import { useTranslation } from '@core/i18n';
import { Backlink } from '@core/ui/components/Layout/Backlink';
import type { ConfirmButtonTransitionState } from '@core/ui/components/buttons/ConfirmButton';
import PageHeader from '@dashboard/components/core/PageHeader';
import SaveBar from '@dashboard/components/core/SaveBar';
import type {
  OrderSettingsFragment,
  ShopOrderSettingsFragment,
} from '@core/api/graphql';
import type { SubmitPromise } from '@dashboard/hooks/useForm';
import Container from '@mui/material/Container';
import { useRouter } from 'next/router';
import type { FC } from 'react';

import OrderSettingsForm, { useOrderSettingsForm } from './form';
import type { OrderSettingsFormData } from './types';

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
  const { t } = useTranslation();
  const router = useRouter();
  const formProps = useOrderSettingsForm(orderSettings, shop, onSubmit, disabled);
  return (
    <Container>
      <Backlink href={'/orders'}>{t('dashboard.orders', 'Orders')}</Backlink>
      <PageHeader title={t('dashboard.orderSettings', 'Order settings')} />
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
