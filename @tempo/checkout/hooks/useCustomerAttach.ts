import { CheckoutCustomerAttachDocument } from '@tempo/api/generated/graphql';
import { useUser } from '@tempo/api/auth/react/hooks';
import { useMutation } from '@tempo/api/hooks/useMutation';
import { useEffect } from 'react';
import { useSubmit } from '@tempo/checkout/hooks/useSubmit';
import { useCheckout } from '@tempo/checkout/providers/CheckoutProvider';

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
