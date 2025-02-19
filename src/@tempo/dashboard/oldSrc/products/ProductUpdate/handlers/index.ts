import type {
  Node,
  ProductFragment,
  ProductMediaCreateMutationVariables,
  ProductMediaReorderMutationVariables,
  ProductReorderMutationFn,
} from '@tempo/api/generated/graphql';
import { arrayMove } from '@dnd-kit/sortable';
import type { ReorderEvent } from '@tempo/dashboard/oldSrc/types';
import { move } from '@tempo/dashboard/oldSrc/utils/lists';

export function createImageUploadHandler(
  id: string,
  createProductImage: (variables: ProductMediaCreateMutationVariables) => void
) {
  return (file: File) =>
    createProductImage({
      alt: '',
      image: file,
      product: id,
    });
}

export function createImageReorderHandler(
  product: ProductFragment,
  reorderProductImages: (variables: ProductMediaReorderMutationVariables) => void
) {
  return ({ newIndex, oldIndex }: ReorderEvent) => {
    let ids = product.media?.map((image) => image.id);
    ids = arrayMove(ids, oldIndex, newIndex);
    reorderProductImages({
      mediaItemIds: ids,
      productId: product.id,
    });
  };
}

function areVariantsEqual(a: Node, b: Node) {
  return a.id === b.id;
}

export function createVariantReorderHandler<T extends { id: string; variants: unknown[] }>(
  product: T,
  reorderProductVariants: ProductReorderMutationFn
) {
  return ({ newIndex, oldIndex }: ReorderEvent) => {
    const oldVariantOrder = [...product.variants];

    reorderProductVariants({
      variables: {
        move: {
          id: oldVariantOrder[oldIndex]?.id,
          sortOrder: newIndex - oldIndex,
        },
        productId: product.id,
      },
      optimisticResponse: () => ({
        __typename: 'Mutation',
        reorderProduct: {
          __typename: 'ProductReorder',
          errors: [],
          product: {
            __typename: 'Product',
            id: product.id,
            variants: [
              ...move<T['variants'][0]>(
                product.variants[oldIndex],
                product.variants,
                areVariantsEqual,
                newIndex
              ),
            ],
          },
        },
      }),
    });
  };
}
