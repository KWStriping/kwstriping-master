import type { TFunction } from '@tempo/next/i18n';
import type { SortableChipsFieldValueType } from '@dashboard/components/SortableChipsField';
import type {
  ValueFragment,
  PageErrorWithAttributesFragment,
  ProductErrorWithAttributesFragment,
} from '@tempo/api/generated/graphql';
import type { OutputData } from '@editorjs/editorjs';
import type { AttributeInput } from '@tempo/dashboard/components/attributes/AttributesCard';
import type { FileChoiceType } from '@tempo/dashboard/components/fields/FileUploadField';
import type { MultiAutocompleteChoiceType } from '@tempo/dashboard/components/fields/MultiAutocompleteSelectField';
import type { SingleAutocompleteChoiceType } from '@tempo/dashboard/components/fields/SingleAutocompleteSelectField';
import { getProductErrorMessage } from '@tempo/dashboard/oldSrc/utils/errors';
import getPageErrorMessage from '@tempo/dashboard/oldSrc/utils/errors/page';

export function getSingleChoices(values: ValueFragment[]): SingleAutocompleteChoiceType[] {
  return values.map((value) => ({
    label: value.name,
    value: value.slug,
  }));
}

export const getRichTextData = (attribute: AttributeInput): OutputData => {
  const data = attribute.data?.selectedValues?.[0]?.richText;
  return data ? JSON.parse(data) : {};
};

export function getFileChoice(attribute: AttributeInput): FileChoiceType {
  const value = attribute.value?.length && attribute.value[0];

  const definedValue = attribute.data?.values?.find(
    (definedValue) => definedValue.slug === value
  );

  if (definedValue) {
    return {
      file: definedValue.file,
      label: definedValue.name,
      value: definedValue.slug,
    };
  }

  return {
    label: value,
    value: value,
  };
}

export function getReferenceDisplayValue(
  attribute: AttributeInput
): SortableChipsFieldValueType[] {
  if (!attribute.value) {
    return [];
  }

  return attribute.value.map((value) => {
    const definedValue = attribute.data?.values?.find(
      (definedValue) => definedValue.reference === value
    );
    // If value has been previously assigned, use it's data
    if (definedValue) {
      return {
        label: definedValue.name,
        value: definedValue.reference,
      };
    }

    const definedAttributeReference = attribute.data?.references?.find(
      (reference) => reference.value === value
    );
    // If value has not been yet assigned, use data of reference
    if (definedAttributeReference) {
      return definedAttributeReference;
    }

    return {
      label: value,
      value: value,
    };
  });
}

export function getMultiChoices(values: ValueFragment[]): MultiAutocompleteChoiceType[] {
  return values.map((value) => ({
    label: value.name,
    value: value.slug,
  }));
}

export function getSingleDisplayValue(
  attribute: AttributeInput,
  values: ValueFragment[]
): string {
  return (
    values.find((value) => value.slug === attribute.value[0])?.name ||
    attribute.data?.values?.find((value) => value.slug === attribute.value[0])?.name ||
    attribute.value[0] ||
    ''
  );
}

export function getMultiDisplayValue(
  attribute: AttributeInput,
  values: ValueFragment[]
): MultiAutocompleteChoiceType[] {
  if (!attribute.value) {
    return [];
  }

  return attribute.value.map((value) => {
    const definedValue =
      values.find((definedValue) => definedValue.slug === value) ||
      attribute.data?.values?.find((definedValue) => definedValue.slug === value);
    if (definedValue) {
      return {
        label: definedValue.name,
        value: definedValue.slug,
      };
    }

    return {
      label: value,
      value: value,
    };
  });
}

export function getErrorMessage(
  err: ProductErrorWithAttributesFragment | PageErrorWithAttributesFragment,
  t: TFunction
): string {
  switch (err?.__typename) {
    case 'ProductError':
      return getProductErrorMessage(err, t);
    case 'PageError':
      return getPageErrorMessage(err, t);
  }
}
