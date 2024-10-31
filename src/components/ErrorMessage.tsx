import React from 'react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="flex items-center space-x-2 text-red-600">
      <span>{message}</span>
    </div>
  );
};

export default ErrorMessage;
