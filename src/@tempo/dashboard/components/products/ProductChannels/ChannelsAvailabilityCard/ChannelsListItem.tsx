import * as m from '@paraglide/messages';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';
import { Fragment } from 'react';

import type { Channel, ProductChannelListing } from '../types';
import useDateLocalize from '@tempo/dashboard/hooks/useDateLocalize';

type ChannelsListItemProps = Pick<Channel, 'id' | 'name'> & {
  listings: ProductChannelListing;
};

export const ChannelsListItem: FC<ChannelsListItemProps> = ({ id, name, listings }) => {
  const localizeDate = useDateLocalize();

  const getItemSubtitle = (channelId: string) => {
    const channelListing = listings.find(({ channel }) => channel.id === channelId);

    const { isPublished, publishedAt } = channelListing;

    if (!isPublished) {
      return m.dashboard_itemSubtitleHidden() ?? 'Hidden';
    }

    return (
      m.dashboard_itemSubtitlePublished({
        publishedAt: localizeDate(publishedAt),
      }) ?? 'Published since {{publishedAt}}'
    );
  };

  return (
    <Fragment key={id}>
      <Divider />
      <CardContent>
        <Typography data-test-id={`channels-variant-availability-item-title-${id}`}>
          {name}
        </Typography>
        <Typography
          variant="caption"
          data-test-id={`channels-variant-availability-item-subtitle-${id}`}
        >
          {getItemSubtitle(id)}
        </Typography>
      </CardContent>
    </Fragment>
  );
};
