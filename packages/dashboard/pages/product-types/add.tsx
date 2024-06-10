import { useTranslation } from '@core/i18n';
import useNotifier from '@core/ui/hooks/useNotifier';
import { useShopSettings } from '@core/ui/hooks/useShopSettings';
import { useMutation } from '@core/urql/hooks';
import { getMutationErrors } from '@core/urql/utils';
import { useRouter } from 'next/router';
import { WindowTitle } from '@dashboard/components/core/WindowTitle';
import type { ProductKlassForm } from '@dashboard/components/productKlasses/ProductKlassCreatePage';
import ProductKlassCreatePage from '@dashboard/components/productKlasses/ProductKlassCreatePage';
import type { ProductKlassKind } from '@core/api/constants';
import {
  ProductKlassCreateDocument,
  UpdateMetadataDocument,
  UpdatePrivateMetadataDocument,
} from '@core/api/graphql';
import type { ProductKlassAddUrlQueryParams } from '@dashboard/oldSrc/productKlasses/urls';
import { productKlassUrl } from '@dashboard/oldSrc/productKlasses/urls';
import { useTaxClassFetchMore } from '@dashboard/oldSrc/taxes/utils/useTaxClassFetchMore';
import createMetadataCreateHandler from '@dashboard/oldSrc/utils/handlers/metadataCreateHandler';

interface ProductKlassCreateProps {
  params: ProductKlassAddUrlQueryParams;
}

export const ProductKlassCreate = () => {
  const router = useRouter();
  const params = router.query;
  const notify = useNotifier();
  const { t } = useTranslation();
  const { defaultWeightUnit } = useShopSettings();
  const [updateMetadata] = useMutation(UpdateMetadataDocument);
  const [updatePrivateMetadata] = useMutation(UpdatePrivateMetadataDocument);

  const handleChangeKind = (kind: ProductKlassKind) =>
    void router.push({
      pathname: '/product-types/add',
      query: {
        ...params,
        kind,
      },
    });

  // const [{ data, fetching }] = useQuery(ProductKlassCreateDataDocument, {
  //   displayLoader: true,
  // });

  const { taxClasses, fetchMoreTaxClasses } = useTaxClassFetchMore();

  const [createProductKlass, { data, fetching, status }] = useMutation(
    ProductKlassCreateDocument,
    {
      displayLoader: true,
      onCompleted: (data) => {
        if (data?.createProductKlass?.errors?.length === 0) {
          notify(t('dashboard.aa4m0', 'Successfully created product type'), {
            type: 'success',
          });
          data?.createProductKlass?.productKlass &&
            void router.push(productKlassUrl(data?.createProductKlass?.productKlass?.id));
        }
      },
    }
  );

  const handleCreate = async (formData: ProductKlassForm) => {
    const result = await createProductKlass({
      input: {
        hasVariants: false,
        isShippingRequired: formData.isShippingRequired,
        name: formData.name,
        kind: formData.kind,
        taxClass: formData.taxClassId,
        weight: formData.weight,
      },
    });

    return {
      id: result.data?.createProductKlass?.productKlass?.id || null,
      errors: getMutationErrors(result),
    };
  };

  const handleSubmit = createMetadataCreateHandler(
    handleCreate,
    updateMetadata,
    updatePrivateMetadata
  );

  return (
    <>
      <WindowTitle
        title={t(
          'dashboard.SWFo8',
          'Create Product Type'
          // window title
        )}
      />
      <ProductKlassCreatePage
        defaultWeightUnit={defaultWeightUnit}
        disabled={fetching}
        errors={data?.createProductKlass?.errors || []}
        pageTitle={t(
          'dashboard.q1eEx',
          'Create Product Type'
          // header
        )}
        saveButtonBarState={status}
        taxClasses={taxClasses ?? []}
        onFetchMoreTaxClasses={fetchMoreTaxClasses}
        kind={params.kind}
        onChangeKind={handleChangeKind}
        onSubmit={handleSubmit}
      />
    </>
  );
};
export default ProductKlassCreate;
