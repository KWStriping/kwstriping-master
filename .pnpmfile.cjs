// @ts-check

/**
 * @param {{ name: string; version: string; dependencies: Record<string, string>; devDependencies: Record<string, string>; peerDependencies: Record<string, string>; }} pkg - the package
 */
function readPackage(pkg, context) {
  if (pkg.name === 'master') return pkg;
  if (pkg.peerDependencies && pkg.peerDependencies.react) {
    // fixes react error "Error: Invalid hook call."
    // with multiple copy of react in the node_modules folder
    context.log(`[${pkg.name}] Removing react as a peer dependency (https://bit.ly/3jmD8J6).`);
    delete pkg.peerDependencies.react;
  }
  if (pkg.dependencies && pkg.dependencies.react) {
    // fixes react error "Error: Invalid hook call."
    // with multiple copy of react in the node_modules folder
    context.log(`[${pkg.name}] Removing react as dependency (https://bit.ly/3jmD8J6).`);
    delete pkg.dependencies.react;
  }
  if (pkg.name.startsWith('@tempo/') && !pkg.name.includes('dashboard')) {
    if (pkg.peerDependencies) {
      // Prevent multiple copies of React when installing peer dependencies as dev dependencies.
      const devDependencies = Object.fromEntries(
        Object.entries(pkg.peerDependencies).filter(([key]) => {
          const pattern = /^react(-dom)?$/;
          return !pattern.test(key);
        })
      );
      pkg.devDependencies = {
        ...(pkg.devDependencies ?? {}),
        ...devDependencies,
      };
    }
  }
  return pkg;
}

const enforceSingleVersion = [
  '@apollo/client',
  '@types/react',
  'graphql',
  'graphql-ws',
  'react',
  'react-dom',
];

function afterAllResolved(lockfile, context) {
  context.log(`Checking duplicate packages`);
  const packagesKeys = Object.keys(lockfile.packages);
  const found = {};
  for (let p of packagesKeys) {
    for (let x of enforceSingleVersion) {
      if (p.startsWith(`/${x}/`)) {
        if (found[x]) {
          found[x] += 1;
        } else {
          found[x] = 1;
        }
      }
    }
  }
  let msg = '';
  for (let p in found) {
    const count = found[p];
    if (count > 1) {
      msg += `${p} found ${count} times\n`;
    }
  }
  if (msg) {
    throw new Error(msg);
  }
  return lockfile;
}

module.exports = {
  hooks: {
    readPackage,
    afterAllResolved,
  },
};
