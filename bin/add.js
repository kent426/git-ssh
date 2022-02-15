"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.add = void 0;

var _inquirer = _interopRequireDefault(require("inquirer"));

var _constants = require("./constants");

var _inquirerPath = require("inquirer-path");

var fs = _interopRequireWildcard(require("fs"));

var _os = require("os");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

_inquirer["default"].prompt.registerPrompt("path", _inquirerPath.PathPrompt);

function exists(path) {
  try {
    fs.accessSync(path, fs.R_OK);
    return true;
  } catch (error) {
    return false;
  }
}

var questions = [{
  type: "input",
  name: _constants.GIT_NAME_KEY,
  message: "What's your github username:"
}, {
  type: "input",
  name: _constants.GIT_EMAIL_KEY,
  message: "What's your github email:" // default() {
  //     return "Doe";
  // },

}, {
  type: "path",
  name: _constants.SSH_PATH_KEY,
  message: "Where's ssh private key located in your file system:",
  "default": (0, _os.homedir)(),
  validate: function validate(answer) {
    return exists(answer) ? true : "The path does not exist (Press SPACE to retry)";
  } // transformer(color, answers, flags) {
  //     const text = chalkPipe(color)(color);
  //     if (flags.isFinal) {
  //         return text + "!";
  //     }
  //     return text;
  // },

}];

var add = function add() {
  _inquirer["default"].prompt(questions).then(function (answers) {
    console.log(JSON.stringify(answers, null, "  "));
  });
};

exports.add = add;