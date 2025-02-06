import type { GiftCardAddNoteMutation, GiftCardAddNoteMutationVariables } from '@tempo/api/generated/graphql';
import * as m from '@paraglide/messages';
import useNotifier from '@tempo/ui/hooks/useNotifier';
import { useMutation } from '@tempo/api/hooks/useMutation';
import Divider from '@mui/material/Divider';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';

import { GIFT_CARD_DETAILS_QUERY } from '../queries';
import GiftCardTimelineEvent from './GiftCardTimelineEvent';
import useGiftCardHistoryEvents from './hooks/useGiftCardHistoryEvents';
import { giftCardHistoryMessages as messages } from './messages';
import { GiftCardAddNoteDocument, GiftCardEventsEnum } from '@tempo/api/generated/constants';
import Form from '@tempo/dashboard/components/forms/Form';
import Timeline, { TimelineAddNote, TimelineNote } from '@tempo/dashboard/components/core/Timeline';

interface FormData {
  message: string;
}

const GiftCardHistory: FC = () => {
  const notify = useNotifier();
  const { id, events } = useGiftCardHistoryEvents();

  const [addTimelineNote, { loading }] = useMutation(GiftCardAddNoteDocument, {
    refetchQueries: [GIFT_CARD_DETAILS_QUERY],
    onCompleted: ({ addNoteToGiftCard }) => {
      const { errors } = addNoteToGiftCard;

      if (errors?.length) {
        notify(
          m.dashboard_noteAddError({
            type: 'error',
          }) ?? messages.noteAddError.defaultMessage
        );
      } else {
        notify(
          m.dashboard_noteAddedSuccessfully({
            type: 'success',
          }) ?? messages.noteAddedSuccessfully.defaultMessage
        );
      }
    },
  });

  const onNoteAdd = (data: FormData) => {
    const { message } = data;
    addTimelineNote({ variables: { id, input: { message } } });
  };

  return (
    <div className={styles.root ?? ''}>
      <Typography className={styles.header ?? ''} color="textSecondary">
        {m.dashboard_istoryHeaderTitle() ?? messages.historyHeaderTitle.defaultMessage}
      </Typography>
      <Divider />
      <Timeline>
        {events ? (
          <>
            <Form initial={{ message: '' }} onSubmit={onNoteAdd} resetOnSubmit>
              {({ change, data, reset, submit }) => (
                <TimelineAddNote
                  message={data?.message}
                  reset={reset}
                  onChange={change}
                  onSubmit={submit}
                  disabled={loading}
                />
              )}
            </Form>
            {events
              .slice()
              .reverse()
              .map((event) => {
                const { id, message, type, date, user } = event;

                if (type === GiftCardEventsEnum.NoteAdded) {
                  return <TimelineNote date={date} user={user} message={message} key={id} />;
                }

                return <GiftCardTimelineEvent key={id} date={date} event={event} />;
              })}
          </>
        ) : (
          <Skeleton />
        )}
      </Timeline>
    </div>
  );
};

export default GiftCardHistory;
