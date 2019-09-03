module.exports = function(api) {
  const plugins = [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-private-methods',
    '@babel/plugin-proposal-do-expressions',
    '@babel/plugin-proposal-optional-chaining',
    ['@babel/plugin-proposal-pipeline-operator', {proposal: 'smart'}]
  ]

  plugins.push(
    ['module-resolver', {
      root: ['.'],
      alias: {
        '@root': '.',
        '@src': './src',
        '@test_support': './test/support'
      },
      transformFunctions: [
        'require',
        'require.resolve',
        'System.import',
        'readFileSync',
        'reload',
        'assertResolvesUsingBA'
      ]
    }]
  )

  api.cache(true)

  return {
    presets: [['@babel/preset-env', {targets: {node: 'current'}}]],
    plugins
  }
}
