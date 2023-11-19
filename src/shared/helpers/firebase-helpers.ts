import { User } from 'firebase/auth';
import {
  collection,
  addDoc,
  query,
  getDocs,
  where,
  DocumentData,
  orderBy,
  startAfter,
  limit,
  updateDoc,
  UpdateData,
} from 'firebase/firestore';
import { firestore } from '../config/firebase/firebase';
import { EFierbaseOrderBy, EFirebaseParams } from '../config/const/params';

export enum ERoles {
  ADMIN = 'ADMIN',
  USER = 'USER',
}
export enum EDatabasePaths {
  users = 'users',
}

export interface ICreateUserFirebase {
  id: string;
  email?: string;
  phonenumber?: string;
  role: ERoles;
  fullname?: string;
  nickname?: string;
  balance?: string;
}

export const setFirebaseUser = async (
  path: EDatabasePaths,
  entitieToCreate: ICreateUserFirebase & { nickname?: string },
) => {
  const collectionToAdd = collection(firestore, path);
  const response = await addDoc(collectionToAdd, entitieToCreate);

  return response;
};

export const getDataFromFirebaseByField = async <
  T extends { id: string; nickname: string; fullname: string },
>(
  path: EDatabasePaths,
  findByField: keyof T & string = 'id',
  valueToFind: string,
): Promise<DocumentData[] | null> => {
  const collectionRef = collection(firestore, path);

  const q = query(collectionRef, where(findByField, '==', valueToFind));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    return null;
  }

  const data: T[] = querySnapshot.docs.map((doc) => doc.data() as T);

  return data;
};

export const getAllDataFromFirebase = async <T>(
  path: EDatabasePaths,
  limitNum: number,
  orderByField: keyof T & string,
  startAfterVal?: T | null,
): Promise<T[]> => {
  const collectionRef = collection(firestore, path);

  let q = query(
    collectionRef,
    orderBy(orderByField, EFierbaseOrderBy.ASC),
    limit(limitNum),
  );
  if (startAfterVal) {
    q = query(
      collectionRef,
      orderBy(orderByField, EFierbaseOrderBy.ASC),
      limit(limitNum),
      startAfter(startAfterVal[orderByField]),
    );
  }

  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    return [];
  }

  const data: T[] = querySnapshot.docs.map((doc) => doc.data() as T);
  return data;
};

export const updateDataInFirebase = async <T extends { id: string }>(
  path: EDatabasePaths,
  values: Partial<T>,
) => {
  if (!values.id) {
    return;
  }

  const collectionRef = collection(firestore, path);

  const q = query(collectionRef, where('id', EFirebaseParams.EQUALS, values.id));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    return;
  }

  const docRef = querySnapshot.docs[0].ref;

  await updateDoc(docRef, values as UpdateData<T>);
};

export const userMapping = (user: User & { nickname?: string }): ICreateUserFirebase => ({
  fullname: user.displayName ?? '',
  id: user.uid,
  phonenumber: user.phoneNumber ?? '',
  role: ERoles.USER,
  email: user.email ?? '',
  nickname: user.nickname,
  balance: '0',
});
