# SproutFE

##1. 环境要求

* `node`

##2. 使用说明
*  进入项目根目录，运行 `npm install` 安装所有依赖。
*  运行 `gulp server` 进行本地调试开发。
*  运行 `gulp build` 打包上线代码。

##3. 项目结构
```
|
+- node_modules      // 项目依赖，引入的第三方库或框架
+- src               // 开发目录
|   +- index.html    // 入口文件
|   +- assets		 // 自己的样式和脚本
|		+- css/
|		+- js/
|		+- images/
|       +- less
+- dist              // 产出目录
|   +- index.html
|   +- public
|		+- js/
|		+- css/
|		+- images/
```

## 4. 项目中引入依赖

**第三方 `js` 或者 `css` 文件**

> 在 `*.html` 直接引入 `/node_modules/**/*.js` 或 `/node_modules/**/*.css` 即可。

**引入自定义的样式和脚本**

> 在 `*.html` 直接引入 `/assets/css/*.css` 或 `/assets/js/*.js` 。

##5. 发布
* 进入项目根目录，在终端中运行 `gulp build`。