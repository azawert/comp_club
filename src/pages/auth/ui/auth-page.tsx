import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm, yupResolver } from '@mantine/form';
import { Center, Container, Flex, Paper, Space, Text } from '@mantine/core';
import { INITIAL_VALUES } from '../model/const/initial-values';
import { IAuthForm } from '../model/types/types';
import { AUTH_SCHEMA } from '../model/const/validation-schema';
import { STEP_AUTH_MAPPER } from '../../../features/auth-by-phone/const/auth-step';
import { useSelector } from 'react-redux';
import { IStateSchema } from '../../../app/provider/store';

export const AuthPage: FC = () => {
  const { selectedStep } = useSelector((state: IStateSchema) => state.auth);

  const { t } = useTranslation();
  const form = useForm<IAuthForm>({
    initialValues: INITIAL_VALUES,
    validate: yupResolver(AUTH_SCHEMA),
  });
  const StepComponent = STEP_AUTH_MAPPER[selectedStep];

  return (
    <Container size="sm" h={390}>
      <Flex align="center" justify="center">
        <Paper p="xl" shadow="xs" h="100%" w="75%">
          <Center>
            <Text size="xl">{t('Войдите')}</Text>
          </Center>
          <Space h="md" />
          <StepComponent form={form} />
        </Paper>
      </Flex>
    </Container>
  );
};
