#!/usr/bin/env node
import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";
import { switchAccount } from "./switchAccount";
import { initconfig } from "./initconfig";

yargs(hideBin(process.argv))
    .command({
        command: "use [name]",

        desc: "use specific ssh name for git",
        builder: () => {},
        handler: async (argv) => {
            if (!argv.name) {
                console.log("require name");
            } else {
                const hasAccount = await switchAccount(argv.name);
                if (!hasAccount) {
                    console.log(argv.name, "not in config.json in .git-ssh");
                }
            }
        },
    })
    .command({
        command: "init",

        desc: "init ~/.git-ssh/config",
        builder: () => {},
        handler: async () => {
            await initconfig();
        },
    })
    .strictCommands()
    .demandCommand()
    .help()
    .wrap(72).argv;
