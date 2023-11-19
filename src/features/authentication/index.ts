export type { IAuthForm, IInitialAuthState, IPhoneFormProps } from './model/types/types';
export { STEP_AUTH_MAPPER } from './model/auth-step';
export { EAuthStep } from './model/types/types';
export { verificationByGithub } from './model/services/verification-by-github';
export { authActions, authReducer } from './model/slice/auth-slice';
export { INITIAL_VALUES } from './model/const/initial-values';
export { AUTH_SCHEMA } from './model/const/validation-schema';
