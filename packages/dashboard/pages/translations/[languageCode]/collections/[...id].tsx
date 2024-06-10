import { useTranslation } from '@core/i18n';
import useNotifier from '@core/ui/hooks/useNotifier';
import { useShopSettings } from '@core/ui/hooks/useShopSettings';
import { useMutation } from '@core/urql/hooks/useMutation';
import { useQuery } from '@core/urql/hooks/useQuery';
import { extractMutationErrors } from '@core/urql/utils';
import { useRouter } from 'next/router';
import TranslationsCollectionsPage from '@dashboard/components/translations/TranslationsCollectionsPage';
import {
  CollectionTranslationDetailsDocument,
  UpdateCollectionTranslationsDocument,
} from '@core/api/graphql';
import type { LanguageCode } from '@core/api/graphql';

import type {
  TranslationField,
  TranslationInputFieldName,
} from '@dashboard/oldSrc/translations/types';
import { getParsedTranslationInputData } from '@dashboard/oldSrc/translations/utils';
import { stringifyQs } from '@dashboard/oldSrc/utils/urls';

export interface TranslationsCollectionsQueryParams {
  activeField: string;
}
export interface TranslationsCollectionsProps {
  id: string;
  languageCode: LanguageCode;
  params: TranslationsCollectionsQueryParams;
}

const TranslationsCollections = () => {
  const router = useRouter();
  const { id, languageCode, ...params } = router.query;
  const notify = useNotifier();
  const shop = useShopSettings();
  const { t } = useTranslation();

  const [collectionTranslations] = useQuery(CollectionTranslationDetailsDocument, {
    variables: { id, language: languageCode },
  });

  const [updateTranslations, updateTranslationsOpts] = useMutation(
    UpdateCollectionTranslationsDocument,
    {
      onCompleted: (data) => {
        if (data?.collectionTranslate?.errors?.length === 0) {
          collectionTranslations.refetch();
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
  const translation = collectionTranslations?.data?.translation;

  const handleSubmit = (
    { name: fieldName }: TranslationField<TranslationInputFieldName>,
    data: string
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

  return (
    <TranslationsCollectionsPage
      translationId={id}
      activeField={params.activeField}
      disabled={collectionTranslations.fetching || updateTranslationsOpts.fetching}
      languageCode={languageCode}
      languages={shop.languages ?? []}
      saveButtonState={updateTranslationsOpts.status}
      onEdit={onEdit}
      onDiscard={onDiscard}
      onSubmit={handleSubmit}
      data={translation?.__typename === 'CollectionTranslation' ? translation : null}
    />
  );
};
export default TranslationsCollections;
