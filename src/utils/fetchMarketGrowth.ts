import { collection, getDocs, QuerySnapshot, DocumentData} from 'firebase/firestore';
import { db } from '../firebase';

export interface MarketGrowthData {
    id: string;
    company: string;
    date: string;
    sales: number;
    sales_music: number;
    sales_contents: number;
    sales_management: number;
}

export const fetchMarketGrowthData = async (): Promise<MarketGrowthData[]> => {
    const marketGrowthCollection = collection(db, 'MarketGrowth');
    const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(marketGrowthCollection);
    const data: MarketGrowthData[] = [];

    querySnapshot.forEach((doc) => {
        const docData = doc.data();
        data.push({
            id: doc.id,
            company: docData.company,
            date: docData.date.toString(),
            sales: docData.sales,
            sales_contents: docData.sales_contents,
            sales_music: docData.sales_music,
            sales_management: docData.sales_management
        });
    });

    return data;
};