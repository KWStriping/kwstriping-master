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
  productVariantUrl,
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
  productId: string;
  onValueSubmit: TranslationsEntitiesPageProps['onSubmit'];
}

const TranslationsProductsPage: FC<TranslationsProductsPageProps> = ({
  translationId,
  activeField,
  disabled,
  languageCode,
  languages,
  data,
  saveButtonState,
  productId,
  productId,
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
        {t('dashboard.products', 'Products')}
      </Backlink>
      <PageHeader
        title={t(
          'dashboard.8WMlR',
          'Translation Product Variant "{productName}" - {languageCode}',
          {
            languageCode,
            productName: getStringOrPlaceholder(data?.name),
          }
        )}
      >
        <ProductContextSwitcher
          languageCode={languageCode}
          productId={productId}
          selectedId={productId}
        />
        <LanguageSwitch
          currentLanguage={LanguageCode[languageCode]}
          languages={languages}
          getLanguageUrl={(lang) => productVariantUrl(lang, productId, translationId)}
        />
      </PageHeader>
      <TranslationFields
        activeField={activeField}
        disabled={disabled}
        initialState={true}
        title={t('dashboard.generalInformation', 'General Information')}
        fields={[
          {
            displayName: t('dashboard.1f2Yl', 'Variant Name'),
            name: TranslationInputFieldName.name,
            translation: data?.translation?.name || null,
            type: 'short',
            value: data?.name,
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
