import type {
  PostalCodeRuleInclusionType,
  ShippingMethodWithPostalCodesFragment,
} from '@tempo/api/generated/graphql';

export interface PostalCodesState {
  codesToDelete?: string[];
  havePostalCodesChanged?: boolean;
  inclusionType?: Maybe<PostalCodeRuleInclusionType>;
  originalCodes?: ShippingMethodWithPostalCodesFragment['postalCodeRules'];
  postalCodeRules?: ShippingMethodWithPostalCodesFragment['postalCodeRules'];
}

function postalCodesReducer(prevState: PostalCodesState, newState: PostalCodesState) {
  return { ...prevState, ...newState };
}

export default postalCodesReducer;
