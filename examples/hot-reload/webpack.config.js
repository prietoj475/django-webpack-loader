const path = require("path");
const BundleTracker = require("webpack-bundle-tracker");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  context: __dirname,
  entry: "./assets/js/index",
  output: {
    path: path.resolve(__dirname, "assets/webpack_bundles/"),
    publicPath: "http://localhost:3000/frontend/webpack_bundles/",
    filename: "[name]-[contenthash].js",
  },

  devtool: "source-map", // Optional: Choose an appropriate devtool for your needs
  devServer: {
    hot: true,
    historyApiFallback: true,
    host: "localhost",
    port: 3000,
    // Allow CORS requests from the Django dev server domain:
    headers: { "Access-Control-Allow-Origin": "*" },
  },

  plugins: [
    new BundleTracker({ path: __dirname, filename: "webpack-stats.json" }),
    new MiniCssExtractPlugin(),
  ],

  module: {
    rules: [
      // we pass the output from babel loader to react-hot loader
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },

  resolve: {
    extensions: [".js", ".jsx"],
  },
};
