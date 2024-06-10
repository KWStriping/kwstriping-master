import type { AddressFragment, CountryCode, ValidationRulesFragment } from '@core/api';
import { AddressValidationRulesDocument } from '@core/api';
import { useTranslation } from '@core/i18n';
import type { AddressField } from '@core/types/addresses';
import { useShopSettings } from '@core/ui/providers/ShopSettingsProvider';
import { useQuery } from '@core/urql/hooks/useQuery';
import { getRequiredAddressFields, getOrderedAddressFields } from '@core/utils/address';
import camelCase from 'lodash-es/camelCase';
import type { AddressFieldLabel, LocalizedAddressFieldLabel } from './messages';
import { addressFieldMessages, localizedAddressFieldMessages } from './messages';

export const useAddressFormUtils = (_countryCode: CountryCode) => {
  const { defaultCountry } = useShopSettings();
  const countryCode = _countryCode || defaultCountry;
  const { t } = useTranslation();

  const [{ data }] = useQuery(AddressValidationRulesDocument, {
    variables: { countryCode },
  });

  const validationRules = data?.addressValidationRules as ValidationRulesFragment;

  const { countryAreaType, postalCodeType, cityType } = validationRules || {};

  const localizedFields = {
    countryArea: countryAreaType,
    city: cityType,
    postalCode: postalCodeType,
  };

  const hasAllRequiredFields = (address: AddressFragment) =>
    !getMissingFieldsFromAddress(address).length;

  const getMissingFieldsFromAddress = (address: AddressFragment) => {
    if (!address) {
      return [];
    }

    return Object.entries(address).reduce((result, [fieldName, fieldValue]) => {
      if (!isRequiredField(fieldName as AddressField)) {
        return result;
      }

      return fieldValue ? result : ([...result, fieldName] as AddressField[]);
    }, [] as AddressField[]);
  };

  const isRequiredField = (field: AddressField) =>
    getRequiredAddressFields(validationRules?.requiredFields as AddressField[]).includes(field);

  const getLocalizedFieldLabel = (field: AddressField, localizedField?: string) => {
    try {
      const messageKey = camelCase(localizedField) as LocalizedAddressFieldLabel;
      return t(
        localizedAddressFieldMessages[messageKey]?.id,
        localizedAddressFieldMessages[messageKey]?.defaultMessage
      );
    } catch (e) {
      // warnAboutMissingTranslation(localizedField);
      const messageKey = camelCase(field) as AddressFieldLabel;
      return t(
        addressFieldMessages[messageKey]?.id,
        addressFieldMessages[messageKey]?.defaultMessage
      );
    }
  };

  const getFieldLabel = (field: AddressField) => {
    const localizedField = localizedFields[field as keyof typeof localizedFields];

    const isLocalizedField = !!localizedField && localizedField !== field;

    if (isLocalizedField) {
      return getLocalizedFieldLabel(
        field,
        localizedFields[field as keyof typeof localizedFields] as LocalizedAddressFieldLabel
      );
    }
    const messageKey = field as AddressFieldLabel;
    return t(
      addressFieldMessages[messageKey]?.id,
      addressFieldMessages[messageKey]?.defaultMessage
    );
  };

  const orderedAddressFields = getOrderedAddressFields(
    validationRules?.allowedFields as AddressField[]
  );

  return {
    orderedAddressFields,
    getFieldLabel,
    isRequiredField,
    hasAllRequiredFields,
    getMissingFieldsFromAddress,
    ...validationRules,
    allowedFields: validationRules?.allowedFields as AddressField[],
  };
};
