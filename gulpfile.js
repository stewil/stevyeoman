'use strict';

var gulp        =   require('gulp'),
    watch       =   require('gulp-watch'),
    sass        =   require('gulp-sass'),
    autoprefixer=   require('gulp-autoprefixer'),
    sourcemaps  =   require('gulp-sourcemaps'),
    rename      =   require('gulp-rename'),
    uglify      =   require('gulp-uglify'),
    beautify    =   require('gulp-beautify'),
    concat      =   require('gulp-concat'),
    del         =   require('del'),
    fs          =   require('fs'),
    bump        =   require('gulp-bump'),
    ifElse      =   require('gulp-if-else'),
    runSequence =   require('run-sequence'),
    streamify   =   require('gulp-streamify'),
    source      =   require('vinyl-source-stream'),
    template    =   require('gulp-template'),
    browserify  =   require('browserify'),
    browserSync =   require('browser-sync').create(),
    argv        =   require('yargs').argv,
    Config      =   require('./gulpfile.config');

var packageJson =   require('./package.json'),
    config      =   new Config(packageJson);

/*========================================================================
 TASKS
 ========================================================================*/

//  BUILD
//-----------------------------------------------------------------------
gulp.task('debug', bundleDebug);
gulp.task('build', bundleBuild);
gulp.task('watch', ['debug'], serve);
gulp.task("reload", reloadBrowser);
gulp.task("bumpPackage", bumpPackage);
gulp.task("bumpBowerPackage", bumpBowerPackage);

//  JAVASCRIPT
//-----------------------------------------------------------------------
gulp.task("debugJS",  debugJS);
gulp.task("buildJS",  buildJS);
gulp.task('reloadJS', reloadJS);

//  SASS
//-----------------------------------------------------------------------
gulp.task("buildSASS",  buildSASS);
gulp.task("debugSASS",  debugSASS);
gulp.task('reloadSASS', reloadSASS);

//  HTML
//-----------------------------------------------------------------------
gulp.task("debugHTML",  debugHTML);
gulp.task("buildHTML",  buildHTML);
gulp.task('reloadHTML', reloadHTML);

//  TESTS
//-----------------------------------------------------------------------
gulp.task("runTests",   runTests);
gulp.task("copyTests",  copyTests);
gulp.task("copySpecRunner", copySpecRunner);
gulp.task("compileTestSource", compileTestSource);

/*========================================================================
 FUNCTIONS
 ========================================================================*/

function bundle(dir, taskPrefix){
    var tasks = [];

    return clearDistFiles(dir, function() {
        if (taskPrefix === 'build') {
            tasks.push([
                'bumpPackage',
                'bumpBowerPackage'
            ]);
        }
        tasks.push([
            taskPrefix + 'JS',
            taskPrefix + 'SASS',
            taskPrefix + 'HTML'
        ]);

        return runSequence.apply(null, tasks);
    });
}

function bundleBuild(){
    return bundle(config.dist, 'build');
}

function bundleDebug(){
    return bundle(config.debug, 'debug');
}

function createHtml(dir){
    gulp.src(config.index)
        .pipe(template({name: createBundleName()}))
        .pipe(gulp.dest(dir));
}

function buildHTML(){
    return createHtml(config.dist);
}

function debugHTML(){
    return createHtml(config.debug);
}

function reloadHTML(){
    return runSequence(['debugHTML'], ['reload']);
}

function compileJS(dir) {

    var jsBundle    = browserify(config.application).bundle(),
        jsFileName  = createBundleName();

    return jsBundle
        .pipe(source(config.application))
        .pipe(streamify(beautify({indentSize:2})))
        .pipe(streamify(sourcemaps.init()))
        .pipe(rename(jsFileName + '.js'))
        .pipe(gulp.dest(dir + 'js/'))
        .pipe(streamify(uglify()))
        .pipe(rename(jsFileName + '.min.js'))
        .pipe(streamify(sourcemaps.write('.')))
        .pipe(gulp.dest(dir + 'js/'));
}

function copyTests(){
    return gulp.src(config.tests)
        .pipe(rename(function(path){
            path.dirname = '/spec/'
        }))
        .pipe(gulp.dest(config.testsDir))
}

function copySpecRunner(){
    return gulp.src(config.testIndex)
        .pipe(template({version: "0.0.0"}))
        .pipe(gulp.dest(config.testsDir));
}

function compileTestSource(){
    var jsTestBundle = browserify(config.testSourceFiles).bundle();

    return jsTestBundle
        .pipe(source(config.testSourceFiles))
        .pipe(gulp.dest(config.testsDir));
}

function runTests(){
    return del(config.testsDir + '/*').then(function() {
        return runSequence(["copySpecRunner","compileTestSource", "copyTests"], serveTests);
    });
}

function serveTests(){
    if (browserSync != null) {
        browserSync.init({
            server: {
                baseDir :"./",
                index   :"test/" + config.testIndexName
            }
        });
    }else{
        console.warn("Browser sync not available in your environment.");
    }
    gulp.watch(config.tests, function(){
        return runSequence(["copyTests"], function(){
            return browserSync.reload()
        });
    });
}

function debugJS(){
    return compileJS(config.debug);
}

function buildJS(){
    return compileJS(config.dist);
}

function reloadJS(){
    return runSequence(['debugJS'], ['reload']);
}

function compileSASS(dir) {

    var cssFileName = createBundleName();

    return gulp.src(config.scss)
        .pipe(sass())
        .pipe(rename(cssFileName + '.css'))
        .pipe(gulp.dest(dir + 'css'));
}

function buildSASS(){
    return compileSASS(config.dist);
}

function debugSASS(){
    return compileSASS(config.debug);
}

function reloadSASS(){
    return runSequence(['debugSASS'], ['reload']);
}

function bumpPackage(){
    return gulp.src('./package.json')
        .pipe(bump({type:(function(){
            if(argv.major){
                return 'major';
            }
            if(argv.minor){
                return 'minor';
            }
            if(argv.patch){
                return 'patch';
            }
        })()}))
        .pipe(gulp.dest('./'));
}

function bumpBowerPackage(){
    return gulp.src('./bower.json')
        .pipe(bump({type:(function(){
            if(argv.major){
                return 'major';
            }
            if(argv.minor){
                return 'minor';
            }
            if(argv.patch){
                return 'patch';
            }
        })()}))
        .pipe(gulp.dest('./'));
}

function serve(){
    if (browserSync != null) {
        browserSync.init({
            server: config.debug
        });
    }else{
        console.warn("Browser sync not available in your environment.");
    }
    gulp.watch(config.scss,             ['reloadSASS']);
    gulp.watch(config.index,            ['reloadHTML']);
    gulp.watch(config.javascriptModules,['reloadJS']);
}

function reloadBrowser(){
    if (browserSync != null) {
        browserSync.reload();
    }
}

function clearDistFiles(dir, fn){
    return del(dir + '/*').then(function() {
        if (fn) {
            fn();
        }
    });
}

function createBundleName(){
    var config = fs.readFileSync('./package.json', 'utf-8');
    packageJson = JSON.parse(config);
    return packageJson.name + '-' + packageJson.version;
}