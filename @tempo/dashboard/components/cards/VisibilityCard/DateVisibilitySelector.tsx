import closeIcon from '@dashboard/assets/images/close-thin.svg';
import Typography from '@mui/material/Typography';
import type { ReactNode } from 'react';
import { useState } from 'react';

import styles from './index.module.css';
import FormSpacer from '@tempo/dashboard/components/forms/Form/FormSpacer';

const CLOSE_ICON_SIZE = 14;

interface Props {
  buttonText: string;
  children: ReactNode;
  onInputClose: () => void;
}

const DateVisibilitySelector = ({ buttonText, children, onInputClose }: Props) => {
  const [showInput, setShowInput] = useState<boolean>(false);

  const handleCloseIconClick = () => {
    setShowInput(false);
    onInputClose();
  };

  if (!showInput) {
    return (
      <Typography className={styles.buttonText ?? ''} onClick={() => setShowInput(true)}>
        {buttonText}
      </Typography>
    );
  }

  return (
    <>
      <div className={styles.container ?? ''}>
        {children}
        <div className={styles.icon ?? ''} onClick={handleCloseIconClick}>
          <img
            src={closeIcon}
            alt="close icon"
            width={CLOSE_ICON_SIZE}
            height={CLOSE_ICON_SIZE}
          />
        </div>
      </div>
      <FormSpacer />
    </>
  );
};

export default DateVisibilitySelector;
