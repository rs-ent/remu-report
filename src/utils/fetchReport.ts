import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

export interface NewsItem {
  title: string;
  url: string;
}

export interface SectionData {
  type: string;
  title: string;
  subtitle?: string;
  level: number; // 계층 레벨 추가
  content?: string;
  photos?: string[];
  backgroundImage? : string;
  ctaText?: string;
  ctaLink?: string;
  videoUrl?: string;
  headers?: string[];
  rows?: (string | number)[][];
  imageLeft?: boolean;
  newsItems?: NewsItem[];
  data?: { name: string; score: number }[];
  notation?: string; // 차트 데이터 키
}

export interface ReportData {
  id: string;
  artist_eng: string;
  artist_kor: string;
  title: string;
  sub_title: string;
  image_alpha: string;
  background: string | null;
  gallery: string[] | null;
  macro_marketGrowth_comment: string | null;
  macro_marketGrowthDetail_comment: string | null;
  circlechart_target: string | null;
  melon_artist_id: string | null;
  meso_circlechart_comment: string | null;
  micro: {
    pastSections: SectionData[];
  };
}

export const fetchReportById = async (artist_eng: string): Promise<ReportData | null> => {
  const reportCollection = collection(db, 'Report');
  const querySnapshot = await getDocs(reportCollection);
  let report: ReportData | null = null;

  querySnapshot.forEach((doc) => {
    const docData = doc.data();
    if (docData.artist_eng === artist_eng) {
      report = {
        id: doc.id,
        artist_eng: docData.artist_eng,
        artist_kor: docData.artist_kor,
        title: docData.title,
        sub_title: docData.sub_title,
        image_alpha: docData.image_alpha,
        background: docData.background || null,
        gallery: docData.gallery || null,
        macro_marketGrowth_comment: docData.macro_marketGrowth_comment || null,
        macro_marketGrowthDetail_comment: docData.macro_marketGrowthDetail_comment || null,
        circlechart_target: docData.circlechart_target || null,
        melon_artist_id: docData.melon_artist_id || null,
        meso_circlechart_comment: docData.meso_circlechart_comment || null,
        micro: {
          pastSections: docData.micro?.pastSections || [],
        },
      };
    }
  });

  return report;
};

export const fetchReportData = async (): Promise<ReportData[]> => {
  const reportCollection = collection(db, 'Report');
  const querySnapshot = await getDocs(reportCollection);
  const data: ReportData[] = [];

  querySnapshot.forEach((doc) => {
    const docData = doc.data();
    data.push({
      id: doc.id,
      artist_eng: docData.artist_eng || '',
      artist_kor: docData.artist_kor || '',
      title: docData.title || 'IPO REPORT',
      sub_title: docData.sub_title || 'IPO 리포트',
      image_alpha: docData.image_alpha || '',
      background: docData.background || null,
      gallery: docData.gallery || null,
      macro_marketGrowth_comment: docData.macro_marketGrowth_comment || null,
      macro_marketGrowthDetail_comment: docData.macro_marketGrowthDetail_comment || null,
      circlechart_target: docData.circlechart_target || null,
      melon_artist_id: docData.melon_artist_id || null,
      meso_circlechart_comment: docData.meso_circlechart_comment || null,
      
      micro: {
        pastSections: docData.micro?.pastSections || [],
      },
    });
  });

  return data;
};

export const updateReportField = async (artist_eng: string, field: string, value: any): Promise<void> => {
    const reportCollection = collection(db, 'Report');
    const querySnapshot = await getDocs(reportCollection);
  
    let reportId: string | null = null;
  
    querySnapshot.forEach((docSnap) => {
      const docData = docSnap.data();
      if (docData.artist_eng === artist_eng) {
        reportId = docSnap.id;
      }
    });
  
    if (reportId) {
      const reportRef = doc(db, 'Report', reportId);
      await updateDoc(reportRef, {
        [field]: value,
      });
    } else {
      throw new Error('Report not found');
    }
};

