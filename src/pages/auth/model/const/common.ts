import { UseFormReturnType } from '@mantine/form';
import { IAuthForm } from '../types/types';
import { Dispatch } from '@reduxjs/toolkit';
import { ThunkExtraArgs } from '../services/verification-by-phone';
import { authActions } from '../slice/auth-slice';
import { RoutePath } from '../../../../shared/config/route/route-config';
import { DocumentData } from 'firebase/firestore';
import { LOCAL_STORAGE_KEYS } from '../../../../shared/const/local-storage';
import type { ICreateUserFirebase } from '../../../../shared/helpers/firebase-helpers';

export const resetAndNavigate = (
  user: DocumentData | ICreateUserFirebase,
  dispatch: Dispatch,
  extra: ThunkExtraArgs,
  authForm?: UseFormReturnType<IAuthForm>,
) => {
  localStorage.setItem(LOCAL_STORAGE_KEYS.user_id, user.id);
  authForm?.reset();
  dispatch(authActions.setUser(user));
  dispatch(authActions.setIsLoggedIn(true));
  extra.navigate?.(RoutePath.main);
};
