"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initconfig = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var fs = _interopRequireWildcard(require("fs/promises"));

var _constants = require("./constants");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var initconfig = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var str;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return fs.mkdir(_constants.CONFIG_REPO_PATH, {
              recursive: true
            });

          case 3:
            _context.next = 9;
            break;

          case 5:
            _context.prev = 5;
            _context.t0 = _context["catch"](0);
            console.log("cant create ".concat(_constants.CONFIG_REPO_PATH, "; init error:"), _context.t0);
            throw _context.t0;

          case 9:
            _context.prev = 9;
            _context.next = 12;
            return fs.access(_constants.CONFIG_FILE_PATH);

          case 12:
            _context.next = 20;
            break;

          case 14:
            _context.prev = 14;
            _context.t1 = _context["catch"](9);
            _context.next = 18;
            return fs.writeFile(_constants.CONFIG_FILE_PATH, JSON.stringify({}, null, 4));

          case 18:
            console.log("".concat(_constants.CONFIG_FILE_PATH, " created."));
            return _context.abrupt("return", {});

          case 20:
            _context.next = 22;
            return fs.readFile(_constants.CONFIG_FILE_PATH, {
              encoding: "utf-8"
            });

          case 22:
            str = _context.sent;
            return _context.abrupt("return", JSON.parse(str));

          case 24:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 5], [9, 14]]);
  }));

  return function initconfig() {
    return _ref.apply(this, arguments);
  };
}();

exports.initconfig = initconfig;