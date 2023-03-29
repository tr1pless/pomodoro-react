const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: path.resolve(__dirname, "./src/index.jsx"),
  output: {
    filename: "[name].bandle.[chunkhash].js",
    clean: true,
    path: path.resolve(__dirname, "./build"),
    environment: {
      arrowFunction: false,
    },
  },
  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      components: path.resolve(__dirname, "src/components/"),
      src: path.resolve(__dirname, "src"),
      store: path.resolve(__dirname, "src/store"),
    },
  },
  devServer: {
    compress: true,
    port: 8000,
    client: {
      logging: "info",
    },
    historyApiFallback: true,
  },
  devtool: "eval-source-map",
  module: {
    rules: [
      {
        test: /\.json$/,
        use: ["json-loader"],
        type: "javascript/auto",
      },
      {
        test: /\.(png|jpg|gif)$/i,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 8192,
          },
        },
      },
      {
        test: /\.(j|t)sx?$/,
        exclude: /node_module/,
        use: ["babel-loader"],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: "url-loader",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
