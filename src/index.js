#!/usr/bin/env node
import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";
import { switchAccount } from "./switchAccount";
import { initconfig } from "./initconfig";
import { add } from "./add";

yargs(hideBin(process.argv))
    .command({
        command: "init",

        desc: "init ~/.git-ssh/config",
        builder: () => {},
        handler: async () => {
            await initconfig();
        },
    })
    .command({
        command: "add",

        desc: "add github account by answering prompts \n 1. username;\n 2. email;\n 3. ssh-private-key file path;\n",
        builder: () => {},
        handler: async () => {
            await add();
        },
    })
    .command({
        command: "use [name]",

        desc: "use specific ssh name for git",
        builder: () => {},
        handler: async (argv) => {
            await initconfig();
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
    .strictCommands()
    .demandCommand()
    .help()
    .wrap(72).argv;
