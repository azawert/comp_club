import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EAuthStep, IInitialAuthState } from '../types/types';
import {
  createNicknameAndUser,
  sendSmsCode,
  verifyOtp,
} from '../services/verification-by-phone';
import { DocumentData } from 'firebase/firestore';
import { verificationByGithub } from '../services/verification-by-github';
import { verificationByGoogle } from '../services/verification-by-google';

const initialState: IInitialAuthState = {
  selectedStep: EAuthStep.NUMBER_INPUT,
  error: '',
  isLoading: false,
  isLoggedIn: false,
  user: null,
};

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setSelectedStep: (state, { payload }: PayloadAction<EAuthStep>) => {
      state.selectedStep = payload;
    },
    setUser: (state, { payload }: PayloadAction<DocumentData | null>) => {
      state.user = payload;
    },
    setIsLoggedIn: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoggedIn = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(sendSmsCode.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(sendSmsCode.fulfilled, (state) => {
      state.isLoading = false;
      state.selectedStep = EAuthStep.VALIDATING_OTP;
    });
    builder.addCase(sendSmsCode.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload ?? '';
    });
    builder.addCase(verifyOtp.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(verifyOtp.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(verifyOtp.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload ?? '';
    });
    builder.addCase(createNicknameAndUser.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(createNicknameAndUser.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(createNicknameAndUser.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload ?? '';
    });
    builder.addCase(verificationByGithub.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(verificationByGithub.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(verificationByGithub.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload ?? '';
    });
    builder.addCase(verificationByGoogle.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(verificationByGoogle.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(verificationByGoogle.rejected, (state, { payload }) => {
      state.isLoading = true;
      state.error = payload ?? '';
    });
  },
});

export const { reducer: authReducer, actions: authActions } = authSlice;
