const path = require("path");
// const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // ? https://webpack.js.org/plugins/mini-css-extract-plugin/
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // ? https://github.com/johnagan/clean-webpack-plugin
const TerserPlugin = require("terser-webpack-plugin"); // ? https://webpack.js.org/plugins/terser-webpack-plugin/
// TODO-->
// const HtmlWebpackPlugin = require('html=webpack-plugin') //? https://habr.com/ru/articles/524260/
// TODO <--

module.exports = {
  mode: "production",
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
        use: ["style-loader", "css-loader"], //! Для продакшна следует использовать MiniCssExtractPlugin вместо style-loader
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".json"],
  },
  plugins: [
    // new MiniCssExtractPlugin({
    //   filename: "styles.css", // Имя выходного файла для стилей
    // }),
    new CleanWebpackPlugin(), //! При новой сборке удаляется всё, что больше не используется
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({ //! Оптимизация итогового бандла
        terserOptions: {
          format: {
            comments: false,
          },
        },
      }),
    ],

    usedExports: true, //! Активирует Tree Shaking,
    //! далее в package.json написать "sideEffects": false (только если нет побочных эфектов)

    // splitChunks: {
    //   chunks: "all", //! Webpack автоматически разделяет код на чанки
    //! по логическим границам (чанки загружаются по надобности)
    // },
  },
};
