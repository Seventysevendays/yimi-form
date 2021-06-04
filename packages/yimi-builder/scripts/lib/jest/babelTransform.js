'use strict'

const babelJest = require('babel-jest')
const babelConfig = require('../babelConfig')

module.exports = babelJest.createTransformer(babelConfig)