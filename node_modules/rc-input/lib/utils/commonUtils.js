"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasAddon = hasAddon;
exports.hasPrefixSuffix = hasPrefixSuffix;
exports.resolveOnChange = resolveOnChange;
exports.triggerFocus = triggerFocus;
function hasAddon(props) {
  return !!(props.addonBefore || props.addonAfter);
}
function hasPrefixSuffix(props) {
  return !!(props.prefix || props.suffix || props.allowClear);
}
function resolveOnChange(target, e, onChange, targetValue) {
  if (!onChange) {
    return;
  }
  var event = e;
  if (e.type === 'click') {
    // Clone a new target for event.
    // Avoid the following usage, the setQuery method gets the original value.
    //
    // const [query, setQuery] = React.useState('');
    // <Input
    //   allowClear
    //   value={query}
    //   onChange={(e)=> {
    //     setQuery((prevStatus) => e.target.value);
    //   }}
    // />

    var currentTarget = target.cloneNode(true);

    // click clear icon
    event = Object.create(e, {
      target: {
        value: currentTarget
      },
      currentTarget: {
        value: currentTarget
      }
    });
    currentTarget.value = '';
    onChange(event);
    return;
  }

  // Trigger by composition event, this means we need force change the input value
  if (targetValue !== undefined) {
    var _currentTarget = target.cloneNode(true);
    event = Object.create(e, {
      target: {
        value: _currentTarget
      },
      currentTarget: {
        value: _currentTarget
      }
    });
    // https://github.com/ant-design/ant-design/issues/45737
    if (_currentTarget.type !== 'file') {
      _currentTarget.value = targetValue;
    }
    onChange(event);
    return;
  }
  onChange(event);
}
function triggerFocus(element, option) {
  if (!element) return;
  element.focus(option);

  // Selection content
  var _ref = option || {},
    cursor = _ref.cursor;
  if (cursor) {
    var len = element.value.length;
    switch (cursor) {
      case 'start':
        element.setSelectionRange(0, 0);
        break;
      case 'end':
        element.setSelectionRange(len, len);
        break;
      default:
        element.setSelectionRange(0, len);
    }
  }
}