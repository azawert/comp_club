import { UserCredential } from 'firebase/auth'
import { collection, addDoc, query, getDocs, where } from 'firebase/firestore'
import { firestore } from '../config/firebase/firebase'

export enum ERoles {
  ADMIN = 'ADMIN',
  USER = 'USER',
}
export enum EDatabasePaths {
  users = 'users',
}

export interface ICreateUserFirebase {
  id: string
  email?: string
  phonenumber?: string
  role: ERoles
  fullname?: string
}

export const createFirebaseUser = async (user: UserCredential) => {
  try {
    const userForCreation = userMapping(user)
    const collectionToAdd = collection(firestore, 'users')
    const response = await addDoc(collectionToAdd, userForCreation)
    return response
  } catch (e) {
    return e
  }
}

export const getDataFromFirebaseByField = async <T extends { id: string }>(
  path: EDatabasePaths,
  findByField: keyof T & string = 'id',
  valueToFind: string
) => {
  try {
    const collectionRef = collection(firestore, path)

    const q = query(collectionRef, where(findByField, '==', valueToFind))
    const querySnapshot = await getDocs(q)
    if (querySnapshot.empty) {
      return null
    }

    const data = querySnapshot.docs[0]
    return data.data()
  } catch (error) {
    return error
  }
}

const userMapping = (user: UserCredential): ICreateUserFirebase => ({
  fullname: user.user.displayName ?? '',
  id: user.user.uid,
  phonenumber: user.user.phoneNumber ?? '',
  role: ERoles.USER,
  email: user.user.email ?? '',
})
