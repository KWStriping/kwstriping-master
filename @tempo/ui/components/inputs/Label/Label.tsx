import clsx from 'clsx';
import type { FC, LabelHTMLAttributes } from 'react';

import styles from './Label.module.css';

export type LabelProps = LabelHTMLAttributes<HTMLLabelElement>;

export const Label: FC<LabelProps> = ({ className, ...rest }) => (
  <label className={clsx(styles.label, className)} {...rest} />
);
