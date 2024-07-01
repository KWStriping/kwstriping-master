import fs from 'fs';
import { execSync } from 'child_process';
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import mergePatch from 'json-merge-patch';
import baseTsConfig from '../tsconfig.base.json';

dotenvExpand.expand(dotenv.config());
const APP = process.env.APP;

function generateTsConfig() {
  const outputFile = 'tsconfig.json';
  const tsConfig = baseTsConfig;
  if (APP) {
    const newPaths = {
      "@paraglide/*": [`apps/${APP}/paraglide/*`],
    };
    newPaths[`@${APP}/*`] = [`apps/${APP}/*`];
    tsConfig.compilerOptions.paths = {
      ...tsConfig.compilerOptions.paths,
      ...newPaths,
    };
  }
  fs.writeFileSync(outputFile, JSON.stringify(tsConfig, null, 2));
}

function generateMessages() {
  if (!APP) {
    console.error('APP is not defined.');
    return;
  }
  const files = [`apps/${APP}/messages/en.json`, `@tempo/next/messages/common.json`];
  const output = `apps/${APP}/paraglide/generated/en.json`;

  const merged = files
    .map((file) => {
      const fileContents = fs.readFileSync(file, 'utf8');
      return JSON.parse(fileContents);
    })
    .reduce((a, b) => mergePatch.apply(a, b));

  const sorted = Object.fromEntries(Object.entries(merged).sort());

  fs.writeFileSync(output, JSON.stringify(sorted, null, 2));

  // stderr is sent to stderr of parent process
  // you can set options.stdio if you want it to go elsewhere
  const stdout = execSync(
    `paraglide-js compile --project apps/${APP}/paraglide/${APP}.inlang --outdir apps/${APP}/paraglide`
  );
  console.log(stdout.toString());
}

function main() {
  generateTsConfig();
  generateMessages();
}

main();
