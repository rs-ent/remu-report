import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase';

export interface AutoCommentData {
    comment_openai: string;
    detail_comment_openai: string;
}

export const fetchAutoComments = async (): Promise<AutoCommentData | null> => {
    const autoCommentsCollection = collection(db, 'AutoComments');
    
    try {
        const autoCommentsSnapshot = await getDocs(
            query(autoCommentsCollection, orderBy("timestamp", "desc"), limit(1))
        );

        // 최신 AutoComment가 있을 경우 데이터를 반환
        if (!autoCommentsSnapshot.empty) {
            const latestCommentDoc = autoCommentsSnapshot.docs[0];
            const commentData = latestCommentDoc.data().comments;
            return {
                comment_openai: commentData.comment_openai,
                detail_comment_openai: commentData.detail_comment_openai,
            };
        } else {
            console.warn("No AutoComments found.");
            return null;
        }
    } catch (error) {
        console.error("Failed to fetch the latest AutoComment:", error);
        return null;
    }
};