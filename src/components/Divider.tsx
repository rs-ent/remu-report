import React from 'react';

interface DividerProps {
  opacity?: number; // opacity 조절 (0.0 ~ 1.0)
  marginTop?: string; // 위쪽 간격
  marginBottom?: string; // 아래쪽 간격
  color?: string; // divider의 색상
}

const Divider: React.FC<DividerProps> = ({ 
  opacity = 1, 
  marginTop = '1rem', 
  marginBottom = '1rem', 
  color = 'gray-300' 
}) => {
  return (
    <hr 
      style={{ 
        opacity, 
        marginTop, 
        marginBottom 
      }} 
      className={`border-t border-${color}`} 
    />
  );
};

export default Divider;
