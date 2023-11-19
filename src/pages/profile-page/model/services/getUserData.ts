import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  EDatabasePaths,
  getDataFromFirebaseByField,
} from '../../../../shared/helpers/firebase-helpers';
import { UseFormReturnType } from '@mantine/form';
import { IProfileFormValues } from '../types/types';
import i18n from '../../../../shared/config/i18n/i18n';

interface IFetchUserData {
  id: string;
  form: UseFormReturnType<IProfileFormValues>;
}

export const fetchUserData = createAsyncThunk(
  'users/fetchUserData',
  async ({ id, form }: IFetchUserData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    const data = await getDataFromFirebaseByField(EDatabasePaths.users, 'id', id);

    const user = data?.[0];

    if (!user) {
      rejectWithValue(i18n.t('error'));
      return;
    }

    form.setValues(user);
  },
);
