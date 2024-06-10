import { useTranslation } from '@core/i18n';
import { makeStyles } from '@core/ui/theme/styles';
import { renderCollection } from '@core/ui/utils';
import { getUserInitials, getUserName } from '@core/utils/user';
import Skeleton from '@mui/material/Skeleton';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableFooter from '@mui/material/TableFooter';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';
import type { ReactNode, FC } from 'react';
import { getArrowDirection } from '@dashboard/oldSrc/utils/sort';
import type { ListProps, RelayToFlat, SortPage } from '@dashboard/oldSrc/types';
import { StaffListUrlOrdering, staffMemberDetailsUrl } from '@dashboard/oldSrc/staff/urls';
import { maybe } from '@dashboard/oldSrc/misc';
import type { StaffListQuery } from '@core/api/graphql';
import { TablePaginationWithContext } from '@dashboard/components/tables/TablePagination';
import TableCellHeader from '@dashboard/components/tables/TableCellHeader';
import ResponsiveTable from '@dashboard/components/tables/ResponsiveTable';

const useStyles = makeStyles(
  (theme) => ({
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
    colEmail: {
      width: 400,
    },
    statusText: {
      color: '#9E9D9D',
    },
    tableRow: {
      cursor: 'pointer',
    },
    wideColumn: {
      width: '80%',
    },
  }),
  { name: 'StaffList' }
);

interface StaffListProps extends ListProps, SortPage<StaffListUrlOrdering> {
  staffMembers: RelayToFlat<NonNullable<StaffListQuery['staffUsers']>>;
}

const numberOfColumns = 2;

const StaffList: FC<StaffListProps> = (props) => {
  const { settings, disabled, onUpdateListSettings, onSort, sort, staffMembers } = props;
  // const styles = useStyles();
  const styles = {};
  const { t } = useTranslation();

  return (
    <ResponsiveTable>
      <colgroup>
        <col />
        <col className={styles.colEmail ?? ''} />
      </colgroup>
      <TableHead>
        <TableRow>
          <TableCellHeader
            direction={
              sort.sort === StaffListUrlOrdering.name ? getArrowDirection(!!sort.asc) : undefined
            }
            arrowPosition="right"
            onClick={() => onSort(StaffListUrlOrdering.name)}
            className={styles.wideColumn ?? ''}
          >
            <>
              {/* staff member full name */}

              {t('dashboard.32xfN', 'Name')}
            </>
          </TableCellHeader>
          <TableCellHeader
            direction={
              sort.sort === StaffListUrlOrdering.email ? getArrowDirection(!!sort.asc) : undefined
            }
            onClick={() => onSort(StaffListUrlOrdering.email)}
          >
            {t('dashboard.xQxLE', 'Email address')}
          </TableCellHeader>
        </TableRow>
      </TableHead>
      <TableFooter>
        <TableRow>
          <TablePaginationWithContext
            colSpan={numberOfColumns}
            disabled={disabled}
            settings={settings}
            onUpdateListSettings={onUpdateListSettings}
          />
        </TableRow>
      </TableFooter>
      <TableBody>
        {renderCollection(
          staffMembers,
          (staffMember) => (
            <TableRow
              className={clsx(!!staffMember && styles.tableRow)}
              hover={!!staffMember}
              href={staffMember && staffMemberDetailsUrl(staffMember.id)}
              key={staffMember ? staffMember.id : 'skeleton'}
            >
              <TableCell>
                <div className={styles.avatar ?? ''} data-test-id="staffAvatar">
                  {staffMember.avatar?.url ? (
                    <img className={styles.avatarImage ?? ''} src={staffMember.avatar.url} />
                  ) : (
                    <div className={styles.avatarDefault ?? ''}>
                      <Typography>{getUserInitials(staffMember)}</Typography>
                    </div>
                  )}
                </div>
                <Typography>{getUserName(staffMember) || <Skeleton />}</Typography>
                <Typography
                  variant={'caption'}
                  className={styles.statusText ?? ''}
                  data-test-id="staffStatusText"
                >
                  {maybe<ReactNode>(
                    () =>
                      staffMember.isActive
                        ? t('dashboard.staffMemberStatus.active', 'Active')
                        : t('dashboard.staffMemberStatus.inactive', 'Inactive'),
                    <Skeleton />
                  )}
                </Typography>
              </TableCell>
              <TableCell>{maybe<ReactNode>(() => staffMember.email, <Skeleton />)}</TableCell>
            </TableRow>
          ),
          () => (
            <TableRow>
              <TableCell colSpan={numberOfColumns}>
                {t('dashboard.JQX5t', 'No staff members found')}
              </TableCell>
            </TableRow>
          )
        )}
      </TableBody>
    </ResponsiveTable>
  );
};
StaffList.displayName = 'StaffList';
export default StaffList;
