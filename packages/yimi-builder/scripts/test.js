"use strict"

process.env.BABEL_ENV = 'test'
process.env.NODE_ENV = 'test'
process.env.PUBLIC_URL = ''
const path = require('path')
const jest = require('jest')
const paths = require('./lib/paths')
const argv = process.argv.slice(3) // skip 'test'

process.on('unhandledRejection', err => {
  throw err
})


const createJestConfig = require('./lib/createJestConfig')
argv.push(
  '--config',
  JSON.stringify(
    createJestConfig(
      relativePath => path.resolve(__dirname, relativePath),
      paths.appDir
    )
  )
)

// argv.push('--watchAll')
argv.push('--coverage')
argv.push('--testEnvironment=jsdom')

jest.run(argv)