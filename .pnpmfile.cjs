// @ts-check

/**
 * @param {{ name: string; version: string; dependencies: any; devDependencies: any; peerDependencies: any; }} pkg - the package
 */
function readPackage(pkg) {
  if (!pkg.name.startsWith('@tempo/') && !pkg.name.includes('dashboard')) return pkg;
  console.log(pkg.name);
  pkg.devDependencies = {
    ...(pkg.peerDependencies ?? {}),
    ...(pkg.devDependencies ?? {}),
  };
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
