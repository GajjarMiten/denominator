#!/usr/bin/env node

import { Command } from "commander";

import { version } from "../package.json";

import { createComponent } from "./controllers/component.controller";

const program = new Command();

program.version(version);

program
    .option("-c --component <name>", "create a component")
    .option("-ext --extension <ext>", "adds an extension for the file")
    .action((args, flags) => {
        createComponent(args.component, args.extension);
    });
program.parse();
