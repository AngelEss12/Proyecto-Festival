const { src, dest, watch, parallel } = require("gulp");

// Dependencias para CSS
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');

// Dependencias para imagenes
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

function css(done) {
    // Pasos para compilar el archivo de SaSS en JS
    src("src/scss/**/*.scss") // Paso 1: Identificiar el archivo de SaSS
        .pipe(plumber())
        .pipe(sass()) // Paso 2: Compilar
        .pipe(postcss([autoprefixer(), cssnano()])) // Dependecias para dejar mejor el archivo de css esto se hace al final de cada proyecto
        .pipe(dest("build/css")); // Paso 3: Almacenar en disco duro

    done(); // callback que avisa a gulp cuando llegamos al final de la ejecución.
}

function imagenes(done) {
    const opciones =  {
        optimizationLevel: 3
    };

    src('src/img/**/*.{png,jpg}')
        .pipe(cache(imagemin(opciones)))
        .pipe(dest('build/img'))
    done();
}

function versionWebp(done) {
    const opciones =  {
        quality: 50
    };

    src('src/img/**/*.{png,jpg}')
        .pipe(webp(opciones))
        .pipe(dest('build/img'))
    done();
}
function versionAvif(done) {
    const opciones =  {
        quality: 50
    };

    src('src/img/**/*.{png,jpg}')
        .pipe(avif(opciones))
        .pipe(dest('build/img'))
    done();
}

function javascript(done) {
    src('src/js/**/*.js')
        .pipe(dest('build/js'));

    done();
}

function dev(done) {
    watch("src/scss/**/*.scss", css);
    watch("src/js/**/*.js", javascript);

    done();
}

exports.css = css;
exports.js = javascript;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel(css, imagenes, versionWebp, versionAvif, javascript, dev);