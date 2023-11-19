import { t } from 'i18next'
import * as Yup from 'yup'

export const AUTH_SCHEMA = Yup.object().shape({
  phone: Yup.string().min(11, t('auth.enterPhoneNumber')),
})
