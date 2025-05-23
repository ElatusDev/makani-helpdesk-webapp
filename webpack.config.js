<<<<<<< HEAD
// webpack.config.js

import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module'; // --- CRITICAL FIX: Import createRequire

// --- Helper for __dirname equivalent in ESM ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- NEW: Create a CommonJS require function ---
// This 'require' is now available for polyfills and other CJS-style imports
const requireCjs = createRequire(import.meta.url); 

// Export an async function as the default Webpack config.
// This allows us to use 'await import()' for plugins.
export default async () => { // <--- CRITICAL CHANGE: async default export
  // Dynamically import plugins that might be CommonJS modules
  const HtmlWebpackPlugin = (await import('html-webpack-plugin')).default; // <--- NEW WAY TO IMPORT
  const DotenvWebpackPlugin = (await import('dotenv-webpack')).default;   // <--- NEW WAY TO IMPORT

  return { // Return the Webpack configuration object
    mode: 'development',
    devtool: 'eval-source-map',
    entry: './src/index.tsx',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
      publicPath: '/',
      clean: true,
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      conditionNames: ['import', 'require', 'node', 'default'],
      mainFields: ['module', 'main'],
      fullySpecified: false,
      // --- CRITICAL FIX: Add fallback for Node.js built-in modules ---
      fallback: {
        "util": requireCjs.resolve("util"),
        // You might need more polyfills if other Node.js modules are used by dependencies
        "stream": requireCjs.resolve("stream-browserify"),
        "buffer": requireCjs.resolve("buffer/"),
        "assert": requireCjs.resolve("assert/"),
        "url": requireCjs.resolve("url/"),
        "fs": false, // If a module tries to use 'fs', you might need to mock it as false or provide a polyfill
        "path": requireCjs.resolve("path-browserify"),
        "process": requireCjs.resolve("process/browser")
      }
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-react',
                '@babel/preset-typescript'
              ],
              plugins: [
                ['@babel/plugin-transform-runtime', { corejs: 3 }],
                '@babel/plugin-transform-class-properties', 
                '@babel/plugin-transform-private-methods', 
                '@babel/plugin-transform-private-property-in-object'
              ]
            }
          },
        },
        // ...
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'public/index.html'),
        filename: 'index.html',
      }),
      new DotenvWebpackPlugin({
          path: './.env',
          safe: false,
          allowEmptyValues: true,
          systemvars: true,
          silent: true,
          defaults: false
      }),
    ],
    devServer: {
      static: {
        directory: path.join(__dirname, 'public'),
      },
      compress: true,
      port: 3000,
      historyApiFallback: true,
      hot: true,
      open: true,
    },
  };
=======
const path = require('path');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: './src/app/index.tsx', 
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  devtool: 'inline-source-map', 
  resolve: {
    extensions: ['.tsx', '.ts', '.js'], 
  },
  module: {
    rules: [
      {
          test: /\.(ts|tsx)$/, 
          exclude: /node_modules/,
          use: [
              { 
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env', '@babel/preset-react'], 
                  },
              },
              {
                loader: 'ts-loader',
              }
          ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  devServer: {
    static: path.join(__dirname, 'dist'),
    hot: true,
    port: 3000
  }
>>>>>>> ddd6628 (initialize project structure with React, Redux, and MUI; add Docker support and basic configurations)
};