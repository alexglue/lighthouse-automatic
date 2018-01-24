#!/usr/bin/env node
const exit = require("exit");
const args = require("commander");
const path = require("path");
const root = process.env.PWD;
const config = require("./src/configs")(require("./package.json"));
const chalk = require("chalk");
const Application = require("./src/app");

console.log(
  chalk.green(
    `Running Lighthouse-automatic: ${chalk.blue("v" + config.version)}`
  )
);

try {
  Application.start();
} catch (e) {
  console.log(chalk.red("Error loading Application, see logs"));
  console.log(e);
  exit(1);
}
