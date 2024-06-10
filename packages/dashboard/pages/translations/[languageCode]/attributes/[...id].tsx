import { useTranslation } from '@core/i18n';
import useNotifier from '@core/ui/hooks/useNotifier';
import { useShopSettings } from '@core/ui/hooks/useShopSettings';
import { useMutation } from '@core/urql/hooks/useMutation';
import { useQuery } from '@core/urql/hooks/useQuery';
import { extractMutationErrors, getMutationState } from '@core/urql/utils';
import type { OutputData } from '@editorjs/editorjs';
import { useRouter } from 'next/router';
import TranslationsAttributesPage, {
  fieldNames,
} from '@dashboard/components/translations/TranslationsAttributesPage';
import {
  AttributeTranslationDetailsDocument,
  UpdateAttributeTranslationsDocument,
} from '@core/api/graphql';
import type { LanguageCode } from '@core/api/graphql';

import useListSettings from '@dashboard/hooks/useListSettings';
import useLocalPaginator, { useLocalPaginationState } from '@dashboard/hooks/useLocalPaginator';
import { PaginatorContext } from '@dashboard/hooks/usePaginator';
import type { TranslationField } from '@dashboard/oldSrc/translations/types';
import type { Pagination } from '@dashboard/oldSrc/types';
import { ListViews } from '@dashboard/oldSrc/types';
import { graphql as gql } from '@core/api/gql';

export interface TranslationsAttributesQueryParams extends Pagination {
  activeField: string;
}
export interface TranslationsAttributesProps {
  id: string;
  languageCode: LanguageCode;
  params: TranslationsAttributesQueryParams;
}

export const updateValueTranslations = gql(`
  mutation UpdateValueTranslations(
    $id: ID!
    $input: ValueTranslationInput!
    $language: LanguageCode!
  ) {
    translateValue(id: $id, data: $input, languageCode: $language) {
      errors {
        ...Error
      }
      result {
        id
        name
        richText
        translation(languageCode: $language) {
          id
          name
          richText
        }
      }
    }
  }
`);

const TranslationsAttributes = () => {
  const router = useRouter();
  const { id, languageCode, ...params } = router.query;
  const notify = useNotifier();
  const shop = useShopSettings();
  const { t } = useTranslation();

  const { updateListSettings, settings } = useListSettings(ListViews.TranslationValueList);
  const [valuesPaginationState, setValuesPaginationState] = useLocalPaginationState(
    settings?.rowNumber
  );

  const [attributeTranslations] = useQuery(AttributeTranslationDetailsDocument, {
    variables: {
      id,
      language: languageCode,
      firstValues: valuesPaginationState.first,
      lastValues: valuesPaginationState.last,
      afterValues: valuesPaginationState.after,
      beforeValues: valuesPaginationState.before,
    },
  });
  const translationData = attributeTranslations?.data?.translation;
  const translation =
    translationData?.__typename === 'AttributeTranslation' ? translationData : null;

  const paginate = useLocalPaginator(setValuesPaginationState);
  const { pageInfo, ...paginationValues } = paginate(
    translation?.attribute?.values?.pageInfo,
    valuesPaginationState
  );

  const [updateAttributeTranslations, updateAttributeTranslationsOpts] = useMutation(
    UpdateAttributeTranslationsDocument,
    {
      onCompleted: (data) => {
        if (data?.attributeTranslate?.errors?.length === 0) {
          attributeTranslations.refetch();
          notify(t('dashboard.savedChanges', 'Saved changes'), {
            type: 'success',
          });
          router.replace('?');
        }
      },
    }
  );

  const [updateValueTranslations, updateValueTranslationsOpts] = useMutation(
    UpdateValueTranslationsDocument,
    {
      onCompleted: (data) => {
        if (data?.valueTranslate?.errors?.length === 0) {
          attributeTranslations.refetch();
          notify(t('dashboard.savedChanges', 'Saved changes'), {
            type: 'success',
          });
          router.replace('?');
        }
      },
    }
  );

  const onEdit = (field: string) =>
    void router.replace({
      query: { ...router.query, activeField: field },
    });

  const onDiscard = () => {
    router.replace('?');
  };

  const handleSubmit = ({ name }: TranslationField, data: string | OutputData) => {
    const [fieldName, fieldId] = name.split(':');

    if (fieldName === fieldNames.attribute) {
      updateAttributeTranslations({
        id: fieldId,
        input: { name: data as string },
        language: languageCode,
      });
    } else if ([fieldNames.value, fieldNames.richTextValue].includes(fieldName)) {
      const isRichText = fieldName === fieldNames.richTextValue;

      return extractMutationErrors(
        updateValueTranslations({
          id: fieldId,
          input: isRichText ? { richText: JSON.stringify(data) } : { name: data as string },
          language: languageCode,
        })
      );
    }
  };

  const saveButtonState = getMutationState(
    updateAttributeTranslationsOpts.called || updateValueTranslationsOpts.called,
    updateAttributeTranslationsOpts.fetching || updateValueTranslationsOpts.fetching,
    updateAttributeTranslationsOpts.data?.attributeTranslate?.errors ?? [],
    updateValueTranslationsOpts.data?.valueTranslate?.errors ?? []
  );

  return (
    <PaginatorContext.Provider value={{ ...pageInfo, ...paginationValues }}>
      <TranslationsAttributesPage
        translationId={id}
        activeField={params.activeField}
        disabled={
          attributeTranslations.fetching ||
          updateAttributeTranslationsOpts.fetching ||
          updateValueTranslationsOpts.fetching
        }
        languageCode={languageCode}
        languages={shop.languages ?? []}
        saveButtonState={saveButtonState}
        onEdit={onEdit}
        onDiscard={onDiscard}
        onSubmit={handleSubmit}
        data={translation}
        settings={settings}
        onUpdateListSettings={updateListSettings}
      />
    </PaginatorContext.Provider>
  );
};
export default TranslationsAttributes;
