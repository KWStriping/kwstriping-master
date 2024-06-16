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

module.exports = {
  hooks: {
    readPackage,
  },
};
