import { useTranslation } from '@core/i18n';
import useNotifier from '@core/ui/hooks/useNotifier';
import { useShopSettings } from '@core/ui/hooks/useShopSettings';
import { useMutation } from '@core/urql/hooks/useMutation';
import { useQuery } from '@core/urql/hooks/useQuery';
import DialogContentText from '@mui/material/DialogContentText';
import { useRouter } from 'next/router';
import { assert } from 'tsafe/assert';
import { WindowTitle } from '@dashboard/components/core/WindowTitle';
import CustomerAddressDialog from '@dashboard/components/customers/CustomerAddressDialog';
import CustomerAddressListPage from '@dashboard/components/customers/CustomerAddressListPage';
import ActionDialog from '@dashboard/components/dialogs/ActionDialog';
import {
  SetCustomerDefaultAddressDocument,
  CustomerAddressesDocument,
  RemoveCustomerAddressDocument,
  UpdateCustomerAddressDocument,
  CreateCustomerAddressDocument,
} from '@core/api/graphql';

import type {
  CustomerAddressesUrlDialog,
  CustomerAddressesUrlQueryParams,
} from '@dashboard/oldSrc/customers/urls';
import { customerAddressesUrl } from '@dashboard/oldSrc/customers/urls';
import useDialogActionHandlers from '@dashboard/oldSrc/utils/handlers/dialogActionHandlers';

interface CustomerAddressesProps {
  id: string;
  params: CustomerAddressesUrlQueryParams;
}

const CustomerAddresses = () => {
  const router = useRouter();
  const { id, ...params } = router.query;
  assert(typeof id === 'string');
  const notify = useNotifier();
  const shop = useShopSettings();
  const { t } = useTranslation();

  const [openModal, closeModal] = useDialogActionHandlers<
    CustomerAddressesUrlDialog,
    CustomerAddressesUrlQueryParams
  >((params) => customerAddressesUrl(id, params), params);

  const [setCustomerDefaultAddress] = useMutation(SetCustomerDefaultAddressDocument, {
    onCompleted: (data) => {
      if (data?.setDefaultAddress?.errors?.length === 0) {
        closeModal();
        notify(t('dashboard.savedChanges', 'Saved changes'), {
          type: 'success',
        });
      }
    },
  });

  const [createUserAddress, createUserAddressOpts] = useMutation(CreateCustomerAddressDocument, {
    onCompleted: (data) => {
      if (data?.addAddress?.errors?.length === 0) {
        closeModal();
      }
    },
  });

  const [updateUserAddress, updateUserAddressOpts] = useMutation(UpdateCustomerAddressDocument, {
    onCompleted: (data) => {
      if (data?.updateAddress?.errors?.length === 0) {
        closeModal();
        notify(t('dashboard.savedChanges', 'Saved changes'), {
          type: 'success',
        });
      }
    },
  });

  const [removeCustomerAddress, removeCustomerAddressOpts] = useMutation(
    RemoveCustomerAddressDocument,
    {
      onCompleted: (data) => {
        if (data?.deleteAddress?.errors?.length === 0) {
          closeModal();
          notify(t('dashboard.savedChanges', 'Saved changes'), {
            type: 'success',
          });
        }
      },
    }
  );

  const [customerData] = useQuery(CustomerAddressesDocument, {
    displayLoader: true,
    variables: {
      id,
    },
  });

  const countryChoices = shop?.countries || [];

  return (
    <>
      <WindowTitle title={customerData?.data?.user?.email} />
      <CustomerAddressListPage
        customer={customerData?.data?.user}
        disabled={customerData?.fetching}
        onAdd={() => openModal('add')}
        onEdit={(id) =>
          openModal('edit', {
            id,
          })
        }
        onRemove={(id) =>
          openModal('remove', {
            id,
          })
        }
        onSetAsDefault={(addressId, type) =>
          setCustomerDefaultAddress({
            variables: { addressId, type, userId: id },
          })
        }
      />
      <CustomerAddressDialog
        address={undefined}
        confirmButtonState={createUserAddressOpts.status}
        countries={countryChoices}
        errors={createUserAddressOpts?.data?.addAddress?.errors || []}
        open={params.action === 'add'}
        variant="create"
        onClose={closeModal}
        onConfirm={(input) =>
          createUserAddress({
            id,
            input,
          })
        }
      />
      <CustomerAddressDialog
        address={customerData?.data?.user.addresses.find((addr) => addr.id === params.id)}
        confirmButtonState={updateUserAddressOpts.status}
        countries={countryChoices}
        errors={updateUserAddressOpts?.data?.updateAddress?.errors || []}
        open={params.action === 'edit'}
        variant="edit"
        onClose={closeModal}
        onConfirm={(input) =>
          updateUserAddress({
            id: params.id,
            input,
          })
        }
      />
      <ActionDialog
        open={params.action === 'remove'}
        variant="delete"
        title={t(
          'dashboard.LOBff',
          'Delete Address'
          // dialog header
        )}
        confirmButtonState={removeCustomerAddressOpts.status}
        onClose={closeModal}
        onConfirm={() =>
          removeCustomerAddress({
            variables: {
              id: params.id,
            },
          })
        }
      >
        <DialogContentText>
          <>
            {t('/kWzY1', 'Are you sure you want to delete this address from users address book?')}
          </>
        </DialogContentText>
      </ActionDialog>
    </>
  );
};
export default CustomerAddresses;
