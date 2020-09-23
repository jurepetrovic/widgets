const webpackDevConfig = require('./webpack.dev.config');
const webpackProdConfig = require('./webpack.prod.config');

module.exports = (env) => {
  return env && env.production ? webpackProdConfig : webpackDevConfig;
};
