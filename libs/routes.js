export function verifyPath(routes, uri) {
  return routes?.some((route) => route === uri);
}

export function getAccessRoute(RBAC, userRole, accessRoute) {
  if (typeof accessRoute !== 'undefined') return accessRoute;

  if (RBAC && userRole) return RBAC[userRole].accessRoute;

  return '/';
}
