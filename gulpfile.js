const { src, dest, watch } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const plumber = require("gulp-plumber");

function css(done) {
    // Pasos para compilar el archivo de SaSS en JS
    src("src/scss/**/*.scss") // Paso 1: Identificiar el archivo de SaSS
        .pipe(plumber())
        .pipe(sass()) // Paso 2: Compilar
        .pipe(dest("build/css")); // Paso 3: Almacenar en disco duro

    done(); // callback que avisa a gulp cuando llegamos al final de la ejecución.
}

function dev(done) {
    watch("src/scss/**/*.scss", css);

    done();
}

exports.css = css;
exports.dev = dev;