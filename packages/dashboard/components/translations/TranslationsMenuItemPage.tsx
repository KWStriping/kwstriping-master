import { useTranslation } from '@core/i18n';
import { Backlink } from '@core/ui/components/Layout/Backlink';
import PageHeader from '@dashboard/components/core/PageHeader';
import LanguageSwitch from '@dashboard/components/widgets/LanguageSwitch';
import { LanguageCode } from '@core/api/constants';
import type { MenuItemTranslationFragment } from '@core/api/graphql';
import { getStringOrPlaceholder } from '@dashboard/oldSrc/misc';
import type { TranslationsEntitiesPageProps } from '@dashboard/oldSrc/translations/types';
import { TranslationInputFieldName } from '@dashboard/oldSrc/translations/types';
import {
  languageEntitiesUrl,
  languageEntityUrl,
  TranslatableEntities,
} from '@dashboard/oldSrc/translations/urls';
import Container from '@mui/material/Container';
import type { FC } from 'react';

import TranslationFields from './TranslationFields';

export interface TranslationsMenuItemPageProps extends TranslationsEntitiesPageProps {
  data: Maybe<MenuItemTranslationFragment>;
}

const TranslationsMenuItemPage: FC<TranslationsMenuItemPageProps> = ({
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
  const { t } = useTranslation();

  return (
    <Container>
      <Backlink
        href={languageEntitiesUrl(languageCode, {
          tab: TranslatableEntities.menuItems,
        })}
      >
        {t('dashboard.translations', 'Translations')}
      </Backlink>
      <PageHeader
        title={t('dashboard.OshTA', 'Translation MenuItem "{menuItemName}" - {languageCode}', {
          languageCode,
          menuItemName: getStringOrPlaceholder(data?.menuItem.name),
        })}
      >
        <LanguageSwitch
          currentLanguage={LanguageCode[languageCode]}
          languages={languages}
          getLanguageUrl={(lang) =>
            languageEntityUrl(lang, TranslatableEntities.menuItems, translationId)
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
            displayName: t(
              'dashboard.Vyr8h',
              'Name'
              // menu item name
            ),
            name: TranslationInputFieldName.name,
            translation: data?.translation?.name || null,
            type: 'short' as const,
            value: data?.menuItem.name,
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
TranslationsMenuItemPage.displayName = 'TranslationsMenuItemPage';
export default TranslationsMenuItemPage;
