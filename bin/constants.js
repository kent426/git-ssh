"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sshPathKey = exports.gitNameKey = exports.gitEmailKey = exports.CONFIG_REPO_PATH = exports.CONFIG_FILE_PATH = exports.CONFIG_FILE_NAME = void 0;

var _path = require("path");

var _os = require("os");

var CONFIG_REPO_PATH = (0, _path.join)((0, _os.homedir)(), "./.git-ssh/"); // export const configRepoPath = resolve(__dirname, "../.git-ssh");
// eslint-disable-next-line no-unused-vars

exports.CONFIG_REPO_PATH = CONFIG_REPO_PATH;
var CONFIG_FILE_NAME = "config.json";
exports.CONFIG_FILE_NAME = CONFIG_FILE_NAME;
var CONFIG_FILE_PATH = (0, _path.join)(CONFIG_REPO_PATH, CONFIG_FILE_NAME);
exports.CONFIG_FILE_PATH = CONFIG_FILE_PATH;
var sshPathKey = "ssh_private_path";
exports.sshPathKey = sshPathKey;
var gitNameKey = "name";
exports.gitNameKey = gitNameKey;
var gitEmailKey = "email";
exports.gitEmailKey = gitEmailKey;