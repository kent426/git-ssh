"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.add = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _inquirer = _interopRequireDefault(require("inquirer"));

var _constants = require("./constants");

var _inquirerPath = require("inquirer-path");

var fs = _interopRequireWildcard(require("fs"));

var fsPromises = _interopRequireWildcard(require("fs/promises"));

var _os = require("os");

var _initconfig = require("./initconfig");

var _excluded = ["profile"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

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
  name: "profile",
  message: "What's your new profile name:"
}, {
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

var updateConfig = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(answers) {
    var profile, values, configObj, newConfigObj;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log(JSON.stringify(answers, null, "  "));
            profile = answers.profile, values = (0, _objectWithoutProperties2["default"])(answers, _excluded);
            _context.next = 4;
            return (0, _initconfig.createOrGetConfig)();

          case 4:
            configObj = _context.sent;
            newConfigObj = _objectSpread(_objectSpread({}, configObj), {}, (0, _defineProperty2["default"])({}, profile, values));
            _context.next = 8;
            return fsPromises.writeFile(_constants.CONFIG_FILE_PATH, JSON.stringify(newConfigObj, null, 4));

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function updateConfig(_x) {
    return _ref.apply(this, arguments);
  };
}();

var add = function add() {
  _inquirer["default"].prompt(questions).then(function (answers) {
    updateConfig(answers);
  });
};

exports.add = add;