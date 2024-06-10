import * as m from '@paraglide/messages';
import { Backlink } from '@tempo/ui/components/Layout/Backlink';
import CardSpacer from '@tempo/dashboard/components/core/CardSpacer';
import PageHeader from '@tempo/dashboard/components/core/PageHeader';
import LanguageSwitch from '@tempo/dashboard/components/widgets/LanguageSwitch';
import { LanguageCode } from '@tempo/api/generated/constants';
import type { CollectionTranslationFragment } from '@tempo/api/generated/graphql';
import { getStringOrPlaceholder } from '@tempo/dashboard/oldSrc/misc';
import type { TranslationsEntitiesPageProps } from '@tempo/dashboard/oldSrc/translations/types';
import { TranslationInputFieldName } from '@tempo/dashboard/oldSrc/translations/types';
import {
  languageEntitiesUrl,
  languageEntityUrl,
  TranslatableEntities,
} from '@tempo/dashboard/oldSrc/translations/urls';
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
  return (
    <Container>
      <Backlink
        href={languageEntitiesUrl(languageCode, {
          tab: TranslatableEntities.collections,
        })}
      >
        {m.dashboard_translations() ?? 'Translations'}
      </Backlink>
      <PageHeader
        title={
          (m.dashboard_phmwe() ?? 'Translation Collection "{collectionName}" - {languageCode}',
          {
            collectionName: getStringOrPlaceholder(data?.collection?.name),
            languageCode,
          })
        }
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
        title={m.dashboard_generalInformation() ?? 'General Information'}
        fields={[
          {
            displayName: m.dashboard_ZsE__() ?? 'Collection Name',
            name: TranslationInputFieldName.name,
            translation: data?.translation?.name || null,
            type: 'short' as const,
            value: data?.collection?.name,
          },
          {
            displayName: m.dashboard_description() ?? 'Description',
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
        title={m.dashboard_GX_T_() ?? 'Search Engine Preview'}
        fields={[
          {
            displayName: m.dashboard_lEpii() ?? 'Search Engine Title',
            name: TranslationInputFieldName.seoTitle,
            translation: data?.translation?.seoTitle || null,
            type: 'short' as const,
            value: data?.collection?.seoTitle,
          },
          {
            displayName: m.dashboard_S_IPU() ?? 'Search Engine Description',
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
