const {createProxyMiddleware} = require('http-proxy-middleware');
module.exports = function (app) {
    app.use(createProxyMiddleware('/orbit', {
        target : 'http://192.168.26.215:8080',
        changeOrigin : false,
        pathRewrite : {
            '^/orbit/' : ''
        }
    }));
};