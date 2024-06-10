import difference from 'lodash-es/difference';
import intersection from 'lodash-es/intersection';

export const arrayDiff = (before: string[], after: string[]) => ({
  added: difference(after, before),
  removed: difference(before, after),
  common: intersection(before, after),
});
