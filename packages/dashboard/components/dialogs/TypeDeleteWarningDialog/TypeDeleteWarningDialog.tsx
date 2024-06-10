import { useTranslation } from '@core/i18n';
import type { ConfirmButtonTransitionState } from '@core/ui/components/buttons/ConfirmButton';
import { getById } from '@core/utils';
import ModalTitle from '@dashboard/components/orders/OrderDiscountCommonModal/ModalTitle';
import { Card, CardContent, CircularProgress, Modal } from '@mui/material';
import styles from './index.module.css';

/// / import { useTypeDeleteWarningDialogStyles as useStyles } from "./styles";
import ProductKlassDeleteWarningDialogContent from './TypeDeleteWarningDialogContent';
import type { CommonTypeDeleteWarningMessages, TypeDeleteWarningMessages } from './types';

export interface TypeBaseData {
  id: string;
  name: string;
}

export interface TypeDeleteMessages {
  baseMessages: CommonTypeDeleteWarningMessages;
  singleWithItemsMessages: TypeDeleteWarningMessages;
  singleWithoutItemsMessages: TypeDeleteWarningMessages;
  multipleWithItemsMessages: TypeDeleteWarningMessages;
  multipleWithoutItemsMessages: TypeDeleteWarningMessages;
}

export interface TypeDeleteWarningDialogProps<T extends TypeBaseData> extends TypeDeleteMessages {
  isOpen: boolean;
  deleteButtonState: ConfirmButtonTransitionState;
  onClose: () => void;
  onDelete: () => void;
  viewAssignedItemsUrl: string;
  typesToDelete: string[];
  assignedItemsCount: number | undefined;
  isLoading?: boolean;
  typesData: T[];
  // temporary, until we add filters to pages list - SALEOR-3279
  showViewAssignedItemsButton?: boolean;
}

function TypeDeleteWarningDialog<T extends TypeBaseData>({
  isLoading = false,
  isOpen,
  baseMessages,
  singleWithItemsMessages,
  singleWithoutItemsMessages,
  multipleWithItemsMessages,
  multipleWithoutItemsMessages,
  onClose,
  onDelete,
  assignedItemsCount,
  viewAssignedItemsUrl,
  typesToDelete,
  typesData,
  showViewAssignedItemsButton = true,
}: TypeDeleteWarningDialogProps<T>) {
  const { t } = useTranslation();

  const showMultiple = typesToDelete.length > 1;

  const hasAssignedItems = !!assignedItemsCount;

  const selectMessages = () => {
    if (showMultiple) {
      const multipleMessages = hasAssignedItems
        ? multipleWithItemsMessages
        : multipleWithoutItemsMessages;

      return {
        ...multipleMessages,
      };
    }

    const singleMessages = hasAssignedItems
      ? singleWithItemsMessages
      : singleWithoutItemsMessages;

    return {
      ...singleMessages,
    };
  };

  const { description, consentLabel } = selectMessages();

  const singleItemSelectedId = typesToDelete[0];

  const singleItemSelectedName = typesData.find(getById(singleItemSelectedId))?.name;

  return (
    <Modal open={isOpen}>
      <div className={styles.centerContainer ?? ''} data-test-id="warning-dialog">
        <Card className={styles.content ?? ''}>
          <ModalTitle
            title={t('dashboard.title', baseMessages.title.defaultMessage, {
              selectedTypesCount: typesToDelete.length,
            })}
            withBorder
            onClose={onClose}
          />
          {isLoading ? (
            <CardContent className={styles.centerContainer ?? ''}>
              <CircularProgress size={16} />
            </CardContent>
          ) : (
            <ProductKlassDeleteWarningDialogContent
              showViewAssignedItemsButton={showViewAssignedItemsButton}
              assignedItemsCount={assignedItemsCount}
              hasAssignedItems={hasAssignedItems}
              singleItemSelectedName={singleItemSelectedName}
              viewAssignedItemsUrl={viewAssignedItemsUrl}
              onDelete={onDelete}
              description={description}
              consentLabel={consentLabel}
              viewAssignedItemsButtonLabel={baseMessages.viewAssignedItemsButtonLabel}
            />
          )}
        </Card>
      </div>
    </Modal>
  );
}

export default TypeDeleteWarningDialog;
