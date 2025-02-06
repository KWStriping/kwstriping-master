'use client';

import Layout from '@kwstriping/app/client/Layout';

function Request() {
  return (
    <Layout>
      <div className="h-full flex justify-center items-center min-w-[50%] min-h-[20%] bg-white/75 p-10">
        <div className="h-full w-full flex flex-col items-center justify-center">
          <div id="d431a370-fedc-47f9-ae28-8d1eefde995b"></div>
          <link
            rel="stylesheet"
            href="https://d3ey4dbjkt2f6s.cloudfront.net/assets/external/work_request_embed.css"
            media="screen"
          />
          <script
            src="https://d3ey4dbjkt2f6s.cloudfront.net/assets/static_link/work_request_embed_snippet.js"
            // eslint-disable-next-line
            clienthub_id="d431a370-fedc-47f9-ae28-8d1eefde995b"
            // eslint-disable-next-line
            form_url="https://clienthub.getjobber.com/client_hubs/d431a370-fedc-47f9-ae28-8d1eefde995b/public/work_request/embedded_work_request_form"
            async
          />
        </div>
      </div>
    </Layout>
  );
}

export default Request;
