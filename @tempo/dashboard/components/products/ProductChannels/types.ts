import type {
  ProductCreateDataQuery,
  ProductFragment,
} from '@tempo/api/generated/graphql';

export type Product = ProductCreateDataQuery['product'];
export type Variant = ProductFragment;
export type ProductChannelListing = Product['channelListings'];
export type VariantChannelListing = Variant['channelListings'];
export type ChannelListings = ProductChannelListing | VariantChannelListing;
export type Channel = ProductChannelListing[number]['channel'];
