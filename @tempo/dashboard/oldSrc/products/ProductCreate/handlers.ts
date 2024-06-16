import type { ProductCreateData } from '@tempo/dashboard/components/products/ProductCreatePage/form';
import type {
  AttributeErrorFragment,
  FileUploadMutation,
  FileUploadMutationVariables,
  ProductChannelListingErrorFragment,
  ProductChannelListingUpdateMutation,
  ProductChannelListingUpdateMutationVariables,
  ProductCreateMutation,
  ProductCreateMutationVariables,
  ProductDeleteMutation,
  ProductDeleteMutationVariables,
  ProductErrorFragment,
  ProductKlassQuery,
  ProductChannelListingUpdateMutation,
  ProductChannelListingUpdateMutationVariables,
  UploadErrorFragment,
} from '@tempo/api/generated/graphql';
import {
  getAttributesAfterFileAttributesUpdate,
  mergeFileUploadErrors,
} from '@tempo/dashboard/oldSrc/attributes/utils/data';
import {
  handleUploadMultipleFiles,
  prepareAttributesInput,
} from '@tempo/dashboard/oldSrc/attributes/utils/handlers';
import type { ChannelData } from '@tempo/dashboard/oldSrc/channels/utils';
import { weight } from '@tempo/dashboard/oldSrc/misc';
import { getAvailabilityVariables } from '@tempo/dashboard/oldSrc/products/utils/handlers';
import { getParsedDataForJsonStringField } from '@tempo/dashboard/oldSrc/utils/richText/misc';

const getChannelsVariables = (productId: string, channels: ChannelData[]) => ({
  variables: {
    id: productId,
    input: {
      updateChannels: getAvailabilityVariables(channels),
    },
  },
});

const getSimpleProductVariables = (formData: ProductCreateData, productId: string) => ({
  input: {
    attributes: [],
    product: productId,
    sku: formData.sku,
    stocks: formData.stocks?.map((stock) => ({
      quantity: parseInt(stock.value, 10),
      warehouse: stock.id,
    })),
    preorder: formData.isPreorder
      ? {
        globalThreshold: formData.globalThreshold
          ? parseInt(formData.globalThreshold, 10)
          : null,
        endDate: formData.preorderEndDateTime || null,
      }
      : null,
    trackInventory: formData.trackInventory,
  },
});

export function createHandler(
  productKlass: ProductKlassQuery['productKlass'],
  uploadFile: (
    variables: FileUploadMutationVariables
  ) => Promise<OperationResult<FileUploadMutation>>,
  createProduct: (
    variables: ProductCreateMutationVariables
  ) => Promise<OperationResult<ProductCreateMutation>>,
  // createProduct: (
  //   variables: ProductCreateMutationVariables
  // ) => Promise<OperationResult<ProductCreateMutation>>,
  updateChannels: (
    variables: ProductChannelListingUpdateMutationVariables
  ) => Promise<OperationResult<ProductChannelListingUpdateMutation>>,
  updateVariantChannels: (
    variables: ProductChannelListingUpdateMutationVariables
  ) => Promise<OperationResult<ProductChannelListingUpdateMutation>>,
  deleteProduct: (
    variables: ProductDeleteMutationVariables
  ) => Promise<OperationResult<ProductDeleteMutation>>
) {
  return async (formData: ProductCreateData) => {
    let errors: Array<
      | AttributeErrorFragment
      | UploadErrorFragment
      | ProductErrorFragment
      | ProductChannelListingErrorFragment
    > = [];

    const uploadFilesResult = await handleUploadMultipleFiles(
      formData.attributesWithNewFileValue,
      uploadFile
    );

    errors = [...errors, ...mergeFileUploadErrors(uploadFilesResult)];
    const updatedFileAttributes = getAttributesAfterFileAttributesUpdate(
      formData.attributesWithNewFileValue,
      uploadFilesResult
    );

    const productVariables: ProductCreateMutationVariables = {
      input: {
        attributes: prepareAttributesInput({
          attributes: formData.attributes,
          prevAttributes: null,
          updatedFileAttributes,
        }),
        category: formData.category,
        collections: formData.collections,
        description: getParsedDataForJsonStringField(formData.description),
        name: formData.name,
        productKlass: formData.productKlass?.id,
        rating: formData.rating,
        seo: {
          description: formData.seoDescription,
          title: formData.seoTitle,
        },
        slug: formData.slug,
        taxClass: formData.taxClassId,
        weight: weight(formData.weight),
      },
    };

    const result = await createProduct(productVariables);
    const productErrors = result.data?.createProduct?.errors || [];

    errors = [...errors, ...productErrors];

    const hasVariants = productKlass?.hasVariants;
    const productId = result?.data?.createProduct?.product?.id;

    if (!productId) {
      return { errors };
    }

    if (!hasVariants) {
      const result = await Promise.all([
        updateChannels(getChannelsVariables(productId, formData.channelListings)),
        createProduct(getSimpleProductVariables(formData, productId)),
      ]);
      const channelErrors = result[0].data?.updateProductChannelListing?.errors || [];
      const variantErrors = result[1].data?.createProduct?.errors || [];
      errors = [...errors, ...channelErrors, ...variantErrors];

      const productId = result[1]?.data?.createProduct?.productVariant?.id;
      if (variantErrors.length === 0 && productId) {
        updateVariantChannels({
          id: productId,
          input: formData.channelListings.map((listing) => ({
            channelId: listing.id,
            costPrice: listing.costPrice || null,
            price: listing.price,
          })),
        });
      }
    } else {
      const result = await updateChannels(
        getChannelsVariables(productId, formData.channelListings)
      );
      const channelErrors = result.data?.updateProductChannelListing?.errors || [];

      errors = [...errors, ...channelErrors];
    }

    /*
     INFO: This is a stop-gap solution, where we delete products that didn't meet all required data in the create form
     A more robust solution would require merging create and update form into one to persist form state across redirects
    */
    if (productId && errors?.length) {
      await deleteProduct({ id: productId });

      return { errors };
    }
    return { id: productId || null, errors };
  };
}
