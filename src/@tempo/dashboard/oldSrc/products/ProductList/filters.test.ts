import { AttributeInputType, StockAvailability } from '@tempo/graphql';
import { createFilterStructure } from '@dashboard/components/products/ProductListPage';
import { ProductListUrlFilters } from '@tempo/products/urls';
import { getFilterQueryParams } from '@tempo/utils/filters';
import { stringifyQs } from '@tempo/utils/urls';
import { getExistingKeys, setFilterOptsStatus } from '@test/filters';
import { config } from '@test/intl';

import { ProductListUrlFiltersAsDictWithMultipleValues } from '../../urls';
import {
  FilterParam,
  getValuesFromParams,
  getFilterQueryParam,
  getFilterVariables,
  mapAttributeParamsToFilterOpts,
  parseFilterValue,
} from './filters';
import { productListFilterOpts } from './fixtures';

describe('Filtering query params', () => {
  it('should be empty object if no params given', () => {
    const params: ProductListUrlFilters = {};
    const filterVariables = getFilterVariables(params, undefined);

    expect(getExistingKeys(filterVariables)).toHaveLength(0);
  });

  it('should not be empty object if params given', () => {
    const params: ProductListUrlFilters = {
      priceFrom: '10',
      priceTo: '20',
      status: true.toString(),
      stockStatus: StockAvailability.IN_STOCK,
    };
    const filterVariables = getFilterVariables(params, true);

    expect(getExistingKeys(filterVariables)).toHaveLength(2);
  });
});

describe('Get attribute values from URL params', () => {
  type GetValuesFromParams = Parameters<typeof getValuesFromParams>;

  it("should return empty array when attribute doesn't exist in params", () => {
    // Arrange
    const params: GetValuesFromParams[0] = {};
    const attribute: GetValuesFromParams[1] = {
      slug: 'test',
      inputType: AttributeInputType.DROPDOWN,
    };

    // Act
    const values = getValuesFromParams(params, attribute);

    // Assert
    expect(values).toHaveLength(0);
  });

  it('should return attribute values when attribute exists in params', () => {
    // Arrange
    const params: GetValuesFromParams[0] = {
      'string-attributes': {
        test: ['value-1', 'value-2'],
      },
    };
    const attribute: GetValuesFromParams[1] = {
      slug: 'test',
      inputType: AttributeInputType.DROPDOWN,
    };

    // Act
    const values = getValuesFromParams(params, attribute);

    // Assert
    expect(values).toEqual(['value-1', 'value-2']);
  });
});

describe('Map attribute params to filter opts', () => {
  type MapAttributeParamsToFilterOpts = Parameters<typeof mapAttributeParamsToFilterOpts>;
  type MapAttributeParamsToFilterOptsReturn = ReturnType<typeof mapAttributeParamsToFilterOpts>;

  it('should return empty array when no params given', () => {
    // Arrange
    const attributes: MapAttributeParamsToFilterOpts[0] = [
      {
        id: '1',
        slug: 'test',
        inputType: AttributeInputType.DROPDOWN,
        name: 'Test',
        __typename: 'Attribute',
      },
    ];
    const params: MapAttributeParamsToFilterOpts[1] = {};

    // Act
    const filterOpts = mapAttributeParamsToFilterOpts(attributes, params);

    // Assert
    const expectedFilterOpts: MapAttributeParamsToFilterOptsReturn = [
      {
        id: '1',
        slug: 'test',
        inputType: AttributeInputType.DROPDOWN,
        name: 'Test',
        active: false,
        value: [],
      },
    ];
    expect(filterOpts).toEqual(expectedFilterOpts);
  });

  it('should return filter opts with proper values selected according to passed values selection in params', () => {
    // Arrange
    const attributes: MapAttributeParamsToFilterOpts[0] = [
      {
        id: '1',
        slug: 'test-1',
        inputType: AttributeInputType.MULTISELECT,
        name: 'Test 1',
        __typename: 'Attribute',
      },
      {
        id: '2',
        slug: 'test-2',
        inputType: AttributeInputType.DROPDOWN,
        name: 'Test 2',
        __typename: 'Attribute',
      },
      {
        id: '3',
        slug: 'test-3',
        inputType: AttributeInputType.DROPDOWN,
        name: 'Test 3',
        __typename: 'Attribute',
      },
    ];
    const params: MapAttributeParamsToFilterOpts[1] = {
      'string-attributes': {
        'test-1': ['value-1', 'value-2'],
        'test-2': ['value-3'],
      },
    };

    // Act
    const filterOpts = mapAttributeParamsToFilterOpts(attributes, params);

    // Assert
    const expectedFilterOpts: MapAttributeParamsToFilterOptsReturn = [
      {
        id: '1',
        slug: 'test-1',
        inputType: AttributeInputType.MULTISELECT,
        name: 'Test 1',
        active: true,
        value: ['value-1', 'value-2'],
      },
      {
        id: '2',
        slug: 'test-2',
        inputType: AttributeInputType.DROPDOWN,
        name: 'Test 2',
        active: true,
        value: ['value-3'],
      },
      {
        id: '3',
        slug: 'test-3',
        inputType: AttributeInputType.DROPDOWN,
        name: 'Test 3',
        active: false,
        value: [],
      },
    ];
    expect(filterOpts).toEqual(expectedFilterOpts);
  });
});

describe('Filtering URL params', () => {
  const intl = createIntl(config);

  const filters = createFilterStructure(t, productListFilterOpts);

  it('should be empty if no active filters', () => {
    const filterQueryParams = getFilterQueryParams(filters, getFilterQueryParam);

    expect(getExistingKeys(filterQueryParams)).toHaveLength(0);
  });

  it('should not be empty if active filters are present', () => {
    const filterQueryParams = getFilterQueryParams(
      setFilterOptsStatus(filters, true),
      getFilterQueryParam
    );

    expect(filterQueryParams).toMatchSnapshot();
    expect(stringifyQs(filterQueryParams)).toMatchSnapshot();
  });
});

describe('Parsing filter value', () => {
  it('should return boolean values when boolean attributes values passed', () => {
    // Arrange
    const params: ProductListUrlFilters = {
      'boolean-attributes': {
        'test-1': ['true'],
        'test-2': ['false'],
      },
    };
    const type = ProductListUrlFiltersAsDictWithMultipleValues.booleanAttributes;

    // Act
    const parsedValue1 = parseFilterValue(params, 'test-1', type);
    const parsedValue2 = parseFilterValue(params, 'test-2', type);

    // Assert
    const expectedValue1: FilterParam = {
      slug: 'test-1',
      boolean: true,
    };
    const expectedValue2: FilterParam = {
      slug: 'test-2',
      boolean: false,
    };
    expect(parsedValue1).toEqual(expectedValue1);
    expect(parsedValue2).toEqual(expectedValue2);
  });

  it('should return numeric values when numeric attributes values passed', () => {
    // Arrange
    const params: ProductListUrlFilters = {
      'numeric-attributes': {
        'test-1': ['1'],
        'test-2': ['1', '2'],
      },
    };
    const type = ProductListUrlFiltersAsDictWithMultipleValues.numericAttributes;

    // Act
    const parsedValue1 = parseFilterValue(params, 'test-1', type);
    const parsedValue2 = parseFilterValue(params, 'test-2', type);

    // Assert
    const expectedValue1: FilterParam = {
      slug: 'test-1',
      valuesRange: {
        gte: 1,
        lte: 1,
      },
    };
    const expectedValue2: FilterParam = {
      slug: 'test-2',
      valuesRange: {
        gte: 1,
        lte: 2,
      },
    };
    expect(parsedValue1).toEqual(expectedValue1);
    expect(parsedValue2).toEqual(expectedValue2);
  });

  it('should return string values when string attributes values passed', () => {
    // Arrange
    const params: ProductListUrlFilters = {
      'string-attributes': {
        'test-1': ['value-1'],
        'test-2': ['value-2', 'value-3'],
      },
    };
    const type = ProductListUrlFiltersAsDictWithMultipleValues.stringAttributes;

    // Act
    const parsedValue1 = parseFilterValue(params, 'test-1', type);
    const parsedValue2 = parseFilterValue(params, 'test-2', type);

    // Assert
    const expectedValue1: FilterParam = {
      slug: 'test-1',
      values: ['value-1'],
    };
    const expectedValue2: FilterParam = {
      slug: 'test-2',
      values: ['value-2', 'value-3'],
    };
    expect(parsedValue1).toEqual(expectedValue1);
    expect(parsedValue2).toEqual(expectedValue2);
  });

  it('should return date values when date attributes values passed', () => {
    // Arrange
    const params: ProductListUrlFilters = {
      'date-attributes': {
        'test-1': ['2020-01-01'],
        'test-2': ['2020-01-01', '2020-02-02'],
      },
    };
    const type = ProductListUrlFiltersAsDictWithMultipleValues.dateAttributes;

    // Act
    const parsedValue1 = parseFilterValue(params, 'test-1', type);
    const parsedValue2 = parseFilterValue(params, 'test-2', type);

    // Assert
    const expectedValue1: FilterParam = {
      slug: 'test-1',
      date: {
        gte: '2020-01-01',
        lte: '2020-01-01',
      },
    };
    const expectedValue2: FilterParam = {
      slug: 'test-2',
      date: {
        gte: '2020-01-01',
        lte: '2020-02-02',
      },
    };
    expect(parsedValue1).toEqual(expectedValue1);
    expect(parsedValue2).toEqual(expectedValue2);
  });

  it('should return datetime values when datetime attributes values passed', () => {
    // Arrange
    const params: ProductListUrlFilters = {
      'datetime-attributes': {
        'test-1': ['2020-01-01T00:00:00'],
        'test-2': ['2020-01-01T00:00:00', '2020-02-02T00:00:00'],
      },
    };
    const type = ProductListUrlFiltersAsDictWithMultipleValues.dateTimeAttributes;

    // Act
    const parsedValue1 = parseFilterValue(params, 'test-1', type);
    const parsedValue2 = parseFilterValue(params, 'test-2', type);

    // Assert
    const expectedValue1: FilterParam = {
      slug: 'test-1',
      dateTime: {
        gte: '2020-01-01T00:00:00',
        lte: '2020-01-01T00:00:00',
      },
    };
    const expectedValue2: FilterParam = {
      slug: 'test-2',
      dateTime: {
        gte: '2020-01-01T00:00:00',
        lte: '2020-02-02T00:00:00',
      },
    };
    expect(parsedValue1).toEqual(expectedValue1);
    expect(parsedValue2).toEqual(expectedValue2);
  });
});
