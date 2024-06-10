import * as m from '@paraglide/messages';
import { Backlink } from '@tempo/ui/components/Layout/Backlink';
import CardSpacer from '@tempo/dashboard/components/core/CardSpacer';
import PageHeader from '@tempo/dashboard/components/core/PageHeader';
import type { ListSettingsUpdate } from '@tempo/dashboard/components/tables/TablePagination';
import LanguageSwitch from '@tempo/dashboard/components/widgets/LanguageSwitch';
import { LanguageCode } from '@tempo/api/generated/constants';
import type { AttributeTranslationDetailsFragment } from '@tempo/api/generated/graphql';
import { getStringOrPlaceholder } from '@tempo/dashboard/oldSrc/misc';
import type { TranslationsEntitiesPageProps } from '@tempo/dashboard/oldSrc/translations/types';
import {
  languageEntitiesUrl,
  languageEntityUrl,
  TranslatableEntities,
} from '@tempo/dashboard/oldSrc/translations/urls';
import { getTranslationFields } from '@tempo/dashboard/oldSrc/translations/utils';
import type { ListSettings } from '@tempo/dashboard/oldSrc/types';
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
  const withChoices = data?.attribute?.withChoices;

  return (
    <Container>
      <Backlink
        href={languageEntitiesUrl(languageCode, {
          tab: TranslatableEntities.attributes,
        })}
      >
        {m.dashboard_translations() ?? 'Translations'}
      </Backlink>
      <PageHeader
        title={
          m.dashboard_PBLzT({
            attribute: getStringOrPlaceholder(data?.attribute?.name),
            languageCode,
          }) ?? 'Translation Attribute "{attribute}" - {languageCode}'
        }
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
        title={m.dashboard_generalInformation() ?? 'General Information'}
        fields={[
          {
            displayName: m.dashboard_RMMDs() ?? 'Attribute Name',
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
          title={m.dashboard_values() ?? 'Values'}
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
