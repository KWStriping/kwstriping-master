import * as m from '@paraglide/messages';
import { Button } from '@tempo/ui/components/buttons/Button';
import IconButton from '@tempo/ui/components/buttons/IconButton';
import { makeStyles } from '@tempo/ui/theme/styles';
import { renderCollection } from '@tempo/ui/utils';
import { getUserInitials, getUserName } from '@tempo/utils/user';
import DeleteIcon from '@mui/icons-material/Delete';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Skeleton from '@mui/material/Skeleton';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';
import type { FC } from 'react';
import CardTitle from '@tempo/dashboard/components/core/CardTitle';
import Checkbox from '@tempo/dashboard/components/core/Checkbox';
import ResponsiveTable from '@tempo/dashboard/components/tables/ResponsiveTable';
import TableCellHeader from '@tempo/dashboard/components/tables/TableCellHeader';
import TableHead from '@tempo/dashboard/components/tables/TableHead';
import type { GroupMemberFragment } from '@tempo/api/generated/graphql';
import { stopPropagation } from '@tempo/dashboard/oldSrc/misc';
import { sortMembers } from '@tempo/dashboard/oldSrc/groups/sort';
import { MembersListUrlOrdering } from '@tempo/dashboard/oldSrc/groups/urls';
import type { ListActions, SortPage } from '@tempo/dashboard/oldSrc/types';
import { getArrowDirection } from '@tempo/dashboard/oldSrc/utils/sort';

const useStyles = makeStyles(
  (theme) => ({
    [theme.breakpoints.up('lg')]: {
      colActions: {
        width: 120,
      },
      colEmail: {
        width: 300,
      },
      colName: {
        width: 'auto',
      },
    },
    avatar: {
      alignItems: 'center',
      borderRadius: '100%',
      display: 'grid',
      float: 'left',
      height: 47,
      justifyContent: 'center',
      marginRight: theme.spacing(1),
      overflow: 'hidden',
      width: 47,
    },
    avatarDefault: {
      '& div': {
        color: theme.vars.palette.primary.contrastText,
        lineHeight: '47px',
      },
      background: theme.vars.palette.primary.main,
      height: 47,
      textAlign: 'center',
      width: 47,
    },
    avatarImage: {
      pointerEvents: 'none',
      width: '100%',
    },
    colActions: {
      paddingRight: theme.spacing(1),
      textAlign: 'right',
    },
    helperText: {
      textAlign: 'center',
    },
    statusText: {
      color: '#9E9D9D',
    },
    tableRow: {},
  }),
  { name: 'Group' }
);

const numberOfColumns = 4;

interface GroupMemberListProps extends ListActions, SortPage<MembersListUrlOrdering> {
  users: GroupMemberFragment[];
  disabled: boolean;
  onUnassign: (ida: string[]) => void;
  onAssign: () => void;
}

const GroupMemberList: FC<GroupMemberListProps> = (props) => {
  const {
    disabled,
    users,
    onUnassign,
    onAssign,
    onSort,
    toggle,
    toolbar,
    isChecked,
    selected,
    toggleAll,
    sort,
  } = props;
  const members = [...users].sort(sortMembers(sort?.sort, sort?.asc));
  const styles = useStyles(props);
  return (
    <Card>
      <CardTitle
        title={m.dashboard_groupMembersHeader() ?? 'Group members'}
        toolbar={
          <Button
            data-test-id="assign-members"
            color={disabled ? 'secondary' : 'primary'}
            onClick={onAssign}
            disabled={disabled}
          >
            <>{m.dashboard_assignMembers() ?? 'Assign members'}</>
          </Button>
        }
      />
      {members?.length === 0 ? (
        <CardContent className={styles.helperText ?? ''}>
          <Typography color="textSecondary">
            <>
              {/* empty list message */}

              {m.dashboard_VD_os() ??
                'You haven’t assigned any member to this permission group yet.'}
            </>
          </Typography>
          <Typography color="textSecondary">
            <>
              {t(
                'dashboard_D7/M6',
                'Please use Assign Members button to do so.'
                // empty list message
              )}
            </>
          </Typography>
        </CardContent>
      ) : (
        <ResponsiveTable>
          <TableHead
            colSpan={numberOfColumns}
            selected={selected}
            disabled={disabled}
            items={members}
            toggleAll={toggleAll}
            toolbar={toolbar}
          >
            <TableCellHeader
              className={styles.colName ?? ''}
              arrowPosition="right"
              onClick={() => onSort(MembersListUrlOrdering.name)}
              direction={
                sort?.sort === MembersListUrlOrdering.name
                  ? getArrowDirection(!!sort.asc)
                  : undefined
              }
            >
              {m.dashboard_name() ?? 'Name'}
            </TableCellHeader>
            <TableCellHeader
              className={styles.colEmail ?? ''}
              arrowPosition="right"
              onClick={() => onSort(MembersListUrlOrdering.email)}
              direction={
                sort?.sort === MembersListUrlOrdering.email
                  ? getArrowDirection(!!sort.asc)
                  : undefined
              }
            >
              {m.dashboard_xQxLE() ?? 'Email address'}
            </TableCellHeader>
            <TableCellHeader textAlign="right">
              {m.dashboard_L_VAE() ?? 'Actions'}
            </TableCellHeader>
          </TableHead>
          <TableBody>
            {renderCollection(
              members,
              (user) => {
                const isSelected = user ? isChecked(user.id) : false;

                return (
                  <TableRow
                    className={clsx(!!user && styles.tableRow)}
                    hover={!!user}
                    selected={isSelected}
                    key={user ? user.id : 'skeleton'}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        disabled={disabled}
                        disableClickPropagation
                        onChange={() => toggle(user.id)}
                      />
                    </TableCell>
                    <TableCell className={styles.colName ?? ''}>
                      <div className={styles.avatar ?? ''}>
                        {user?.avatar?.url ? (
                          <img className={styles.avatarImage ?? ''} src={user?.avatar?.url} />
                        ) : (
                          <div className={styles.avatarDefault ?? ''}>
                            <Typography>{getUserInitials(user)}</Typography>
                          </div>
                        )}
                      </div>
                      <Typography>{getUserName(user) || <Skeleton />}</Typography>
                      <Typography variant={'caption'} className={styles.statusText ?? ''}>
                        {!user ? (
                          <Skeleton />
                        ) : user.isActive ? (
                          m.dashboard_staffMemberStatus_active() ?? 'Active'
                        ) : (
                          m.dashboard_staffMemberStatus_inactive() ?? 'Inactive'
                        )}
                      </Typography>
                    </TableCell>
                    <TableCell className={styles.colEmail ?? ''}>
                      {user?.email || <Skeleton />}
                    </TableCell>
                    <TableCell className={styles.colActions ?? ''}>
                      {user ? (
                        <>
                          <IconButton
                            color="secondary"
                            data-test-id="remove-user"
                            disabled={disabled}
                            onClick={stopPropagation(() => onUnassign([user.id]))}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </>
                      ) : (
                        <Skeleton />
                      )}
                    </TableCell>
                  </TableRow>
                );
              },
              () => (
                <TableRow>
                  <TableCell colSpan={numberOfColumns}>
                    {m.dashboard_rWOxx() ?? 'No members found'}
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </ResponsiveTable>
      )}
    </Card>
  );
};
GroupMemberList.displayName = 'GroupMemberList';
export default GroupMemberList;
