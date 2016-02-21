"use strict";

/**
 * Simple script to move JSON fields from `dependencies` to
 * `devDependencies`.
 *
 * Use case: You are publishing to `npm` and _won't_ need your build
 * dependencies, but you _will_ need them in git for git installs. This
 * scipt allows you to mutate just for npm publish then
 * `git checkout package.json` back to a pristine state.
 *
 * Note: Mutates `CWD/package.json` so make sure you are in the correct
 * directory when running this.
 *
 * Usage
 *
 * ```
 * $ node scripts/pkg-deps-to-dev.js PKG_NAME_1 PKG_NAME_2
 * $ node scripts/pkg-deps-to-dev.js builder builder-victory-component
 * ```
 */
var fs = require("fs");
var path = require("path");
var pkgPath = path.join(process.cwd(), "package.json");

var main = function () {
  var fields = process.argv.slice(2);
  if (fields.length === 0) { return; }

  var pkg = require(pkgPath); // eslint-disable-line global-require
  pkg.dependencies = pkg.dependencies || {};
  pkg.devDependencies = pkg.devDependencies || {};

  // Iterate fields.
  fields.forEach(function (field) {
    // Validate.
    var val = pkg.dependencies[field];
    if (!val) { throw new Error(pkgPath + " is missing field: " + field); }

    // Swap dep -> devDep in package.json
    pkg.devDependencies[field] = val;
    delete pkg.dependencies[field];
  });

  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
};

if (require.main === module) {
  main();
}
