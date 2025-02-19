import type { PostalCodeRuleInclusionType } from '@tempo/api/generated/constants';
import type { MinMax } from '@tempo/dashboard/oldSrc/types';

interface PostalCodeRange {
  start: string;
  end: string;
}

export const filterPostalCodes = (
  postalCodes: PostalCodeRange[],
  codeToFilterOut: PostalCodeRange
) =>
  postalCodes.filter(
    (rule) => rule.start !== codeToFilterOut.start && rule.end !== codeToFilterOut.end
  );

export const getPostalCodeRuleByMinMax =
  ({ min, max }: MinMax) =>
  ({ start, end }: PostalCodeRange) =>
    start === min && end === max;

export const getRuleObject = (rule: MinMax, inclusionType: PostalCodeRuleInclusionType) => ({
  __typename: undefined,
  end: rule.max,
  id: undefined,
  inclusionType,
  start: rule.min,
});
