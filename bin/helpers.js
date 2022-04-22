"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stringifyWithChalk = exports.execgitconfig = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _child_process = require("child_process");

var _util = require("util");

var _constants = require("./constants");

// import chalk from "chalk";
var exec = (0, _util.promisify)(_child_process.exec);

var execgitconfig = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(command) {
    var toPrint,
        _yield$exec,
        stderr,
        stdout,
        _args = arguments;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            toPrint = _args.length > 1 && _args[1] !== undefined ? _args[1] : true;
            _context.prev = 1;
            _context.next = 4;
            return exec(command);

          case 4:
            _yield$exec = _context.sent;
            stderr = _yield$exec.stderr;
            stdout = _yield$exec.stdout;
            if (toPrint) console.log("successfully ran: ", command);

            if (stderr) {
              console.log(stderr);
            }

            return _context.abrupt("return", stdout);

          case 12:
            _context.prev = 12;
            _context.t0 = _context["catch"](1);
            console.log(_context.t0);

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 12]]);
  }));

  return function execgitconfig(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.execgitconfig = execgitconfig;

var stringifyWithChalk = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(configObj) {
    var _yield$Promise$all, _yield$Promise$all2, currentName, currentEmail, currentSSHCommand;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return Promise.all([execgitconfig(_constants.nameInConfigCommand), execgitconfig(_constants.emailInConfigCommand), execgitconfig(_constants.sshCMDInConfigCommand)]);

          case 2:
            _yield$Promise$all = _context2.sent;
            _yield$Promise$all2 = (0, _slicedToArray2["default"])(_yield$Promise$all, 3);
            currentName = _yield$Promise$all2[0];
            currentEmail = _yield$Promise$all2[1];
            currentSSHCommand = _yield$Promise$all2[2];
            return _context2.abrupt("return", JSON.stringify(configObj, function (key, val) {
              if ((0, _typeof2["default"])(val) === "object" && val !== null && currentName && currentEmail && currentSSHCommand && currentName.trim() === val[_constants.GIT_NAME_KEY] && currentEmail.trim() === val[_constants.GIT_EMAIL_KEY] && currentSSHCommand.trim() === (0, _constants.getGitSSHCommand)({
                privateFileAbsolutePath: val[_constants.SSH_PATH_KEY]
              })) {
                return JSON.stringify(val, null, 4); // return chalk.green.bold(JSON.stringify(val, null, 4));
              }

              return val;
            }, 4));

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function stringifyWithChalk(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

exports.stringifyWithChalk = stringifyWithChalk;