#!/usr/bin/env node
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _yargs = _interopRequireDefault(require("yargs/yargs"));

var _helpers = require("yargs/helpers");

var _switchAccount = require("./switchAccount");

var _initconfig = require("./initconfig");

(0, _yargs["default"])((0, _helpers.hideBin)(process.argv)).command({
  command: "use [name]",
  desc: "use specific ssh name for git",
  builder: function builder() {},
  handler: function () {
    var _handler = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(argv) {
      var hasAccount;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (argv.name) {
                _context.next = 4;
                break;
              }

              console.log("require name");
              _context.next = 8;
              break;

            case 4:
              _context.next = 6;
              return (0, _switchAccount.switchAccount)(argv.name);

            case 6:
              hasAccount = _context.sent;

              if (!hasAccount) {
                console.log(argv.name, "not in config.json in .git-ssh");
              }

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function handler(_x) {
      return _handler.apply(this, arguments);
    }

    return handler;
  }()
}).command({
  command: "init",
  desc: "init ~/.git-ssh/config",
  builder: function builder() {},
  handler: function () {
    var _handler2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return (0, _initconfig.initconfig)();

            case 2:
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
}).strictCommands().demandCommand().help().wrap(72).argv;