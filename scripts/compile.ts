import fs from 'fs';
import { execSync } from 'child_process';
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import mergePatch from 'json-merge-patch';
import baseTsConfig from '../tsconfig.base.json';

dotenvExpand.expand(dotenv.config());
const APP = process.env.APP;
const ROOT_DIR = process.env.ROOT_DIR;

function generateTsConfig() {
  const outputFile = 'tsconfig.json';
  const tsConfig = baseTsConfig;
  if (APP) {
    const newPaths = {
      '@paraglide/*': [`apps/${APP}/paraglide/*`],
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
  const appDir = `apps/${APP}`;
  const messagesDir = `${appDir}/messages`;
  const inlangDir = `${messagesDir}/${APP}.inlang`;
  const inlangSettingsFile = `${inlangDir}/settings.json`;
  if (!fs.existsSync(messagesDir)) fs.mkdirSync(messagesDir);
  if (!fs.existsSync(inlangDir)) fs.mkdirSync(inlangDir);
  if (!fs.existsSync(inlangSettingsFile)) {
    const inlangSettings = {
      $schema: 'https://inlang.com/schema/project-settings',
      sourceLanguageTag: 'en',
      languageTags: ['en'],
      modules: [
        'https://cdn.jsdelivr.net/npm/@inlang/message-lint-rule-empty-pattern@latest/dist/index.js',
        'https://cdn.jsdelivr.net/npm/@inlang/message-lint-rule-missing-translation@latest/dist/index.js',
        'https://cdn.jsdelivr.net/npm/@inlang/message-lint-rule-without-source@latest/dist/index.js',
        'https://cdn.jsdelivr.net/npm/@inlang/message-lint-rule-valid-js-identifier@latest/dist/index.js',
        'https://cdn.jsdelivr.net/npm/@inlang/plugin-message-format@latest/dist/index.js',
        'https://cdn.jsdelivr.net/npm/@inlang/plugin-m-function-matcher@latest/dist/index.js',
      ],
      'plugin.inlang.messageFormat': {
        pathPattern: `${ROOT_DIR}/apps/${APP}/paraglide/generated/{languageTag}.json`,
      },
    };
    fs.writeFileSync(`${inlangDir}/settings.json`, JSON.stringify(inlangSettings, null, 2));
  }

  const files = [`${messagesDir}/en.json`, `@tempo/next/messages/common.json`];
  const output = `${appDir}/paraglide/generated/en.json`;

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
    `paraglide-js compile --project ${inlangDir} --outdir apps/${APP}/paraglide`
  );
  console.log(stdout.toString());
}

export default function main() {
  if (APP && ROOT_DIR) {
    if (!fs.existsSync(`${ROOT_DIR}/apps/${APP}/.env`)) {
      fs.symlinkSync(`${ROOT_DIR}/.env`, `${ROOT_DIR}/apps/${APP}/.env`, 'file');
    }
  }
  generateTsConfig();
  generateMessages();
}

main();
