// @remove-file-on-eject
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


const fs = require('fs');
const chalk = require('chalk');
const paths = require('./paths');

module.exports = (resolve, rootDir) => {
  // Use this instead of `paths.testsSetup` to avoid putting
  // an absolute filename into configuration after ejecting.
  const setupTestsFile = fs.existsSync(paths.testSetup) ? '<rootDir>/test/setupTests.js' : undefined;

  // TODO: I don't know if it's safe or not to just use / as path separator
  // in Jest configs. We need help from somebody with Windows to determine this.
  const config = {
    collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.d.ts'],
    coverageDirectory: 'coverage',
    setupFiles: [resolve('lib/polyfills.js')],
    setupFilesAfterEnv: [setupTestsFile],
    testMatch: [
      '<rootDir>/test/**/__tests__/**/*.{ts,tsx}',
      '<rootDir>/test/**/?(*.)(spec|test).{ts,tsx}',
    ],
    testEnvironment: 'node',
    testURL: 'http://localhost',
    transform: {
      '^.+\\.(ts|tsx)$': resolve('lib/jest/babelTransform.js'),
      '^.+\\.css$': resolve('lib/jest/cssTransform.js'),
      '^(?!.*\\.(js|jsx|mjs|css|json)$)': resolve('lib/jest/fileTransform.js'),
    },
    transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs)$'],
    moduleFileExtensions: [
      'js',
      'ts',
      'tsx'
    ],
    // globals: {
    //   'ts-jest': {
    //     tsConfigFile: paths.appTsTestConfig,
    //   },
    // },
  };
  if (rootDir) {
    config.rootDir = rootDir;
  }
  const overrides = Object.assign({}, require(paths.packageJson).jest);
  const supportedKeys = [
    'collectCoverageFrom',
    'coverageReporters',
    'coverageThreshold',
    'snapshotSerializers',
  ];
  if (overrides) {
    supportedKeys.forEach((key) => {
      if (overrides.hasOwnProperty(key)) {
        config[key] = overrides[key];
        delete overrides[key];
      }
    });
    const unsupportedKeys = Object.keys(overrides);
    if (unsupportedKeys.length) {
      console.error(chalk.red(`${'Out of the box, Create React App only supports overriding ' +
        'these Jest options:\n\n'}${
        supportedKeys.map(key => chalk.bold(`  \u2022 ${key}`)).join('\n')
        }.\n\n` +
        'These options in your package.json Jest configuration ' +
        `are not currently supported by Create React App:\n\n${
        unsupportedKeys
          .map(key => chalk.bold(`  \u2022 ${key}`))
          .join('\n')
        }\n\nIf you wish to override other Jest options, you need to ` +
        `eject from the default setup. You can do so by running ${
        chalk.bold('npm run eject')
        } but remember that this is a one-way operation. ` +
        'You may also file an issue with Create React App to discuss ' +
        'supporting more options out of the box.\n'));
      process.exit(1);
    }
  }
  return config;
};
