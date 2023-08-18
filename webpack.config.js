const path = require("path");
// TODO-->
// const HtmlWebpackPlugin = require('html=webpack-plugin') //? https://habr.com/ru/articles/524260/
// const { CleanWebpackPlugin } = require('clean-webpack-plugin') //? https://github.com/johnagan/clean-webpack-plugin
// const TerserPlugin = require('terser-webpack-plugin'); //? https://webpack.js.org/plugins/terser-webpack-plugin/
// TODO <--

module.exports = {
  mode: "development",
  entry: "./src/index.jsx", // входная точка - исходный файл
  output: {
    path: path.resolve(__dirname, "./public"), // путь к каталогу выходных файлов - папка public
    publicPath: "/public/",
    filename: "bundle.js", // название создаваемого файла
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
  // resolve: { //? Resolve Paths
  //     alias: {
  //       '@components': path.resolve(__dirname, 'src/components')
  //!      Заменяет "../../components/Button" на "@components/Button"
  //     },
  //   },

  // plugins: [
  //     new CleanWebpackPlugin(), //! При новой сборке удаляется всё, что больше не используется
  // ],

  // optimization: {
  //     minimize: true,
  //     minimizer: [
  //         new TerserPlugin({ //! Оптимизация итогового бандла
  //             terserOptions: {
  //                 format: {
  //                     comments: false,
  //                 },
  //             },
  //         }),
  //     ],

  //     splitChunks: {
  //         chunks: 'all', //! Webpack автоматически разделяет код на чанки
  //! по логическим границам (чанки загружаются по надобности)
  //     },

  //     usedExports: true, //! Активирует Tree Shaking,
  //! далее в package.json написать "sideEffects": false (только если нет побочных эфектов)
  // },
  // TODO <--
};
