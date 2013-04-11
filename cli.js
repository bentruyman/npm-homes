#!/bin/sh
// 2>/dev/null; exec "`dirname "$0"`/node" "$0" "$@"

var spawn = require("child_process").spawn,
    optimist = require("optimist"),
    pkg = require(process.env.PWD + "/package"),
    deps = [];

var argv = optimist
    .usage("Usage: npm-homes [--dev]\nVisit all of your npm homes.")
    .alias("h", "help")
    .describe("dev", "Include devDependencies")
    .describe("help", "Show this help")
    .argv;

if (argv.help) {
  optimist.showHelp();
} else {
  if (pkg.dependencies)    deps = deps.concat(Object.keys(pkg.dependencies));
  if (argv.dev && pkg.devDependencies) deps = deps.concat(Object.keys(pkg.devDependencies));

  deps.forEach(function (dep) {
    spawn("npm", ["home", dep]);
  });
}
