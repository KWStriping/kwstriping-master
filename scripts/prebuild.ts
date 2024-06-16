import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenvExpand.expand(dotenv.config({ path: resolve(__dirname, '../.env') }));

async function checkApiUrl() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL as string;
  if (!API_URL) throw new Error('NEXT_PUBLIC_API_URL is not defined');
  let apiUrl: URL;
  try {
    apiUrl = new URL(API_URL);
  } catch (err) {
    throw new Error(`NEXT_PUBLIC_API_URL is not a valid URL: ${API_URL}`);
  }
  const res = await fetch(apiUrl, { method: 'GET' }).catch((err) => {
    console.error(err);
    throw new Error(`Failed to fetch from ${API_URL}`);
  });
  if (!res.ok) {
    console.error(res);
    throw new Error(`API_URL is not reachable: ${API_URL}`);
  }
}

checkApiUrl();
