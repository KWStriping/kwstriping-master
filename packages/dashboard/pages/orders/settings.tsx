import { useTranslation } from '@core/i18n';
import useNotifier from '@core/ui/hooks/useNotifier';
import { useMutation } from '@core/urql/hooks/useMutation';
import { useQuery } from '@core/urql/hooks/useQuery';
import { extractMutationErrors, getMutationState } from '@core/urql/utils';
import Skeleton from '@mui/material/Skeleton';
import OrderSettingsPage from '@dashboard/components/orders/OrderSettingsPage';
import type { OrderSettingsFormData } from '@dashboard/components/orders/OrderSettingsPage/types';
import { OrderSettingsDocument, OrderSettingsUpdateDocument } from '@core/api/graphql';

export const OrderSettings = () => {
  const { t } = useTranslation();
  const notify = useNotifier();
  const [{ data, fetching: loading }] = useQuery(OrderSettingsDocument, {});
  const [updateOrderSettings, updateOrderSettingsOpts] = useMutation(
    OrderSettingsUpdateDocument,
    {
      onCompleted: ({ updateOrderSettings: { errors } }) => {
        if (!errors?.length) {
          notify(t('dashboard.savedChanges', 'Saved changes'), {
            type: 'success',
          });
          return;
        }
        notify(t('dashboard.somethingWentWrong', 'Tempo ran into an unexpected problem'), {
          type: 'error',
        });
      },
    }
  );

  const handleSubmit = async ({
    autoConfirmAllNewOrders,
    autoFulfillNonShippableGiftCard,
    autoApproveFulfillment,
    fulfillmentAllowUnpaid,
  }: OrderSettingsFormData) =>
    extractMutationErrors(
      updateOrderSettings({
        orderSettingsInput: {
          autoFulfillNonShippableGiftCard,
          autoConfirmAllNewOrders,
        },
        shopSettingsInput: {
          autoApproveFulfillment,
          fulfillmentAllowUnpaid,
        },
      })
    );
  if (data?.orderSettings && data?.shop) {
    return (
      <OrderSettingsPage
        orderSettings={data?.orderSettings}
        shop={data?.shop}
        disabled={loading || updateOrderSettingsOpts.fetching}
        onSubmit={handleSubmit}
        saveButtonBarState={getMutationState(
          updateOrderSettingsOpts.called,
          updateOrderSettingsOpts.fetching,
          [...(updateOrderSettingsOpts.data?.updateOrderSettings?.errors || [])]
        )}
      />
    );
  } else {
    return <Skeleton />;
  }
};
export default OrderSettings;
