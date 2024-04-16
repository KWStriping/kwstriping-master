import { useTranslation } from '@core/i18n';
import useNotifier from '@core/ui/hooks/useNotifier';
import { useShopSettings } from '@core/ui/hooks/useShopSettings';
import { useMutation } from '@core/urql/hooks/useMutation';
import { useQuery } from '@core/urql/hooks/useQuery';
import { extractMutationErrors } from '@core/urql/utils';
import { useRouter } from 'next/router';
import TranslationsShippingMethodPage from '@dashboard/components/translations/TranslationsShippingMethodPage';
import { ShippingMethodTranslationDetailsDocument } from '@core/api/graphql';
import type { LanguageCode } from '@core/api/graphql';
import { graphql as gql } from '@core/api/gql';

import type {
  TranslationField,
  TranslationInputFieldName,
} from '@dashboard/oldSrc/translations/types';
import { getParsedTranslationInputData } from '@dashboard/oldSrc/translations/utils';
import { stringifyQs } from '@dashboard/oldSrc/utils/urls';

export interface TranslationsShippingMethodQueryParams {
  activeField: string;
}
export interface TranslationsShippingMethodProps {
  id: string;
  languageCode: LanguageCode;
  params: TranslationsShippingMethodQueryParams;
}

export const updateShippingMethodTranslations = gql(`
  mutation UpdateShippingMethodTranslations(
    $id: ID!
    $input: ShippingPriceTranslationInput!
    $language: LanguageCode!
  ) {
    translateShippingPrice(id: $id, data: $input, languageCode: $language) {
      errors {
        ...Error
      }
      result {
        id
        name
        description
        translation(languageCode: $language) {
          id
          language {
            language
          }
          name
          description
        }
      }
    }
  }
`);

const TranslationsShippingMethod = () => {
  const router = useRouter();
  const { id, languageCode, ...params } = router.query;
  const notify = useNotifier();
  const shop = useShopSettings();
  const { t } = useTranslation();

  const [shippingMethodTranslations] = useQuery(ShippingMethodTranslationDetailsDocument, {
    variables: { id, language: languageCode },
  });

  const [updateTranslations, updateTranslationsOpts] = useMutation(
    UpdateShippingMethodTranslationsDocument,
    {
      onCompleted: (data) => {
        if (data?.translateShippingPrice?.errors?.length === 0) {
          shippingMethodTranslations.refetch();
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
        input: getParsedTranslationInputData({ fieldName, data }),
        language: languageCode,
      })
    );

  const translation = shippingMethodTranslations?.data?.translation;

  return (
    <TranslationsShippingMethodPage
      translationId={id}
      activeField={params.activeField}
      disabled={shippingMethodTranslations.fetching || updateTranslationsOpts.fetching}
      languages={shop?.languages || []}
      languageCode={languageCode}
      saveButtonState={updateTranslationsOpts.status}
      onEdit={onEdit}
      onDiscard={onDiscard}
      onSubmit={handleSubmit}
      data={translation?.__typename === 'ShippingMethodTranslation' ? translation : null}
    />
  );
};
export default TranslationsShippingMethod;
