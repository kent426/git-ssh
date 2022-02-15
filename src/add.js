import inquirer from "inquirer";
import {
    SSH_PATH_KEY,
    GIT_EMAIL_KEY,
    GIT_NAME_KEY,
    CONFIG_FILE_PATH,
} from "./constants";
import { PathPrompt } from "inquirer-path";
inquirer.prompt.registerPrompt("path", PathPrompt);
import * as fs from "fs";
import * as fsPromises from "fs/promises";
import { homedir } from "os";
import { createOrGetConfig } from "./initconfig";

function exists(path) {
    try {
        fs.accessSync(path, fs.R_OK);
        return true;
    } catch (error) {
        return false;
    }
}

const questions = [
    {
        type: "input",
        name: "profile",
        message: "What's your new profile name:",
    },
    {
        type: "input",
        name: GIT_NAME_KEY,
        message: "What's your github username:",
    },
    {
        type: "input",
        name: GIT_EMAIL_KEY,
        message: "What's your github email:",
        // default() {
        //     return "Doe";
        // },
    },
    {
        type: "path",
        name: SSH_PATH_KEY,
        message: "Where's ssh private key located in your file system:",
        default: homedir(),
        validate: (answer) =>
            exists(answer)
                ? true
                : "The path does not exist (Press SPACE to retry)",
        // transformer(color, answers, flags) {
        //     const text = chalkPipe(color)(color);
        //     if (flags.isFinal) {
        //         return text + "!";
        //     }

        //     return text;
        // },
    },
];

const updateConfig = async (answers) => {
    // console.log(JSON.stringify(answers, null, "  "));
    const { profile, ...values } = answers;

    const configObj = await createOrGetConfig();
    const newConfigObj = { ...configObj, [profile]: values };
    await fsPromises.writeFile(
        CONFIG_FILE_PATH,
        JSON.stringify(newConfigObj, null, 4)
    );
};

export const add = () => {
    inquirer.prompt(questions).then((answers) => {
        updateConfig(answers);
    });
};
