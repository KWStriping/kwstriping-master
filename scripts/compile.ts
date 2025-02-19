import fs from 'fs';
import { execSync } from 'child_process';
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import mergePatch from 'json-merge-patch';

dotenvExpand.expand(dotenv.config());
const APP = process.env.APP;
const ROOT_DIR = process.env.ROOT_DIR;
const SRC_DIR = `${process.env.ROOT_DIR}/src`;

if (!fs.existsSync(SRC_DIR)) {
  throw new Error(`${SRC_DIR} does not exist.`);
}

function generateMessages() {
  if (!APP) {
    console.error('APP is not defined.');
    return;
  }
  const messagesDir = `${ROOT_DIR}/messages`;
  const inlangDir = `${ROOT_DIR}/project.inlang`;
  if (!fs.existsSync(messagesDir)) fs.mkdirSync(messagesDir);
  if (!fs.existsSync(inlangDir)) fs.mkdirSync(inlangDir);
  const files = [`${messagesDir}/en.json`, `${SRC_DIR}/@tempo/next/messages/common.json`];
  const paraglideDir = `${SRC_DIR}/paraglide`;
  const output = `${messagesDir}/generated/en.json`;
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
  const stdout = execSync(`paraglide-js compile --project ${inlangDir} --outdir ${paraglideDir}`);
  console.log(stdout.toString());
  const gitIgnoreFilepath = `${paraglideDir}/.gitignore`;
  if (fs.existsSync(gitIgnoreFilepath)) {
    fs.unlinkSync(gitIgnoreFilepath);
  } else {
    console.log(`No .gitignore found in ${paraglideDir}.`);
  }
}

export default function main() {
  // if (APP && ROOT_DIR) {
  //   if (!fs.existsSync(`${ROOT_DIR}/.env`)) {
  //     fs.symlinkSync(`${ROOT_DIR}/.env`, `${ROOT_DIR}/.env`, 'file');
  //   }
  // }
  // generateTsConfig();
  generateMessages();
}

main();
