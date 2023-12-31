const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

const sourceDir = path.join(__dirname, "./src")

const Modes = {
  DEVELOPMENT: "development",
  PRODUCTION: "production"
}

module.exports = (env, { mode }) => {
  const isProduction = mode === Modes.PRODUCTION

  return {
    mode,
    entry: path.join(__dirname, "src", "index.tsx"),
    resolve: {
      extensions: [".tsx", ".ts", ".js", ".jsx"]
    },
    output: {
      filename: "bundle.js",
      path: path.resolve(__dirname, "build"),
      publicPath: "/"
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(__dirname, "src", "index.html")
      }),

      new MiniCssExtractPlugin({
        filename: isProduction ? "[name]-[contenthash].css" : "[name].css"
      })
    ],

    module: {
      rules: [
        {
          test: /\.(ts|tsx|js)$/,
          exclude: /node_modules/,
          include: sourceDir,
          loader: "babel-loader"
        },
        {
          test: /css$/,
          use: [MiniCssExtractPlugin.loader, "css-loader",]
        }
      ]
    },

    resolve: {
      extensions: [".ts", ".js", ".tsx", ".json", ".css", ".m.css"],
      modules: [path.resolve(__dirname, "./src"), "./node_modules"],

      alias: {
        "@root": path.resolve(__dirname, "./src"),
        "@api": path.resolve(__dirname, "./src/api"),
        "@store": path.resolve(__dirname, "./src/store"),
        "@components": path.resolve(__dirname, "./src/components"),
      //   "@styles": path.resolve(__dirname, "./src/styles")
      }
    },

    performance: {
      maxEntrypointSize: Infinity,
      maxAssetSize: 1024 ** 2
    },

    devtool: isProduction ? "source-map" : "inline-source-map",

    devServer: {
      host: "0.0.0.0",
      port: 3000,
      historyApiFallback: true
    }
  }
}
