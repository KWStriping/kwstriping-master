import * as m from '@paraglide/messages';
import BackButton from '@tempo/ui/components/buttons/BackButton';
import ConfirmButton from '@tempo/ui/components/buttons/ConfirmButton';
import type { ConfirmButtonTransitionState } from '@tempo/ui/components/buttons/ConfirmButton';
import { makeStyles } from '@tempo/ui/theme/styles';
import type { SearchStaffMembersQuery } from '@tempo/api/generated/graphql';
import { getUserInitials, getUserName } from '@tempo/utils/user';
import { renderCollection } from '@tempo/ui/utils';
import {
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TableBody,
  TableCell,
  TextField,
} from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';
import type { FC } from 'react';
import { useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import type {
  DialogProps,
  FetchMoreProps,
  RelayToFlat,
  SearchPageProps,
} from '@tempo/dashboard/oldSrc/types';
import useSearchQuery from '@tempo/dashboard/hooks/useSearchQuery';
import useElementScroll, { isScrolledToBottom } from '@tempo/dashboard/hooks/useElementScroll';
import ResponsiveTable from '@tempo/dashboard/components/tables/ResponsiveTable';
import CardSpacer from '@tempo/dashboard/components/core/CardSpacer';

const useStyles = makeStyles(
  (theme) => ({
    avatar: {
      alignItems: 'center',
      borderRadius: '100%',
      display: 'grid',
      float: 'left',
      height: 32,
      justifyContent: 'center',
      overflow: 'hidden',
      width: 32,
    },
    avatarCell: {
      padding: 0,
      width: 32,
    },
    avatarDefault: {
      '& div': {
        color: '#fff',
        lineHeight: 2.8,
        fontSize: '0.75rem',
      },
      background: theme.vars.palette.primary.main,
      height: 32,
      textAlign: 'center',
      width: 32,
    },
    avatarImage: {
      pointerEvents: 'none',
      width: '100%',
    },
    checkboxCell: {
      '&&:not(first-child)': {
        paddingLeft: 0,
        paddingRight: 0,
        width: 48,
      },
    },
    colActions: {
      textAlign: 'right',
    },
    colName: {
      paddingLeft: theme.spacing(1),
    },
    dialogPaper: {
      overflow: 'hidden',
    },
    dropShadow: {
      boxShadow: `0px -5px 10px 0px ${theme.vars.palette.divider}`,
    },
    inputContainer: {
      overflowY: 'visible',
    },
    loadMoreLoaderContainer: {
      alignItems: 'center',
      display: 'flex',
      gridColumnEnd: 'span 3',
      height: theme.spacing(4),
      justifyContent: 'center',
    },
    overflow: {
      overflowY: 'visible',
    },
    scrollArea: {
      maxHeight: 400,
      overflowY: 'scroll',
      paddingTop: 0,
      paddingBottom: 0,
    },
    table: {
      marginBottom: theme.spacing(3),
    },
    statusText: {
      color: '#9E9D9D',
    },
    wideCell: {
      width: '80%',
    },
  }),
  { name: 'AssignStaffMembersDialog' }
);

export interface AssignMembersDialogProps extends DialogProps, FetchMoreProps, SearchPageProps {
  confirmButtonState: ConfirmButtonTransitionState;
  disabled: boolean;
  staffMembers: RelayToFlat<NonNullable<SearchStaffMembersQuery['search']>>;
  hasMore: boolean;
  onFetchMore: () => void;
  onSubmit: (data: RelayToFlat<NonNullable<SearchStaffMembersQuery['search']>>) => void;
}

function handleStaffMemberAssign(
  member: RelayToFlat<NonNullable<SearchStaffMembersQuery['search']>>[0],
  isSelected: boolean,
  selectedMembers: RelayToFlat<NonNullable<SearchStaffMembersQuery['search']>>,
  setSelectedMembers: (data: RelayToFlat<NonNullable<SearchStaffMembersQuery['search']>>) => void
) {
  if (isSelected) {
    setSelectedMembers(
      selectedMembers.filter((selectedMember) => selectedMember.id !== member.id)
    );
  } else {
    setSelectedMembers([...selectedMembers, member]);
  }
}

const scrollableTargetId = 'assignMembersScrollableDialog';

const AssignMembersDialog: FC<AssignMembersDialogProps> = ({
  confirmButtonState,
  disabled,
  loading,
  onClose,
  onFetchMore,
  hasMore,
  onSearchChange,
  onSubmit,
  open,
  staffMembers,
}) => {
  const [query, onQueryChange] = useSearchQuery(onSearchChange);

  const [selectedMembers, setSelectedMembers] = useState<
    RelayToFlat<NonNullable<SearchStaffMembersQuery['search']>>
  >([]);

  // const styles = useStyles();
  const styles = {};

  const anchor = useRef<HTMLDivElement>();
  const scrollPosition = useElementScroll(anchor);
  const dropShadow = !isScrolledToBottom(anchor, scrollPosition);

  return (
    <Dialog
      onClose={onClose}
      open={open}
      maxWidth="sm"
      fullWidth
      classes={{
        paper: styles.dialogPaper ?? '',
      }}
    >
      <DialogTitle>{m.dashboard_title() ?? 'Assign Staff Members'}</DialogTitle>
      <DialogContent className={styles.inputContainer ?? ''}>
        <TextField
          name="query"
          value={query}
          onChange={onQueryChange}
          label={m.dashboard_searchInputLabel() ?? 'Search Staff Members'}
          placeholder={m.dashboard_searchInputPlaceholder() ?? 'Search by name, email, etc...'}
          fullWidth
          InputProps={{
            autoComplete: 'off',
            endAdornment: loading && <CircularProgress size={16} />,
          }}
          disabled={disabled}
        />
      </DialogContent>
      <DialogContent className={styles.scrollArea ?? ''} ref={anchor} id={scrollableTargetId}>
        <InfiniteScroll
          dataLength={staffMembers?.length || 0}
          next={onFetchMore}
          hasMore={hasMore}
          scrollThreshold="100px"
          loader={
            <>
              {!!staffMembers?.length && <CardSpacer />}
              <div className={styles.loadMoreLoaderContainer ?? ''}>
                <CircularProgress size={24} />
              </div>
            </>
          }
          scrollableTarget={scrollableTargetId}
        >
          <ResponsiveTable className={styles.table ?? ''}>
            <TableBody>
              {renderCollection(
                staffMembers,
                (_member) => {
                  if (!_member) return null;
                  const member = _member as RelayToFlat<
                    NonNullable<SearchStaffMembersQuery['search']>
                  >[0];
                  const isSelected = selectedMembers.some(
                    (selectedMember) => selectedMember.id === member.id
                  );

                  return (
                    <TableRow key={member.id} data-test-id="user-row">
                      <TableCell padding="checkbox" className={styles.checkboxCell ?? ''}>
                        <Checkbox
                          color="primary"
                          checked={isSelected}
                          onChange={() =>
                            handleStaffMemberAssign(
                              member,
                              isSelected,
                              selectedMembers,
                              setSelectedMembers
                            )
                          }
                        />
                      </TableCell>
                      <TableCell className={styles.avatarCell ?? ''}>
                        <div className={styles.avatar ?? ''}>
                          {member?.avatar?.url ? (
                            <img className={styles.avatarImage ?? ''} src={member.avatar.url} />
                          ) : (
                            <div className={styles.avatarDefault ?? ''}>
                              <Typography>{getUserInitials(member)}</Typography>
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className={styles.colName ?? ''}>
                        <Typography>{getUserName(member) || <Skeleton />}</Typography>
                        <Typography variant={'caption'} className={styles.statusText ?? ''}>
                          {member ? (
                            member.isActive ? (
                              (m.dashboard_staffActive() ?? 'Active')
                            ) : (
                              (m.dashboard_staffInactive() ?? 'Inactive')
                            )
                          ) : (
                            <Skeleton />
                          )}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  );
                },
                () =>
                  !loading && (
                    <TableRow>
                      <TableCell colSpan={2}>
                        {m.dashboard_noMembersFound() ?? 'No members found'}
                      </TableCell>
                    </TableRow>
                  )
              )}
            </TableBody>
          </ResponsiveTable>
        </InfiniteScroll>
      </DialogContent>
      <DialogActions className={clsx(dropShadow && styles.dropShadow)}>
        <BackButton onClick={onClose} />
        <ConfirmButton
          data-test-id="submit"
          type="submit"
          transitionState={confirmButtonState}
          onClick={() => {
            onSubmit(selectedMembers);
          }}
        >
          {m.dashboard_assign() ?? 'Assign'}
        </ConfirmButton>
      </DialogActions>
    </Dialog>
  );
};
AssignMembersDialog.displayName = 'AssignMembersDialog';
export default AssignMembersDialog;
