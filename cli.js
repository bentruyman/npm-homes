#!/usr/bin/env node

var npm = require("npm");

var argv = require("minimist")(process.argv.slice(2));
var pkg = require(process.env.PWD + "/package");
var deps = [];

if (argv.h || argv.help) {
  console.error("");
  console.error("  Usage: npm-homes [options]");
  console.error("");
  console.error("    --dev      Include devDependencies");
  console.error("    -h, --help Show this help information");
  console.error("");
  process.exit(1);
} else {
  if (pkg.dependencies) deps = deps.concat(Object.keys(pkg.dependencies));
  if (argv.dev && pkg.devDependencies) deps = deps.concat(Object.keys(pkg.devDependencies));

  npm.load(function (err) {
    npm.commands.docs(deps, console.error);
  });
}
