'use client';

import dynamic from 'next/dynamic';

const DynamicScript = dynamic(() => import('./script'), { ssr: false });

function Request() {
  return (
    <>
      <div className="h-full w-full bg-white/75 p-10">
        <div id="d431a370-fedc-47f9-ae28-8d1eefde995b"></div>
        <DynamicScript />
      </div>
    </>
  );
}

export default Request;
