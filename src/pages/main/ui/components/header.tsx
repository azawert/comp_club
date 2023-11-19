import { Text } from '@mantine/core';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

interface IHeaderProps {
  count?: number;
}

const Header: FC<IHeaderProps> = ({ count }) => {
  const { t } = useTranslation();
  return (
    <>
      <Text size="xl">{t('main.client')}</Text>
      <Text>
        {t('main.amount')} {count}
      </Text>
    </>
  );
};

export default Header;
