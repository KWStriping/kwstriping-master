import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';
import type { FC, ReactNode } from 'react';
import { useState } from 'react';

import styles from './index.module.css';

export interface AccordionProps {
  className?: string;
  initialExpand?: boolean;
  quickPeek?: ReactNode;
  title: string;
  children?: ReactNode;
}

const Accordion: FC<AccordionProps> = ({
  children,
  className,
  initialExpand,
  quickPeek,
  title,
  ...props
}) => {
  const [expanded, setExpanded] = useState(!!initialExpand);

  return (
    <div className={clsx(styles.root, className)} {...props}>
      <div className={styles.title ?? ''}>
        <Typography className={styles.titleText ?? ''}>{title}</Typography>
        <div className={styles.expandButton ?? ''}>
          <IconButton color="secondary" onClick={() => setExpanded(!expanded)}>
            {expanded ? <RemoveIcon /> : <AddIcon />}
          </IconButton>
        </div>
      </div>
      {(expanded || !!quickPeek) && (
        <>
          <Divider />
          <div className={styles.content ?? ''}>
            {quickPeek ? (expanded ? children : quickPeek) : children}
          </div>
        </>
      )}
    </div>
  );
};

Accordion.displayName = 'Accordion';
export default Accordion;
