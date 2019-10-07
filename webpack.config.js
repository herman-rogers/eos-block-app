const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: 'eval-source-map',
  entry: ['react-hot-loader/patch', './src/index.js'],
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
        exclude: [/\.(spec|test)\.js$/],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: { extensions: ['*', '.js', '.jsx'] },
  output: {
    path: path.resolve(__dirname, 'public/dist/'),
    publicPath: '/dist/',
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: path.join(__dirname, 'public/'),
    port: 3000,
    hotOnly: true,
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
};
