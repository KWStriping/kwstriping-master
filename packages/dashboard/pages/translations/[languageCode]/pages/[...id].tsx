import { useTranslation } from '@core/i18n';
import useNotifier from '@core/ui/hooks/useNotifier';
import { useShopSettings } from '@core/ui/hooks/useShopSettings';
import { useMutation } from '@core/urql/hooks/useMutation';
import { useQuery } from '@core/urql/hooks/useQuery';
import { extractMutationErrors } from '@core/urql/utils';
import type { OutputData } from '@editorjs/editorjs';
import { useRouter } from 'next/router';
import TranslationsPagesPage from '@dashboard/components/translations/TranslationsPagesPage';
import {
  PageTranslationDetailsDocument,
  UpdateValueTranslationsDocument,
  UpdatePageTranslationsDocument,
} from '@core/api/graphql';
import type { LanguageCode } from '@core/api/graphql';

import type {
  PageTranslationInputFieldName,
  TranslationField,
} from '@dashboard/oldSrc/translations/types';
import {
  getValueTranslationsInputData,
  getParsedTranslationInputData,
} from '@dashboard/oldSrc/translations/utils';
import { stringifyQs } from '@dashboard/oldSrc/utils/urls';

export interface TranslationsPagesQueryParams {
  activeField: string;
}
export interface TranslationsPagesProps {
  id: string;
  languageCode: LanguageCode;
  params: TranslationsPagesQueryParams;
}

const TranslationsPages = () => {
  const router = useRouter();
  const { id, languageCode, ...params } = router.query;
  const notify = useNotifier();
  const shop = useShopSettings();
  const { t } = useTranslation();

  const [pageTranslations] = useQuery(PageTranslationDetailsDocument, {
    variables: { id, language: languageCode },
  });

  const onUpdate = (errors: unknown[]) => {
    if (errors?.length === 0) {
      pageTranslations.refetch();
      notify(t('dashboard.savedChanges', 'Saved changes'), {
        type: 'success',
      });
      router.replace('?');
    }
  };

  const [updateTranslations, updateTranslationsOpts] = useMutation(
    UpdatePageTranslationsDocument,
    {
      onCompleted: (data) => onUpdate(data?.pageTranslate?.errors),
    }
  );

  const [updateValueTranslations] = useMutation(
    UpdateValueTranslationsDocument,
    {
      onCompleted: (data) => onUpdate(data?.valueTranslate?.errors),
    }
  );

  const onEdit = (field: string) =>
    void router.replace(
      '?' +
        stringifyQs({
          activeField: field,
        })
    );

  const onDiscard = () => {
    router.replace('?');
  };

  const handleSubmit = (
    { name: fieldName }: TranslationField<PageTranslationInputFieldName>,
    data: string | unknown
  ) =>
    extractMutationErrors(
      updateTranslations({
        id,
        input: getParsedTranslationInputData({
          data,
          fieldName,
        }),
        language: languageCode,
      })
    );

  const handleValueSubmit = (
    { id, type }: TranslationField<PageTranslationInputFieldName>,
    data: OutputData | string
  ) =>
    extractMutationErrors(
      updateValueTranslations({
        id,
        input: getValueTranslationsInputData(type, data),
        language: languageCode,
      })
    );

  const translation = pageTranslations?.data?.translation;

  return (
    <TranslationsPagesPage
      translationId={id}
      activeField={params.activeField}
      disabled={pageTranslations.fetching || updateTranslationsOpts.fetching}
      languageCode={languageCode}
      languages={shop?.languages || []}
      saveButtonState={updateTranslationsOpts.status}
      onEdit={onEdit}
      onDiscard={onDiscard}
      onSubmit={handleSubmit}
      onValueSubmit={handleValueSubmit}
      data={translation?.__typename === 'PageTranslation' ? translation : null}
    />
  );
};
export default TranslationsPages;
