"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _paperCore = require("paper/dist/paper-core");

var _PaperRenderer = _interopRequireDefault(require("./PaperRenderer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var View =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(View, _Component);

  function View(props) {
    var _this;

    _this = _Component.call(this, props) || this;
    _this.canvas = void 0;
    _this.scope = void 0;
    _this.mountNode = void 0;
    _this.canvas = _react.default.createRef();
    return _this;
  }

  var _proto = View.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var _this$props = this.props,
        children = _this$props.children,
        width = _this$props.width,
        height = _this$props.height,
        settings = _this$props.settings;
    this.scope = new _paperCore.PaperScope();
    this.scope.setup(this.canvas.current);

    if (settings) {
      for (var _i = 0, _Object$keys = Object.keys(settings); _i < _Object$keys.length; _i++) {
        var key = _Object$keys[_i];
        this.scope.settings[key] = settings[key];
      }
    }

    this.scope.view.viewSize = new _paperCore.Size(width, height);
    this.mountNode = _PaperRenderer.default.createContainer(this.scope);

    _PaperRenderer.default.updateContainer(children, this.mountNode, this);
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    var _this$props2 = this.props,
        children = _this$props2.children,
        width = _this$props2.width,
        height = _this$props2.height;
    var view = this.scope.view;

    _PaperRenderer.default.updateContainer(children, this.mountNode, this);

    if (width !== prevProps.width || height !== prevProps.height) {
      var prevCenter = view.center;
      view.viewSize = new _paperCore.Size(width, height);
      view.translate(view.center.subtract(prevCenter));
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    _PaperRenderer.default.updateContainer(null, this.mountNode, this);
  };

  _proto.render = function render() {
    var _this$props3 = this.props,
        children = _this$props3.children,
        width = _this$props3.width,
        height = _this$props3.height,
        other = _objectWithoutPropertiesLoose(_this$props3, ["children", "width", "height"]);

    return _react.default.createElement("canvas", Object.assign({}, other, {
      ref: this.canvas
    }));
  };

  return View;
}(_react.Component);

exports.default = View;

_PaperRenderer.default.injectIntoDevTools({
  findFiberByHostInstance: function findFiberByHostInstance() {
    return null;
  },
  bundleType: process.env.NODE_ENV === 'production' ? 0 : 1,
  rendererPackageName: 'react-paper-bindings',
  version: '2.0.0'
});