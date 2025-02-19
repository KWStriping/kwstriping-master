import { useUser } from '@tempo/api/auth/react/hooks';

export const useUserPermissions = () => {
  const { user } = useUser();
  // console.log('🔑 useUserPermissions', { user });
  return user?.userPermissions;
};
