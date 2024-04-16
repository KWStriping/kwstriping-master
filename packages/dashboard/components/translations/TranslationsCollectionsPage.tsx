import { useTranslation } from '@core/i18n';
import { Backlink } from '@core/ui/components/Layout/Backlink';
import CardSpacer from '@dashboard/components/core/CardSpacer';
import PageHeader from '@dashboard/components/core/PageHeader';
import LanguageSwitch from '@dashboard/components/widgets/LanguageSwitch';
import { LanguageCode } from '@core/api/constants';
import type { CollectionTranslationFragment } from '@core/api/graphql';
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

export interface TranslationsCollectionsPageProps extends TranslationsEntitiesPageProps {
  data: Maybe<CollectionTranslationFragment>;
}

const TranslationsCollectionsPage: FC<TranslationsCollectionsPageProps> = ({
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
          tab: TranslatableEntities.collections,
        })}
      >
        {t('dashboard.translations', 'Translations')}
      </Backlink>
      <PageHeader
        title={t(
          'dashboard.phmwe',
          'Translation Collection "{collectionName}" - {languageCode}',
          {
            collectionName: getStringOrPlaceholder(data?.collection?.name),
            languageCode,
          }
        )}
      >
        <LanguageSwitch
          currentLanguage={LanguageCode[languageCode]}
          languages={languages}
          getLanguageUrl={(lang) =>
            languageEntityUrl(lang, TranslatableEntities.collections, translationId)
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
            displayName: t('dashboard.ZsE96', 'Collection Name'),
            name: TranslationInputFieldName.name,
            translation: data?.translation?.name || null,
            type: 'short' as const,
            value: data?.collection?.name,
          },
          {
            displayName: t('dashboard.description', 'Description'),
            name: TranslationInputFieldName.description,
            translation: data?.translation?.description || null,
            type: 'rich' as const,
            value: data?.collection?.description,
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
            name: TranslationInputFieldName.seoTitle,
            translation: data?.translation?.seoTitle || null,
            type: 'short' as const,
            value: data?.collection?.seoTitle,
          },
          {
            displayName: t('dashboard.S3IPU', 'Search Engine Description'),
            name: TranslationInputFieldName.seoDescription,
            translation: data?.translation?.seoDescription || null,
            type: 'long' as const,
            value: data?.collection?.seoDescription,
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
TranslationsCollectionsPage.displayName = 'TranslationsCollectionsPage';
export default TranslationsCollectionsPage;
