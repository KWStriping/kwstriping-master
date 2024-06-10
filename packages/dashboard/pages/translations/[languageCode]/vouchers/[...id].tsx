import { useTranslation } from '@core/i18n';
import useNotifier from '@core/ui/hooks/useNotifier';
import { useShopSettings } from '@core/ui/hooks/useShopSettings';
import { useMutation } from '@core/urql/hooks';
import { useQuery } from '@core/urql/hooks/useQuery';
import { extractMutationErrors } from '@core/urql/utils';
import { useRouter } from 'next/router';
import TranslationsVouchersPage from '@dashboard/components/translations/TranslationsVouchersPage';
import type { LanguageCode } from '@core/api/graphql';
import {
  UpdateVoucherTranslationsDocument,
  VoucherTranslationDetailsDocument,
} from '@core/api/graphql';
import { graphql as gql } from '@core/api/gql';

import type {
  TranslationField,
  TranslationInputFieldName,
} from '@dashboard/oldSrc/translations/types';
import { getParsedTranslationInputData } from '@dashboard/oldSrc/translations/utils';
import { stringifyQs } from '@dashboard/oldSrc/utils/urls';

export interface TranslationsVouchersQueryParams {
  activeField: string;
}
export interface TranslationsVouchersProps {
  id: string;
  languageCode: LanguageCode;
  params: TranslationsVouchersQueryParams;
}

export const updateVoucherTranslations = gql(`
  mutation UpdateVoucherTranslations(
    $id: ID!
    $input: NameTranslationInput!
    $language: LanguageCode!
  ) {
    translateVoucher(id: $id, data: $input, languageCode: $language) {
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

const TranslationsVouchers = () => {
  const router = useRouter();
  const { id, languageCode, ...params } = router.query;
  const notify = useNotifier();
  const shop = useShopSettings();
  const { t } = useTranslation();

  const [voucherTranslations, refetch] = useQuery(VoucherTranslationDetailsDocument, {
    variables: { id, language: languageCode },
  });

  const [updateTranslations, updateTranslationsOpts] = useMutation(
    UpdateVoucherTranslationsDocument,
    {
      onCompleted: (data) => {
        if (data?.voucherTranslate?.errors?.length === 0) {
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

  const translation = voucherTranslations?.data?.translation;

  return (
    <TranslationsVouchersPage
      translationId={id}
      activeField={params.activeField}
      disabled={voucherTranslations.fetching || updateTranslationsOpts.fetching}
      languages={shop.languages ?? []}
      languageCode={languageCode}
      saveButtonState={updateTranslationsOpts.status}
      onEdit={onEdit}
      onDiscard={onDiscard}
      onSubmit={handleSubmit}
      data={translation?.__typename === 'VoucherTranslation' ? translation : null}
    />
  );
};
export default TranslationsVouchers;
