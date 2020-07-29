const path = require('path')
const resolveFrom = require('resolve-from')
const webpack = require('webpack')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const webpackDevClientEntry = require.resolve(
  'react-dev-utils/webpackHotDevClient'
)

const paths = require('react-scripts/config/paths')

const fastRefresh = config => {
  if (process.env.NODE_ENV === 'development') {
    config.entry = paths.appIndexJs

    config.plugins.push(
      new ReactRefreshWebpackPlugin({
        overlay: {
          // entry: webpackDevClientEntry,
        },
      })
    )

    const babelLoaderRule = config.module.rules
      .find(x => Array.isArray(x.oneOf))
      .oneOf.find(
        x =>
          x.loader &&
          x.loader.includes('babel-loader') &&
          x.include &&
          x.include.includes(paths.appSrc)
      )

    babelLoaderRule.options = babelLoaderRule.options || {}
    babelLoaderRule.options.plugins = babelLoaderRule.options.plugins || []
    babelLoaderRule.options.plugins.push(
      require.resolve('react-refresh/babel')
    )
  }

  return config
}

const fixLinkedDependencies = config => {
  config.resolve = {
    ...config.resolve,
    alias: {
      ...config.resolve.alias,
      react$: resolveFrom(path.resolve('node_modules'), 'react'),
      'react-dom$': resolveFrom(path.resolve('node_modules'), 'react-dom'),
    },
  }
  return config
}

const includeSrcDirectory = config => {
  config.resolve = {
    ...config.resolve,
    modules: [path.resolve('src'), ...config.resolve.modules],
  }
  return config
}

module.exports = [
  ['use-babel-config', '.babelrc'],
  ['use-eslint-config', '.eslintrc'],
  fastRefresh,
  fixLinkedDependencies,
  // includeSrcDirectory,
]
