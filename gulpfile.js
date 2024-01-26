const { src, dest } = require("gulp");
const sass = require("gulp-sass")(require("sass"));

function css(done) {
    // Pasos para compilar el archivo de SaSS en JS

    src("src/scss/app.scss") // Paso 1: Identificiar el archivo de SaSS
        .pipe(sass()) // Paso 2: Compilar
        .pipe(dest("build/css")); // Paso 3: Almacenar en disco duro

    done(); // callback que avisa a gulp cuando llegamos al final de la ejecución.
}

exports.css = css;