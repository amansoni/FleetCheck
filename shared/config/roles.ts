export const ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  INSPECTOR: 'inspector',
  DRIVER: 'driver'
} as const;

export const ALL_ROLES: RoleValues[] = Object.values(ROLES);

export type RoleValues = typeof ROLES[keyof typeof ROLES];