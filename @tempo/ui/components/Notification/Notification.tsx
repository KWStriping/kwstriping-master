import SnackbarContent from '@mui/material/SnackbarContent';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';
import type { SVGProps, FC } from 'react';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import ExpandIcon from '@mui/icons-material/Expand';
import styles from './Notification.module.css';

import type { NotificationProps, NotificationType } from './types';
import { CompleteIcon, InfoIcon, NotAllowedIcon, WarningIcon } from '@tempo/ui/icons';
import IconButton from '@tempo/ui/components/buttons/IconButton';
import { Button } from '@tempo/ui/components/buttons/Button';

interface IconProps extends SVGProps<SVGSVGElement> {
  type: NotificationType;
}
const Icon: FC<IconProps> = ({ type, ...props }) => {
  switch (type) {
    case 'error':
      return <NotAllowedIcon {...props} />;
    case 'warning':
      return <WarningIcon {...props} />;
    case 'success':
      return <CompleteIcon {...props} />;
    default:
      return <InfoIcon {...props} />;
  }
};

export const Notification: FC<NotificationProps> = ({
  onClose,
  title,
  type,
  action,
  content,
  className,
  apiMessage,
  ...rest
}) => {
  const [showApiMessage, setShowApiMessage] = useState(false);

  return (
    <div
      className={clsx(styles.snackbarContainer, className)}
      data-test="notification"
      data-test-type={type}
      {...rest}
    >
      <SnackbarContent
        aria-describedby="client-snackbar"
        classes={{
          action: clsx(
            styles.snackbarAction ?? '',
            !!action && !apiMessage && styles.snackbarContentWithAction
          ),
          message: styles.messageContainer ?? '',
        }}
        className={clsx(
          styles.snackbar ?? '',
          type === 'info' && (styles.info ?? ''),
          type === 'error' && (styles.error ?? ''),
          type === 'success' && (styles.success ?? ''),
          type === 'warning' && styles.warning
        )}
        message={
          <div className={styles.container ?? ''} data-test-id="notification-message">
            <div>
              <Icon className={styles.icon ?? ''} type={type} />
            </div>
            <div>
              <div className={styles.title ?? ''}>
                <Typography variant="h5">{title}</Typography>
              </div>
              <Typography variant="body1">{content}</Typography>
              {showApiMessage && (
                <Typography variant="body2" className={styles.apiMessage ?? ''}>
                  {apiMessage?.apiMessageContent}
                </Typography>
              )}
            </div>
          </div>
        }
        action={[
          <div key="actions" data-test-id="notification-actions">
            {!!action && (
              <Button
                className={styles.actionBtn ?? ''}
                key="action"
                color="secondary"
                size="small"
                onClick={action.onClick}
                data-test="button-action"
              >
                {action.label}
              </Button>
            )}
          </div>,
          <div
            key="api-action"
            className={styles.apiMessageAction ?? ''}
            data-test-id="notification-api-action"
          >
            {!!apiMessage && (
              <>
                <Typography variant="body1">
                  {showApiMessage ? apiMessage.hideApiLabel : apiMessage.showApiLabel}
                </Typography>
                <IconButton
                  aria-label={showApiMessage ? 'shrink' : 'expand'}
                  onClick={() => setShowApiMessage((show) => !show)}
                  hoverOutline={false}
                  color="secondary"
                  className={styles.apiErrorButton ?? ''}
                  size="large"
                >
                  <ExpandIcon className={clsx(showApiMessage && styles.rotate)} />
                </IconButton>
              </>
            )}
          </div>,
          <IconButton
            key="something" // TODO
            aria-label="Close"
            onClick={onClose}
            hoverOutline={false}
            color="secondary"
            className={styles.closeBtn ?? ''}
            data-test="close"
            size="large"
          >
            <CloseIcon />
          </IconButton>,
        ]}
      />
    </div>
  );
};
Notification.displayName = 'Notification';
