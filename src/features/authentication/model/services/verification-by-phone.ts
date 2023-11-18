import {
  ConfirmationResult,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from 'firebase/auth';
import { NavigateOptions, To } from 'react-router-dom';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { UseFormReturnType } from '@mantine/form';

import { auth } from '../../../../shared/config/firebase/firebase';
import {
  EDatabasePaths,
  getDataFromFirebaseByField,
  setFirebaseUser,
  userMapping,
} from '../../../../shared/helpers/firebase-helpers';
import { thunkErrorHandler } from '../../../../shared/helpers/error-handler';
import { EAuthStep, IAuthForm } from '../types/types';
import { authActions } from '../..';
import { IStateSchema } from '../../../../app/provider/store';
import i18n from '../../../../shared/config/i18n/i18n';
import { resetAndNavigate } from '../const/common';

interface IVerifyOtp {
  otp: string;
  authForm: UseFormReturnType<IAuthForm>;
}

interface ICreateNickname {
  nickname: string;
  authForm: UseFormReturnType<IAuthForm>;
}

export interface ThunkExtraArgs {
  navigate?: (to: To, options?: NavigateOptions) => void;
}

export interface ThunkConfig<T> {
  rejectValue: T;
  extra: ThunkExtraArgs;
}

const setupRecaptcha = (phoneNumber: string) => {
  const recaptcha = new RecaptchaVerifier(auth, 'sign-in-button', {
    size: 'invisible',
  });

  return signInWithPhoneNumber(auth, phoneNumber, recaptcha);
};
let confirmObj: ConfirmationResult;
export const sendSmsCode = createAsyncThunk<void, string, ThunkConfig<string>>(
  'sendSmsCode',
  async (phoneNumber: string, thunkApi) => {
    const { rejectWithValue } = thunkApi;

    try {
      confirmObj = await setupRecaptcha(phoneNumber);
    } catch (e) {
      rejectWithValue(thunkErrorHandler(e));
    }
  },
);

export const verifyOtp = createAsyncThunk<void, IVerifyOtp, ThunkConfig<string>>(
  'verifyOtp',
  async (data: IVerifyOtp, thunkApi) => {
    const { rejectWithValue, extra, dispatch } = thunkApi;
    const { otp, authForm } = data;
    try {
      const resUser = await confirmObj.confirm(otp);
      const user = await getDataFromFirebaseByField(
        EDatabasePaths.users,
        'id',
        resUser.user.uid,
      );
      if (user && user[0].nickname) {
        resetAndNavigate(user, dispatch, extra, authForm);
        return;
      }
      dispatch(authActions.setUser(userMapping(resUser.user)));
      dispatch(authActions.setSelectedStep(EAuthStep.CREATING_NICKNAME));
    } catch (e) {
      rejectWithValue(thunkErrorHandler(e));
    }
  },
);

export const createNicknameAndUser = createAsyncThunk<
  void,
  ICreateNickname,
  ThunkConfig<string> & { state: IStateSchema }
>('createUserWithNickname', async (data: ICreateNickname, thunkApi) => {
  const { rejectWithValue, extra, getState, dispatch } = thunkApi;
  const { authForm, nickname } = data;
  const userFromStore = getState()?.auth.user;
  try {
    const nickNameAlreadyTaken = await getDataFromFirebaseByField(
      EDatabasePaths.users,
      'nickname',
      nickname,
    );
    if (nickNameAlreadyTaken) {
      return rejectWithValue(i18n.t('auth.nicknameAlreadyTaken'));
    }
    await setFirebaseUser(EDatabasePaths.users, {
      id: userFromStore?.id,
      role: userFromStore?.role,
      email: userFromStore?.email,
      fullname: userFromStore?.fullname,
      nickname,
      phonenumber: userFromStore?.phonenumber,
    });
    const user = await getDataFromFirebaseByField(
      EDatabasePaths.users,
      'id',
      userFromStore?.id,
    );
    if (!user) {
      return rejectWithValue(i18n.t('auth.userNotFound'));
    }

    resetAndNavigate(user, dispatch, extra, authForm);
  } catch (e) {
    rejectWithValue(thunkErrorHandler(e));
  }
});
