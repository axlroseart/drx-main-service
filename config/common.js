const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const paths = require('./path');

const { src, build, publicSrc } = paths;

module.exports = {
  entry: [`${src}/root.tsx`],
  output: {
    path: build,
    filename: '[name].[hash].js',
    publicPath: '/',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: publicSrc,
          to: 'assets',
          globOptions: {
            ignore: ['*.DS_Store'],
          },
          noErrorOnMissing: true,
        },
      ],
    }),
    new HtmlWebpackPlugin({
      title: 'drx-main-server micro fe',
      favicon: 'favicon.ico',
      template: `${src}/index.ejs`,
      filename: 'index.html', // output file
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)?$/,
        use: [{
          loader: 'babel-loader',
        }],
        exclude: /(node_modules)/,
      },
    ]
  },
  resolve: {
    modules: [src, 'node_modules'],
    extensions: ['.ts', '.tsx', '.json', '.js', '.css', '.scss'],
    alias: {
      '@': src,
      assets: publicSrc,
    }
  },
  devServer: {
    historyApiFallback: true,
    open: false,
    port: 8080
  }
}