import { ERoles } from '../../../../shared/helpers/firebase-helpers';
import { IProfileFormValues } from '../types/types';

export const INITIAL_VALUES: IProfileFormValues = {
  email: '',
  id: '',
  nickname: '',
  phonenumber: '',
  role: ERoles.USER,
};
