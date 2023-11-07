import { UseFormReturnType } from '@mantine/form'

export enum EAuthStep {
  NUMBER_INPUT = 'number_input',
  VALIDATING_OTP = 'validation_otp',
}

export interface IInitialAuthState {
  selectedStep: EAuthStep
  isLoading: boolean
  error: string
  isSuccess: boolean
  isLoggedIn: boolean
}

export interface IAuthForm {
  phone: string
  otp: string
}

export interface IPhoneFormProps {
  form: UseFormReturnType<IAuthForm>
}
