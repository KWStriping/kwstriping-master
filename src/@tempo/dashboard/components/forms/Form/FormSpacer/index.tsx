import type { FC, ReactNode } from 'react';
import styles from './index.module.css';

interface FormSpacerProps {
  children?: ReactNode;
}

export const FormSpacer: FC<FormSpacerProps> = (props) => {
  const { children } = props;
  return <div className={styles.spacer ?? ''}>{children}</div>;
};

FormSpacer.displayName = 'FormSpacer';
export default FormSpacer;
