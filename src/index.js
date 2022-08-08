#!/usr/bin/env node

const { Command } = require("commander");

const { version } = require("../package.json");
const { createComponent } = require("./controllers/component.controller");

const program = new Command();

program.version(version);

program
    .option("-c --component <name>", "create a component")
    .option("-ext --extension <ext>", "adds an extension for the file")
    .action((args, flags) => {
        createComponent(args.component, {
            extension: args.extension,
        });
    });
program.parse();
