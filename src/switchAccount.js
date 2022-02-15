/* eslint-disable no-unused-vars */
import { readFileSync } from "fs";
import { resolve, join } from "path";
import { execSync, exec as execCb } from "child_process";
import untildify from "untildify";
import { stdout } from "process";
import { promisify } from "util";
const exec = promisify(execCb);
import { homedir } from "os";

const configRepoPath = join(homedir(), "./.git-ssh/");
// const configRepoPath = resolve(__dirname, "../.git-ssh");
// eslint-disable-next-line no-unused-vars
const configFileName = "config.json";
const sshPathKey = "ssh_private_path";
const gitNameKey = "name";
const gitEmailKey = "email";

const switchAccount = async (gitacc) => {
    const configObj = JSON.parse(
        readFileSync(join(configRepoPath, configFileName), "utf8")
    );
    if (!configObj[gitacc]) return false;

    const gitNameValue = configObj[gitacc][gitNameKey];
    const gitEmailValue = configObj[gitacc][gitEmailKey];
    const privateFilePath = configObj[gitacc][sshPathKey];
    const privateFileAbsolutePath = resolve(untildify(privateFilePath));
    console.log("privateFileAbsolutePath", privateFileAbsolutePath);

    await execgitconfig(
        `git config --global core.sshCommand "ssh -i ${privateFileAbsolutePath}"`
    );
    await execgitconfig(`git config --global  user.name ${gitNameValue}`);
    await execgitconfig(`git config --global  user.email ${gitEmailValue}`);
    return true;
};

const execgitconfig = async (command) => {
    try {
        const { stderr, stdout } = await exec(command);
        console.log("successfully ran: ", command);
        if (stderr) {
            console.log(stderr);
        }
    } catch (e) {
        console.log(e);
    }
};

export { switchAccount };

// switchAccount("kent");
