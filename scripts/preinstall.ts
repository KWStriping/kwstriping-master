import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import type { PackageJson } from 'type-fest';
import isEqual from 'lodash-es/isEqual';
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import { diff } from 'deep-object-diff';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenvExpand.expand(dotenv.config({ path: resolve(__dirname, '../.env') }));

const APP = process.env.APP;
const ROOT_DIR = process.env.ROOT_DIR;

export function generateApp(app = APP) {
  const appDir = `${ROOT_DIR}/apps/${app}`;
  if (!fs.existsSync(appDir)) fs.mkdirSync(appDir);
}

export function generatePackageJson(app = APP) {
  if (!app) return;

  const packageJsonPath = `${ROOT_DIR}/apps/${app}/package.json`;

  // TODO
  if (!fs.existsSync(packageJsonPath)) {
    console.log(`${packageJsonPath} does not exist.`);
    return;
  }

  // Read the package.json file synchronously
  const packageJson: PackageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

  const localDependencies = Object.keys(packageJson.dependencies ?? {}).filter((packageName) =>
    /^@tempo\/(?!dashboard).*/.test(packageName)
  );
  // console.log('Local dependencies', localDependencies);

  let peerDependenciesFromLocalPackages: Partial<Record<string, string>> = {};
  for (const localDep of localDependencies) {
    const dependencyPackageJsonPath = `${ROOT_DIR}/${localDep}/package.json`;
    const dependencyPackageJson: PackageJson = JSON.parse(
      fs.readFileSync(dependencyPackageJsonPath, 'utf8')
    );
    const peerDeps = dependencyPackageJson.peerDependencies ?? {};
    peerDependenciesFromLocalPackages = {
      ...peerDependenciesFromLocalPackages,
      ...peerDeps,
    };
  }
  // console.log(peerDependenciesFromLocalPackages);

  const allDependencies = {
    ...packageJson.dependencies,
    ...peerDependenciesFromLocalPackages,
  };

  const sortedDependencies: PackageJson['dependencies'] = {};
  for (const key of Object.keys(allDependencies).sort()) {
    sortedDependencies[key] = allDependencies[key];
  }

  if (isEqual(packageJson.dependencies, sortedDependencies)) return;

  console.log(diff(packageJson.dependencies ?? {}, sortedDependencies));

  packageJson.dependencies = sortedDependencies;

  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  console.warn(`Modified package.json at ${packageJsonPath} to include required dependencies.`);
  console.log('Run `pnpm install` again to install packages.');
  process.exit(1);
}

export default function main() {
  generatePackageJson();
}

main();
