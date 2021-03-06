import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { switchAccount } from "./switchAccount";
import { createOrGetConfig } from "./initconfig";
import { add } from "./add";
import { stringifyWithChalk } from "./helpers";
import { EOL } from "os";

yargs(hideBin(process.argv))
    .command({
        command: "init",

        desc: "init ~/.git-ssh/config.json",
        builder: () => {},
        handler: async () => {
            await createOrGetConfig();
        },
    })
    .command({
        command: "ls",

        desc: "        ls github accounts in ~/.git-ssh/config.json",
        builder: () => {},
        handler: async () => {
            const configObj = await createOrGetConfig();
            const lsInfo = await stringifyWithChalk(configObj, null, 4);
            console.log(lsInfo);
        },
    })
    .command({
        command: "add",

        desc: `        add github account by answering prompts:  ${EOL} - 0. profile-name ${EOL} - 1. username;${EOL} - 2. email;${EOL} - 3. ssh-private-key file path;${EOL}`,
        builder: () => {},
        handler: async () => {
            await add();
        },
    })
    .command({
        command: "use [profileName]",

        desc: "        use specific ssh name for git",
        builder: () => {},
        handler: async (argv) => {
            await createOrGetConfig();
            if (!argv.profileName) {
                console.log("require profileName");
            } else {
                const hasAccount = await switchAccount(argv.profileName);
                if (!hasAccount) {
                    console.log(
                        argv.profileName,
                        "not in config.json in .git-ssh"
                    );
                }
            }
        },
    })
    .strictCommands()
    .demandCommand()
    .help()
    .wrap(72).argv;
