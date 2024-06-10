import type { FC, ReactNode } from 'react';
import styles from './index.module.css';

interface CardSpacerProps {
  children?: ReactNode;
}

export const CardSpacer: FC<CardSpacerProps> = (props) => {
  const { children } = props;
  return <div className={styles.spacer ?? ''}>{children}</div>;
};
CardSpacer.displayName = 'CardSpacer';
export default CardSpacer;
