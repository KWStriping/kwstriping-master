import * as m from '@paraglide/messages';
import { Backlink } from '@tempo/ui/components/Layout/Backlink';
import { LanguageCode } from '@tempo/api/generated/constants';
import type { ShippingMethodTranslationFragment } from '@tempo/api/generated/graphql';
import Container from '@mui/material/Container';
import type { FC } from 'react';
import TranslationFields from './TranslationFields';
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

export interface TranslationsShippingMethodPageProps extends TranslationsEntitiesPageProps {
  data: Maybe<ShippingMethodTranslationFragment>;
}

const TranslationsShippingMethodPage: FC<TranslationsShippingMethodPageProps> = ({
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
          tab: TranslatableEntities.shippingMethods,
        })}
      >
        {m.dashboard_translations() ?? 'Translations'}
      </Backlink>
      <PageHeader
        title={
          m.dashboard_UKx__({
            languageCode,
            shippingMethodName: getStringOrPlaceholder(data?.name),
          }) ?? 'Translation ShippingMethod "{shippingMethodName}" - {languageCode}'
        }
      >
        <LanguageSwitch
          currentLanguage={LanguageCode[languageCode]}
          languages={languages}
          getLanguageUrl={(lang) =>
            languageEntityUrl(lang, TranslatableEntities.shippingMethods, translationId)
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
            displayName: t(
              'dashboard_PCrsp',
              'Name'
              // shipping method name
            ),
            name: TranslationInputFieldName.name,
            translation: data?.translation?.name || null,
            type: 'short' as const,
            value: data?.name,
          },
          {
            displayName: t(
              'dashboard_pqEl5',
              'Description'
              // shipping method description
            ),
            name: TranslationInputFieldName.description,
            translation: data?.translation?.description || null,
            type: 'rich',
            value: data?.description,
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
TranslationsShippingMethodPage.displayName = 'TranslationsShippingMethodPage';
export default TranslationsShippingMethodPage;
