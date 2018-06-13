const webpack = require('webpack')
const path = require('path')
const nodeExternals = require('webpack-node-externals')
const StartServerPlugin = require('start-server-webpack-plugin')

module.exports = {
  entry: ['webpack/hot/poll?1000', './src/server'],
  watch: true,
  target: 'node',
  node: {
    __filename: true,
    __dirname: true,
  },
  externals: [nodeExternals({ whitelist: ['webpack/hot/poll?1000'] })],
  module: {
    rules: [
      {
        test: /\.js?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              presets: [
                'es2015',
                'stage-0',
                ['env', { modules: false, target: { node: '8.9.3' } }],
              ],
              plugins: [
                'lodash',
                [
                  'module-resolver',
                  {
                    alias: {
                      api: './src',
                    },
                  },
                ],
                'transform-regenerator',
                'transform-runtime',
              ],
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new StartServerPlugin('server.js'),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': { BUILD_TARGET: JSON.stringify('server') },
    }),
  ],
  output: { path: path.join(__dirname, 'dist'), filename: 'server.js' },
}
