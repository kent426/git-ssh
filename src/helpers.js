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
import chalk from "chalk";
import untildify from "untildify";
import { EOL } from "os";

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
        execgitconfig(nameInConfigCommand, false),
        execgitconfig(emailInConfigCommand, false),
        execgitconfig(sshCMDInConfigCommand, false),
    ]);

    let str = `{${EOL}`;
    let colorize = (x) => x;

    Object.keys(configObj).forEach((key) => {
        if (
            currentName &&
            currentEmail &&
            currentSSHCommand &&
            currentName.trim() === configObj[key][GIT_NAME_KEY] &&
            currentEmail.trim() === configObj[key][GIT_EMAIL_KEY] &&
            currentSSHCommand.trim() ===
                getGitSSHCommand({
                    privateFileAbsolutePath: untildify(
                        configObj[key][SSH_PATH_KEY]
                    ),
                })
        ) {
            colorize = chalk.green.bold;
        } else {
            colorize = (x) => x;
        }
        str += colorize(`    "${key}": {${EOL}`);
        str += colorize(
            `        ${GIT_NAME_KEY}: "${configObj[key][GIT_NAME_KEY]}",${EOL}`
        );
        str += colorize(
            `        ${GIT_EMAIL_KEY}: "${configObj[key][GIT_EMAIL_KEY]}",${EOL}`
        );
        str += colorize(
            `        ${SSH_PATH_KEY}: "${configObj[key][SSH_PATH_KEY]}",${EOL}`
        );
        str += colorize(`    },${EOL}`);
    });
    str += "}";
    return str;
};
