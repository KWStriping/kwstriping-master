import PersonIcon from '@mui/icons-material/Person';
import { Avatar, Card } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import * as colors from '@mui/material/colors';
import Typography from '@mui/material/Typography';
import CRC from 'crc-32';
import type { FC } from 'react';
import { Fragment } from 'react';
import FormattedDateTime from '@tempo/dashboard/components/core/Date';

const palette = [
  colors.amber,
  colors.blue,
  colors.cyan,
  colors.deepOrange,
  colors.deepPurple,
  colors.green,
  colors.indigo,
  colors.lightBlue,
  colors.lightGreen,
  colors.lime,
  colors.orange,
  colors.pink,
  colors.purple,
  colors.red,
  colors.teal,
  colors.yellow,
].map((color) => color[500]);

interface TimelineNoteProps {
  date: string;
  message: string | null;
  user: {
    email: string;
    firstName?: string;
    lastName?: string;
  };
}

interface NoteMessageProps {
  message: string;
}

const NoteMessage: FC<NoteMessageProps> = ({ message }) => (
  <>
    {message.split('\n').map((string, index) => {
      return (
        <Fragment key={index}>
          {string === '' ? <br /> : <Typography>{string}</Typography>}
        </Fragment>
      );
    })}
  </>
);

export const TimelineNote: FC<TimelineNoteProps> = (props) => {
  const { date, user, message } = props;
  const getUserTitleOrEmail = () => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName} ${user.lastName}`;
    }

    return user?.email;
  };

  return (
    <div className={'relative'}>
      {user && (
        <Avatar
          className={'absolute top-0 -left-[40px]'}
          style={{ background: palette[CRC.str(user.email) % palette.length] }}
        >
          <PersonIcon />
        </Avatar>
      )}
      <div className={'flex items-center justify-between mb-1'}>
        <Typography>{getUserTitleOrEmail()}</Typography>
        <Typography>
          <FormattedDateTime date={date} />
        </Typography>
      </div>
      <Card className={'relative mb-3 shadow-none'} elevation={16}>
        <CardContent className={'rounded'}>
          <NoteMessage message={message ?? ''} />
        </CardContent>
      </Card>
    </div>
  );
};
TimelineNote.displayName = 'TimelineNote';
export default TimelineNote;
