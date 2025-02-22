import type { FC } from 'react';

import type { Channel, Product, Variant } from '../types';
import { AvailabilityCard } from './AvailabilityCard';
import {
  getAvailabilityCountForProduct,
  getAvailabilityCountForVariant,
} from './availabilityCount';
import { CardSkeleton } from './CardSkeleton';
import { CreateVariantTitle } from './CreateVariantTitle';

interface VariantDetailsChannelsAvailabilityCardProps {
  variant: Variant;
  onManageClick?: () => void;
}

interface ProductDetailsChannelsAvailabilityCardProps {
  product: Product;
  onManageClick?: () => void;
}

interface WrapperProps {
  item: Product | Variant;
  children: ({ channels }: { channels: Channel[] }) => ReactElement;
}

const Wrapper: FC<WrapperProps> = ({ item, children }) => {
  if (!item) {
    return <CardSkeleton />;
  }

  const channels = item.channelListings.map(({ channel }) => channel);

  return children({ channels });
};

export const VariantDetailsChannelsAvailabilityCard: FC<
  VariantDetailsChannelsAvailabilityCardProps
> = ({ variant, onManageClick }) => (
  <Wrapper item={variant}>
    {({ channels }) => (
      <AvailabilityCard
        items={channels}
        availabilityCount={getAvailabilityCountForVariant(variant)}
        productChannelListings={variant.product.channelListings}
      >
        <CreateVariantTitle onManageClick={onManageClick} />
      </AvailabilityCard>
    )}
  </Wrapper>
);

export const ProductDetailsChannelsAvailabilityCard: FC<
  ProductDetailsChannelsAvailabilityCardProps
> = ({ product, onManageClick }) => (
  <Wrapper item={product}>
    {({ channels }) => (
      <AvailabilityCard
        items={channels}
        availabilityCount={getAvailabilityCountForProduct(product)}
        productChannelListings={product.channelListings}
      >
        <CreateVariantTitle onManageClick={onManageClick} />
      </AvailabilityCard>
    )}
  </Wrapper>
);
