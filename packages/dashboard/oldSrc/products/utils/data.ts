import type { AttributeInput } from '@dashboard/components/attributes/AttributesCard';
import type { SingleAutocompleteChoiceType } from '@dashboard/components/fields/SingleAutocompleteSelectField';
import type { ProductStockInput } from '@dashboard/components/products/ProductStocks';
import type { ProductUpdateFormData } from '@dashboard/components/products/ProductUpdatePage/types';
import { ProductAttributeScope } from '@core/api/constants';
import type {
  ProductDetailsVariantFragment,
  ProductFragment,
  ProductMediaFragment,
  ProductKlassQuery,
  ProductCreateDataQuery,
  ProductFragment,
  SelectedVariantAttributeFragment,
  StockInput,
  ProductAttributeFragment,
} from '@core/api/graphql';
import type { FormsetAtomicData } from '@dashboard/hooks/useFormset';
import {
  getDefaultValues,
  getSelectedValues,
  mergeChoicesWithValues,
} from '@dashboard/oldSrc/attributes/utils/data';
import { maybe } from '@dashboard/oldSrc/misc';
import { mapEdgesToItems } from '@core/ui/utils/maps';
import { mapMetadataItemToInput } from '@dashboard/oldSrc/utils/maps';
import { Temporal } from '@js-temporal/polyfill';

export interface Collection {
  id: string;
  label: string;
}

interface Node {
  id: string;
  name: string;
}

export interface ProductKlass {
  hasVariants: boolean;
  id: string;
  name: string;
  productAttributes: ProductKlassQuery['productKlass']['productAttributes'];
}

export function getAttributeInputFromProduct(product: ProductFragment): AttributeInput[] {
  return (
    product?.attributes?.map((attribute) => ({
      data: {
        entityType: attribute.attribute.entityType,
        inputType: attribute.attribute.inputType,
        isRequired: attribute.attribute.valueRequired,
        selectedValues: attribute.values,
        values: mergeChoicesWithValues(attribute),
        unit: attribute.attribute.unit,
      },
      id: attribute.attribute.id,
      label: attribute.attribute.name,
      value: getSelectedValues(attribute),
    })) ?? []
  );
}

export function getAttributeInputFromProductKlass(productKlass: ProductKlass): AttributeInput[] {
  return productKlass.productAttributes?.map((attribute) => ({
    data: {
      entityType: attribute.entityType,
      inputType: attribute.inputType,
      isRequired: attribute.valueRequired,
      values: mapEdgesToItems(attribute.values) || [],
      unit: attribute.unit,
    },
    id: attribute.id,
    label: attribute.name,
    value: [],
  }));
}

export function getAttributeInputFromAttributes(
  variantAttributes: ProductAttributeFragment[],
  variantAttributeScope: ProductAttributeScope
): AttributeInput[] {
  return variantAttributes?.map((attribute) => ({
    data: {
      entityType: attribute.entityType,
      inputType: attribute.inputType,
      isRequired: attribute.valueRequired,
      values: mapEdgesToItems(attribute.values) || [],
      unit: attribute.unit,
      variantAttributeScope,
    },
    id: attribute.id,
    label: attribute.name,
    value: getDefaultValues(attribute),
  }));
}

export function getAttributeInputFromSelectedAttributes(
  variantAttributes: SelectedVariantAttributeFragment[],
  variantAttributeScope: ProductAttributeScope
): AttributeInput[] {
  return variantAttributes?.map((attribute) => ({
    data: {
      entityType: attribute.attribute.entityType,
      inputType: attribute.attribute.inputType,
      isRequired: attribute.attribute.valueRequired,
      selectedValues: attribute.values,
      values: mergeChoicesWithValues(attribute),
      unit: attribute.attribute.unit,
      variantAttributeScope,
    },
    id: attribute.attribute.id,
    label: attribute.attribute.name,
    value: getSelectedValues(attribute),
  }));
}

export function getAttributeInputFromVariant(variant: ProductFragment): AttributeInput[] {
  const selectionAttributeInput = getAttributeInputFromSelectedAttributes(
    variant?.selectionAttributes,
    ProductAttributeScope.VariantSelection
  );
  const nonSelectionAttributeInput = getAttributeInputFromSelectedAttributes(
    variant?.nonSelectionAttributes,
    ProductAttributeScope.NotVariantSelection
  );

  return selectionAttributeInput?.concat(nonSelectionAttributeInput ?? []) ?? [];
}

export function getVariantAttributeInputFromProduct(
  product: ProductCreateDataQuery['product']
): AttributeInput[] {
  const selectionAttributeInput = getAttributeInputFromAttributes(
    product?.productKlass?.selectionVariantAttributes,
    ProductAttributeScope.VariantSelection
  );

  const nonSelectionAttributeInput = getAttributeInputFromAttributes(
    product?.productKlass?.nonSelectionVariantAttributes,
    ProductAttributeScope.NotVariantSelection
  );

  return selectionAttributeInput?.concat(nonSelectionAttributeInput ?? []) ?? [];
}

export function getStockInputFromVariant(variant: ProductFragment): ProductStockInput[] {
  return (
    variant?.stocks.map((stock) => ({
      data: {
        quantityAllocated: stock.quantityAllocated,
      },
      id: stock.warehouse.id,
      label: stock.warehouse.name,
      value: stock.quantity.toString(),
    })) || []
  );
}

export function getCollectionInput(
  productCollections: ProductFragment['collections']
): Collection[] {
  return maybe(
    () =>
      productCollections.map((collection) => ({
        id: collection.id,
        label: collection.name,
      })),
    []
  );
}

export function getChoices(nodes: Node[]): SingleAutocompleteChoiceType[] {
  return maybe(
    () =>
      nodes.map((node) => ({
        label: node.name,
        value: node.id,
      })),
    []
  );
}

export function getProductUpdatePageFormData(
  product: ProductFragment,
  variants: ProductDetailsVariantFragment[]
): ProductUpdateFormData {
  const variant = product?.variants?.[0];

  return {
    category: product.category?.id ?? '',
    taxClassId: product?.taxClass?.id,
    collections: product.collections?.map((collection) => collection.id, []),
    isAvailable: !!product?.isAvailable,
    metadata: product?.metadata?.map(mapMetadataItemToInput),
    name: product.name ?? '',
    privateMetadata: product?.privateMetadata?.map(mapMetadataItemToInput),
    rating: maybe(() => product.rating, null),
    seoDescription: product.seoDescription ?? '',
    seoTitle: product.seoTitle ?? '',
    sku: maybe(
      () =>
        product.productKlass.hasVariants
          ? undefined
          : variants && variants[0]
            ? variants[0].sku
            : undefined,
      ''
    ),
    slug: product?.slug || '',
    trackInventory: !!variant?.trackInventory,
    weight: product?.weight?.value.toString() || '',
    isPreorder: !!variant?.preorder || false,
    globalThreshold: variant?.preorder?.globalThreshold?.toString() || '',
    globalSoldUnits: variant?.preorder?.globalSoldUnits || 0,
    hasPreorderEndDate: !!variant?.preorder?.endDate,
    preorderEndDateTime: variant?.preorder?.endDate,
  };
}

export function mapFormsetStockToStockInput(stock: FormsetAtomicData<null, string>): StockInput {
  return {
    quantity: parseInt(stock.value, 10) || 0,
    warehouse: stock.id,
  };
}

export const getPreorderEndDateFormData = (endDate?: string) =>
  endDate ? Temporal.PlainDate.from(endDate).toString() : '';

export const getPreorderEndHourFormData = (endDate?: string) =>
  endDate ? Temporal.PlainTime.from(endDate).toString() : '';

export const getSelectedMedia = <T extends Pick<ProductMediaFragment, 'id' | 'sortOrder'>>(
  media: T[] = [],
  selectedMediaIds: string[]
) =>
  media
    .filter((image) => selectedMediaIds.indexOf(image.id) !== -1)
    .sort((prev, next) => (prev.sortOrder > next.sortOrder ? 1 : -1));
