import { EAuthStep } from '../../../pages/auth'
import { PhoneForm } from '../ui/components/phone-form'
import { OtpForm } from '../ui/components/otp-form'

export const STEP_AUTH_MAPPER = {
  [EAuthStep.NUMBER_INPUT]: PhoneForm,
  [EAuthStep.VALIDATING_OTP]: OtpForm,
}
