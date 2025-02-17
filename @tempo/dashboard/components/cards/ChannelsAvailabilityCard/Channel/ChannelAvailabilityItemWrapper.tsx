import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { FC, ReactNode } from 'react';
import type { Messages } from '../types';
import Label from '@tempo/dashboard/components/orders/OrderHistory/Label';
import type { ChannelData } from '@tempo/dashboard/oldSrc/channels/utils';

// const useExpanderStyles = makeStyles(
//   (theme) => ({
//     expanded: {},
//     root: {
//       boxShadow: "none",
//       margin: 0,
//       padding: 0,
//       paddingBottom: theme.spacing(2),

//       "&:before": {
//         content: "none",
//       },

//       "&$expanded": {
//         margin: 0,
//         border: "none",
//       },
//     },
//   }),
//   { name: "ChannelContentWrapperExpander" }
// );

// const useSummaryStyles = makeStyles(
//   (theme) => ({
//     expanded: {},
//     root: {
//       width: "100%",
//       border: "none",
//       margin: 0,
//       padding: 0,
//       minHeight: 0,
//       paddingTop: theme.spacing(2),

//       "&$expanded": {
//         minHeight: 0,
//         padding: theme.spacing(2, 0),
//       },
//     },
//   }),
//   { name: "ChannelContentWrapperExpanderSummary" }
// );

export interface ChannelContentWrapperProps {
  data: ChannelData;
  children: ReactNode;
  messages: Messages;
}

const ChannelContentWrapper: FC<ChannelContentWrapperProps> = ({ data, messages, children }) => {
  // const expanderClasses = useExpanderStyles();
  // const summaryClasses = useSummaryStyles();

  const { name } = data;

  return (
    <Accordion data-test-id="channel-availability-item">
      <AccordionSummary>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography>{name}</Typography>
          <Label text={messages.availableDateText ?? ''} />
        </Box>
      </AccordionSummary>
      {children}
    </Accordion>
  );
};

export default ChannelContentWrapper;
