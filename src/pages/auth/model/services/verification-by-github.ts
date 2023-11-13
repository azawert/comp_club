import { createAsyncThunk } from '@reduxjs/toolkit';
import { auth } from '../../../../shared/config/firebase/firebase';
import { GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import { IStateSchema } from '../../../../app/provider/store';
import { ThunkConfig } from './verification-by-phone';
import {
  EDatabasePaths,
  getDataFromFirebaseByField,
  userMapping,
} from '../../../../shared/helpers/firebase-helpers';
import { EAuthStep, authActions } from '../..';
import { thunkErrorHandler } from '../../../../shared/helpers/error-handler';
import { resetAndNavigate } from '../const/common';
export const verificationByGithub = createAsyncThunk<
  void,
  void,
  ThunkConfig<string> & { state: IStateSchema }
>('verificationByGithub', async (_, thunkApi) => {
  const provider = new GithubAuthProvider();
  const { dispatch, extra, rejectWithValue } = thunkApi;
  try {
    const { user } = await signInWithPopup(auth, provider);
    const databaseUser = await getDataFromFirebaseByField(
      EDatabasePaths.users,
      'id',
      user.uid,
    );
    if (databaseUser?.nickname) {
      resetAndNavigate(databaseUser, dispatch, extra);
      return;
    }
    dispatch(authActions.setUser(userMapping(user)));
    dispatch(authActions.setSelectedStep(EAuthStep.CREATING_NICKNAME));
  } catch (e) {
    rejectWithValue(thunkErrorHandler(e));
  }
});
