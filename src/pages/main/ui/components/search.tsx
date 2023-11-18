import { UseFormReturnType } from '@mantine/form';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Flex, TextInput } from '@mantine/core';
import { IconSearch, IconX } from '@tabler/icons-react';
import { IFormFilterValues } from '../../model/config/types';

interface ISearchProps {
  form: UseFormReturnType<IFormFilterValues>;
  handleSearchInput: () => void;
  resetSearchInput: () => void;
}

const Search: FC<ISearchProps> = ({ form, handleSearchInput, resetSearchInput }) => {
  const { t } = useTranslation();
  const isDirtyForm = form.isDirty();
  return (
    <>
      <Flex gap="md">
        <TextInput
          label={t('main.filters.phonenumber')}
          placeholder={t('main.filters.phonenumberPlaceholder')}
          {...form.getInputProps('phonenumber')}
        />
        <TextInput
          label={t('main.filters.fullName')}
          {...form.getInputProps('fullname')}
        />
        <TextInput
          label={t('main.filters.nickname')}
          {...form.getInputProps('nickname')}
        />
      </Flex>
      <Flex gap="md" mt={'md'}>
        <Button
          leftSection={<IconSearch size="15px" />}
          onClick={handleSearchInput}
          disabled={!isDirtyForm}
        >
          {t('main.filters.actions.search')}
        </Button>
        <Button
          variant="outline"
          leftSection={<IconX size="15px" />}
          onClick={resetSearchInput}
        >
          {t('main.filters.actions.reset')}
        </Button>
      </Flex>
    </>
  );
};

export default Search;
