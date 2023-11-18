import { FC, useCallback, useMemo } from 'react';
import { Table, Badge, Flex } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { DocumentData } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from '../../../../shared/config/route/route-config';
import { HEAD_ROWS } from '../../model/config/initialValues';

interface tableProps {
  users?: DocumentData[] | null;
}

const TableUsers: FC<tableProps> = ({ users }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const handleNavigateToProfile = useCallback(
    (id: string) => {
      navigate(`${RoutePath.profile}`.replace(':id', id));
    },
    [navigate],
  );
  const headRowsPrepared = useMemo(() => {
    return HEAD_ROWS.map((row) => (
      <Table.Th key={row}>
        <Flex>{t(`main.table.${row}`)}</Flex>
      </Table.Th>
    ));
  }, [t]);
  const rows = useMemo(() => {
    return users?.map((element) => (
      <Table.Tr key={element.id} onClick={() => handleNavigateToProfile(element.id)}>
        <Table.Td>{element.fullname}</Table.Td>
        <Table.Td>{element.nickname}</Table.Td>
        <Table.Td>{element.email}</Table.Td>
        <Table.Td>{element.phonenumber}</Table.Td>
        <Table.Td>
          <Badge>{element.role}</Badge>
        </Table.Td>
        <Table.Td>{element.balance}</Table.Td>
      </Table.Tr>
    ));
  }, [users, handleNavigateToProfile]);
  return (
    <Table withRowBorders={false} mt="lg" highlightOnHover>
      <Table.Thead>
        <Table.Tr>{headRowsPrepared}</Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
};

export default TableUsers;
