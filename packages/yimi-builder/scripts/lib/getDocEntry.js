/*
 * @author: xuxiang
 * @description: description
 * @Date: 2020-07-20 10:43:50
 * @LastEditors: xuxiang
 * @LastEditTime: 2020-07-21 16:26:59
 */

const glob = require('glob')
const path = require('path')



function getDocEntry(testDocs) {
  const demos = glob.sync('**/*.mdx', {
    cwd: testDocs
  })
  return demos.reduce((entry, mdFile) => {
    let key = path.join('testDocs', mdFile).replace(/\\+/g, '/')
    entry[key] = [
      // add little polyfills
      // require.resolve('./polyfills'),
      // add HMR
      // require.resolve('react-dev-utils/webpackHotDevClient'),
      // add *.md entry
      path.join(testDocs, mdFile)
    ]
    return entry
  }, {})
}

module.exports = {
  getDocEntry
}