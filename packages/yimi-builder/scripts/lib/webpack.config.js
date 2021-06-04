/*
 * @author: xuxiang
 * @description: description
 * @Date: 2020-07-20 10:18:02
 * @LastEditors: xuxiang
 * @LastEditTime: 2021-01-07 21:23:41
 */

const { getDocEntry } = require("./getDocEntry");
const path = require("path");
const autoprefixer = require("autoprefixer");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const paths = require("./paths");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CompileDonePlugin = require("./compileDonePlugin");
const publicPath = "/";
const babelLoaderOptions = require("./babelConfig");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

module.exports = (options) => {
  const isDevMode = options.dev && process.env.NODE_ENV !== "production";
  const devOutput = {
    // 添加在 require() 处添加 /* 文件名 */ 注释
    pathinfo: true,
    // 构建目录
    filename: "static/js/[name].js",
    // chunk 名
    chunkFilename: "static/js/[name].chunk.js",
    publicPath,
    // TODO: 处理 sourceMap 源路径
    devtoolModuleFilenameTemplate: (info) =>
      path
        .relative(paths.appSrc, info.absoluteResourcePath)
        .replace(/\\/g, "/"),
  };
  const config = {
    mode: process.env.NODE_ENV,
    entry: isDevMode ? getDocEntry(paths.testDocs) : "src/index.ts",
    output: isDevMode
      ? devOutput
      : {
          libraryTarget: "umd",
          filename: "main.umd.js",
        },
    resolve: {
      extensions: [".mjs", ".js", ".json", ".jsx", ".tsx", ".ts", ".less"],
      plugins: [
        // resolve tsconfig paths
        new TsconfigPathsPlugin({ configFile: paths.tsconfigJson }),
      ],
      alias: {
        // resolve hooks problem
        react: path.resolve("./node_modules/react"),
      },
    },
    // devtool: "source-map",
    module: {
      rules: [
        {
          oneOf: [
            {
              test: /\.(js|jsx|mjs)$/,
              loader: require.resolve("babel-loader"),
              include: paths.appSrc,
              options: babelLoaderOptions,
            },
            {
              test: /\.(tsx|ts)$/,
              loader: require.resolve("ts-loader"),
              options: {
                // disable type checker - we will use it in fork plugin
                // transpileOnly: true,
              },
              exclude: [paths.testDir],
            },
            {
              test: /\.(html|htm|tpl)$/,
              loader: require.resolve("html-loader"),
            },
            // 加载 css
            {
              test: /\.css$/,
              use: [
                // MiniCssExtractPlugin.loader,
                require.resolve("style-loader"),
                {
                  loader: require.resolve("css-loader"),
                  options: {
                    importLoaders: 1,
                  },
                },
                {
                  loader: require.resolve("postcss-loader"),
                  options: {
                    ident: "postcss",
                    plugins: () => [
                      require("postcss-flexbugs-fixes"),
                      autoprefixer({
                        flexbox: "no-2009",
                      }),
                    ],
                  },
                },
              ],
            },
            {
              test: /\.less$/,
              use: [
                // MiniCssExtractPlugin.loader,
                require.resolve("style-loader"),
                {
                  loader: require.resolve("css-loader"),
                  options: {
                    importLoaders: 1,
                  },
                },
                {
                  loader: require.resolve("postcss-loader"),
                  options: {
                    ident: "postcss",
                    plugins: () => [
                      require("postcss-flexbugs-fixes"),
                      autoprefixer({
                        flexbox: "no-2009",
                      }),
                    ],
                  },
                },
                {
                  loader: require.resolve("less-loader"),
                  options: {
                    lessOptions: {
                      javascriptEnabled: true,
                    },
                  },
                },
              ],
            },
            {
              test: /testDocs[/\\].+\.mdx$/,
              use: [
                {
                  loader: require.resolve("babel-loader"),
                  options: babelLoaderOptions,
                },
                {
                  loader: require.resolve("./docLoader.js"),
                },
              ],
            },
            {
              exclude: [/\.(js|jsx|mjs|ts|tsx)$/, /\.html$/, /\.json$/],
              loader: require.resolve("file-loader"),
              options: {
                name: "static/media/[name].[hash:8].[ext]",
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new CompileDonePlugin(),
      // new MiniCssExtractPlugin(),
      // new ForkTsCheckerWebpackPlugin(),
    ],
    performance: {
      hints: false,
    },
  };
  return config;
};
