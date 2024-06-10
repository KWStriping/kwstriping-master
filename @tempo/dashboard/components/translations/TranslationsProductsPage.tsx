import * as m from '@paraglide/messages';
import { Backlink } from '@tempo/ui/components/Layout/Backlink';
import CardSpacer from '@tempo/dashboard/components/core/CardSpacer';
import PageHeader from '@tempo/dashboard/components/core/PageHeader';
import LanguageSwitch from '@tempo/dashboard/components/widgets/LanguageSwitch';
import { LanguageCode } from '@tempo/api/generated/constants';
import type { ProductTranslationFragment } from '@tempo/api/generated/graphql';
import { getStringOrPlaceholder } from '@tempo/dashboard/oldSrc/misc';
import type { TranslationsEntitiesPageProps } from '@tempo/dashboard/oldSrc/translations/types';
import { TranslationInputFieldName } from '@tempo/dashboard/oldSrc/translations/types';
import {
  languageEntitiesUrl,
  languageEntityUrl,
  TranslatableEntities,
} from '@tempo/dashboard/oldSrc/translations/urls';
import { mapValuesToTranslationFields } from '@tempo/dashboard/oldSrc/translations/utils';
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
  return (
    <Container>
      <Backlink
        href={languageEntitiesUrl(languageCode, {
          tab: TranslatableEntities.products,
        })}
      >
        {m.dashboard_translations() ?? 'Translations'}
      </Backlink>
      <PageHeader
        title={
          m.dashboard__x_tu({
            languageCode,
            productName: getStringOrPlaceholder(data?.product?.name),
          }) ?? 'Translation Product "{productName}" - {languageCode}'
        }
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
        title={m.dashboard_generalInformation() ?? 'General Information'}
        fields={[
          {
            displayName: m.dashboard_Ic_lM() ?? 'Product Name',
            name: TranslationInputFieldName.name,
            translation: data?.translation?.name || null,
            type: 'short',
            value: data?.product?.name,
          },
          {
            displayName: m.dashboard__Qw_B() ?? 'Description',
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
        title={m.dashboard_GX_T_() ?? 'Search Engine Preview'}
        fields={[
          {
            displayName: m.dashboard_lEpii() ?? 'Search Engine Title',
            name: TranslationInputFieldName.seoTitle,
            translation: data?.translation?.seoTitle || null,
            type: 'short',
            value: data?.product?.seoTitle,
          },
          {
            displayName: m.dashboard_S_IPU() ?? 'Search Engine Description',
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
            title={m.dashboard_translationAttributes() ?? 'Attributes'}
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
