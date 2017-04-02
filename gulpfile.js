require('@fabalous/core/config/gulp/gulp.config');

var typedoc = require("gulp-typedoc");
var gulp = require('gulp');
gulp.task("typedoc", function() {
    return gulp
        .src(["src/*.ts", "src/transport/*.ts", "src/store/*.ts", "src/event/*.ts"])
        .pipe(typedoc({
            // TypeScript options (see typescript docs)
            module: "commonjs",
            target: "es5",
            includeDeclarations: true,

            // Output options (see typedoc docs)
            out: "./doc",

            //theme : "./docTemplate",

            // TypeDoc options (see typedoc docs)
            name: "Fabalous Runtime Web",
            ignoreCompilerErrors: true,
            version: true,
            excludeExternals:true
        }));
});