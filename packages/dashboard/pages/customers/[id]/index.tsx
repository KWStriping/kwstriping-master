import { Trans, useTranslation } from '@core/i18n';
import useNotifier from '@core/ui/hooks/useNotifier';
import { useMutation } from '@core/urql/hooks/useMutation';
import { extractMutationErrors } from '@core/urql/utils';
import DialogContentText from '@mui/material/DialogContentText';
import { useRouter } from 'next/router';
import { assert } from 'tsafe/assert';
import NotFoundPage from '@dashboard/components/core/NotFoundPage';
import { WindowTitle } from '@dashboard/components/core/WindowTitle';
import type { CustomerDetailsPageFormData } from '@dashboard/components/customers/CustomerDetailsPage';
import CustomerDetailsPage from '@dashboard/components/customers/CustomerDetailsPage';
import ActionDialog from '@dashboard/components/dialogs/ActionDialog';
import {
  RemoveCustomerDocument,
  UpdateCustomerDocument,
  UpdateMetadataDocument,
  UpdatePrivateMetadataDocument,
} from '@core/api/graphql';

import { useCustomerDetails } from '@dashboard/oldSrc/customers/hooks/useCustomerDetails';
import { getStringOrPlaceholder } from '@dashboard/oldSrc/misc';
import createMetadataUpdateHandler from '@dashboard/oldSrc/utils/handlers/metadataUpdateHandler';

export const CustomerDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  assert(typeof id === 'string');

  const notify = useNotifier();
  const { t } = useTranslation();

  const customerDetails = useCustomerDetails();
  const user = customerDetails?.customer?.user;
  const customerDetailsLoading = customerDetails?.loading;

  const [removeCustomer, removeCustomerOpts] = useMutation(RemoveCustomerDocument, {
    onCompleted: (data) => {
      if (data?.deleteCustomer?.errors?.length === 0) {
        notify(t('dashboard.XatmC', 'Customer Removed'), {
          type: 'success',
        });
        void router.push('/customers');
      }
    },
  });

  const [updateUser, updateUserOpts] = useMutation(UpdateCustomerDocument, {
    onCompleted: (data) => {
      if (data?.updateUser?.errors?.length === 0) {
        notify(t('dashboard.savedChanges', 'Saved changes'), {
          type: 'success',
        });
      }
    },
  });

  const [updateMetadata] = useMutation(UpdateMetadataDocument, {});
  const [updatePrivateMetadata] = useMutation(UpdatePrivateMetadataDocument, {});

  if (user === null) {
    return <NotFoundPage backHref={'/customers'} />;
  }

  const updateData = async (data: CustomerDetailsPageFormData) =>
    extractMutationErrors(
      updateUser({
        id,
        input: {
          email: data?.email,
          firstName: data?.firstName,
          isActive: data?.isActive,
          lastName: data?.lastName,
          note: data?.note,
        },
      })
    );

  const handleSubmit = createMetadataUpdateHandler(
    user,
    updateData,
    (variables) => updateMetadata({ ...variables }),
    (variables) => updatePrivateMetadata({ ...variables })
  );

  return (
    <>
      <WindowTitle title={user?.email} />
      <CustomerDetailsPage
        customerId={id}
        customer={user}
        disabled={
          customerDetailsLoading || updateUserOpts.fetching || removeCustomerOpts.fetching
        }
        errors={updateUserOpts.data?.updateUser?.errors || []}
        saveButtonBar={updateUserOpts.status}
        onSubmit={handleSubmit}
        onDelete={() =>
          void router.push({ pathname: '/customers/[id]', query: { action: 'remove' } })
        }
      />
      <ActionDialog
        confirmButtonState={removeCustomerOpts.status}
        onClose={() => router.replace({ pathname: '/customers/[id]', query: { id } })}
        onConfirm={() =>
          removeCustomer({
            id,
          })
        }
        title={t(
          'dashboard.y0lZj',
          'Delete Customer'
          // dialog header
        )}
        variant="delete"
        open={params.action === 'remove'}
      >
        <DialogContentText>
          <Trans
            t={t}
            i18nKey={'2p0tZx'}
            email={`<strong>${getStringOrPlaceholder(user?.email)}</strong>}`}
          >
            {'Are you sure you want to delete {email}?'}
          </Trans>
        </DialogContentText>
      </ActionDialog>
    </>
  );
};
export default CustomerDetails;
