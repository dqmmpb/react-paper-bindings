"use strict";

exports.__esModule = true;
exports.default = void 0;

var _reactReconciler = _interopRequireDefault(require("react-reconciler"));

var _scheduler = require("scheduler");

var _invariant = _interopRequireDefault(require("fbjs/lib/invariant"));

var _emptyObject = _interopRequireDefault(require("fbjs/lib/emptyObject"));

var _paperCore = require("paper/dist/paper-core");

var _types = _interopRequireDefault(require("./types"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var isGroup = function isGroup(n) {
  return n instanceof _paperCore.Group || n instanceof _paperCore.CompoundPath;
};

var isPath = function isPath(n) {
  return n instanceof _paperCore.Path || n instanceof _paperCore.CompoundPath;
};

var isItem = function isItem(n) {
  return n instanceof _paperCore.Item;
};

function applyItemProps(instance, props, prevProps) {
  if (prevProps === void 0) {
    prevProps = {};
  }

  if (props.blendMode !== prevProps.blendMode) {
    instance.blendMode = props.blendMode;
  }

  if (props.clipMask !== prevProps.clipMask) {
    instance.clipMask = props.clipMask;
  }

  if (props.opacity !== prevProps.opacity) {
    instance.opacity = props.opacity;
  }

  if (props.rotation !== prevProps.rotation) {
    instance.rotation = props.rotation;
  }

  if (props.selected !== prevProps.selected) {
    instance.selected = props.selected;
  }

  if (props.visible !== prevProps.visible) {
    instance.visible = props.visible;
  }
}

function applyStyleProps(instance, props) {
  if (props.fillColor) {
    instance.fillColor = props.fillColor;
  }

  if (props.strokeColor) {
    instance.strokeColor = props.strokeColor;
  }

  if (props.selected) {
    instance.selected = props.selected;
  }
}

function applyGroupProps(instance, props, prevProps) {
  if (prevProps === void 0) {
    prevProps = {};
  }

  applyItemProps(instance, props, prevProps);

  if (!(0, _utils.arePointsEqual)(props.center, prevProps.center)) {
    instance.translate([props.center[0] - prevProps.center[0], props.center[1] - prevProps.center[1]]);
  }

  if (!(0, _utils.arePointsEqual)(props.pivot, prevProps.pivot)) {
    instance.pivot = props.pivot;
  }

  if (!(0, _utils.arePointsEqual)(props.position, prevProps.position)) {
    instance.position = props.position;
  }

  if (props.rotation !== prevProps.rotation) {
    // in case null is set
    var rotation = props.rotation ? props.rotation : 0;
    var prevRotation = prevProps.rotation ? prevProps.rotation : 0;
    instance.rotate(rotation - prevRotation);
  } // TODO: check if this is ok


  if (props.strokeColor !== prevProps.strokeColor) {
    instance.strokeColor = props.strokeColor;
  }

  if (props.fillColor !== prevProps.fillColor) {
    instance.fillColor = props.fillColor;
  }
}

function applyLayerProps(instance, props, prevProps) {
  if (prevProps === void 0) {
    prevProps = {};
  }

  applyItemProps(instance, props, prevProps);

  if (props.active !== prevProps.active && props.active === true) {
    instance.activate();
  }

  if (props.locked !== prevProps.locked) {
    instance.locked = props.locked;
  } // TODO: check if this is ok


  if (props.strokeColor !== prevProps.strokeColor) {
    instance.strokeColor = props.strokeColor;
    instance.children.forEach(function (child) {
      if (isPath(child)) {
        child.strokeColor = props.strokeColor;
      }
    });
  }

  if (props.fillColor !== prevProps.fillColor) {
    instance.fillColor = props.fillColor;
  }
}

function applyPathProps(instance, props, prevProps) {
  if (prevProps === void 0) {
    prevProps = {};
  }

  applyItemProps(instance, props, prevProps);

  if (!(0, _utils.arePointsEqual)(props.center, prevProps.center)) {
    instance.translate([props.center[0] - prevProps.center[0], props.center[1] - prevProps.center[1]]);
  }

  if (!(0, _utils.arePointsEqual)(props.pivot, prevProps.pivot)) {
    instance.pivot = props.pivot;
    instance.position = props.position;
  }

  if (!(0, _utils.arePointsEqual)(props.position, prevProps.position)) {
    instance.position = props.position;
  }

  if (props.closed !== prevProps.closed) {
    instance.closed = props.closed;
  }

  if (props.dashArray !== prevProps.dashArray) {
    instance.dashArray = props.dashArray;
  }

  if (props.dashOffset !== prevProps.dashOffset) {
    instance.dashOffset = props.dashOffset;
  }

  if (props.fillColor !== prevProps.fillColor) {
    instance.fillColor = props.fillColor;
  }

  if (props.pathData !== prevProps.pathData) {
    instance.pathData = props.pathData;
  }

  if (!(0, _utils.arePointsEqual)(props.point, prevProps.point)) {
    instance.translate([props.point[0] - prevProps.point[0], props.point[1] - prevProps.point[1]]);
  }

  if (props.rotation !== prevProps.rotation) {
    // in case null is set
    var rotation = props.rotation ? props.rotation : 0;
    var prevRotation = prevProps.rotation ? prevProps.rotation : 0;
    instance.rotate(rotation - prevRotation);
  }

  if (props.strokeCap !== prevProps.strokeCap) {
    instance.strokeCap = props.strokeCap;
  }

  if (props.strokeColor !== prevProps.strokeColor) {
    instance.strokeColor = props.strokeColor;
  }

  if (props.strokeJoin !== prevProps.strokeJoin) {
    instance.strokeJoin = props.strokeJoin;
  }

  if (props.strokeScaling !== prevProps.strokeScaling) {
    instance.strokeScaling = props.strokeScaling;
  }

  if (props.strokeWidth !== prevProps.strokeWidth) {
    instance.strokeWidth = props.strokeWidth;
  }
}

function applyRectangleProps(instance, props, prevProps) {
  if (prevProps === void 0) {
    prevProps = {};
  }

  applyPathProps(instance, props, prevProps);

  if (!(0, _utils.arePointsEqual)(props.size, prevProps.size)) {
    instance.scale(props.size[0] / prevProps.size[0], props.size[1] / prevProps.size[1]);
  }
}

function applyArcProps(instance, props, prevProps) {
  if (prevProps === void 0) {
    prevProps = {};
  }

  applyPathProps(instance, props, prevProps);

  if (!(0, _utils.arePointsEqual)(props.from, prevProps.from)) {
    instance.from = props.from;
  }

  if (!(0, _utils.arePointsEqual)(props.to, prevProps.to)) {
    instance.to = props.to;
  }

  if (!(0, _utils.arePointsEqual)(props.through, prevProps.through)) {
    instance.through = props.through;
  }
}

function applyCircleProps(instance, props, prevProps) {
  if (prevProps === void 0) {
    prevProps = {};
  }

  applyPathProps(instance, props, prevProps);

  if (props.radius !== prevProps.radius) {
    instance.scale(props.radius / prevProps.radius);
  }
}

function applyEllipseProps(instance, props, prevProps) {
  if (prevProps === void 0) {
    prevProps = {};
  }

  applyRectangleProps(instance, props, prevProps);
}

function applyRasterProps(instance, props, prevProps) {
  if (prevProps === void 0) {
    prevProps = {};
  }

  applyItemProps(instance, props, prevProps);

  if (props.source !== prevProps.source) {
    instance.source = props.source;
  }

  if (props.onLoad !== prevProps.onLoad) {
    instance.onLoad = props.onLoad;
  }
}

function applyPointTextProps(instance, props, prevProps) {
  if (prevProps === void 0) {
    prevProps = {};
  }

  applyItemProps(instance, props, prevProps);

  if (props.content !== prevProps.content) {
    instance.content = props.content;
  }

  if (props.fillColor !== prevProps.fillColor) {
    instance.fillColor = props.fillColor;
  }

  if (props.fontFamily !== prevProps.fontFamily) {
    instance.fontFamily = props.fontFamily;
  }

  if (props.fontSize !== prevProps.fontSize) {
    instance.fontSize = props.fontSize;
  }

  if (props.fontWeight !== prevProps.fontWeight) {
    instance.fontWeight = props.fontWeight;
  }

  if (!(0, _utils.arePointsEqual)(props.point, prevProps.point)) {
    instance.translate([props.point[0] - prevProps.point[0], props.point[1] - prevProps.point[1]]);
  }
}

function applyToolProps(instance, props, prevProps) {
  if (prevProps === void 0) {
    prevProps = {};
  }

  if (props.active !== prevProps.active && props.active === true) {
    instance.activate();
  }

  if (props.onMouseDown !== prevProps.onMouseDown) {
    instance.onMouseDown = props.onMouseDown;
  }

  if (props.onMouseDrag !== prevProps.onMouseDrag) {
    instance.onMouseDrag = props.onMouseDrag;
  }

  if (props.onMouseMove !== prevProps.onMouseMove) {
    instance.onMouseMove = props.onMouseMove;
  }

  if (props.onMouseUp !== prevProps.onMouseUp) {
    instance.onMouseUp = props.onMouseUp;
  }

  if (props.onKeyUp !== prevProps.onKeyUp) {
    instance.onKeyUp = props.onKeyUp;
  }

  if (props.onKeyDown !== prevProps.onKeyDown) {
    instance.onKeyDown = props.onKeyDown;
  }
}

var PaperRenderer = (0, _reactReconciler.default)({
  appendInitialChild: function appendInitialChild(parentInstance, child) {
    if (typeof child === 'string') {
      // Noop for string children of Text (eg <Text>{'foo'}{'bar'}</Text>)
      (0, _invariant.default)(false, 'Text children should already be flattened.');
    } else if (isGroup(parentInstance) && isItem(child)) {
      child.addTo(parentInstance);
    }
  },
  createInstance: function createInstance(type, props, paperScope) {
    var children = props.children,
        paperProps = _objectWithoutPropertiesLoose(props, ["children"]);

    var instance = {};

    switch (type) {
      case _types.default.TOOL:
        instance = new _paperCore.Tool(paperProps);
        instance._applyProps = applyToolProps;
        break;

      case _types.default.CIRCLE:
        instance = new _paperCore.Path.Circle(paperProps);
        instance._applyProps = applyCircleProps;
        break;

      case _types.default.ELLIPSE:
        instance = new _paperCore.Path.Ellipse(paperProps);
        instance._applyProps = applyEllipseProps;
        break;

      case _types.default.GROUP:
        instance = new _paperCore.Group(paperProps);
        instance._applyProps = applyGroupProps;
        break;

      case _types.default.COMPOUNDPATH:
        instance = new _paperCore.CompoundPath(paperProps);
        instance._applyProps = applyPathProps;
        break;

      case _types.default.LAYER:
        instance = new _paperCore.Layer(paperProps);
        instance._applyProps = applyLayerProps;
        break;

      case _types.default.LINE:
        instance = new _paperCore.Path.Line(paperProps);
        instance._applyProps = applyPathProps;
        break;

      case _types.default.PATH:
        instance = new _paperCore.Path(paperProps);
        instance._applyProps = applyPathProps;
        break;

      case _types.default.POINTTEXT:
        instance = new _paperCore.PointText(paperProps);
        instance._applyProps = applyPointTextProps;
        break;

      case _types.default.RECTANGLE:
        instance = new _paperCore.Path.Rectangle(paperProps);
        instance._applyProps = applyRectangleProps;
        break;

      case _types.default.ARC:
        instance = new _paperCore.Path.Arc(paperProps);
        instance._applyProps = applyArcProps;
        break;

      case _types.default.RASTER:
        {
          var onLoad = paperProps.onLoad,
              rasterProps = _objectWithoutPropertiesLoose(paperProps, ["onLoad"]);

          instance = new _paperCore.Raster(rasterProps);
          instance._applyProps = applyRasterProps;

          if (typeof onLoad === 'function') {
            instance.onLoad = function () {
              return onLoad(instance);
            };
          }

          break;
        }

      default:
        (0, _invariant.default)(instance, 'PaperRenderer does not support the type "%s"', type);
        break;
    } // apply data type


    if (!instance.data) {
      instance.data = {
        type: type
      };
    } else if (!instance.data.type) {
      instance.data.type = type;
    }

    (0, _invariant.default)(instance, 'PaperRenderer does not support the type "%s"', type);
    return instance;
  },
  createTextInstance: function createTextInstance(text, rootContainerInstance, paperScope) {
    return text;
  },
  finalizeInitialChildren: function finalizeInitialChildren(domElement, type, props) {
    // If applyMatrix=true, group props should be applied after all children have benn added.
    // If applyMatrix=false, only style-related props (ex. fillColor, strokeColor) should be applied.
    // TODO: add case for Layer
    switch (type) {
      case _types.default.GROUP:
        if (domElement.applyMatrix) {
          applyGroupProps(domElement, props);
        } else {
          applyStyleProps(domElement, props);
        }

        break;

      default:
        break;
    }

    return false;
  },
  getPublicInstance: function getPublicInstance(instance) {
    return instance;
  },
  prepareForCommit: function prepareForCommit() {// Noop
  },
  prepareUpdate: function prepareUpdate(domElement, type, oldProps, newProps) {
    return true;
  },
  resetAfterCommit: function resetAfterCommit() {// Noop
  },
  resetTextContent: function resetTextContent(domElement) {// Noop
  },
  shouldDeprioritizeSubtree: function shouldDeprioritizeSubtree(type, props) {
    return false;
  },
  getRootHostContext: function getRootHostContext() {
    return _emptyObject.default;
  },
  getChildHostContext: function getChildHostContext() {
    return _emptyObject.default;
  },
  isPrimaryRenderer: false,
  supportsMutation: true,
  supportsHydration: false,
  supportsPersistence: false,
  //useSyncScheduling: true,
  scheduleTimeout: setTimeout,
  cancelTimeout: clearTimeout,
  noTimeout: -1,
  now: _scheduler.unstable_now,
  scheduleDeferredCallback: _scheduler.unstable_scheduleCallback,
  cancelDeferredCallback: _scheduler.unstable_cancelCallback,
  shouldSetTextContent: function shouldSetTextContent(type, props) {
    return typeof props.children === 'string' || typeof props.children === 'number';
  },
  appendChild: function appendChild(parentInstance, child) {
    if (child.parentNode === parentInstance) {
      child.remove();
    }

    if (isGroup(parentInstance) && isItem(child)) {
      child.addTo(parentInstance);
    }
  },
  appendChildToContainer: function appendChildToContainer(parentInstance, child) {
    if (child.parentNode === parentInstance) {
      child.remove();
    }

    if (isGroup(parentInstance) && isItem(child)) {
      child.addTo(parentInstance);
    }
  },
  insertBefore: function insertBefore(parentInstance, child, beforeChild) {
    (0, _invariant.default)(child !== beforeChild, 'PaperRenderer: Can not insert node before itself');

    if (isGroup(parentInstance) && isPath(child) && isPath(beforeChild)) {
      child.insertAbove(beforeChild);
    }
  },
  insertInContainerBefore: function insertInContainerBefore(parentInstance, child, beforeChild) {
    (0, _invariant.default)(child !== beforeChild, 'PaperRenderer: Can not insert node before itself');

    if (isGroup(parentInstance) && isPath(child) && isPath(beforeChild)) {
      child.insertAbove(beforeChild);
    }
  },
  removeChild: function removeChild(parentInstance, child) {
    child.remove();
  },
  removeChildFromContainer: function removeChildFromContainer(parentInstance, child) {
    child.remove();
  },
  commitTextUpdate: function commitTextUpdate(textInstance, oldText, newText) {// Noop
  },
  commitMount: function commitMount(instance, type, newProps) {// Noop
  },
  commitUpdate: function commitUpdate(instance, updatePayload, type, oldProps, newProps, paperScope) {
    instance._applyProps(instance, newProps, oldProps);
  }
});
var _default = PaperRenderer;
exports.default = _default;