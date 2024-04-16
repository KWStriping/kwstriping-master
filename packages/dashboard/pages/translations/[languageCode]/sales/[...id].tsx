import { useTranslation } from '@core/i18n';
import useNotifier from '@core/ui/hooks/useNotifier';
import { useShopSettings } from '@core/ui/hooks/useShopSettings';
import { useMutation } from '@core/urql/hooks/useMutation';
import { useQuery } from '@core/urql/hooks/useQuery';
import { extractMutationErrors } from '@core/urql/utils';
import { useRouter } from 'next/router';
import TranslationsSalesPage from '@dashboard/components/translations/TranslationsSalesPage';
import { SaleTranslationDetailsDocument } from '@core/api/graphql';
import type { LanguageCode } from '@core/api/graphql';
import { graphql as gql } from '@core/api/gql';

import type {
  TranslationField,
  TranslationInputFieldName,
} from '@dashboard/oldSrc/translations/types';
import { getParsedTranslationInputData } from '@dashboard/oldSrc/translations/utils';
import { stringifyQs } from '@dashboard/oldSrc/utils/urls';

export interface TranslationsSalesQueryParams {
  activeField: string;
}
export interface TranslationsSalesProps {
  id: string;
  languageCode: LanguageCode;
  params: TranslationsSalesQueryParams;
}

export const updateSaleTranslations = gql(`
  mutation UpdateSaleTranslations(
    $id: ID!
    $input: NameTranslationInput!
    $language: LanguageCode!
  ) {
    translateSale(id: $id, data: $input, languageCode: $language) {
      errors {
        ...Error
      }
      result {
        id
        name
        translation(languageCode: $language) {
          id
          language {
            code
            language
          }
          name
        }
      }
    }
  }
`);

const TranslationsSales = () => {
  const router = useRouter();
  const { id, languageCode, ...params } = router.query;
  const notify = useNotifier();
  const shop = useShopSettings();
  const { t } = useTranslation();

  const [saleTranslations] = useQuery(SaleTranslationDetailsDocument, {
    variables: { id, language: languageCode },
  });

  const [updateTranslations, updateTranslationsOpts] = useMutation(
    UpdateSaleTranslationsDocument,
    {
      onCompleted: (data) => {
        if (data?.translateSale?.errors?.length === 0) {
          saleTranslations.refetch();
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

  const translation = saleTranslations?.data?.translation;

  return (
    <TranslationsSalesPage
      translationId={id}
      activeField={params.activeField}
      disabled={saleTranslations.fetching || updateTranslationsOpts.fetching}
      languages={shop?.languages || []}
      languageCode={languageCode}
      saveButtonState={updateTranslationsOpts.status}
      onEdit={onEdit}
      onDiscard={onDiscard}
      onSubmit={handleSubmit}
      data={translation?.__typename === 'SaleTranslation' ? translation : null}
    />
  );
};
export default TranslationsSales;
