const webpack = require('webpack')
const path = require('path')

const config = require('../config')

const webpackConfig = {
  context: path.join(__dirname, 'src'),
  entry: {
    main: './main.js',
    graphiql: './graphiql.js',
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'dist'),
  },

  devtool: false,

  optimization: {
    noEmitOnErrors: true,
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    targets: {
                      browsers: 'last 3 versions',
                    },
                  },
                ],
                '@babel/preset-react',
              ],
              plugins: [
                '@babel/plugin-proposal-class-properties',
                '@babel/plugin-proposal-object-rest-spread',
                [
                  '@babel/plugin-transform-runtime',
                  {
                    useESModules: false,
                    helpers: false,
                  },
                ],
              ],
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      CONFIG: JSON.stringify(config),
    }),
  ],

  externals: ({ request }, callback) => {
    if (request.startsWith('.')) return callback()
    return callback(null, `commonjs ${request}`)
  },
}

if (process.env.NODE_ENV !== 'production') {
  webpackConfig.module.rules[0].use[0].options.plugins.push([
    'babel-plugin-styled-components',
    {
      displayName: true,
      fileName: true,
    },
  ])
}

module.exports = webpackConfig
