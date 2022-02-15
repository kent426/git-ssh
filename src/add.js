import inquirer from "inquirer";
import { SSH_PATH_KEY, GIT_EMAIL_KEY, GIT_NAME_KEY } from "./constants";
import { PathPrompt } from "inquirer-path";
inquirer.prompt.registerPrompt("path", PathPrompt);
import * as fs from "fs";
import { homedir } from "os";

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

export const add = () => {
    inquirer.prompt(questions).then((answers) => {
        console.log(JSON.stringify(answers, null, "  "));
    });
};
