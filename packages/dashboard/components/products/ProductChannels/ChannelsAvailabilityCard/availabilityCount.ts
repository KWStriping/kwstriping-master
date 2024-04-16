import type {
  ProductCreateDataQuery,
  ProductFragment,
} from '@core/api/graphql';

export const getAvailabilityCountForVariant = (item: ProductFragment) => {
  const variantChannelListingsChannelsIds = item.channelListings.map(({ channel: { id } }) => id);

  const allAvailableChannelsListings = item.product.channelListings.filter(({ channel }) =>
    variantChannelListingsChannelsIds.includes(channel.id)
  );

  const publishedInChannelsListings = allAvailableChannelsListings.filter(
    ({ isPublished }) => isPublished
  );

  return {
    publishedInChannelsCount: publishedInChannelsListings.length,
    availableChannelsCount: allAvailableChannelsListings.length,
  };
};

export const getAvailabilityCountForProduct = (
  item: ProductCreateDataQuery['product']
) => {
  const publishedInChannelsListings = item.channelListings.filter(
    ({ isPublished }) => isPublished
  );

  return {
    publishedInChannelsCount: publishedInChannelsListings.length,
    availableChannelsCount: item.channelListings.length,
  };
};
