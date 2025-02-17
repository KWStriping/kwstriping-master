import * as m from '@paraglide/messages';
import { renderCollection } from '@tempo/ui/utils';
import { gql } from '@tempo/api';
import type { ActivityFragment } from '@tempo/api/generated/graphql';
import { Card, List, ListItem, ListItemText } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';
import { getActivityMessage } from './activityMessages';
import FormattedDateTime from '@tempo/dashboard/components/core/Date';
import CardTitle from '@tempo/dashboard/components/core/CardTitle';

export const ACTIVITY_FRAGMENT = gql(`
  fragment Activity on OrderEvent {
    date
    type
    relatedOrder {
      id
      number
    }
    user {
      id
      email
      firstName
      lastName
    }
    message
  }
`);

const ActivityListItem: FC<{ activity: ActivityFragment }> = ({ activity }) => {
  return (
    <ListItemText
      primary={<Typography>{getActivityMessage(activity, t)}</Typography>}
      secondary={activity.date ? <FormattedDateTime date={activity.date} /> : null}
    />
  );
};

interface HomeActivityCardProps {
  activities: ActivityFragment[];
  testId?: string;
}

const HomeActivityCard: FC<HomeActivityCardProps> = ({ activities, testId }) => {
  return (
    <Card data-test-id={testId}>
      <CardTitle
        title={
          m.dashboard_XkF_Z() ?? 'Activity'
          // header
        }
      />
      <List dense={true}>
        {renderCollection(
          activities,
          (activity, activityId) => (
            <ListItem key={activityId}>
              {activity ? (
                <ActivityListItem activity={activity} />
              ) : (
                <ListItemText className={'py-[10px]'}>
                  <Typography>
                    <Skeleton />
                  </Typography>
                </ListItemText>
              )}
            </ListItem>
          ),
          () => (
            <ListItem className={'py-[16px]'}>
              <ListItemText
                primary={<Typography>{m.dashboard_WTUrM() ?? 'No activities found'}</Typography>}
              />
            </ListItem>
          )
        )}
      </List>
    </Card>
  );
};
HomeActivityCard.displayName = 'HomeActivityCard';
export default HomeActivityCard;
