import { exec as execCb } from "child_process";
import { promisify } from "util";
import {
    emailInConfigCommand,
    getGitSSHCommand,
    GIT_EMAIL_KEY,
    GIT_NAME_KEY,
    nameInConfigCommand,
    sshCMDInConfigCommand,
    SSH_PATH_KEY,
} from "./constants";
// import chalk from "chalk";

const exec = promisify(execCb);
export const execgitconfig = async (command, toPrint = true) => {
    try {
        const { stderr, stdout } = await exec(command);
        if (toPrint) console.log("successfully ran: ", command);
        if (stderr) {
            console.log(stderr);
        }
        return stdout;
    } catch (e) {
        console.log(e);
    }
};

export const stringifyWithChalk = async (configObj) => {
    const [currentName, currentEmail, currentSSHCommand] = await Promise.all([
        execgitconfig(nameInConfigCommand),
        execgitconfig(emailInConfigCommand),
        execgitconfig(sshCMDInConfigCommand),
    ]);

    return JSON.stringify(
        configObj,
        (key, val) => {
            if (
                typeof val === "object" &&
                val !== null &&
                currentName &&
                currentEmail &&
                currentSSHCommand &&
                currentName.trim() === val[GIT_NAME_KEY] &&
                currentEmail.trim() === val[GIT_EMAIL_KEY] &&
                currentSSHCommand.trim() ===
                    getGitSSHCommand({
                        privateFileAbsolutePath: val[SSH_PATH_KEY],
                    })
            ) {
                return JSON.stringify(val, null, 4);
                // return chalk.green.bold(JSON.stringify(val, null, 4));
            }
            return val;
        },
        4
    );
};
