var path = require('path');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var isProd = (process.env.NODE_ENV === 'production');

module.exports = {
  entry: "./src/app/app.tsx",
  output: {
        filename: "./public/javascripts/bundle.js",
  },
  devtool:"source-map",
  resolve: {

    extensions: [".ts", ".tsx", ".js", ".jsx", ".css"]
  },

  module: {
      loaders: [
          { test: /\.tsx?$/, loaders: ["babel-loader", "awesome-typescript-loader"], exclude: [/node_modules/,nodeModulesPath] },
          { test: /\.(jsx?)$/, loader: 'babel-loader', exclude: [/node_modules/,nodeModulesPath]},
          { test: /\.(less|css)$/,loader: 'style-loader!css-loader!less-loader'}
      ]
  }
};
