---
title: 'Gulp - hot module replacement'
pubDate: 2019-11-11
tags: ["gulp" , "js", "webpack"]
---

Jakiś czas temu stworzyliśmy sobie podstawową <a href="http://domanart.pl/gulp">konfigurację Gulpa</a>.
W poniższym tekście spróbujmy ją rozwinąć o tak zwany Hot Module Replacement.

<!--more-->

## Hot module replacement
Co to jest <a href="https://webpack.js.org/concepts/hot-module-replacement/">hot module replacement</a> (HMR)?
My w naszej konfiguracji korzystamy z BrowerSync. Dla Webpacka istnieje coś mniej więcej podobnego, czyli <a href="https://github.com/webpack/webpack-dev-server">webpack dev server</a>.

Jedną z opcji tego serwera jest właśnie HMR. W naszej poprzedniej konfiguracji po zmianie czegokolwiek w Javascript strona jest automatycznie przeładowywana. Mechanizm HMR sprawia, że strona nie musi być w całości przeładowana, a zmieniony Javascript jest wstrzykiwany w stronę tak samo jak to robiliśmy ze skompilowanym CSS.

Taka "gorąca" podmiana Javascriptu odbywa się w pamięci komputera. Oznacza to, że fizycznie nie są generowane pliki wynikowe z Javascriptem.
Dla nas developerów oznacza to tyle, że jeżeli chcemy używać HMR, to na zakończenie pracy i tak musimy odpalić inne zadanie, które fizycznie przebuduje nasz Javascript do fizycznych wynikowych plików na dysku. Podejrzewam, że każdy kto kiedykolwiek używał webpacka do budowania aplikacji na React, Vue czy Angularze wie o czym mówię. Odpalamy tak serwer, a na zakończenie pracy i tak odpalamy zadanie build. W naszym przypadku będzie podobnie, jedyna rzecz, że zadanie będzie nazywać się inaczej.

## Instalacja paczek
Żeby używać HMR w Gulpie, musimy skorzystać z 2 paczek: <a href="https://github.com/webpack/webpack-dev-middleware">webpackDevMiddleware</a> oraz <a href="https://github.com/webpack-contrib/webpack-hot-middleware">webpackHotMiddleware</a>. Ten pierwszy pozwala przejąć emitowane przez webpacka pliki, a ten drugi dodać dynamiczne odświeżanie do innych serwerów (w naszym przypadku BrowserSync).

Ok zainstalujmy obie rzeczy poleceniem:

<pre><code class="language-js">
npm i webpack-dev-middleware webpack-hot-middleware -D
</code></pre>

Następnie dodajmy je do naszej poprzedniej konfiguracji:

<pre   data-line="12-15"><code class="language-js">
const gulp                  = require("gulp");
const sass                  = require("gulp-sass");
const sourcemaps            = require("gulp-sourcemaps");
const autoprefixer          = require("gulp-autoprefixer");
const rename                = require("gulp-rename");
const wait                  = require("gulp-wait");
const csso                  = require("gulp-csso");
const browserSync           = require("browser-sync").create();
const webpack               = require("webpack");
const include               = require('gulp-include');

const webpackDevMiddleware  = require('webpack-dev-middleware');
const webpackHotMiddleware  = require('webpack-hot-middleware');
const webpackConfig         = require('./webpack.config-develop');
const bundler               = webpack(webpackConfig);

sass.compiler = require('sass');


const server = function(cb) {
    browserSync.init({
        server: {
            baseDir: "./dist"
        },
        notify: false,
        //host: "192.168.0.24",
        //port: 3000,
        open: true,
        //browser: "google chrome"
    });

    cb();
}

const css = function() {
    return gulp.src("src/scss/style.scss")
        .pipe(wait(500))
        .pipe(sourcemaps.init())
        .pipe(
            sass({
                outputStyle : "compressed"
            }).on("error", sass.logError)
        )
        .pipe(autoprefixer())
        .pipe(rename({
            suffix: ".min",
            basename: "style"
        }))
        .pipe(csso())
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("dist/css")) //tu nie ma średnika!
        .pipe(browserSync.stream({match: "**/*.css"}));
}

const js = function(cb) {
    return webpack(require("./webpack.config.js"), function(err, stats) {
        if (err) throw err;
        console.log(stats.toString());
        browserSync.reload();
        cb();
    })
}

const html = function(cb) {
    return gulp.src('src/html/*.html')
        .pipe(include())
        .pipe(gulp.dest('dist'))
}

const htmlReload = function(cb) {
    browserSync.reload();
    cb();
}

const watch = function() {
    gulp.watch("src/scss/**/*.scss", gulp.series(css));
    gulp.watch("src/html/**/*.html", gulp.series(html, htmlReload));
    gulp.watch("src/js/**/*.js", gulp.series(js));
    gulp.watch("dist/**/*.html").on("change", browserSync.reload);
}

&nbsp;
exports.default = gulp.series(html, css, js, server, watch);
exports.css = css;
exports.watch = watch;
exports.js = js;
exports.html = html;
</code></pre>

Nasza praca będzie przebiegać w 2 trybach. Jeden będzie przebudowywał pliki javascript, ale i odświeżał stronę. Drugi będzie używał HMR, ale będzie nadawał się tylko do prac developerskich.
Dodajmy do konfiguracji odpowiednią flagę i zadanie, które będzie ją zmieniać:

<pre   data-line="18,85-88,92"><code class="language-js">
const gulp                  = require("gulp");
const sass                  = require("gulp-sass");
const sourcemaps            = require("gulp-sourcemaps");
const autoprefixer          = require("gulp-autoprefixer");
const rename                = require("gulp-rename");
const wait                  = require("gulp-wait");
const csso                  = require("gulp-csso");
const browserSync           = require("browser-sync").create();
const webpack               = require("webpack");
const include               = require('gulp-include');

const webpackDevMiddleware  = require('webpack-dev-middleware');
const webpackHotMiddleware  = require('webpack-hot-middleware');
const webpackConfig         = require('./webpack.config');
const bundler               = webpack(webpackConfig);

//tryb developerski
let developmentMode         = false;

sass.compiler = require('sass');


const server = function(cb) {
    browserSync.init({
        server: {
            baseDir: "./dist"
        },
        notify: false,
        //host: "192.168.0.24",
        //port: 3000,
        open: true,
        //browser: "google chrome"
    });

    cb();
}

const css = function() {
    return gulp.src("src/scss/style.scss")
        .pipe(wait(500))
        .pipe(sourcemaps.init())
        .pipe(
            sass({
                outputStyle : "compressed"
            }).on("error", showError)
        )
        .pipe(autoprefixer())
        .pipe(rename({
            suffix: ".min",
            basename: "style"
        }))
        .pipe(csso())
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("dist/css")) //tu nie ma średnika!
        .pipe(browserSync.stream({match: "**/*.css"}));
}

const js = function(cb) { //https://github.com/webpack/docs/wiki/usage-with-gulp#normal-compilation
    return webpack(require("./webpack.config.js"), function(err, stats) {
        if (err) throw err;
        console.log(stats.toString());
        browserSync.reload();
        cb();
    })
}

const html = function(cb) {
    return gulp.src('src/html/*.html')
        .pipe(include())
        .pipe(gulp.dest('dist'))
}

const htmlReload = function(cb) {
    browserSync.reload();
    cb();
}

const watch = function() {
    gulp.watch("src/scss/**/*.scss", gulp.series(css));
    gulp.watch("src/html/**/*.html", gulp.series(html, htmlReload));
    gulp.watch("src/js/**/*.js", gulp.series(js));
    gulp.watch("dist/**/*.html").on("change", browserSync.reload);
}

const developOn = function(cb) {
    developmentMode = true;
    cb();
}

&nbsp;
exports.default = gulp.series(html, css, js, server, watch);
exports.develop = gulp.series(developOn, css, html, server, watch);
exports.css = css;
exports.watch = watch;
exports.js = js;
exports.html = html;
</code></pre>

Żeby BrowserSync mógł korzystać z HMR, musimy w jego ustawieniach dodać HMR, czyli skorzystać z zainstalowanych wcześniej paczek. Zmodyfikujmy więc zadanie odpalające BrowserSync:

<pre><code class="language-js">
...
const server = function (cb) {
    const config = {
        server: {
            baseDir: "./dist"
        },
        open: true,
        notify: false
    };

    if (developmentMode) {
        config.server.middleware = [
            webpackDevMiddleware(bundler, {
                publicPath: webpackConfig.output.publicPath, //odwołujemy się do konfiguracji webpacka
                stats: { colors: true }
            }),
            webpackHotMiddleware(bundler)
        ]
    }

    browserSync.init(config);
    cb();
};
...
</code></pre>

Ostatnią rzeczą będzie przerobienie konfiguracji samego webpacka. Najłatwiej było by stworzyć oddzielną konfigurację w drugim pliku. W takim przypadku trzeba by się do niej odwołać w naszej konfiguracji w linii:

<pre   data-line="14"><code class="language-js">
const gulp                  = require("gulp");
const sass                  = require("gulp-sass");
const sourcemaps            = require("gulp-sourcemaps");
const autoprefixer          = require("gulp-autoprefixer");
const rename                = require("gulp-rename");
const wait                  = require("gulp-wait");
const csso                  = require("gulp-csso");
const browserSync           = require("browser-sync").create();
const webpack               = require("webpack");
const include               = require('gulp-include');

const webpackDevMiddleware  = require('webpack-dev-middleware');
const webpackHotMiddleware  = require('webpack-hot-middleware');
const webpackConfig         = require('./webpack.config.develop');
const bundler               = webpack(webpackConfig);

...
</code></pre>

<pre><code class="language-js">
//webpack.config.develop.js
const path = require("path");
const webpack = require('webpack');

module.exports = {
    entry : {
        main: [
            'webpack/hot/dev-server',
            'webpack-hot-middleware/client',
            './src/js/app.js'
        ]
    },

    output: {
        filename: "bundle.min.js",
        path: path.resolve(__dirname, "./dist/js"),
        publicPath: '/js'
    },

    watch : false,
    mode : 'production',
    devtool : "source-map",

    module : {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
};
</code></pre>

Jeżeli komuś przeszkadza pojedyncze konfiguracje webpacka, może to zastąpić pojedyńczym plikiem. Zadaniem pliku webpack.config jest wyeksportowanie na zewnątrz obiektu konfiguracji webpacka. Jak my to zrobimy to już zależy od nas samych. Możemy tutaj pisać dowolny kod - w tym funkcję, którą możemy odpalać z odpowiednim parametrem. Zamiast więc tworzyć kilka plików możemy stworzyć jeden, ale odpowiednio przygotowany:

<pre><code class="language-js">
//webpack.config.js
const path = require("path");
const webpack = require('webpack');


module.exports = (dev) => {
    const conf = {};

    if (dev) {
        conf.entry = {
            main: [
                'webpack/hot/dev-server',
                'webpack-hot-middleware/client',
                './src/js/app.js'
            ]
        };
    } else {
        conf.entry = './src/js/app.js'
    }

    conf.output = {
        filename: "bundle.min.js",
        path: path.resolve(__dirname, "./dist/js"),
        publicPath: '/js'
    };

    conf.watch = false;
    conf.mode = 'production';
    conf.devtool = "source-map";
    conf.module = {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    };

    if (dev) {
        conf.plugins = [
            new webpack.HotModuleReplacementPlugin()
        ]
    }

    return conf;
};
</code></pre>

W naszej konfiguracji Gulpa musimy zmienić odwołania do takiego pliku, ponieważ to już nie tylko obiekt konfiguracji, a funkcja zwracająca obiekt:

<pre   data-line="14, 59"><code class="language-js">
const gulp                  = require("gulp");
const sass                  = require("gulp-sass");
const sourcemaps            = require("gulp-sourcemaps");
const autoprefixer          = require("gulp-autoprefixer");
const rename                = require("gulp-rename");
const wait                  = require("gulp-wait");
const csso                  = require("gulp-csso");
const browserSync           = require("browser-sync").create();
const webpack               = require("webpack");
const include               = require('gulp-include');

const webpackDevMiddleware  = require('webpack-dev-middleware');
const webpackHotMiddleware  = require('webpack-hot-middleware');
const webpackConfig         = require('./webpack.config')(dev);
const bundler               = webpack(webpackConfig);

//tryb developerski
let developmentMode         = false;

sass.compiler = require('sass');


const server = function(cb) {
    browserSync.init({
        server: {
            baseDir: "./dist"
        },
        notify: false,
        //host: "192.168.0.24",
        //port: 3000,
        open: true,
        //browser: "google chrome"
    });

    cb();
}

const css = function() {
    return gulp.src("src/scss/style.scss")
        .pipe(wait(500))
        .pipe(sourcemaps.init())
        .pipe(
            sass({
                outputStyle : "compressed"
            }).on("error", showError)
        )
        .pipe(autoprefixer())
        .pipe(rename({
            suffix: ".min",
            basename: "style"
        }))
        .pipe(csso())
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("dist/css")) //tu nie ma średnika!
        .pipe(browserSync.stream({match: "**/*.css"}));
}

const js = function(cb) { //https://github.com/webpack/docs/wiki/usage-with-gulp#normal-compilation
    return webpack(require("./webpack.config.js")(), function(err, stats) { //doszly nawiasy!
        if (err) throw err;
        console.log(stats.toString());
        browserSync.reload();
        cb();
    })
}

const html = function(cb) {
    return gulp.src('src/html/*.html')
        .pipe(include())
        .pipe(gulp.dest('dist'))
}

const htmlReload = function(cb) {
    browserSync.reload();
    cb();
}

const watch = function() {
    gulp.watch("src/scss/**/*.scss", gulp.series(css));
    gulp.watch("src/html/**/*.html", gulp.series(html, htmlReload));
    gulp.watch("src/js/**/*.js", gulp.series(js));
    gulp.watch("dist/**/*.html").on("change", browserSync.reload);
}

const developOn = function(cb) {
    developmentMode = true;
    cb();
}

&nbsp;
exports.default = gulp.series(html, css, js, server, watch);
exports.develop = gulp.series(developOn, css, html, server, watch);
exports.css = css;
exports.watch = watch;
exports.js = js;
exports.html = html;
</code></pre>

Ja osobiście został bym jednak przy wielu plikach. Używanie wielu konfiguracji to sposób wskazywany nawet w oficjalnej <a href="https://webpack.js.org/api/cli/#usage-with-config-file">dokumentacji webpacka</a>. Pewnie jak zwykle - kto co lubi.

I w sumie tyle. Od tej pory mamy do dyspozycji 2 główne zadania:

* <strong>gulp</strong> - odpala tryb normalny, gdzie pliki JS są fizycznie budowane i następuje przeładowanie strony
* <strong>gulp develop</strong> - odpala tryb developerski. Pliki budowane są tylko w pamięci (działa HMR), a sam Javascript tak samo jak CSS jest wstrzykiwany w stronę.

Gotową konfigurację możecie pobrać <a href="http://domanart.pl/dema/gulp-hmr/paczka.zip">pod tym linkiem</a>.

