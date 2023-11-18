import { Button, Center, Flex, Space, Text, TextInput } from '@mantine/core';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { useAppDispatch } from '../../../../shared/hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import { IStateSchema } from '../../../../app/provider/store';
import { IPhoneFormProps } from '../../model/types/types';
import { createNicknameAndUser } from '../../model/services/verification-by-phone';

const NicknameForm: FC<IPhoneFormProps> = ({ form }) => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const handleCreateNicknameClick = () => {
    dispatch(createNicknameAndUser({ authForm: form, nickname: form.values.nickname }));
  };

  const { error } = useSelector((state: IStateSchema) => state.auth);
  return (
    <Center>
      <Flex direction="column" align="center">
        <TextInput label={t('auth.enterNickname')} {...form.getInputProps('nickname')} />
        {error && (
          <Text size="sm" c="red">
            {error}
          </Text>
        )}
        <Space h="md" />
        <Flex align="center" justify="space-between" w="100%">
          <Button
            size="sm"
            radius="lg"
            disabled={!form.values.nickname}
            onClick={handleCreateNicknameClick}
          >
            {t('auth.continueWithYourNickname')}
          </Button>
        </Flex>
      </Flex>
    </Center>
  );
};

export default NicknameForm;
