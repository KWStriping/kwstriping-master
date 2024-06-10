import { useTranslation } from '@core/i18n';
import useNotifier from '@core/ui/hooks/useNotifier';
import { useShopSettings } from '@core/ui/hooks/useShopSettings';
import { useMutation } from '@core/urql/hooks/useMutation';
import { useQuery } from '@core/urql/hooks/useQuery';
import { extractMutationErrors } from '@core/urql/utils';
import { useRouter } from 'next/router';
import TranslationsMenuItemPage from '@dashboard/components/translations/TranslationsMenuItemPage';
import {
  MenuItemTranslationDetailsDocument,
  UpdateMenuItemTranslationsDocument,
} from '@core/api/graphql';
import type { LanguageCode } from '@core/api/graphql';

import type {
  TranslationField,
  TranslationInputFieldName,
} from '@dashboard/oldSrc/translations/types';
import { getParsedTranslationInputData } from '@dashboard/oldSrc/translations/utils';
import { stringifyQs } from '@dashboard/oldSrc/utils/urls';

export interface TranslationsMenuItemQueryParams {
  activeField: string;
}
export interface TranslationsMenuItemProps {
  id: string;
  languageCode: LanguageCode;
  params: TranslationsMenuItemQueryParams;
}

const TranslationsMenuItem = () => {
  const router = useRouter();
  const { id, languageCode, ...params } = router.query;
  const notify = useNotifier();
  const shop = useShopSettings();
  const { t } = useTranslation();

  const [menuItemTranslations] = useQuery(MenuItemTranslationDetailsDocument, {
    variables: { id, language: languageCode },
  });

  const [updateTranslations, updateTranslationsOpts] = useMutation(
    UpdateMenuItemTranslationsDocument,
    {
      onCompleted: (data) => {
        if (data?.menuItemTranslate?.errors?.length === 0) {
          menuItemTranslations.refetch();
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

  const translation = menuItemTranslations?.data?.translation;

  return (
    <TranslationsMenuItemPage
      translationId={id}
      activeField={params.activeField}
      disabled={menuItemTranslations.fetching || updateTranslationsOpts.fetching}
      languages={shop?.languages || []}
      languageCode={languageCode}
      saveButtonState={updateTranslationsOpts.status}
      onEdit={onEdit}
      onDiscard={onDiscard}
      onSubmit={handleSubmit}
      data={translation?.__typename === 'MenuItemTranslation' ? translation : null}
    />
  );
};
export default TranslationsMenuItem;
