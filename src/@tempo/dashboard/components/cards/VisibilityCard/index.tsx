import * as m from '@paraglide/messages';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';
import type { FC, ReactNode } from 'react';
import DateVisibilitySelector from './DateVisibilitySelector';
import styles from './index.module.css';
import CardTitle from '@tempo/dashboard/components/core/CardTitle';
import RadioSwitchField from '@tempo/dashboard/components/fields/RadioSwitchField';
import ControlledCheckbox from '@tempo/dashboard/components/forms/ControlledCheckbox';
import FormSpacer from '@tempo/dashboard/components/forms/Form/FormSpacer';
import useCurrentDate from '@tempo/dashboard/hooks/useCurrentDate';
import useDateLocalize from '@tempo/dashboard/hooks/useDateLocalize';
import type { ChangeEvent } from '@tempo/dashboard/hooks/useForm';
import type { UserError } from '@tempo/dashboard/oldSrc/types';
import { getFieldError } from '@tempo/dashboard/oldSrc/utils/errors';

interface Message {
  visibleLabel: string;
  hiddenLabel: string;
  visibleSecondLabel?: string;
  hiddenSecondLabel: string;
  availableLabel?: string;
  unavailableLabel?: string;
  availableSecondLabel?: string;
  setAvailabilityDateLabel?: string;
}

export interface DateFields {
  publishedAt: string;
  availableForPurchase?: string;
}

export interface VisibilityCardProps {
  children?: ReactNode | ReactNode[];
  data: DateFields & {
    isAvailableForPurchase?: boolean;
    isPublished: boolean;
    visibleInListings?: boolean;
  };
  errors: UserError[];
  disabled?: boolean;
  messages: Message;
  onChange: (event: ChangeEvent) => void;
}

export const VisibilityCard: FC<VisibilityCardProps> = (props) => {
  const {
    children,
    data: {
      availableForPurchase,
      isAvailableForPurchase: isAvailable,
      isPublished,
      publishedAt,
      visibleInListings,
    },
    errors,
    disabled,
    messages,
    onChange,
  } = props;
  const localizeDate = useDateLocalize();
  const dateNow = useCurrentDate();
  const hasAvailableProps = isAvailable !== undefined && availableForPurchase !== undefined;

  const visibleMessage = (date: string) =>
    m.dashboard_inceDate({
      date: localizeDate(date),
    }) ?? 'since {{date}}';

  const handleRadioFieldChange = (type: keyof DateFields) => (e: ChangeEvent) => {
    const { value } = e.target;
    if (!value) {
      onChange({
        target: {
          name: type,
          value: null,
        },
      });
    }
    return onChange(e);
  };

  return (
    <Card>
      <CardTitle title={m.dashboard_title() ?? 'Visibility'} />
      <CardContent>
        <RadioSwitchField
          disabled={disabled}
          error={!!getFieldError(errors, 'isPublished')}
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
          name={'isPublished' as keyof FormData}
          secondOptionLabel={
            <>
              <p className={styles.label ?? ''}>{messages.hiddenLabel}</p>
              {publishedAt && !isPublished && Date.parse(publishedAt) >= dateNow && (
                <span className={styles.secondLabel ?? ''}>{messages.hiddenSecondLabel}</span>
              )}
            </>
          }
          value={isPublished}
          onChange={handleRadioFieldChange('publishedAt')}
        />
        {!isPublished && (
          <DateVisibilitySelector
            buttonText={m.dashboard_etPublicationDate() ?? 'Set publication date'}
            onInputClose={() => onChange({ target: { name: 'publishedAt', value: null } })}
          >
            <TextField
              error={!!getFieldError(errors, 'publishedAt')}
              disabled={disabled}
              label={m.dashboard_publishOn() ?? 'Publish on'}
              name="publishedAt"
              type="date"
              fullWidth={true}
              helperText={getFieldError(errors, 'publishedAt')?.message}
              value={publishedAt ? publishedAt : ''}
              onChange={onChange}
              className={styles.date ?? ''}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </DateVisibilitySelector>
        )}
        {getFieldError(errors, 'isPublished') && (
          <>
            <FormSpacer />
            <Typography color="error">{getFieldError(errors, 'isPublished')?.message}</Typography>
          </>
        )}
        {hasAvailableProps && (
          <>
            <Divider />
            <RadioSwitchField
              className={styles.switchField ?? ''}
              disabled={disabled}
              error={!!getFieldError(errors, 'isAvailableForPurchase')}
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
              name={'isAvailableForPurchase' as keyof FormData}
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
              onChange={handleRadioFieldChange('availableForPurchase')}
            />
            {!isAvailable && (
              <DateVisibilitySelector
                buttonText={messages.setAvailabilityDateLabel}
                onInputClose={() =>
                  onChange({
                    target: { name: 'availableForPurchase', value: null },
                  })
                }
              >
                <TextField
                  error={!!getFieldError(errors, 'startDate')}
                  disabled={disabled}
                  label={m.dashboard_etAvailableOn() ?? 'Set available on'}
                  name="availableForPurchase"
                  type="date"
                  fullWidth={true}
                  helperText={getFieldError(errors, 'startDate')?.message}
                  value={availableForPurchase ? availableForPurchase : ''}
                  onChange={onChange}
                  className={styles.date ?? ''}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </DateVisibilitySelector>
            )}
            {getFieldError(errors, 'isAvailableForPurchase') && (
              <>
                <FormSpacer />
                <Typography color="error">
                  {getFieldError(errors, 'isAvailableForPurchase')?.message}
                </Typography>
              </>
            )}
          </>
        )}
        {visibleInListings !== undefined && (
          <>
            <Divider />
            <ControlledCheckbox
              className={styles.checkbox ?? ''}
              name="visibleInListings"
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
              onChange={(event) =>
                onChange({
                  ...event,
                  target: {
                    ...event.target,
                    value: !event.target.value,
                  },
                })
              }
            />
          </>
        )}
        <div className={styles.children ?? ''}>{children}</div>
      </CardContent>
    </Card>
  );
};
VisibilityCard.displayName = 'VisibilityCard';
export default VisibilityCard;
