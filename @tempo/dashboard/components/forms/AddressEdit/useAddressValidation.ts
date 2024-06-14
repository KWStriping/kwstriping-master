import type { AddressValidationRulesQuery, AddressValidationRulesQueryVariables } from '@tempo/api/generated/graphql';
import type { ChoiceValue } from '@tempo/api/auth/dist/apollo/types';
import { useQuery } from '@tempo/api/hooks/useQuery';
import type { AddressValidationRulesQuery, CountryCode } from '@tempo/api/generated/graphql';
import { AddressValidationRulesDocument } from '@tempo/api/generated/graphql';

interface AreaChoices {
  label: string;
  value: string;
  raw: string;
}

const prepareChoices = (values: ChoiceValue[]): AreaChoices[] =>
  values.map((v) => ({
    label: v.verbose,
    value: v.verbose,
    raw: v.raw,
  }));

const selectRules = (data: AddressValidationRulesQuery) =>
  data ? data?.addressValidationRules : { countryAreaChoices: [], allowedFields: [] };

const useValidationRules = (countryCode?: CountryCode) => {
  const [{ data, fetching: loading }] = useQuery<AddressValidationRulesQuery, AddressValidationRulesQueryVariables>(AddressValidationRulesDocument, {
    variables: { countryCode: countryCode as CountryCode },
    pause: !countryCode,
  });

  return { data, loading };
};

const useAreas = (data: Maybe<AddressValidationRulesQuery>) => {
  const rawChoices = selectRules(data).countryAreaChoices;
  return prepareChoices(rawChoices);
};

const useAllowedFields = (data: Maybe<AddressValidationRulesQuery>) => {
  const isAllowed = (fieldName: string) => {
    if (!data) {
      return false;
    }

    return selectRules(data).allowedFields.includes(fieldName);
  };

  return { isAllowed };
};

const useDisplayValues = (areas: AreaChoices[]) => {
  const isProvinceCode = (code: string) => code.length === 2 && code.toLocaleUpperCase() === code;

  const getDisplayValue = (value: string) => {
    if (isProvinceCode(value)) {
      const area = areas.find((area) => area.raw === value);

      return area.value;
    }

    return value;
  };

  return { getDisplayValue };
};

export const useAddressValidation = (country?: string) => {
  const { data, loading } = useValidationRules(country);
  console.log('>>> data', data);
  const areas = useAreas(data);
  const { isAllowed } = useAllowedFields(data);
  const { getDisplayValue } = useDisplayValues(areas);

  return {
    areas,
    isFieldAllowed: isAllowed,
    getDisplayValue,
    loading,
  };
};
