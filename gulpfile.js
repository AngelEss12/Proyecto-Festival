const { src, dest, watch, parallel } = require("gulp");

// Dependencias para CSS
const sass = require("gulp-sass")(require("sass"));
const plumber = require("gulp-plumber");

// Dependencias para imagenes
const webp = require('gulp-webp');

function css(done) {
    // Pasos para compilar el archivo de SaSS en JS
    src("src/scss/**/*.scss") // Paso 1: Identificiar el archivo de SaSS
        .pipe(plumber())
        .pipe(sass()) // Paso 2: Compilar
        .pipe(dest("build/css")); // Paso 3: Almacenar en disco duro

    done(); // callback que avisa a gulp cuando llegamos al final de la ejecución.
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

function dev(done) {
    watch("src/scss/**/*.scss", css);

    done();
}

exports.css = css;
exports.versionWebp = versionWebp;
exports.dev = parallel(dev, versionWebp);