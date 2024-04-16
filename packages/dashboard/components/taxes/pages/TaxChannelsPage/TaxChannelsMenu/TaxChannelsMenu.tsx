import { useTranslation } from '@core/i18n';
import { List, ListHeader, ListItem, ListItemCell } from '@core/ui/components/list/List';
import ListItemLink from '@dashboard/components/core/ListItemLink';
import type { TaxConfigurationFragment } from '@core/api/graphql';
import { taxConfigurationListUrl } from '@dashboard/oldSrc/taxes/urls';
import { isLastElement } from '@dashboard/oldSrc/taxes/utils/utils';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Skeleton from '@mui/material/Skeleton';
import clsx from 'clsx';
import type { FC } from 'react';
import { Fragment } from 'react';

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
            <ListItemCell>{t('dashboard.channelList', 'Channel name')}</ListItemCell>
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
  const { t } = useTranslation();
};

export default TaxChannelsMenu;
