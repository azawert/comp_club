import { Suspense, useEffect, useMemo, useCallback, useState } from 'react';
import { Loader } from '@mantine/core';
import { Navigate, Route, Routes } from 'react-router-dom';
import { RoutePath, routes } from '../../../../shared/config/route/route-config';
import { useAppDispatch } from '../../../../shared/hooks/useAppDispatch';
import { LOCAL_STORAGE_KEYS } from '../../../../shared/const/local-storage';
import {
  EDatabasePaths,
  getDataFromFirebaseByField,
} from '../../../../shared/helpers/firebase-helpers';
import { authActions } from '../../../../pages/auth';

export const AppRouter = () => {
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const dispatch = useAppDispatch();

  const userId = localStorage.getItem(LOCAL_STORAGE_KEYS.user_id);

  const fetchUserData = useCallback(async () => {
    if (!userId) {
      return;
    }
    const userFromDb = await getDataFromFirebaseByField(
      EDatabasePaths.users,
      'id',
      userId,
    );
    dispatch(authActions.setUser(userFromDb));
  }, [userId, dispatch]);

  useEffect(() => {
    if (userId) {
      dispatch(authActions.setIsLoggedIn(true));
      setShouldRedirect(false);
    } else {
      setShouldRedirect(true);
    }
  }, [userId, dispatch]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const memoRoutes = useMemo(
    () =>
      routes.map((route) => {
        return { element: route.element, path: route.path };
      }),
    [],
  );

  return (
    <Suspense fallback={<Loader />}>
      {shouldRedirect ? (
        <Navigate to={RoutePath.auth} />
      ) : (
        <Navigate to={RoutePath.main} />
      )}
      <Routes>
        {memoRoutes.map(({ element, path }) => (
          <Route element={element} path={path} key={path} />
        ))}
      </Routes>
    </Suspense>
  );
};
