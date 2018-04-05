
# 运行
- 复制下面的code保存重命名为hdx-dev-conf.js

```
module.exports={
    "webpack":{
        entry:{
            main:"./dev/js/main.js",
        },
    },
    gulp:{
        webPort:"3016",
        nodejsPath:"../nodejs-web",//copy 文件至nodejs中 nodejs的路径
        gulpBase64File:['main'],//sass文件名存在于此数组内的才会去进行base64打包
        compilePugFile:['dev/jade-html/*.pug'],//按需编译某些pug
        compileSassFile:['dev/sass/output/main.scss'],//按需编译某些sass
        copyJsPath:"C:\\Users\\Administrator\\Documents\\soul\\php-work\\my-blog\\wp-content\\themes\\soul-explore\\assets\\js",//js文件默认复制到 hdx-nodejs-web这个项目
        copyCssPath:"C:\\Users\\Administrator\\Documents\\soul\\php-work\\my-blog\\wp-content\\themes\\soul-explore\\assets\\css",    //同上
        copyImgPath:"C:\\Users\\Administrator\\Documents\\soul\\php-work\\my-blog\\wp-content\\themes\\soul-explore\\assets\\img",    //同上
        watchCompileSass: ["dev/sass/**/*.scss"], // 监听哪些文件变动并且编译Sass
        watchCompileJs: ["dev/js/**/*.js", "dev/js/**/*.vue", "dev/jade-html/**/*.pug"],  // 同上
        watchCompilePug: ["dev/jade-html/**/*.pug", "dev/jade-component/**/*.pug"] // 同上
    }
};

```

- 运行
```
npm install
gulp
```

