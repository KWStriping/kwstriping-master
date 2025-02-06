import * as m from '@paraglide/messages';
import { useUser } from '@tempo/api/auth/react/hooks';
import type { PermissionData } from '@dashboard/components/groups/GroupDetailsPage/GroupDetailsPage';
import {
  Card,
  CardContent,
  Checkbox,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import type { ChangeEvent, FC } from 'react';
import styles from './index.module.css';
import CardTitle from '@tempo/dashboard/components/core/CardTitle';

interface AccountPermissionsProps {
  permissions: PermissionData[];
  permissionsExceeded: boolean;
  data: {
    hasFullAccess: boolean;
    permissions: string[];
  };
  disabled: boolean;
  description: string;
  errorMessage: string;
  fullAccessLabel: string;
  onChange: (event: ChangeEvent<unknown>, cb?: () => void) => void;
}

const AccountPermissions: FC<AccountPermissionsProps> = (props) => {
  const {
    data,
    disabled,
    permissions,
    permissionsExceeded,
    onChange,
    description,
    fullAccessLabel,
    errorMessage,
  } = props;
  const { user } = useUser();

  const handleFullAccessChange = () => {
    onChange({
      target: {
        name: 'permissions',
        value: !data?.hasFullAccess ? permissions.map((perm) => perm.code) : [],
      },
    } as unknown);
    onChange({
      target: {
        name: 'hasFullAccess',
        value: !data?.hasFullAccess,
      },
    } as unknown);
  };
  const handlePermissionChange = (key, value) => () => {
    onChange({
      target: {
        name: 'permissions',
        value: !value
          ? data?.permissions?.concat([key])
          : data?.permissions?.filter((perm) => perm !== key),
      },
    } as unknown);
  };

  return (
    <Card>
      <CardTitle
        title={
          m.dashboard_br_Vp() ?? 'Permissions'
          // dialog header
        }
      />
      {permissionsExceeded && (
        <>
          <CardContent>
            <Typography variant="body2">
              {/* exceeded permissions description */}

              {m.dashboard_VU_ol() ??
                'This groups permissions exceeds your own. You are able only to manage permissions that you have.'}
            </Typography>
          </CardContent>
          <hr className={styles.hr ?? ''} />
          <CardContent>
            <Typography variant="body2">
              {/* card section description */}

              {m.dashboard_cS_Rd() ?? 'Available permissions'}
            </Typography>
            <List dense={true}>
              {user.userPermissions.map((perm) => (
                <ListItem key={perm.code}>
                  <ListItemText primary={`- ${perm.name}`} />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </>
      )}
      {!permissionsExceeded && (
        <>
          <CardContent>
            <Typography variant="body2">{description}</Typography>
            <ListItem role={undefined} dense button onClick={handleFullAccessChange}>
              <ListItemIcon>
                <Checkbox
                  data-test-id="full-access"
                  color="secondary"
                  edge="start"
                  checked={data?.hasFullAccess}
                  disabled={disabled}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': 'fullAccess' }}
                />
              </ListItemIcon>
              <ListItemText primary={fullAccessLabel} />
            </ListItem>
          </CardContent>
          {!data?.hasFullAccess && (
            <>
              <hr className={styles.hr ?? ''} />
              <CardContent>
                {permissions === undefined ? (
                  <Skeleton />
                ) : (
                  permissions.map((perm) => (
                    <ListItem
                      key={perm.code}
                      disabled={perm.disabled}
                      role={undefined}
                      dense
                      button
                      onClick={handlePermissionChange(
                        perm.code,
                        data?.permissions?.filter((userPerm) => userPerm === perm.code).length ===
                          1
                      )}
                    >
                      <ListItemIcon>
                        <Checkbox
                          color="secondary"
                          edge="start"
                          checked={
                            data?.permissions?.filter((userPerm) => userPerm === perm.code)
                              .length === 1
                          }
                          tabIndex={-1}
                          disableRipple
                          name={perm.code}
                          inputProps={{ 'aria-labelledby': perm.code }}
                        />
                      </ListItemIcon>
                      <ListItemText
                        id={perm.code}
                        primary={perm.name.replace(/\./, '')}
                        secondary={
                          perm.lastSource &&
                          t(
                            'dashboard_mMDLN',
                            'This group is last source of that permission'
                            // permission list item description
                          )
                        }
                      />
                    </ListItem>
                  ))
                )}
              </CardContent>
            </>
          )}
          {!!errorMessage && (
            <>
              <hr className={styles.hr ?? ''} />
              <CardContent>
                <Typography variant="body2" color="error">
                  {errorMessage}
                </Typography>
              </CardContent>
            </>
          )}
        </>
      )}
    </Card>
  );
};

AccountPermissions.displayName = 'AccountPermissions';
export default AccountPermissions;
