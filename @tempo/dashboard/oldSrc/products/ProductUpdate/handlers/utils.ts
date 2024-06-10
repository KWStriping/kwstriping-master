import type { ProductUpdateSubmitData } from '@tempo/dashboard/components/products/ProductUpdatePage/types';
import { getColumnChannelAvailability } from '@tempo/dashboard/components/products/Products/columnData';
import type {
  FileUploadMutation,
  ProductChannelListingAddInput,
  ProductChannelListingUpdateMutationVariables,
  ProductFragment,
} from '@tempo/api/generated/graphql';
import { getAttributesAfterFileAttributesUpdate } from '@tempo/dashboard/oldSrc/attributes/utils/data';
import { prepareAttributesInput } from '@tempo/dashboard/oldSrc/attributes/utils/handlers';
import { VALUES_PAGINATE_BY } from '@tempo/dashboard/oldSrc/config';
import { getAttributeInputFromProduct } from '@tempo/dashboard/oldSrc/products/utils/data';
import { getParsedDataForJsonStringField } from '@tempo/dashboard/oldSrc/utils/richText/misc';
import pick from 'lodash-es/pick';
import uniq from 'lodash-es/uniq';

export function getProductUpdateVariables(
  product: ProductFragment,
  data: ProductUpdateSubmitData,
  uploadFilesResult: Array<OperationResult<FileUploadMutation>>
) {
  const updatedFileAttributes = getAttributesAfterFileAttributesUpdate(
    data?.attributesWithNewFileValue,
    uploadFilesResult
  );

  return {
    id: product.id,
    input: {
      attributes: prepareAttributesInput({
        attributes: data?.attributes,
        prevAttributes: getAttributeInputFromProduct(product),
        updatedFileAttributes,
      }),
      category: data?.category,
      collections: data?.collections,
      description: getParsedDataForJsonStringField(data?.description),
      name: data?.name,
      rating: data?.rating,
      seo: {
        description: data?.seoDescription,
        title: data?.seoTitle,
      },
      slug: data?.slug,
      taxClass: data?.taxClassId,
    },
    firstValues: VALUES_PAGINATE_BY,
  };
}

const hasChannel = (channelId: string, variant?: ProductFragment['variants'][number]) => {
  if (!variant) {
    return false;
  }

  return variant.channelListings.some((c) => c.channel.id === channelId);
};

export function inferProductChannelsAfterUpdate(
  product: ProductFragment,
  data: ProductUpdateSubmitData
) {
  const productChannelsIds = product.channelListings.map((listing) => listing.channel.id);
  const updatedChannelsIds =
    data?.channels?.updateChannels?.map((listing) => listing.channelId) || [];
  const removedChannelsIds = data?.channels?.removeChannels || [];

  return uniq([
    ...productChannelsIds.filter((channelId) => !removedChannelsIds.includes(channelId)),
    ...updatedChannelsIds,
  ]);
}

export function getProductChannelsUpdateVariables(
  product: ProductFragment,
  data: ProductUpdateSubmitData
): ProductChannelListingUpdateMutationVariables {
  const channels = inferProductChannelsAfterUpdate(product, data);

  const dataUpdated = new Map<string, ProductChannelListingAddInput>();
  data?.channels?.updateChannels
    .map((listing) =>
      pick(
        listing,
        // Filtering it here so we send only fields defined in input schema
        [
          'availableForPurchaseAt',
          'availableForPurchaseDate',
          'channelId',
          'isAvailableForPurchase',
          'isPublished',
          'publishedAt',
          'publishedAt',
          'visibleInListings',
        ] as Array<keyof ProductChannelListingAddInput>
      )
    )
    .forEach((listing) => dataUpdated.set(listing.channelId, listing));

  const variantsUpdates = new Map<string, ProductChannelListingAddInput>();
  channels
    .map((channelId) => ({
      channelId,
      addProducts: data?.variants?.updates
        .filter(
          (change) =>
            !data?.variants?.added?.includes(change.row) &&
            !hasChannel(channelId, product.variants[change.row]) &&
            channelId === getColumnChannelAvailability(change.column) &&
            change.data
        )
        .map((change) => product.variants[change.row].id),
      removeVariants: data?.variants?.updates
        .filter(
          (change) =>
            product.variants[change.row] &&
            channelId === getColumnChannelAvailability(change.column) &&
            !change.data
        )
        .map((change) => product.variants[change.row].id),
    }))
    .filter((listing) => listing.addProducts?.length || listing.removeVariants?.length)
    .forEach((listing) => variantsUpdates.set(listing.channelId, listing));

  const updateChannels = channels
    .filter((channelId) => dataUpdated.has(channelId) || variantsUpdates.has(channelId))
    .map((channelId) => ({
      ...dataUpdated.get(channelId),
      ...variantsUpdates.get(channelId),
    }));

  return {
    id: product.id,
    input: {
      ...data?.channels,
      updateChannels,
    },
  };
}
