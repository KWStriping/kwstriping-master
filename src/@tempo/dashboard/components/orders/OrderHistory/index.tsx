import * as m from '@paraglide/messages';
import type { OrderEventFragment } from '@tempo/api/generated/graphql';
import Divider from '@mui/material/Divider';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';
import ExtendedTimelineEvent from './ExtendedTimelineEvent';
import LinkedTimelineEvent from './LinkedTimelineEvent';
import { getEventMessage } from './messages';
import { useStyles } from './styles';
import { getEventSecondaryTitle, isTimelineEventOfType } from './utils';
import Form from '@tempo/dashboard/components/forms/Form';
import type { TimelineEventProps } from '@tempo/dashboard/components/core/Timeline';
import {
  Timeline,
  TimelineAddNote,
  TimelineEvent,
  TimelineNote,
} from '@tempo/dashboard/components/core/Timeline';

export interface FormData {
  message: string;
}

interface OrderHistoryProps {
  history: Maybe<OrderEventFragment[]>;
  orderCurrency: Maybe<string>;
  onNoteAdd: (data: FormData) => void;
}

const OrderHistory: FC<OrderHistoryProps> = ({ history, orderCurrency, onNoteAdd }) => {
  const styles = useStyles({});

  const getTimelineEventTitleProps = (event: OrderEventFragment): Partial<TimelineEventProps> => {
    const { type, message } = event;

    const title = isTimelineEventOfType('rawMessage', type) ? message : getEventMessage(event, t);

    if (isTimelineEventOfType('secondaryTitle', type)) {
      return {
        secondaryTitle: t(...getEventSecondaryTitle(event)),
        title,
      };
    }

    return { title };
  };

  return (
    <div className={styles.root ?? ''}>
      <Typography className={styles.header ?? ''} color="textSecondary">
        {m.dashboard_BfvKN() ?? 'Order History'}
      </Typography>
      <Divider />
      {history ? (
        <Timeline>
          <Form confirmLeave initial={{ message: '' }} onSubmit={onNoteAdd} resetOnSubmit>
            {({ change, data, reset, submit }) => (
              <TimelineAddNote
                message={data?.message}
                reset={reset}
                onChange={change}
                onSubmit={submit}
              />
            )}
          </Form>
          {history
            .slice()
            .reverse()
            .map((event) => {
              const { id, user, date, message, type } = event;

              if (isTimelineEventOfType('note', type)) {
                return <TimelineNote date={date} user={user} message={message} key={id} />;
              }
              if (isTimelineEventOfType('extendable', type)) {
                return <ExtendedTimelineEvent event={event} orderCurrency={orderCurrency} />;
              }

              if (isTimelineEventOfType('linked', type)) {
                return <LinkedTimelineEvent event={event} key={id} />;
              }

              return (
                <TimelineEvent {...getTimelineEventTitleProps(event)} key={id} date={date} />
              );
            })}
        </Timeline>
      ) : (
        <Skeleton />
      )}
    </div>
  );
};
OrderHistory.displayName = 'OrderHistory';
export default OrderHistory;
