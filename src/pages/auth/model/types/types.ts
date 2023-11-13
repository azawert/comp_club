import { UseFormReturnType } from '@mantine/form';
import { DocumentData } from 'firebase/firestore';

export enum EAuthStep {
  NUMBER_INPUT = 'number_input',
  VALIDATING_OTP = 'validation_otp',
  CREATING_NICKNAME = 'creating_nickname',
}

export interface IInitialAuthState {
  selectedStep: EAuthStep;
  isLoading: boolean;
  error: string;
  isLoggedIn: boolean;
  user: DocumentData | null;
}

export interface IAuthForm {
  phone: string;
  otp: string;
  nickname: string;
}

export interface IPhoneFormProps {
  form: UseFormReturnType<IAuthForm>;
}
