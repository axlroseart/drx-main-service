import CopyWebpackPlugin from 'copy-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import paths from './path'

const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');

const { src, build, publicSrc } = paths

export const entry = [`${src}/index.tsx`]
export const output = {
  path: build,
  filename: '[name].bundle.js',
  publicPath: '/'
}
export const plugins = [
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
]

const sassLoadConfig = [
  {
    loader: 'css-loader',
    options: {
      sourceMap: false,
    },
  },
  {
    loader: 'postcss-loader',
    options: {
      plugins: () => {
        const plugin = [autoprefixer(), pxtorem({
          rootValue: 100,
          propList: [
            '*',
            '!min-width',
            '!border',
            '!border-left',
            '!border-right',
            '!border-top',
            '!border-bottom',
          ],
          selectorBlackList: [
            'no_rem',
          ],
        })];
        return plugin;
      },
    },
  },
  {
    loader: 'sass-loader',
    options: {
    },
  },
];

export const module = {
  rules: [
    {
      test: /\.scss$/,
      exclude: /node_modules/,
      use: sassLoadConfig,
    },
    {
      test: /\.(jpe?g|png|gif|svg)$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'url-loader',
          options: {
            emitFile: true,
            limit: 3 * 1024,
            name: 'images/[name]__[hash:5].[ext]',
            publicPath: publicSrc,
          },
        },
      ],
    },
    {
      test: /\.(woff|woff2|eot|ttf|mp3|mp4)$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: 'assets/[name]__[hash:5].[ext]',
            publicPath: publicSrc,
          },
        },
      ],
    },
    {
      test: /\.(ts|tsx)?$/,
      use: [{
        loader: 'babel-loader',
      }],
      exclude: /(node_modules)/,
    },
  ]
}

export const resolve = {
  modules: [src, 'node_modules'],
  extensions: ['.ts', '.tsx', '.json', '.js', '.css', '.scss'],
  alias: {
    '@': src,
    assets: publicSrc,
  }
}