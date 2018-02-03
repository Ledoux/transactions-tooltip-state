'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _components = require('./hocs/components');

Object.keys(_components).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _components[key];
    }
  });
});

var _contents = require('./hocs/contents');

Object.keys(_contents).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _contents[key];
    }
  });
});