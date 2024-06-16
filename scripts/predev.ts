import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import kill from 'kill-port';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenvExpand.expand(dotenv.config({ path: resolve(__dirname, '../.env') }));

async function killPort() {
  const PORT_FRONT = process.env.PORT_FRONT as string;
  if (!PORT_FRONT) throw new Error('PORT_FRONT is not defined');
  await kill(PORT_FRONT, 'tcp').then(console.log).catch(console.log);
}

killPort();
