import * as m from '@paraglide/messages';
import type {
  AddressFragment,
  AddressValidationRulesQuery,
  AddressValidationRulesQueryVariables,
  CountryCode,
  ValidationRulesFragment,
} from '@tempo/api/generated/graphql';
import { AddressValidationRulesDocument } from '@tempo/api/generated/graphql';
// import { useTranslation } from '@tempo/next/i18n';
import type { AddressField } from '@tempo/next/types/addresses';
import { useQuery } from '@tempo/api/hooks/useQuery';
import { getRequiredAddressFields, getOrderedAddressFields } from '@tempo/utils/address';
import camelCase from 'lodash-es/camelCase';
import type { AddressFieldLabel, LocalizedAddressFieldLabel } from './messages';
import { addressFieldMessages, localizedAddressFieldMessages } from './messages';
import { useShopSettings } from '@tempo/ui/providers/ShopSettingsProvider';

export const useAddressFormUtils = (_countryCode: CountryCode) => {
  const { defaultCountry } = useShopSettings();
  const countryCode = _countryCode || defaultCountry;

  const [{ data }] = useQuery<AddressValidationRulesQuery, AddressValidationRulesQueryVariables>(
    AddressValidationRulesDocument,
    {
      variables: { countryCode },
    }
  );

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
      return (
        m[localizedAddressFieldMessages[messageKey]?.id] ??
        localizedAddressFieldMessages[messageKey]?.defaultMessage
      );
    } catch (e) {
      // warnAboutMissingTranslation(localizedField);
      const messageKey = camelCase(field) as AddressFieldLabel;
      return (
        m[addressFieldMessages[messageKey]?.id] ??
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
    return (
      m[addressFieldMessages[messageKey]?.id] ?? addressFieldMessages[messageKey]?.defaultMessage
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
