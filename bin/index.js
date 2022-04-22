#!/usr/bin/env node
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _yargs = _interopRequireDefault(require("yargs/yargs"));

var _helpers = require("yargs/helpers");

var _switchAccount = require("./switchAccount");

var _initconfig = require("./initconfig");

var _add = require("./add");

var _helpers2 = require("./helpers");

(0, _yargs["default"])((0, _helpers.hideBin)(process.argv)).command({
  command: "init",
  desc: "init ~/.git-ssh/config",
  builder: function builder() {},
  handler: function () {
    var _handler = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return (0, _initconfig.createOrGetConfig)();

            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function handler() {
      return _handler.apply(this, arguments);
    }

    return handler;
  }()
}).command({
  command: "ls",
  desc: "ls github accounts in ~/.git-ssh/config",
  builder: function builder() {},
  handler: function () {
    var _handler2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      var configObj, lsInfo;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return (0, _initconfig.createOrGetConfig)();

            case 2:
              configObj = _context2.sent;
              _context2.next = 5;
              return (0, _helpers2.stringifyWithChalk)(configObj, null, 4);

            case 5:
              lsInfo = _context2.sent;
              console.log(lsInfo);

            case 7:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    function handler() {
      return _handler2.apply(this, arguments);
    }

    return handler;
  }()
}).command({
  command: "add",
  desc: "add github account by answering prompts \n 1. username;\n 2. email;\n 3. ssh-private-key file path;\n",
  builder: function builder() {},
  handler: function () {
    var _handler3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return (0, _add.add)();

            case 2:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    function handler() {
      return _handler3.apply(this, arguments);
    }

    return handler;
  }()
}).command({
  command: "use [name]",
  desc: "use specific ssh name for git",
  builder: function builder() {},
  handler: function () {
    var _handler4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(argv) {
      var hasAccount;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return (0, _initconfig.createOrGetConfig)();

            case 2:
              if (argv.name) {
                _context4.next = 6;
                break;
              }

              console.log("require name");
              _context4.next = 10;
              break;

            case 6:
              _context4.next = 8;
              return (0, _switchAccount.switchAccount)(argv.name);

            case 8:
              hasAccount = _context4.sent;

              if (!hasAccount) {
                console.log(argv.name, "not in config.json in .git-ssh");
              }

            case 10:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    function handler(_x) {
      return _handler4.apply(this, arguments);
    }

    return handler;
  }()
}).strictCommands().demandCommand().help().wrap(72).argv;