const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const cookie = 'auth=eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ2YW55b2swMDEifQ.HlAr4Rdj0fCYxfvUscGkxkNOrvV7jtwZwRQFxIf0zSeEN1HUcEMld5wZLlMpy1irZe4Ts42cRc6rBza8OKu9BQ; Path=/user; Expires=Thu, 29 Jun 2023 16:38:01 GMT;';

module.exports = {
    entry: './src/index.tsx',
    mode: 'development',
    devtool: 'source-map',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx'],
        alias: {
            app: path.resolve(__dirname, 'src/app/'),
            assets: path.resolve(__dirname, 'src/assets/')
        }
    },
    devServer: {
        host: '0.0.0.0',
        allowedHosts: 'all',
        port: 3000,
        historyApiFallback: true,
        proxy: {
            '/api': {
                target: 'http://localhost:3001',
                pathRewrite: { '^/api': '' },
                headers: {
                    'Cookie': cookie // TODO: remove
                }
            },
            '/socket': {
                target: 'ws://localhost:3001',
                ws: true,
                headers: {
                    'Cookie': cookie // TODO: remove
                }
            },
        }
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.less$/i,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                mode: 'local',
                                localIdentName: '[local]__[hash:base64:5]',
                            },
                        }
                    },
                    'less-loader'
                ]
            },
            {
                // test: /\.(jpg|png|mp3|woff|woff2)$/,
                test: /\.(mp3|woff|woff2)$/,
                use: 'file-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        })
    ]
};
