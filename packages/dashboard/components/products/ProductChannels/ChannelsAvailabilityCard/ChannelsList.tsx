import { Accordion, AccordionSummary } from '@core/ui/components/Accordion';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import type { FC, ReactNode } from 'react';

// import { useAccordionStyles, useExpanderStyles, useSummaryStyles } from "./styles";

interface ChannelsListProps {
  summary: string;
  children: ReactNode;
}

export const ChannelsList: FC<ChannelsListProps> = ({ summary, children }) => {
  // const styles = useAccordionStyles();
  const expanderClasses = useExpanderStyles({});
  const summaryClasses = useSummaryStyles({});

  const styles = {};
  return (
    <Accordion classes={expanderClasses}>
      <CardContent className={styles.summaryContent ?? ''}>
        <AccordionSummary
          className={summaryClasses.root}
          data-test-id="channels-variant-availability-summary"
        >
          <Typography variant="caption">{summary}</Typography>
        </AccordionSummary>
      </CardContent>
      {children}
    </Accordion>
  );
};
