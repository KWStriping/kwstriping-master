import Typography from '@mui/material/Typography';
import type { FC, ReactNode, ChangeEvent } from 'react';

import ControlledCheckbox from '../../forms/ControlledCheckbox';
import styles from './index.module.css';
import CardSpacer from '@tempo/dashboard/components/core/CardSpacer';

interface DeleteWarningDialogConsentContentProps {
  description: string | ReactNode[] | readonly ReactNode[];
  consentLabel: string;
  isConsentChecked: boolean;
  onConsentChange: (value: boolean) => void;
}

const DeleteWarningDialogConsentContent: FC<DeleteWarningDialogConsentContentProps> = ({
  description,
  consentLabel,
  isConsentChecked,
  onConsentChange,
}) => {
  const handleConsentChange = ({ target }: ChangeEvent<unknown>) => onConsentChange(target.value);

  return (
    <>
      <Typography>{description}</Typography>
      <CardSpacer />
      {consentLabel && (
        <ControlledCheckbox
          name="delete-assigned-items-consent"
          checked={isConsentChecked}
          onChange={handleConsentChange}
          label={<Typography className={styles.consentLabel ?? ''}>{consentLabel}</Typography>}
        />
      )}
    </>
  );
};

export default DeleteWarningDialogConsentContent;
