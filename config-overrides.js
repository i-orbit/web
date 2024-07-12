const {override, overrideDevServer, addWebpackAlias, addWebpackModuleRule} = require('customize-cra');
const addLessLoader = require("customize-cra-less-loader");
const path = require("path");

module.exports = {
    devServer: overrideDevServer((config) => {
        config.client.overlay = false;
        return config;
    }),
    webpack: override(
        addWebpackModuleRule({
            test: /\.module\.css$/,
            use: [
                'style-loader',
                {
                    loader: 'css-loader',
                    options: {
                        modules: true,
                    },
                },
            ],
        }),
        addLessLoader({
            lessOptions: {
                javascriptEnabled: true,
            },
        }),
        addWebpackAlias({
            '@common': path.resolve(__dirname, 'src/common'),
            '@assets': path.resolve(__dirname, 'src/assets'),
        }),
    )
};
