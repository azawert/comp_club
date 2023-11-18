import { Suspense, useEffect } from 'react';
import { Loader } from '@mantine/core';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { RoutePath, routeConfig } from 'src/shared/config/route/route-config';
import { useSelector } from 'react-redux';
import { IStateSchema } from '../../store';

export const AppRouter = () => {
  const { auth, main, profile } = routeConfig;

  const { isLoggedIn } = useSelector((state: IStateSchema) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate(RoutePath.auth);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path={profile.path} element={profile.element} />

        <Route path={main.path} element={main.element} />

        <Route path={auth.path} element={auth.element} />
      </Routes>
    </Suspense>
  );
};
