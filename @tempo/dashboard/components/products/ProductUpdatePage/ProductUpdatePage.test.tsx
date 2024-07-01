import placeholderImage from '@tempo/dashboard/assets/images/placeholder255x255.png';
import { channelsList } from '@tempo/channels/fixtures';
import { collections } from '@tempo/collections/fixtures';
import { fetchMoreProps, limits } from '@tempo/fixtures';
import * as _useNavigator from '@tempo/hooks/useNavigator';
import { product as productFixture } from '@tempo/products/fixtures';
import { taxClasses } from '@tempo/taxes/fixtures';
import { warehouseList } from '@tempo/warehouses/fixtures';
import Wrapper from '@test/wrapper';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import ProductUpdatePage, { ProductUpdatePageProps } from './ProductUpdatePage';

const product = productFixture(placeholderImage);

const onSubmit = jest.fn();
const useNavigator = jest.spyOn(_useNavigator, 'default');
jest.mock('@tempo/dashboard/components/RichTextEditor/RichTextEditor');
jest.mock('@tempo/utils/richText/useRichText');
/**
 * Mocking glide library. We do want to test only if page renders, grid itself has dedicated tests.
 */
jest.mock('@glideapps/glide-data-grid', () => {
  const { forwardRef } = jest.requireActual<typeof import('react')>('react');
  const dataGrid = jest.requireActual<typeof import('@glideapps/glide-data-grid')>(
    '@glideapps/glide-data-grid'
  );

  return {
    ...dataGrid,
    __esModule: true,
    default: forwardRef((_: any, ref: any) => <div ref={ref} />),
  };
});

const props: ProductUpdatePageProps = {
  channels: channelsList,
  variantListErrors: [],
  productId: '123',
  categories: [product.category],
  isSimpleProduct: false,
  channelsErrors: [],
  collections,
  disabled: false,
  errors: [],
  fetchCategories: () => undefined,
  fetchCollections: () => undefined,
  fetchValues: () => undefined,
  onAttributeSelectBlur: () => undefined,
  fetchMoreCategories: fetchMoreProps,
  fetchMoreCollections: fetchMoreProps,
  fetchMoreValues: fetchMoreProps,
  header: product.name,
  media: product.media,
  limits,
  refetch: () => undefined,
  onValuesSearch: () => Promise.resolve([]),
  onAssignReferencesClick: () => undefined,
  onCloseDialog: () => undefined,
  onDelete: () => undefined,
  onImageDelete: () => undefined,
  onImageUpload: () => undefined,
  onMediaUrlUpload: () => undefined,
  onSubmit,
  onVariantShow: () => undefined,
  placeholderImage,
  product,
  referencePages: [],
  referenceProducts: [],
  saveButtonBarState: 'default',
  taxClasses,
  fetchMoreTaxClasses: undefined,
  variants: product.variants,
  warehouses: warehouseList,
  values: [],
};

describe('Product details page', () => {
  useNavigator.mockImplementation();

  it('can select empty option on attribute', async () => {
    // Arrange
    render(
      <MemoryRouter>
        <Wrapper>
          <ProductUpdatePage {...props} />
        </Wrapper>
      </MemoryRouter>
    );
    const user = userEvent.setup();
    const attributeInput = screen.getAllByRole('textbox')[1];
    // Assert
    expect(attributeInput).toHaveAttribute('aria-labelledby', 'downshift-0-label');
    // Act
    await user.click(attributeInput);
    // Assert
    expect(screen.queryByTestId('autocomplete-dropdown')).toBeInTheDocument();
    // Arrange
    const emptyOption = screen.queryAllByTestId('single-autocomplete-select-option')[0];
    // Assert
    expect(emptyOption).toBeInTheDocument();
    // Act
    await user.click(emptyOption);
    // Assert
    expect(attributeInput).toHaveValue('');
    // Act
    await waitFor(() => fireEvent.submit(screen.getByTestId('product-update-form')));
    // Assert
    expect(onSubmit.mock.calls[0][0].attributes[0].value.length).toEqual(0);
  });
});
