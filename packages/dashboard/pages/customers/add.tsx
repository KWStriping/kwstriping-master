import { useTranslation } from '@core/i18n';
import useNotifier from '@core/ui/hooks/useNotifier';
import { useMutation } from '@core/urql/hooks/useMutation';
import { useQuery } from '@core/urql/hooks/useQuery';
import { extractMutationErrors } from '@core/urql/utils';
import { useRouter } from 'next/router';
import { WindowTitle } from '@dashboard/components/core/WindowTitle';
import type { CustomerCreatePageSubmitData } from '@dashboard/components/customers/CustomerCreatePage';
import CustomerCreatePage from '@dashboard/components/customers/CustomerCreatePage';
import { CustomerCreateDataDocument, CreateCustomerDocument } from '@core/api/graphql';
import { customerUrl } from '@dashboard/oldSrc/customers/urls';

export const CustomerCreate = () => {
  const router = useRouter();
  const notify = useNotifier();
  const { t } = useTranslation();

  const [{ data, fetching: loading }] = useQuery(CustomerCreateDataDocument, {
    displayLoader: true,
  });

  const [createUser, createUserOpts] = useMutation(CreateCustomerDocument, {
    onCompleted: (data) => {
      if (data?.createUser?.errors?.length === 0) {
        notify(t('dashboard.tcHpD', 'Customer created'), {
          type: 'success',
        });
        void router.push(customerUrl(data?.createUser?.user?.id));
      }
    },
  });

  const handleSubmit = (formData: CustomerCreatePageSubmitData) =>
    extractMutationErrors(
      createUser({
        variables: {
          input: {
            defaultBillingAddress: formData.address,
            defaultShippingAddress: formData.address,
            email: formData.email,
            firstName: formData.customerFirstName,
            lastName: formData.customerLastName,
            note: formData.note,
          },
        },
      })
    );

  return (
    <>
      <WindowTitle
        title={t(
          'dashboard.X2pCU',
          'Create customer'
          // window title
        )}
      />
      <CustomerCreatePage
        countries={data?.shop?.countries ?? []}
        disabled={loading || createUserOpts.fetching}
        errors={createUserOpts.data?.createUser?.errors || []}
        saveButtonBar={createUserOpts.status}
        onSubmit={handleSubmit}
      />
    </>
  );
};
export default CustomerCreate;
