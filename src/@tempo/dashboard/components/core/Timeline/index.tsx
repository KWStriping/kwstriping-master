import * as m from '@paraglide/messages';
import { Button } from '@tempo/ui/components/buttons/Button';
import { useShopSettings } from '@tempo/ui/providers/ShopSettingsProvider';
import PersonIcon from '@mui/icons-material/Person';
import Avatar from '@mui/material/Avatar';
import CardContent from '@mui/material/CardContent';
import { deepPurple } from '@mui/material/colors';
import TextField from '@mui/material/TextField';
import clsx from 'clsx';
import type { FormEvent, ChangeEvent, FC, ReactNode } from 'react';
import styles from './index.module.css';
export * from './TimelineEvent';
export * from './TimelineNote';

interface TimelineProps {
  children?: ReactNode;
}

interface TimelineAddNoteProps {
  disabled?: boolean;
  message: string;
  reset: () => void;
  onChange: (event: ChangeEvent<unknown>) => void;
  onSubmit: (event: FormEvent<unknown>) => void;
}

export const Timeline: FC<TimelineProps> = ({ children }) => {
  return <div className={styles.root ?? ''}>{children}</div>;
};

export const TimelineAddNote: FC<TimelineAddNoteProps> = ({
  message,
  onChange,
  onSubmit,
  reset,
  disabled,
}) => {
  const { enableOrderHistoryComments } = useShopSettings();

  if (!enableOrderHistoryComments) {
    console.log('Order history comments are disabled.');
    return null;
  }
  const submit = (e: any) => {
    reset();
    onSubmit(e);
  };

  return (
    <div className={styles.noteRoot ?? ''}>
      <CardContent className={styles.noteTitle ?? ''}>
        <Avatar style={{ background: deepPurple[500] }} className={styles.avatar ?? ''}>
          <PersonIcon />
        </Avatar>
        <TextField
          disabled={disabled}
          className={clsx(styles.input, 'grow')}
          placeholder={m.dashboard_evXPj() ?? 'Leave your note here...'}
          onChange={onChange}
          value={message}
          name="message"
          multiline
          InputProps={{
            endAdornment: (
              <Button
                className={styles.button ?? ''}
                disabled={disabled}
                onClick={(e) => submit(e)}
              >
                {m.dashboard_addOrderNote() ?? 'Send'}
              </Button>
            ),
          }}
          variant="outlined"
        />
      </CardContent>
    </div>
  );
};

Timeline.displayName = 'Timeline';
export default Timeline;
