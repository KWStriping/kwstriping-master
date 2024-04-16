import { useTranslation } from '@core/i18n';
import useNotifier from '@core/ui/hooks/useNotifier';
import { useShopSettings } from '@core/ui/hooks/useShopSettings';
import { useMutation } from '@core/urql/hooks/useMutation';
import { useQuery } from '@core/urql/hooks/useQuery';
import { extractMutationErrors } from '@core/urql/utils';
import type { OutputData } from '@editorjs/editorjs';
import { useRouter } from 'next/router';
import TranslationsProductsPage from '@dashboard/components/translations/TranslationsProductsPage';
import type { LanguageCode } from '@core/api/graphql';
import {
  UpdateValueTranslationsDocument,
  ProductTranslationDetailsDocument,
} from '@core/api/graphql';

import type {
  TranslationField,
  TranslationInputFieldName,
} from '@dashboard/oldSrc/translations/types';
import {
  getValueTranslationsInputData,
  getParsedTranslationInputData,
} from '@dashboard/oldSrc/translations/utils';
import { stringifyQs } from '@dashboard/oldSrc/utils/urls';

export interface TranslationsProductsQueryParams {
  activeField: string;
}
export interface TranslationsProductsProps {
  id: string;
  languageCode: LanguageCode;
  params: TranslationsProductsQueryParams;
}

const TranslationsProducts = () => {
  const router = useRouter();
  const { id, languageCode, ...params } = router.query;
  const notify = useNotifier();
  const shop = useShopSettings();
  const { t } = useTranslation();

  const [productTranslations] = useQuery(ProductTranslationDetailsDocument, {
    variables: { id, language: languageCode },
  });

  const onUpdate = (errors: unknown[]) => {
    if (errors?.length === 0) {
      productTranslations.refetch();
      notify(t('dashboard.savedChanges', 'Saved changes'), {
        type: 'success',
      });
      router.replace('?');
    }
  };

  const [updateTranslations, updateTranslationsOpts] = useMutation(
    UpdateProductTranslationsDocument,
    {
      onCompleted: (data) => onUpdate(data?.translateProduct?.errors),
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
    { name: fieldName }: TranslationField<TranslationInputFieldName>,
    data: string
  ) =>
    extractMutationErrors(
      updateTranslations({
        variables: {
          id,
          input: getParsedTranslationInputData({
            data,
            fieldName,
          }),
          language: languageCode,
        },
      })
    );

  const handleValueSubmit = (
    { id, type }: TranslationField<TranslationInputFieldName>,
    data: OutputData | string
  ) =>
    extractMutationErrors(
      updateValueTranslations({
        id,
        input: getValueTranslationsInputData(type, data),
        language: languageCode,
      })
    );

  const translation = productTranslations?.data?.translation;

  return (
    <TranslationsProductsPage
      translationId={id}
      productId={id}
      activeField={params.activeField}
      disabled={productTranslations.fetching || updateTranslationsOpts.fetching}
      languageCode={languageCode}
      languages={shop.languages ?? []}
      saveButtonState={updateTranslationsOpts.status}
      onEdit={onEdit}
      onDiscard={onDiscard}
      onSubmit={handleSubmit}
      onValueSubmit={handleValueSubmit}
      data={translation?.__typename === 'ProductTranslation' ? translation : null}
    />
  );
};
export default TranslationsProducts;
