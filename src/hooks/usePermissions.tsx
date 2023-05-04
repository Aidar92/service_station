import { useCallback, useContext } from 'react';
import { AuthContext } from '~context';
import { Common } from '~types';

type HasPermissionFn = {
  (permissionId: Common.Permissions): boolean;
  (permissionId: Common.Permissions[]): boolean[];
};

export const usePermissions = (): HasPermissionFn => {
  const {
    authState: { userData },
  } = useContext(AuthContext);

  return useCallback(
    (
      permissionId: Common.Permissions | Common.Permissions[]
    ): boolean | boolean[] => {
      if (!userData) {
        return false;
      }
      if (Array.isArray(permissionId)) {
        return permissionId.map((permission) =>
          userData.permissions.includes(permission)
        );
      }
      return userData.permissions.includes(permissionId);
    },
    [userData]
  ) as HasPermissionFn;
};
