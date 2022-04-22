import { readFileSync } from "fs";
import { resolve } from "path";
import untildify from "untildify";
import { execgitconfig } from "./helpers";
import {
    CONFIG_FILE_PATH,
    generateGitEmailCommand,
    generateGitNameCommand,
    generateGitSSHCommand,
    GIT_EMAIL_KEY,
    GIT_NAME_KEY,
    SSH_PATH_KEY,
} from "./constants";

const switchAccount = async (gitacc) => {
    const configObj = JSON.parse(readFileSync(CONFIG_FILE_PATH, "utf8"));
    if (!configObj[gitacc]) return false;

    const gitNameValue = configObj[gitacc][GIT_NAME_KEY];
    const gitEmailValue = configObj[gitacc][GIT_EMAIL_KEY];
    const privateFilePath = configObj[gitacc][SSH_PATH_KEY];
    const privateFileAbsolutePath = resolve(untildify(privateFilePath));
    // console.log("privateFileAbsolutePath", privateFileAbsolutePath);

    await execgitconfig(generateGitSSHCommand({ privateFileAbsolutePath }));
    await execgitconfig(generateGitNameCommand({ name: gitNameValue }));
    await execgitconfig(generateGitEmailCommand({ email: gitEmailValue }));
    return true;
};

export { switchAccount };

// switchAccount("kent");
