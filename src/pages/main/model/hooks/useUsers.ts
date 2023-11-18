import { UseFormReturnType } from '@mantine/form';
import { DocumentData } from 'firebase/firestore';
import { useEffect, useState, useCallback } from 'react';
import {
  EDatabasePaths,
  ICreateUserFirebase,
  getAllDataFromFirebase,
} from '../../../../shared/helpers/firebase-helpers';
import { IFormFilterValues } from '../config/types';
import { filterUsers } from '../utils/utils';
import { USER_COUNT } from '../config/initialValues';

export const useUsers = (form: UseFormReturnType<IFormFilterValues>) => {
  const [users, setUsers] = useState<DocumentData[]>([]);
  const [lastUser, setLastUser] = useState<ICreateUserFirebase | null>(null);
  const [userCount] = useState<number>(USER_COUNT);

  const fetchUsers = useCallback(
    async (startAfter: ICreateUserFirebase | null) => {
      const newUsers = await getAllDataFromFirebase<ICreateUserFirebase>(
        EDatabasePaths.users,
        userCount,
        'id',
        startAfter,
      );
      if (newUsers.length > 0) {
        setLastUser(newUsers[newUsers.length - 1]);
        setUsers((prevUsers) => [...prevUsers, ...newUsers]);
      }
    },
    [userCount],
  );

  useEffect(() => {
    fetchUsers(lastUser);
  }, [lastUser, fetchUsers]);

  const resetSearchInput = async () => {
    form.reset();
    try {
      const res = await getAllDataFromFirebase<ICreateUserFirebase>(
        EDatabasePaths.users,
        userCount,
        'id',
      );
      setUsers(res);
      setLastUser(res[res.length - 1]);
    } catch (e) {
      console.error(e);
    }
  };
  const handleSearchInput = async () => {
    const { fullname, nickname, phonenumber } = form.values;
    const filteredUsers = await filterUsers(nickname, fullname, phonenumber);
    if (!filteredUsers) {
      setUsers([]);
      return;
    }
    setUsers([...filteredUsers]);
  };
  const loadMoreUsers = async () => {
    await fetchUsers(lastUser);
  };
  return { users, resetSearchInput, handleSearchInput, loadMoreUsers };
};
