import { CheckoutCustomerAttachDocument } from '@core/api';
import { useUser } from '@core/auth/react/hooks';
import { useMutation } from '@core/urql/hooks/useMutation';
import { useEffect } from 'react';
import { useSubmit } from '@core/checkout/hooks/useSubmit';
import { useCheckout } from '@core/checkout/providers/CheckoutProvider';

export const useCustomerAttach = () => {
  const { checkout, loading } = useCheckout();
  const { user, authenticated } = useUser();

  const [customerAttach, { fetching }] = useMutation(CheckoutCustomerAttachDocument);

  const handleSubmit = useSubmit<{}, typeof customerAttach>({
    scope: 'attachCustomerToCheckout',
    shouldAbort: () => checkout?.user?.id === user?.id || fetching || loading,
    onSubmit: customerAttach,
    formDataParse: ({ languageCode, checkoutId }) => ({ languageCode, id: checkoutId }),
  });

  useEffect(() => {
    void handleSubmit({});
  }, [authenticated, handleSubmit]);
};
