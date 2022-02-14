import { join } from "path";
import { homedir } from "os";

export const CONFIG_REPO_PATH = join(homedir(), "/.git-ssh/");
// export const configRepoPath = resolve(__dirname, "../.git-ssh");
// eslint-disable-next-line no-unused-vars
export const CONFIG_FILE_NAME = "config.json";
export const CONFIG_FILE_PATH = `${CONFIG_REPO_PATH}/${CONFIG_FILE_NAME}`;
export const sshPathKey = "ssh_private_path";
export const gitNameKey = "name";
export const gitEmailKey = "email";
