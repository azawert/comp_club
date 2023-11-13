import { RouteProps } from 'react-router-dom';
import { MainPage } from '../../../pages/main';
import { AuthPage } from '../../../pages/auth/ui/auth-page';

export const APP_ROUTES = {
  auth: 'AUTH',
  main: 'MAIN',
};

export const RoutePath: Record<keyof typeof APP_ROUTES, string> = {
  auth: '/login',
  main: '/',
};

export const routeConfig: Record<keyof typeof APP_ROUTES, RouteProps> = {
  main: {
    element: <MainPage />,
    path: RoutePath.main,
  },
  auth: {
    element: <AuthPage />,
    path: RoutePath.auth,
  },
};

export const routes = Object.values(routeConfig);
