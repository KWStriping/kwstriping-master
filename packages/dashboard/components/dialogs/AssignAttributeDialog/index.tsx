import { useTranslation } from '@core/i18n';
import BackButton from '@core/ui/components/buttons/BackButton';
import ConfirmButton from '@core/ui/components/buttons/ConfirmButton';
import type { ConfirmButtonTransitionState } from '@core/ui/components/buttons/ConfirmButton';
import Checkbox from '@dashboard/components/core/Checkbox';
import ResponsiveTable from '@dashboard/components/tables/ResponsiveTable';
import type { AvailableAttributeFragment } from '@core/api/graphql';
import useElementScroll, { isScrolledToBottom } from '@dashboard/hooks/useElementScroll';
import useModalDialogErrors from '@dashboard/hooks/useModalDialogErrors';
import useModalDialogOpen from '@dashboard/hooks/useModalDialogOpen';
import useSearchQuery from '@dashboard/hooks/useSearchQuery';
import { renderCollection } from '@core/ui/utils';
import type { FetchMoreProps } from '@dashboard/oldSrc/types';
import {
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TableBody,
  TableCell,
  TextField,
} from '@mui/material';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';
import { useRef } from 'react';
import type { FC } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { assert } from 'tsafe/assert';
import styles from './index.module.css';

export interface AssignAttributeDialogProps extends FetchMoreProps {
  confirmButtonState: ConfirmButtonTransitionState;
  errors: string[];
  open: boolean;
  attributes: Maybe<AvailableAttributeFragment[]>;
  selected: string[];
  onClose: () => void;
  onFetch: (query: string) => void;
  onOpen: () => void;
  onSubmit: () => void;
  onToggle: (id: string) => void;
}

const scrollableTargetId = 'assignAttributeScrollableDialog';

const AssignAttributeDialog: FC<AssignAttributeDialogProps> = ({
  attributes,
  confirmButtonState,
  errors: apiErrors,
  hasMore,
  loading,
  open,
  selected = [],
  onClose,
  onFetch,
  onFetchMore,
  onOpen,
  onSubmit,
  onToggle,
}: AssignAttributeDialogProps) => {
  const { t } = useTranslation();
  const [query, onQueryChange, resetQuery] = useSearchQuery(onFetch);
  const errors = useModalDialogErrors(apiErrors, open);
  const anchor = useRef(null);
  const position = useElementScroll(anchor);

  useModalDialogOpen(open, {
    onClose: resetQuery,
    onOpen,
  });

  return (
    <Dialog
      onClose={onClose}
      open={open}
      fullWidth
      maxWidth="sm"
      classes={{
        paper: styles.dialogPaper ?? '',
      }}
    >
      <DialogTitle>{t('dashboard.title', 'Assign Attribute')}</DialogTitle>
      <div className={'mb-3 px-3 overflow-y-hidden'}>
        <TextField
          name="query"
          value={query}
          onChange={onQueryChange}
          label={t('dashboard.searchInputLabel', 'Search attributes')}
          placeholder={t('dashboard.searchInputPlaceholder', 'Search by attribute name')}
          fullWidth
          className="mt-3"
          InputProps={{
            className: 'my-1',
            autoComplete: 'off',
            endAdornment: loading && <CircularProgress size={16} />,
          }}
        />
      </div>
      <DialogContent className={styles.scrollArea ?? ''} ref={anchor} id={scrollableTargetId}>
        <InfiniteScroll
          dataLength={attributes?.length || 0}
          next={onFetchMore}
          hasMore={hasMore}
          scrollThreshold="100px"
          loader={
            <div className={styles.loadMoreLoaderContainer ?? ''}>
              <CircularProgress size={16} />
            </div>
          }
          scrollableTarget={scrollableTargetId}
        >
          <ResponsiveTable key="table">
            <TableBody>
              {renderCollection(
                attributes,
                (attribute) => {
                  if (!attribute) return null;
                  assert(selected);
                  const isChecked = !!selected.find((_id) => _id === attribute.id);
                  return (
                    <TableRow key={attribute.id}>
                      <TableCell padding="checkbox" className={styles.checkboxCell ?? ''}>
                        <Checkbox checked={isChecked} onChange={() => onToggle(attribute.id)} />
                      </TableCell>
                      <TableCell className={styles.wideCell ?? ''}>
                        {attribute.name}
                        <Typography variant="caption">{attribute.slug}</Typography>
                      </TableCell>
                    </TableRow>
                  );
                },
                () =>
                  !loading && (
                    <TableRow>
                      <TableCell colSpan={2}>
                        {t('dashboard.noMembersFound', 'No results found')}
                      </TableCell>
                    </TableRow>
                  )
              )}
            </TableBody>
          </ResponsiveTable>
        </InfiniteScroll>
      </DialogContent>
      {!!errors?.length && (
        <DialogContent>
          {errors.map((error, errorIndex) => (
            <DialogContentText color="error" key={errorIndex}>
              {error}
            </DialogContentText>
          ))}
        </DialogContent>
      )}
      <DialogActions
        className={clsx(
          styles.actions ?? '',
          !isScrolledToBottom(anchor, position) && styles.dropShadow
        )}
      >
        <BackButton onClick={onClose} />
        <ConfirmButton transitionState={confirmButtonState} type="submit" onClick={onSubmit}>
          {t('dashboard.assignButton', 'Assign and save')}
        </ConfirmButton>
      </DialogActions>
    </Dialog>
  );
};
AssignAttributeDialog.displayName = 'AssignAttributeDialog';
export default AssignAttributeDialog;
