// const isProduction = process.env.NODE_ENV === 'production';
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// const CompressionPlugin = require("compression-webpack-plugin")

// //正式环境不打包公共js
// let externals = {}
// if (isProduction) {
//     externals = { //排除打包的js
//         vue: 'Vue',
//         'element-ui': 'ELEMENT',
//         echarts: 'echarts',
//     }
// }
// const cdn = {
//     // 开发环境
//     dev: {
//         css: [],
//         js: [
//         ]
//     },
//     // 生产环境
//     build: {
//         js: [
//             'https://cdn.bootcdn.net/ajax/libs/vue/2.6.11/vue.min.js', // vuejs
//         ]
//     }
// }
// module.exports = {

//     publicPath: '/',

//     productionSourceMap: !isProduction,
//     css: {
//         sourceMap: !isProduction,
//     },
//     configureWebpack: {
//         externals,
//         plugins: [
//             new BundleAnalyzerPlugin(
//                 {
//                     openAnalyzer: false,   // 是否打开默认浏览器
//                     analyzerPort: 8888
//                 }
//             ) // 分析打包大小使用默认配置         
//         ]
//     },
//     chainWebpack: config => {
//         config.plugin('html').tap(args => {
//             if (isProduction) {
//                 args[0].cdn = cdn.build
//             }
//             if (!isProduction) {
//                 args[0].cdn = cdn.dev
//             }
//             return args
//         })
//         // ============压缩图片 start============
//         // 对图片进行压缩处理
//         config.module
//             .rule('images')
//             .use('image-webpack-loader')
//             .loader('image-webpack-loader')
//             .options({
//                 disable: true, // webpack@2.x and newer
//                 quality: '65-80',
//                 speed: 4
//             })
//             .end()
//         // ============压缩图片 end============

//         if (isProduction) {
//             config.plugin('compressionPlugin').use(new CompressionPlugin({
//                 algorithm: 'gzip',
//                 test: new RegExp("\\.(" + ["js", "css"].join("|") + ")$"), // 匹配文件扩展名
//                 threshold: 5120, // 对超过5k的数据压缩
//                 minRatio: 0.8,
//                 deleteOriginalAssets: false // 删除源文件
//             }))
//         }
//     }
// }
