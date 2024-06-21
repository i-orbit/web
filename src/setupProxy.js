const {createProxyMiddleware} = require('http-proxy-middleware');
module.exports = function (app) {
    app.use('/orbit', createProxyMiddleware({
        target: 'http://192.168.26.160:30808',
        changeOrigin: false,
        pathRewrite: {
            '^/orbit/': ''
        }
    }));
};