const webpack = require('webpack')
const path = require('path')
const fs = require('fs')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin')
const TerserPlugin = require('terser-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const WebpackLicensePlugin = require('webpack-license-plugin')
const ReactRefreshPlugin = require('@webhotelier/webpack-fast-refresh')
const { ModuleFederationPlugin } = require('webpack').container

// TODO:
//    set up with browserlist

const { NODE_ENV } = process.env
const isProductionBuild = NODE_ENV === 'production'
const isProductionBuildWithProfiling =
  isProductionBuild && process.argv.includes('--profile')

// resolve paths relative to where the webpack process is invoked
// (usually, this is the project root)
const resolveApp = (...relativePaths) =>
  path.resolve(fs.realpathSync(process.cwd()), ...relativePaths)

module.exports = {
  mode: NODE_ENV !== undefined ? NODE_ENV : 'development',
  entry: [
    !isProductionBuild && '@webhotelier/webpack-fast-refresh/runtime.js',
    resolveApp('src/index.ts'),
  ].filter(Boolean),
  output: {
    path: isProductionBuild ? resolveApp('dist') : undefined,
    publicPath: '/',
    filename: isProductionBuild
      ? 'static/js/[name].[contenthash:8].js'
      : 'static/js/bundle.js',
    chunkFilename: isProductionBuild
      ? 'static/js/[name].[contenthash:8].chunk.js'
      : 'static/js/[name].chunk.js',
    // point sourcemap entries to original disk location
    // (format as URL on windows)
    devtoolModuleFilenameTemplate: isProductionBuild
      ? (info) =>
          resolveApp('src', info.absoluteResourcePath).replace(/\\/g, '/')
      : (info) => path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
  },
  bail: isProductionBuild,
  devtool: isProductionBuild ? 'source-map' : 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 3000,
    hot: true,
    hotOnly: true,
    headers: {
      'X-Custom-Foo': 'bar',
    },
  },
  module: {
    rules: [
      // Disable require.ensure as it's not a standard language feature.
      { parser: { requireContext: false } },
      // First, run the linter.
      // It's important to do this before Babel processes the JS.
      {
        enforce: 'pre',
        test: /\.(ts|tsx)$/,
        include: resolveApp('src'),
        loader: 'eslint-loader',
        options: {
          cache: true,
          ignore: true,
        },
      },
      {
        // "oneOf" will traverse all following loaders until one will
        // match the requirements. When no loader matches it will fall
        // back to the "file" loader at the end of the loader list.
        oneOf: [
          // "url" loader works like "file" loader except that it embeds assets
          // smaller than specified limit in bytes as data URLs to avoid requests.
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
          // Process application JS with Babel.
          // The preset includes JSX, Flow, TypeScript, and some ESnext features.
          {
            test: /\.(js|mjs|jsx|ts|tsx)$/,
            include: resolveApp('src'),
            use: [
              {
                loader: 'babel-loader',
                options: {
                  compact: isProductionBuild,
                  // The following options are options of babel-loader
                  // (not babel itself). They enable caching results in
                  // ./node_modules/.cache/babel-loader/ for faster rebuilds.
                  cacheDirectory: true,
                  cacheCompression: false,
                },
              },
              !isProductionBuild &&
                '@webhotelier/webpack-fast-refresh/loader.js',
            ].filter(Boolean),
          },
          // "file" loader makes sure those assets get served by WebpackDevServer.
          // When you `import` an asset, you get its (virtual) filename.
          // In production, they would get copied to the `build` folder.
          // This loader doesn't use a "test" so it will catch all modules
          // that fall through the other loaders.
          {
            loader: require.resolve('file-loader'),
            exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
            options: {
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    // where webpack will search when resolving modules. node_modules comes
    // first because it should "win" in case of conflict.
    // the second entry matches the `baseUrl` in tsconfig.json.
    modules: ['node_modules', resolveApp('src')],
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      // Allows for better profiling with the react developer tools
      // https://gist.github.com/bvaughn/25e6233aeb1b4f0cdb8d8366e54a3977#webpack-4
      ...(isProductionBuildWithProfiling && {
        'react-dom$': 'react-dom/profiling',
        'scheduler/tracing': 'scheduler/tracing-profiling',
      }),
      // webpack module alias
      src: resolveApp('src'),
    },
    plugins: [
      new ModuleScopePlugin(resolveApp('src'), [resolveApp('package.json')]),
    ],
  },
  optimization: {
    minimize: isProductionBuild,
    minimizer: [
      new TerserPlugin({
        sourceMap: true,
        extractComments: false,
        terserOptions: {
          comments: false,
          toplevel: true,
          parse: { ecma: 2020 },
          keep_classnames: isProductionBuildWithProfiling,
          keep_fnames: isProductionBuildWithProfiling,
        },
      }),
    ],
    // TODO:
    //    test after module federation works! might also use name: false
    // splitChunks: {
    //   chunks: 'all',
    //   name: false,
    // },
    // runtimeChunk: {
    //   name: (entrypoint) => `runtime-${entrypoint.name}`,
    // },
  },
  plugins: [
    // module federation
    new ModuleFederationPlugin({
      name: 'host',
      remotes: {
        remoteA: 'remoteA@http://localhost:3001/remoteEntry.js',
        remoteB: 'remoteB@http://localhost:3002/remoteEntry.js',
      },
      shared: {
        react: { singleton: true, requiredVersion: '^16.3.1' },
      },
    }),
    // cleans output folder for production builds (which are written to disk)
    isProductionBuild && new CleanWebpackPlugin(),
    // generates an `index.html` file with <script> tags injected
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: isProductionBuild
        ? {
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true,
          }
        : {},
    }),
    // performs typescript type checking in a separate process
    new ForkTsCheckerWebpackPlugin(),
    // perform open source license analysis in production
    isProductionBuild && new WebpackLicensePlugin(),
    // perform hot module replacement and react refresh in development
    !isProductionBuild && new webpack.HotModuleReplacementPlugin(),
    !isProductionBuild && new ReactRefreshPlugin(),
  ].filter(Boolean),
  // define chunk size limits
  performance: {
    hints: isProductionBuild ? 'error' : false,
    maxAssetSize: 250 * 1024,
  },
}
