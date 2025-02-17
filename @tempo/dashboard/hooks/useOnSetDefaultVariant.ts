import * as m from '@paraglide/messages';
import useNotifier from '@tempo/ui/hooks/useNotifier';
import { useMutation } from '@tempo/api/hooks/useMutation';
import { ProductSetDefaultDocument } from '@tempo/api/generated/graphql';
import type { Node } from '@tempo/api/generated/graphql';
import { getProductErrorMessage } from '@tempo/dashboard/oldSrc/utils/errors';

function useOnSetDefaultVariant(productId: string, variant: Node) {
  const notify = useNotifier();

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
            m.dashboard_SQ_Ge({
              name: defaultVariant.name,
            }) ?? 'Variant {name} has been set as default.',
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
