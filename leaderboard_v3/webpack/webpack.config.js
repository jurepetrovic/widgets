const webpackDevConfig = require('./webpack.dev.config');
const webpackProdConfig = require('./webpack.prod.config');

// default-theme is reserved
module.exports = (env) => {
  if (typeof process.env.THEME === "undefined" || (typeof process.env.THEME === "string" && process.env.THEME.length === 0)){
    process.env.THEME = "default-theme";
  }

  if (process.env && process.env.production) {
    return (process.env.production === "prod") ? webpackProdConfig : webpackDevConfig;
  } else {
    return webpackDevConfig; // default config
  }
};
