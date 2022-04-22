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

var _untildify = _interopRequireDefault(require("untildify"));

var _helpers = require("./helpers");

var _constants = require("./constants");

var switchAccount = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(gitacc) {
    var configObj, gitNameValue, gitEmailValue, privateFilePath, privateFileAbsolutePath;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            configObj = JSON.parse((0, _fs.readFileSync)(_constants.CONFIG_FILE_PATH, "utf8"));

            if (configObj[gitacc]) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", false);

          case 3:
            gitNameValue = configObj[gitacc][_constants.GIT_NAME_KEY];
            gitEmailValue = configObj[gitacc][_constants.GIT_EMAIL_KEY];
            privateFilePath = configObj[gitacc][_constants.SSH_PATH_KEY];
            privateFileAbsolutePath = (0, _path.resolve)((0, _untildify["default"])(privateFilePath)); // console.log("privateFileAbsolutePath", privateFileAbsolutePath);

            _context.next = 9;
            return (0, _helpers.execgitconfig)((0, _constants.generateGitSSHCommand)({
              privateFileAbsolutePath: privateFileAbsolutePath
            }));

          case 9:
            _context.next = 11;
            return (0, _helpers.execgitconfig)((0, _constants.generateGitNameCommand)({
              name: gitNameValue
            }));

          case 11:
            _context.next = 13;
            return (0, _helpers.execgitconfig)((0, _constants.generateGitEmailCommand)({
              email: gitEmailValue
            }));

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
}(); // switchAccount("kent");


exports.switchAccount = switchAccount;