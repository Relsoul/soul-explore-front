/**
 * Created by Administrator on 2016/9/18.
 */
"use strict";
const gulp = require("gulp");
const sass = require("gulp-sass");
//const jade = require("gulp-jade");
const pug=require("gulp-pug");
const webpack = require("webpack-stream");
const rename = require("gulp-rename");
const gulpif = require("gulp-if");
//const sprity = require("sprity");
const browserSync = require("browser-sync").create();
const browserReload = browserSync.reload; //浏览器实时刷新与加载
const sourcemaps = require("gulp-sourcemaps");
const clean = require("gulp-clean");
const postcss = require('gulp-postcss');
const base64=require("gulp-base64");
const autoprefixer = require('autoprefixer');
//const changed = require("gulp-changed");
const plumber = require('gulp-plumber');
const watch = require('gulp-watch');

const devConf=require("./hdx-dev-conf");

let gulpTaskList = ["watch"];

const sassOptions = {};
sassOptions["outputStyle"] = "compressed";

const vsPath = {
    jsFile: "dist/css/**/*",
    cssFile: "dist/js/**/*",
    css: "",
    js: "",
};

const nodejsPath = devConf.gulp.nodejsPath?devConf.gulp.nodejsPath:"../hdx-nodejs-web";

let compilePugFile= devConf.gulp.compilePugFile?devConf.gulp.compilePugFile:["dev/jade-html/**/*.pug"];
let compileSassFile= devConf.gulp.compileSassFile?devConf.gulp.compileSassFile:["dev/sass/output/**/*.scss"];
let copyJsPath=devConf.gulp.copyJsPath?devConf.gulp.copyJsPath:`${nodejsPath}/public/dist/js`;
let copyCssPath=devConf.gulp.copyCssPath?devConf.gulp.copyCssPath:`${nodejsPath}/public/dist/css`;
let copyImgPath=devConf.gulp.copyImgPath?devConf.gulp.copyImgPath:`${nodejsPath}/public/img`;
let assetsUrl = "/dist";

let watchCompileSass = devConf.gulp.watchCompileSass || ["dev/sass/**/*.scss"];
let watchCompileJs = devConf.gulp.watchCompileJs || ["dev/js/**/*.js", "dev/js/**/*.vue", "dev/jade-html/hdx-mobile/**/*.pug"];
let watchCompilePug = devConf.gulp.watchCompilePug || ["dev/jade-html/**/*.pug", "dev/jade-component/**/*.pug"];

/**
 *
 * 配置开发环境
 *
 */
if (process.argv[2] && !!~process.argv[2].indexOf("--")) {
    let env = process.argv[2].replace("--", "");
    process.env.NODE_ENV = env;
}

let webpackEnv='dev';

if (process.env.NODE_ENV === 'production') {
    sassOptions["outputStyle"] = "compressed";
    let productionList = ["clean", "compile:pug", "compile:js", "sprites"];
    gulpTaskList = [];//生产模式不需要使用watch功能
    gulpTaskList = gulpTaskList.concat(productionList)
}

gulp.task("default", gulpTaskList);

gulp.task('default::production',['set-env::production','watch']);

gulp.task('build::production',['set-env::production','compile:pug','compile:js','compile:sass','copy']);

gulp.task("copy", ["copy:lib", "copy:img"]);

gulp.task('build::dev',['copy','compile:js','compile:sass','compile:pug']);


/**
 * 设置环境变量
 */

gulp.task('set-env::production',()=>{
    webpackEnv='production';
    return Promise.resolve(true);
});

/**
 *
 * 监听文件
 *
 */
gulp.task("watch", () => {
    let bs = browserSync.init({
        server: {
            baseDir: "./",
            directory: true,
        },
        open: false,
        ui: {
            port: 3008,
            weinre: {
                port: 3009
            }
        },
        port: devConf.gulp.webPort?devConf.gulp.webPort:3012,
        ghostMode: false
    });
    watch(watchCompilePug, function () {
        gulp.start("compile:pug");
    });
    watch(watchCompileJs, function () {
        gulp.start("compile:js");
    });
    watch(watchCompileSass, function () {
        gulp.start("compile:sass");
    });
    watch(["dev/img/**/*.*", "dev/lib/**/*.*"], function () {
        gulp.start("copy");
    });
});

/**
 *
 * 编译pug
 *
 */
gulp.task("compile:pug", () => {
    /*
     *
     * opt:同级目录生成,现已去除 通过加载地址来替换
     *
     * */
    let opt = {base: 'dev/jade-html/'};
    gulp.src(compilePugFile,opt)
    //.pipe(changed("dist/html", {extension: '.html'}))
        .pipe(pug({pretty: true, locals: {url: assetsUrl}}).on("error", (err) => {
            console.log(err)
        }))
        .pipe(gulp.dest("dist/html/"))
        .on("finish", () => {
            browserReload()
        })
});

gulp.task('compile:pug-component', () => {
    let opt = {base: '/dev/jade-html/**'};
    gulp.src("dev/jade-component/**/*.pug")
        .pipe(pug({pretty: true, locals: {url: assetsUrl}}).on("error", (err) => {
            console.log(err)
        }))
        .pipe(gulp.dest("dist/html/jade-component"))
        .on("finish", () => {
            browserReload()
        })
});

const files=devConf.gulp.gulpBase64File?devConf.gulp.gulpBase64File:[];
function extBase64File(e) {
    for(let item of files){
        if(e.path.includes(item)){
            console.log("base64 compile:",e.path);
            return true
        }else{
            continue;
        }
        return false;
    }
}

/**
 *
 * 编译sass
 *
 */
gulp.task("compile:sass", (event) => {
    return gulp.src(compileSassFile)
    //.pipe(changed("dist/css")) disabled changed sass需要全部编译..
        .pipe(sourcemaps.init())
        .pipe(sass(sassOptions).on("error", sass.logError))
        .pipe(gulpif(extBase64File,base64({
            maxImageSize: 15*1024, // bytes 15KB
        })))
        .pipe(postcss([autoprefixer()]))
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest("dist/css"))
        .pipe(gulp.dest(copyCssPath))
        .on("finish", () => {
            browserReload()
        })
});

/**
 *
 * 通过webpack编译js
 * js的sourcemaps在webpack中控制
 *
 */


const webpackFile=require("./webpack.config.js");
gulp.task("compile:js", () => {
    return gulp.src("dev/js/main.js")
        .pipe(plumber({errorHandler:function () {

            }}))
        .pipe(webpack(webpackFile({env:webpackEnv})))
        .pipe(gulp.dest("dist/js/"))
        .pipe(gulp.dest(copyJsPath))
        .on("finish", () => {
            browserReload()
        })
});

/**
 *
 * 复制img文件
 *
 */
gulp.task("copy:img", () => {
    return gulp.src("dev/img/**/*.*")
        .pipe(gulp.dest("./img"))
        .pipe(gulp.dest(copyImgPath))
});


/**
 *
 * 复制前端lib库(npm形式安装)至lib里
 *
 */

const libPath = "dev/lib";
const libCssPath = "dev/lib/css";

gulp.task('copy:node-front', () => {
    // weui.css
    gulp.src("node_modules/weui/dist/style/weui.min.css")
        .pipe(gulp.dest(libCssPath));
    // weui.js
    gulp.src("node_modules/weui.js/dist/weui.min.js")
        .pipe(gulp.dest(libPath));
});

/**
 *
 * 复制lib文件
 *
 */
gulp.task("copy:lib", () => {
    return gulp.src("dev/lib/**/*.*")
        .pipe(gulp.dest("dist/lib"));
});

/**
 * 复制生产文件至nodejs
 */
gulp.task("copy:nodejs", () => {
    gulp.src("dist/**/*")
        .pipe(gulp.dest(`${nodejsPath}/public/dist`));
    return gulp.src("img/**/*")
        .pipe(gulp.dest(copyImgPath));
});

/**
 * 复制生产文件至vs目录
 *
 */
gulp.task("copy-vs:css", () => {
    gulp.src(vsPath.cssFile)
        .pipe(gulp.dest(vsPath.css));
});

gulp.task("copy-vs:js", () => {
    gulp.src(vsPath.jsFile)
        .pipe(gulp.dest(vsPath.js));

});

/**
 *
 * 合并雪碧图 弃用！！
 *
 */
/*gulp.task("sprites:img",function () {
 return sprity.src({
 src: "dev/slice/!**!/!*.{png,jpg}",
 processor: "css",
 "style-type": "css",
 style:"spritesOutPut.css",
 split: true,
 cssPath:`./img/sprite/`
 }).on("error",(err)=>{console.log(err)})
 .pipe(
 gulpif("*.png", gulp.dest("dev/img/sprite"), gulp.dest("dist/css/"))
 )
 });


 /!**
 *
 * less版本的雪碧图合并
 *
 *!/
 gulp.task("sprites:img:less",function () {
 return sprity.src({
 src: "dev/slice/!**!/!*.{png,jpg}",
 processor: "less",
 "style-type": "less",
 style:"less-sprite.less",
 split: true,
 cssPath:`${assetsUrl}/img/sprite/`
 })
 .pipe(
 gulpif("*.png", gulp.dest("dev/img/sprite"), gulp.dest("dev/sass/sprity"))
 )
 });

 gulp.task("sprites",["sprites:img","copy"]);
 gulp.task("sprites:less",["sprites:img:less","copy"]);*/

/**
 *
 * 清除所有目录文件
 *
 *
 */

gulp.task('clean', () => {
    return gulp.src("dist/**/*.*")
        .pipe(clean())
});

/**
 *
 * 清除html文件
 *
 *
 */
gulp.task('clean:html', () => {
    return gulp.src("dist/html/**/*.*")
        .pipe(clean())
});

/**
 *
 * 清除css文件
 *
 *
 */
gulp.task('clean:css', () => {
    return gulp.src("dist/css/**/*.*")
        .pipe(clean())
});


