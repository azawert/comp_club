import { UseFormReturnType } from '@mantine/form';
import { IAuthForm } from '../types/types';
import { Dispatch } from '@reduxjs/toolkit';

import { authActions } from '../slice/auth-slice';

import { DocumentData } from 'firebase/firestore';
import { ThunkExtraArgs } from '../services/verification-by-phone';
import { RoutePath } from 'src/shared/config/route/route-config';

export const resetAndNavigate = (
  user: DocumentData[],
  dispatch: Dispatch,
  extra: ThunkExtraArgs,
  authForm?: UseFormReturnType<IAuthForm>,
) => {
  dispatch(authActions.setIsLoggedIn(true));
  const userFromParams = user[0];
  authForm?.reset();
  dispatch(authActions.setUser(userFromParams));
  extra?.navigate?.(RoutePath.main);
};
