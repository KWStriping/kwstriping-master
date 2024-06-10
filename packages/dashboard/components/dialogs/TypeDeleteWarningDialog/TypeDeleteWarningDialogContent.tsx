import { useTranslation } from '@core/i18n';
import ConfirmButton from '@core/ui/components/buttons/ConfirmButton';
import DeleteButton from '@core/ui/components/buttons/DeleteButton';
import CardSpacer from '@dashboard/components/core/CardSpacer';
import CardContent from '@mui/material/CardContent';
import { useRouter } from 'next/router';
import type { FC } from 'react';
import { useState } from 'react';

import DeleteWarningDialogConsentContent from './DeleteWarningDialogConsentContent';
import styles from './index.module.css';

interface TypeDeleteWarningDialogContentProps {
  singleItemSelectedName?: string;
  viewAssignedItemsButtonLabel: MessageDescriptor;
  description: MessageDescriptor;
  consentLabel: MessageDescriptor;
  viewAssignedItemsUrl: string;
  hasAssignedItems: boolean;
  assignedItemsCount: number | undefined;
  onDelete: () => void;
  // temporary, until we add filters to pages list - SALEOR-3279
  showViewAssignedItemsButton?: boolean;
}

const TypeDeleteWarningDialogContent: FC<TypeDeleteWarningDialogContentProps> = ({
  description,
  consentLabel,
  viewAssignedItemsUrl,
  viewAssignedItemsButtonLabel,
  singleItemSelectedName,
  hasAssignedItems,
  assignedItemsCount,
  onDelete,
  showViewAssignedItemsButton,
}) => {
  const { t } = useTranslation();
  const router = useRouter();

  const [isConsentChecked, setIsConsentChecked] = useState(false);

  const handleViewAssignedItems = () => router.push(viewAssignedItemsUrl);

  const isDisbled = hasAssignedItems ? !isConsentChecked : false;

  const shouldShowViewAssignedItemsButton = showViewAssignedItemsButton && hasAssignedItems;

  return (
    <CardContent>
      <DeleteWarningDialogConsentContent
        description={t(description, {
          typeName: singleItemSelectedName,
          assignedItemsCount,
          b: (...chunks) => <b>{chunks}</b>,
        })}
        consentLabel={consentLabel && t(consentLabel)}
        isConsentChecked={isConsentChecked}
        onConsentChange={setIsConsentChecked}
      />
      <CardSpacer />
      <div className={styles.buttonsSection ?? ''}>
        {shouldShowViewAssignedItemsButton && (
          <>
            <ConfirmButton onClick={handleViewAssignedItems} transitionState="default">
              {t(viewAssignedItemsButtonLabel)}
            </ConfirmButton>
          </>
        )}
        <DeleteButton onClick={onDelete} disabled={isDisbled} testId="confirm-delete" />
      </div>
    </CardContent>
  );
};

export default TypeDeleteWarningDialogContent;
