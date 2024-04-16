import type { TFunction } from '@core/i18n';
import { mapEdgesToItems } from '@core/ui/utils/maps';
import { fieldNames } from '@dashboard/components/translations/TranslationsAttributesPage';
import { translationsAttributesPageFieldsMessages as messages } from '@dashboard/components/translations/TranslationsAttributesPage/messages';
import type {
  AttributeTranslationDetailsFragment,
  ValueTranslatableFragment,
  ValueTranslationInput,
} from '@core/api/graphql';
import type { TranslationField } from '@dashboard/oldSrc/translations/types';
import {
  TranslationFieldType,
  PageTranslationInputFieldName,
  TranslationInputFieldName,
} from '@dashboard/oldSrc/translations/types';
import { getParsedDataForJsonStringField } from '@dashboard/oldSrc/utils/richText/misc';
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
    const displayName = t('dashboard.valueNumber', messages.valueNumber.defaultMessage, {
      number: valueIndex + 1,
    });

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
    displayName: t('dashboard.gqPGF', 'Attribute {name}', {
      name: attrVal.attribute.name,
    }),
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
