import { useTranslation } from '@core/i18n';
import useNotifier from '@core/ui/hooks/useNotifier';
import { useMutation } from '@core/urql/hooks/useMutation';
import Divider from '@mui/material/Divider';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';

import { GIFT_CARD_DETAILS_QUERY } from '../queries';
import GiftCardTimelineEvent from './GiftCardTimelineEvent';
import useGiftCardHistoryEvents from './hooks/useGiftCardHistoryEvents';
import { giftCardHistoryMessages as messages } from './messages';
import { GiftCardAddNoteDocument, GiftCardEventsEnum } from '@core/api/constants';
import Form from '@dashboard/components/forms/Form';
import Timeline, { TimelineAddNote, TimelineNote } from '@dashboard/components/core/Timeline';
//

interface FormData {
  message: string;
}

const GiftCardHistory: FC = () => {
  const { t } = useTranslation();
  const notify = useNotifier();
  const { id, events } = useGiftCardHistoryEvents();

  const [addTimelineNote, { loading }] = useMutation(GiftCardAddNoteDocument, {
    refetchQueries: [GIFT_CARD_DETAILS_QUERY],
    onCompleted: ({ addNoteToGiftCard }) => {
      const { errors } = addNoteToGiftCard;

      if (errors?.length) {
        notify(t('dashboard.noteAddError', messages.noteAddError.defaultMessage), {
          type: 'error',
        });
      } else {
        notify(
          t('dashboard.noteAddedSuccessfully', messages.noteAddedSuccessfully.defaultMessage),
          {
            type: 'success',
          }
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
        {t('dashboard.istoryHeaderTitle', messages.historyHeaderTitle.defaultMessage)}
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
