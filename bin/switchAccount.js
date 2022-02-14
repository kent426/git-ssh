"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.switchAccount = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _fs = require("fs");

var _path = require("path");

var _child_process = require("child_process");

var _untildify = _interopRequireDefault(require("untildify"));

var _process = require("process");

var _util = require("util");

/* eslint-disable no-unused-vars */
var exec = (0, _util.promisify)(_child_process.exec); // import { homedir } from "os";
// const configRepoPath = join(homedir(), `/.git-ssh/`);

var configRepoPath = (0, _path.resolve)(__dirname, "../.git-ssh"); // eslint-disable-next-line no-unused-vars

var configFileName = "config.json";
var sshPathKey = "ssh_private_path";
var gitNameKey = "name";
var gitEmailKey = "email";
var configObj = JSON.parse((0, _fs.readFileSync)("".concat(configRepoPath, "/").concat(configFileName), "utf8"));

var switchAccount = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(gitacc) {
    var gitNameValue, gitEmailValue, privateFilePath, privateFileAbsolutePath;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (configObj[gitacc]) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return", false);

          case 2:
            gitNameValue = configObj[gitacc][gitNameKey];
            gitEmailValue = configObj[gitacc][gitEmailKey];
            privateFilePath = configObj[gitacc][sshPathKey];
            privateFileAbsolutePath = (0, _path.resolve)((0, _untildify["default"])(privateFilePath));
            console.log("privateFileAbsolutePath", privateFileAbsolutePath);
            _context.next = 9;
            return execgitconfig("git config --global core.sshCommand \"ssh -i ".concat(privateFileAbsolutePath, "\""));

          case 9:
            _context.next = 11;
            return execgitconfig("git config --global  user.name ".concat(gitNameValue));

          case 11:
            _context.next = 13;
            return execgitconfig("git config --global  user.email ".concat(gitEmailValue));

          case 13:
            return _context.abrupt("return", true);

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function switchAccount(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.switchAccount = switchAccount;

var execgitconfig = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(command) {
    var _yield$exec, stderr, _stdout;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return exec(command);

          case 3:
            _yield$exec = _context2.sent;
            stderr = _yield$exec.stderr;
            _stdout = _yield$exec.stdout;
            console.log("successfully ran: ", command);

            if (stderr) {
              console.log(stderr);
            }

            _context2.next = 13;
            break;

          case 10:
            _context2.prev = 10;
            _context2.t0 = _context2["catch"](0);
            console.log(_context2.t0);

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 10]]);
  }));

  return function execgitconfig(_x2) {
    return _ref2.apply(this, arguments);
  };
}(); // switchAccount("kent");