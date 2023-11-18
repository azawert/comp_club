import { Button, Center, Flex, Space, Text } from '@mantine/core';
import { IconBrandGithub, IconBrandGoogle } from '@tabler/icons-react';
import { PhoneInput } from 'react-international-phone';

import { useAppDispatch } from '../../../../shared/hooks/useAppDispatch';
import { t } from 'i18next';
import { formatPhoneNumberForValidation } from '../../../../shared/helpers/format-phone-number';

import { useSelector } from 'react-redux';
import { IStateSchema } from '../../../../app/provider/store';
import { IPhoneFormProps } from '../../model/types/types';
import { sendSmsCode } from '../../model/services/verification-by-phone';
import { verificationByGoogle } from '../../model/services/verification-by-google';
import { verificationByGithub } from '../..';

export const PhoneForm = ({ form }: IPhoneFormProps) => {
  const dispatch = useAppDispatch();

  const { isLoading } = useSelector((state: IStateSchema) => state.auth);

  const phoneNumber = formatPhoneNumberForValidation(form.values.phone);

  const isPhoneNumberHaveValidLength = phoneNumber.length < 11;

  const handleSendSms = () => {
    dispatch(sendSmsCode(form.values.phone));
  };

  const handleContinueWithGoogle = () => {
    dispatch(verificationByGoogle());
  };

  const handleContinueWithGithub = () => {
    dispatch(verificationByGithub());
  };

  return (
    <>
      <Center>
        <Flex direction="column">
          <PhoneInput defaultCountry="ru" {...form.getInputProps('phone')} />
          {form.errors.phone && (
            <Text size="sm" c="red">
              {form.errors.phone}
            </Text>
          )}
        </Flex>
      </Center>

      <Space h="md" />
      <Center>
        <Button
          type="submit"
          loading={isLoading}
          id="sign-in-button"
          onClick={handleSendSms}
          disabled={isPhoneNumberHaveValidLength}
        >
          {t('auth.sendSms')}
        </Button>
      </Center>
      <Space h="md" />
      <Flex justify={'space-around'}>
        <Button
          color="gray"
          leftSection={<IconBrandGoogle />}
          onClick={handleContinueWithGoogle}
        >
          {t('auth.continueWithGoogle')}
        </Button>

        <Button
          color="rgba(13, 13, 13, 1)"
          leftSection={<IconBrandGithub />}
          onClick={handleContinueWithGithub}
        >
          {t('auth.continueWithGithub')}
        </Button>
      </Flex>
    </>
  );
};
