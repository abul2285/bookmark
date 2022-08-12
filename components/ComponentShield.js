import React from 'react';

export function ComponentShield({
  RBAC,
  showIf,
  userRole,
  children,
  showForRole,
  fallback = null,
}) {
  if (RBAC) return <>{showForRole.includes(userRole) ? children : null}</>;
  if (showIf) return <>{children}</>;

  return <>{fallback}</>;
}
