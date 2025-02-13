import type { AttributeInput } from '@tempo/dashboard/components/attributes/AttributesCard';
import type { PageDetailsFragment } from '@tempo/api/generated/graphql';
import {
  getSelectedValues,
  mergeChoicesWithValues,
} from '@tempo/dashboard/oldSrc/attributes/utils/data';
import { mapEdgesToItems } from '@tempo/ui/utils/maps';

export function getAttributeInputFromPage(page: PageDetailsFragment): AttributeInput[] {
  return page?.attributes.map((attribute) => ({
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
  }));
}

export function getAttributeInputFromPageKlass(
  pageKlass: PageDetailsFragment['pageKlass']
): AttributeInput[] {
  return pageKlasses?.attributes.map((attribute) => ({
    data: {
      entityType: attribute.entityType,
      inputType: attribute.inputType,
      isRequired: attribute.valueRequired,
      values: mapEdgesToItems(attribute.values) || [],
    },
    id: attribute.id,
    label: attribute.name,
    value: [],
  }));
}
