import { Trans, useTranslation } from '@core/i18n';
import { FulfillmentStatus } from '@core/api/constants';
import type { OrderDetailsFragment } from '@core/api/graphql';
import { getStringOrPlaceholder } from '@dashboard/oldSrc/misc';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';
import type { FC } from 'react';

import { extraInfoMessages } from './messages';
//

const NUMBER_OF_COLUMNS = 5;

interface ExtraInfoLinesProps {
  fulfillment?: OrderDetailsFragment['fulfillments'][0];
}

const ExtraInfoLines: FC<ExtraInfoLinesProps> = ({ fulfillment }) => {
  const { t } = useTranslation();

  if (!fulfillment || !fulfillment?.warehouse || !fulfillment?.trackingNumber) {
    return null;
  }

  const { warehouse, trackingNumber, status } = fulfillment;

  return (
    <TableRow>
      <TableCell className={styles.infoRow ?? ''} colSpan={NUMBER_OF_COLUMNS}>
        <Typography color="textSecondary" variant="body2">
          {warehouse && (
            <>
              {t(
                status === FulfillmentStatus.Returned
                  ? extraInfoMessages.restocked
                  : extraInfoMessages.fulfilled
              )}
              <Typography
                className={clsx(styles.infoLabel, !!trackingNumber && styles.infoLabelWithMargin)}
                color="textPrimary"
                variant="body2"
              >
                {getStringOrPlaceholder(warehouse?.name)}
              </Typography>
            </>
          )}
        </Typography>
        <Typography color="textSecondary" variant="body2">
          {trackingNumber && (
            <Trans
              {...extraInfoMessages.tracking}
              values={{
                trackingNumber: (
                  <Typography
                    className={styles.infoLabel ?? ''}
                    color="textPrimary"
                    variant="body2"
                  >
                    {trackingNumber}
                  </Typography>
                ),
              }}
            />
          )}
        </Typography>
      </TableCell>
    </TableRow>
  );
};

export default ExtraInfoLines;
