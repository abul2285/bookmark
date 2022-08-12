import React, { useEffect } from 'react';

import { verifyPath, getAccessRoute } from '../libs/routes';
import { useGetUser } from '../modules/auth/auth.query';

export function NextShield({
  RBAC,
  userRole,
  children,
  loginRoute,
  accessRoute,
  publicRoutes,
  hybridRoutes,
  privateRoutes,
  LoadingComponent,
  router: { pathname, replace },
}) {
  const { isLoading, data } = useGetUser();
  const isAuth = !!data?.username;
  const pathIsPrivate = verifyPath(privateRoutes, pathname);
  const pathIsPublic = verifyPath(publicRoutes, pathname);
  const pathIsHybrid = verifyPath(hybridRoutes, pathname);
  const pathIsAuthorized =
    RBAC && userRole && verifyPath(RBAC[userRole].grantedRoutes, pathname);
  const access = getAccessRoute(RBAC, userRole, accessRoute);

  useEffect(() => {
    if (!isAuth && !isLoading && pathIsPrivate) replace(loginRoute);
    if (isAuth && !isLoading && pathIsPublic) replace(access);
    if (isAuth && userRole && !isLoading && !pathIsHybrid && !pathIsAuthorized)
      replace(access);
  }, [
    isAuth,
    access,
    replace,
    userRole,
    isLoading,
    loginRoute,
    pathIsPublic,
    pathIsHybrid,
    pathIsPrivate,
    pathIsAuthorized,
  ]);

  if (
    ((isLoading || !isAuth) && pathIsPrivate) ||
    ((isLoading || isAuth) && pathIsPublic) ||
    ((isLoading || userRole) && !pathIsAuthorized && !pathIsHybrid) ||
    (isLoading && pathIsHybrid)
  )
    return <>{LoadingComponent}</>;

  return <>{children}</>;
}
