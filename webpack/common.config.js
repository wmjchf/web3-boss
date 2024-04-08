/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const webpack = require("webpack");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

/** @type {import('webpack').Configuration} */
const config = {
  entry: path.resolve("src/index.tsx"),
  output: {
    filename: "js/[name].[contenthash:8].js",
    path: path.resolve("dist"),
    publicPath: "/",
  },
  resolve: {
    extensions: [".ts", ".tsx", "..."],
    alias: {
      "@": path.resolve("src"),
    },
    fallback: {
      crypto: require.resolve("crypto-browserify"),
      stream: require.resolve("stream-browserify"),
      vm: require.resolve("vm-browserify"),
    },
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: "babel-loader",
          },
        ],
      },
      {
        test: /\.css/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
          },
          {
            loader: "postcss-loader",
          },
        ],
      },
      {
        test: /\.less/,

        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[path]__[name]__[local]",
              },
            },
          },
          {
            loader: "postcss-loader",
          },
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif|svg|docx)$/,
        type: "asset",
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: "process",
      Buffer: ["buffer", "Buffer"],
    }),
    new HtmlWebpackPlugin({
      title: "FlowIn3",
      template: path.resolve("public/index.html"),
      favicon: path.resolve("public/favicon.ico"),
    }),
    new MiniCssExtractPlugin({
      filename: "css/[contenthash].[name].css",
    }),
    new CleanWebpackPlugin(),
    new BundleAnalyzerPlugin(),
  ],
  optimization: {
    minimizer: [
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminGenerate,
          options: {
            plugins: [
              ["gifsicle", { interlaced: true }],
              ["jpegtran", { progressive: true }],
              ["optipng", { optimizationLevel: 5 }],
              [
                "svgo",
                {
                  plugins: [
                    "preset-default",
                    "prefixIds",
                    {
                      name: "sortAttrs",
                      params: {
                        xmlnsOrder: "alphabetical",
                      },
                    },
                  ],
                },
              ],
            ],
          },
        },
      }),
    ],

    splitChunks: {
      chunks: "all", // 可选值：all，async 和 initial。all功能最强大，所以咱们就使用all
      maxInitialRequests: Infinity, // 最大并行请求数，为了以防万一，设置无穷大即可
      minSize: 20000, // 引入的模块大于20kb才做代码分割，官方默认20000，这里不用修改了
      maxSize: 60000, // 若引入的模块大于60kb，则告诉webpack尝试再进行拆分
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/, // 使用正则匹配node_modules中引入的模块
          priority: -10, // 优先级值越大优先级越高，默认-10，不用修改
          name(module) {
            const match = module.context.match(
              /[\\/]node_modules[\\/](.*?)([\\/]|$)/
            );
            if (!match) return "";
            // 设定分包以后的文件模块名字，按照包名字替换拼接一下
            const packageName = module.context.match(
              /[\\/]node_modules[\\/](.*?)([\\/]|$)/
            )[1];
            return `npm.${packageName.replace("@", "")}`;
          },
        },
      },
    },
  },
};

module.exports = config;
