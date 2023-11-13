import { User } from 'firebase/auth';
import {
  collection,
  addDoc,
  query,
  getDocs,
  where,
  DocumentData,
} from 'firebase/firestore';
import { firestore } from '../config/firebase/firebase';

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
  T extends { id: string; nickname: string },
>(
  path: EDatabasePaths,
  findByField: keyof T & string = 'id',
  valueToFind: string,
): Promise<DocumentData | null> => {
  const collectionRef = collection(firestore, path);

  const q = query(collectionRef, where(findByField, '==', valueToFind));
  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) {
    return null;
  }

  const data = querySnapshot.docs[0];
  return data.data();
};

export const userMapping = (user: User & { nickname?: string }): ICreateUserFirebase => ({
  fullname: user.displayName ?? '',
  id: user.uid,
  phonenumber: user.phoneNumber ?? '',
  role: ERoles.USER,
  email: user.email ?? '',
  nickname: user.nickname,
});
