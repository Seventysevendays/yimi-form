/*
 * @author: xuxiang
 * @description: description
 * @Date: 2020-07-16 17:11:56
 * @LastEditors: xuxiang
 * @LastEditTime: 2020-07-21 16:20:02
 */

"use strict"

process.env.NODE_ENV = "development";
process.env.BABEL_ENV = "development";

const paths = require('./lib/paths')
const webpack = require('webpack')
const getConfig = require('./lib/webpack.config')
const createDevServerConfig = require("./lib/webpackDevServer");
const WebpackDevServer = require("webpack-dev-server");
const openBrowser = require("react-dev-utils/openBrowser");
const chalk = require("chalk");



const {
  choosePort,
  createCompiler,
  prepareUrls
} = require("react-dev-utils/WebpackDevServerUtils");

const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 1024;
const HOST = process.env.HOST || "0.0.0.0";
const options = {
  dev: true
}

choosePort(HOST, DEFAULT_PORT)
  .then(port => {
    const protocol = process.env.HTTPS === "true" ? "https" : "http";
    const urls = prepareUrls(protocol, HOST, port);
    const appName = require(paths.packageJson).name
    const config = getConfig(options)
    const compiler = createCompiler({ webpack, config, appName, urls });
    const serverConfig = createDevServerConfig(
      urls.lanUrlForConfig,
      config.output.publicPath
    );
    const devServer = new WebpackDevServer(compiler, serverConfig);
    devServer.listen(port, HOST, err => {
      console.error(err)
      openBrowser(urls.localUrlForBrowser)
    })
  })
  .catch(err => {
    if (err && err.message) {
      console.error(chalk.red(err.message));
    }
  });
