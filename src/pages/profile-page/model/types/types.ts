import { ERoles } from '../../../../shared/helpers/firebase-helpers';

export interface IProfileFormValues {
  phonenumber: string;
  email: string;
  nickname: string;
  role: ERoles;
  id: string;
}
