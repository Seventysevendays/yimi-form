/*
 * @author: xuxiang
 * @description: description
 * @Date: 2020-07-16 20:51:33
 * @LastEditors: xuxiang
 * @LastEditTime: 2020-08-18 21:10:05
 */
"use strict"

const path = require('path')
const fs = require('fs')


const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = relativePath => path.resolve(appDirectory, relativePath)

module.exports = {
  resolveApp,
  packageJson: resolveApp("package.json"),
  testDocs: resolveApp('testDocs'),
  appSrc: resolveApp('src'),
  appBuild: resolveApp('dist'),
  appDir: appDirectory,
  tsconfigJson: resolveApp('tsconfig.json'),
  libConfig: resolveApp('libConfig'),
  testDir: resolveApp('test'),
  testSetup: resolveApp('test/setupTests.js')
}
