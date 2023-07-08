const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const cookie = 'auth=eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJib2JieV9kIn0.WoK86p_ELvCEGa9ucW1Kc9mMJR6LSbbNavuKO99ObuD4z3nvQf_SRN4R25w9X_M01LWTvXPkmKgX1VVF-OJqUA; Path=/user; Expires=Fri, 21 Jul 2023 15:37:24 GMT;';

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
