import * as fs from "fs/promises";
import {
    CONFIG_REPO_PATH,
    // CONFIG_FILE_NAME,
    CONFIG_FILE_PATH,
} from "./constants";

export const initconfig = async () => {
    try {
        await fs.mkdir(CONFIG_REPO_PATH, { recursive: true });
    } catch (e) {
        console.log(`cant create ${CONFIG_REPO_PATH}; init error:`, e);
        throw e;
    }
    try {
        await fs.access(CONFIG_FILE_PATH);
    } catch (e) {
        await fs.writeFile(CONFIG_FILE_PATH, JSON.stringify({}, null, 4));
        console.log(`${CONFIG_FILE_PATH} created.`);
        return {};
    }

    const str = await fs.readFile(CONFIG_FILE_PATH, { encoding: "utf-8" });
    return JSON.parse(str);
};
