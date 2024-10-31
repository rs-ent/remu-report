
import React, { useState, useEffect, useRef } from 'react';
import { useReportContext } from '../context/ReportContext';
import { ReportData } from '../utils/fetchReport';

interface AnalystCommentProps {
    commentKey: keyof ReportData;
}

const AnalystComment: React.FC<AnalystCommentProps> = ({ commentKey }) => {
    const { report, updateReportFieldInContext } = useReportContext(); // context에서 report와 업데이트 함수 가져오기
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>('');
    const commentRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        if (report && report[commentKey]) {
          setInputValue(report[commentKey] as string);
        }
    }, [report, commentKey]);

    const handleSaveComment = async () => {
        updateReportFieldInContext(commentKey, inputValue); // context의 함수로 Firestore 업데이트
        setIsEditing(false); // 편집 모드 종료
    };

    const handleCancel = () => {
        setInputValue(report ? (report[commentKey] as string) : ''); // 원래 값으로 되돌리기
        setIsEditing(false);
    };

    return (
        <div className="mt-4">
          {inputValue || isEditing ? (
            isEditing ? (
              <div>
                <textarea
                  className="w-full h-32 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
                <div className="flex justify-end space-x-2 mt-2">
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
                  >
                    취소
                  </button>
                  <button
                    onClick={handleSaveComment}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                  >
                    저장
                  </button>
                </div>
              </div>
            ) : (
              <p
                ref={commentRef}
                tabIndex={0}
                className="text-base text-gray-700 cursor-pointer focus:outline-none"
                onDoubleClick={() => setIsEditing(true)}
              >
                {inputValue}
              </p>
            )
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              코멘트 추가
            </button>
          )}
        </div>
    );
  };
  
  export default AnalystComment;