// import type {
//   AttachCustomerToCheckoutMutation,
//   AttachCustomerToCheckoutMutationVariables,
// } from '@tempo/api/generated/graphql';
// import { AttachCustomerToCheckoutDocument } from '@tempo/api/generated/graphql';
// import { useUser } from '@tempo/api/auth/react/hooks';
// import { useMutation } from '@tempo/api/hooks/useMutation';
// import { useEffect } from 'react';
// import { useCheckout } from '@tempo/checkout/providers/CheckoutProvider';

// export const useCustomerAttach = () => {
//   const { checkout, loading } = useCheckout();
//   const { user, authenticated } = useUser();

//   const [customerAttach, { fetching }] = useMutation<
//     AttachCustomerToCheckoutMutation,
//     AttachCustomerToCheckoutMutationVariables
//   >(AttachCustomerToCheckoutDocument);

//   useEffect(() => {
//     void handleSubmit({});
//   }, [authenticated, handleSubmit]);
// };
