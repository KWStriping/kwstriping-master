import { useTranslation } from '@core/i18n';
import { renderCollection } from '@core/ui/utils';
import CardTitle from '@dashboard/components/core/CardTitle';
import FormattedDateTime from '@dashboard/components/core/Date';
import { graphql } from '@core/api/gql';
import type { ActivityFragment } from '@core/api/graphql';
import { Card, List, ListItem, ListItemText } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';
import { getActivityMessage } from './activityMessages';

export const ACTIVITY_FRAGMENT = graphql(`
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
  const { t } = useTranslation();
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
  const { t } = useTranslation();
  return (
    <Card data-test-id={testId}>
      <CardTitle
        title={t(
          'dashboard.XkF8Z',
          'Activity'
          // header
        )}
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
                primary={<Typography>{t('dashboard.WTUrM', 'No activities found')}</Typography>}
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
