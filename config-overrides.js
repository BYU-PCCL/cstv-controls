module.exports = function override(config, env) {
  return { ...config, resolve: { ...config.resolve, symlinks: false } };
};
