'use client';

import dynamic from 'next/dynamic';

const DynamicScript = dynamic(() => import('./script'), { ssr: false });

function Request() {
  return (
    <>
      <div className="h-full flex justify-center items-center min-w-[50%] min-h-[20%] bg-white/75 p-10">
        <div className="h-full w-full flex flex-col items-center justify-center">
          <div id="d431a370-fedc-47f9-ae28-8d1eefde995b"></div>
          <DynamicScript />
        </div>
      </div>
    </>
  );
}

export default Request;
