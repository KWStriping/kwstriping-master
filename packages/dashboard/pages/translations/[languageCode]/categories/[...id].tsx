import { useTranslation } from '@core/i18n';
import useNotifier from '@core/ui/hooks/useNotifier';
import { useShopSettings } from '@core/ui/hooks/useShopSettings';
import { useMutation } from '@core/urql/hooks/useMutation';
import { useQuery } from '@core/urql/hooks/useQuery';
import { extractMutationErrors } from '@core/urql/utils';
import type { OutputData } from '@editorjs/editorjs';
import { useRouter } from 'next/router';
import { assert } from 'tsafe/assert';
import TranslationsCategoriesPage from '@dashboard/components/translations/TranslationsCategoriesPage';
import { LanguageCode } from '@core/api/constants';
import {
  CategoryTranslationDetailsDocument,
  UpdateCategoryTranslationsDocument,
} from '@core/api/graphql';

import type {
  TranslationField,
  TranslationInputFieldName,
} from '@dashboard/oldSrc/translations/types';
import { getParsedTranslationInputData } from '@dashboard/oldSrc/translations/utils';
import { stringifyQs } from '@dashboard/oldSrc/utils/urls';

export interface TranslationsCategoriesQueryParams {
  activeField: string;
}

const TranslationsCategories = () => {
  const router = useRouter();
  const { id, languageCode: maybeLanguageCode, ...params } = router.query;
  assert(
    typeof maybeLanguageCode === 'string' &&
      Object.values(LanguageCode).includes(maybeLanguageCode as LanguageCode)
  );
  const languageCode = maybeLanguageCode as LanguageCode;
  const notify = useNotifier();
  const shop = useShopSettings();
  const { t } = useTranslation();

  const [categoryTranslations, refetch] = useQuery(CategoryTranslationDetailsDocument, {
    variables: { id, language: languageCode },
  });

  const [updateTranslations, updateTranslationsOpts] = useMutation(
    UpdateCategoryTranslationsDocument,
    {
      onCompleted: (data) => {
        if (data?.categoryTranslate?.errors?.length === 0) {
          refetch();
          notify(t('dashboard.savedChanges', 'Saved changes'), {
            type: 'success',
          });
          router.replace('?');
        }
      },
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
    { name: fieldName }: TranslationField<TranslationInputFieldName>,
    data: string | OutputData
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

  const translation = categoryTranslations?.data?.translation;

  return (
    <TranslationsCategoriesPage
      translationId={id}
      activeField={params.activeField}
      disabled={categoryTranslations.fetching || updateTranslationsOpts.fetching}
      languageCode={languageCode}
      languages={shop?.languages || []}
      saveButtonState={updateTranslationsOpts.status}
      onEdit={onEdit}
      onDiscard={onDiscard}
      onSubmit={handleSubmit}
      data={translation?.__typename === 'CategoryTranslation' ? translation : null}
    />
  );
};
export default TranslationsCategories;
