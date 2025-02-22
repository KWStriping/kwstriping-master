import * as m from '@paraglide/messages';
import { Backlink } from '@tempo/ui/components/Layout/Backlink';
import { LanguageCode } from '@tempo/api/generated/constants';
import type { CategoryTranslationFragment } from '@tempo/api/generated/graphql';
import Container from '@mui/material/Container';
import type { FC } from 'react';
import TranslationFields from './TranslationFields';
import CardSpacer from '@tempo/dashboard/components/core/CardSpacer';
import PageHeader from '@tempo/dashboard/components/core/PageHeader';
import LanguageSwitch from '@tempo/dashboard/components/widgets/LanguageSwitch';
import { getStringOrPlaceholder } from '@tempo/dashboard/oldSrc/misc';
import type { TranslationsEntitiesPageProps } from '@tempo/dashboard/oldSrc/translations/types';
import { TranslationInputFieldName } from '@tempo/dashboard/oldSrc/translations/types';
import {
  languageEntitiesUrl,
  languageEntityUrl,
  TranslatableEntities,
} from '@tempo/dashboard/oldSrc/translations/urls';

export interface TranslationsCategoriesPageProps extends TranslationsEntitiesPageProps {
  data: Maybe<CategoryTranslationFragment>;
}

const TranslationsCategoriesPage: FC<TranslationsCategoriesPageProps> = ({
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
          tab: TranslatableEntities.categories,
        })}
      >
        {m.dashboard_translations() ?? 'Translations'}
      </Backlink>
      <PageHeader
        title={
          m.dashboard_itW() /
            z({
              categoryName: getStringOrPlaceholder(data?.category?.name),
              languageCode,
            }) ?? 'Translation Category "{categoryName}" - {languageCode}'
        }
      >
        <LanguageSwitch
          currentLanguage={LanguageCode[languageCode]}
          languages={languages}
          getLanguageUrl={(lang) =>
            languageEntityUrl(lang, TranslatableEntities.categories, translationId)
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
            displayName: m.dashboard_EYtiq() ?? 'Category name',
            name: TranslationInputFieldName.name,
            translation: data?.translation?.name || null,
            type: 'short' as const,
            value: data?.category?.name,
          },
          {
            displayName: m.dashboard_description() ?? 'Description',
            name: TranslationInputFieldName.description,
            translation: data?.translation?.description || null,
            type: 'rich' as const,
            value: data?.category?.description,
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
            value: data?.category?.seoTitle,
          },
          {
            displayName: m.dashboard_S_IPU() ?? 'Search Engine Description',
            name: TranslationInputFieldName.seoDescription,
            translation: data?.translation?.seoDescription || null,
            type: 'long' as const,
            value: data?.category?.seoDescription,
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
TranslationsCategoriesPage.displayName = 'TranslationsCategoriesPage';
export default TranslationsCategoriesPage;
