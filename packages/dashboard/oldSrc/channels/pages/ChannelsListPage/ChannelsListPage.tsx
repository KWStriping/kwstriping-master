import { useTranslation } from '@core/i18n';
import { Button } from '@core/ui/components/buttons/Button';
import IconButton from '@core/ui/components/buttons/IconButton/IconButton';
import { Backlink } from '@core/ui/components/Layout/Backlink';
import Link from '@core/ui/components/Link';
import { renderCollection } from '@core/ui/utils';
import LimitReachedAlert from '@dashboard/components/alerts/LimitReachedAlert';
import PageHeader from '@dashboard/components/core/PageHeader';
import ResponsiveTable from '@dashboard/components/tables/ResponsiveTable';
import TableCellHeader from '@dashboard/components/tables/TableCellHeader';
import type { ChannelDetailsFragment, RefreshLimitsQuery } from '@core/api/graphql';
import { channelAddUrl, channelUrl } from '@dashboard/oldSrc/channels/urls';
import { stopPropagation } from '@dashboard/oldSrc/misc';
import { hasLimits, isLimitReached } from '@dashboard/oldSrc/utils/limits';
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
  const { t } = useTranslation();

  const limitReached = isLimitReached(limits, 'channels');

  return (
    <Container>
      <Backlink href={'/configuration'}>{t('dashboard.configuration', 'Configuration')}</Backlink>
      <PageHeader
        title={t('dashboard.channels', 'Channels')}
        subtitle={
          hasLimits(limits, 'channels') &&
          t('dashboard.ZMT44', '{{count}/{{max} channels used', {
            count: limits.currentUsage.channels,
            max: limits.allowedUsage.channels,
          })
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

            {t('dashboard.Gm8wO', 'Create Channel')}
          </>
        </Button>
      </PageHeader>
      {limitReached && (
        <LimitReachedAlert
          title={t(
            'dashboard.TW56s',
            'Channel limit reached'
            // alert
          )}
        >
          <>
            {t(
              'dashboard.My18J',
              'You have reached your channel limit, you will be no longer able to add channels to your store. If you would like to up your limit, contact your administration staff about raising your limits.'
            )}
          </>
        </LimitReachedAlert>
      )}
      <Card>
        <ResponsiveTable>
          <TableHead>
            <TableRow>
              <TableCellHeader>
                {t('dashboard.channelNameColumnHeader', 'Channel name')}
              </TableCellHeader>
              <TableCell className={styles.colRight ?? ''}>
                {t('dashboard.actions', 'Actions')}
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
                    {t('/glQgs', 'No channels found')}
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
