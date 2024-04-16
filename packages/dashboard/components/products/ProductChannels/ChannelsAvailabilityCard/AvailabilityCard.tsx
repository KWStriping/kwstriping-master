import { useTranslation } from '@core/i18n';
import type { FC, ReactNode } from 'react';

import { variantDetailsChannelsAvailabilityCardMessages as messages } from '../messages';
import type { Channel, ProductChannelListing } from '../types';
import { ChannelsList } from './ChannelsList';
import { ChannelsListItem } from './ChannelsListItem';
import { NotAvailable } from './NotAvailable';
import CardContainer from './VariantDetailsChannelsAvailabilityCardContainer';

interface AvailabilityCardProps {
  items: Channel[];
  productChannelListings: ProductChannelListing;
  availabilityCount: Record<string, number>;
  children: ReactNode;
}

export const AvailabilityCard: FC<AvailabilityCardProps> = ({
  availabilityCount,
  items,
  productChannelListings,
  children,
}) => {
  const { t } = useTranslation();
  const channelListSummary = t(messages.subtitle, availabilityCount);

  if (items.length === 0) {
    return (
      <CardContainer cardTitle={children}>
        <NotAvailable />
      </CardContainer>
    );
  }

  return (
    <CardContainer cardTitle={children}>
      <ChannelsList summary={channelListSummary}>
        {items.map((channel) => (
          <ChannelsListItem {...channel} listings={productChannelListings} />
        ))}
      </ChannelsList>
    </CardContainer>
  );
};
