/*
 * @author: xuxiang
 * @description: description
 * @Date: 2020-07-21 18:20:04
 * @LastEditors: xuxiang
 * @LastEditTime: 2020-07-21 21:02:04
 */
'use strict'

const fs = require('fs')
const rimraf = require('rimraf')
const mkdirp = require('mkdirp')

const exists = (file) => {
  try {
    return fs.statSync(file)
  } catch (err) {
    return false
  }
};

module.exports = {

  rmdir(dir, retry) {
    retry = retry > 0 ? (retry | 0) : 0

    return _rmdir(dir, retry)

    function _rmdir(dir, retry) {
      return new Promise((resolve, reject) => {
        rimraf(dir, err => {
          if (err) {
            if (retry >= 0) {
              // ignore error and try again
              setTimeout(() => {
                console.log('重试删除: dir = %s, retry = %s', dir, retry)
                retry--
                _rmdir(dir, retry).then(resolve, reject)
              }, 100)
            } else {
              reject(err)
            }
          } else {
            resolve()
          }
        })
      })
    }
  },
  rmdirSync(dir) {
    return rimraf.sync(dir)
  },
  mkdir(dir) {
    return new Promise((resolve, reject) => {
      if (!exists(dir)) {
        mkdirp(dir).then(() => resolve())
      } else {
        resolve()
      }
    })
  }
}