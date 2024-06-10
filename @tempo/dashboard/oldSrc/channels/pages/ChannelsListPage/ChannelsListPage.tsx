import * as m from '@paraglide/messages';
import { Button } from '@tempo/ui/components/buttons/Button';
import IconButton from '@tempo/ui/components/buttons/IconButton/IconButton';
import { Backlink } from '@tempo/ui/components/Layout/Backlink';
import Link from '@tempo/ui/components/Link';
import { renderCollection } from '@tempo/ui/utils';
import LimitReachedAlert from '@tempo/dashboard/components/alerts/LimitReachedAlert';
import PageHeader from '@tempo/dashboard/components/core/PageHeader';
import ResponsiveTable from '@tempo/dashboard/components/tables/ResponsiveTable';
import TableCellHeader from '@tempo/dashboard/components/tables/TableCellHeader';
import type { ChannelDetailsFragment, RefreshLimitsQuery } from '@tempo/api/generated/graphql';
import { channelAddUrl, channelUrl } from '@tempo/dashboard/oldSrc/channels/urls';
import { stopPropagation } from '@tempo/dashboard/oldSrc/misc';
import { hasLimits, isLimitReached } from '@tempo/dashboard/oldSrc/utils/limits';
import DeleteIcon from '@mui/icons-material/Delete';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import type { FC } from 'react';
import styles from './index.module.css';

export interface ChannelsListPageProps {
  channelsList: ChannelDetailsFragment[] | undefined;
  limits: RefreshLimitsQuery['shop']['limits'];
  onRemove: (id: string) => void;
}

const numberOfColumns = 2;

export const ChannelsListPage: FC<ChannelsListPageProps> = ({
  channelsList,
  limits,
  onRemove,
}) => {
  const limitReached = isLimitReached(limits, 'channels');

  return (
    <Container>
      <Backlink href={'/configuration'}>
        {m.dashboard_configuration() ?? 'Configuration'}
      </Backlink>
      <PageHeader
        title={m.dashboard_channels() ?? 'Channels'}
        subtitle={
          hasLimits(limits, 'channels') &&
          (m.dashboard_ZMT__({
            count: limits.currentUsage.channels,
            max: limits.allowedUsage.channels,
          }) ??
            '{{count}/{{max} channels used')
        }
      >
        <Button
          disabled={limitReached}
          href={channelAddUrl}
          color="primary"
          data-test-id="add-channel"
        >
          <>
            {/* button */}

            {m.dashboard_Gm_wO() ?? 'Create Channel'}
          </>
        </Button>
      </PageHeader>
      {limitReached && (
        <LimitReachedAlert
          title={
            m.dashboard_TW__s() ?? 'Channel limit reached'
            // alert
          }
        >
          <>
            {m.dashboard_My__J() ??
              'You have reached your channel limit, you will be no longer able to add channels to your store. If you would like to up your limit, contact your administration staff about raising your limits.'}
          </>
        </LimitReachedAlert>
      )}
      <Card>
        <ResponsiveTable>
          <TableHead>
            <TableRow>
              <TableCellHeader>
                {m.dashboard_channelNameColumnHeader() ?? 'Channel name'}
              </TableCellHeader>
              <TableCell className={styles.colRight ?? ''}>
                {m.dashboard_actions() ?? 'Actions'}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {renderCollection(
              channelsList,
              (channel) => (
                <TableRow
                  hover={!!channel}
                  key={channel ? channel.id : 'skeleton'}
                  className={styles.tableRow ?? ''}
                >
                  <TableCell className={styles.colName ?? ''}>
                    <Link href={channel && channelUrl(channel.id)} className={'block w-full'}>
                      {channel.name}
                    </Link>
                  </TableCell>
                  <TableCell className={styles.colAction ?? ''}>
                    {!!channelsList?.length && (
                      <IconButton
                        color="secondary"
                        onClick={
                          channel ? stopPropagation(() => onRemove(channel.id)) : undefined
                        }
                      >
                        <DeleteIcon />
                      </IconButton>
                    )}
                  </TableCell>
                </TableRow>
              ),
              () => (
                <TableRow>
                  <TableCell colSpan={numberOfColumns}>
                    {m._glQgs() ?? 'No channels found'}
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </ResponsiveTable>
      </Card>
    </Container>
  );
};

ChannelsListPage.displayName = 'ChannelsListPage';
export default ChannelsListPage;
