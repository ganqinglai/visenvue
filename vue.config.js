//const fs = require("fs");
//const path = require("path");
//https://blog.csdn.net/l508742729/article/details/107820099
module.exports = {
  publicPath: "./",
  outputDir: "dist",
  assetsDir: "assets",
  lintOnSave: false,
  runtimeCompiler: false,
  productionSourceMap: false,
  devServer: {
    /*
    http2: true,
    https: {
      //key: fs.readFileSync("./server.key"),
      //cert: fs.readFileSync("./server.crt"),
      ca: fs.readFileSync("./server.pem"),
    },
    */

    proxy: {
      "/api": {
        target: "http://10ca3d1.nat123.fun:32959/api", //"https://330d88ca.nat123.fun/",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
};
