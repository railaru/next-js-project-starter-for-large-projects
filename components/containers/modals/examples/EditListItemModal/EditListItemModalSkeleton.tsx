import React from 'react';

function EditListModalSkeleton() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="h-[15px] w-[40px] bg-gray-200 rounded-lg dark:bg-gray-700"></div>
        <div className="h-[40px] bg-gray-200 rounded-lg dark:bg-gray-700"></div>
      </div>
      <div className="space-y-4">
        <div className="h-[15px] w-[40px] bg-gray-200 rounded-lg dark:bg-gray-700"></div>
        <div className="h-[40px] bg-gray-200 rounded-lg dark:bg-gray-700"></div>
      </div>
    </div>
  );
}

export default EditListModalSkeleton;
