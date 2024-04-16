import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { default as MuiAccordion } from '@mui/material/Accordion';
import { default as MuiAAccordionDetails } from '@mui/material/AccordionDetails';
import type { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import { default as MuiAccordionSummary } from '@mui/material/AccordionSummary';
import type { FC } from 'react';
import { forwardRef } from 'react';

// import useStyles from './styles';

export const AccordionSummary: FC<AccordionSummaryProps> = forwardRef((props, ref) => {
  // const styles = useStyles();
  const styles = {};

  return (
    <MuiAccordionSummary
      ref={ref}
      expandIcon={<ExpandMoreIcon data-test-id="expand-icon" />}
      classes={styles}
      {...props}
    />
  );
});
AccordionSummary.displayName = 'AccordionSummary';

export const Accordion = MuiAccordion;
export const AccordionDetails = MuiAAccordionDetails;
