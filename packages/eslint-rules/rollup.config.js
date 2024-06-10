import * as fs from 'fs';
import typescript from '@rollup/plugin-typescript';

const rulesSrcDir = './src/rules';
const tsFiles = fs.readdirSync(rulesSrcDir).filter((f) => f.endsWith('.ts'));
const jsFiles = fs.readdirSync(rulesSrcDir).filter((f) => f.endsWith('.js'));
const rulesDistDir = './dist/rules';

export default [
  ...tsFiles.map((filename) => ({
    input: `./src/rules/${filename}`,
    output: [
      {
        dir: rulesDistDir,
        format: 'es',
        sourcemap: true,
      },
    ],
    plugins: [
      typescript({
        tsconfig: './tsconfig.json',
        noEmit: false,
        outDir: rulesDistDir,
      }),
    ],
  })),
  ...jsFiles.map((filename) => ({
    input: `./src/rules/${filename}`,
    output: [
      {
        dir: rulesDistDir,
        format: 'es',
        sourcemap: true,
      },
    ],
  })),
];
