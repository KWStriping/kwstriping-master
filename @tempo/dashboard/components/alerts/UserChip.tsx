import * as m from '@paraglide/messages';
import { UserChipMenu, UserChipMenuItem } from '@tempo/ui/components/UserChipMenu';
import { getUserInitials, getUserName } from '@tempo/utils/user';
import type { UserFragment } from '@tempo/api/generated/graphql';
import { staffMemberDetailsUrl } from '@tempo/dashboard/oldSrc/staff/urls';
import FormControlLabel from '@mui/material/FormControlLabel';
import Skeleton from '@mui/material/Skeleton';
import Switch from '@mui/material/Switch';
import Link from 'next/link';
import type { FC } from 'react';

export interface UserChipProps {
  isDarkThemeEnabled: boolean;
  user: Maybe<UserFragment>;
  onLogout: () => void;
  onThemeToggle: () => void;
}

const UserChip: FC<UserChipProps> = ({ isDarkThemeEnabled, user, onLogout, onThemeToggle }) => {
  if (!user) return <Skeleton width={'48px'} />;
  return (
    <UserChipMenu
      initials={getUserInitials(user)}
      name={getUserName(user, true)}
      avatar={user?.avatar?.url}
    >
      <UserChipMenuItem data-test-id="account-settings-button">
        <Link href={staffMemberDetailsUrl(user?.id)}>
          {m.dashboard_accountSettings() ?? 'Account Settings'}
        </Link>
      </UserChipMenuItem>
      <UserChipMenuItem onClick={onLogout} data-test-id="log-out-button">
        {m.auth_signOut() ?? 'Log out'}
      </UserChipMenuItem>
      <UserChipMenuItem
        leaveOpen
        data-test-id="theme-switch"
        data-test-is-dark={isDarkThemeEnabled}
      >
        <FormControlLabel
          control={<Switch checked={isDarkThemeEnabled} disableRipple />}
          label={m.dashboard_enableDarkMode() ?? 'Enable Dark Mode'}
          onChange={onThemeToggle}
        />
      </UserChipMenuItem>
    </UserChipMenu>
  );
};
UserChip.displayName = 'UserChip';
export default UserChip;
