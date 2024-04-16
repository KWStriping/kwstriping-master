import { useTranslation } from '@core/i18n';
import { Backlink } from '@core/ui/components/Layout/Backlink';
import CardSpacer from '@dashboard/components/core/CardSpacer';
import PageHeader from '@dashboard/components/core/PageHeader';
import type { ListSettingsUpdate } from '@dashboard/components/tables/TablePagination';
import LanguageSwitch from '@dashboard/components/widgets/LanguageSwitch';
import { LanguageCode } from '@core/api/constants';
import type { AttributeTranslationDetailsFragment } from '@core/api/graphql';
import { getStringOrPlaceholder } from '@dashboard/oldSrc/misc';
import type { TranslationsEntitiesPageProps } from '@dashboard/oldSrc/translations/types';
import {
  languageEntitiesUrl,
  languageEntityUrl,
  TranslatableEntities,
} from '@dashboard/oldSrc/translations/urls';
import { getTranslationFields } from '@dashboard/oldSrc/translations/utils';
import type { ListSettings } from '@dashboard/oldSrc/types';
import Container from '@mui/material/Container';
import type { FC } from 'react';

import TranslationFields from '../TranslationFields';

export interface TranslationsAttributesPageProps extends TranslationsEntitiesPageProps {
  data: Maybe<AttributeTranslationDetailsFragment>;
  settings?: ListSettings;
  onUpdateListSettings?: ListSettingsUpdate;
}

export const fieldNames = {
  attribute: 'attribute',
  value: 'value',
  richTextValue: 'attributeRichTextValue',
};

const TranslationsAttributesPage: FC<TranslationsAttributesPageProps> = ({
  translationId,
  activeField,
  disabled,
  languages,
  languageCode,
  data,
  saveButtonState,
  onDiscard,
  onEdit,
  onSubmit,
  settings,
  onUpdateListSettings,
}) => {
  const { t } = useTranslation();

  const withChoices = data?.attribute?.withChoices;

  return (
    <Container>
      <Backlink
        href={languageEntitiesUrl(languageCode, {
          tab: TranslatableEntities.attributes,
        })}
      >
        {t('dashboard.translations', 'Translations')}
      </Backlink>
      <PageHeader
        title={t('dashboard.PBLzT', 'Translation Attribute "{attribute}" - {languageCode}', {
          attribute: getStringOrPlaceholder(data?.attribute?.name),
          languageCode,
        })}
      >
        <LanguageSwitch
          currentLanguage={LanguageCode[languageCode]}
          languages={languages}
          getLanguageUrl={(lang) =>
            languageEntityUrl(lang, TranslatableEntities.attributes, translationId)
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
            displayName: t('dashboard.RMMDs', 'Attribute Name'),
            name: fieldNames.attribute + ':' + data?.attribute.id,
            translation: data?.translation?.name || null,
            type: 'short' as const,
            value: data?.attribute?.name,
          },
        ]}
        saveButtonState={saveButtonState}
        richTextResetKey={languageCode}
        onEdit={onEdit}
        onDiscard={onDiscard}
        onSubmit={onSubmit}
      />
      <CardSpacer />
      {data?.attribute?.values.edges?.length && withChoices && (
        <TranslationFields
          activeField={activeField}
          disabled={disabled}
          initialState={true}
          title={t('dashboard.values', 'Values')}
          fields={getTranslationFields(data?.attribute?.values, t)}
          saveButtonState={saveButtonState}
          richTextResetKey={languageCode}
          pagination={{
            settings,
            onUpdateListSettings,
          }}
          onEdit={onEdit}
          onDiscard={onDiscard}
          onSubmit={onSubmit}
        />
      )}
    </Container>
  );
};
TranslationsAttributesPage.displayName = 'TranslationsAttributesPage';
export default TranslationsAttributesPage;
