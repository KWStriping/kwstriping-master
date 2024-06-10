import { useTranslation } from '@core/i18n';
import useNotifier from '@core/ui/hooks/useNotifier';
import { useMutation } from '@core/urql/hooks/useMutation';
import { ProductSetDefaultDocument } from '@core/api/graphql';
import type { Node } from '@core/api/graphql';
import { getProductErrorMessage } from '@dashboard/oldSrc/utils/errors';

function useOnSetDefaultVariant(productId: string, variant: Node) {
  const notify = useNotifier();
  const { t } = useTranslation();

  const [setDefaultProduct] = useMutation(ProductSetDefaultDocument, {
    onCompleted: (data) => {
      const errors = data?.setDefaultProduct?.errors;
      if (errors?.length) {
        for (const error of errors) {
          notify(getProductErrorMessage(error, t), {
            type: 'error',
          });
        }
      } else {
        const defaultVariant = data?.setDefaultProduct?.product.variants.find(
          (variant) => variant.id === data?.setDefaultProduct?.product?.defaultVariant.id
        );
        if (defaultVariant) {
          notify(
            t('dashboard.SQ0Ge', 'Variant {name} has been set as default.', {
              name: defaultVariant.name,
            }),
            {
              type: 'success',
            }
          );
        }
      }
    },
  });

  return (selectedVariant = null) => {
    setDefaultProduct({
      productId,
      productId: variant ? variant.id : selectedVariant.id,
    });
  };
}
export default useOnSetDefaultVariant;
