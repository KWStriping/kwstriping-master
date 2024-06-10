import { useTranslation } from '@core/i18n';
import { Backlink } from '@core/ui/components/Layout/Backlink';
import CardSpacer from '@dashboard/components/core/CardSpacer';
import PageHeader from '@dashboard/components/core/PageHeader';
import LanguageSwitch from '@dashboard/components/widgets/LanguageSwitch';
import { LanguageCode } from '@core/api/constants';
import type { ProductTranslationFragment } from '@core/api/graphql';
import { getStringOrPlaceholder } from '@dashboard/oldSrc/misc';
import type { TranslationsEntitiesPageProps } from '@dashboard/oldSrc/translations/types';
import { TranslationInputFieldName } from '@dashboard/oldSrc/translations/types';
import {
  languageEntitiesUrl,
  languageEntityUrl,
  TranslatableEntities,
} from '@dashboard/oldSrc/translations/urls';
import { mapValuesToTranslationFields } from '@dashboard/oldSrc/translations/utils';
import Container from '@mui/material/Container';
import type { FC } from 'react';

import ProductContextSwitcher from './ProductContextSwitcher';
import TranslationFields from './TranslationFields';

export interface TranslationsProductsPageProps extends TranslationsEntitiesPageProps {
  data: Maybe<ProductTranslationFragment>;
  productId: string;
  onValueSubmit: TranslationsEntitiesPageProps['onSubmit'];
}

const TranslationsProductsPage: FC<TranslationsProductsPageProps> = ({
  translationId,
  productId,
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
          tab: TranslatableEntities.products,
        })}
      >
        {t('dashboard.translations', 'Translations')}
      </Backlink>
      <PageHeader
        title={t('dashboard.2x9tu', 'Translation Product "{productName}" - {languageCode}', {
          languageCode,
          productName: getStringOrPlaceholder(data?.product?.name),
        })}
      >
        <ProductContextSwitcher
          languageCode={languageCode}
          productId={productId}
          selectedId={productId}
        />
        <LanguageSwitch
          currentLanguage={LanguageCode[languageCode]}
          languages={languages}
          getLanguageUrl={(lang) =>
            languageEntityUrl(lang, TranslatableEntities.products, translationId)
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
            displayName: t('dashboard.Ic5lM', 'Product Name'),
            name: TranslationInputFieldName.name,
            translation: data?.translation?.name || null,
            type: 'short',
            value: data?.product?.name,
          },
          {
            displayName: t('dashboard.8Qw5B', 'Description'),
            name: TranslationInputFieldName.description,
            translation: data?.translation?.description || null,
            type: 'rich',
            value: data?.product?.description,
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
            type: 'short',
            value: data?.product?.seoTitle,
          },
          {
            displayName: t('dashboard.S3IPU', 'Search Engine Description'),
            name: TranslationInputFieldName.seoDescription,
            translation: data?.translation?.seoDescription || null,
            type: 'long',
            value: data?.product?.seoDescription,
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
TranslationsProductsPage.displayName = 'TranslationsProductsPage';
export default TranslationsProductsPage;
