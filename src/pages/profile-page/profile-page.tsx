import { FC, useEffect } from 'react';
import { useForm } from '@mantine/form';
import { Button, TextInput } from '@mantine/core';
import {
  EDatabasePaths,
  ERoles,
  updateDataInFirebase,
} from '../../shared/helpers/firebase-helpers';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { IProfileFormValues } from './model/types/types';
import { INITIAL_VALUES } from './model/config/initialValues';
import { fetchUserData } from './model/services/getUserData';
import { useAppDispatch } from 'src/shared/hooks/useAppDispatch';
import { IStateSchema } from 'src/app/provider/store';

const ProfilePage: FC = () => {
  const dispatch = useAppDispatch();

  const { t } = useTranslation();

  const params = useParams();

  const { id } = params;

  const form = useForm<IProfileFormValues>({
    initialValues: INITIAL_VALUES,
  });

  const { user } = useSelector((state: IStateSchema) => state.auth);

  useEffect(() => {
    if (!id) {
      return;
    }

    dispatch(fetchUserData({ id, form }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, dispatch]);

  const handleSumbit = async (values: IProfileFormValues) => {
    await updateDataInFirebase(EDatabasePaths.users, values);
  };

  const isAdmin = user?.role === ERoles.ADMIN;

  return (
    <form onSubmit={form.onSubmit((val) => handleSumbit(val))}>
      <TextInput
        label={t('profile.fullname')}
        placeholder={t('profile.fullnamePlaceholder')}
        disabled={!isAdmin}
        {...form.getInputProps('nickname')}
      />
      <TextInput
        label={t('profile.email')}
        placeholder={t('profile.emailPlaceholder')}
        disabled={!isAdmin}
        {...form.getInputProps('email')}
      />
      <TextInput
        label={t('profile.phonenumber')}
        placeholder={t('profile.phonePlaceholder')}
        disabled={!isAdmin}
        {...form.getInputProps('phonenumber')}
      />

      {isAdmin && (
        <Button mt="xl" type="submit">
          {t('profile.saveChanges')}
        </Button>
      )}
    </form>
  );
};

export default ProfilePage;
