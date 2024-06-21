const {override, addWebpackAlias} = require('customize-cra');
const addLessLoader = require("customize-cra-less-loader");
const path = require("path");

module.exports = override(
    addLessLoader({
        lessOptions: {
            javascriptEnabled: true,
        },
    }),
    addWebpackAlias({
        ['@common']: path.resolve(__dirname, './src/common'),
    })
);
