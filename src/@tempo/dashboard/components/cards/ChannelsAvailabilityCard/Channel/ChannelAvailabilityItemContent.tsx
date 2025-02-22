import * as m from '@paraglide/messages';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';
import { useState } from 'react';
import type { FC } from 'react';

import styles from '../index.module.css';
import type { ChannelOpts, ChannelsAvailabilityError, Messages } from '../types';
import { getFormErrors, getProductErrorMessage } from '@tempo/dashboard/oldSrc/utils/errors';
import type { ChannelData } from '@tempo/dashboard/oldSrc/channels/utils';
import useDateLocalize from '@tempo/dashboard/hooks/useDateLocalize';
import useCurrentDate from '@tempo/dashboard/hooks/useCurrentDate';
import ControlledCheckbox from '@tempo/dashboard/components/forms/ControlledCheckbox';
import RadioSwitchField from '@tempo/dashboard/components/fields/RadioSwitchField';

export interface ChannelContentProps {
  disabled?: boolean;
  data: ChannelData;
  errors: ChannelsAvailabilityError[];
  messages: Messages;
  onChange: (id: string, data: ChannelOpts) => void;
}

const ChannelContent: FC<ChannelContentProps> = ({
  data,
  disabled,
  errors,
  messages,
  onChange,
}) => {
  const {
    availableForPurchase,
    isAvailableForPurchase: isAvailable,
    isPublished,
    publishedAt,
    visibleInListings,
    id,
  } = data;
  const formData = {
    ...(availableForPurchase !== undefined ? { availableForPurchase } : {}),
    ...(isAvailable !== undefined ? { isAvailableForPurchase: isAvailable } : {}),
    isPublished,
    publishedAt,
    ...(visibleInListings !== undefined ? { visibleInListings } : {}),
  };
  const dateNow = useCurrentDate();
  const localizeDate = useDateLocalize();
  const hasAvailableProps = isAvailable !== undefined && availableForPurchase !== undefined;
  const [isPublicationDate, setPublicationDate] = useState(publishedAt === null);
  const [isAvailableDate, setAvailableDate] = useState(false);

  const parsedDate = new Date(dateNow);
  const todayDateUTC = parsedDate.toISOString().slice(0, 10);

  const visibleMessage = (date: string) =>
    m.dashboard_inceDate({
      date: localizeDate(date),
    }) ?? 'since {{date}}';
  const formErrors = getFormErrors(['availableForPurchaseDate', 'publishedAt'], errors);

  return (
    <div className={styles.container ?? ''}>
      <RadioSwitchField
        classes={{
          radioLabel: styles.radioLabel ?? '',
        }}
        className={styles.radioField ?? ''}
        disabled={disabled}
        firstOptionLabel={
          <>
            <p className={styles.label ?? ''}>{messages.visibleLabel}</p>
            {isPublished && publishedAt && Date.parse(publishedAt) < dateNow && (
              <span className={styles.secondLabel ?? ''}>
                {messages.visibleSecondLabel || visibleMessage(publishedAt)}
              </span>
            )}
          </>
        }
        name="isPublished"
        secondOptionLabel={
          <>
            <p className={styles.label ?? ''}>{messages.hiddenLabel}</p>
            {publishedAt && !isPublished && Date.parse(publishedAt) >= dateNow && (
              <span className={styles.secondLabel ?? ''}>{messages.hiddenSecondLabel}</span>
            )}
          </>
        }
        value={isPublished}
        onChange={() => {
          onChange(id, {
            ...formData,
            isPublished: !isPublished,
            publishedAt: !isPublished && !publishedAt ? todayDateUTC : publishedAt,
          });
        }}
      />
      {!isPublished && (
        <>
          <Typography
            className={styles.setPublicationDate ?? ''}
            onClick={() => setPublicationDate(!isPublicationDate)}
          >
            {m.dashboard_etPublicationDate() ?? 'Set publication date'}
          </Typography>
          {isPublicationDate && (
            <TextField
              error={!!formErrors.publishedAt}
              disabled={disabled}
              label={m.dashboard_publishOn() ?? 'Publish on'}
              name={`channel:publishedAt:${id}`}
              type="date"
              fullWidth={true}
              helperText={
                formErrors.publishedAt ? getProductErrorMessage(formErrors.publishedAt, t) : ''
              }
              value={publishedAt || ''}
              onChange={(e) =>
                onChange(id, {
                  ...formData,
                  publishedAt: e.target.value || null,
                })
              }
              className={styles.date ?? ''}
              InputLabelProps={{
                shrink: true,
              }}
            />
          )}
        </>
      )}
      {hasAvailableProps && (
        <>
          <Divider />
          <RadioSwitchField
            classes={{
              radioLabel: styles.radioLabel ?? '',
            }}
            className={styles.radioField ?? ''}
            disabled={disabled}
            firstOptionLabel={
              <>
                <p className={styles.label ?? ''}>{messages.availableLabel}</p>
                {isAvailable &&
                  availableForPurchase &&
                  Date.parse(availableForPurchase) < dateNow && (
                    <span className={styles.secondLabel ?? ''}>
                      {visibleMessage(availableForPurchase)}
                    </span>
                  )}
              </>
            }
            name={`channel:isAvailableForPurchase:${id}`}
            secondOptionLabel={
              <>
                <p className={styles.label ?? ''}>{messages.unavailableLabel}</p>
                {availableForPurchase && !isAvailable && (
                  <span className={styles.secondLabel ?? ''}>
                    {messages.availableSecondLabel}
                  </span>
                )}
              </>
            }
            value={isAvailable}
            onChange={(e) => {
              const { value } = e.target;
              return onChange(id, {
                ...formData,
                availableForPurchase: !value ? null : availableForPurchase,
                isAvailableForPurchase: value,
              });
            }}
          />
          {!isAvailable && (
            <>
              <Typography
                className={styles.setPublicationDate ?? ''}
                onClick={() => setAvailableDate(!isAvailableDate)}
              >
                {messages.setAvailabilityDateLabel}
              </Typography>
              {isAvailableDate && (
                <TextField
                  error={!!formErrors.availableForPurchaseDate}
                  disabled={disabled}
                  label={m.dashboard_etAvailableOn() ?? 'Set available on'}
                  name={`channel:availableForPurchase:${id}`}
                  type="date"
                  fullWidth={true}
                  helperText={
                    formErrors.availableForPurchaseDate
                      ? getProductErrorMessage(formErrors.availableForPurchaseDate, t)
                      : ''
                  }
                  value={availableForPurchase ? availableForPurchase : ''}
                  onChange={(e) =>
                    onChange(id, {
                      ...formData,
                      availableForPurchase: e.target.value,
                    })
                  }
                  className={styles.date ?? ''}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              )}
            </>
          )}
        </>
      )}
      {visibleInListings !== undefined && (
        <>
          <Divider />
          <ControlledCheckbox
            className={styles.checkbox ?? ''}
            name={`channel:visibleInListings:${id}`}
            checked={!visibleInListings}
            disabled={disabled}
            label={
              <>
                <p className={clsx(styles.label, styles.listingLabel)}>
                  {m.dashboard_ideInListings() ?? 'Hide in product listings'}
                </p>
                <span className={styles.secondLabel ?? ''}>
                  {m.dashboard_ideInListingsDescription() ??
                    'Enabling this checkbox will remove product from search and category pages. It will be available on collection pages.'}
                </span>
              </>
            }
            onChange={(e) =>
              onChange(id, {
                ...formData,
                visibleInListings: !e.target.value,
              })
            }
          />
        </>
      )}
    </div>
  );
};
export default ChannelContent;
