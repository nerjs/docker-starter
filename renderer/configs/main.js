const webpack = require('webpack')
const DotEnv = require('dotenv-webpack')
const path = require('path')

const config = {
  context: path.join(__dirname, '..', 'src'),
  entry: {
    main: './main.js',
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, '..', 'dist'),
  },

  devtool: false,

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
    }),
    new DotEnv(),
  ],

  externals: {
    electron: "require('electron')",
    path: "require('path')",
  },
}

if (process.env.NODE_ENV !== 'production') {
  config.module.rules[0].use[0].options.plugins.push([
    'babel-plugin-styled-components',
    {
      // displayName: true,
      fileName: true,
    },
  ])
}

module.exports = config
