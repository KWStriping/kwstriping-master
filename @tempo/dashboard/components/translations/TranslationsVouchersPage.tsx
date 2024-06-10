import * as m from '@paraglide/messages';
import { Backlink } from '@tempo/ui/components/Layout/Backlink';
import PageHeader from '@tempo/dashboard/components/core/PageHeader';
import LanguageSwitch from '@tempo/dashboard/components/widgets/LanguageSwitch';
import { LanguageCode } from '@tempo/api/generated/constants';
import type { VoucherTranslationFragment } from '@tempo/api/generated/graphql';
import { getStringOrPlaceholder } from '@tempo/dashboard/oldSrc/misc';
import type { TranslationsEntitiesPageProps } from '@tempo/dashboard/oldSrc/translations/types';
import {
  languageEntitiesUrl,
  languageEntityUrl,
  TranslatableEntities,
} from '@tempo/dashboard/oldSrc/translations/urls';
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
  return (
    <Container>
      <Backlink
        href={languageEntitiesUrl(languageCode, {
          tab: TranslatableEntities.vouchers,
        })}
      >
        {m.dashboard_translations() ?? 'Translations'}
      </Backlink>
      <PageHeader
        title={(m.dashboard_tXSSK({
          languageCode,
          voucherName: getStringOrPlaceholder(data?.voucher?.name),
        }) ?? 'Translation Voucher "{voucherName}" - {languageCode}')}
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
        title={m.dashboard_generalInformation() ?? 'General Information'}
        fields={[
          {
            displayName: (m.dashboard_fErC+ ?? 'Voucher Name'),
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
