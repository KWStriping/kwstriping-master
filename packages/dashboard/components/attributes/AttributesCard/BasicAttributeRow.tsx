import { Tooltip } from '@core/ui/components/Tooltip';
import Grid from '@core/ui/components/Grid';
import HelpOutline from '@mui/icons-material/HelpOutline';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';
import type { FC, ReactNode } from 'react';

import styles from './index.module.css';

interface BasicAttributeRowProps {
  label: string | ReactNode;
  description?: string | ReactNode;
  flexValueContainer?: boolean;
  children: ReactNode;
}

const BasicAttributeRow: FC<BasicAttributeRowProps> = ({
  label,
  description,
  children,
  flexValueContainer,
}) => {
  return (
    <Grid className={styles.attributeSection ?? ''} variant="uniform">
      <div className={styles.attributeSectionLabel ?? ''} data-test-id="attribute-label">
        <Typography>
          {label}
          {description && (
            <Tooltip title={description}>
              <HelpOutline className={styles.tooltipIcon ?? ''} />
            </Tooltip>
          )}
        </Typography>
      </div>
      <div
        data-test-id="attribute-value"
        className={clsx(styles.value, flexValueContainer && styles.flex)}
      >
        {children}
      </div>
    </Grid>
  );
};

BasicAttributeRow.displayName = 'BasicAttributeRow';
export default BasicAttributeRow;
