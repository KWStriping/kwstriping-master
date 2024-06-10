import { useTranslation } from '@core/i18n';
import { Backlink } from '@core/ui/components/Layout/Backlink';
import CardSpacer from '@dashboard/components/core/CardSpacer';
import PageHeader from '@dashboard/components/core/PageHeader';
import LanguageSwitch from '@dashboard/components/widgets/LanguageSwitch';
import { LanguageCode } from '@core/api/constants';
import type { PageTranslationFragment } from '@core/api/graphql';
import { getStringOrPlaceholder } from '@dashboard/oldSrc/misc';
import type { TranslationsEntitiesPageProps } from '@dashboard/oldSrc/translations/types';
import { PageTranslationInputFieldName } from '@dashboard/oldSrc/translations/types';
import {
  languageEntitiesUrl,
  languageEntityUrl,
  TranslatableEntities,
} from '@dashboard/oldSrc/translations/urls';
import { mapValuesToTranslationFields } from '@dashboard/oldSrc/translations/utils';
import Container from '@mui/material/Container';
import type { FC } from 'react';

import TranslationFields from './TranslationFields';

export interface TranslationsPagesPageProps extends TranslationsEntitiesPageProps {
  data: Maybe<PageTranslationFragment>;
  onValueSubmit: TranslationsEntitiesPageProps['onSubmit'];
}

const TranslationsPagesPage: FC<TranslationsPagesPageProps> = ({
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
  onValueSubmit,
}) => {
  const { t } = useTranslation();

  return (
    <Container>
      <Backlink
        href={languageEntitiesUrl(languageCode, {
          tab: TranslatableEntities.pages,
        })}
      >
        {t('dashboard.translations', 'Translations')}
      </Backlink>
      <PageHeader
        title={t('dashboard.UWXLO', 'Translation Page "{pageName}" - {languageCode}', {
          languageCode,
          pageName: getStringOrPlaceholder(data?.page?.title),
        })}
      >
        <LanguageSwitch
          currentLanguage={LanguageCode[languageCode]}
          languages={languages}
          getLanguageUrl={(lang) =>
            languageEntityUrl(lang, TranslatableEntities.pages, translationId)
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
            displayName: t('dashboard.vOzOl', 'Page Title'),
            name: PageTranslationInputFieldName.title,
            translation: data?.translation?.title || null,
            type: 'short',
            value: data?.page?.title,
          },
          {
            displayName: t(
              'dashboard.MwpNC',
              'Content'
              // page content
            ),
            name: PageTranslationInputFieldName.content,
            translation: data?.translation?.content || null,
            type: 'rich',
            value: data?.page?.content,
          },
        ]}
        saveButtonState={saveButtonState}
        richTextResetKey={languageCode}
        onEdit={onEdit}
        onDiscard={onDiscard}
        onSubmit={onSubmit}
      />

      <CardSpacer />
      <TranslationFields
        activeField={activeField}
        disabled={disabled}
        initialState={true}
        title={t('dashboard.GX4T1', 'Search Engine Preview')}
        fields={[
          {
            displayName: t('dashboard.lEpii', 'Search Engine Title'),
            name: PageTranslationInputFieldName.seoTitle,
            translation: data?.translation?.seoTitle || null,
            type: 'short',
            value: data?.page?.seoTitle,
          },
          {
            displayName: t('dashboard.S3IPU', 'Search Engine Description'),
            name: PageTranslationInputFieldName.seoDescription,
            translation: data?.translation?.seoDescription || null,
            type: 'long',
            value: data?.page?.seoDescription,
          },
        ]}
        saveButtonState={saveButtonState}
        richTextResetKey={languageCode}
        onEdit={onEdit}
        onDiscard={onDiscard}
        onSubmit={onSubmit}
      />
      <CardSpacer />
      {data?.values?.length && (
        <>
          <TranslationFields
            activeField={activeField}
            disabled={disabled}
            initialState={true}
            title={t('dashboard.translationAttributes', 'Attributes')}
            fields={mapValuesToTranslationFields(data?.values, t)}
            saveButtonState={saveButtonState}
            richTextResetKey={languageCode}
            onEdit={onEdit}
            onDiscard={onDiscard}
            onSubmit={onValueSubmit}
          />
          <CardSpacer />
        </>
      )}
    </Container>
  );
};
TranslationsPagesPage.displayName = 'TranslationsPagesPage';
export default TranslationsPagesPage;
