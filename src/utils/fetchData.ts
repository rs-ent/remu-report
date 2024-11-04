import { collection, getDocs, query, where, DocumentData } from 'firebase/firestore';
import { db } from '../firebase';

// 일반화된 페칭 함수
export const fetchDataByField = async <T>(collectionName: string, field: string, value: string): Promise<T[]> => {
    const col = collection(db, collectionName);
    const q = query(col, where(field, '==', value));
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => {
    const data = doc.data() as DocumentData;
    return data as T;
    });
};