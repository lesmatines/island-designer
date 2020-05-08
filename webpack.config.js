const path = require("path");
const webpack = require("webpack");
const progress = require("progress-bar-webpack-plugin");
const root = (...args) => path.resolve(__dirname, ...args)

const server = {
  contentBase: root("./server"),
  host: "0.0.0.0",
  inline: true,
  port: 8081
}

const entries = {
  main: "./app/Main.ts"
}

const output = {
  filename: "[name].bundle.js",
  path: root("./server"),
  publicPath: '/'
}

const resolve = {
  extensions: [".ts", ".js", ".glsl"]
}

const rules = [
  { test: /\.ts$/, loader: "ts-loader", exclude: /node_modules/},
  { test: /\.js$/, loader: "babel-loader", exclude: /node_modules/, options: { cacheDirectory: true } },
  { test: /\.glsl/, loader: "raw-loader", exclude: /node_modules/}
]

var config = {
  mode: "development",
  entry: entries,
  output: output,
  resolve: resolve,
  module: { rules: rules },
  devServer: server,
  node: {
    fs: 'empty'
  }
}

module.exports = config;