import { useTranslation } from '@core/i18n';
import useNotifier from '@core/ui/hooks/useNotifier';
import { useShopSettings } from '@core/ui/hooks/useShopSettings';
import { useMutation } from '@core/urql/hooks/useMutation';
import { useQuery } from '@core/urql/hooks/useQuery';
import { getMutationStatus, extractMutationErrors } from '@core/urql/utils';
import { useRouter } from 'next/router';
import { assert } from 'tsafe';
import NotFoundPage from '@dashboard/components/core/NotFoundPage';
import { WindowTitle } from '@dashboard/components/core/WindowTitle';
import WarehouseDeleteDialog from '@dashboard/components/warehouses/WarehouseDeleteDialog';
import type { WarehouseDetailsPageFormData } from '@dashboard/components/warehouses/WarehouseDetailsPage';
import WarehouseDetailsPage from '@dashboard/components/warehouses/WarehouseDetailsPage';
import {
  WarehouseDeleteDocument,
  WarehouseDetailsDocument,
  WarehouseUpdateDocument,
} from '@core/api/graphql';
import { getStringOrPlaceholder } from '@dashboard/oldSrc/misc';
import useDialogActionHandlers from '@dashboard/oldSrc/utils/handlers/dialogActionHandlers';
import type { WarehouseUrlQueryParams } from '@dashboard/oldSrc/warehouses/urls';
import { warehouseUrl } from '@dashboard/oldSrc/warehouses/urls';

export interface WarehouseDetailsProps {
  id: string;
  params: WarehouseUrlQueryParams;
}

const WarehouseDetails = () => {
  const router = useRouter();
  const { id, ...params } = router.query;
  assert(typeof id === 'string');
  const { t } = useTranslation();
  const notify = useNotifier();
  const shop = useShopSettings();
  const [{ data, fetching: loading }] = useQuery(WarehouseDetailsDocument, {
    displayLoader: true,
    variables: { id },
  });
  const [updateWarehouse, updateWarehouseOpts] = useMutation(WarehouseUpdateDocument, {
    onCompleted: (data) => {
      if (data?.updateWarehouse?.errors?.length === 0) {
        notify(t('dashboard.savedChanges', 'Saved changes'), {
          type: 'success',
        });
      }
    },
  });
  const updateWarehouseTransitionState = getMutationStatus(updateWarehouseOpts);

  const [deleteWarehouse, deleteWarehouseOpts] = useMutation(WarehouseDeleteDocument, {
    onCompleted: (data) => {
      if (data?.deleteWarehouse?.errors?.length === 0) {
        notify(t('dashboard.savedChanges', 'Saved changes'), {
          type: 'success',
        });
        void router.push('/warehouses');
      }
    },
  });
  const deleteWarehouseTransitionState = getMutationStatus(deleteWarehouseOpts);

  const [openModal, closeModal] = useDialogActionHandlers(
    router,
    (params) => warehouseUrl(id, params),
    params
  );

  if (data?.warehouse === null) {
    return <NotFoundPage onBack={() => router.push('/warehouses')} />;
  }

  const handleSubmit = async (data: WarehouseDetailsPageFormData) => {
    extractMutationErrors(
      updateWarehouse({
        id,
        input: {
          address: {
            companyName: data?.companyName,
            city: data?.city,
            cityArea: data?.cityArea,
            country: data?.country,
            countryArea: data?.countryArea,
            phone: data?.phone,
            postalCode: data?.postalCode,
            streetAddress1: data?.streetAddress1,
            streetAddress2: data?.streetAddress2,
          },
          name: data?.name,
          isPrivate: data?.isPrivate,
          clickAndCollectOption: data?.clickAndCollectOption,
        },
      })
    );
  };

  return (
    <>
      <WindowTitle title={data?.warehouse?.name ?? ''} />
      <WarehouseDetailsPage
        countries={shop?.countries || []}
        disabled={loading || updateWarehouseOpts.fetching}
        errors={updateWarehouseOpts?.data?.updateWarehouse?.errors || []}
        saveButtonBarState={updateWarehouseTransitionState}
        warehouse={data?.warehouse}
        onDelete={() => openModal('delete')}
        onSubmit={handleSubmit}
      />
      <WarehouseDeleteDialog
        confirmButtonState={deleteWarehouseTransitionState}
        name={getStringOrPlaceholder(data?.warehouse?.name)}
        onClose={closeModal}
        onConfirm={() => deleteWarehouse({ id })}
        open={params.action === 'delete'}
      />
    </>
  );
};

export default WarehouseDetails;
