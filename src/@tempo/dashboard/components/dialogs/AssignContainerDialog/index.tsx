import BackButton from '@tempo/ui/components/buttons/BackButton';
import type { ConfirmButtonTransitionState } from '@tempo/ui/components/buttons/ConfirmButton';
import ConfirmButton from '@tempo/ui/components/buttons/ConfirmButton';
import {
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TableBody,
  TableCell,
  TextField,
} from '@mui/material';
import TableRow from '@mui/material/TableRow';
import { useState } from 'react';
import type { FC } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Checkbox from '@tempo/dashboard/components/core/Checkbox';
import ResponsiveTable from '@tempo/dashboard/components/tables/ResponsiveTable';
import useSearchQuery from '@tempo/dashboard/hooks/useSearchQuery';
import useScrollableDialogStyle from '@tempo/dashboard/oldSrc/styles/useScrollableDialogStyle';
import type { DialogProps, FetchMoreProps, Node } from '@tempo/dashboard/oldSrc/types';

export interface AssignContainerDialogFormData {
  containers: string[];
  query: string;
}

type Labels = Record<'confirmBtn' | 'title' | 'label' | 'placeholder', string>;
interface Container extends Node {
  name: string;
}
export interface AssignContainerDialogProps extends FetchMoreProps, DialogProps {
  confirmButtonState: ConfirmButtonTransitionState;
  containers: Container[];
  loading: boolean;
  labels: Labels;
  onFetch: (value: string) => void;
  onSubmit: (data: string[]) => void;
}

function handleContainerAssign(
  containerId: string,
  isSelected: boolean,
  selectedContainers: string[],
  setSelectedContainers: (data: string[]) => void
) {
  if (isSelected) {
    setSelectedContainers(
      selectedContainers.filter((selectedContainer) => selectedContainer !== containerId)
    );
  } else {
    setSelectedContainers([...selectedContainers, containerId]);
  }
}

const scrollableTargetId = 'assignContainerScrollableDialog';

const AssignContainerDialog: FC<AssignContainerDialogProps> = (props) => {
  const {
    confirmButtonState,
    containers,
    hasMore,
    loading,
    open,
    labels,
    onClose,
    onFetch,
    onFetchMore,
    onSubmit,
  } = props;
  const styles = useStyles(props);
  const scrollableDialogClasses = useScrollableDialogStyle({});

  const [query, onQueryChange] = useSearchQuery(onFetch);
  const [selectedContainers, setSelectedContainers] = useState<string[]>([]);

  const handleSubmit = () => onSubmit(selectedContainers);

  return (
    <Dialog
      onClose={onClose}
      open={open}
      classes={{ paper: scrollableDialogClasses.dialog }}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>{labels.title}</DialogTitle>
      <DialogContent>
        <TextField
          name="query"
          value={query}
          onChange={onQueryChange}
          label={labels.label}
          placeholder={labels.placeholder}
          fullWidth
          InputProps={{
            autoComplete: 'off',
            endAdornment: loading && <CircularProgress size={16} />,
          }}
        />
      </DialogContent>
      <DialogContent className={scrollableDialogClasses.scrollArea} id={scrollableTargetId}>
        <InfiniteScroll
          dataLength={containers?.length}
          next={onFetchMore}
          hasMore={hasMore}
          scrollThreshold="100px"
          loader={
            <div className={scrollableDialogClasses.loadMoreLoaderContainer}>
              <CircularProgress size={16} />
            </div>
          }
          scrollableTarget={scrollableTargetId}
        >
          <ResponsiveTable>
            <TableBody>
              {containers?.map((container) => {
                const isSelected = !!selectedContainers.find(
                  (selectedContainer) => selectedContainer === container.id
                );

                return (
                  <TableRow key={container.id}>
                    <TableCell padding="checkbox" className={styles.checkboxCell ?? ''}>
                      <Checkbox
                        checked={isSelected}
                        onChange={() =>
                          handleContainerAssign(
                            container.id,
                            isSelected,
                            selectedContainers,
                            setSelectedContainers
                          )
                        }
                      />
                    </TableCell>
                    <TableCell className={styles.wideCell ?? ''}>{container.name}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </ResponsiveTable>
        </InfiniteScroll>
      </DialogContent>
      <DialogActions>
        <BackButton onClick={onClose} />
        <ConfirmButton transitionState={confirmButtonState} type="submit" onClick={handleSubmit}>
          {labels.confirmBtn}
        </ConfirmButton>
      </DialogActions>
    </Dialog>
  );
};
AssignContainerDialog.displayName = 'AssignContainerDialog';
export default AssignContainerDialog;
