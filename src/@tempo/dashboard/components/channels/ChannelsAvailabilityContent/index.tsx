import * as m from '@paraglide/messages';
import { Trans } from '@tempo/next/i18n';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { filter } from 'fuzzaldrin';
import type { FC } from 'react';
import { useState } from 'react';
import styles from './index.module.css';
import type { Channel } from '@tempo/dashboard/oldSrc/channels/utils';
import { ControlledCheckbox } from '@tempo/dashboard/components/forms/ControlledCheckbox';

export interface ChannelsAvailabilityContentProps {
  isSelected: (option: Channel) => boolean;
  channels: Channel[];
  contentType?: string;
  disabled: boolean;
  onChange: (option: Channel) => void;
  selected?: number;
  toggleAllText?: string;
  toggleAll?: (items: Channel[], selected: number) => void;
}

export const ChannelsAvailabilityContent: FC<ChannelsAvailabilityContentProps> = ({
  isSelected,
  channels,
  contentType = '',
  onChange,
  selected = 0,
  toggleAll,
  toggleAllText,
}) => {
  const searchText = m.dashboard_baLoZ() ?? 'Search through channels';
  const [query, onQueryChange] = useState('');
  const filteredChannels = filter(channels, query, { key: 'name' });

  return (
    <div className={styles.content ?? ''}>
      {!!contentType && (
        <Typography className={styles.text ?? ''} variant="caption">
          <Trans i18nKey={'tQuE1q'} contentType={contentType}>
            {'Select channels you want for {{contentType}} to be available on'}
          </Trans>
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
              checked={selected === channels?.length}
              name="allChannels"
              label={
                toggleAllText || (
                  <Typography className={styles.label ?? ''}>
                    {m.dashboard_() / L4zZ ?? 'Select all channels'}
                  </Typography>
                )
              }
              onChange={() => toggleAll(channels, selected)}
            />
            <Divider />
          </>
        )}
        <Typography className={styles.contentTitle ?? ''}>
          {m.dashboard_WCUdP() ?? 'Channels A to Z'}
        </Typography>
        <div
          className={styles.scrollArea ?? ''}
          data-test-id="manage-products-channels-availiability-list"
        >
          {filteredChannels?.length ? (
            filteredChannels.map((option) => (
              <div key={option.id} className={styles.option ?? ''} data-test-id="channel-row">
                <ControlledCheckbox
                  checked={isSelected(option)}
                  name={option.name}
                  label={<Typography className={styles.label ?? ''}>{option.name}</Typography>}
                  onChange={() => onChange(option)}
                />
                <Divider />
              </div>
            ))
          ) : (
            <div className={styles.notFound ?? ''}>
              {m.dashboard__yrkK() ?? 'No Channels found'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
ChannelsAvailabilityContent.displayName = 'ChannelsAvailabilityContent';
export default ChannelsAvailabilityContent;
