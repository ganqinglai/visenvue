module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  // 注释：使用vant组件需要安装 
  // 1. cnpm install vant -S 
  // 2. npm install babel-plugin-import --save-dev
  // 3. 在此文件下增加plugins相关内容
  plugins: [
    [
      "import",
      {
        libraryName: "vant",
        libraryDirectory: "es",
        style: true,
      },
      "vant",
    ],
  ],
};
