const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
// TODO-->
// const HtmlWebpackPlugin = require("html=webpack-plugin"); // ? https://habr.com/ru/articles/524260/
// const { CleanWebpackPlugin } = require('clean-webpack-plugin') //? https://github.com/johnagan/clean-webpack-plugin
// const TerserPlugin = require('terser-webpack-plugin'); //? https://webpack.js.org/plugins/terser-webpack-plugin/
// TODO <--

module.exports = {
  mode: "development",
  entry: "./src/index.jsx", // входная точка - исходный файл
  output: {
    filename: "bundle.js",
    path: `${__dirname}/build`,
    chunkFilename: "[id].[chunkhash].js",
  },
  devServer: {
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, "/"),
    },
    port: 8081,
    open: true,
  },
  module: {
    rules: [ // загрузчик для jsx
      {
        test: /\.jsx?$/, // определяем тип файлов
        exclude: /(node_modules)/, // исключаем из обработки папку node_modules
        loader: "babel-loader", // определяем загрузчик
        options: {
          presets: ["@babel/preset-react"], // используемые плагины
        },
      },
      {
        test: /\.(scss|css)$/,
        use: ["style-loader", "css-loader"], //! Для продакшна следует использовать MiniCssExtractPlugin вместо style-loader https://webpack.js.org/plugins/mini-css-extract-plugin/
      },
    ],
  },
  // TODO -->
  resolve: {
    extensions: [".js", ".jsx", ".json"],
  },

  // TODO <--
};
