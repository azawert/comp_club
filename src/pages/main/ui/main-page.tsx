import { Button } from '@mantine/core';
import { useForm } from '@mantine/form';
import { FC } from 'react';
import { useUsers } from '../model/hooks/useUsers';
import TableUsers from './components/table';
import Search from './components/search';
import Header from './components/header';
import { useTranslation } from 'react-i18next';
import { IFormFilterValues } from '../model/config/types';
import { INITIAL_VALUES } from '../model/config/initialValues';

export const MainPage: FC = () => {
  const form = useForm<IFormFilterValues>({
    initialValues: INITIAL_VALUES,
  });

  const { handleSearchInput, resetSearchInput, users, loadMoreUsers } = useUsers(form);

  const { t } = useTranslation();

  return (
    <div>
      <Header count={users?.length ?? 0} />
      <Search
        form={form}
        handleSearchInput={handleSearchInput}
        resetSearchInput={resetSearchInput}
      />
      <TableUsers users={users} />
      <Button onClick={loadMoreUsers}>{t('main.table.loadMore')}</Button>
    </div>
  );
};
