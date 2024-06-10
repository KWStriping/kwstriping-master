import * as m from '@paraglide/messages';
import type { TFunction } from '@tempo/next/i18n';
import { mapEdgesToItems } from '@tempo/ui/utils/maps';
import { fieldNames } from '@tempo/dashboard/components/translations/TranslationsAttributesPage';
import { translationsAttributesPageFieldsMessages as messages } from '@tempo/dashboard/components/translations/TranslationsAttributesPage/messages';
import type {
  AttributeTranslationDetailsFragment,
  ValueTranslatableFragment,
  ValueTranslationInput,
} from '@tempo/api/generated/graphql';
import type { TranslationField } from '@tempo/dashboard/oldSrc/translations/types';
import {
  TranslationFieldType,
  PageTranslationInputFieldName,
  TranslationInputFieldName,
} from '@tempo/dashboard/oldSrc/translations/types';
import { getParsedDataForJsonStringField } from '@tempo/dashboard/oldSrc/utils/richText/misc';
import type { OutputData } from '@editorjs/editorjs';

export const getParsedTranslationInputData = ({
  fieldName,
  data,
}: {
  fieldName: TranslationInputFieldName | PageTranslationInputFieldName;
  data: string | OutputData;
}): Record<string, string | null> => {
  const fieldsToParse = [
    TranslationInputFieldName.description,
    PageTranslationInputFieldName.content,
  ];

  if (fieldsToParse.includes(fieldName)) {
    return {
      [fieldName]: getParsedDataForJsonStringField(data as OutputData),
    };
  }

  return { [fieldName]: data as string };
};

export const getTranslationFields = (
  fields: AttributeTranslationDetailsFragment['attribute']['choices'],
  t: TFunction
) =>
  mapEdgesToItems(fields).map(({ id, name, translation }, valueIndex) => {
    const displayName = (m.dashboard_valueNumber({
      number: valueIndex + 1,
    }) ?? messages.valueNumber.defaultMessage);

    return {
      displayName,
      name: `${fieldNames.value}:${id}`,
      translation: translation?.name || null,
      type: 'short' as TranslationField['type'],
      value: name,
    };
  }) || [];

export const mapValuesToTranslationFields = (values: ValueTranslatableFragment[], t: TFunction) =>
  values.map<TranslationField>((attrVal) => ({
    id: attrVal.value.id,
    displayName: (m.dashboard_gqPGF({
      name: attrVal.attribute.name,
    }) ?? 'Attribute {name}'),
    name: attrVal.name,
    translation: attrVal.translation?.richText || attrVal.translation?.plainText || null,
    type: attrVal.richText ? 'rich' : 'short',
    value: attrVal.richText || attrVal.plainText,
  })) || [];

export const getValueTranslationsInputData = (
  type: TranslationFieldType,
  data: OutputData | string
): ValueTranslationInput =>
  type === TranslationFieldType.Rich
    ? { richText: JSON.stringify(data) }
    : { plainText: data as string };
