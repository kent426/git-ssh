import { join } from "path";
import { homedir } from "os";

export const CONFIG_REPO_PATH = join(homedir(), "./.git-ssh/");
// export const configRepoPath = resolve(__dirname, "../.git-ssh");
// eslint-disable-next-line no-unused-vars
export const CONFIG_FILE_NAME = "config.json";
export const CONFIG_FILE_PATH = join(CONFIG_REPO_PATH, CONFIG_FILE_NAME);
export const SSH_PATH_KEY = "ssh_private_path";
export const GIT_NAME_KEY = "name";
export const GIT_EMAIL_KEY = "email";

export const generateGitSSHCommand = ({ privateFileAbsolutePath }) =>
    `git config --global core.sshCommand "ssh -i ${privateFileAbsolutePath}"`;
export const generateGitNameCommand = ({ name }) =>
    `git config --global  user.name ${name}`;
export const generateGitEmailCommand = ({ email }) =>
    `git config --global  user.email ${email}`;

export const getGitSSHCommand = ({ privateFileAbsolutePath }) =>
    `ssh -i ${privateFileAbsolutePath}`;

const getConfigCommand = (key) => `git config --global --get ${key}`;
const getNameKey = "user.name";
const getEmailKey = "user.email";
const getSSHCommandKey = "core.sshcommand";

export const nameInConfigCommand = getConfigCommand(getNameKey);
export const emailInConfigCommand = getConfigCommand(getEmailKey);
export const sshCMDInConfigCommand = getConfigCommand(getSSHCommandKey);
