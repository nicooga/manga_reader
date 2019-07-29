module.exports = function(api) {
  api.cache(true)

  return {
    presets: [
      ['@babel/preset-env', {targets: {node: 'current'}}]
    ],
    plugins: [
      ['module-resolver', {
        root: ['.'],
        alias: {
          '@root': '.',
          '@src': './src',
          '@jest': './jest'
        }
      }],
      ["@babel/plugin-proposal-pipeline-operator", {proposal: "minimal"}]
    ]
  }
}
