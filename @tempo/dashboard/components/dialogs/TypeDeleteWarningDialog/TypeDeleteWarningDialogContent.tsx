import * as m from '@paraglide/messages';
import ConfirmButton from '@tempo/ui/components/buttons/ConfirmButton';
import DeleteButton from '@tempo/ui/components/buttons/DeleteButton';
import CardContent from '@mui/material/CardContent';
import { useRouter } from 'next/navigation';
import type { FC } from 'react';
import { useState } from 'react';

import DeleteWarningDialogConsentContent from './DeleteWarningDialogConsentContent';
import styles from './index.module.css';
import CardSpacer from '@tempo/dashboard/components/core/CardSpacer';

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
  const router = useRouter();

  const [isConsentChecked, setIsConsentChecked] = useState(false);

  const handleViewAssignedItems = () => router.push(viewAssignedItemsUrl);

  const isDisbled = hasAssignedItems ? !isConsentChecked : false;

  const shouldShowViewAssignedItemsButton = showViewAssignedItemsButton && hasAssignedItems;

  return (
    <CardContent>
      <DeleteWarningDialogConsentContent
        description={m[description]({
          typeName: singleItemSelectedName,
          assignedItemsCount,
          b: (...chunks) => <b>{chunks}</b>,
        })}
        consentLabel={consentLabel && m[consentLabel]}
        isConsentChecked={isConsentChecked}
        onConsentChange={setIsConsentChecked}
      />
      <CardSpacer />
      <div className={styles.buttonsSection ?? ''}>
        {shouldShowViewAssignedItemsButton && (
          <>
            <ConfirmButton onClick={handleViewAssignedItems} transitionState="default">
              {m[viewAssignedItemsButtonLabel]}
            </ConfirmButton>
          </>
        )}
        <DeleteButton onClick={onDelete} disabled={isDisbled} testId="confirm-delete" />
      </div>
    </CardContent>
  );
};

export default TypeDeleteWarningDialogContent;
