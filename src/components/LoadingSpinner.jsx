import React from 'react';

const LoadingSpinner = ({ size = 'md', color = 'text-blue-600' }) => {
  const sizes = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className="flex items-center justify-center p-4">
      <div className={`${sizes[size]} border-4 border-gray-200 border-t-current rounded-full animate-spin ${color}`} />
    </div>
  );
};

export default LoadingSpinner;
