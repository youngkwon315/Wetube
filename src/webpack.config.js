const path = require("path");
const autoprefixer = require("autoprefixer");
const ExtractCSS = require("extract-text-webpack-plugin");

const MODE = process.env.WEBPACK_ENV;

module.exports = {
  entry: ["@babel/polyfill", "./assets/js/main.js"],
  mode: MODE,
  module: {
    rules: [
      {
        test: /\.(js)%/,
        use: [
          {
            loader: "babel-loader"
          }
        ]
      },
      {
        test: /\.(scss)$/,
        use: ExtractCSS.extract([
          {
            loader: "css-loader"
          },
          {
            loader: "postcss-loader",
            options: {
              plugins() {
                return [autoprefixer({ browsers: "cover 99.5%" })];
              }
            }
          },
          {
            loader: "sass-loader"
          }
        ])
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, "static"),
    filename: "main.js"
  },
  plugins: [new ExtractCSS("styles.css")]
};

/*
const ENTRY_FILE = path.resolve(__dirname, "src", "js", "main.js");
const OUTPUT_DIR = path.join(__dirname, "static");

const config = {
  entry: ENTRY_FILE,
  output: {
    path: OUTPUT_DIR,
    filename: "[name].[format]"
  }
};

module.export = config;
*/
