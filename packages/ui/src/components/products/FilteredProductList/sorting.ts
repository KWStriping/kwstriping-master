import type { OrderingDirection, ProductOrderField } from '@core/api';

export interface UrlSorting {
  field: ProductOrderField;
  direction: OrderingDirection;
}

export interface SortingOption {
  label: string;
  field?: ProductOrderField;
  direction?: OrderingDirection;
  chosen: boolean;
}

export const getSortingOptions = (chosenSorting: Maybe<UrlSorting>) => {
  const options: SortingOption[] = [
    { label: 'Popularity', chosen: false },
    { label: 'Name ascending', field: 'NAME', direction: 'ASC', chosen: false },
    {
      label: 'Name descending',
      field: 'NAME',
      direction: 'DESC',
      chosen: false,
    },
  ];

  let isChosenSet = false;
  for (const option of options) {
    if (option.field === chosenSorting?.field && option.direction === chosenSorting?.direction) {
      option.chosen = true;
      isChosenSet = true;
      break;
    }
  }
  if (!isChosenSet && options[0]) {
    options[0].chosen = true;
  }
  return options;
};

export const parseQuerySort = (query: Maybe<string>): Maybe<UrlSorting> => {
  if (!query) return null;
  const [field, direction] = query.split('_');
  if (!field || !direction) return null;
  const sorting: UrlSorting = {
    field: field as ProductOrderField,
    direction: direction as OrderingDirection,
  };

  return sorting;
};

export const serializeQuerySort = (value?: Maybe<UrlSorting>) => {
  if (value?.direction && value?.field) {
    return `${value.field}_${value.direction}`;
  }
  return null;
};
