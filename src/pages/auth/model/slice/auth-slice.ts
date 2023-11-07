import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EAuthStep, IInitialAuthState } from '../types/types'
import { sendSmsCode, verifyOtp } from '../services/verification-by-phone'

const initialState: IInitialAuthState = {
  selectedStep: EAuthStep.NUMBER_INPUT,
  error: '',
  isLoading: false,
  isSuccess: false,
  isLoggedIn: false,
}

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setSelectedStep: (state, { payload }: PayloadAction<EAuthStep>) => {
      state.selectedStep = payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(sendSmsCode.pending, (state) => {
      state.isLoading = true
      state.error = ''
    })
    builder.addCase(sendSmsCode.fulfilled, (state) => {
      state.isLoading = false
      state.selectedStep = EAuthStep.VALIDATING_OTP
    })
    builder.addCase(sendSmsCode.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload ?? ''
    })
    builder.addCase(verifyOtp.pending, (state) => {
      state.isLoading = true
      state.error = ''
    })
    builder.addCase(verifyOtp.fulfilled, (state) => {
      state.isLoading = false
      state.isLoggedIn = true
    })
    builder.addCase(verifyOtp.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload ?? ''
    })
  },
})

export const { reducer: authReducer, actions: authActions } = authSlice
