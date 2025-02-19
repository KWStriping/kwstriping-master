import * as m from '@paraglide/messages';
import { Backlink } from '@tempo/ui/components/Layout/Backlink';
import { LanguageCode } from '@tempo/api/generated/constants';
import type { SaleTranslationFragment } from '@tempo/api/generated/graphql';
import Container from '@mui/material/Container';
import type { FC } from 'react';
import TranslationFields from './TranslationFields';
import PageHeader from '@tempo/dashboard/components/core/PageHeader';
import LanguageSwitch from '@tempo/dashboard/components/widgets/LanguageSwitch';
import { getStringOrPlaceholder } from '@tempo/dashboard/oldSrc/misc';
import type { TranslationsEntitiesPageProps } from '@tempo/dashboard/oldSrc/translations/types';
import {
  languageEntitiesUrl,
  languageEntityUrl,
  TranslatableEntities,
} from '@tempo/dashboard/oldSrc/translations/urls';

export interface TranslationsSalesPageProps extends TranslationsEntitiesPageProps {
  data: Maybe<SaleTranslationFragment>;
}

export const fieldNames = {
  name: 'name',
};

const TranslationsSalesPage: FC<TranslationsSalesPageProps> = ({
  translationId,
  activeField,
  disabled,
  languageCode,
  languages,
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
          tab: TranslatableEntities.sales,
        })}
      >
        {m.dashboard_translations() ?? 'Translations'}
      </Backlink>
      <PageHeader
        title={
          m.dashboard_jkAMs({
            languageCode,
            saleName: getStringOrPlaceholder(data?.sale?.name),
          }) ?? 'Translation Sale "{saleName}" - {languageCode}'
        }
      >
        <LanguageSwitch
          currentLanguage={LanguageCode[languageCode]}
          languages={languages}
          getLanguageUrl={(lang) =>
            languageEntityUrl(lang, TranslatableEntities.sales, translationId)
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
            displayName: m.dashboard___PZt() ?? 'Sale Name',
            name: fieldNames.name,
            translation: data?.translation?.name || null,
            type: 'short' as const,
            value: data?.sale?.name,
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
TranslationsSalesPage.displayName = 'TranslationsSalesPage';
export default TranslationsSalesPage;
