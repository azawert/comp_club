import { RouteProps } from 'react-router-dom';
import { MainPage } from '../../../pages/main';
import { AuthPage } from '../../../pages/auth/ui/auth-page';
import ProfilePage from '../../../pages/profile-page/profile-page';

export const APP_ROUTES = {
  auth: 'AUTH',
  main: 'MAIN',
  profile: 'PROFILE',
};

export const RoutePath: Record<keyof typeof APP_ROUTES, string> = {
  auth: '/login',
  main: '/',
  profile: '/profile/:id',
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
  profile: {
    element: <ProfilePage />,
    path: RoutePath.profile,
  },
};

export const routes = Object.values(routeConfig);
