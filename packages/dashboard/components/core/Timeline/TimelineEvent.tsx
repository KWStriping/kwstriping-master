import { Accordion, AccordionDetails, AccordionSummary } from '@core/ui/components/Accordion';
import Typography from '@mui/material/Typography';
import type { FC, ReactNode } from 'react';
import styles from './TimelineEvent.module.css';

import type { TitleElement } from './TimelineEventHeader';
import TimelineEventHeader from './TimelineEventHeader';

export interface TimelineEventProps {
  children?: ReactNode;
  date: Maybe<string>;
  secondaryTitle?: string;
  title?: ReactNode;
  titleElements?: TitleElement[];
}

export const TimelineEvent: FC<TimelineEventProps> = (props) => {
  const { children, date, secondaryTitle, title, titleElements } = props;
  return (
    <div className={styles.root ?? ''}>
      <span className={styles.dot ?? ''} />
      {children ? (
        <Accordion className={styles.panel ?? ''} elevation={0}>
          <AccordionSummary className={styles.panelExpander ?? ''}>
            <TimelineEventHeader title={title} date={date} titleElements={titleElements} />
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{children}</Typography>
          </AccordionDetails>
        </Accordion>
      ) : (
        <TimelineEventHeader
          title={title}
          titleElements={titleElements}
          secondaryTitle={secondaryTitle}
          date={date}
        />
      )}
    </div>
  );
};
TimelineEvent.displayName = 'TimelineEvent';
export default TimelineEvent;
