'use strict';
var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    streamify = require('gulp-streamify'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    notify = require('gulp-notify');

var paths = {
    /**
     * 若有榜定後台才需要這些變數
     * **/
    srcJS : './public/boot.js',
    destJS : './build/assets/js'
};

gulp.task('bundle-client', function() {

    return browserify({
        entries:[ paths.srcJS ],
        debug : true,
        nobuiltins: 'events querystring'
    })

    .on('error', function( err ){
        this.end();
        gulp.src('').pipe( notify('✖ Bunlde Failed ✖') );
    })
    .transform( 'reactify' )

    .bundle()

    .pipe( source('bundle.js') )

    .pipe(streamify(uglify()))
    .on('error', function( err ){
        this.end();
        gulp.src('').pipe( notify('✖ Bunlde Failed ✖') );
    })
    .pipe( gulp.dest(paths.destJS))

});
