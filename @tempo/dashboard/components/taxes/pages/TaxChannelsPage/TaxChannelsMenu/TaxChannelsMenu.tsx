import * as m from '@paraglide/messages';
import { List, ListHeader, ListItem, ListItemCell } from '@tempo/ui/components/list/List';
import type { TaxConfigurationFragment } from '@tempo/api/generated/graphql';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Skeleton from '@mui/material/Skeleton';
import clsx from 'clsx';
import type { FC } from 'react';
import { Fragment } from 'react';
import { isLastElement } from '@tempo/dashboard/oldSrc/taxes/utils/utils';
import { taxConfigurationListUrl } from '@tempo/dashboard/oldSrc/taxes/urls';
import ListItemLink from '@tempo/dashboard/components/core/ListItemLink';

interface TaxChannelsMenuProps {
  configurations: TaxConfigurationFragment[] | undefined;
  selectedConfigurationId: string;
}

export const TaxChannelsMenu: FC<TaxChannelsMenuProps> = ({
  configurations,
  selectedConfigurationId,
}) => {
  return (
    <Card>
      <List gridTemplate={['1fr']}>
        <ListHeader>
          <ListItem className={styles.tableRow ?? ''}>
            <ListItemCell>{m.dashboard_channelList() ?? 'Channel name'}</ListItemCell>
          </ListItem>
        </ListHeader>
        <Divider />
        {configurations?.map((configuration, confIndex) => (
          <Fragment key={configuration.id}>
            <ListItemLink
              className={clsx(
                styles.clickable ?? '',
                styles.tableRow ?? '',
                configuration.id === selectedConfigurationId && styles.selected
              )}
              href={taxConfigurationListUrl(configuration.id)}
            >
              <ListItemCell className={styles.ellipsis ?? ''}>
                {configuration.channel.name}
              </ListItemCell>
            </ListItemLink>
            {!isLastElement(configurations, confIndex) && <Divider />}
          </Fragment>
        )) ?? <Skeleton />}
      </List>
    </Card>
  );
};

export default TaxChannelsMenu;
