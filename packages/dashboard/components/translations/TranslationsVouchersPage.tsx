import { useTranslation } from '@core/i18n';
import { Backlink } from '@core/ui/components/Layout/Backlink';
import PageHeader from '@dashboard/components/core/PageHeader';
import LanguageSwitch from '@dashboard/components/widgets/LanguageSwitch';
import { LanguageCode } from '@core/api/constants';
import type { VoucherTranslationFragment } from '@core/api/graphql';
import { getStringOrPlaceholder } from '@dashboard/oldSrc/misc';
import type { TranslationsEntitiesPageProps } from '@dashboard/oldSrc/translations/types';
import {
  languageEntitiesUrl,
  languageEntityUrl,
  TranslatableEntities,
} from '@dashboard/oldSrc/translations/urls';
import Container from '@mui/material/Container';
import type { FC } from 'react';

import TranslationFields from './TranslationFields';

export interface TranslationsVouchersPageProps extends TranslationsEntitiesPageProps {
  data: Maybe<VoucherTranslationFragment>;
}

export const fieldNames = {
  name: 'name',
};

const TranslationsVouchersPage: FC<TranslationsVouchersPageProps> = ({
  translationId,
  activeField,
  disabled,
  languages,
  languageCode,
  data,
  saveButtonState,
  onDiscard,
  onEdit,
  onSubmit,
}) => {
  const { t } = useTranslation();

  return (
    <Container>
      <Backlink
        href={languageEntitiesUrl(languageCode, {
          tab: TranslatableEntities.vouchers,
        })}
      >
        {t('dashboard.translations', 'Translations')}
      </Backlink>
      <PageHeader
        title={t('dashboard.tXSSK', 'Translation Voucher "{voucherName}" - {languageCode}', {
          languageCode,
          voucherName: getStringOrPlaceholder(data?.voucher?.name),
        })}
      >
        <LanguageSwitch
          currentLanguage={LanguageCode[languageCode]}
          languages={languages}
          getLanguageUrl={(lang) =>
            languageEntityUrl(lang, TranslatableEntities.vouchers, translationId)
          }
        />
      </PageHeader>
      <TranslationFields
        activeField={activeField}
        disabled={disabled}
        initialState={true}
        title={t('dashboard.generalInformation', 'General Information')}
        fields={[
          {
            displayName: t('dashboard.fErC+', 'Voucher Name'),
            name: fieldNames.name,
            translation: data?.translation?.name || null,
            type: 'short' as const,
            value: data?.voucher?.name,
          },
        ]}
        saveButtonState={saveButtonState}
        richTextResetKey={languageCode}
        onEdit={onEdit}
        onDiscard={onDiscard}
        onSubmit={onSubmit}
      />
    </Container>
  );
};
TranslationsVouchersPage.displayName = 'TranslationsVouchersPage';
export default TranslationsVouchersPage;
