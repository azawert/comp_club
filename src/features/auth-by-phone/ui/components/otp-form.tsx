import { useEffect, useState } from 'react';
import { Button, Center, Flex, PinInput, Space } from '@mantine/core';
import { IconArrowBack } from '@tabler/icons-react';
import { useAppDispatch } from '../../../../shared/hooks/useAppDispatch';
import {
  EAuthStep,
  IPhoneFormProps,
  authActions,
  sendSmsCode,
  verifyOtp,
} from '../../../../pages/auth';
import { useTranslation } from 'react-i18next';
import { useInterval } from '@mantine/hooks';

const otpInputValueLength = 6;
const oneMinuteInSeconds = 60;

export const OtpForm = ({ form }: IPhoneFormProps) => {
  const [seconds, setSeconds] = useState(oneMinuteInSeconds);

  const interval = useInterval(() => setSeconds((s) => s - 1), 1000);

  const isTimeIsUp = seconds === 0;

  useEffect(() => {
    interval.start();
    if (isTimeIsUp) {
      interval.stop();
    }
    return interval.stop;
  }, [interval, isTimeIsUp]);

  const dispatch = useAppDispatch();

  const { t } = useTranslation();

  const { setSelectedStep } = authActions;

  const handleInputChange = (value: string) => {
    form.setFieldValue('otp', value);
    if (value.length === otpInputValueLength) {
      dispatch(verifyOtp({ otp: value, authForm: form }));
    }
  };

  const handleClickBackArrow = () => {
    dispatch(setSelectedStep(EAuthStep.NUMBER_INPUT));
  };

  return (
    <form onSubmit={form.onSubmit((values) => sendSmsCode(values.phone))}>
      <Center>
        <Flex direction="column" align="center">
          <PinInput
            length={otpInputValueLength}
            value={form.values.otp}
            onChange={handleInputChange}
          />
          <Space h="md" />
          <Flex align="center" justify="space-between" w="100%">
            <Button size="sm" radius="lg" onClick={handleClickBackArrow}>
              <IconArrowBack />
            </Button>
            <Button size="sm" radius="lg" disabled={!isTimeIsUp} type="submit">
              {seconds} {t('auth.sendSmsAgain')}
            </Button>
          </Flex>
        </Flex>
      </Center>
    </form>
  );
};
