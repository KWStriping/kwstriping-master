import { useTranslation } from '@core/i18n';
import useNotifier from '@core/ui/hooks/useNotifier';
import { useShopSettings } from '@core/ui/hooks/useShopSettings';
import { useMutation } from '@core/urql/hooks/useMutation';
import { getMutationStatus, extractMutationErrors } from '@core/urql/utils';
import { useRouter } from 'next/router';
import { WindowTitle } from '@dashboard/components/core/WindowTitle';
import type { WarehouseCreatePageFormData } from '@dashboard/components/warehouses/WarehouseCreatePage';
import WarehouseCreatePage from '@dashboard/components/warehouses/WarehouseCreatePage';
import { WarehouseCreateDocument } from '@core/api/graphql';
import { warehouseUrl } from '@dashboard/oldSrc/warehouses/urls';

const WarehouseCreate = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const notify = useNotifier();
  const shop = useShopSettings();
  const [createWarehouse, createWarehouseOpts] = useMutation(WarehouseCreateDocument, {
    onCompleted: (data) => {
      if (data?.createWarehouse?.errors?.length === 0) {
        void router.push(warehouseUrl(data?.createWarehouse?.warehouse?.id));
        notify(t('dashboard.savedChanges', 'Saved changes'), {
          type: 'success',
        });
      }
    },
  });
  const createWarehouseTransitionState = getMutationStatus(createWarehouseOpts);

  const handleSubmit = (data: WarehouseCreatePageFormData) =>
    extractMutationErrors(
      createWarehouse({
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
        },
      })
    );

  return (
    <>
      <WindowTitle
        title={t(
          'dashboard.hcypC',
          'Create Warehouse'
          // header
        )}
      />
      <WarehouseCreatePage
        countries={shop?.countries || []}
        disabled={createWarehouseOpts.fetching}
        errors={createWarehouseOpts.data?.createWarehouse?.errors || []}
        saveButtonBarState={createWarehouseTransitionState}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default WarehouseCreate;
