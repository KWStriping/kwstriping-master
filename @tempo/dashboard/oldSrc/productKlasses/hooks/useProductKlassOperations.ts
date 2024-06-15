import type { ProductKlassDeleteMutation, ProductKlassDeleteMutationVariables } from '@tempo/api/generated/graphql';
import { useMutation } from '@tempo/api/hooks';
import type {
  AssignProductAttributeMutation,
  ProductKlassAttributeReorderMutation,
  ProductKlassDeleteMutation,
  ProductKlassDetailsFragment,
  ReorderInput,
  UnassignProductAttributeMutation,
} from '@tempo/api/generated/graphql';
import {
  AssignProductAttributeDocument,
  ProductKlassDeleteDocument,
  UnassignProductAttributeDocument,
  ProductKlassAttributeReorderDocument,
} from '@tempo/api/generated/graphql';

import { getMutationProviderData } from '@tempo/api/utils';
import { assert } from 'tsafe/assert';

function moveAttribute(
  attributes: ProductKlassDetailsFragment['productAttributes'],
  move: ReorderInput
) {
  assert(attributes);
  const attributeIndex = attributes.findIndex((attribute) => attribute.id === move.id);
  const newIndex = attributeIndex + move.sortOrder;

  const attributesWithoutMovedOne = [
    ...attributes.slice(0, attributeIndex),
    ...attributes.slice(attributeIndex + 1),
  ];

  return [
    ...attributesWithoutMovedOne.slice(0, newIndex),
    attributes[attributeIndex],
    ...attributesWithoutMovedOne.slice(newIndex),
  ];
}

interface ProductKlassOperationsProps {
  productKlass: ProductKlassDetailsFragment;
  onAssignAttribute: (data: AssignProductAttributeMutation) => void;
  onUnassignAttribute: (data: UnassignProductAttributeMutation) => void;
  onProductKlassAttributeReorder: (data: ProductKlassAttributeReorderMutation) => void;
  onProductKlassDelete: (data: ProductKlassDeleteMutation) => void;
}

function useProductKlassOperations({
  onAssignAttribute,
  onProductKlassAttributeReorder,
  onProductKlassDelete,
  onUnassignAttribute,
  productKlass,
}: ProductKlassOperationsProps) {
  const deleteProductKlass = useMutation<ProductKlassDeleteMutation, ProductKlassDeleteMutationVariables>(ProductKlassDeleteDocument, {
    onCompleted: onProductKlassDelete,
  });
  const assignAttribute = useMutation<AssignProductAttributeMutation, AssignProductAttributeMutationVariables>(AssignProductAttributeDocument, {
    onCompleted: onAssignAttribute,
  });
  const unassignAttribute = useMutation<UnassignProductAttributeMutation, UnassignProductAttributeMutationVariables>(UnassignProductAttributeDocument, {
    onCompleted: onUnassignAttribute,
  });
  const [...reorderAttribute] = useMutation<ProductKlassAttributeReorderMutation, ProductKlassAttributeReorderMutationVariables>(ProductKlassAttributeReorderDocument, {
    onCompleted: onProductKlassAttributeReorder,
    // optimisticResponse: (variables) => ({
    //   __typename: 'Mutation',
    //   reorderProductKlassAttributes: {
    //     __typename: 'ProductKlassReorderAttributes' as const,
    //     errors: [],
    //     productKlass: {
    //       ...productKlass,
    //       productAttributes:
    //         variables.type === ProductAttributeType.Product
    //           ? moveAttribute(productKlass.productAttributes, variables.move)
    //           : productKlass.productAttributes,
    //       variantAttributes:
    //         variables.type === ProductAttributeType.VARIANT
    //           ? moveAttribute(productKlass.variantAttributes, variables.move)
    //           : productKlass.variantAttributes,
    //     },
    //   },
    // }),
  });

  return {
    assignAttribute: getMutationProviderData(...assignAttribute),
    deleteProductKlass: getMutationProviderData(...deleteProductKlass),
    reorderAttribute: getMutationProviderData(...reorderAttribute),
    unassignAttribute: getMutationProviderData(...unassignAttribute),
  };
}

export default useProductKlassOperations;
