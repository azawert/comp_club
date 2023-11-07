import { RouteProps } from 'react-router-dom'
import { AuthPage } from '../../../pages/auth'
import { MainPage } from '../../../pages/main'

export const APP_ROUTES = {
  auth: 'AUTH',
  main: 'MAIN',
}

export const RoutePath: Record<keyof typeof APP_ROUTES, string> = {
  auth: '/login',
  main: '/',
}

export const routeConfig: Record<keyof typeof APP_ROUTES, RouteProps> = {
  main: {
    element: <MainPage />,
    path: RoutePath.main,
  },
  auth: {
    element: <AuthPage />,
    path: RoutePath.auth,
  },
}

export const routes = Object.values(routeConfig)
