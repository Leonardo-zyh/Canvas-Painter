
const CompressionPlugin = require("compression-webpack-plugin")

module.exports = {
    publicPath: '/canvas/',
    productionSourceMap: false,
    configureWebpack:{
        plugins: [
            new CompressionPlugin({
                test: /\.js$|\.css$/
            })
        ]
    }
}