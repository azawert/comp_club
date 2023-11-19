import { DocumentData, collection, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '../../../../shared/config/firebase/firebase';

export const filterUsers = async (
  nickname: string,
  fullname: string,
  phoneNumber: string,
): Promise<DocumentData[] | null> => {
  const collectionRef = collection(firestore, 'users');

  let q = query(collectionRef);

  if (nickname) {
    q = query(collectionRef, where('nickname', '==', nickname));
  }

  if (fullname) {
    q = query(collectionRef, where('fullname', '==', fullname));
  }

  if (phoneNumber) {
    q = query(collectionRef, where('phonenumber', '==', phoneNumber));
  }

  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    return null;
  }

  const data: DocumentData[] = querySnapshot.docs.map((doc) => doc.data());

  return data;
};
