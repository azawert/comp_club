import {
  ConfirmationResult,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from 'firebase/auth'
import { NavigateOptions, To } from 'react-router-dom'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { UseFormReturnType } from '@mantine/form'
import { IAuthForm } from '../../../../features/auth-by-phone'
import { auth } from '../../../../shared/config/firebase/firebase'
import {
  EDatabasePaths,
  createFirebaseUser,
  getDataFromFirebaseByField,
} from '../../../../shared/helpers/firebase-helpers'
import { RoutePath } from '../../../../shared/config/route/route-config'
import { thunkErrorHandler } from '../../../../shared/helpers/error-handler'

interface IVerifyOtp {
  otp: string
  authForm: UseFormReturnType<IAuthForm>
}
export interface ThunkExtraArgs {
  navigate?: (to: To, options?: NavigateOptions) => void
}

export interface ThunkConfig<T> {
  rejectValue: T
  extra: ThunkExtraArgs
}

const setupRecaptcha = (phoneNumber: string) => {
  const recaptcha = new RecaptchaVerifier(auth, 'sign-in-button', {
    size: 'invisible',
  })

  return signInWithPhoneNumber(auth, phoneNumber, recaptcha)
}
let confirmObj: ConfirmationResult
export const sendSmsCode = createAsyncThunk<void, string, ThunkConfig<string>>(
  'sendSmsCode',
  async (phoneNumber: string, thunkApi) => {
    const { rejectWithValue } = thunkApi

    try {
      confirmObj = await setupRecaptcha(phoneNumber)
    } catch (e) {
      rejectWithValue(thunkErrorHandler(e))
    }
  }
)

export const verifyOtp = createAsyncThunk<
  void,
  IVerifyOtp,
  ThunkConfig<string>
>('verifyOtp', async (data: IVerifyOtp, thunkApi) => {
  const { rejectWithValue, extra } = thunkApi
  const { otp, authForm } = data
  try {
    const resUser = await confirmObj.confirm(otp)
    const user = await getDataFromFirebaseByField(
      EDatabasePaths.users,
      'id',
      resUser.user.uid
    )
    if (!user) {
      await createFirebaseUser(resUser)
    }
    authForm.reset()
    extra.navigate?.(RoutePath.main)
  } catch (e) {
    rejectWithValue(thunkErrorHandler(e))
  }
})
