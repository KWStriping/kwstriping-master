function readPackage(pkg) {
  pkg.dependencies = {
    // ...pkg.peerDependencies,
    ...pkg.dependencies,
  };
  // pkg.peerDependencies = {};

  return pkg;
}

module.exports = {
  hooks: {
    readPackage,
  },
};
