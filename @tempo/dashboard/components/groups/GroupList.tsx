import * as m from '@paraglide/messages';
import IconButton from '@tempo/ui/components/buttons/IconButton';
import { makeStyles } from '@tempo/ui/theme/styles';
import { renderCollection } from '@tempo/ui/utils';
import DeleteIcon from '@mui/icons-material/Delete';
import Skeleton from '@mui/material/Skeleton';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableFooter from '@mui/material/TableFooter';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import type { FC } from 'react';
import type { GroupFragment } from '@tempo/api/generated/graphql';
import ResponsiveTable from '@tempo/dashboard/components/tables/ResponsiveTable';
import { TableButtonWrapper } from '@tempo/dashboard/components/tables/TableButtonWrapper/TableButtonWrapper';
import TableCellHeader from '@tempo/dashboard/components/tables/TableCellHeader';
import { TablePaginationWithContext } from '@tempo/dashboard/components/tables/TablePagination';
import { stopPropagation } from '@tempo/dashboard/oldSrc/misc';
import { groupDetailsUrl, GroupListUrlOrdering } from '@tempo/dashboard/oldSrc/groups/urls';
import type { ListProps, SortPage } from '@tempo/dashboard/oldSrc/types';
import { getArrowDirection } from '@tempo/dashboard/oldSrc/utils/sort';

const useStyles = makeStyles(
  (theme) => ({
    [theme.breakpoints.up('lg')]: {
      colActions: {
        width: 180,
      },
      colMembers: {
        width: 180,
      },
      colName: {
        width: 'auto',
      },
    },
    colActions: {
      paddingRight: theme.spacing(1),
      textAlign: 'right',
    },
    colActionsHeader: {
      textAlign: 'right',
    },
    colMembers: {
      textAlign: 'right',
    },
    link: {
      cursor: 'pointer',
    },
  }),
  { name: 'GroupList' }
);

const numberOfColumns = 3;

interface GroupListProps extends ListProps, SortPage<GroupListUrlOrdering> {
  groups: GroupFragment[];
  onDelete: (id: string) => void;
}

const GroupList: FC<GroupListProps> = (props) => {
  const { disabled, groups, onDelete, onSort, sort } = props;
  const styles = useStyles(props);

  return (
    <ResponsiveTable>
      <TableHead>
        <TableRow>
          <TableCellHeader
            direction={
              sort.sort === GroupListUrlOrdering.name ? getArrowDirection(!!sort.asc) : undefined
            }
            arrowPosition="right"
            onClick={() => onSort(GroupListUrlOrdering.name)}
            className={styles.colName ?? ''}
          >
            <>
              {/* permission group name */}

              {m.dashboard_zXISP() ?? 'Permission Group Name'}
            </>
          </TableCellHeader>
          <TableCellHeader className={styles.colMembers ?? ''} textAlign="right">
            {m._a__ug() ?? 'Members'}
          </TableCellHeader>
          <TableCell className={styles.colActionsHeader ?? ''}>
            {m.dashboard_L_VAE() ?? 'Actions'}
          </TableCell>
        </TableRow>
      </TableHead>
      <TableFooter>
        <TableRow>
          <TablePaginationWithContext colSpan={numberOfColumns} disabled={disabled} />
        </TableRow>
      </TableFooter>
      <TableBody>
        {renderCollection(
          groups,
          (group) => (
            <TableRow
              className={group ? styles.link : undefined}
              hover={!!group}
              key={group ? group.id : 'skeleton'}
              href={group && groupDetailsUrl(group.id)}
              data-test-id={'id-' + group.id}
            >
              <TableCell className={styles.colName ?? ''}>
                {group ? <span data-test-id="name">{group.name}</span> : <Skeleton />}
              </TableCell>
              <TableCell className={styles.colMembers ?? ''}>
                {group ? <span data-test-id="members">{group.users.length}</span> : <Skeleton />}
              </TableCell>
              <TableCell className={styles.colActions ?? ''}>
                {group ? (
                  <>
                    {group.userCanManage && (
                      <TableButtonWrapper>
                        <IconButton
                          color="secondary"
                          data-test-id="delete-icon"
                          onClick={stopPropagation(() => onDelete(group.id))}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableButtonWrapper>
                    )}
                  </>
                ) : (
                  <Skeleton />
                )}
              </TableCell>
            </TableRow>
          ),
          () => (
            <TableRow>
              <TableCell colSpan={numberOfColumns}>
                {m.dashboard_Xn__q() ?? 'No permission groups found'}
              </TableCell>
            </TableRow>
          )
        )}
      </TableBody>
    </ResponsiveTable>
  );
};
GroupList.displayName = 'GroupList';
export default GroupList;
