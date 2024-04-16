import { useTranslation } from '@core/i18n';
import { ControlledCheckbox } from '@dashboard/components/forms/ControlledCheckbox';
import Label from '@dashboard/components/orders/OrderHistory/Label';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import type { FC, ReactNode } from 'react';
import styles from './index.module.css';

export const messages = {
  selectTitle: {
    id: '7scATx',
    defaultMessage: 'Select channels you want for {contentType} to be available on',
    description: 'select title',
  },
  selectAllChannelsLabel: {
    id: 'zR9Ozi',
    defaultMessage: 'Select All Channels',
    description: 'select all channels label',
  },
  channelsAlphabeticallyTitle: {
    id: '/lBLBI',
    defaultMessage: 'Channels from A to Z',
    description: 'channels alphabetically title',
  },
  notFoundTitle: {
    id: 'PctLol',
    defaultMessage: 'No Channels Found',
    description: 'no channels found title',
  },
};

export interface ChannelsAvailabilityContentProps {
  contentType?: string;
  toggleAll?: () => void;
  children: ReactNode;
  toggleAllLabel?: ReactNode;
  query: string;
  onQueryChange: (query: string) => void;
  hasAnyChannelsToDisplay: boolean;
  hasAllSelected: boolean;
}

export const ChannelsAvailabilityContentWrapper: FC<ChannelsAvailabilityContentProps> = ({
  contentType = '',
  toggleAll,
  toggleAllLabel,
  children,
  hasAnyChannelsToDisplay,
  query,
  onQueryChange,
  hasAllSelected,
}) => {
  const { t } = useTranslation();
  const searchText = t('dashboard.baLoZ', 'Search through channels');

  return (
    <div className={styles.content ?? ''}>
      {!!contentType && (
        <Typography className={styles.text ?? ''} variant="caption">
          {t(
            'dashboard.selectTitle',
            'Select channels you want for {{contentType}} to be available on'
          )}
        </Typography>
      )}
      <TextField
        name="query"
        value={query}
        className={styles.input ?? ''}
        onChange={(e) => onQueryChange(e.target.value)}
        label={searchText}
        placeholder={searchText}
        fullWidth
      />
      <div className={styles.dialog ?? ''}>
        {!!toggleAll && (
          <>
            <ControlledCheckbox
              checked={hasAllSelected}
              name="allChannels"
              label={
                toggleAllLabel || (
                  <Label text={t('dashboard.selectAllChannelsLabel', 'Select All Channels')} />
                )
              }
              onChange={toggleAll}
            />
            <Divider />
          </>
        )}
        <Typography className={styles.contentTitle ?? ''}>
          {t('dashboard.channelsAlphabeticallyTitle', 'Channels from A to Z')}
        </Typography>
        <div
          className={styles.scrollArea ?? ''}
          data-test-id="manage-products-channels-availiability-list"
        >
          {hasAnyChannelsToDisplay ? (
            children
          ) : (
            <div className={styles.notFound ?? ''}>
              {t('dashboard.otFoundTitle', 'No Channels Found')}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChannelsAvailabilityContentWrapper;
