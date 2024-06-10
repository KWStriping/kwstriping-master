import { useTranslation } from '@core/i18n';
import { Backlink } from '@core/ui/components/Layout/Backlink';
import PageHeader from '@dashboard/components/core/PageHeader';
import LanguageSwitch from '@dashboard/components/widgets/LanguageSwitch';
import { LanguageCode } from '@core/api/constants';
import type { ShippingMethodTranslationFragment } from '@core/api/graphql';
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
  const { t } = useTranslation();

  return (
    <Container>
      <Backlink
        href={languageEntitiesUrl(languageCode, {
          tab: TranslatableEntities.shippingMethods,
        })}
      >
        {t('dashboard.translations', 'Translations')}
      </Backlink>
      <PageHeader
        title={t(
          'dashboard.UKx20',
          'Translation ShippingMethod "{shippingMethodName}" - {languageCode}',
          {
            languageCode,
            shippingMethodName: getStringOrPlaceholder(data?.name),
          }
        )}
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
        title={t('dashboard.generalInformation', 'General Information')}
        fields={[
          {
            displayName: t(
              'dashboard.PCrsp',
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
              'dashboard.pqEl5',
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
