/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/ansi-html/index.js":
/*!*****************************************!*\
  !*** ./node_modules/ansi-html/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = ansiHTML

// Reference to https://github.com/sindresorhus/ansi-regex
var _regANSI = /(?:(?:\u001b\[)|\u009b)(?:(?:[0-9]{1,3})?(?:(?:;[0-9]{0,3})*)?[A-M|f-m])|\u001b[A-M]/

var _defColors = {
  reset: ['fff', '000'], // [FOREGROUD_COLOR, BACKGROUND_COLOR]
  black: '000',
  red: 'ff0000',
  green: '209805',
  yellow: 'e8bf03',
  blue: '0000ff',
  magenta: 'ff00ff',
  cyan: '00ffee',
  lightgrey: 'f0f0f0',
  darkgrey: '888'
}
var _styles = {
  30: 'black',
  31: 'red',
  32: 'green',
  33: 'yellow',
  34: 'blue',
  35: 'magenta',
  36: 'cyan',
  37: 'lightgrey'
}
var _openTags = {
  '1': 'font-weight:bold', // bold
  '2': 'opacity:0.5', // dim
  '3': '<i>', // italic
  '4': '<u>', // underscore
  '8': 'display:none', // hidden
  '9': '<del>' // delete
}
var _closeTags = {
  '23': '</i>', // reset italic
  '24': '</u>', // reset underscore
  '29': '</del>' // reset delete
}

;[0, 21, 22, 27, 28, 39, 49].forEach(function (n) {
  _closeTags[n] = '</span>'
})

/**
 * Converts text with ANSI color codes to HTML markup.
 * @param {String} text
 * @returns {*}
 */
function ansiHTML (text) {
  // Returns the text if the string has no ANSI escape code.
  if (!_regANSI.test(text)) {
    return text
  }

  // Cache opened sequence.
  var ansiCodes = []
  // Replace with markup.
  var ret = text.replace(/\033\[(\d+)*m/g, function (match, seq) {
    var ot = _openTags[seq]
    if (ot) {
      // If current sequence has been opened, close it.
      if (!!~ansiCodes.indexOf(seq)) { // eslint-disable-line no-extra-boolean-cast
        ansiCodes.pop()
        return '</span>'
      }
      // Open tag.
      ansiCodes.push(seq)
      return ot[0] === '<' ? ot : '<span style="' + ot + ';">'
    }

    var ct = _closeTags[seq]
    if (ct) {
      // Pop sequence
      ansiCodes.pop()
      return ct
    }
    return ''
  })

  // Make sure tags are closed.
  var l = ansiCodes.length
  ;(l > 0) && (ret += Array(l + 1).join('</span>'))

  return ret
}

/**
 * Customize colors.
 * @param {Object} colors reference to _defColors
 */
ansiHTML.setColors = function (colors) {
  if (typeof colors !== 'object') {
    throw new Error('`colors` parameter must be an Object.')
  }

  var _finalColors = {}
  for (var key in _defColors) {
    var hex = colors.hasOwnProperty(key) ? colors[key] : null
    if (!hex) {
      _finalColors[key] = _defColors[key]
      continue
    }
    if ('reset' === key) {
      if (typeof hex === 'string') {
        hex = [hex]
      }
      if (!Array.isArray(hex) || hex.length === 0 || hex.some(function (h) {
        return typeof h !== 'string'
      })) {
        throw new Error('The value of `' + key + '` property must be an Array and each item could only be a hex string, e.g.: FF0000')
      }
      var defHexColor = _defColors[key]
      if (!hex[0]) {
        hex[0] = defHexColor[0]
      }
      if (hex.length === 1 || !hex[1]) {
        hex = [hex[0]]
        hex.push(defHexColor[1])
      }

      hex = hex.slice(0, 2)
    } else if (typeof hex !== 'string') {
      throw new Error('The value of `' + key + '` property must be a hex string, e.g.: FF0000')
    }
    _finalColors[key] = hex
  }
  _setTags(_finalColors)
}

/**
 * Reset colors.
 */
ansiHTML.reset = function () {
  _setTags(_defColors)
}

/**
 * Expose tags, including open and close.
 * @type {Object}
 */
ansiHTML.tags = {}

if (Object.defineProperty) {
  Object.defineProperty(ansiHTML.tags, 'open', {
    get: function () { return _openTags }
  })
  Object.defineProperty(ansiHTML.tags, 'close', {
    get: function () { return _closeTags }
  })
} else {
  ansiHTML.tags.open = _openTags
  ansiHTML.tags.close = _closeTags
}

function _setTags (colors) {
  // reset all
  _openTags['0'] = 'font-weight:normal;opacity:1;color:#' + colors.reset[0] + ';background:#' + colors.reset[1]
  // inverse
  _openTags['7'] = 'color:#' + colors.reset[1] + ';background:#' + colors.reset[0]
  // dark grey
  _openTags['90'] = 'color:#' + colors.darkgrey

  for (var code in _styles) {
    var color = _styles[code]
    var oriColor = colors[color] || '000'
    _openTags[code] = 'color:#' + oriColor
    code = parseInt(code)
    _openTags[(code + 10).toString()] = 'background:#' + oriColor
  }
}

ansiHTML.reset()


/***/ }),

/***/ "./node_modules/base64-js/index.js":
/*!*****************************************!*\
  !*** ./node_modules/base64-js/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  var i
  for (i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(
      uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)
    ))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}


/***/ }),

/***/ "./node_modules/buffer/index.js":
/*!**************************************!*\
  !*** ./node_modules/buffer/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(/*! base64-js */ "./node_modules/base64-js/index.js")
var ieee754 = __webpack_require__(/*! ieee754 */ "./node_modules/ieee754/index.js")
var isArray = __webpack_require__(/*! isarray */ "./node_modules/isarray/index.js")

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/events/events.js":
/*!***************************************!*\
  !*** ./node_modules/events/events.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var R = typeof Reflect === 'object' ? Reflect : null
var ReflectApply = R && typeof R.apply === 'function'
  ? R.apply
  : function ReflectApply(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
  }

var ReflectOwnKeys
if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target)
      .concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}

function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}

var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
}

function EventEmitter() {
  EventEmitter.init.call(this);
}
module.exports = EventEmitter;
module.exports.once = once;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

function checkListener(listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
}

Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function() {
    return defaultMaxListeners;
  },
  set: function(arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
    }
    defaultMaxListeners = arg;
  }
});

EventEmitter.init = function() {

  if (this._events === undefined ||
      this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
  }
  this._maxListeners = n;
  return this;
};

function _getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return _getMaxListeners(this);
};

EventEmitter.prototype.emit = function emit(type) {
  var args = [];
  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
  var doError = (type === 'error');

  var events = this._events;
  if (events !== undefined)
    doError = (doError && events.error === undefined);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    var er;
    if (args.length > 0)
      er = args[0];
    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    }
    // At least give some kind of context to the user
    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }

  var handler = events[type];

  if (handler === undefined)
    return false;

  if (typeof handler === 'function') {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      ReflectApply(listeners[i], this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  checkListener(listener);

  events = target._events;
  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit('newListener', type,
                  listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
        prepend ? [listener, existing] : [existing, listener];
      // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }

    // Check for listener leak
    m = _getMaxListeners(target);
    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true;
      // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax
      var w = new Error('Possible EventEmitter memory leak detected. ' +
                          existing.length + ' ' + String(type) + ' listeners ' +
                          'added. Use emitter.setMaxListeners() to ' +
                          'increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    if (arguments.length === 0)
      return this.listener.call(this.target);
    return this.listener.apply(this.target, arguments);
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  checkListener(listener);
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      checkListener(listener);
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      checkListener(listener);

      events = this._events;
      if (events === undefined)
        return this;

      list = events[type];
      if (list === undefined)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = Object.create(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener !== undefined)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (events === undefined)
        return this;

      // not listening for removeListener, no need to emit
      if (events.removeListener === undefined) {
        if (arguments.length === 0) {
          this._events = Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== undefined) {
          if (--this._eventsCount === 0)
            this._events = Object.create(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = Object.create(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners !== undefined) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (events === undefined)
    return [];

  var evlistener = events[type];
  if (evlistener === undefined)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ?
    unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events !== undefined) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function spliceOne(list, index) {
  for (; index + 1 < list.length; index++)
    list[index] = list[index + 1];
  list.pop();
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}

function once(emitter, name) {
  return new Promise(function (resolve, reject) {
    function eventListener() {
      if (errorListener !== undefined) {
        emitter.removeListener('error', errorListener);
      }
      resolve([].slice.call(arguments));
    };
    var errorListener;

    // Adding an error listener is not optional because
    // if an error is thrown on an event emitter we cannot
    // guarantee that the actual event we are waiting will
    // be fired. The result could be a silent way to create
    // memory or file descriptor leaks, which is something
    // we should avoid.
    if (name !== 'error') {
      errorListener = function errorListener(err) {
        emitter.removeListener(name, eventListener);
        reject(err);
      };

      emitter.once('error', errorListener);
    }

    emitter.once(name, eventListener);
  });
}


/***/ }),

/***/ "./node_modules/html-entities/lib/html4-entities.js":
/*!**********************************************************!*\
  !*** ./node_modules/html-entities/lib/html4-entities.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var HTML_ALPHA = ['apos', 'nbsp', 'iexcl', 'cent', 'pound', 'curren', 'yen', 'brvbar', 'sect', 'uml', 'copy', 'ordf', 'laquo', 'not', 'shy', 'reg', 'macr', 'deg', 'plusmn', 'sup2', 'sup3', 'acute', 'micro', 'para', 'middot', 'cedil', 'sup1', 'ordm', 'raquo', 'frac14', 'frac12', 'frac34', 'iquest', 'Agrave', 'Aacute', 'Acirc', 'Atilde', 'Auml', 'Aring', 'Aelig', 'Ccedil', 'Egrave', 'Eacute', 'Ecirc', 'Euml', 'Igrave', 'Iacute', 'Icirc', 'Iuml', 'ETH', 'Ntilde', 'Ograve', 'Oacute', 'Ocirc', 'Otilde', 'Ouml', 'times', 'Oslash', 'Ugrave', 'Uacute', 'Ucirc', 'Uuml', 'Yacute', 'THORN', 'szlig', 'agrave', 'aacute', 'acirc', 'atilde', 'auml', 'aring', 'aelig', 'ccedil', 'egrave', 'eacute', 'ecirc', 'euml', 'igrave', 'iacute', 'icirc', 'iuml', 'eth', 'ntilde', 'ograve', 'oacute', 'ocirc', 'otilde', 'ouml', 'divide', 'oslash', 'ugrave', 'uacute', 'ucirc', 'uuml', 'yacute', 'thorn', 'yuml', 'quot', 'amp', 'lt', 'gt', 'OElig', 'oelig', 'Scaron', 'scaron', 'Yuml', 'circ', 'tilde', 'ensp', 'emsp', 'thinsp', 'zwnj', 'zwj', 'lrm', 'rlm', 'ndash', 'mdash', 'lsquo', 'rsquo', 'sbquo', 'ldquo', 'rdquo', 'bdquo', 'dagger', 'Dagger', 'permil', 'lsaquo', 'rsaquo', 'euro', 'fnof', 'Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta', 'Eta', 'Theta', 'Iota', 'Kappa', 'Lambda', 'Mu', 'Nu', 'Xi', 'Omicron', 'Pi', 'Rho', 'Sigma', 'Tau', 'Upsilon', 'Phi', 'Chi', 'Psi', 'Omega', 'alpha', 'beta', 'gamma', 'delta', 'epsilon', 'zeta', 'eta', 'theta', 'iota', 'kappa', 'lambda', 'mu', 'nu', 'xi', 'omicron', 'pi', 'rho', 'sigmaf', 'sigma', 'tau', 'upsilon', 'phi', 'chi', 'psi', 'omega', 'thetasym', 'upsih', 'piv', 'bull', 'hellip', 'prime', 'Prime', 'oline', 'frasl', 'weierp', 'image', 'real', 'trade', 'alefsym', 'larr', 'uarr', 'rarr', 'darr', 'harr', 'crarr', 'lArr', 'uArr', 'rArr', 'dArr', 'hArr', 'forall', 'part', 'exist', 'empty', 'nabla', 'isin', 'notin', 'ni', 'prod', 'sum', 'minus', 'lowast', 'radic', 'prop', 'infin', 'ang', 'and', 'or', 'cap', 'cup', 'int', 'there4', 'sim', 'cong', 'asymp', 'ne', 'equiv', 'le', 'ge', 'sub', 'sup', 'nsub', 'sube', 'supe', 'oplus', 'otimes', 'perp', 'sdot', 'lceil', 'rceil', 'lfloor', 'rfloor', 'lang', 'rang', 'loz', 'spades', 'clubs', 'hearts', 'diams'];
var HTML_CODES = [39, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255, 34, 38, 60, 62, 338, 339, 352, 353, 376, 710, 732, 8194, 8195, 8201, 8204, 8205, 8206, 8207, 8211, 8212, 8216, 8217, 8218, 8220, 8221, 8222, 8224, 8225, 8240, 8249, 8250, 8364, 402, 913, 914, 915, 916, 917, 918, 919, 920, 921, 922, 923, 924, 925, 926, 927, 928, 929, 931, 932, 933, 934, 935, 936, 937, 945, 946, 947, 948, 949, 950, 951, 952, 953, 954, 955, 956, 957, 958, 959, 960, 961, 962, 963, 964, 965, 966, 967, 968, 969, 977, 978, 982, 8226, 8230, 8242, 8243, 8254, 8260, 8472, 8465, 8476, 8482, 8501, 8592, 8593, 8594, 8595, 8596, 8629, 8656, 8657, 8658, 8659, 8660, 8704, 8706, 8707, 8709, 8711, 8712, 8713, 8715, 8719, 8721, 8722, 8727, 8730, 8733, 8734, 8736, 8743, 8744, 8745, 8746, 8747, 8756, 8764, 8773, 8776, 8800, 8801, 8804, 8805, 8834, 8835, 8836, 8838, 8839, 8853, 8855, 8869, 8901, 8968, 8969, 8970, 8971, 9001, 9002, 9674, 9824, 9827, 9829, 9830];
var alphaIndex = {};
var numIndex = {};
(function () {
    var i = 0;
    var length = HTML_ALPHA.length;
    while (i < length) {
        var a = HTML_ALPHA[i];
        var c = HTML_CODES[i];
        alphaIndex[a] = String.fromCharCode(c);
        numIndex[c] = a;
        i++;
    }
})();
var Html4Entities = /** @class */ (function () {
    function Html4Entities() {
    }
    Html4Entities.prototype.decode = function (str) {
        if (!str || !str.length) {
            return '';
        }
        return str.replace(/&(#?[\w\d]+);?/g, function (s, entity) {
            var chr;
            if (entity.charAt(0) === "#") {
                var code = entity.charAt(1).toLowerCase() === 'x' ?
                    parseInt(entity.substr(2), 16) :
                    parseInt(entity.substr(1));
                if (!(isNaN(code) || code < -32768 || code > 65535)) {
                    chr = String.fromCharCode(code);
                }
            }
            else {
                chr = alphaIndex[entity];
            }
            return chr || s;
        });
    };
    Html4Entities.decode = function (str) {
        return new Html4Entities().decode(str);
    };
    Html4Entities.prototype.encode = function (str) {
        if (!str || !str.length) {
            return '';
        }
        var strLength = str.length;
        var result = '';
        var i = 0;
        while (i < strLength) {
            var alpha = numIndex[str.charCodeAt(i)];
            result += alpha ? "&" + alpha + ";" : str.charAt(i);
            i++;
        }
        return result;
    };
    Html4Entities.encode = function (str) {
        return new Html4Entities().encode(str);
    };
    Html4Entities.prototype.encodeNonUTF = function (str) {
        if (!str || !str.length) {
            return '';
        }
        var strLength = str.length;
        var result = '';
        var i = 0;
        while (i < strLength) {
            var cc = str.charCodeAt(i);
            var alpha = numIndex[cc];
            if (alpha) {
                result += "&" + alpha + ";";
            }
            else if (cc < 32 || cc > 126) {
                result += "&#" + cc + ";";
            }
            else {
                result += str.charAt(i);
            }
            i++;
        }
        return result;
    };
    Html4Entities.encodeNonUTF = function (str) {
        return new Html4Entities().encodeNonUTF(str);
    };
    Html4Entities.prototype.encodeNonASCII = function (str) {
        if (!str || !str.length) {
            return '';
        }
        var strLength = str.length;
        var result = '';
        var i = 0;
        while (i < strLength) {
            var c = str.charCodeAt(i);
            if (c <= 255) {
                result += str[i++];
                continue;
            }
            result += '&#' + c + ';';
            i++;
        }
        return result;
    };
    Html4Entities.encodeNonASCII = function (str) {
        return new Html4Entities().encodeNonASCII(str);
    };
    return Html4Entities;
}());
exports.Html4Entities = Html4Entities;


/***/ }),

/***/ "./node_modules/html-entities/lib/html5-entities.js":
/*!**********************************************************!*\
  !*** ./node_modules/html-entities/lib/html5-entities.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ENTITIES = [['Aacute', [193]], ['aacute', [225]], ['Abreve', [258]], ['abreve', [259]], ['ac', [8766]], ['acd', [8767]], ['acE', [8766, 819]], ['Acirc', [194]], ['acirc', [226]], ['acute', [180]], ['Acy', [1040]], ['acy', [1072]], ['AElig', [198]], ['aelig', [230]], ['af', [8289]], ['Afr', [120068]], ['afr', [120094]], ['Agrave', [192]], ['agrave', [224]], ['alefsym', [8501]], ['aleph', [8501]], ['Alpha', [913]], ['alpha', [945]], ['Amacr', [256]], ['amacr', [257]], ['amalg', [10815]], ['amp', [38]], ['AMP', [38]], ['andand', [10837]], ['And', [10835]], ['and', [8743]], ['andd', [10844]], ['andslope', [10840]], ['andv', [10842]], ['ang', [8736]], ['ange', [10660]], ['angle', [8736]], ['angmsdaa', [10664]], ['angmsdab', [10665]], ['angmsdac', [10666]], ['angmsdad', [10667]], ['angmsdae', [10668]], ['angmsdaf', [10669]], ['angmsdag', [10670]], ['angmsdah', [10671]], ['angmsd', [8737]], ['angrt', [8735]], ['angrtvb', [8894]], ['angrtvbd', [10653]], ['angsph', [8738]], ['angst', [197]], ['angzarr', [9084]], ['Aogon', [260]], ['aogon', [261]], ['Aopf', [120120]], ['aopf', [120146]], ['apacir', [10863]], ['ap', [8776]], ['apE', [10864]], ['ape', [8778]], ['apid', [8779]], ['apos', [39]], ['ApplyFunction', [8289]], ['approx', [8776]], ['approxeq', [8778]], ['Aring', [197]], ['aring', [229]], ['Ascr', [119964]], ['ascr', [119990]], ['Assign', [8788]], ['ast', [42]], ['asymp', [8776]], ['asympeq', [8781]], ['Atilde', [195]], ['atilde', [227]], ['Auml', [196]], ['auml', [228]], ['awconint', [8755]], ['awint', [10769]], ['backcong', [8780]], ['backepsilon', [1014]], ['backprime', [8245]], ['backsim', [8765]], ['backsimeq', [8909]], ['Backslash', [8726]], ['Barv', [10983]], ['barvee', [8893]], ['barwed', [8965]], ['Barwed', [8966]], ['barwedge', [8965]], ['bbrk', [9141]], ['bbrktbrk', [9142]], ['bcong', [8780]], ['Bcy', [1041]], ['bcy', [1073]], ['bdquo', [8222]], ['becaus', [8757]], ['because', [8757]], ['Because', [8757]], ['bemptyv', [10672]], ['bepsi', [1014]], ['bernou', [8492]], ['Bernoullis', [8492]], ['Beta', [914]], ['beta', [946]], ['beth', [8502]], ['between', [8812]], ['Bfr', [120069]], ['bfr', [120095]], ['bigcap', [8898]], ['bigcirc', [9711]], ['bigcup', [8899]], ['bigodot', [10752]], ['bigoplus', [10753]], ['bigotimes', [10754]], ['bigsqcup', [10758]], ['bigstar', [9733]], ['bigtriangledown', [9661]], ['bigtriangleup', [9651]], ['biguplus', [10756]], ['bigvee', [8897]], ['bigwedge', [8896]], ['bkarow', [10509]], ['blacklozenge', [10731]], ['blacksquare', [9642]], ['blacktriangle', [9652]], ['blacktriangledown', [9662]], ['blacktriangleleft', [9666]], ['blacktriangleright', [9656]], ['blank', [9251]], ['blk12', [9618]], ['blk14', [9617]], ['blk34', [9619]], ['block', [9608]], ['bne', [61, 8421]], ['bnequiv', [8801, 8421]], ['bNot', [10989]], ['bnot', [8976]], ['Bopf', [120121]], ['bopf', [120147]], ['bot', [8869]], ['bottom', [8869]], ['bowtie', [8904]], ['boxbox', [10697]], ['boxdl', [9488]], ['boxdL', [9557]], ['boxDl', [9558]], ['boxDL', [9559]], ['boxdr', [9484]], ['boxdR', [9554]], ['boxDr', [9555]], ['boxDR', [9556]], ['boxh', [9472]], ['boxH', [9552]], ['boxhd', [9516]], ['boxHd', [9572]], ['boxhD', [9573]], ['boxHD', [9574]], ['boxhu', [9524]], ['boxHu', [9575]], ['boxhU', [9576]], ['boxHU', [9577]], ['boxminus', [8863]], ['boxplus', [8862]], ['boxtimes', [8864]], ['boxul', [9496]], ['boxuL', [9563]], ['boxUl', [9564]], ['boxUL', [9565]], ['boxur', [9492]], ['boxuR', [9560]], ['boxUr', [9561]], ['boxUR', [9562]], ['boxv', [9474]], ['boxV', [9553]], ['boxvh', [9532]], ['boxvH', [9578]], ['boxVh', [9579]], ['boxVH', [9580]], ['boxvl', [9508]], ['boxvL', [9569]], ['boxVl', [9570]], ['boxVL', [9571]], ['boxvr', [9500]], ['boxvR', [9566]], ['boxVr', [9567]], ['boxVR', [9568]], ['bprime', [8245]], ['breve', [728]], ['Breve', [728]], ['brvbar', [166]], ['bscr', [119991]], ['Bscr', [8492]], ['bsemi', [8271]], ['bsim', [8765]], ['bsime', [8909]], ['bsolb', [10693]], ['bsol', [92]], ['bsolhsub', [10184]], ['bull', [8226]], ['bullet', [8226]], ['bump', [8782]], ['bumpE', [10926]], ['bumpe', [8783]], ['Bumpeq', [8782]], ['bumpeq', [8783]], ['Cacute', [262]], ['cacute', [263]], ['capand', [10820]], ['capbrcup', [10825]], ['capcap', [10827]], ['cap', [8745]], ['Cap', [8914]], ['capcup', [10823]], ['capdot', [10816]], ['CapitalDifferentialD', [8517]], ['caps', [8745, 65024]], ['caret', [8257]], ['caron', [711]], ['Cayleys', [8493]], ['ccaps', [10829]], ['Ccaron', [268]], ['ccaron', [269]], ['Ccedil', [199]], ['ccedil', [231]], ['Ccirc', [264]], ['ccirc', [265]], ['Cconint', [8752]], ['ccups', [10828]], ['ccupssm', [10832]], ['Cdot', [266]], ['cdot', [267]], ['cedil', [184]], ['Cedilla', [184]], ['cemptyv', [10674]], ['cent', [162]], ['centerdot', [183]], ['CenterDot', [183]], ['cfr', [120096]], ['Cfr', [8493]], ['CHcy', [1063]], ['chcy', [1095]], ['check', [10003]], ['checkmark', [10003]], ['Chi', [935]], ['chi', [967]], ['circ', [710]], ['circeq', [8791]], ['circlearrowleft', [8634]], ['circlearrowright', [8635]], ['circledast', [8859]], ['circledcirc', [8858]], ['circleddash', [8861]], ['CircleDot', [8857]], ['circledR', [174]], ['circledS', [9416]], ['CircleMinus', [8854]], ['CirclePlus', [8853]], ['CircleTimes', [8855]], ['cir', [9675]], ['cirE', [10691]], ['cire', [8791]], ['cirfnint', [10768]], ['cirmid', [10991]], ['cirscir', [10690]], ['ClockwiseContourIntegral', [8754]], ['clubs', [9827]], ['clubsuit', [9827]], ['colon', [58]], ['Colon', [8759]], ['Colone', [10868]], ['colone', [8788]], ['coloneq', [8788]], ['comma', [44]], ['commat', [64]], ['comp', [8705]], ['compfn', [8728]], ['complement', [8705]], ['complexes', [8450]], ['cong', [8773]], ['congdot', [10861]], ['Congruent', [8801]], ['conint', [8750]], ['Conint', [8751]], ['ContourIntegral', [8750]], ['copf', [120148]], ['Copf', [8450]], ['coprod', [8720]], ['Coproduct', [8720]], ['copy', [169]], ['COPY', [169]], ['copysr', [8471]], ['CounterClockwiseContourIntegral', [8755]], ['crarr', [8629]], ['cross', [10007]], ['Cross', [10799]], ['Cscr', [119966]], ['cscr', [119992]], ['csub', [10959]], ['csube', [10961]], ['csup', [10960]], ['csupe', [10962]], ['ctdot', [8943]], ['cudarrl', [10552]], ['cudarrr', [10549]], ['cuepr', [8926]], ['cuesc', [8927]], ['cularr', [8630]], ['cularrp', [10557]], ['cupbrcap', [10824]], ['cupcap', [10822]], ['CupCap', [8781]], ['cup', [8746]], ['Cup', [8915]], ['cupcup', [10826]], ['cupdot', [8845]], ['cupor', [10821]], ['cups', [8746, 65024]], ['curarr', [8631]], ['curarrm', [10556]], ['curlyeqprec', [8926]], ['curlyeqsucc', [8927]], ['curlyvee', [8910]], ['curlywedge', [8911]], ['curren', [164]], ['curvearrowleft', [8630]], ['curvearrowright', [8631]], ['cuvee', [8910]], ['cuwed', [8911]], ['cwconint', [8754]], ['cwint', [8753]], ['cylcty', [9005]], ['dagger', [8224]], ['Dagger', [8225]], ['daleth', [8504]], ['darr', [8595]], ['Darr', [8609]], ['dArr', [8659]], ['dash', [8208]], ['Dashv', [10980]], ['dashv', [8867]], ['dbkarow', [10511]], ['dblac', [733]], ['Dcaron', [270]], ['dcaron', [271]], ['Dcy', [1044]], ['dcy', [1076]], ['ddagger', [8225]], ['ddarr', [8650]], ['DD', [8517]], ['dd', [8518]], ['DDotrahd', [10513]], ['ddotseq', [10871]], ['deg', [176]], ['Del', [8711]], ['Delta', [916]], ['delta', [948]], ['demptyv', [10673]], ['dfisht', [10623]], ['Dfr', [120071]], ['dfr', [120097]], ['dHar', [10597]], ['dharl', [8643]], ['dharr', [8642]], ['DiacriticalAcute', [180]], ['DiacriticalDot', [729]], ['DiacriticalDoubleAcute', [733]], ['DiacriticalGrave', [96]], ['DiacriticalTilde', [732]], ['diam', [8900]], ['diamond', [8900]], ['Diamond', [8900]], ['diamondsuit', [9830]], ['diams', [9830]], ['die', [168]], ['DifferentialD', [8518]], ['digamma', [989]], ['disin', [8946]], ['div', [247]], ['divide', [247]], ['divideontimes', [8903]], ['divonx', [8903]], ['DJcy', [1026]], ['djcy', [1106]], ['dlcorn', [8990]], ['dlcrop', [8973]], ['dollar', [36]], ['Dopf', [120123]], ['dopf', [120149]], ['Dot', [168]], ['dot', [729]], ['DotDot', [8412]], ['doteq', [8784]], ['doteqdot', [8785]], ['DotEqual', [8784]], ['dotminus', [8760]], ['dotplus', [8724]], ['dotsquare', [8865]], ['doublebarwedge', [8966]], ['DoubleContourIntegral', [8751]], ['DoubleDot', [168]], ['DoubleDownArrow', [8659]], ['DoubleLeftArrow', [8656]], ['DoubleLeftRightArrow', [8660]], ['DoubleLeftTee', [10980]], ['DoubleLongLeftArrow', [10232]], ['DoubleLongLeftRightArrow', [10234]], ['DoubleLongRightArrow', [10233]], ['DoubleRightArrow', [8658]], ['DoubleRightTee', [8872]], ['DoubleUpArrow', [8657]], ['DoubleUpDownArrow', [8661]], ['DoubleVerticalBar', [8741]], ['DownArrowBar', [10515]], ['downarrow', [8595]], ['DownArrow', [8595]], ['Downarrow', [8659]], ['DownArrowUpArrow', [8693]], ['DownBreve', [785]], ['downdownarrows', [8650]], ['downharpoonleft', [8643]], ['downharpoonright', [8642]], ['DownLeftRightVector', [10576]], ['DownLeftTeeVector', [10590]], ['DownLeftVectorBar', [10582]], ['DownLeftVector', [8637]], ['DownRightTeeVector', [10591]], ['DownRightVectorBar', [10583]], ['DownRightVector', [8641]], ['DownTeeArrow', [8615]], ['DownTee', [8868]], ['drbkarow', [10512]], ['drcorn', [8991]], ['drcrop', [8972]], ['Dscr', [119967]], ['dscr', [119993]], ['DScy', [1029]], ['dscy', [1109]], ['dsol', [10742]], ['Dstrok', [272]], ['dstrok', [273]], ['dtdot', [8945]], ['dtri', [9663]], ['dtrif', [9662]], ['duarr', [8693]], ['duhar', [10607]], ['dwangle', [10662]], ['DZcy', [1039]], ['dzcy', [1119]], ['dzigrarr', [10239]], ['Eacute', [201]], ['eacute', [233]], ['easter', [10862]], ['Ecaron', [282]], ['ecaron', [283]], ['Ecirc', [202]], ['ecirc', [234]], ['ecir', [8790]], ['ecolon', [8789]], ['Ecy', [1069]], ['ecy', [1101]], ['eDDot', [10871]], ['Edot', [278]], ['edot', [279]], ['eDot', [8785]], ['ee', [8519]], ['efDot', [8786]], ['Efr', [120072]], ['efr', [120098]], ['eg', [10906]], ['Egrave', [200]], ['egrave', [232]], ['egs', [10902]], ['egsdot', [10904]], ['el', [10905]], ['Element', [8712]], ['elinters', [9191]], ['ell', [8467]], ['els', [10901]], ['elsdot', [10903]], ['Emacr', [274]], ['emacr', [275]], ['empty', [8709]], ['emptyset', [8709]], ['EmptySmallSquare', [9723]], ['emptyv', [8709]], ['EmptyVerySmallSquare', [9643]], ['emsp13', [8196]], ['emsp14', [8197]], ['emsp', [8195]], ['ENG', [330]], ['eng', [331]], ['ensp', [8194]], ['Eogon', [280]], ['eogon', [281]], ['Eopf', [120124]], ['eopf', [120150]], ['epar', [8917]], ['eparsl', [10723]], ['eplus', [10865]], ['epsi', [949]], ['Epsilon', [917]], ['epsilon', [949]], ['epsiv', [1013]], ['eqcirc', [8790]], ['eqcolon', [8789]], ['eqsim', [8770]], ['eqslantgtr', [10902]], ['eqslantless', [10901]], ['Equal', [10869]], ['equals', [61]], ['EqualTilde', [8770]], ['equest', [8799]], ['Equilibrium', [8652]], ['equiv', [8801]], ['equivDD', [10872]], ['eqvparsl', [10725]], ['erarr', [10609]], ['erDot', [8787]], ['escr', [8495]], ['Escr', [8496]], ['esdot', [8784]], ['Esim', [10867]], ['esim', [8770]], ['Eta', [919]], ['eta', [951]], ['ETH', [208]], ['eth', [240]], ['Euml', [203]], ['euml', [235]], ['euro', [8364]], ['excl', [33]], ['exist', [8707]], ['Exists', [8707]], ['expectation', [8496]], ['exponentiale', [8519]], ['ExponentialE', [8519]], ['fallingdotseq', [8786]], ['Fcy', [1060]], ['fcy', [1092]], ['female', [9792]], ['ffilig', [64259]], ['fflig', [64256]], ['ffllig', [64260]], ['Ffr', [120073]], ['ffr', [120099]], ['filig', [64257]], ['FilledSmallSquare', [9724]], ['FilledVerySmallSquare', [9642]], ['fjlig', [102, 106]], ['flat', [9837]], ['fllig', [64258]], ['fltns', [9649]], ['fnof', [402]], ['Fopf', [120125]], ['fopf', [120151]], ['forall', [8704]], ['ForAll', [8704]], ['fork', [8916]], ['forkv', [10969]], ['Fouriertrf', [8497]], ['fpartint', [10765]], ['frac12', [189]], ['frac13', [8531]], ['frac14', [188]], ['frac15', [8533]], ['frac16', [8537]], ['frac18', [8539]], ['frac23', [8532]], ['frac25', [8534]], ['frac34', [190]], ['frac35', [8535]], ['frac38', [8540]], ['frac45', [8536]], ['frac56', [8538]], ['frac58', [8541]], ['frac78', [8542]], ['frasl', [8260]], ['frown', [8994]], ['fscr', [119995]], ['Fscr', [8497]], ['gacute', [501]], ['Gamma', [915]], ['gamma', [947]], ['Gammad', [988]], ['gammad', [989]], ['gap', [10886]], ['Gbreve', [286]], ['gbreve', [287]], ['Gcedil', [290]], ['Gcirc', [284]], ['gcirc', [285]], ['Gcy', [1043]], ['gcy', [1075]], ['Gdot', [288]], ['gdot', [289]], ['ge', [8805]], ['gE', [8807]], ['gEl', [10892]], ['gel', [8923]], ['geq', [8805]], ['geqq', [8807]], ['geqslant', [10878]], ['gescc', [10921]], ['ges', [10878]], ['gesdot', [10880]], ['gesdoto', [10882]], ['gesdotol', [10884]], ['gesl', [8923, 65024]], ['gesles', [10900]], ['Gfr', [120074]], ['gfr', [120100]], ['gg', [8811]], ['Gg', [8921]], ['ggg', [8921]], ['gimel', [8503]], ['GJcy', [1027]], ['gjcy', [1107]], ['gla', [10917]], ['gl', [8823]], ['glE', [10898]], ['glj', [10916]], ['gnap', [10890]], ['gnapprox', [10890]], ['gne', [10888]], ['gnE', [8809]], ['gneq', [10888]], ['gneqq', [8809]], ['gnsim', [8935]], ['Gopf', [120126]], ['gopf', [120152]], ['grave', [96]], ['GreaterEqual', [8805]], ['GreaterEqualLess', [8923]], ['GreaterFullEqual', [8807]], ['GreaterGreater', [10914]], ['GreaterLess', [8823]], ['GreaterSlantEqual', [10878]], ['GreaterTilde', [8819]], ['Gscr', [119970]], ['gscr', [8458]], ['gsim', [8819]], ['gsime', [10894]], ['gsiml', [10896]], ['gtcc', [10919]], ['gtcir', [10874]], ['gt', [62]], ['GT', [62]], ['Gt', [8811]], ['gtdot', [8919]], ['gtlPar', [10645]], ['gtquest', [10876]], ['gtrapprox', [10886]], ['gtrarr', [10616]], ['gtrdot', [8919]], ['gtreqless', [8923]], ['gtreqqless', [10892]], ['gtrless', [8823]], ['gtrsim', [8819]], ['gvertneqq', [8809, 65024]], ['gvnE', [8809, 65024]], ['Hacek', [711]], ['hairsp', [8202]], ['half', [189]], ['hamilt', [8459]], ['HARDcy', [1066]], ['hardcy', [1098]], ['harrcir', [10568]], ['harr', [8596]], ['hArr', [8660]], ['harrw', [8621]], ['Hat', [94]], ['hbar', [8463]], ['Hcirc', [292]], ['hcirc', [293]], ['hearts', [9829]], ['heartsuit', [9829]], ['hellip', [8230]], ['hercon', [8889]], ['hfr', [120101]], ['Hfr', [8460]], ['HilbertSpace', [8459]], ['hksearow', [10533]], ['hkswarow', [10534]], ['hoarr', [8703]], ['homtht', [8763]], ['hookleftarrow', [8617]], ['hookrightarrow', [8618]], ['hopf', [120153]], ['Hopf', [8461]], ['horbar', [8213]], ['HorizontalLine', [9472]], ['hscr', [119997]], ['Hscr', [8459]], ['hslash', [8463]], ['Hstrok', [294]], ['hstrok', [295]], ['HumpDownHump', [8782]], ['HumpEqual', [8783]], ['hybull', [8259]], ['hyphen', [8208]], ['Iacute', [205]], ['iacute', [237]], ['ic', [8291]], ['Icirc', [206]], ['icirc', [238]], ['Icy', [1048]], ['icy', [1080]], ['Idot', [304]], ['IEcy', [1045]], ['iecy', [1077]], ['iexcl', [161]], ['iff', [8660]], ['ifr', [120102]], ['Ifr', [8465]], ['Igrave', [204]], ['igrave', [236]], ['ii', [8520]], ['iiiint', [10764]], ['iiint', [8749]], ['iinfin', [10716]], ['iiota', [8489]], ['IJlig', [306]], ['ijlig', [307]], ['Imacr', [298]], ['imacr', [299]], ['image', [8465]], ['ImaginaryI', [8520]], ['imagline', [8464]], ['imagpart', [8465]], ['imath', [305]], ['Im', [8465]], ['imof', [8887]], ['imped', [437]], ['Implies', [8658]], ['incare', [8453]], ['in', [8712]], ['infin', [8734]], ['infintie', [10717]], ['inodot', [305]], ['intcal', [8890]], ['int', [8747]], ['Int', [8748]], ['integers', [8484]], ['Integral', [8747]], ['intercal', [8890]], ['Intersection', [8898]], ['intlarhk', [10775]], ['intprod', [10812]], ['InvisibleComma', [8291]], ['InvisibleTimes', [8290]], ['IOcy', [1025]], ['iocy', [1105]], ['Iogon', [302]], ['iogon', [303]], ['Iopf', [120128]], ['iopf', [120154]], ['Iota', [921]], ['iota', [953]], ['iprod', [10812]], ['iquest', [191]], ['iscr', [119998]], ['Iscr', [8464]], ['isin', [8712]], ['isindot', [8949]], ['isinE', [8953]], ['isins', [8948]], ['isinsv', [8947]], ['isinv', [8712]], ['it', [8290]], ['Itilde', [296]], ['itilde', [297]], ['Iukcy', [1030]], ['iukcy', [1110]], ['Iuml', [207]], ['iuml', [239]], ['Jcirc', [308]], ['jcirc', [309]], ['Jcy', [1049]], ['jcy', [1081]], ['Jfr', [120077]], ['jfr', [120103]], ['jmath', [567]], ['Jopf', [120129]], ['jopf', [120155]], ['Jscr', [119973]], ['jscr', [119999]], ['Jsercy', [1032]], ['jsercy', [1112]], ['Jukcy', [1028]], ['jukcy', [1108]], ['Kappa', [922]], ['kappa', [954]], ['kappav', [1008]], ['Kcedil', [310]], ['kcedil', [311]], ['Kcy', [1050]], ['kcy', [1082]], ['Kfr', [120078]], ['kfr', [120104]], ['kgreen', [312]], ['KHcy', [1061]], ['khcy', [1093]], ['KJcy', [1036]], ['kjcy', [1116]], ['Kopf', [120130]], ['kopf', [120156]], ['Kscr', [119974]], ['kscr', [120000]], ['lAarr', [8666]], ['Lacute', [313]], ['lacute', [314]], ['laemptyv', [10676]], ['lagran', [8466]], ['Lambda', [923]], ['lambda', [955]], ['lang', [10216]], ['Lang', [10218]], ['langd', [10641]], ['langle', [10216]], ['lap', [10885]], ['Laplacetrf', [8466]], ['laquo', [171]], ['larrb', [8676]], ['larrbfs', [10527]], ['larr', [8592]], ['Larr', [8606]], ['lArr', [8656]], ['larrfs', [10525]], ['larrhk', [8617]], ['larrlp', [8619]], ['larrpl', [10553]], ['larrsim', [10611]], ['larrtl', [8610]], ['latail', [10521]], ['lAtail', [10523]], ['lat', [10923]], ['late', [10925]], ['lates', [10925, 65024]], ['lbarr', [10508]], ['lBarr', [10510]], ['lbbrk', [10098]], ['lbrace', [123]], ['lbrack', [91]], ['lbrke', [10635]], ['lbrksld', [10639]], ['lbrkslu', [10637]], ['Lcaron', [317]], ['lcaron', [318]], ['Lcedil', [315]], ['lcedil', [316]], ['lceil', [8968]], ['lcub', [123]], ['Lcy', [1051]], ['lcy', [1083]], ['ldca', [10550]], ['ldquo', [8220]], ['ldquor', [8222]], ['ldrdhar', [10599]], ['ldrushar', [10571]], ['ldsh', [8626]], ['le', [8804]], ['lE', [8806]], ['LeftAngleBracket', [10216]], ['LeftArrowBar', [8676]], ['leftarrow', [8592]], ['LeftArrow', [8592]], ['Leftarrow', [8656]], ['LeftArrowRightArrow', [8646]], ['leftarrowtail', [8610]], ['LeftCeiling', [8968]], ['LeftDoubleBracket', [10214]], ['LeftDownTeeVector', [10593]], ['LeftDownVectorBar', [10585]], ['LeftDownVector', [8643]], ['LeftFloor', [8970]], ['leftharpoondown', [8637]], ['leftharpoonup', [8636]], ['leftleftarrows', [8647]], ['leftrightarrow', [8596]], ['LeftRightArrow', [8596]], ['Leftrightarrow', [8660]], ['leftrightarrows', [8646]], ['leftrightharpoons', [8651]], ['leftrightsquigarrow', [8621]], ['LeftRightVector', [10574]], ['LeftTeeArrow', [8612]], ['LeftTee', [8867]], ['LeftTeeVector', [10586]], ['leftthreetimes', [8907]], ['LeftTriangleBar', [10703]], ['LeftTriangle', [8882]], ['LeftTriangleEqual', [8884]], ['LeftUpDownVector', [10577]], ['LeftUpTeeVector', [10592]], ['LeftUpVectorBar', [10584]], ['LeftUpVector', [8639]], ['LeftVectorBar', [10578]], ['LeftVector', [8636]], ['lEg', [10891]], ['leg', [8922]], ['leq', [8804]], ['leqq', [8806]], ['leqslant', [10877]], ['lescc', [10920]], ['les', [10877]], ['lesdot', [10879]], ['lesdoto', [10881]], ['lesdotor', [10883]], ['lesg', [8922, 65024]], ['lesges', [10899]], ['lessapprox', [10885]], ['lessdot', [8918]], ['lesseqgtr', [8922]], ['lesseqqgtr', [10891]], ['LessEqualGreater', [8922]], ['LessFullEqual', [8806]], ['LessGreater', [8822]], ['lessgtr', [8822]], ['LessLess', [10913]], ['lesssim', [8818]], ['LessSlantEqual', [10877]], ['LessTilde', [8818]], ['lfisht', [10620]], ['lfloor', [8970]], ['Lfr', [120079]], ['lfr', [120105]], ['lg', [8822]], ['lgE', [10897]], ['lHar', [10594]], ['lhard', [8637]], ['lharu', [8636]], ['lharul', [10602]], ['lhblk', [9604]], ['LJcy', [1033]], ['ljcy', [1113]], ['llarr', [8647]], ['ll', [8810]], ['Ll', [8920]], ['llcorner', [8990]], ['Lleftarrow', [8666]], ['llhard', [10603]], ['lltri', [9722]], ['Lmidot', [319]], ['lmidot', [320]], ['lmoustache', [9136]], ['lmoust', [9136]], ['lnap', [10889]], ['lnapprox', [10889]], ['lne', [10887]], ['lnE', [8808]], ['lneq', [10887]], ['lneqq', [8808]], ['lnsim', [8934]], ['loang', [10220]], ['loarr', [8701]], ['lobrk', [10214]], ['longleftarrow', [10229]], ['LongLeftArrow', [10229]], ['Longleftarrow', [10232]], ['longleftrightarrow', [10231]], ['LongLeftRightArrow', [10231]], ['Longleftrightarrow', [10234]], ['longmapsto', [10236]], ['longrightarrow', [10230]], ['LongRightArrow', [10230]], ['Longrightarrow', [10233]], ['looparrowleft', [8619]], ['looparrowright', [8620]], ['lopar', [10629]], ['Lopf', [120131]], ['lopf', [120157]], ['loplus', [10797]], ['lotimes', [10804]], ['lowast', [8727]], ['lowbar', [95]], ['LowerLeftArrow', [8601]], ['LowerRightArrow', [8600]], ['loz', [9674]], ['lozenge', [9674]], ['lozf', [10731]], ['lpar', [40]], ['lparlt', [10643]], ['lrarr', [8646]], ['lrcorner', [8991]], ['lrhar', [8651]], ['lrhard', [10605]], ['lrm', [8206]], ['lrtri', [8895]], ['lsaquo', [8249]], ['lscr', [120001]], ['Lscr', [8466]], ['lsh', [8624]], ['Lsh', [8624]], ['lsim', [8818]], ['lsime', [10893]], ['lsimg', [10895]], ['lsqb', [91]], ['lsquo', [8216]], ['lsquor', [8218]], ['Lstrok', [321]], ['lstrok', [322]], ['ltcc', [10918]], ['ltcir', [10873]], ['lt', [60]], ['LT', [60]], ['Lt', [8810]], ['ltdot', [8918]], ['lthree', [8907]], ['ltimes', [8905]], ['ltlarr', [10614]], ['ltquest', [10875]], ['ltri', [9667]], ['ltrie', [8884]], ['ltrif', [9666]], ['ltrPar', [10646]], ['lurdshar', [10570]], ['luruhar', [10598]], ['lvertneqq', [8808, 65024]], ['lvnE', [8808, 65024]], ['macr', [175]], ['male', [9794]], ['malt', [10016]], ['maltese', [10016]], ['Map', [10501]], ['map', [8614]], ['mapsto', [8614]], ['mapstodown', [8615]], ['mapstoleft', [8612]], ['mapstoup', [8613]], ['marker', [9646]], ['mcomma', [10793]], ['Mcy', [1052]], ['mcy', [1084]], ['mdash', [8212]], ['mDDot', [8762]], ['measuredangle', [8737]], ['MediumSpace', [8287]], ['Mellintrf', [8499]], ['Mfr', [120080]], ['mfr', [120106]], ['mho', [8487]], ['micro', [181]], ['midast', [42]], ['midcir', [10992]], ['mid', [8739]], ['middot', [183]], ['minusb', [8863]], ['minus', [8722]], ['minusd', [8760]], ['minusdu', [10794]], ['MinusPlus', [8723]], ['mlcp', [10971]], ['mldr', [8230]], ['mnplus', [8723]], ['models', [8871]], ['Mopf', [120132]], ['mopf', [120158]], ['mp', [8723]], ['mscr', [120002]], ['Mscr', [8499]], ['mstpos', [8766]], ['Mu', [924]], ['mu', [956]], ['multimap', [8888]], ['mumap', [8888]], ['nabla', [8711]], ['Nacute', [323]], ['nacute', [324]], ['nang', [8736, 8402]], ['nap', [8777]], ['napE', [10864, 824]], ['napid', [8779, 824]], ['napos', [329]], ['napprox', [8777]], ['natural', [9838]], ['naturals', [8469]], ['natur', [9838]], ['nbsp', [160]], ['nbump', [8782, 824]], ['nbumpe', [8783, 824]], ['ncap', [10819]], ['Ncaron', [327]], ['ncaron', [328]], ['Ncedil', [325]], ['ncedil', [326]], ['ncong', [8775]], ['ncongdot', [10861, 824]], ['ncup', [10818]], ['Ncy', [1053]], ['ncy', [1085]], ['ndash', [8211]], ['nearhk', [10532]], ['nearr', [8599]], ['neArr', [8663]], ['nearrow', [8599]], ['ne', [8800]], ['nedot', [8784, 824]], ['NegativeMediumSpace', [8203]], ['NegativeThickSpace', [8203]], ['NegativeThinSpace', [8203]], ['NegativeVeryThinSpace', [8203]], ['nequiv', [8802]], ['nesear', [10536]], ['nesim', [8770, 824]], ['NestedGreaterGreater', [8811]], ['NestedLessLess', [8810]], ['nexist', [8708]], ['nexists', [8708]], ['Nfr', [120081]], ['nfr', [120107]], ['ngE', [8807, 824]], ['nge', [8817]], ['ngeq', [8817]], ['ngeqq', [8807, 824]], ['ngeqslant', [10878, 824]], ['nges', [10878, 824]], ['nGg', [8921, 824]], ['ngsim', [8821]], ['nGt', [8811, 8402]], ['ngt', [8815]], ['ngtr', [8815]], ['nGtv', [8811, 824]], ['nharr', [8622]], ['nhArr', [8654]], ['nhpar', [10994]], ['ni', [8715]], ['nis', [8956]], ['nisd', [8954]], ['niv', [8715]], ['NJcy', [1034]], ['njcy', [1114]], ['nlarr', [8602]], ['nlArr', [8653]], ['nldr', [8229]], ['nlE', [8806, 824]], ['nle', [8816]], ['nleftarrow', [8602]], ['nLeftarrow', [8653]], ['nleftrightarrow', [8622]], ['nLeftrightarrow', [8654]], ['nleq', [8816]], ['nleqq', [8806, 824]], ['nleqslant', [10877, 824]], ['nles', [10877, 824]], ['nless', [8814]], ['nLl', [8920, 824]], ['nlsim', [8820]], ['nLt', [8810, 8402]], ['nlt', [8814]], ['nltri', [8938]], ['nltrie', [8940]], ['nLtv', [8810, 824]], ['nmid', [8740]], ['NoBreak', [8288]], ['NonBreakingSpace', [160]], ['nopf', [120159]], ['Nopf', [8469]], ['Not', [10988]], ['not', [172]], ['NotCongruent', [8802]], ['NotCupCap', [8813]], ['NotDoubleVerticalBar', [8742]], ['NotElement', [8713]], ['NotEqual', [8800]], ['NotEqualTilde', [8770, 824]], ['NotExists', [8708]], ['NotGreater', [8815]], ['NotGreaterEqual', [8817]], ['NotGreaterFullEqual', [8807, 824]], ['NotGreaterGreater', [8811, 824]], ['NotGreaterLess', [8825]], ['NotGreaterSlantEqual', [10878, 824]], ['NotGreaterTilde', [8821]], ['NotHumpDownHump', [8782, 824]], ['NotHumpEqual', [8783, 824]], ['notin', [8713]], ['notindot', [8949, 824]], ['notinE', [8953, 824]], ['notinva', [8713]], ['notinvb', [8951]], ['notinvc', [8950]], ['NotLeftTriangleBar', [10703, 824]], ['NotLeftTriangle', [8938]], ['NotLeftTriangleEqual', [8940]], ['NotLess', [8814]], ['NotLessEqual', [8816]], ['NotLessGreater', [8824]], ['NotLessLess', [8810, 824]], ['NotLessSlantEqual', [10877, 824]], ['NotLessTilde', [8820]], ['NotNestedGreaterGreater', [10914, 824]], ['NotNestedLessLess', [10913, 824]], ['notni', [8716]], ['notniva', [8716]], ['notnivb', [8958]], ['notnivc', [8957]], ['NotPrecedes', [8832]], ['NotPrecedesEqual', [10927, 824]], ['NotPrecedesSlantEqual', [8928]], ['NotReverseElement', [8716]], ['NotRightTriangleBar', [10704, 824]], ['NotRightTriangle', [8939]], ['NotRightTriangleEqual', [8941]], ['NotSquareSubset', [8847, 824]], ['NotSquareSubsetEqual', [8930]], ['NotSquareSuperset', [8848, 824]], ['NotSquareSupersetEqual', [8931]], ['NotSubset', [8834, 8402]], ['NotSubsetEqual', [8840]], ['NotSucceeds', [8833]], ['NotSucceedsEqual', [10928, 824]], ['NotSucceedsSlantEqual', [8929]], ['NotSucceedsTilde', [8831, 824]], ['NotSuperset', [8835, 8402]], ['NotSupersetEqual', [8841]], ['NotTilde', [8769]], ['NotTildeEqual', [8772]], ['NotTildeFullEqual', [8775]], ['NotTildeTilde', [8777]], ['NotVerticalBar', [8740]], ['nparallel', [8742]], ['npar', [8742]], ['nparsl', [11005, 8421]], ['npart', [8706, 824]], ['npolint', [10772]], ['npr', [8832]], ['nprcue', [8928]], ['nprec', [8832]], ['npreceq', [10927, 824]], ['npre', [10927, 824]], ['nrarrc', [10547, 824]], ['nrarr', [8603]], ['nrArr', [8655]], ['nrarrw', [8605, 824]], ['nrightarrow', [8603]], ['nRightarrow', [8655]], ['nrtri', [8939]], ['nrtrie', [8941]], ['nsc', [8833]], ['nsccue', [8929]], ['nsce', [10928, 824]], ['Nscr', [119977]], ['nscr', [120003]], ['nshortmid', [8740]], ['nshortparallel', [8742]], ['nsim', [8769]], ['nsime', [8772]], ['nsimeq', [8772]], ['nsmid', [8740]], ['nspar', [8742]], ['nsqsube', [8930]], ['nsqsupe', [8931]], ['nsub', [8836]], ['nsubE', [10949, 824]], ['nsube', [8840]], ['nsubset', [8834, 8402]], ['nsubseteq', [8840]], ['nsubseteqq', [10949, 824]], ['nsucc', [8833]], ['nsucceq', [10928, 824]], ['nsup', [8837]], ['nsupE', [10950, 824]], ['nsupe', [8841]], ['nsupset', [8835, 8402]], ['nsupseteq', [8841]], ['nsupseteqq', [10950, 824]], ['ntgl', [8825]], ['Ntilde', [209]], ['ntilde', [241]], ['ntlg', [8824]], ['ntriangleleft', [8938]], ['ntrianglelefteq', [8940]], ['ntriangleright', [8939]], ['ntrianglerighteq', [8941]], ['Nu', [925]], ['nu', [957]], ['num', [35]], ['numero', [8470]], ['numsp', [8199]], ['nvap', [8781, 8402]], ['nvdash', [8876]], ['nvDash', [8877]], ['nVdash', [8878]], ['nVDash', [8879]], ['nvge', [8805, 8402]], ['nvgt', [62, 8402]], ['nvHarr', [10500]], ['nvinfin', [10718]], ['nvlArr', [10498]], ['nvle', [8804, 8402]], ['nvlt', [60, 8402]], ['nvltrie', [8884, 8402]], ['nvrArr', [10499]], ['nvrtrie', [8885, 8402]], ['nvsim', [8764, 8402]], ['nwarhk', [10531]], ['nwarr', [8598]], ['nwArr', [8662]], ['nwarrow', [8598]], ['nwnear', [10535]], ['Oacute', [211]], ['oacute', [243]], ['oast', [8859]], ['Ocirc', [212]], ['ocirc', [244]], ['ocir', [8858]], ['Ocy', [1054]], ['ocy', [1086]], ['odash', [8861]], ['Odblac', [336]], ['odblac', [337]], ['odiv', [10808]], ['odot', [8857]], ['odsold', [10684]], ['OElig', [338]], ['oelig', [339]], ['ofcir', [10687]], ['Ofr', [120082]], ['ofr', [120108]], ['ogon', [731]], ['Ograve', [210]], ['ograve', [242]], ['ogt', [10689]], ['ohbar', [10677]], ['ohm', [937]], ['oint', [8750]], ['olarr', [8634]], ['olcir', [10686]], ['olcross', [10683]], ['oline', [8254]], ['olt', [10688]], ['Omacr', [332]], ['omacr', [333]], ['Omega', [937]], ['omega', [969]], ['Omicron', [927]], ['omicron', [959]], ['omid', [10678]], ['ominus', [8854]], ['Oopf', [120134]], ['oopf', [120160]], ['opar', [10679]], ['OpenCurlyDoubleQuote', [8220]], ['OpenCurlyQuote', [8216]], ['operp', [10681]], ['oplus', [8853]], ['orarr', [8635]], ['Or', [10836]], ['or', [8744]], ['ord', [10845]], ['order', [8500]], ['orderof', [8500]], ['ordf', [170]], ['ordm', [186]], ['origof', [8886]], ['oror', [10838]], ['orslope', [10839]], ['orv', [10843]], ['oS', [9416]], ['Oscr', [119978]], ['oscr', [8500]], ['Oslash', [216]], ['oslash', [248]], ['osol', [8856]], ['Otilde', [213]], ['otilde', [245]], ['otimesas', [10806]], ['Otimes', [10807]], ['otimes', [8855]], ['Ouml', [214]], ['ouml', [246]], ['ovbar', [9021]], ['OverBar', [8254]], ['OverBrace', [9182]], ['OverBracket', [9140]], ['OverParenthesis', [9180]], ['para', [182]], ['parallel', [8741]], ['par', [8741]], ['parsim', [10995]], ['parsl', [11005]], ['part', [8706]], ['PartialD', [8706]], ['Pcy', [1055]], ['pcy', [1087]], ['percnt', [37]], ['period', [46]], ['permil', [8240]], ['perp', [8869]], ['pertenk', [8241]], ['Pfr', [120083]], ['pfr', [120109]], ['Phi', [934]], ['phi', [966]], ['phiv', [981]], ['phmmat', [8499]], ['phone', [9742]], ['Pi', [928]], ['pi', [960]], ['pitchfork', [8916]], ['piv', [982]], ['planck', [8463]], ['planckh', [8462]], ['plankv', [8463]], ['plusacir', [10787]], ['plusb', [8862]], ['pluscir', [10786]], ['plus', [43]], ['plusdo', [8724]], ['plusdu', [10789]], ['pluse', [10866]], ['PlusMinus', [177]], ['plusmn', [177]], ['plussim', [10790]], ['plustwo', [10791]], ['pm', [177]], ['Poincareplane', [8460]], ['pointint', [10773]], ['popf', [120161]], ['Popf', [8473]], ['pound', [163]], ['prap', [10935]], ['Pr', [10939]], ['pr', [8826]], ['prcue', [8828]], ['precapprox', [10935]], ['prec', [8826]], ['preccurlyeq', [8828]], ['Precedes', [8826]], ['PrecedesEqual', [10927]], ['PrecedesSlantEqual', [8828]], ['PrecedesTilde', [8830]], ['preceq', [10927]], ['precnapprox', [10937]], ['precneqq', [10933]], ['precnsim', [8936]], ['pre', [10927]], ['prE', [10931]], ['precsim', [8830]], ['prime', [8242]], ['Prime', [8243]], ['primes', [8473]], ['prnap', [10937]], ['prnE', [10933]], ['prnsim', [8936]], ['prod', [8719]], ['Product', [8719]], ['profalar', [9006]], ['profline', [8978]], ['profsurf', [8979]], ['prop', [8733]], ['Proportional', [8733]], ['Proportion', [8759]], ['propto', [8733]], ['prsim', [8830]], ['prurel', [8880]], ['Pscr', [119979]], ['pscr', [120005]], ['Psi', [936]], ['psi', [968]], ['puncsp', [8200]], ['Qfr', [120084]], ['qfr', [120110]], ['qint', [10764]], ['qopf', [120162]], ['Qopf', [8474]], ['qprime', [8279]], ['Qscr', [119980]], ['qscr', [120006]], ['quaternions', [8461]], ['quatint', [10774]], ['quest', [63]], ['questeq', [8799]], ['quot', [34]], ['QUOT', [34]], ['rAarr', [8667]], ['race', [8765, 817]], ['Racute', [340]], ['racute', [341]], ['radic', [8730]], ['raemptyv', [10675]], ['rang', [10217]], ['Rang', [10219]], ['rangd', [10642]], ['range', [10661]], ['rangle', [10217]], ['raquo', [187]], ['rarrap', [10613]], ['rarrb', [8677]], ['rarrbfs', [10528]], ['rarrc', [10547]], ['rarr', [8594]], ['Rarr', [8608]], ['rArr', [8658]], ['rarrfs', [10526]], ['rarrhk', [8618]], ['rarrlp', [8620]], ['rarrpl', [10565]], ['rarrsim', [10612]], ['Rarrtl', [10518]], ['rarrtl', [8611]], ['rarrw', [8605]], ['ratail', [10522]], ['rAtail', [10524]], ['ratio', [8758]], ['rationals', [8474]], ['rbarr', [10509]], ['rBarr', [10511]], ['RBarr', [10512]], ['rbbrk', [10099]], ['rbrace', [125]], ['rbrack', [93]], ['rbrke', [10636]], ['rbrksld', [10638]], ['rbrkslu', [10640]], ['Rcaron', [344]], ['rcaron', [345]], ['Rcedil', [342]], ['rcedil', [343]], ['rceil', [8969]], ['rcub', [125]], ['Rcy', [1056]], ['rcy', [1088]], ['rdca', [10551]], ['rdldhar', [10601]], ['rdquo', [8221]], ['rdquor', [8221]], ['CloseCurlyDoubleQuote', [8221]], ['rdsh', [8627]], ['real', [8476]], ['realine', [8475]], ['realpart', [8476]], ['reals', [8477]], ['Re', [8476]], ['rect', [9645]], ['reg', [174]], ['REG', [174]], ['ReverseElement', [8715]], ['ReverseEquilibrium', [8651]], ['ReverseUpEquilibrium', [10607]], ['rfisht', [10621]], ['rfloor', [8971]], ['rfr', [120111]], ['Rfr', [8476]], ['rHar', [10596]], ['rhard', [8641]], ['rharu', [8640]], ['rharul', [10604]], ['Rho', [929]], ['rho', [961]], ['rhov', [1009]], ['RightAngleBracket', [10217]], ['RightArrowBar', [8677]], ['rightarrow', [8594]], ['RightArrow', [8594]], ['Rightarrow', [8658]], ['RightArrowLeftArrow', [8644]], ['rightarrowtail', [8611]], ['RightCeiling', [8969]], ['RightDoubleBracket', [10215]], ['RightDownTeeVector', [10589]], ['RightDownVectorBar', [10581]], ['RightDownVector', [8642]], ['RightFloor', [8971]], ['rightharpoondown', [8641]], ['rightharpoonup', [8640]], ['rightleftarrows', [8644]], ['rightleftharpoons', [8652]], ['rightrightarrows', [8649]], ['rightsquigarrow', [8605]], ['RightTeeArrow', [8614]], ['RightTee', [8866]], ['RightTeeVector', [10587]], ['rightthreetimes', [8908]], ['RightTriangleBar', [10704]], ['RightTriangle', [8883]], ['RightTriangleEqual', [8885]], ['RightUpDownVector', [10575]], ['RightUpTeeVector', [10588]], ['RightUpVectorBar', [10580]], ['RightUpVector', [8638]], ['RightVectorBar', [10579]], ['RightVector', [8640]], ['ring', [730]], ['risingdotseq', [8787]], ['rlarr', [8644]], ['rlhar', [8652]], ['rlm', [8207]], ['rmoustache', [9137]], ['rmoust', [9137]], ['rnmid', [10990]], ['roang', [10221]], ['roarr', [8702]], ['robrk', [10215]], ['ropar', [10630]], ['ropf', [120163]], ['Ropf', [8477]], ['roplus', [10798]], ['rotimes', [10805]], ['RoundImplies', [10608]], ['rpar', [41]], ['rpargt', [10644]], ['rppolint', [10770]], ['rrarr', [8649]], ['Rrightarrow', [8667]], ['rsaquo', [8250]], ['rscr', [120007]], ['Rscr', [8475]], ['rsh', [8625]], ['Rsh', [8625]], ['rsqb', [93]], ['rsquo', [8217]], ['rsquor', [8217]], ['CloseCurlyQuote', [8217]], ['rthree', [8908]], ['rtimes', [8906]], ['rtri', [9657]], ['rtrie', [8885]], ['rtrif', [9656]], ['rtriltri', [10702]], ['RuleDelayed', [10740]], ['ruluhar', [10600]], ['rx', [8478]], ['Sacute', [346]], ['sacute', [347]], ['sbquo', [8218]], ['scap', [10936]], ['Scaron', [352]], ['scaron', [353]], ['Sc', [10940]], ['sc', [8827]], ['sccue', [8829]], ['sce', [10928]], ['scE', [10932]], ['Scedil', [350]], ['scedil', [351]], ['Scirc', [348]], ['scirc', [349]], ['scnap', [10938]], ['scnE', [10934]], ['scnsim', [8937]], ['scpolint', [10771]], ['scsim', [8831]], ['Scy', [1057]], ['scy', [1089]], ['sdotb', [8865]], ['sdot', [8901]], ['sdote', [10854]], ['searhk', [10533]], ['searr', [8600]], ['seArr', [8664]], ['searrow', [8600]], ['sect', [167]], ['semi', [59]], ['seswar', [10537]], ['setminus', [8726]], ['setmn', [8726]], ['sext', [10038]], ['Sfr', [120086]], ['sfr', [120112]], ['sfrown', [8994]], ['sharp', [9839]], ['SHCHcy', [1065]], ['shchcy', [1097]], ['SHcy', [1064]], ['shcy', [1096]], ['ShortDownArrow', [8595]], ['ShortLeftArrow', [8592]], ['shortmid', [8739]], ['shortparallel', [8741]], ['ShortRightArrow', [8594]], ['ShortUpArrow', [8593]], ['shy', [173]], ['Sigma', [931]], ['sigma', [963]], ['sigmaf', [962]], ['sigmav', [962]], ['sim', [8764]], ['simdot', [10858]], ['sime', [8771]], ['simeq', [8771]], ['simg', [10910]], ['simgE', [10912]], ['siml', [10909]], ['simlE', [10911]], ['simne', [8774]], ['simplus', [10788]], ['simrarr', [10610]], ['slarr', [8592]], ['SmallCircle', [8728]], ['smallsetminus', [8726]], ['smashp', [10803]], ['smeparsl', [10724]], ['smid', [8739]], ['smile', [8995]], ['smt', [10922]], ['smte', [10924]], ['smtes', [10924, 65024]], ['SOFTcy', [1068]], ['softcy', [1100]], ['solbar', [9023]], ['solb', [10692]], ['sol', [47]], ['Sopf', [120138]], ['sopf', [120164]], ['spades', [9824]], ['spadesuit', [9824]], ['spar', [8741]], ['sqcap', [8851]], ['sqcaps', [8851, 65024]], ['sqcup', [8852]], ['sqcups', [8852, 65024]], ['Sqrt', [8730]], ['sqsub', [8847]], ['sqsube', [8849]], ['sqsubset', [8847]], ['sqsubseteq', [8849]], ['sqsup', [8848]], ['sqsupe', [8850]], ['sqsupset', [8848]], ['sqsupseteq', [8850]], ['square', [9633]], ['Square', [9633]], ['SquareIntersection', [8851]], ['SquareSubset', [8847]], ['SquareSubsetEqual', [8849]], ['SquareSuperset', [8848]], ['SquareSupersetEqual', [8850]], ['SquareUnion', [8852]], ['squarf', [9642]], ['squ', [9633]], ['squf', [9642]], ['srarr', [8594]], ['Sscr', [119982]], ['sscr', [120008]], ['ssetmn', [8726]], ['ssmile', [8995]], ['sstarf', [8902]], ['Star', [8902]], ['star', [9734]], ['starf', [9733]], ['straightepsilon', [1013]], ['straightphi', [981]], ['strns', [175]], ['sub', [8834]], ['Sub', [8912]], ['subdot', [10941]], ['subE', [10949]], ['sube', [8838]], ['subedot', [10947]], ['submult', [10945]], ['subnE', [10955]], ['subne', [8842]], ['subplus', [10943]], ['subrarr', [10617]], ['subset', [8834]], ['Subset', [8912]], ['subseteq', [8838]], ['subseteqq', [10949]], ['SubsetEqual', [8838]], ['subsetneq', [8842]], ['subsetneqq', [10955]], ['subsim', [10951]], ['subsub', [10965]], ['subsup', [10963]], ['succapprox', [10936]], ['succ', [8827]], ['succcurlyeq', [8829]], ['Succeeds', [8827]], ['SucceedsEqual', [10928]], ['SucceedsSlantEqual', [8829]], ['SucceedsTilde', [8831]], ['succeq', [10928]], ['succnapprox', [10938]], ['succneqq', [10934]], ['succnsim', [8937]], ['succsim', [8831]], ['SuchThat', [8715]], ['sum', [8721]], ['Sum', [8721]], ['sung', [9834]], ['sup1', [185]], ['sup2', [178]], ['sup3', [179]], ['sup', [8835]], ['Sup', [8913]], ['supdot', [10942]], ['supdsub', [10968]], ['supE', [10950]], ['supe', [8839]], ['supedot', [10948]], ['Superset', [8835]], ['SupersetEqual', [8839]], ['suphsol', [10185]], ['suphsub', [10967]], ['suplarr', [10619]], ['supmult', [10946]], ['supnE', [10956]], ['supne', [8843]], ['supplus', [10944]], ['supset', [8835]], ['Supset', [8913]], ['supseteq', [8839]], ['supseteqq', [10950]], ['supsetneq', [8843]], ['supsetneqq', [10956]], ['supsim', [10952]], ['supsub', [10964]], ['supsup', [10966]], ['swarhk', [10534]], ['swarr', [8601]], ['swArr', [8665]], ['swarrow', [8601]], ['swnwar', [10538]], ['szlig', [223]], ['Tab', [9]], ['target', [8982]], ['Tau', [932]], ['tau', [964]], ['tbrk', [9140]], ['Tcaron', [356]], ['tcaron', [357]], ['Tcedil', [354]], ['tcedil', [355]], ['Tcy', [1058]], ['tcy', [1090]], ['tdot', [8411]], ['telrec', [8981]], ['Tfr', [120087]], ['tfr', [120113]], ['there4', [8756]], ['therefore', [8756]], ['Therefore', [8756]], ['Theta', [920]], ['theta', [952]], ['thetasym', [977]], ['thetav', [977]], ['thickapprox', [8776]], ['thicksim', [8764]], ['ThickSpace', [8287, 8202]], ['ThinSpace', [8201]], ['thinsp', [8201]], ['thkap', [8776]], ['thksim', [8764]], ['THORN', [222]], ['thorn', [254]], ['tilde', [732]], ['Tilde', [8764]], ['TildeEqual', [8771]], ['TildeFullEqual', [8773]], ['TildeTilde', [8776]], ['timesbar', [10801]], ['timesb', [8864]], ['times', [215]], ['timesd', [10800]], ['tint', [8749]], ['toea', [10536]], ['topbot', [9014]], ['topcir', [10993]], ['top', [8868]], ['Topf', [120139]], ['topf', [120165]], ['topfork', [10970]], ['tosa', [10537]], ['tprime', [8244]], ['trade', [8482]], ['TRADE', [8482]], ['triangle', [9653]], ['triangledown', [9663]], ['triangleleft', [9667]], ['trianglelefteq', [8884]], ['triangleq', [8796]], ['triangleright', [9657]], ['trianglerighteq', [8885]], ['tridot', [9708]], ['trie', [8796]], ['triminus', [10810]], ['TripleDot', [8411]], ['triplus', [10809]], ['trisb', [10701]], ['tritime', [10811]], ['trpezium', [9186]], ['Tscr', [119983]], ['tscr', [120009]], ['TScy', [1062]], ['tscy', [1094]], ['TSHcy', [1035]], ['tshcy', [1115]], ['Tstrok', [358]], ['tstrok', [359]], ['twixt', [8812]], ['twoheadleftarrow', [8606]], ['twoheadrightarrow', [8608]], ['Uacute', [218]], ['uacute', [250]], ['uarr', [8593]], ['Uarr', [8607]], ['uArr', [8657]], ['Uarrocir', [10569]], ['Ubrcy', [1038]], ['ubrcy', [1118]], ['Ubreve', [364]], ['ubreve', [365]], ['Ucirc', [219]], ['ucirc', [251]], ['Ucy', [1059]], ['ucy', [1091]], ['udarr', [8645]], ['Udblac', [368]], ['udblac', [369]], ['udhar', [10606]], ['ufisht', [10622]], ['Ufr', [120088]], ['ufr', [120114]], ['Ugrave', [217]], ['ugrave', [249]], ['uHar', [10595]], ['uharl', [8639]], ['uharr', [8638]], ['uhblk', [9600]], ['ulcorn', [8988]], ['ulcorner', [8988]], ['ulcrop', [8975]], ['ultri', [9720]], ['Umacr', [362]], ['umacr', [363]], ['uml', [168]], ['UnderBar', [95]], ['UnderBrace', [9183]], ['UnderBracket', [9141]], ['UnderParenthesis', [9181]], ['Union', [8899]], ['UnionPlus', [8846]], ['Uogon', [370]], ['uogon', [371]], ['Uopf', [120140]], ['uopf', [120166]], ['UpArrowBar', [10514]], ['uparrow', [8593]], ['UpArrow', [8593]], ['Uparrow', [8657]], ['UpArrowDownArrow', [8645]], ['updownarrow', [8597]], ['UpDownArrow', [8597]], ['Updownarrow', [8661]], ['UpEquilibrium', [10606]], ['upharpoonleft', [8639]], ['upharpoonright', [8638]], ['uplus', [8846]], ['UpperLeftArrow', [8598]], ['UpperRightArrow', [8599]], ['upsi', [965]], ['Upsi', [978]], ['upsih', [978]], ['Upsilon', [933]], ['upsilon', [965]], ['UpTeeArrow', [8613]], ['UpTee', [8869]], ['upuparrows', [8648]], ['urcorn', [8989]], ['urcorner', [8989]], ['urcrop', [8974]], ['Uring', [366]], ['uring', [367]], ['urtri', [9721]], ['Uscr', [119984]], ['uscr', [120010]], ['utdot', [8944]], ['Utilde', [360]], ['utilde', [361]], ['utri', [9653]], ['utrif', [9652]], ['uuarr', [8648]], ['Uuml', [220]], ['uuml', [252]], ['uwangle', [10663]], ['vangrt', [10652]], ['varepsilon', [1013]], ['varkappa', [1008]], ['varnothing', [8709]], ['varphi', [981]], ['varpi', [982]], ['varpropto', [8733]], ['varr', [8597]], ['vArr', [8661]], ['varrho', [1009]], ['varsigma', [962]], ['varsubsetneq', [8842, 65024]], ['varsubsetneqq', [10955, 65024]], ['varsupsetneq', [8843, 65024]], ['varsupsetneqq', [10956, 65024]], ['vartheta', [977]], ['vartriangleleft', [8882]], ['vartriangleright', [8883]], ['vBar', [10984]], ['Vbar', [10987]], ['vBarv', [10985]], ['Vcy', [1042]], ['vcy', [1074]], ['vdash', [8866]], ['vDash', [8872]], ['Vdash', [8873]], ['VDash', [8875]], ['Vdashl', [10982]], ['veebar', [8891]], ['vee', [8744]], ['Vee', [8897]], ['veeeq', [8794]], ['vellip', [8942]], ['verbar', [124]], ['Verbar', [8214]], ['vert', [124]], ['Vert', [8214]], ['VerticalBar', [8739]], ['VerticalLine', [124]], ['VerticalSeparator', [10072]], ['VerticalTilde', [8768]], ['VeryThinSpace', [8202]], ['Vfr', [120089]], ['vfr', [120115]], ['vltri', [8882]], ['vnsub', [8834, 8402]], ['vnsup', [8835, 8402]], ['Vopf', [120141]], ['vopf', [120167]], ['vprop', [8733]], ['vrtri', [8883]], ['Vscr', [119985]], ['vscr', [120011]], ['vsubnE', [10955, 65024]], ['vsubne', [8842, 65024]], ['vsupnE', [10956, 65024]], ['vsupne', [8843, 65024]], ['Vvdash', [8874]], ['vzigzag', [10650]], ['Wcirc', [372]], ['wcirc', [373]], ['wedbar', [10847]], ['wedge', [8743]], ['Wedge', [8896]], ['wedgeq', [8793]], ['weierp', [8472]], ['Wfr', [120090]], ['wfr', [120116]], ['Wopf', [120142]], ['wopf', [120168]], ['wp', [8472]], ['wr', [8768]], ['wreath', [8768]], ['Wscr', [119986]], ['wscr', [120012]], ['xcap', [8898]], ['xcirc', [9711]], ['xcup', [8899]], ['xdtri', [9661]], ['Xfr', [120091]], ['xfr', [120117]], ['xharr', [10231]], ['xhArr', [10234]], ['Xi', [926]], ['xi', [958]], ['xlarr', [10229]], ['xlArr', [10232]], ['xmap', [10236]], ['xnis', [8955]], ['xodot', [10752]], ['Xopf', [120143]], ['xopf', [120169]], ['xoplus', [10753]], ['xotime', [10754]], ['xrarr', [10230]], ['xrArr', [10233]], ['Xscr', [119987]], ['xscr', [120013]], ['xsqcup', [10758]], ['xuplus', [10756]], ['xutri', [9651]], ['xvee', [8897]], ['xwedge', [8896]], ['Yacute', [221]], ['yacute', [253]], ['YAcy', [1071]], ['yacy', [1103]], ['Ycirc', [374]], ['ycirc', [375]], ['Ycy', [1067]], ['ycy', [1099]], ['yen', [165]], ['Yfr', [120092]], ['yfr', [120118]], ['YIcy', [1031]], ['yicy', [1111]], ['Yopf', [120144]], ['yopf', [120170]], ['Yscr', [119988]], ['yscr', [120014]], ['YUcy', [1070]], ['yucy', [1102]], ['yuml', [255]], ['Yuml', [376]], ['Zacute', [377]], ['zacute', [378]], ['Zcaron', [381]], ['zcaron', [382]], ['Zcy', [1047]], ['zcy', [1079]], ['Zdot', [379]], ['zdot', [380]], ['zeetrf', [8488]], ['ZeroWidthSpace', [8203]], ['Zeta', [918]], ['zeta', [950]], ['zfr', [120119]], ['Zfr', [8488]], ['ZHcy', [1046]], ['zhcy', [1078]], ['zigrarr', [8669]], ['zopf', [120171]], ['Zopf', [8484]], ['Zscr', [119989]], ['zscr', [120015]], ['zwj', [8205]], ['zwnj', [8204]]];
var alphaIndex = {};
var charIndex = {};
createIndexes(alphaIndex, charIndex);
var Html5Entities = /** @class */ (function () {
    function Html5Entities() {
    }
    Html5Entities.prototype.decode = function (str) {
        if (!str || !str.length) {
            return '';
        }
        return str.replace(/&(#?[\w\d]+);?/g, function (s, entity) {
            var chr;
            if (entity.charAt(0) === "#") {
                var code = entity.charAt(1) === 'x' ?
                    parseInt(entity.substr(2).toLowerCase(), 16) :
                    parseInt(entity.substr(1));
                if (!(isNaN(code) || code < -32768 || code > 65535)) {
                    chr = String.fromCharCode(code);
                }
            }
            else {
                chr = alphaIndex[entity];
            }
            return chr || s;
        });
    };
    Html5Entities.decode = function (str) {
        return new Html5Entities().decode(str);
    };
    Html5Entities.prototype.encode = function (str) {
        if (!str || !str.length) {
            return '';
        }
        var strLength = str.length;
        var result = '';
        var i = 0;
        while (i < strLength) {
            var charInfo = charIndex[str.charCodeAt(i)];
            if (charInfo) {
                var alpha = charInfo[str.charCodeAt(i + 1)];
                if (alpha) {
                    i++;
                }
                else {
                    alpha = charInfo[''];
                }
                if (alpha) {
                    result += "&" + alpha + ";";
                    i++;
                    continue;
                }
            }
            result += str.charAt(i);
            i++;
        }
        return result;
    };
    Html5Entities.encode = function (str) {
        return new Html5Entities().encode(str);
    };
    Html5Entities.prototype.encodeNonUTF = function (str) {
        if (!str || !str.length) {
            return '';
        }
        var strLength = str.length;
        var result = '';
        var i = 0;
        while (i < strLength) {
            var c = str.charCodeAt(i);
            var charInfo = charIndex[c];
            if (charInfo) {
                var alpha = charInfo[str.charCodeAt(i + 1)];
                if (alpha) {
                    i++;
                }
                else {
                    alpha = charInfo[''];
                }
                if (alpha) {
                    result += "&" + alpha + ";";
                    i++;
                    continue;
                }
            }
            if (c < 32 || c > 126) {
                result += '&#' + c + ';';
            }
            else {
                result += str.charAt(i);
            }
            i++;
        }
        return result;
    };
    Html5Entities.encodeNonUTF = function (str) {
        return new Html5Entities().encodeNonUTF(str);
    };
    Html5Entities.prototype.encodeNonASCII = function (str) {
        if (!str || !str.length) {
            return '';
        }
        var strLength = str.length;
        var result = '';
        var i = 0;
        while (i < strLength) {
            var c = str.charCodeAt(i);
            if (c <= 255) {
                result += str[i++];
                continue;
            }
            result += '&#' + c + ';';
            i++;
        }
        return result;
    };
    Html5Entities.encodeNonASCII = function (str) {
        return new Html5Entities().encodeNonASCII(str);
    };
    return Html5Entities;
}());
exports.Html5Entities = Html5Entities;
function createIndexes(alphaIndex, charIndex) {
    var i = ENTITIES.length;
    while (i--) {
        var e = ENTITIES[i];
        var alpha = e[0];
        var chars = e[1];
        var chr = chars[0];
        var addChar = (chr < 32 || chr > 126) || chr === 62 || chr === 60 || chr === 38 || chr === 34 || chr === 39;
        var charInfo = void 0;
        if (addChar) {
            charInfo = charIndex[chr] = charIndex[chr] || {};
        }
        if (chars[1]) {
            var chr2 = chars[1];
            alphaIndex[alpha] = String.fromCharCode(chr) + String.fromCharCode(chr2);
            addChar && (charInfo[chr2] = alpha);
        }
        else {
            alphaIndex[alpha] = String.fromCharCode(chr);
            addChar && (charInfo[''] = alpha);
        }
    }
}


/***/ }),

/***/ "./node_modules/html-entities/lib/index.js":
/*!*************************************************!*\
  !*** ./node_modules/html-entities/lib/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var xml_entities_1 = __webpack_require__(/*! ./xml-entities */ "./node_modules/html-entities/lib/xml-entities.js");
exports.XmlEntities = xml_entities_1.XmlEntities;
var html4_entities_1 = __webpack_require__(/*! ./html4-entities */ "./node_modules/html-entities/lib/html4-entities.js");
exports.Html4Entities = html4_entities_1.Html4Entities;
var html5_entities_1 = __webpack_require__(/*! ./html5-entities */ "./node_modules/html-entities/lib/html5-entities.js");
exports.Html5Entities = html5_entities_1.Html5Entities;
exports.AllHtmlEntities = html5_entities_1.Html5Entities;


/***/ }),

/***/ "./node_modules/html-entities/lib/xml-entities.js":
/*!********************************************************!*\
  !*** ./node_modules/html-entities/lib/xml-entities.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ALPHA_INDEX = {
    '&lt': '<',
    '&gt': '>',
    '&quot': '"',
    '&apos': '\'',
    '&amp': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&apos;': '\'',
    '&amp;': '&'
};
var CHAR_INDEX = {
    60: 'lt',
    62: 'gt',
    34: 'quot',
    39: 'apos',
    38: 'amp'
};
var CHAR_S_INDEX = {
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    '\'': '&apos;',
    '&': '&amp;'
};
var XmlEntities = /** @class */ (function () {
    function XmlEntities() {
    }
    XmlEntities.prototype.encode = function (str) {
        if (!str || !str.length) {
            return '';
        }
        return str.replace(/[<>"'&]/g, function (s) {
            return CHAR_S_INDEX[s];
        });
    };
    XmlEntities.encode = function (str) {
        return new XmlEntities().encode(str);
    };
    XmlEntities.prototype.decode = function (str) {
        if (!str || !str.length) {
            return '';
        }
        return str.replace(/&#?[0-9a-zA-Z]+;?/g, function (s) {
            if (s.charAt(1) === '#') {
                var code = s.charAt(2).toLowerCase() === 'x' ?
                    parseInt(s.substr(3), 16) :
                    parseInt(s.substr(2));
                if (isNaN(code) || code < -32768 || code > 65535) {
                    return '';
                }
                return String.fromCharCode(code);
            }
            return ALPHA_INDEX[s] || s;
        });
    };
    XmlEntities.decode = function (str) {
        return new XmlEntities().decode(str);
    };
    XmlEntities.prototype.encodeNonUTF = function (str) {
        if (!str || !str.length) {
            return '';
        }
        var strLength = str.length;
        var result = '';
        var i = 0;
        while (i < strLength) {
            var c = str.charCodeAt(i);
            var alpha = CHAR_INDEX[c];
            if (alpha) {
                result += "&" + alpha + ";";
                i++;
                continue;
            }
            if (c < 32 || c > 126) {
                result += '&#' + c + ';';
            }
            else {
                result += str.charAt(i);
            }
            i++;
        }
        return result;
    };
    XmlEntities.encodeNonUTF = function (str) {
        return new XmlEntities().encodeNonUTF(str);
    };
    XmlEntities.prototype.encodeNonASCII = function (str) {
        if (!str || !str.length) {
            return '';
        }
        var strLenght = str.length;
        var result = '';
        var i = 0;
        while (i < strLenght) {
            var c = str.charCodeAt(i);
            if (c <= 255) {
                result += str[i++];
                continue;
            }
            result += '&#' + c + ';';
            i++;
        }
        return result;
    };
    XmlEntities.encodeNonASCII = function (str) {
        return new XmlEntities().encodeNonASCII(str);
    };
    return XmlEntities;
}());
exports.XmlEntities = XmlEntities;


/***/ }),

/***/ "./node_modules/identicon.js/identicon.js":
/*!************************************************!*\
  !*** ./node_modules/identicon.js/identicon.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {/**
 * Identicon.js 2.3.3
 * http://github.com/stewartlord/identicon.js
 *
 * PNGLib required for PNG output
 * http://www.xarg.org/download/pnglib.js
 *
 * Copyright 2018, Stewart Lord
 * Released under the BSD license
 * http://www.opensource.org/licenses/bsd-license.php
 */

(function() {
    var PNGlib;
    if ( true && typeof module.exports !== 'undefined') {
        PNGlib = __webpack_require__(/*! ./pnglib */ "./node_modules/identicon.js/pnglib.js");
    } else {
        PNGlib = window.PNGlib;
    }

    var Identicon = function(hash, options){
        if (typeof(hash) !== 'string' || hash.length < 15) {
            throw 'A hash of at least 15 characters is required.';
        }

        this.defaults = {
            background: [240, 240, 240, 255],
            margin:     0.08,
            size:       64,
            saturation: 0.7,
            brightness: 0.5,
            format:     'png'
        };

        this.options = typeof(options) === 'object' ? options : this.defaults;

        // backward compatibility with old constructor (hash, size, margin)
        if (typeof(arguments[1]) === 'number') { this.options.size   = arguments[1]; }
        if (arguments[2])                      { this.options.margin = arguments[2]; }

        this.hash        = hash
        this.background  = this.options.background || this.defaults.background;
        this.size        = this.options.size       || this.defaults.size;
        this.format      = this.options.format     || this.defaults.format;
        this.margin      = this.options.margin !== undefined ? this.options.margin : this.defaults.margin;

        // foreground defaults to last 7 chars as hue at 70% saturation, 50% brightness
        var hue          = parseInt(this.hash.substr(-7), 16) / 0xfffffff;
        var saturation   = this.options.saturation || this.defaults.saturation;
        var brightness   = this.options.brightness || this.defaults.brightness;
        this.foreground  = this.options.foreground || this.hsl2rgb(hue, saturation, brightness);
    };

    Identicon.prototype = {
        background: null,
        foreground: null,
        hash:       null,
        margin:     null,
        size:       null,
        format:     null,

        image: function(){
            return this.isSvg()
                ? new Svg(this.size, this.foreground, this.background)
                : new PNGlib(this.size, this.size, 256);
        },

        render: function(){
            var image      = this.image(),
                size       = this.size,
                baseMargin = Math.floor(size * this.margin),
                cell       = Math.floor((size - (baseMargin * 2)) / 5),
                margin     = Math.floor((size - cell * 5) / 2),
                bg         = image.color.apply(image, this.background),
                fg         = image.color.apply(image, this.foreground);

            // the first 15 characters of the hash control the pixels (even/odd)
            // they are drawn down the middle first, then mirrored outwards
            var i, color;
            for (i = 0; i < 15; i++) {
                color = parseInt(this.hash.charAt(i), 16) % 2 ? bg : fg;
                if (i < 5) {
                    this.rectangle(2 * cell + margin, i * cell + margin, cell, cell, color, image);
                } else if (i < 10) {
                    this.rectangle(1 * cell + margin, (i - 5) * cell + margin, cell, cell, color, image);
                    this.rectangle(3 * cell + margin, (i - 5) * cell + margin, cell, cell, color, image);
                } else if (i < 15) {
                    this.rectangle(0 * cell + margin, (i - 10) * cell + margin, cell, cell, color, image);
                    this.rectangle(4 * cell + margin, (i - 10) * cell + margin, cell, cell, color, image);
                }
            }

            return image;
        },

        rectangle: function(x, y, w, h, color, image){
            if (this.isSvg()) {
                image.rectangles.push({x: x, y: y, w: w, h: h, color: color});
            } else {
                var i, j;
                for (i = x; i < x + w; i++) {
                    for (j = y; j < y + h; j++) {
                        image.buffer[image.index(i, j)] = color;
                    }
                }
            }
        },

        // adapted from: https://gist.github.com/aemkei/1325937
        hsl2rgb: function(h, s, b){
            h *= 6;
            s = [
                b += s *= b < .5 ? b : 1 - b,
                b - h % 1 * s * 2,
                b -= s *= 2,
                b,
                b + h % 1 * s,
                b + s
            ];

            return[
                s[ ~~h    % 6 ] * 255, // red
                s[ (h|16) % 6 ] * 255, // green
                s[ (h|8)  % 6 ] * 255  // blue
            ];
        },

        toString: function(raw){
            // backward compatibility with old toString, default to base64
            if (raw) {
                return this.render().getDump();
            } else {
                return this.render().getBase64();
            }
        },

        isSvg: function(){
            return this.format.match(/svg/i)
        }
    };

    var Svg = function(size, foreground, background){
        this.size       = size;
        this.foreground = this.color.apply(this, foreground);
        this.background = this.color.apply(this, background);
        this.rectangles = [];
    };

    Svg.prototype = {
        size:       null,
        foreground: null,
        background: null,
        rectangles: null,

        color: function(r, g, b, a){
            var values = [r, g, b].map(Math.round);
            values.push((a >= 0) && (a <= 255) ? a/255 : 1);
            return 'rgba(' + values.join(',') + ')';
        },

        getDump: function(){
          var i,
                xml,
                rect,
                fg     = this.foreground,
                bg     = this.background,
                stroke = this.size * 0.005;

            xml = "<svg xmlns='http://www.w3.org/2000/svg'"
                + " width='" + this.size + "' height='" + this.size + "'"
                + " style='background-color:" + bg + ";'>"
                + "<g style='fill:" + fg + "; stroke:" + fg + "; stroke-width:" + stroke + ";'>";

            for (i = 0; i < this.rectangles.length; i++) {
                rect = this.rectangles[i];
                if (rect.color == bg) continue;
                xml += "<rect "
                    + " x='"      + rect.x + "'"
                    + " y='"      + rect.y + "'"
                    + " width='"  + rect.w + "'"
                    + " height='" + rect.h + "'"
                    + "/>";
            }
            xml += "</g></svg>"

            return xml;
        },

        getBase64: function(){
            if ('function' === typeof btoa) {
                return btoa(this.getDump());
            } else if (Buffer) {
                return new Buffer(this.getDump(), 'binary').toString('base64');
            } else {
                throw 'Cannot generate base64 output';
            }
        }
    };

    if ( true && typeof module.exports !== 'undefined') {
        module.exports = Identicon;
    } else {
        window.Identicon = Identicon;
    }
})();

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../buffer/index.js */ "./node_modules/buffer/index.js").Buffer))

/***/ }),

/***/ "./node_modules/identicon.js/pnglib.js":
/*!*********************************************!*\
  !*** ./node_modules/identicon.js/pnglib.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
* A handy class to calculate color values.
*
* @version 1.0
* @author Robert Eisele <robert@xarg.org>
* @copyright Copyright (c) 2010, Robert Eisele
* @link http://www.xarg.org/2010/03/generate-client-side-png-files-using-javascript/
* @license http://www.opensource.org/licenses/bsd-license.php BSD License
*
*/

(function() {

	// helper functions for that ctx
	function write(buffer, offs) {
		for (var i = 2; i < arguments.length; i++) {
			for (var j = 0; j < arguments[i].length; j++) {
				buffer[offs++] = arguments[i].charAt(j);
			}
		}
	}

	function byte2(w) {
		return String.fromCharCode((w >> 8) & 255, w & 255);
	}

	function byte4(w) {
		return String.fromCharCode((w >> 24) & 255, (w >> 16) & 255, (w >> 8) & 255, w & 255);
	}

	function byte2lsb(w) {
		return String.fromCharCode(w & 255, (w >> 8) & 255);
	}

	// modified from original source to support NPM
	var PNGlib = function(width,height,depth) {

		this.width   = width;
		this.height  = height;
		this.depth   = depth;

		// pixel data and row filter identifier size
		this.pix_size = height * (width + 1);

		// deflate header, pix_size, block headers, adler32 checksum
		this.data_size = 2 + this.pix_size + 5 * Math.floor((0xfffe + this.pix_size) / 0xffff) + 4;

		// offsets and sizes of Png chunks
		this.ihdr_offs = 0;									// IHDR offset and size
		this.ihdr_size = 4 + 4 + 13 + 4;
		this.plte_offs = this.ihdr_offs + this.ihdr_size;	// PLTE offset and size
		this.plte_size = 4 + 4 + 3 * depth + 4;
		this.trns_offs = this.plte_offs + this.plte_size;	// tRNS offset and size
		this.trns_size = 4 + 4 + depth + 4;
		this.idat_offs = this.trns_offs + this.trns_size;	// IDAT offset and size
		this.idat_size = 4 + 4 + this.data_size + 4;
		this.iend_offs = this.idat_offs + this.idat_size;	// IEND offset and size
		this.iend_size = 4 + 4 + 4;
		this.buffer_size  = this.iend_offs + this.iend_size;	// total PNG size

		this.buffer  = new Array();
		this.palette = new Object();
		this.pindex  = 0;

		var _crc32 = new Array();

		// initialize buffer with zero bytes
		for (var i = 0; i < this.buffer_size; i++) {
			this.buffer[i] = "\x00";
		}

		// initialize non-zero elements
		write(this.buffer, this.ihdr_offs, byte4(this.ihdr_size - 12), 'IHDR', byte4(width), byte4(height), "\x08\x03");
		write(this.buffer, this.plte_offs, byte4(this.plte_size - 12), 'PLTE');
		write(this.buffer, this.trns_offs, byte4(this.trns_size - 12), 'tRNS');
		write(this.buffer, this.idat_offs, byte4(this.idat_size - 12), 'IDAT');
		write(this.buffer, this.iend_offs, byte4(this.iend_size - 12), 'IEND');

		// initialize deflate header
		var header = ((8 + (7 << 4)) << 8) | (3 << 6);
		header+= 31 - (header % 31);

		write(this.buffer, this.idat_offs + 8, byte2(header));

		// initialize deflate block headers
		for (var i = 0; (i << 16) - 1 < this.pix_size; i++) {
			var size, bits;
			if (i + 0xffff < this.pix_size) {
				size = 0xffff;
				bits = "\x00";
			} else {
				size = this.pix_size - (i << 16) - i;
				bits = "\x01";
			}
			write(this.buffer, this.idat_offs + 8 + 2 + (i << 16) + (i << 2), bits, byte2lsb(size), byte2lsb(~size));
		}

		/* Create crc32 lookup table */
		for (var i = 0; i < 256; i++) {
			var c = i;
			for (var j = 0; j < 8; j++) {
				if (c & 1) {
					c = -306674912 ^ ((c >> 1) & 0x7fffffff);
				} else {
					c = (c >> 1) & 0x7fffffff;
				}
			}
			_crc32[i] = c;
		}

		// compute the index into a png for a given pixel
		this.index = function(x,y) {
			var i = y * (this.width + 1) + x + 1;
			var j = this.idat_offs + 8 + 2 + 5 * Math.floor((i / 0xffff) + 1) + i;
			return j;
		}

		// convert a color and build up the palette
		this.color = function(red, green, blue, alpha) {

			alpha = alpha >= 0 ? alpha : 255;
			var color = (((((alpha << 8) | red) << 8) | green) << 8) | blue;

			if (typeof this.palette[color] == "undefined") {
				if (this.pindex == this.depth) return "\x00";

				var ndx = this.plte_offs + 8 + 3 * this.pindex;

				this.buffer[ndx + 0] = String.fromCharCode(red);
				this.buffer[ndx + 1] = String.fromCharCode(green);
				this.buffer[ndx + 2] = String.fromCharCode(blue);
				this.buffer[this.trns_offs+8+this.pindex] = String.fromCharCode(alpha);

				this.palette[color] = String.fromCharCode(this.pindex++);
			}
			return this.palette[color];
		}

		// output a PNG string, Base64 encoded
		this.getBase64 = function() {

			var s = this.getDump();

			var ch = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
			var c1, c2, c3, e1, e2, e3, e4;
			var l = s.length;
			var i = 0;
			var r = "";

			do {
				c1 = s.charCodeAt(i);
				e1 = c1 >> 2;
				c2 = s.charCodeAt(i+1);
				e2 = ((c1 & 3) << 4) | (c2 >> 4);
				c3 = s.charCodeAt(i+2);
				if (l < i+2) { e3 = 64; } else { e3 = ((c2 & 0xf) << 2) | (c3 >> 6); }
				if (l < i+3) { e4 = 64; } else { e4 = c3 & 0x3f; }
				r+= ch.charAt(e1) + ch.charAt(e2) + ch.charAt(e3) + ch.charAt(e4);
			} while ((i+= 3) < l);
			return r;
		}

		// output a PNG string
		this.getDump = function() {

			// compute adler32 of output pixels + row filter bytes
			var BASE = 65521; /* largest prime smaller than 65536 */
			var NMAX = 5552;  /* NMAX is the largest n such that 255n(n+1)/2 + (n+1)(BASE-1) <= 2^32-1 */
			var s1 = 1;
			var s2 = 0;
			var n = NMAX;

			for (var y = 0; y < this.height; y++) {
				for (var x = -1; x < this.width; x++) {
					s1+= this.buffer[this.index(x, y)].charCodeAt(0);
					s2+= s1;
					if ((n-= 1) == 0) {
						s1%= BASE;
						s2%= BASE;
						n = NMAX;
					}
				}
			}
			s1%= BASE;
			s2%= BASE;
			write(this.buffer, this.idat_offs + this.idat_size - 8, byte4((s2 << 16) | s1));

			// compute crc32 of the PNG chunks
			function crc32(png, offs, size) {
				var crc = -1;
				for (var i = 4; i < size-4; i += 1) {
					crc = _crc32[(crc ^ png[offs+i].charCodeAt(0)) & 0xff] ^ ((crc >> 8) & 0x00ffffff);
				}
				write(png, offs+size-4, byte4(crc ^ -1));
			}

			crc32(this.buffer, this.ihdr_offs, this.ihdr_size);
			crc32(this.buffer, this.plte_offs, this.plte_size);
			crc32(this.buffer, this.trns_offs, this.trns_size);
			crc32(this.buffer, this.idat_offs, this.idat_size);
			crc32(this.buffer, this.iend_offs, this.iend_size);

			// convert PNG to string
			return "\x89PNG\r\n\x1a\n"+this.buffer.join('');
		}
	}

	// modified from original source to support NPM
	if ( true && typeof module.exports !== 'undefined') {
		module.exports = PNGlib;
	} else {
		window.PNGlib = PNGlib;
	}
})();


/***/ }),

/***/ "./node_modules/ieee754/index.js":
/*!***************************************!*\
  !*** ./node_modules/ieee754/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),

/***/ "./node_modules/isarray/index.js":
/*!***************************************!*\
  !*** ./node_modules/isarray/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),

/***/ "./node_modules/jssha/dist/sha.mjs":
/*!*****************************************!*\
  !*** ./node_modules/jssha/dist/sha.mjs ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * A JavaScript implementation of the SHA family of hashes - defined in FIPS PUB 180-4, FIPS PUB 202,
 * and SP 800-185 - as well as the corresponding HMAC implementation as defined in FIPS PUB 198-1.
 *
 * Copyright 2008-2020 Brian Turek, 1998-2009 Paul Johnston & Contributors
 * Distributed under the BSD License
 * See http://caligatio.github.com/jsSHA/ for more information
 */
const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";function n(t,n,e,r){let i,s,o;const h=n||[0],u=(e=e||0)>>>3,w=-1===r?3:0;for(i=0;i<t.length;i+=1)o=i+u,s=o>>>2,h.length<=s&&h.push(0),h[s]|=t[i]<<8*(w+r*(o%4));return{value:h,binLen:8*t.length+e}}function e(e,r,i){switch(r){case"UTF8":case"UTF16BE":case"UTF16LE":break;default:throw new Error("encoding must be UTF8, UTF16BE, or UTF16LE")}switch(e){case"HEX":return function(t,n,e){return function(t,n,e,r){let i,s,o,h;if(0!=t.length%2)throw new Error("String of HEX type must be in byte increments");const u=n||[0],w=(e=e||0)>>>3,c=-1===r?3:0;for(i=0;i<t.length;i+=2){if(s=parseInt(t.substr(i,2),16),isNaN(s))throw new Error("String of HEX type contains invalid characters");for(h=(i>>>1)+w,o=h>>>2;u.length<=o;)u.push(0);u[o]|=s<<8*(c+r*(h%4))}return{value:u,binLen:4*t.length+e}}(t,n,e,i)};case"TEXT":return function(t,n,e){return function(t,n,e,r,i){let s,o,h,u,w,c,f,a,l=0;const A=e||[0],E=(r=r||0)>>>3;if("UTF8"===n)for(f=-1===i?3:0,h=0;h<t.length;h+=1)for(s=t.charCodeAt(h),o=[],128>s?o.push(s):2048>s?(o.push(192|s>>>6),o.push(128|63&s)):55296>s||57344<=s?o.push(224|s>>>12,128|s>>>6&63,128|63&s):(h+=1,s=65536+((1023&s)<<10|1023&t.charCodeAt(h)),o.push(240|s>>>18,128|s>>>12&63,128|s>>>6&63,128|63&s)),u=0;u<o.length;u+=1){for(c=l+E,w=c>>>2;A.length<=w;)A.push(0);A[w]|=o[u]<<8*(f+i*(c%4)),l+=1}else for(f=-1===i?2:0,a="UTF16LE"===n&&1!==i||"UTF16LE"!==n&&1===i,h=0;h<t.length;h+=1){for(s=t.charCodeAt(h),!0===a&&(u=255&s,s=u<<8|s>>>8),c=l+E,w=c>>>2;A.length<=w;)A.push(0);A[w]|=s<<8*(f+i*(c%4)),l+=2}return{value:A,binLen:8*l+r}}(t,r,n,e,i)};case"B64":return function(n,e,r){return function(n,e,r,i){let s,o,h,u,w,c,f,a=0;const l=e||[0],A=(r=r||0)>>>3,E=-1===i?3:0,H=n.indexOf("=");if(-1===n.search(/^[a-zA-Z0-9=+/]+$/))throw new Error("Invalid character in base-64 string");if(n=n.replace(/=/g,""),-1!==H&&H<n.length)throw new Error("Invalid '=' found in base-64 string");for(o=0;o<n.length;o+=4){for(w=n.substr(o,4),u=0,h=0;h<w.length;h+=1)s=t.indexOf(w.charAt(h)),u|=s<<18-6*h;for(h=0;h<w.length-1;h+=1){for(f=a+A,c=f>>>2;l.length<=c;)l.push(0);l[c]|=(u>>>16-8*h&255)<<8*(E+i*(f%4)),a+=1}}return{value:l,binLen:8*a+r}}(n,e,r,i)};case"BYTES":return function(t,n,e){return function(t,n,e,r){let i,s,o,h;const u=n||[0],w=(e=e||0)>>>3,c=-1===r?3:0;for(s=0;s<t.length;s+=1)i=t.charCodeAt(s),h=s+w,o=h>>>2,u.length<=o&&u.push(0),u[o]|=i<<8*(c+r*(h%4));return{value:u,binLen:8*t.length+e}}(t,n,e,i)};case"ARRAYBUFFER":try{new ArrayBuffer(0)}catch(t){throw new Error("ARRAYBUFFER not supported by this environment")}return function(t,e,r){return function(t,e,r,i){return n(new Uint8Array(t),e,r,i)}(t,e,r,i)};case"UINT8ARRAY":try{new Uint8Array(0)}catch(t){throw new Error("UINT8ARRAY not supported by this environment")}return function(t,e,r){return n(t,e,r,i)};default:throw new Error("format must be HEX, TEXT, B64, BYTES, ARRAYBUFFER, or UINT8ARRAY")}}function r(n,e,r,i){switch(n){case"HEX":return function(t){return function(t,n,e,r){let i,s,o="";const h=n/8,u=-1===e?3:0;for(i=0;i<h;i+=1)s=t[i>>>2]>>>8*(u+e*(i%4)),o+="0123456789abcdef".charAt(s>>>4&15)+"0123456789abcdef".charAt(15&s);return r.outputUpper?o.toUpperCase():o}(t,e,r,i)};case"B64":return function(n){return function(n,e,r,i){let s,o,h,u,w,c="";const f=e/8,a=-1===r?3:0;for(s=0;s<f;s+=3)for(u=s+1<f?n[s+1>>>2]:0,w=s+2<f?n[s+2>>>2]:0,h=(n[s>>>2]>>>8*(a+r*(s%4))&255)<<16|(u>>>8*(a+r*((s+1)%4))&255)<<8|w>>>8*(a+r*((s+2)%4))&255,o=0;o<4;o+=1)c+=8*s+6*o<=e?t.charAt(h>>>6*(3-o)&63):i.b64Pad;return c}(n,e,r,i)};case"BYTES":return function(t){return function(t,n,e){let r,i,s="";const o=n/8,h=-1===e?3:0;for(r=0;r<o;r+=1)i=t[r>>>2]>>>8*(h+e*(r%4))&255,s+=String.fromCharCode(i);return s}(t,e,r)};case"ARRAYBUFFER":try{new ArrayBuffer(0)}catch(t){throw new Error("ARRAYBUFFER not supported by this environment")}return function(t){return function(t,n,e){let r;const i=n/8,s=new ArrayBuffer(i),o=new Uint8Array(s),h=-1===e?3:0;for(r=0;r<i;r+=1)o[r]=t[r>>>2]>>>8*(h+e*(r%4))&255;return s}(t,e,r)};case"UINT8ARRAY":try{new Uint8Array(0)}catch(t){throw new Error("UINT8ARRAY not supported by this environment")}return function(t){return function(t,n,e){let r;const i=n/8,s=-1===e?3:0,o=new Uint8Array(i);for(r=0;r<i;r+=1)o[r]=t[r>>>2]>>>8*(s+e*(r%4))&255;return o}(t,e,r)};default:throw new Error("format must be HEX, B64, BYTES, ARRAYBUFFER, or UINT8ARRAY")}}const i=[1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298],s=[3238371032,914150663,812702999,4144912697,4290775857,1750603025,1694076839,3204075428],o=[1779033703,3144134277,1013904242,2773480762,1359893119,2600822924,528734635,1541459225],h="Chosen SHA variant is not supported";function u(t,n){let e,r;const i=t.binLen>>>3,s=n.binLen>>>3,o=i<<3,h=4-i<<3;if(i%4!=0){for(e=0;e<s;e+=4)r=i+e>>>2,t.value[r]|=n.value[e>>>2]<<o,t.value.push(0),t.value[r+1]|=n.value[e>>>2]>>>h;return(t.value.length<<2)-4>=s+i&&t.value.pop(),{value:t.value,binLen:t.binLen+n.binLen}}return{value:t.value.concat(n.value),binLen:t.binLen+n.binLen}}function w(t){const n={outputUpper:!1,b64Pad:"=",outputLen:-1},e=t||{},r="Output length must be a multiple of 8";if(n.outputUpper=e.outputUpper||!1,e.b64Pad&&(n.b64Pad=e.b64Pad),e.outputLen){if(e.outputLen%8!=0)throw new Error(r);n.outputLen=e.outputLen}else if(e.shakeLen){if(e.shakeLen%8!=0)throw new Error(r);n.outputLen=e.shakeLen}if("boolean"!=typeof n.outputUpper)throw new Error("Invalid outputUpper formatting option");if("string"!=typeof n.b64Pad)throw new Error("Invalid b64Pad formatting option");return n}function c(t,n,r,i){const s=t+" must include a value and format";if(!n){if(!i)throw new Error(s);return i}if(void 0===n.value||!n.format)throw new Error(s);return e(n.format,n.encoding||"UTF8",r)(n.value)}class f{constructor(t,n,e){const r=e||{};if(this.t=n,this.i=r.encoding||"UTF8",this.numRounds=r.numRounds||1,isNaN(this.numRounds)||this.numRounds!==parseInt(this.numRounds,10)||1>this.numRounds)throw new Error("numRounds must a integer >= 1");this.s=t,this.o=[],this.h=0,this.u=!1,this.l=0,this.A=!1,this.H=[],this.S=[]}update(t){let n,e=0;const r=this.p>>>5,i=this.m(t,this.o,this.h),s=i.binLen,o=i.value,h=s>>>5;for(n=0;n<h;n+=r)e+this.p<=s&&(this.C=this.R(o.slice(n,n+r),this.C),e+=this.p);this.l+=e,this.o=o.slice(e>>>5),this.h=s%this.p,this.u=!0}getHash(t,n){let e,i,s=this.U;const o=w(n);if(this.v){if(-1===o.outputLen)throw new Error("Output length must be specified in options");s=o.outputLen}const h=r(t,s,this.K,o);if(this.A&&this.T)return h(this.T(o));for(i=this.F(this.o.slice(),this.h,this.l,this.g(this.C),s),e=1;e<this.numRounds;e+=1)this.v&&s%32!=0&&(i[i.length-1]&=16777215>>>24-s%32),i=this.F(i,s,0,this.B(this.s),s);return h(i)}setHMACKey(t,n,r){if(!this.L)throw new Error("Variant does not support HMAC");if(this.u)throw new Error("Cannot set MAC key after calling update");const i=e(n,(r||{}).encoding||"UTF8",this.K);this.M(i(t))}M(t){const n=this.p>>>3,e=n/4-1;let r;if(1!==this.numRounds)throw new Error("Cannot set numRounds with MAC");if(this.A)throw new Error("MAC key already set");for(n<t.binLen/8&&(t.value=this.F(t.value,t.binLen,0,this.B(this.s),this.U));t.value.length<=e;)t.value.push(0);for(r=0;r<=e;r+=1)this.H[r]=909522486^t.value[r],this.S[r]=1549556828^t.value[r];this.C=this.R(this.H,this.C),this.l=this.p,this.A=!0}getHMAC(t,n){const e=w(n);return r(t,this.U,this.K,e)(this.k())}k(){let t;if(!this.A)throw new Error("Cannot call getHMAC without first setting MAC key");const n=this.F(this.o.slice(),this.h,this.l,this.g(this.C),this.U);return t=this.R(this.S,this.B(this.s)),t=this.F(n,this.U,this.p,t,this.U),t}}function a(t,n){return t<<n|t>>>32-n}function l(t,n){return t>>>n|t<<32-n}function A(t,n){return t>>>n}function E(t,n,e){return t^n^e}function H(t,n,e){return t&n^~t&e}function S(t,n,e){return t&n^t&e^n&e}function b(t){return l(t,2)^l(t,13)^l(t,22)}function p(t,n){const e=(65535&t)+(65535&n);return(65535&(t>>>16)+(n>>>16)+(e>>>16))<<16|65535&e}function d(t,n,e,r){const i=(65535&t)+(65535&n)+(65535&e)+(65535&r);return(65535&(t>>>16)+(n>>>16)+(e>>>16)+(r>>>16)+(i>>>16))<<16|65535&i}function m(t,n,e,r,i){const s=(65535&t)+(65535&n)+(65535&e)+(65535&r)+(65535&i);return(65535&(t>>>16)+(n>>>16)+(e>>>16)+(r>>>16)+(i>>>16)+(s>>>16))<<16|65535&s}function C(t){return l(t,7)^l(t,18)^A(t,3)}function y(t){return l(t,6)^l(t,11)^l(t,25)}function R(t){return[1732584193,4023233417,2562383102,271733878,3285377520]}function U(t,n){let e,r,i,s,o,h,u;const w=[];for(e=n[0],r=n[1],i=n[2],s=n[3],o=n[4],u=0;u<80;u+=1)w[u]=u<16?t[u]:a(w[u-3]^w[u-8]^w[u-14]^w[u-16],1),h=u<20?m(a(e,5),H(r,i,s),o,1518500249,w[u]):u<40?m(a(e,5),E(r,i,s),o,1859775393,w[u]):u<60?m(a(e,5),S(r,i,s),o,2400959708,w[u]):m(a(e,5),E(r,i,s),o,3395469782,w[u]),o=s,s=i,i=a(r,30),r=e,e=h;return n[0]=p(e,n[0]),n[1]=p(r,n[1]),n[2]=p(i,n[2]),n[3]=p(s,n[3]),n[4]=p(o,n[4]),n}function v(t,n,e,r){let i;const s=15+(n+65>>>9<<4),o=n+e;for(;t.length<=s;)t.push(0);for(t[n>>>5]|=128<<24-n%32,t[s]=4294967295&o,t[s-1]=o/4294967296|0,i=0;i<t.length;i+=16)r=U(t.slice(i,i+16),r);return r}class K extends f{constructor(t,n,r){if("SHA-1"!==t)throw new Error(h);super(t,n,r);const i=r||{};this.L=!0,this.T=this.k,this.K=-1,this.m=e(this.t,this.i,this.K),this.R=U,this.g=function(t){return t.slice()},this.B=R,this.F=v,this.C=[1732584193,4023233417,2562383102,271733878,3285377520],this.p=512,this.U=160,this.v=!1,i.hmacKey&&this.M(c("hmacKey",i.hmacKey,this.K))}}function T(t){let n;return n="SHA-224"==t?s.slice():o.slice(),n}function F(t,n){let e,r,s,o,h,u,w,c,f,a,E;const R=[];for(e=n[0],r=n[1],s=n[2],o=n[3],h=n[4],u=n[5],w=n[6],c=n[7],E=0;E<64;E+=1)R[E]=E<16?t[E]:d(l(U=R[E-2],17)^l(U,19)^A(U,10),R[E-7],C(R[E-15]),R[E-16]),f=m(c,y(h),H(h,u,w),i[E],R[E]),a=p(b(e),S(e,r,s)),c=w,w=u,u=h,h=p(o,f),o=s,s=r,r=e,e=p(f,a);var U;return n[0]=p(e,n[0]),n[1]=p(r,n[1]),n[2]=p(s,n[2]),n[3]=p(o,n[3]),n[4]=p(h,n[4]),n[5]=p(u,n[5]),n[6]=p(w,n[6]),n[7]=p(c,n[7]),n}class g extends f{constructor(t,n,r){if("SHA-224"!==t&&"SHA-256"!==t)throw new Error(h);super(t,n,r);const i=r||{};this.T=this.k,this.L=!0,this.K=-1,this.m=e(this.t,this.i,this.K),this.R=F,this.g=function(t){return t.slice()},this.B=T,this.F=function(n,e,r,i){return function(t,n,e,r,i){let s,o;const h=15+(n+65>>>9<<4),u=n+e;for(;t.length<=h;)t.push(0);for(t[n>>>5]|=128<<24-n%32,t[h]=4294967295&u,t[h-1]=u/4294967296|0,s=0;s<t.length;s+=16)r=F(t.slice(s,s+16),r);return o="SHA-224"===i?[r[0],r[1],r[2],r[3],r[4],r[5],r[6]]:r,o}(n,e,r,i,t)},this.C=T(t),this.p=512,this.U="SHA-224"===t?224:256,this.v=!1,i.hmacKey&&this.M(c("hmacKey",i.hmacKey,this.K))}}class B{constructor(t,n){this.Y=t,this.N=n}}function L(t,n){let e;return n>32?(e=64-n,new B(t.N<<n|t.Y>>>e,t.Y<<n|t.N>>>e)):0!==n?(e=32-n,new B(t.Y<<n|t.N>>>e,t.N<<n|t.Y>>>e)):t}function M(t,n){let e;return n<32?(e=32-n,new B(t.Y>>>n|t.N<<e,t.N>>>n|t.Y<<e)):(e=64-n,new B(t.N>>>n|t.Y<<e,t.Y>>>n|t.N<<e))}function k(t,n){return new B(t.Y>>>n,t.N>>>n|t.Y<<32-n)}function Y(t,n,e){return new B(t.Y&n.Y^t.Y&e.Y^n.Y&e.Y,t.N&n.N^t.N&e.N^n.N&e.N)}function N(t){const n=M(t,28),e=M(t,34),r=M(t,39);return new B(n.Y^e.Y^r.Y,n.N^e.N^r.N)}function I(t,n){let e,r;e=(65535&t.N)+(65535&n.N),r=(t.N>>>16)+(n.N>>>16)+(e>>>16);const i=(65535&r)<<16|65535&e;return e=(65535&t.Y)+(65535&n.Y)+(r>>>16),r=(t.Y>>>16)+(n.Y>>>16)+(e>>>16),new B((65535&r)<<16|65535&e,i)}function X(t,n,e,r){let i,s;i=(65535&t.N)+(65535&n.N)+(65535&e.N)+(65535&r.N),s=(t.N>>>16)+(n.N>>>16)+(e.N>>>16)+(r.N>>>16)+(i>>>16);const o=(65535&s)<<16|65535&i;return i=(65535&t.Y)+(65535&n.Y)+(65535&e.Y)+(65535&r.Y)+(s>>>16),s=(t.Y>>>16)+(n.Y>>>16)+(e.Y>>>16)+(r.Y>>>16)+(i>>>16),new B((65535&s)<<16|65535&i,o)}function z(t,n,e,r,i){let s,o;s=(65535&t.N)+(65535&n.N)+(65535&e.N)+(65535&r.N)+(65535&i.N),o=(t.N>>>16)+(n.N>>>16)+(e.N>>>16)+(r.N>>>16)+(i.N>>>16)+(s>>>16);const h=(65535&o)<<16|65535&s;return s=(65535&t.Y)+(65535&n.Y)+(65535&e.Y)+(65535&r.Y)+(65535&i.Y)+(o>>>16),o=(t.Y>>>16)+(n.Y>>>16)+(e.Y>>>16)+(r.Y>>>16)+(i.Y>>>16)+(s>>>16),new B((65535&o)<<16|65535&s,h)}function x(t,n){return new B(t.Y^n.Y,t.N^n.N)}function _(t){const n=M(t,19),e=M(t,61),r=k(t,6);return new B(n.Y^e.Y^r.Y,n.N^e.N^r.N)}function O(t){const n=M(t,1),e=M(t,8),r=k(t,7);return new B(n.Y^e.Y^r.Y,n.N^e.N^r.N)}function P(t){const n=M(t,14),e=M(t,18),r=M(t,41);return new B(n.Y^e.Y^r.Y,n.N^e.N^r.N)}const V=[new B(i[0],3609767458),new B(i[1],602891725),new B(i[2],3964484399),new B(i[3],2173295548),new B(i[4],4081628472),new B(i[5],3053834265),new B(i[6],2937671579),new B(i[7],3664609560),new B(i[8],2734883394),new B(i[9],1164996542),new B(i[10],1323610764),new B(i[11],3590304994),new B(i[12],4068182383),new B(i[13],991336113),new B(i[14],633803317),new B(i[15],3479774868),new B(i[16],2666613458),new B(i[17],944711139),new B(i[18],2341262773),new B(i[19],2007800933),new B(i[20],1495990901),new B(i[21],1856431235),new B(i[22],3175218132),new B(i[23],2198950837),new B(i[24],3999719339),new B(i[25],766784016),new B(i[26],2566594879),new B(i[27],3203337956),new B(i[28],1034457026),new B(i[29],2466948901),new B(i[30],3758326383),new B(i[31],168717936),new B(i[32],1188179964),new B(i[33],1546045734),new B(i[34],1522805485),new B(i[35],2643833823),new B(i[36],2343527390),new B(i[37],1014477480),new B(i[38],1206759142),new B(i[39],344077627),new B(i[40],1290863460),new B(i[41],3158454273),new B(i[42],3505952657),new B(i[43],106217008),new B(i[44],3606008344),new B(i[45],1432725776),new B(i[46],1467031594),new B(i[47],851169720),new B(i[48],3100823752),new B(i[49],1363258195),new B(i[50],3750685593),new B(i[51],3785050280),new B(i[52],3318307427),new B(i[53],3812723403),new B(i[54],2003034995),new B(i[55],3602036899),new B(i[56],1575990012),new B(i[57],1125592928),new B(i[58],2716904306),new B(i[59],442776044),new B(i[60],593698344),new B(i[61],3733110249),new B(i[62],2999351573),new B(i[63],3815920427),new B(3391569614,3928383900),new B(3515267271,566280711),new B(3940187606,3454069534),new B(4118630271,4000239992),new B(116418474,1914138554),new B(174292421,2731055270),new B(289380356,3203993006),new B(460393269,320620315),new B(685471733,587496836),new B(852142971,1086792851),new B(1017036298,365543100),new B(1126000580,2618297676),new B(1288033470,3409855158),new B(1501505948,4234509866),new B(1607167915,987167468),new B(1816402316,1246189591)];function Z(t){return"SHA-384"===t?[new B(3418070365,s[0]),new B(1654270250,s[1]),new B(2438529370,s[2]),new B(355462360,s[3]),new B(1731405415,s[4]),new B(41048885895,s[5]),new B(3675008525,s[6]),new B(1203062813,s[7])]:[new B(o[0],4089235720),new B(o[1],2227873595),new B(o[2],4271175723),new B(o[3],1595750129),new B(o[4],2917565137),new B(o[5],725511199),new B(o[6],4215389547),new B(o[7],327033209)]}function j(t,n){let e,r,i,s,o,h,u,w,c,f,a,l;const A=[];for(e=n[0],r=n[1],i=n[2],s=n[3],o=n[4],h=n[5],u=n[6],w=n[7],a=0;a<80;a+=1)a<16?(l=2*a,A[a]=new B(t[l],t[l+1])):A[a]=X(_(A[a-2]),A[a-7],O(A[a-15]),A[a-16]),c=z(w,P(o),(H=h,S=u,new B((E=o).Y&H.Y^~E.Y&S.Y,E.N&H.N^~E.N&S.N)),V[a],A[a]),f=I(N(e),Y(e,r,i)),w=u,u=h,h=o,o=I(s,c),s=i,i=r,r=e,e=I(c,f);var E,H,S;return n[0]=I(e,n[0]),n[1]=I(r,n[1]),n[2]=I(i,n[2]),n[3]=I(s,n[3]),n[4]=I(o,n[4]),n[5]=I(h,n[5]),n[6]=I(u,n[6]),n[7]=I(w,n[7]),n}class q extends f{constructor(t,n,r){if("SHA-384"!==t&&"SHA-512"!==t)throw new Error(h);super(t,n,r);const i=r||{};this.T=this.k,this.L=!0,this.K=-1,this.m=e(this.t,this.i,this.K),this.R=j,this.g=function(t){return t.slice()},this.B=Z,this.F=function(n,e,r,i){return function(t,n,e,r,i){let s,o;const h=31+(n+129>>>10<<5),u=n+e;for(;t.length<=h;)t.push(0);for(t[n>>>5]|=128<<24-n%32,t[h]=4294967295&u,t[h-1]=u/4294967296|0,s=0;s<t.length;s+=32)r=j(t.slice(s,s+32),r);return o="SHA-384"===i?[(r=r)[0].Y,r[0].N,r[1].Y,r[1].N,r[2].Y,r[2].N,r[3].Y,r[3].N,r[4].Y,r[4].N,r[5].Y,r[5].N]:[r[0].Y,r[0].N,r[1].Y,r[1].N,r[2].Y,r[2].N,r[3].Y,r[3].N,r[4].Y,r[4].N,r[5].Y,r[5].N,r[6].Y,r[6].N,r[7].Y,r[7].N],o}(n,e,r,i,t)},this.C=Z(t),this.p=1024,this.U="SHA-384"===t?384:512,this.v=!1,i.hmacKey&&this.M(c("hmacKey",i.hmacKey,this.K))}}const D=[new B(0,1),new B(0,32898),new B(2147483648,32906),new B(2147483648,2147516416),new B(0,32907),new B(0,2147483649),new B(2147483648,2147516545),new B(2147483648,32777),new B(0,138),new B(0,136),new B(0,2147516425),new B(0,2147483658),new B(0,2147516555),new B(2147483648,139),new B(2147483648,32905),new B(2147483648,32771),new B(2147483648,32770),new B(2147483648,128),new B(0,32778),new B(2147483648,2147483658),new B(2147483648,2147516545),new B(2147483648,32896),new B(0,2147483649),new B(2147483648,2147516424)],G=[[0,36,3,41,18],[1,44,10,45,2],[62,6,43,15,61],[28,55,25,21,56],[27,20,39,8,14]];function J(t){let n;const e=[];for(n=0;n<5;n+=1)e[n]=[new B(0,0),new B(0,0),new B(0,0),new B(0,0),new B(0,0)];return e}function Q(t){let n;const e=[];for(n=0;n<5;n+=1)e[n]=t[n].slice();return e}function W(t,n){let e,r,i,s;const o=[],h=[];if(null!==t)for(r=0;r<t.length;r+=2)n[(r>>>1)%5][(r>>>1)/5|0]=x(n[(r>>>1)%5][(r>>>1)/5|0],new B(t[r+1],t[r]));for(e=0;e<24;e+=1){for(s=J(),r=0;r<5;r+=1)o[r]=(u=n[r][0],w=n[r][1],c=n[r][2],f=n[r][3],a=n[r][4],new B(u.Y^w.Y^c.Y^f.Y^a.Y,u.N^w.N^c.N^f.N^a.N));for(r=0;r<5;r+=1)h[r]=x(o[(r+4)%5],L(o[(r+1)%5],1));for(r=0;r<5;r+=1)for(i=0;i<5;i+=1)n[r][i]=x(n[r][i],h[r]);for(r=0;r<5;r+=1)for(i=0;i<5;i+=1)s[i][(2*r+3*i)%5]=L(n[r][i],G[r][i]);for(r=0;r<5;r+=1)for(i=0;i<5;i+=1)n[r][i]=x(s[r][i],new B(~s[(r+1)%5][i].Y&s[(r+2)%5][i].Y,~s[(r+1)%5][i].N&s[(r+2)%5][i].N));n[0][0]=x(n[0][0],D[e])}var u,w,c,f,a;return n}function $(t){let n,e,r=0;const i=[0,0],s=[4294967295&t,t/4294967296&2097151];for(n=6;n>=0;n--)e=s[n>>2]>>>8*n&255,0===e&&0===r||(i[r+1>>2]|=e<<8*(r+1),r+=1);return r=0!==r?r:1,i[0]|=r,{value:r+1>4?i:[i[0]],binLen:8+8*r}}function tt(t){return u($(t.binLen),t)}function nt(t,n){let e,r=$(n);r=u(r,t);const i=n>>>2,s=(i-r.value.length%i)%i;for(e=0;e<s;e++)r.value.push(0);return r.value}class et extends f{constructor(t,n,r){let i=6,s=0;super(t,n,r);const o=r||{};if(1!==this.numRounds){if(o.kmacKey||o.hmacKey)throw new Error("Cannot set numRounds with MAC");if("CSHAKE128"===this.s||"CSHAKE256"===this.s)throw new Error("Cannot set numRounds for CSHAKE variants")}switch(this.K=1,this.m=e(this.t,this.i,this.K),this.R=W,this.g=Q,this.B=J,this.C=J(),this.v=!1,t){case"SHA3-224":this.p=s=1152,this.U=224,this.L=!0,this.T=this.k;break;case"SHA3-256":this.p=s=1088,this.U=256,this.L=!0,this.T=this.k;break;case"SHA3-384":this.p=s=832,this.U=384,this.L=!0,this.T=this.k;break;case"SHA3-512":this.p=s=576,this.U=512,this.L=!0,this.T=this.k;break;case"SHAKE128":i=31,this.p=s=1344,this.U=-1,this.v=!0,this.L=!1,this.T=null;break;case"SHAKE256":i=31,this.p=s=1088,this.U=-1,this.v=!0,this.L=!1,this.T=null;break;case"KMAC128":i=4,this.p=s=1344,this.I(r),this.U=-1,this.v=!0,this.L=!1,this.T=this.X;break;case"KMAC256":i=4,this.p=s=1088,this.I(r),this.U=-1,this.v=!0,this.L=!1,this.T=this.X;break;case"CSHAKE128":this.p=s=1344,i=this._(r),this.U=-1,this.v=!0,this.L=!1,this.T=null;break;case"CSHAKE256":this.p=s=1088,i=this._(r),this.U=-1,this.v=!0,this.L=!1,this.T=null;break;default:throw new Error(h)}this.F=function(t,n,e,r,o){return function(t,n,e,r,i,s,o){let h,u,w=0;const c=[],f=i>>>5,a=n>>>5;for(h=0;h<a&&n>=i;h+=f)r=W(t.slice(h,h+f),r),n-=i;for(t=t.slice(h),n%=i;t.length<f;)t.push(0);for(h=n>>>3,t[h>>2]^=s<<h%4*8,t[f-1]^=2147483648,r=W(t,r);32*c.length<o&&(u=r[w%5][w/5|0],c.push(u.N),!(32*c.length>=o));)c.push(u.Y),w+=1,0==64*w%i&&(W(null,r),w=0);return c}(t,n,0,r,s,i,o)},o.hmacKey&&this.M(c("hmacKey",o.hmacKey,this.K))}_(t,n){const e=function(t){const n=t||{};return{funcName:c("funcName",n.funcName,1,{value:[],binLen:0}),customization:c("Customization",n.customization,1,{value:[],binLen:0})}}(t||{});n&&(e.funcName=n);const r=u(tt(e.funcName),tt(e.customization));if(0!==e.customization.binLen||0!==e.funcName.binLen){const t=nt(r,this.p>>>3);for(let n=0;n<t.length;n+=this.p>>>5)this.C=this.R(t.slice(n,n+(this.p>>>5)),this.C),this.l+=this.p;return 4}return 31}I(t){const n=function(t){const n=t||{};return{kmacKey:c("kmacKey",n.kmacKey,1),funcName:{value:[1128353099],binLen:32},customization:c("Customization",n.customization,1,{value:[],binLen:0})}}(t||{});this._(t,n.funcName);const e=nt(tt(n.kmacKey),this.p>>>3);for(let t=0;t<e.length;t+=this.p>>>5)this.C=this.R(e.slice(t,t+(this.p>>>5)),this.C),this.l+=this.p;this.A=!0}X(t){const n=u({value:this.o.slice(),binLen:this.h},function(t){let n,e,r=0;const i=[0,0],s=[4294967295&t,t/4294967296&2097151];for(n=6;n>=0;n--)e=s[n>>2]>>>8*n&255,0===e&&0===r||(i[r>>2]|=e<<8*r,r+=1);return r=0!==r?r:1,i[r>>2]|=r<<8*r,{value:r+1>4?i:[i[0]],binLen:8+8*r}}(t.outputLen));return this.F(n.value,n.binLen,this.l,this.g(this.C),t.outputLen)}}/* harmony default export */ __webpack_exports__["default"] = (class{constructor(t,n,e){if("SHA-1"==t)this.O=new K(t,n,e);else if("SHA-224"==t||"SHA-256"==t)this.O=new g(t,n,e);else if("SHA-384"==t||"SHA-512"==t)this.O=new q(t,n,e);else{if("SHA3-224"!=t&&"SHA3-256"!=t&&"SHA3-384"!=t&&"SHA3-512"!=t&&"SHAKE128"!=t&&"SHAKE256"!=t&&"CSHAKE128"!=t&&"CSHAKE256"!=t&&"KMAC128"!=t&&"KMAC256"!=t)throw new Error(h);this.O=new et(t,n,e)}}update(t){this.O.update(t)}getHash(t,n){return this.O.getHash(t,n)}setHMACKey(t,n,e){this.O.setHMACKey(t,n,e)}getHMAC(t,n){return this.O.getHMAC(t,n)}});
//# sourceMappingURL=sha.mjs.map


/***/ }),

/***/ "./node_modules/loglevel/lib/loglevel.js":
/*!***********************************************!*\
  !*** ./node_modules/loglevel/lib/loglevel.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
* loglevel - https://github.com/pimterry/loglevel
*
* Copyright (c) 2013 Tim Perry
* Licensed under the MIT license.
*/
(function (root, definition) {
    "use strict";
    if (true) {
        !(__WEBPACK_AMD_DEFINE_FACTORY__ = (definition),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else {}
}(this, function () {
    "use strict";

    // Slightly dubious tricks to cut down minimized file size
    var noop = function() {};
    var undefinedType = "undefined";
    var isIE = (typeof window !== undefinedType) && (typeof window.navigator !== undefinedType) && (
        /Trident\/|MSIE /.test(window.navigator.userAgent)
    );

    var logMethods = [
        "trace",
        "debug",
        "info",
        "warn",
        "error"
    ];

    // Cross-browser bind equivalent that works at least back to IE6
    function bindMethod(obj, methodName) {
        var method = obj[methodName];
        if (typeof method.bind === 'function') {
            return method.bind(obj);
        } else {
            try {
                return Function.prototype.bind.call(method, obj);
            } catch (e) {
                // Missing bind shim or IE8 + Modernizr, fallback to wrapping
                return function() {
                    return Function.prototype.apply.apply(method, [obj, arguments]);
                };
            }
        }
    }

    // Trace() doesn't print the message in IE, so for that case we need to wrap it
    function traceForIE() {
        if (console.log) {
            if (console.log.apply) {
                console.log.apply(console, arguments);
            } else {
                // In old IE, native console methods themselves don't have apply().
                Function.prototype.apply.apply(console.log, [console, arguments]);
            }
        }
        if (console.trace) console.trace();
    }

    // Build the best logging method possible for this env
    // Wherever possible we want to bind, not wrap, to preserve stack traces
    function realMethod(methodName) {
        if (methodName === 'debug') {
            methodName = 'log';
        }

        if (typeof console === undefinedType) {
            return false; // No method possible, for now - fixed later by enableLoggingWhenConsoleArrives
        } else if (methodName === 'trace' && isIE) {
            return traceForIE;
        } else if (console[methodName] !== undefined) {
            return bindMethod(console, methodName);
        } else if (console.log !== undefined) {
            return bindMethod(console, 'log');
        } else {
            return noop;
        }
    }

    // These private functions always need `this` to be set properly

    function replaceLoggingMethods(level, loggerName) {
        /*jshint validthis:true */
        for (var i = 0; i < logMethods.length; i++) {
            var methodName = logMethods[i];
            this[methodName] = (i < level) ?
                noop :
                this.methodFactory(methodName, level, loggerName);
        }

        // Define log.log as an alias for log.debug
        this.log = this.debug;
    }

    // In old IE versions, the console isn't present until you first open it.
    // We build realMethod() replacements here that regenerate logging methods
    function enableLoggingWhenConsoleArrives(methodName, level, loggerName) {
        return function () {
            if (typeof console !== undefinedType) {
                replaceLoggingMethods.call(this, level, loggerName);
                this[methodName].apply(this, arguments);
            }
        };
    }

    // By default, we use closely bound real methods wherever possible, and
    // otherwise we wait for a console to appear, and then try again.
    function defaultMethodFactory(methodName, level, loggerName) {
        /*jshint validthis:true */
        return realMethod(methodName) ||
               enableLoggingWhenConsoleArrives.apply(this, arguments);
    }

    function Logger(name, defaultLevel, factory) {
      var self = this;
      var currentLevel;
      var storageKey = "loglevel";
      if (name) {
        storageKey += ":" + name;
      }

      function persistLevelIfPossible(levelNum) {
          var levelName = (logMethods[levelNum] || 'silent').toUpperCase();

          if (typeof window === undefinedType) return;

          // Use localStorage if available
          try {
              window.localStorage[storageKey] = levelName;
              return;
          } catch (ignore) {}

          // Use session cookie as fallback
          try {
              window.document.cookie =
                encodeURIComponent(storageKey) + "=" + levelName + ";";
          } catch (ignore) {}
      }

      function getPersistedLevel() {
          var storedLevel;

          if (typeof window === undefinedType) return;

          try {
              storedLevel = window.localStorage[storageKey];
          } catch (ignore) {}

          // Fallback to cookies if local storage gives us nothing
          if (typeof storedLevel === undefinedType) {
              try {
                  var cookie = window.document.cookie;
                  var location = cookie.indexOf(
                      encodeURIComponent(storageKey) + "=");
                  if (location !== -1) {
                      storedLevel = /^([^;]+)/.exec(cookie.slice(location))[1];
                  }
              } catch (ignore) {}
          }

          // If the stored level is not valid, treat it as if nothing was stored.
          if (self.levels[storedLevel] === undefined) {
              storedLevel = undefined;
          }

          return storedLevel;
      }

      /*
       *
       * Public logger API - see https://github.com/pimterry/loglevel for details
       *
       */

      self.name = name;

      self.levels = { "TRACE": 0, "DEBUG": 1, "INFO": 2, "WARN": 3,
          "ERROR": 4, "SILENT": 5};

      self.methodFactory = factory || defaultMethodFactory;

      self.getLevel = function () {
          return currentLevel;
      };

      self.setLevel = function (level, persist) {
          if (typeof level === "string" && self.levels[level.toUpperCase()] !== undefined) {
              level = self.levels[level.toUpperCase()];
          }
          if (typeof level === "number" && level >= 0 && level <= self.levels.SILENT) {
              currentLevel = level;
              if (persist !== false) {  // defaults to true
                  persistLevelIfPossible(level);
              }
              replaceLoggingMethods.call(self, level, name);
              if (typeof console === undefinedType && level < self.levels.SILENT) {
                  return "No console available for logging";
              }
          } else {
              throw "log.setLevel() called with invalid level: " + level;
          }
      };

      self.setDefaultLevel = function (level) {
          if (!getPersistedLevel()) {
              self.setLevel(level, false);
          }
      };

      self.enableAll = function(persist) {
          self.setLevel(self.levels.TRACE, persist);
      };

      self.disableAll = function(persist) {
          self.setLevel(self.levels.SILENT, persist);
      };

      // Initialize with the right level
      var initialLevel = getPersistedLevel();
      if (initialLevel == null) {
          initialLevel = defaultLevel == null ? "WARN" : defaultLevel;
      }
      self.setLevel(initialLevel, false);
    }

    /*
     *
     * Top-level API
     *
     */

    var defaultLogger = new Logger();

    var _loggersByName = {};
    defaultLogger.getLogger = function getLogger(name) {
        if (typeof name !== "string" || name === "") {
          throw new TypeError("You must supply a name when creating a logger.");
        }

        var logger = _loggersByName[name];
        if (!logger) {
          logger = _loggersByName[name] = new Logger(
            name, defaultLogger.getLevel(), defaultLogger.methodFactory);
        }
        return logger;
    };

    // Grab the current global log variable in case of overwrite
    var _log = (typeof window !== undefinedType) ? window.log : undefined;
    defaultLogger.noConflict = function() {
        if (typeof window !== undefinedType &&
               window.log === defaultLogger) {
            window.log = _log;
        }

        return defaultLogger;
    };

    defaultLogger.getLoggers = function getLoggers() {
        return _loggersByName;
    };

    return defaultLogger;
}));


/***/ }),

/***/ "./node_modules/moment/moment.js":
/*!***************************************!*\
  !*** ./node_modules/moment/moment.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var require;//! moment.js

;(function (global, factory) {
     true ? module.exports = factory() :
    undefined
}(this, (function () { 'use strict';

    var hookCallback;

    function hooks () {
        return hookCallback.apply(null, arguments);
    }

    // This is done to register the method called with moment()
    // without creating circular dependencies.
    function setHookCallback (callback) {
        hookCallback = callback;
    }

    function isArray(input) {
        return input instanceof Array || Object.prototype.toString.call(input) === '[object Array]';
    }

    function isObject(input) {
        // IE8 will treat undefined and null as object if it wasn't for
        // input != null
        return input != null && Object.prototype.toString.call(input) === '[object Object]';
    }

    function isObjectEmpty(obj) {
        if (Object.getOwnPropertyNames) {
            return (Object.getOwnPropertyNames(obj).length === 0);
        } else {
            var k;
            for (k in obj) {
                if (obj.hasOwnProperty(k)) {
                    return false;
                }
            }
            return true;
        }
    }

    function isUndefined(input) {
        return input === void 0;
    }

    function isNumber(input) {
        return typeof input === 'number' || Object.prototype.toString.call(input) === '[object Number]';
    }

    function isDate(input) {
        return input instanceof Date || Object.prototype.toString.call(input) === '[object Date]';
    }

    function map(arr, fn) {
        var res = [], i;
        for (i = 0; i < arr.length; ++i) {
            res.push(fn(arr[i], i));
        }
        return res;
    }

    function hasOwnProp(a, b) {
        return Object.prototype.hasOwnProperty.call(a, b);
    }

    function extend(a, b) {
        for (var i in b) {
            if (hasOwnProp(b, i)) {
                a[i] = b[i];
            }
        }

        if (hasOwnProp(b, 'toString')) {
            a.toString = b.toString;
        }

        if (hasOwnProp(b, 'valueOf')) {
            a.valueOf = b.valueOf;
        }

        return a;
    }

    function createUTC (input, format, locale, strict) {
        return createLocalOrUTC(input, format, locale, strict, true).utc();
    }

    function defaultParsingFlags() {
        // We need to deep clone this object.
        return {
            empty           : false,
            unusedTokens    : [],
            unusedInput     : [],
            overflow        : -2,
            charsLeftOver   : 0,
            nullInput       : false,
            invalidMonth    : null,
            invalidFormat   : false,
            userInvalidated : false,
            iso             : false,
            parsedDateParts : [],
            meridiem        : null,
            rfc2822         : false,
            weekdayMismatch : false
        };
    }

    function getParsingFlags(m) {
        if (m._pf == null) {
            m._pf = defaultParsingFlags();
        }
        return m._pf;
    }

    var some;
    if (Array.prototype.some) {
        some = Array.prototype.some;
    } else {
        some = function (fun) {
            var t = Object(this);
            var len = t.length >>> 0;

            for (var i = 0; i < len; i++) {
                if (i in t && fun.call(this, t[i], i, t)) {
                    return true;
                }
            }

            return false;
        };
    }

    function isValid(m) {
        if (m._isValid == null) {
            var flags = getParsingFlags(m);
            var parsedParts = some.call(flags.parsedDateParts, function (i) {
                return i != null;
            });
            var isNowValid = !isNaN(m._d.getTime()) &&
                flags.overflow < 0 &&
                !flags.empty &&
                !flags.invalidMonth &&
                !flags.invalidWeekday &&
                !flags.weekdayMismatch &&
                !flags.nullInput &&
                !flags.invalidFormat &&
                !flags.userInvalidated &&
                (!flags.meridiem || (flags.meridiem && parsedParts));

            if (m._strict) {
                isNowValid = isNowValid &&
                    flags.charsLeftOver === 0 &&
                    flags.unusedTokens.length === 0 &&
                    flags.bigHour === undefined;
            }

            if (Object.isFrozen == null || !Object.isFrozen(m)) {
                m._isValid = isNowValid;
            }
            else {
                return isNowValid;
            }
        }
        return m._isValid;
    }

    function createInvalid (flags) {
        var m = createUTC(NaN);
        if (flags != null) {
            extend(getParsingFlags(m), flags);
        }
        else {
            getParsingFlags(m).userInvalidated = true;
        }

        return m;
    }

    // Plugins that add properties should also add the key here (null value),
    // so we can properly clone ourselves.
    var momentProperties = hooks.momentProperties = [];

    function copyConfig(to, from) {
        var i, prop, val;

        if (!isUndefined(from._isAMomentObject)) {
            to._isAMomentObject = from._isAMomentObject;
        }
        if (!isUndefined(from._i)) {
            to._i = from._i;
        }
        if (!isUndefined(from._f)) {
            to._f = from._f;
        }
        if (!isUndefined(from._l)) {
            to._l = from._l;
        }
        if (!isUndefined(from._strict)) {
            to._strict = from._strict;
        }
        if (!isUndefined(from._tzm)) {
            to._tzm = from._tzm;
        }
        if (!isUndefined(from._isUTC)) {
            to._isUTC = from._isUTC;
        }
        if (!isUndefined(from._offset)) {
            to._offset = from._offset;
        }
        if (!isUndefined(from._pf)) {
            to._pf = getParsingFlags(from);
        }
        if (!isUndefined(from._locale)) {
            to._locale = from._locale;
        }

        if (momentProperties.length > 0) {
            for (i = 0; i < momentProperties.length; i++) {
                prop = momentProperties[i];
                val = from[prop];
                if (!isUndefined(val)) {
                    to[prop] = val;
                }
            }
        }

        return to;
    }

    var updateInProgress = false;

    // Moment prototype object
    function Moment(config) {
        copyConfig(this, config);
        this._d = new Date(config._d != null ? config._d.getTime() : NaN);
        if (!this.isValid()) {
            this._d = new Date(NaN);
        }
        // Prevent infinite loop in case updateOffset creates new moment
        // objects.
        if (updateInProgress === false) {
            updateInProgress = true;
            hooks.updateOffset(this);
            updateInProgress = false;
        }
    }

    function isMoment (obj) {
        return obj instanceof Moment || (obj != null && obj._isAMomentObject != null);
    }

    function absFloor (number) {
        if (number < 0) {
            // -0 -> 0
            return Math.ceil(number) || 0;
        } else {
            return Math.floor(number);
        }
    }

    function toInt(argumentForCoercion) {
        var coercedNumber = +argumentForCoercion,
            value = 0;

        if (coercedNumber !== 0 && isFinite(coercedNumber)) {
            value = absFloor(coercedNumber);
        }

        return value;
    }

    // compare two arrays, return the number of differences
    function compareArrays(array1, array2, dontConvert) {
        var len = Math.min(array1.length, array2.length),
            lengthDiff = Math.abs(array1.length - array2.length),
            diffs = 0,
            i;
        for (i = 0; i < len; i++) {
            if ((dontConvert && array1[i] !== array2[i]) ||
                (!dontConvert && toInt(array1[i]) !== toInt(array2[i]))) {
                diffs++;
            }
        }
        return diffs + lengthDiff;
    }

    function warn(msg) {
        if (hooks.suppressDeprecationWarnings === false &&
                (typeof console !==  'undefined') && console.warn) {
            console.warn('Deprecation warning: ' + msg);
        }
    }

    function deprecate(msg, fn) {
        var firstTime = true;

        return extend(function () {
            if (hooks.deprecationHandler != null) {
                hooks.deprecationHandler(null, msg);
            }
            if (firstTime) {
                var args = [];
                var arg;
                for (var i = 0; i < arguments.length; i++) {
                    arg = '';
                    if (typeof arguments[i] === 'object') {
                        arg += '\n[' + i + '] ';
                        for (var key in arguments[0]) {
                            arg += key + ': ' + arguments[0][key] + ', ';
                        }
                        arg = arg.slice(0, -2); // Remove trailing comma and space
                    } else {
                        arg = arguments[i];
                    }
                    args.push(arg);
                }
                warn(msg + '\nArguments: ' + Array.prototype.slice.call(args).join('') + '\n' + (new Error()).stack);
                firstTime = false;
            }
            return fn.apply(this, arguments);
        }, fn);
    }

    var deprecations = {};

    function deprecateSimple(name, msg) {
        if (hooks.deprecationHandler != null) {
            hooks.deprecationHandler(name, msg);
        }
        if (!deprecations[name]) {
            warn(msg);
            deprecations[name] = true;
        }
    }

    hooks.suppressDeprecationWarnings = false;
    hooks.deprecationHandler = null;

    function isFunction(input) {
        return input instanceof Function || Object.prototype.toString.call(input) === '[object Function]';
    }

    function set (config) {
        var prop, i;
        for (i in config) {
            prop = config[i];
            if (isFunction(prop)) {
                this[i] = prop;
            } else {
                this['_' + i] = prop;
            }
        }
        this._config = config;
        // Lenient ordinal parsing accepts just a number in addition to
        // number + (possibly) stuff coming from _dayOfMonthOrdinalParse.
        // TODO: Remove "ordinalParse" fallback in next major release.
        this._dayOfMonthOrdinalParseLenient = new RegExp(
            (this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) +
                '|' + (/\d{1,2}/).source);
    }

    function mergeConfigs(parentConfig, childConfig) {
        var res = extend({}, parentConfig), prop;
        for (prop in childConfig) {
            if (hasOwnProp(childConfig, prop)) {
                if (isObject(parentConfig[prop]) && isObject(childConfig[prop])) {
                    res[prop] = {};
                    extend(res[prop], parentConfig[prop]);
                    extend(res[prop], childConfig[prop]);
                } else if (childConfig[prop] != null) {
                    res[prop] = childConfig[prop];
                } else {
                    delete res[prop];
                }
            }
        }
        for (prop in parentConfig) {
            if (hasOwnProp(parentConfig, prop) &&
                    !hasOwnProp(childConfig, prop) &&
                    isObject(parentConfig[prop])) {
                // make sure changes to properties don't modify parent config
                res[prop] = extend({}, res[prop]);
            }
        }
        return res;
    }

    function Locale(config) {
        if (config != null) {
            this.set(config);
        }
    }

    var keys;

    if (Object.keys) {
        keys = Object.keys;
    } else {
        keys = function (obj) {
            var i, res = [];
            for (i in obj) {
                if (hasOwnProp(obj, i)) {
                    res.push(i);
                }
            }
            return res;
        };
    }

    var defaultCalendar = {
        sameDay : '[Today at] LT',
        nextDay : '[Tomorrow at] LT',
        nextWeek : 'dddd [at] LT',
        lastDay : '[Yesterday at] LT',
        lastWeek : '[Last] dddd [at] LT',
        sameElse : 'L'
    };

    function calendar (key, mom, now) {
        var output = this._calendar[key] || this._calendar['sameElse'];
        return isFunction(output) ? output.call(mom, now) : output;
    }

    var defaultLongDateFormat = {
        LTS  : 'h:mm:ss A',
        LT   : 'h:mm A',
        L    : 'MM/DD/YYYY',
        LL   : 'MMMM D, YYYY',
        LLL  : 'MMMM D, YYYY h:mm A',
        LLLL : 'dddd, MMMM D, YYYY h:mm A'
    };

    function longDateFormat (key) {
        var format = this._longDateFormat[key],
            formatUpper = this._longDateFormat[key.toUpperCase()];

        if (format || !formatUpper) {
            return format;
        }

        this._longDateFormat[key] = formatUpper.replace(/MMMM|MM|DD|dddd/g, function (val) {
            return val.slice(1);
        });

        return this._longDateFormat[key];
    }

    var defaultInvalidDate = 'Invalid date';

    function invalidDate () {
        return this._invalidDate;
    }

    var defaultOrdinal = '%d';
    var defaultDayOfMonthOrdinalParse = /\d{1,2}/;

    function ordinal (number) {
        return this._ordinal.replace('%d', number);
    }

    var defaultRelativeTime = {
        future : 'in %s',
        past   : '%s ago',
        s  : 'a few seconds',
        ss : '%d seconds',
        m  : 'a minute',
        mm : '%d minutes',
        h  : 'an hour',
        hh : '%d hours',
        d  : 'a day',
        dd : '%d days',
        M  : 'a month',
        MM : '%d months',
        y  : 'a year',
        yy : '%d years'
    };

    function relativeTime (number, withoutSuffix, string, isFuture) {
        var output = this._relativeTime[string];
        return (isFunction(output)) ?
            output(number, withoutSuffix, string, isFuture) :
            output.replace(/%d/i, number);
    }

    function pastFuture (diff, output) {
        var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
        return isFunction(format) ? format(output) : format.replace(/%s/i, output);
    }

    var aliases = {};

    function addUnitAlias (unit, shorthand) {
        var lowerCase = unit.toLowerCase();
        aliases[lowerCase] = aliases[lowerCase + 's'] = aliases[shorthand] = unit;
    }

    function normalizeUnits(units) {
        return typeof units === 'string' ? aliases[units] || aliases[units.toLowerCase()] : undefined;
    }

    function normalizeObjectUnits(inputObject) {
        var normalizedInput = {},
            normalizedProp,
            prop;

        for (prop in inputObject) {
            if (hasOwnProp(inputObject, prop)) {
                normalizedProp = normalizeUnits(prop);
                if (normalizedProp) {
                    normalizedInput[normalizedProp] = inputObject[prop];
                }
            }
        }

        return normalizedInput;
    }

    var priorities = {};

    function addUnitPriority(unit, priority) {
        priorities[unit] = priority;
    }

    function getPrioritizedUnits(unitsObj) {
        var units = [];
        for (var u in unitsObj) {
            units.push({unit: u, priority: priorities[u]});
        }
        units.sort(function (a, b) {
            return a.priority - b.priority;
        });
        return units;
    }

    function zeroFill(number, targetLength, forceSign) {
        var absNumber = '' + Math.abs(number),
            zerosToFill = targetLength - absNumber.length,
            sign = number >= 0;
        return (sign ? (forceSign ? '+' : '') : '-') +
            Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) + absNumber;
    }

    var formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g;

    var localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g;

    var formatFunctions = {};

    var formatTokenFunctions = {};

    // token:    'M'
    // padded:   ['MM', 2]
    // ordinal:  'Mo'
    // callback: function () { this.month() + 1 }
    function addFormatToken (token, padded, ordinal, callback) {
        var func = callback;
        if (typeof callback === 'string') {
            func = function () {
                return this[callback]();
            };
        }
        if (token) {
            formatTokenFunctions[token] = func;
        }
        if (padded) {
            formatTokenFunctions[padded[0]] = function () {
                return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
            };
        }
        if (ordinal) {
            formatTokenFunctions[ordinal] = function () {
                return this.localeData().ordinal(func.apply(this, arguments), token);
            };
        }
    }

    function removeFormattingTokens(input) {
        if (input.match(/\[[\s\S]/)) {
            return input.replace(/^\[|\]$/g, '');
        }
        return input.replace(/\\/g, '');
    }

    function makeFormatFunction(format) {
        var array = format.match(formattingTokens), i, length;

        for (i = 0, length = array.length; i < length; i++) {
            if (formatTokenFunctions[array[i]]) {
                array[i] = formatTokenFunctions[array[i]];
            } else {
                array[i] = removeFormattingTokens(array[i]);
            }
        }

        return function (mom) {
            var output = '', i;
            for (i = 0; i < length; i++) {
                output += isFunction(array[i]) ? array[i].call(mom, format) : array[i];
            }
            return output;
        };
    }

    // format date using native date object
    function formatMoment(m, format) {
        if (!m.isValid()) {
            return m.localeData().invalidDate();
        }

        format = expandFormat(format, m.localeData());
        formatFunctions[format] = formatFunctions[format] || makeFormatFunction(format);

        return formatFunctions[format](m);
    }

    function expandFormat(format, locale) {
        var i = 5;

        function replaceLongDateFormatTokens(input) {
            return locale.longDateFormat(input) || input;
        }

        localFormattingTokens.lastIndex = 0;
        while (i >= 0 && localFormattingTokens.test(format)) {
            format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);
            localFormattingTokens.lastIndex = 0;
            i -= 1;
        }

        return format;
    }

    var match1         = /\d/;            //       0 - 9
    var match2         = /\d\d/;          //      00 - 99
    var match3         = /\d{3}/;         //     000 - 999
    var match4         = /\d{4}/;         //    0000 - 9999
    var match6         = /[+-]?\d{6}/;    // -999999 - 999999
    var match1to2      = /\d\d?/;         //       0 - 99
    var match3to4      = /\d\d\d\d?/;     //     999 - 9999
    var match5to6      = /\d\d\d\d\d\d?/; //   99999 - 999999
    var match1to3      = /\d{1,3}/;       //       0 - 999
    var match1to4      = /\d{1,4}/;       //       0 - 9999
    var match1to6      = /[+-]?\d{1,6}/;  // -999999 - 999999

    var matchUnsigned  = /\d+/;           //       0 - inf
    var matchSigned    = /[+-]?\d+/;      //    -inf - inf

    var matchOffset    = /Z|[+-]\d\d:?\d\d/gi; // +00:00 -00:00 +0000 -0000 or Z
    var matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi; // +00 -00 +00:00 -00:00 +0000 -0000 or Z

    var matchTimestamp = /[+-]?\d+(\.\d{1,3})?/; // 123456789 123456789.123

    // any word (or two) characters or numbers including two/three word month in arabic.
    // includes scottish gaelic two word and hyphenated months
    var matchWord = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i;

    var regexes = {};

    function addRegexToken (token, regex, strictRegex) {
        regexes[token] = isFunction(regex) ? regex : function (isStrict, localeData) {
            return (isStrict && strictRegex) ? strictRegex : regex;
        };
    }

    function getParseRegexForToken (token, config) {
        if (!hasOwnProp(regexes, token)) {
            return new RegExp(unescapeFormat(token));
        }

        return regexes[token](config._strict, config._locale);
    }

    // Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
    function unescapeFormat(s) {
        return regexEscape(s.replace('\\', '').replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (matched, p1, p2, p3, p4) {
            return p1 || p2 || p3 || p4;
        }));
    }

    function regexEscape(s) {
        return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    }

    var tokens = {};

    function addParseToken (token, callback) {
        var i, func = callback;
        if (typeof token === 'string') {
            token = [token];
        }
        if (isNumber(callback)) {
            func = function (input, array) {
                array[callback] = toInt(input);
            };
        }
        for (i = 0; i < token.length; i++) {
            tokens[token[i]] = func;
        }
    }

    function addWeekParseToken (token, callback) {
        addParseToken(token, function (input, array, config, token) {
            config._w = config._w || {};
            callback(input, config._w, config, token);
        });
    }

    function addTimeToArrayFromToken(token, input, config) {
        if (input != null && hasOwnProp(tokens, token)) {
            tokens[token](input, config._a, config, token);
        }
    }

    var YEAR = 0;
    var MONTH = 1;
    var DATE = 2;
    var HOUR = 3;
    var MINUTE = 4;
    var SECOND = 5;
    var MILLISECOND = 6;
    var WEEK = 7;
    var WEEKDAY = 8;

    // FORMATTING

    addFormatToken('Y', 0, 0, function () {
        var y = this.year();
        return y <= 9999 ? '' + y : '+' + y;
    });

    addFormatToken(0, ['YY', 2], 0, function () {
        return this.year() % 100;
    });

    addFormatToken(0, ['YYYY',   4],       0, 'year');
    addFormatToken(0, ['YYYYY',  5],       0, 'year');
    addFormatToken(0, ['YYYYYY', 6, true], 0, 'year');

    // ALIASES

    addUnitAlias('year', 'y');

    // PRIORITIES

    addUnitPriority('year', 1);

    // PARSING

    addRegexToken('Y',      matchSigned);
    addRegexToken('YY',     match1to2, match2);
    addRegexToken('YYYY',   match1to4, match4);
    addRegexToken('YYYYY',  match1to6, match6);
    addRegexToken('YYYYYY', match1to6, match6);

    addParseToken(['YYYYY', 'YYYYYY'], YEAR);
    addParseToken('YYYY', function (input, array) {
        array[YEAR] = input.length === 2 ? hooks.parseTwoDigitYear(input) : toInt(input);
    });
    addParseToken('YY', function (input, array) {
        array[YEAR] = hooks.parseTwoDigitYear(input);
    });
    addParseToken('Y', function (input, array) {
        array[YEAR] = parseInt(input, 10);
    });

    // HELPERS

    function daysInYear(year) {
        return isLeapYear(year) ? 366 : 365;
    }

    function isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    }

    // HOOKS

    hooks.parseTwoDigitYear = function (input) {
        return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
    };

    // MOMENTS

    var getSetYear = makeGetSet('FullYear', true);

    function getIsLeapYear () {
        return isLeapYear(this.year());
    }

    function makeGetSet (unit, keepTime) {
        return function (value) {
            if (value != null) {
                set$1(this, unit, value);
                hooks.updateOffset(this, keepTime);
                return this;
            } else {
                return get(this, unit);
            }
        };
    }

    function get (mom, unit) {
        return mom.isValid() ?
            mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]() : NaN;
    }

    function set$1 (mom, unit, value) {
        if (mom.isValid() && !isNaN(value)) {
            if (unit === 'FullYear' && isLeapYear(mom.year()) && mom.month() === 1 && mom.date() === 29) {
                mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value, mom.month(), daysInMonth(value, mom.month()));
            }
            else {
                mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);
            }
        }
    }

    // MOMENTS

    function stringGet (units) {
        units = normalizeUnits(units);
        if (isFunction(this[units])) {
            return this[units]();
        }
        return this;
    }


    function stringSet (units, value) {
        if (typeof units === 'object') {
            units = normalizeObjectUnits(units);
            var prioritized = getPrioritizedUnits(units);
            for (var i = 0; i < prioritized.length; i++) {
                this[prioritized[i].unit](units[prioritized[i].unit]);
            }
        } else {
            units = normalizeUnits(units);
            if (isFunction(this[units])) {
                return this[units](value);
            }
        }
        return this;
    }

    function mod(n, x) {
        return ((n % x) + x) % x;
    }

    var indexOf;

    if (Array.prototype.indexOf) {
        indexOf = Array.prototype.indexOf;
    } else {
        indexOf = function (o) {
            // I know
            var i;
            for (i = 0; i < this.length; ++i) {
                if (this[i] === o) {
                    return i;
                }
            }
            return -1;
        };
    }

    function daysInMonth(year, month) {
        if (isNaN(year) || isNaN(month)) {
            return NaN;
        }
        var modMonth = mod(month, 12);
        year += (month - modMonth) / 12;
        return modMonth === 1 ? (isLeapYear(year) ? 29 : 28) : (31 - modMonth % 7 % 2);
    }

    // FORMATTING

    addFormatToken('M', ['MM', 2], 'Mo', function () {
        return this.month() + 1;
    });

    addFormatToken('MMM', 0, 0, function (format) {
        return this.localeData().monthsShort(this, format);
    });

    addFormatToken('MMMM', 0, 0, function (format) {
        return this.localeData().months(this, format);
    });

    // ALIASES

    addUnitAlias('month', 'M');

    // PRIORITY

    addUnitPriority('month', 8);

    // PARSING

    addRegexToken('M',    match1to2);
    addRegexToken('MM',   match1to2, match2);
    addRegexToken('MMM',  function (isStrict, locale) {
        return locale.monthsShortRegex(isStrict);
    });
    addRegexToken('MMMM', function (isStrict, locale) {
        return locale.monthsRegex(isStrict);
    });

    addParseToken(['M', 'MM'], function (input, array) {
        array[MONTH] = toInt(input) - 1;
    });

    addParseToken(['MMM', 'MMMM'], function (input, array, config, token) {
        var month = config._locale.monthsParse(input, token, config._strict);
        // if we didn't find a month name, mark the date as invalid.
        if (month != null) {
            array[MONTH] = month;
        } else {
            getParsingFlags(config).invalidMonth = input;
        }
    });

    // LOCALES

    var MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/;
    var defaultLocaleMonths = 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_');
    function localeMonths (m, format) {
        if (!m) {
            return isArray(this._months) ? this._months :
                this._months['standalone'];
        }
        return isArray(this._months) ? this._months[m.month()] :
            this._months[(this._months.isFormat || MONTHS_IN_FORMAT).test(format) ? 'format' : 'standalone'][m.month()];
    }

    var defaultLocaleMonthsShort = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_');
    function localeMonthsShort (m, format) {
        if (!m) {
            return isArray(this._monthsShort) ? this._monthsShort :
                this._monthsShort['standalone'];
        }
        return isArray(this._monthsShort) ? this._monthsShort[m.month()] :
            this._monthsShort[MONTHS_IN_FORMAT.test(format) ? 'format' : 'standalone'][m.month()];
    }

    function handleStrictParse(monthName, format, strict) {
        var i, ii, mom, llc = monthName.toLocaleLowerCase();
        if (!this._monthsParse) {
            // this is not used
            this._monthsParse = [];
            this._longMonthsParse = [];
            this._shortMonthsParse = [];
            for (i = 0; i < 12; ++i) {
                mom = createUTC([2000, i]);
                this._shortMonthsParse[i] = this.monthsShort(mom, '').toLocaleLowerCase();
                this._longMonthsParse[i] = this.months(mom, '').toLocaleLowerCase();
            }
        }

        if (strict) {
            if (format === 'MMM') {
                ii = indexOf.call(this._shortMonthsParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._longMonthsParse, llc);
                return ii !== -1 ? ii : null;
            }
        } else {
            if (format === 'MMM') {
                ii = indexOf.call(this._shortMonthsParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._longMonthsParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._longMonthsParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._shortMonthsParse, llc);
                return ii !== -1 ? ii : null;
            }
        }
    }

    function localeMonthsParse (monthName, format, strict) {
        var i, mom, regex;

        if (this._monthsParseExact) {
            return handleStrictParse.call(this, monthName, format, strict);
        }

        if (!this._monthsParse) {
            this._monthsParse = [];
            this._longMonthsParse = [];
            this._shortMonthsParse = [];
        }

        // TODO: add sorting
        // Sorting makes sure if one month (or abbr) is a prefix of another
        // see sorting in computeMonthsParse
        for (i = 0; i < 12; i++) {
            // make the regex if we don't have it already
            mom = createUTC([2000, i]);
            if (strict && !this._longMonthsParse[i]) {
                this._longMonthsParse[i] = new RegExp('^' + this.months(mom, '').replace('.', '') + '$', 'i');
                this._shortMonthsParse[i] = new RegExp('^' + this.monthsShort(mom, '').replace('.', '') + '$', 'i');
            }
            if (!strict && !this._monthsParse[i]) {
                regex = '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
                this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
            }
            // test the regex
            if (strict && format === 'MMMM' && this._longMonthsParse[i].test(monthName)) {
                return i;
            } else if (strict && format === 'MMM' && this._shortMonthsParse[i].test(monthName)) {
                return i;
            } else if (!strict && this._monthsParse[i].test(monthName)) {
                return i;
            }
        }
    }

    // MOMENTS

    function setMonth (mom, value) {
        var dayOfMonth;

        if (!mom.isValid()) {
            // No op
            return mom;
        }

        if (typeof value === 'string') {
            if (/^\d+$/.test(value)) {
                value = toInt(value);
            } else {
                value = mom.localeData().monthsParse(value);
                // TODO: Another silent failure?
                if (!isNumber(value)) {
                    return mom;
                }
            }
        }

        dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));
        mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);
        return mom;
    }

    function getSetMonth (value) {
        if (value != null) {
            setMonth(this, value);
            hooks.updateOffset(this, true);
            return this;
        } else {
            return get(this, 'Month');
        }
    }

    function getDaysInMonth () {
        return daysInMonth(this.year(), this.month());
    }

    var defaultMonthsShortRegex = matchWord;
    function monthsShortRegex (isStrict) {
        if (this._monthsParseExact) {
            if (!hasOwnProp(this, '_monthsRegex')) {
                computeMonthsParse.call(this);
            }
            if (isStrict) {
                return this._monthsShortStrictRegex;
            } else {
                return this._monthsShortRegex;
            }
        } else {
            if (!hasOwnProp(this, '_monthsShortRegex')) {
                this._monthsShortRegex = defaultMonthsShortRegex;
            }
            return this._monthsShortStrictRegex && isStrict ?
                this._monthsShortStrictRegex : this._monthsShortRegex;
        }
    }

    var defaultMonthsRegex = matchWord;
    function monthsRegex (isStrict) {
        if (this._monthsParseExact) {
            if (!hasOwnProp(this, '_monthsRegex')) {
                computeMonthsParse.call(this);
            }
            if (isStrict) {
                return this._monthsStrictRegex;
            } else {
                return this._monthsRegex;
            }
        } else {
            if (!hasOwnProp(this, '_monthsRegex')) {
                this._monthsRegex = defaultMonthsRegex;
            }
            return this._monthsStrictRegex && isStrict ?
                this._monthsStrictRegex : this._monthsRegex;
        }
    }

    function computeMonthsParse () {
        function cmpLenRev(a, b) {
            return b.length - a.length;
        }

        var shortPieces = [], longPieces = [], mixedPieces = [],
            i, mom;
        for (i = 0; i < 12; i++) {
            // make the regex if we don't have it already
            mom = createUTC([2000, i]);
            shortPieces.push(this.monthsShort(mom, ''));
            longPieces.push(this.months(mom, ''));
            mixedPieces.push(this.months(mom, ''));
            mixedPieces.push(this.monthsShort(mom, ''));
        }
        // Sorting makes sure if one month (or abbr) is a prefix of another it
        // will match the longer piece.
        shortPieces.sort(cmpLenRev);
        longPieces.sort(cmpLenRev);
        mixedPieces.sort(cmpLenRev);
        for (i = 0; i < 12; i++) {
            shortPieces[i] = regexEscape(shortPieces[i]);
            longPieces[i] = regexEscape(longPieces[i]);
        }
        for (i = 0; i < 24; i++) {
            mixedPieces[i] = regexEscape(mixedPieces[i]);
        }

        this._monthsRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
        this._monthsShortRegex = this._monthsRegex;
        this._monthsStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
        this._monthsShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
    }

    function createDate (y, m, d, h, M, s, ms) {
        // can't just apply() to create a date:
        // https://stackoverflow.com/q/181348
        var date;
        // the date constructor remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0) {
            // preserve leap years using a full 400 year cycle, then reset
            date = new Date(y + 400, m, d, h, M, s, ms);
            if (isFinite(date.getFullYear())) {
                date.setFullYear(y);
            }
        } else {
            date = new Date(y, m, d, h, M, s, ms);
        }

        return date;
    }

    function createUTCDate (y) {
        var date;
        // the Date.UTC function remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0) {
            var args = Array.prototype.slice.call(arguments);
            // preserve leap years using a full 400 year cycle, then reset
            args[0] = y + 400;
            date = new Date(Date.UTC.apply(null, args));
            if (isFinite(date.getUTCFullYear())) {
                date.setUTCFullYear(y);
            }
        } else {
            date = new Date(Date.UTC.apply(null, arguments));
        }

        return date;
    }

    // start-of-first-week - start-of-year
    function firstWeekOffset(year, dow, doy) {
        var // first-week day -- which january is always in the first week (4 for iso, 1 for other)
            fwd = 7 + dow - doy,
            // first-week day local weekday -- which local weekday is fwd
            fwdlw = (7 + createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;

        return -fwdlw + fwd - 1;
    }

    // https://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
    function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
        var localWeekday = (7 + weekday - dow) % 7,
            weekOffset = firstWeekOffset(year, dow, doy),
            dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset,
            resYear, resDayOfYear;

        if (dayOfYear <= 0) {
            resYear = year - 1;
            resDayOfYear = daysInYear(resYear) + dayOfYear;
        } else if (dayOfYear > daysInYear(year)) {
            resYear = year + 1;
            resDayOfYear = dayOfYear - daysInYear(year);
        } else {
            resYear = year;
            resDayOfYear = dayOfYear;
        }

        return {
            year: resYear,
            dayOfYear: resDayOfYear
        };
    }

    function weekOfYear(mom, dow, doy) {
        var weekOffset = firstWeekOffset(mom.year(), dow, doy),
            week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1,
            resWeek, resYear;

        if (week < 1) {
            resYear = mom.year() - 1;
            resWeek = week + weeksInYear(resYear, dow, doy);
        } else if (week > weeksInYear(mom.year(), dow, doy)) {
            resWeek = week - weeksInYear(mom.year(), dow, doy);
            resYear = mom.year() + 1;
        } else {
            resYear = mom.year();
            resWeek = week;
        }

        return {
            week: resWeek,
            year: resYear
        };
    }

    function weeksInYear(year, dow, doy) {
        var weekOffset = firstWeekOffset(year, dow, doy),
            weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
        return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;
    }

    // FORMATTING

    addFormatToken('w', ['ww', 2], 'wo', 'week');
    addFormatToken('W', ['WW', 2], 'Wo', 'isoWeek');

    // ALIASES

    addUnitAlias('week', 'w');
    addUnitAlias('isoWeek', 'W');

    // PRIORITIES

    addUnitPriority('week', 5);
    addUnitPriority('isoWeek', 5);

    // PARSING

    addRegexToken('w',  match1to2);
    addRegexToken('ww', match1to2, match2);
    addRegexToken('W',  match1to2);
    addRegexToken('WW', match1to2, match2);

    addWeekParseToken(['w', 'ww', 'W', 'WW'], function (input, week, config, token) {
        week[token.substr(0, 1)] = toInt(input);
    });

    // HELPERS

    // LOCALES

    function localeWeek (mom) {
        return weekOfYear(mom, this._week.dow, this._week.doy).week;
    }

    var defaultLocaleWeek = {
        dow : 0, // Sunday is the first day of the week.
        doy : 6  // The week that contains Jan 6th is the first week of the year.
    };

    function localeFirstDayOfWeek () {
        return this._week.dow;
    }

    function localeFirstDayOfYear () {
        return this._week.doy;
    }

    // MOMENTS

    function getSetWeek (input) {
        var week = this.localeData().week(this);
        return input == null ? week : this.add((input - week) * 7, 'd');
    }

    function getSetISOWeek (input) {
        var week = weekOfYear(this, 1, 4).week;
        return input == null ? week : this.add((input - week) * 7, 'd');
    }

    // FORMATTING

    addFormatToken('d', 0, 'do', 'day');

    addFormatToken('dd', 0, 0, function (format) {
        return this.localeData().weekdaysMin(this, format);
    });

    addFormatToken('ddd', 0, 0, function (format) {
        return this.localeData().weekdaysShort(this, format);
    });

    addFormatToken('dddd', 0, 0, function (format) {
        return this.localeData().weekdays(this, format);
    });

    addFormatToken('e', 0, 0, 'weekday');
    addFormatToken('E', 0, 0, 'isoWeekday');

    // ALIASES

    addUnitAlias('day', 'd');
    addUnitAlias('weekday', 'e');
    addUnitAlias('isoWeekday', 'E');

    // PRIORITY
    addUnitPriority('day', 11);
    addUnitPriority('weekday', 11);
    addUnitPriority('isoWeekday', 11);

    // PARSING

    addRegexToken('d',    match1to2);
    addRegexToken('e',    match1to2);
    addRegexToken('E',    match1to2);
    addRegexToken('dd',   function (isStrict, locale) {
        return locale.weekdaysMinRegex(isStrict);
    });
    addRegexToken('ddd',   function (isStrict, locale) {
        return locale.weekdaysShortRegex(isStrict);
    });
    addRegexToken('dddd',   function (isStrict, locale) {
        return locale.weekdaysRegex(isStrict);
    });

    addWeekParseToken(['dd', 'ddd', 'dddd'], function (input, week, config, token) {
        var weekday = config._locale.weekdaysParse(input, token, config._strict);
        // if we didn't get a weekday name, mark the date as invalid
        if (weekday != null) {
            week.d = weekday;
        } else {
            getParsingFlags(config).invalidWeekday = input;
        }
    });

    addWeekParseToken(['d', 'e', 'E'], function (input, week, config, token) {
        week[token] = toInt(input);
    });

    // HELPERS

    function parseWeekday(input, locale) {
        if (typeof input !== 'string') {
            return input;
        }

        if (!isNaN(input)) {
            return parseInt(input, 10);
        }

        input = locale.weekdaysParse(input);
        if (typeof input === 'number') {
            return input;
        }

        return null;
    }

    function parseIsoWeekday(input, locale) {
        if (typeof input === 'string') {
            return locale.weekdaysParse(input) % 7 || 7;
        }
        return isNaN(input) ? null : input;
    }

    // LOCALES
    function shiftWeekdays (ws, n) {
        return ws.slice(n, 7).concat(ws.slice(0, n));
    }

    var defaultLocaleWeekdays = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_');
    function localeWeekdays (m, format) {
        var weekdays = isArray(this._weekdays) ? this._weekdays :
            this._weekdays[(m && m !== true && this._weekdays.isFormat.test(format)) ? 'format' : 'standalone'];
        return (m === true) ? shiftWeekdays(weekdays, this._week.dow)
            : (m) ? weekdays[m.day()] : weekdays;
    }

    var defaultLocaleWeekdaysShort = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_');
    function localeWeekdaysShort (m) {
        return (m === true) ? shiftWeekdays(this._weekdaysShort, this._week.dow)
            : (m) ? this._weekdaysShort[m.day()] : this._weekdaysShort;
    }

    var defaultLocaleWeekdaysMin = 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_');
    function localeWeekdaysMin (m) {
        return (m === true) ? shiftWeekdays(this._weekdaysMin, this._week.dow)
            : (m) ? this._weekdaysMin[m.day()] : this._weekdaysMin;
    }

    function handleStrictParse$1(weekdayName, format, strict) {
        var i, ii, mom, llc = weekdayName.toLocaleLowerCase();
        if (!this._weekdaysParse) {
            this._weekdaysParse = [];
            this._shortWeekdaysParse = [];
            this._minWeekdaysParse = [];

            for (i = 0; i < 7; ++i) {
                mom = createUTC([2000, 1]).day(i);
                this._minWeekdaysParse[i] = this.weekdaysMin(mom, '').toLocaleLowerCase();
                this._shortWeekdaysParse[i] = this.weekdaysShort(mom, '').toLocaleLowerCase();
                this._weekdaysParse[i] = this.weekdays(mom, '').toLocaleLowerCase();
            }
        }

        if (strict) {
            if (format === 'dddd') {
                ii = indexOf.call(this._weekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else if (format === 'ddd') {
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._minWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            }
        } else {
            if (format === 'dddd') {
                ii = indexOf.call(this._weekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._minWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else if (format === 'ddd') {
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._weekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._minWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._minWeekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._weekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            }
        }
    }

    function localeWeekdaysParse (weekdayName, format, strict) {
        var i, mom, regex;

        if (this._weekdaysParseExact) {
            return handleStrictParse$1.call(this, weekdayName, format, strict);
        }

        if (!this._weekdaysParse) {
            this._weekdaysParse = [];
            this._minWeekdaysParse = [];
            this._shortWeekdaysParse = [];
            this._fullWeekdaysParse = [];
        }

        for (i = 0; i < 7; i++) {
            // make the regex if we don't have it already

            mom = createUTC([2000, 1]).day(i);
            if (strict && !this._fullWeekdaysParse[i]) {
                this._fullWeekdaysParse[i] = new RegExp('^' + this.weekdays(mom, '').replace('.', '\\.?') + '$', 'i');
                this._shortWeekdaysParse[i] = new RegExp('^' + this.weekdaysShort(mom, '').replace('.', '\\.?') + '$', 'i');
                this._minWeekdaysParse[i] = new RegExp('^' + this.weekdaysMin(mom, '').replace('.', '\\.?') + '$', 'i');
            }
            if (!this._weekdaysParse[i]) {
                regex = '^' + this.weekdays(mom, '') + '|^' + this.weekdaysShort(mom, '') + '|^' + this.weekdaysMin(mom, '');
                this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
            }
            // test the regex
            if (strict && format === 'dddd' && this._fullWeekdaysParse[i].test(weekdayName)) {
                return i;
            } else if (strict && format === 'ddd' && this._shortWeekdaysParse[i].test(weekdayName)) {
                return i;
            } else if (strict && format === 'dd' && this._minWeekdaysParse[i].test(weekdayName)) {
                return i;
            } else if (!strict && this._weekdaysParse[i].test(weekdayName)) {
                return i;
            }
        }
    }

    // MOMENTS

    function getSetDayOfWeek (input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
        if (input != null) {
            input = parseWeekday(input, this.localeData());
            return this.add(input - day, 'd');
        } else {
            return day;
        }
    }

    function getSetLocaleDayOfWeek (input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
        return input == null ? weekday : this.add(input - weekday, 'd');
    }

    function getSetISODayOfWeek (input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }

        // behaves the same as moment#day except
        // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
        // as a setter, sunday should belong to the previous week.

        if (input != null) {
            var weekday = parseIsoWeekday(input, this.localeData());
            return this.day(this.day() % 7 ? weekday : weekday - 7);
        } else {
            return this.day() || 7;
        }
    }

    var defaultWeekdaysRegex = matchWord;
    function weekdaysRegex (isStrict) {
        if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                computeWeekdaysParse.call(this);
            }
            if (isStrict) {
                return this._weekdaysStrictRegex;
            } else {
                return this._weekdaysRegex;
            }
        } else {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                this._weekdaysRegex = defaultWeekdaysRegex;
            }
            return this._weekdaysStrictRegex && isStrict ?
                this._weekdaysStrictRegex : this._weekdaysRegex;
        }
    }

    var defaultWeekdaysShortRegex = matchWord;
    function weekdaysShortRegex (isStrict) {
        if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                computeWeekdaysParse.call(this);
            }
            if (isStrict) {
                return this._weekdaysShortStrictRegex;
            } else {
                return this._weekdaysShortRegex;
            }
        } else {
            if (!hasOwnProp(this, '_weekdaysShortRegex')) {
                this._weekdaysShortRegex = defaultWeekdaysShortRegex;
            }
            return this._weekdaysShortStrictRegex && isStrict ?
                this._weekdaysShortStrictRegex : this._weekdaysShortRegex;
        }
    }

    var defaultWeekdaysMinRegex = matchWord;
    function weekdaysMinRegex (isStrict) {
        if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                computeWeekdaysParse.call(this);
            }
            if (isStrict) {
                return this._weekdaysMinStrictRegex;
            } else {
                return this._weekdaysMinRegex;
            }
        } else {
            if (!hasOwnProp(this, '_weekdaysMinRegex')) {
                this._weekdaysMinRegex = defaultWeekdaysMinRegex;
            }
            return this._weekdaysMinStrictRegex && isStrict ?
                this._weekdaysMinStrictRegex : this._weekdaysMinRegex;
        }
    }


    function computeWeekdaysParse () {
        function cmpLenRev(a, b) {
            return b.length - a.length;
        }

        var minPieces = [], shortPieces = [], longPieces = [], mixedPieces = [],
            i, mom, minp, shortp, longp;
        for (i = 0; i < 7; i++) {
            // make the regex if we don't have it already
            mom = createUTC([2000, 1]).day(i);
            minp = this.weekdaysMin(mom, '');
            shortp = this.weekdaysShort(mom, '');
            longp = this.weekdays(mom, '');
            minPieces.push(minp);
            shortPieces.push(shortp);
            longPieces.push(longp);
            mixedPieces.push(minp);
            mixedPieces.push(shortp);
            mixedPieces.push(longp);
        }
        // Sorting makes sure if one weekday (or abbr) is a prefix of another it
        // will match the longer piece.
        minPieces.sort(cmpLenRev);
        shortPieces.sort(cmpLenRev);
        longPieces.sort(cmpLenRev);
        mixedPieces.sort(cmpLenRev);
        for (i = 0; i < 7; i++) {
            shortPieces[i] = regexEscape(shortPieces[i]);
            longPieces[i] = regexEscape(longPieces[i]);
            mixedPieces[i] = regexEscape(mixedPieces[i]);
        }

        this._weekdaysRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
        this._weekdaysShortRegex = this._weekdaysRegex;
        this._weekdaysMinRegex = this._weekdaysRegex;

        this._weekdaysStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
        this._weekdaysShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
        this._weekdaysMinStrictRegex = new RegExp('^(' + minPieces.join('|') + ')', 'i');
    }

    // FORMATTING

    function hFormat() {
        return this.hours() % 12 || 12;
    }

    function kFormat() {
        return this.hours() || 24;
    }

    addFormatToken('H', ['HH', 2], 0, 'hour');
    addFormatToken('h', ['hh', 2], 0, hFormat);
    addFormatToken('k', ['kk', 2], 0, kFormat);

    addFormatToken('hmm', 0, 0, function () {
        return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2);
    });

    addFormatToken('hmmss', 0, 0, function () {
        return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2) +
            zeroFill(this.seconds(), 2);
    });

    addFormatToken('Hmm', 0, 0, function () {
        return '' + this.hours() + zeroFill(this.minutes(), 2);
    });

    addFormatToken('Hmmss', 0, 0, function () {
        return '' + this.hours() + zeroFill(this.minutes(), 2) +
            zeroFill(this.seconds(), 2);
    });

    function meridiem (token, lowercase) {
        addFormatToken(token, 0, 0, function () {
            return this.localeData().meridiem(this.hours(), this.minutes(), lowercase);
        });
    }

    meridiem('a', true);
    meridiem('A', false);

    // ALIASES

    addUnitAlias('hour', 'h');

    // PRIORITY
    addUnitPriority('hour', 13);

    // PARSING

    function matchMeridiem (isStrict, locale) {
        return locale._meridiemParse;
    }

    addRegexToken('a',  matchMeridiem);
    addRegexToken('A',  matchMeridiem);
    addRegexToken('H',  match1to2);
    addRegexToken('h',  match1to2);
    addRegexToken('k',  match1to2);
    addRegexToken('HH', match1to2, match2);
    addRegexToken('hh', match1to2, match2);
    addRegexToken('kk', match1to2, match2);

    addRegexToken('hmm', match3to4);
    addRegexToken('hmmss', match5to6);
    addRegexToken('Hmm', match3to4);
    addRegexToken('Hmmss', match5to6);

    addParseToken(['H', 'HH'], HOUR);
    addParseToken(['k', 'kk'], function (input, array, config) {
        var kInput = toInt(input);
        array[HOUR] = kInput === 24 ? 0 : kInput;
    });
    addParseToken(['a', 'A'], function (input, array, config) {
        config._isPm = config._locale.isPM(input);
        config._meridiem = input;
    });
    addParseToken(['h', 'hh'], function (input, array, config) {
        array[HOUR] = toInt(input);
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('hmm', function (input, array, config) {
        var pos = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos));
        array[MINUTE] = toInt(input.substr(pos));
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('hmmss', function (input, array, config) {
        var pos1 = input.length - 4;
        var pos2 = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos1));
        array[MINUTE] = toInt(input.substr(pos1, 2));
        array[SECOND] = toInt(input.substr(pos2));
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('Hmm', function (input, array, config) {
        var pos = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos));
        array[MINUTE] = toInt(input.substr(pos));
    });
    addParseToken('Hmmss', function (input, array, config) {
        var pos1 = input.length - 4;
        var pos2 = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos1));
        array[MINUTE] = toInt(input.substr(pos1, 2));
        array[SECOND] = toInt(input.substr(pos2));
    });

    // LOCALES

    function localeIsPM (input) {
        // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
        // Using charAt should be more compatible.
        return ((input + '').toLowerCase().charAt(0) === 'p');
    }

    var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i;
    function localeMeridiem (hours, minutes, isLower) {
        if (hours > 11) {
            return isLower ? 'pm' : 'PM';
        } else {
            return isLower ? 'am' : 'AM';
        }
    }


    // MOMENTS

    // Setting the hour should keep the time, because the user explicitly
    // specified which hour they want. So trying to maintain the same hour (in
    // a new timezone) makes sense. Adding/subtracting hours does not follow
    // this rule.
    var getSetHour = makeGetSet('Hours', true);

    var baseConfig = {
        calendar: defaultCalendar,
        longDateFormat: defaultLongDateFormat,
        invalidDate: defaultInvalidDate,
        ordinal: defaultOrdinal,
        dayOfMonthOrdinalParse: defaultDayOfMonthOrdinalParse,
        relativeTime: defaultRelativeTime,

        months: defaultLocaleMonths,
        monthsShort: defaultLocaleMonthsShort,

        week: defaultLocaleWeek,

        weekdays: defaultLocaleWeekdays,
        weekdaysMin: defaultLocaleWeekdaysMin,
        weekdaysShort: defaultLocaleWeekdaysShort,

        meridiemParse: defaultLocaleMeridiemParse
    };

    // internal storage for locale config files
    var locales = {};
    var localeFamilies = {};
    var globalLocale;

    function normalizeLocale(key) {
        return key ? key.toLowerCase().replace('_', '-') : key;
    }

    // pick the locale from the array
    // try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
    // substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
    function chooseLocale(names) {
        var i = 0, j, next, locale, split;

        while (i < names.length) {
            split = normalizeLocale(names[i]).split('-');
            j = split.length;
            next = normalizeLocale(names[i + 1]);
            next = next ? next.split('-') : null;
            while (j > 0) {
                locale = loadLocale(split.slice(0, j).join('-'));
                if (locale) {
                    return locale;
                }
                if (next && next.length >= j && compareArrays(split, next, true) >= j - 1) {
                    //the next array item is better than a shallower substring of this one
                    break;
                }
                j--;
            }
            i++;
        }
        return globalLocale;
    }

    function loadLocale(name) {
        var oldLocale = null;
        // TODO: Find a better way to register and load all the locales in Node
        if (!locales[name] && (typeof module !== 'undefined') &&
                module && module.exports) {
            try {
                oldLocale = globalLocale._abbr;
                var aliasedRequire = require;
                !(function webpackMissingModule() { var e = new Error("Cannot find module 'undefined'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
                getSetGlobalLocale(oldLocale);
            } catch (e) {}
        }
        return locales[name];
    }

    // This function will load locale and then set the global locale.  If
    // no arguments are passed in, it will simply return the current global
    // locale key.
    function getSetGlobalLocale (key, values) {
        var data;
        if (key) {
            if (isUndefined(values)) {
                data = getLocale(key);
            }
            else {
                data = defineLocale(key, values);
            }

            if (data) {
                // moment.duration._locale = moment._locale = data;
                globalLocale = data;
            }
            else {
                if ((typeof console !==  'undefined') && console.warn) {
                    //warn user if arguments are passed but the locale could not be set
                    console.warn('Locale ' + key +  ' not found. Did you forget to load it?');
                }
            }
        }

        return globalLocale._abbr;
    }

    function defineLocale (name, config) {
        if (config !== null) {
            var locale, parentConfig = baseConfig;
            config.abbr = name;
            if (locales[name] != null) {
                deprecateSimple('defineLocaleOverride',
                        'use moment.updateLocale(localeName, config) to change ' +
                        'an existing locale. moment.defineLocale(localeName, ' +
                        'config) should only be used for creating a new locale ' +
                        'See http://momentjs.com/guides/#/warnings/define-locale/ for more info.');
                parentConfig = locales[name]._config;
            } else if (config.parentLocale != null) {
                if (locales[config.parentLocale] != null) {
                    parentConfig = locales[config.parentLocale]._config;
                } else {
                    locale = loadLocale(config.parentLocale);
                    if (locale != null) {
                        parentConfig = locale._config;
                    } else {
                        if (!localeFamilies[config.parentLocale]) {
                            localeFamilies[config.parentLocale] = [];
                        }
                        localeFamilies[config.parentLocale].push({
                            name: name,
                            config: config
                        });
                        return null;
                    }
                }
            }
            locales[name] = new Locale(mergeConfigs(parentConfig, config));

            if (localeFamilies[name]) {
                localeFamilies[name].forEach(function (x) {
                    defineLocale(x.name, x.config);
                });
            }

            // backwards compat for now: also set the locale
            // make sure we set the locale AFTER all child locales have been
            // created, so we won't end up with the child locale set.
            getSetGlobalLocale(name);


            return locales[name];
        } else {
            // useful for testing
            delete locales[name];
            return null;
        }
    }

    function updateLocale(name, config) {
        if (config != null) {
            var locale, tmpLocale, parentConfig = baseConfig;
            // MERGE
            tmpLocale = loadLocale(name);
            if (tmpLocale != null) {
                parentConfig = tmpLocale._config;
            }
            config = mergeConfigs(parentConfig, config);
            locale = new Locale(config);
            locale.parentLocale = locales[name];
            locales[name] = locale;

            // backwards compat for now: also set the locale
            getSetGlobalLocale(name);
        } else {
            // pass null for config to unupdate, useful for tests
            if (locales[name] != null) {
                if (locales[name].parentLocale != null) {
                    locales[name] = locales[name].parentLocale;
                } else if (locales[name] != null) {
                    delete locales[name];
                }
            }
        }
        return locales[name];
    }

    // returns locale data
    function getLocale (key) {
        var locale;

        if (key && key._locale && key._locale._abbr) {
            key = key._locale._abbr;
        }

        if (!key) {
            return globalLocale;
        }

        if (!isArray(key)) {
            //short-circuit everything else
            locale = loadLocale(key);
            if (locale) {
                return locale;
            }
            key = [key];
        }

        return chooseLocale(key);
    }

    function listLocales() {
        return keys(locales);
    }

    function checkOverflow (m) {
        var overflow;
        var a = m._a;

        if (a && getParsingFlags(m).overflow === -2) {
            overflow =
                a[MONTH]       < 0 || a[MONTH]       > 11  ? MONTH :
                a[DATE]        < 1 || a[DATE]        > daysInMonth(a[YEAR], a[MONTH]) ? DATE :
                a[HOUR]        < 0 || a[HOUR]        > 24 || (a[HOUR] === 24 && (a[MINUTE] !== 0 || a[SECOND] !== 0 || a[MILLISECOND] !== 0)) ? HOUR :
                a[MINUTE]      < 0 || a[MINUTE]      > 59  ? MINUTE :
                a[SECOND]      < 0 || a[SECOND]      > 59  ? SECOND :
                a[MILLISECOND] < 0 || a[MILLISECOND] > 999 ? MILLISECOND :
                -1;

            if (getParsingFlags(m)._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
                overflow = DATE;
            }
            if (getParsingFlags(m)._overflowWeeks && overflow === -1) {
                overflow = WEEK;
            }
            if (getParsingFlags(m)._overflowWeekday && overflow === -1) {
                overflow = WEEKDAY;
            }

            getParsingFlags(m).overflow = overflow;
        }

        return m;
    }

    // Pick the first defined of two or three arguments.
    function defaults(a, b, c) {
        if (a != null) {
            return a;
        }
        if (b != null) {
            return b;
        }
        return c;
    }

    function currentDateArray(config) {
        // hooks is actually the exported moment object
        var nowValue = new Date(hooks.now());
        if (config._useUTC) {
            return [nowValue.getUTCFullYear(), nowValue.getUTCMonth(), nowValue.getUTCDate()];
        }
        return [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()];
    }

    // convert an array to a date.
    // the array should mirror the parameters below
    // note: all values past the year are optional and will default to the lowest possible value.
    // [year, month, day , hour, minute, second, millisecond]
    function configFromArray (config) {
        var i, date, input = [], currentDate, expectedWeekday, yearToUse;

        if (config._d) {
            return;
        }

        currentDate = currentDateArray(config);

        //compute day of the year from weeks and weekdays
        if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
            dayOfYearFromWeekInfo(config);
        }

        //if the day of the year is set, figure out what it is
        if (config._dayOfYear != null) {
            yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);

            if (config._dayOfYear > daysInYear(yearToUse) || config._dayOfYear === 0) {
                getParsingFlags(config)._overflowDayOfYear = true;
            }

            date = createUTCDate(yearToUse, 0, config._dayOfYear);
            config._a[MONTH] = date.getUTCMonth();
            config._a[DATE] = date.getUTCDate();
        }

        // Default to current date.
        // * if no year, month, day of month are given, default to today
        // * if day of month is given, default month and year
        // * if month is given, default only year
        // * if year is given, don't default anything
        for (i = 0; i < 3 && config._a[i] == null; ++i) {
            config._a[i] = input[i] = currentDate[i];
        }

        // Zero out whatever was not defaulted, including time
        for (; i < 7; i++) {
            config._a[i] = input[i] = (config._a[i] == null) ? (i === 2 ? 1 : 0) : config._a[i];
        }

        // Check for 24:00:00.000
        if (config._a[HOUR] === 24 &&
                config._a[MINUTE] === 0 &&
                config._a[SECOND] === 0 &&
                config._a[MILLISECOND] === 0) {
            config._nextDay = true;
            config._a[HOUR] = 0;
        }

        config._d = (config._useUTC ? createUTCDate : createDate).apply(null, input);
        expectedWeekday = config._useUTC ? config._d.getUTCDay() : config._d.getDay();

        // Apply timezone offset from input. The actual utcOffset can be changed
        // with parseZone.
        if (config._tzm != null) {
            config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
        }

        if (config._nextDay) {
            config._a[HOUR] = 24;
        }

        // check for mismatching day of week
        if (config._w && typeof config._w.d !== 'undefined' && config._w.d !== expectedWeekday) {
            getParsingFlags(config).weekdayMismatch = true;
        }
    }

    function dayOfYearFromWeekInfo(config) {
        var w, weekYear, week, weekday, dow, doy, temp, weekdayOverflow;

        w = config._w;
        if (w.GG != null || w.W != null || w.E != null) {
            dow = 1;
            doy = 4;

            // TODO: We need to take the current isoWeekYear, but that depends on
            // how we interpret now (local, utc, fixed offset). So create
            // a now version of current config (take local/utc/offset flags, and
            // create now).
            weekYear = defaults(w.GG, config._a[YEAR], weekOfYear(createLocal(), 1, 4).year);
            week = defaults(w.W, 1);
            weekday = defaults(w.E, 1);
            if (weekday < 1 || weekday > 7) {
                weekdayOverflow = true;
            }
        } else {
            dow = config._locale._week.dow;
            doy = config._locale._week.doy;

            var curWeek = weekOfYear(createLocal(), dow, doy);

            weekYear = defaults(w.gg, config._a[YEAR], curWeek.year);

            // Default to current week.
            week = defaults(w.w, curWeek.week);

            if (w.d != null) {
                // weekday -- low day numbers are considered next week
                weekday = w.d;
                if (weekday < 0 || weekday > 6) {
                    weekdayOverflow = true;
                }
            } else if (w.e != null) {
                // local weekday -- counting starts from beginning of week
                weekday = w.e + dow;
                if (w.e < 0 || w.e > 6) {
                    weekdayOverflow = true;
                }
            } else {
                // default to beginning of week
                weekday = dow;
            }
        }
        if (week < 1 || week > weeksInYear(weekYear, dow, doy)) {
            getParsingFlags(config)._overflowWeeks = true;
        } else if (weekdayOverflow != null) {
            getParsingFlags(config)._overflowWeekday = true;
        } else {
            temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
            config._a[YEAR] = temp.year;
            config._dayOfYear = temp.dayOfYear;
        }
    }

    // iso 8601 regex
    // 0000-00-00 0000-W00 or 0000-W00-0 + T + 00 or 00:00 or 00:00:00 or 00:00:00.000 + +00:00 or +0000 or +00)
    var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;
    var basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;

    var tzRegex = /Z|[+-]\d\d(?::?\d\d)?/;

    var isoDates = [
        ['YYYYYY-MM-DD', /[+-]\d{6}-\d\d-\d\d/],
        ['YYYY-MM-DD', /\d{4}-\d\d-\d\d/],
        ['GGGG-[W]WW-E', /\d{4}-W\d\d-\d/],
        ['GGGG-[W]WW', /\d{4}-W\d\d/, false],
        ['YYYY-DDD', /\d{4}-\d{3}/],
        ['YYYY-MM', /\d{4}-\d\d/, false],
        ['YYYYYYMMDD', /[+-]\d{10}/],
        ['YYYYMMDD', /\d{8}/],
        // YYYYMM is NOT allowed by the standard
        ['GGGG[W]WWE', /\d{4}W\d{3}/],
        ['GGGG[W]WW', /\d{4}W\d{2}/, false],
        ['YYYYDDD', /\d{7}/]
    ];

    // iso time formats and regexes
    var isoTimes = [
        ['HH:mm:ss.SSSS', /\d\d:\d\d:\d\d\.\d+/],
        ['HH:mm:ss,SSSS', /\d\d:\d\d:\d\d,\d+/],
        ['HH:mm:ss', /\d\d:\d\d:\d\d/],
        ['HH:mm', /\d\d:\d\d/],
        ['HHmmss.SSSS', /\d\d\d\d\d\d\.\d+/],
        ['HHmmss,SSSS', /\d\d\d\d\d\d,\d+/],
        ['HHmmss', /\d\d\d\d\d\d/],
        ['HHmm', /\d\d\d\d/],
        ['HH', /\d\d/]
    ];

    var aspNetJsonRegex = /^\/?Date\((\-?\d+)/i;

    // date from iso format
    function configFromISO(config) {
        var i, l,
            string = config._i,
            match = extendedIsoRegex.exec(string) || basicIsoRegex.exec(string),
            allowTime, dateFormat, timeFormat, tzFormat;

        if (match) {
            getParsingFlags(config).iso = true;

            for (i = 0, l = isoDates.length; i < l; i++) {
                if (isoDates[i][1].exec(match[1])) {
                    dateFormat = isoDates[i][0];
                    allowTime = isoDates[i][2] !== false;
                    break;
                }
            }
            if (dateFormat == null) {
                config._isValid = false;
                return;
            }
            if (match[3]) {
                for (i = 0, l = isoTimes.length; i < l; i++) {
                    if (isoTimes[i][1].exec(match[3])) {
                        // match[2] should be 'T' or space
                        timeFormat = (match[2] || ' ') + isoTimes[i][0];
                        break;
                    }
                }
                if (timeFormat == null) {
                    config._isValid = false;
                    return;
                }
            }
            if (!allowTime && timeFormat != null) {
                config._isValid = false;
                return;
            }
            if (match[4]) {
                if (tzRegex.exec(match[4])) {
                    tzFormat = 'Z';
                } else {
                    config._isValid = false;
                    return;
                }
            }
            config._f = dateFormat + (timeFormat || '') + (tzFormat || '');
            configFromStringAndFormat(config);
        } else {
            config._isValid = false;
        }
    }

    // RFC 2822 regex: For details see https://tools.ietf.org/html/rfc2822#section-3.3
    var rfc2822 = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/;

    function extractFromRFC2822Strings(yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr) {
        var result = [
            untruncateYear(yearStr),
            defaultLocaleMonthsShort.indexOf(monthStr),
            parseInt(dayStr, 10),
            parseInt(hourStr, 10),
            parseInt(minuteStr, 10)
        ];

        if (secondStr) {
            result.push(parseInt(secondStr, 10));
        }

        return result;
    }

    function untruncateYear(yearStr) {
        var year = parseInt(yearStr, 10);
        if (year <= 49) {
            return 2000 + year;
        } else if (year <= 999) {
            return 1900 + year;
        }
        return year;
    }

    function preprocessRFC2822(s) {
        // Remove comments and folding whitespace and replace multiple-spaces with a single space
        return s.replace(/\([^)]*\)|[\n\t]/g, ' ').replace(/(\s\s+)/g, ' ').replace(/^\s\s*/, '').replace(/\s\s*$/, '');
    }

    function checkWeekday(weekdayStr, parsedInput, config) {
        if (weekdayStr) {
            // TODO: Replace the vanilla JS Date object with an indepentent day-of-week check.
            var weekdayProvided = defaultLocaleWeekdaysShort.indexOf(weekdayStr),
                weekdayActual = new Date(parsedInput[0], parsedInput[1], parsedInput[2]).getDay();
            if (weekdayProvided !== weekdayActual) {
                getParsingFlags(config).weekdayMismatch = true;
                config._isValid = false;
                return false;
            }
        }
        return true;
    }

    var obsOffsets = {
        UT: 0,
        GMT: 0,
        EDT: -4 * 60,
        EST: -5 * 60,
        CDT: -5 * 60,
        CST: -6 * 60,
        MDT: -6 * 60,
        MST: -7 * 60,
        PDT: -7 * 60,
        PST: -8 * 60
    };

    function calculateOffset(obsOffset, militaryOffset, numOffset) {
        if (obsOffset) {
            return obsOffsets[obsOffset];
        } else if (militaryOffset) {
            // the only allowed military tz is Z
            return 0;
        } else {
            var hm = parseInt(numOffset, 10);
            var m = hm % 100, h = (hm - m) / 100;
            return h * 60 + m;
        }
    }

    // date and time from ref 2822 format
    function configFromRFC2822(config) {
        var match = rfc2822.exec(preprocessRFC2822(config._i));
        if (match) {
            var parsedArray = extractFromRFC2822Strings(match[4], match[3], match[2], match[5], match[6], match[7]);
            if (!checkWeekday(match[1], parsedArray, config)) {
                return;
            }

            config._a = parsedArray;
            config._tzm = calculateOffset(match[8], match[9], match[10]);

            config._d = createUTCDate.apply(null, config._a);
            config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);

            getParsingFlags(config).rfc2822 = true;
        } else {
            config._isValid = false;
        }
    }

    // date from iso format or fallback
    function configFromString(config) {
        var matched = aspNetJsonRegex.exec(config._i);

        if (matched !== null) {
            config._d = new Date(+matched[1]);
            return;
        }

        configFromISO(config);
        if (config._isValid === false) {
            delete config._isValid;
        } else {
            return;
        }

        configFromRFC2822(config);
        if (config._isValid === false) {
            delete config._isValid;
        } else {
            return;
        }

        // Final attempt, use Input Fallback
        hooks.createFromInputFallback(config);
    }

    hooks.createFromInputFallback = deprecate(
        'value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), ' +
        'which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are ' +
        'discouraged and will be removed in an upcoming major release. Please refer to ' +
        'http://momentjs.com/guides/#/warnings/js-date/ for more info.',
        function (config) {
            config._d = new Date(config._i + (config._useUTC ? ' UTC' : ''));
        }
    );

    // constant that refers to the ISO standard
    hooks.ISO_8601 = function () {};

    // constant that refers to the RFC 2822 form
    hooks.RFC_2822 = function () {};

    // date from string and format string
    function configFromStringAndFormat(config) {
        // TODO: Move this to another part of the creation flow to prevent circular deps
        if (config._f === hooks.ISO_8601) {
            configFromISO(config);
            return;
        }
        if (config._f === hooks.RFC_2822) {
            configFromRFC2822(config);
            return;
        }
        config._a = [];
        getParsingFlags(config).empty = true;

        // This array is used to make a Date, either with `new Date` or `Date.UTC`
        var string = '' + config._i,
            i, parsedInput, tokens, token, skipped,
            stringLength = string.length,
            totalParsedInputLength = 0;

        tokens = expandFormat(config._f, config._locale).match(formattingTokens) || [];

        for (i = 0; i < tokens.length; i++) {
            token = tokens[i];
            parsedInput = (string.match(getParseRegexForToken(token, config)) || [])[0];
            // console.log('token', token, 'parsedInput', parsedInput,
            //         'regex', getParseRegexForToken(token, config));
            if (parsedInput) {
                skipped = string.substr(0, string.indexOf(parsedInput));
                if (skipped.length > 0) {
                    getParsingFlags(config).unusedInput.push(skipped);
                }
                string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
                totalParsedInputLength += parsedInput.length;
            }
            // don't parse if it's not a known token
            if (formatTokenFunctions[token]) {
                if (parsedInput) {
                    getParsingFlags(config).empty = false;
                }
                else {
                    getParsingFlags(config).unusedTokens.push(token);
                }
                addTimeToArrayFromToken(token, parsedInput, config);
            }
            else if (config._strict && !parsedInput) {
                getParsingFlags(config).unusedTokens.push(token);
            }
        }

        // add remaining unparsed input length to the string
        getParsingFlags(config).charsLeftOver = stringLength - totalParsedInputLength;
        if (string.length > 0) {
            getParsingFlags(config).unusedInput.push(string);
        }

        // clear _12h flag if hour is <= 12
        if (config._a[HOUR] <= 12 &&
            getParsingFlags(config).bigHour === true &&
            config._a[HOUR] > 0) {
            getParsingFlags(config).bigHour = undefined;
        }

        getParsingFlags(config).parsedDateParts = config._a.slice(0);
        getParsingFlags(config).meridiem = config._meridiem;
        // handle meridiem
        config._a[HOUR] = meridiemFixWrap(config._locale, config._a[HOUR], config._meridiem);

        configFromArray(config);
        checkOverflow(config);
    }


    function meridiemFixWrap (locale, hour, meridiem) {
        var isPm;

        if (meridiem == null) {
            // nothing to do
            return hour;
        }
        if (locale.meridiemHour != null) {
            return locale.meridiemHour(hour, meridiem);
        } else if (locale.isPM != null) {
            // Fallback
            isPm = locale.isPM(meridiem);
            if (isPm && hour < 12) {
                hour += 12;
            }
            if (!isPm && hour === 12) {
                hour = 0;
            }
            return hour;
        } else {
            // this is not supposed to happen
            return hour;
        }
    }

    // date from string and array of format strings
    function configFromStringAndArray(config) {
        var tempConfig,
            bestMoment,

            scoreToBeat,
            i,
            currentScore;

        if (config._f.length === 0) {
            getParsingFlags(config).invalidFormat = true;
            config._d = new Date(NaN);
            return;
        }

        for (i = 0; i < config._f.length; i++) {
            currentScore = 0;
            tempConfig = copyConfig({}, config);
            if (config._useUTC != null) {
                tempConfig._useUTC = config._useUTC;
            }
            tempConfig._f = config._f[i];
            configFromStringAndFormat(tempConfig);

            if (!isValid(tempConfig)) {
                continue;
            }

            // if there is any input that was not parsed add a penalty for that format
            currentScore += getParsingFlags(tempConfig).charsLeftOver;

            //or tokens
            currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;

            getParsingFlags(tempConfig).score = currentScore;

            if (scoreToBeat == null || currentScore < scoreToBeat) {
                scoreToBeat = currentScore;
                bestMoment = tempConfig;
            }
        }

        extend(config, bestMoment || tempConfig);
    }

    function configFromObject(config) {
        if (config._d) {
            return;
        }

        var i = normalizeObjectUnits(config._i);
        config._a = map([i.year, i.month, i.day || i.date, i.hour, i.minute, i.second, i.millisecond], function (obj) {
            return obj && parseInt(obj, 10);
        });

        configFromArray(config);
    }

    function createFromConfig (config) {
        var res = new Moment(checkOverflow(prepareConfig(config)));
        if (res._nextDay) {
            // Adding is smart enough around DST
            res.add(1, 'd');
            res._nextDay = undefined;
        }

        return res;
    }

    function prepareConfig (config) {
        var input = config._i,
            format = config._f;

        config._locale = config._locale || getLocale(config._l);

        if (input === null || (format === undefined && input === '')) {
            return createInvalid({nullInput: true});
        }

        if (typeof input === 'string') {
            config._i = input = config._locale.preparse(input);
        }

        if (isMoment(input)) {
            return new Moment(checkOverflow(input));
        } else if (isDate(input)) {
            config._d = input;
        } else if (isArray(format)) {
            configFromStringAndArray(config);
        } else if (format) {
            configFromStringAndFormat(config);
        }  else {
            configFromInput(config);
        }

        if (!isValid(config)) {
            config._d = null;
        }

        return config;
    }

    function configFromInput(config) {
        var input = config._i;
        if (isUndefined(input)) {
            config._d = new Date(hooks.now());
        } else if (isDate(input)) {
            config._d = new Date(input.valueOf());
        } else if (typeof input === 'string') {
            configFromString(config);
        } else if (isArray(input)) {
            config._a = map(input.slice(0), function (obj) {
                return parseInt(obj, 10);
            });
            configFromArray(config);
        } else if (isObject(input)) {
            configFromObject(config);
        } else if (isNumber(input)) {
            // from milliseconds
            config._d = new Date(input);
        } else {
            hooks.createFromInputFallback(config);
        }
    }

    function createLocalOrUTC (input, format, locale, strict, isUTC) {
        var c = {};

        if (locale === true || locale === false) {
            strict = locale;
            locale = undefined;
        }

        if ((isObject(input) && isObjectEmpty(input)) ||
                (isArray(input) && input.length === 0)) {
            input = undefined;
        }
        // object construction must be done this way.
        // https://github.com/moment/moment/issues/1423
        c._isAMomentObject = true;
        c._useUTC = c._isUTC = isUTC;
        c._l = locale;
        c._i = input;
        c._f = format;
        c._strict = strict;

        return createFromConfig(c);
    }

    function createLocal (input, format, locale, strict) {
        return createLocalOrUTC(input, format, locale, strict, false);
    }

    var prototypeMin = deprecate(
        'moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/',
        function () {
            var other = createLocal.apply(null, arguments);
            if (this.isValid() && other.isValid()) {
                return other < this ? this : other;
            } else {
                return createInvalid();
            }
        }
    );

    var prototypeMax = deprecate(
        'moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/',
        function () {
            var other = createLocal.apply(null, arguments);
            if (this.isValid() && other.isValid()) {
                return other > this ? this : other;
            } else {
                return createInvalid();
            }
        }
    );

    // Pick a moment m from moments so that m[fn](other) is true for all
    // other. This relies on the function fn to be transitive.
    //
    // moments should either be an array of moment objects or an array, whose
    // first element is an array of moment objects.
    function pickBy(fn, moments) {
        var res, i;
        if (moments.length === 1 && isArray(moments[0])) {
            moments = moments[0];
        }
        if (!moments.length) {
            return createLocal();
        }
        res = moments[0];
        for (i = 1; i < moments.length; ++i) {
            if (!moments[i].isValid() || moments[i][fn](res)) {
                res = moments[i];
            }
        }
        return res;
    }

    // TODO: Use [].sort instead?
    function min () {
        var args = [].slice.call(arguments, 0);

        return pickBy('isBefore', args);
    }

    function max () {
        var args = [].slice.call(arguments, 0);

        return pickBy('isAfter', args);
    }

    var now = function () {
        return Date.now ? Date.now() : +(new Date());
    };

    var ordering = ['year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second', 'millisecond'];

    function isDurationValid(m) {
        for (var key in m) {
            if (!(indexOf.call(ordering, key) !== -1 && (m[key] == null || !isNaN(m[key])))) {
                return false;
            }
        }

        var unitHasDecimal = false;
        for (var i = 0; i < ordering.length; ++i) {
            if (m[ordering[i]]) {
                if (unitHasDecimal) {
                    return false; // only allow non-integers for smallest unit
                }
                if (parseFloat(m[ordering[i]]) !== toInt(m[ordering[i]])) {
                    unitHasDecimal = true;
                }
            }
        }

        return true;
    }

    function isValid$1() {
        return this._isValid;
    }

    function createInvalid$1() {
        return createDuration(NaN);
    }

    function Duration (duration) {
        var normalizedInput = normalizeObjectUnits(duration),
            years = normalizedInput.year || 0,
            quarters = normalizedInput.quarter || 0,
            months = normalizedInput.month || 0,
            weeks = normalizedInput.week || normalizedInput.isoWeek || 0,
            days = normalizedInput.day || 0,
            hours = normalizedInput.hour || 0,
            minutes = normalizedInput.minute || 0,
            seconds = normalizedInput.second || 0,
            milliseconds = normalizedInput.millisecond || 0;

        this._isValid = isDurationValid(normalizedInput);

        // representation for dateAddRemove
        this._milliseconds = +milliseconds +
            seconds * 1e3 + // 1000
            minutes * 6e4 + // 1000 * 60
            hours * 1000 * 60 * 60; //using 1000 * 60 * 60 instead of 36e5 to avoid floating point rounding errors https://github.com/moment/moment/issues/2978
        // Because of dateAddRemove treats 24 hours as different from a
        // day when working around DST, we need to store them separately
        this._days = +days +
            weeks * 7;
        // It is impossible to translate months into days without knowing
        // which months you are are talking about, so we have to store
        // it separately.
        this._months = +months +
            quarters * 3 +
            years * 12;

        this._data = {};

        this._locale = getLocale();

        this._bubble();
    }

    function isDuration (obj) {
        return obj instanceof Duration;
    }

    function absRound (number) {
        if (number < 0) {
            return Math.round(-1 * number) * -1;
        } else {
            return Math.round(number);
        }
    }

    // FORMATTING

    function offset (token, separator) {
        addFormatToken(token, 0, 0, function () {
            var offset = this.utcOffset();
            var sign = '+';
            if (offset < 0) {
                offset = -offset;
                sign = '-';
            }
            return sign + zeroFill(~~(offset / 60), 2) + separator + zeroFill(~~(offset) % 60, 2);
        });
    }

    offset('Z', ':');
    offset('ZZ', '');

    // PARSING

    addRegexToken('Z',  matchShortOffset);
    addRegexToken('ZZ', matchShortOffset);
    addParseToken(['Z', 'ZZ'], function (input, array, config) {
        config._useUTC = true;
        config._tzm = offsetFromString(matchShortOffset, input);
    });

    // HELPERS

    // timezone chunker
    // '+10:00' > ['10',  '00']
    // '-1530'  > ['-15', '30']
    var chunkOffset = /([\+\-]|\d\d)/gi;

    function offsetFromString(matcher, string) {
        var matches = (string || '').match(matcher);

        if (matches === null) {
            return null;
        }

        var chunk   = matches[matches.length - 1] || [];
        var parts   = (chunk + '').match(chunkOffset) || ['-', 0, 0];
        var minutes = +(parts[1] * 60) + toInt(parts[2]);

        return minutes === 0 ?
          0 :
          parts[0] === '+' ? minutes : -minutes;
    }

    // Return a moment from input, that is local/utc/zone equivalent to model.
    function cloneWithOffset(input, model) {
        var res, diff;
        if (model._isUTC) {
            res = model.clone();
            diff = (isMoment(input) || isDate(input) ? input.valueOf() : createLocal(input).valueOf()) - res.valueOf();
            // Use low-level api, because this fn is low-level api.
            res._d.setTime(res._d.valueOf() + diff);
            hooks.updateOffset(res, false);
            return res;
        } else {
            return createLocal(input).local();
        }
    }

    function getDateOffset (m) {
        // On Firefox.24 Date#getTimezoneOffset returns a floating point.
        // https://github.com/moment/moment/pull/1871
        return -Math.round(m._d.getTimezoneOffset() / 15) * 15;
    }

    // HOOKS

    // This function will be called whenever a moment is mutated.
    // It is intended to keep the offset in sync with the timezone.
    hooks.updateOffset = function () {};

    // MOMENTS

    // keepLocalTime = true means only change the timezone, without
    // affecting the local hour. So 5:31:26 +0300 --[utcOffset(2, true)]-->
    // 5:31:26 +0200 It is possible that 5:31:26 doesn't exist with offset
    // +0200, so we adjust the time as needed, to be valid.
    //
    // Keeping the time actually adds/subtracts (one hour)
    // from the actual represented time. That is why we call updateOffset
    // a second time. In case it wants us to change the offset again
    // _changeInProgress == true case, then we have to adjust, because
    // there is no such time in the given timezone.
    function getSetOffset (input, keepLocalTime, keepMinutes) {
        var offset = this._offset || 0,
            localAdjust;
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        if (input != null) {
            if (typeof input === 'string') {
                input = offsetFromString(matchShortOffset, input);
                if (input === null) {
                    return this;
                }
            } else if (Math.abs(input) < 16 && !keepMinutes) {
                input = input * 60;
            }
            if (!this._isUTC && keepLocalTime) {
                localAdjust = getDateOffset(this);
            }
            this._offset = input;
            this._isUTC = true;
            if (localAdjust != null) {
                this.add(localAdjust, 'm');
            }
            if (offset !== input) {
                if (!keepLocalTime || this._changeInProgress) {
                    addSubtract(this, createDuration(input - offset, 'm'), 1, false);
                } else if (!this._changeInProgress) {
                    this._changeInProgress = true;
                    hooks.updateOffset(this, true);
                    this._changeInProgress = null;
                }
            }
            return this;
        } else {
            return this._isUTC ? offset : getDateOffset(this);
        }
    }

    function getSetZone (input, keepLocalTime) {
        if (input != null) {
            if (typeof input !== 'string') {
                input = -input;
            }

            this.utcOffset(input, keepLocalTime);

            return this;
        } else {
            return -this.utcOffset();
        }
    }

    function setOffsetToUTC (keepLocalTime) {
        return this.utcOffset(0, keepLocalTime);
    }

    function setOffsetToLocal (keepLocalTime) {
        if (this._isUTC) {
            this.utcOffset(0, keepLocalTime);
            this._isUTC = false;

            if (keepLocalTime) {
                this.subtract(getDateOffset(this), 'm');
            }
        }
        return this;
    }

    function setOffsetToParsedOffset () {
        if (this._tzm != null) {
            this.utcOffset(this._tzm, false, true);
        } else if (typeof this._i === 'string') {
            var tZone = offsetFromString(matchOffset, this._i);
            if (tZone != null) {
                this.utcOffset(tZone);
            }
            else {
                this.utcOffset(0, true);
            }
        }
        return this;
    }

    function hasAlignedHourOffset (input) {
        if (!this.isValid()) {
            return false;
        }
        input = input ? createLocal(input).utcOffset() : 0;

        return (this.utcOffset() - input) % 60 === 0;
    }

    function isDaylightSavingTime () {
        return (
            this.utcOffset() > this.clone().month(0).utcOffset() ||
            this.utcOffset() > this.clone().month(5).utcOffset()
        );
    }

    function isDaylightSavingTimeShifted () {
        if (!isUndefined(this._isDSTShifted)) {
            return this._isDSTShifted;
        }

        var c = {};

        copyConfig(c, this);
        c = prepareConfig(c);

        if (c._a) {
            var other = c._isUTC ? createUTC(c._a) : createLocal(c._a);
            this._isDSTShifted = this.isValid() &&
                compareArrays(c._a, other.toArray()) > 0;
        } else {
            this._isDSTShifted = false;
        }

        return this._isDSTShifted;
    }

    function isLocal () {
        return this.isValid() ? !this._isUTC : false;
    }

    function isUtcOffset () {
        return this.isValid() ? this._isUTC : false;
    }

    function isUtc () {
        return this.isValid() ? this._isUTC && this._offset === 0 : false;
    }

    // ASP.NET json date format regex
    var aspNetRegex = /^(\-|\+)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/;

    // from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
    // somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere
    // and further modified to allow for strings containing both week and day
    var isoRegex = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;

    function createDuration (input, key) {
        var duration = input,
            // matching against regexp is expensive, do it on demand
            match = null,
            sign,
            ret,
            diffRes;

        if (isDuration(input)) {
            duration = {
                ms : input._milliseconds,
                d  : input._days,
                M  : input._months
            };
        } else if (isNumber(input)) {
            duration = {};
            if (key) {
                duration[key] = input;
            } else {
                duration.milliseconds = input;
            }
        } else if (!!(match = aspNetRegex.exec(input))) {
            sign = (match[1] === '-') ? -1 : 1;
            duration = {
                y  : 0,
                d  : toInt(match[DATE])                         * sign,
                h  : toInt(match[HOUR])                         * sign,
                m  : toInt(match[MINUTE])                       * sign,
                s  : toInt(match[SECOND])                       * sign,
                ms : toInt(absRound(match[MILLISECOND] * 1000)) * sign // the millisecond decimal point is included in the match
            };
        } else if (!!(match = isoRegex.exec(input))) {
            sign = (match[1] === '-') ? -1 : 1;
            duration = {
                y : parseIso(match[2], sign),
                M : parseIso(match[3], sign),
                w : parseIso(match[4], sign),
                d : parseIso(match[5], sign),
                h : parseIso(match[6], sign),
                m : parseIso(match[7], sign),
                s : parseIso(match[8], sign)
            };
        } else if (duration == null) {// checks for null or undefined
            duration = {};
        } else if (typeof duration === 'object' && ('from' in duration || 'to' in duration)) {
            diffRes = momentsDifference(createLocal(duration.from), createLocal(duration.to));

            duration = {};
            duration.ms = diffRes.milliseconds;
            duration.M = diffRes.months;
        }

        ret = new Duration(duration);

        if (isDuration(input) && hasOwnProp(input, '_locale')) {
            ret._locale = input._locale;
        }

        return ret;
    }

    createDuration.fn = Duration.prototype;
    createDuration.invalid = createInvalid$1;

    function parseIso (inp, sign) {
        // We'd normally use ~~inp for this, but unfortunately it also
        // converts floats to ints.
        // inp may be undefined, so careful calling replace on it.
        var res = inp && parseFloat(inp.replace(',', '.'));
        // apply sign while we're at it
        return (isNaN(res) ? 0 : res) * sign;
    }

    function positiveMomentsDifference(base, other) {
        var res = {};

        res.months = other.month() - base.month() +
            (other.year() - base.year()) * 12;
        if (base.clone().add(res.months, 'M').isAfter(other)) {
            --res.months;
        }

        res.milliseconds = +other - +(base.clone().add(res.months, 'M'));

        return res;
    }

    function momentsDifference(base, other) {
        var res;
        if (!(base.isValid() && other.isValid())) {
            return {milliseconds: 0, months: 0};
        }

        other = cloneWithOffset(other, base);
        if (base.isBefore(other)) {
            res = positiveMomentsDifference(base, other);
        } else {
            res = positiveMomentsDifference(other, base);
            res.milliseconds = -res.milliseconds;
            res.months = -res.months;
        }

        return res;
    }

    // TODO: remove 'name' arg after deprecation is removed
    function createAdder(direction, name) {
        return function (val, period) {
            var dur, tmp;
            //invert the arguments, but complain about it
            if (period !== null && !isNaN(+period)) {
                deprecateSimple(name, 'moment().' + name  + '(period, number) is deprecated. Please use moment().' + name + '(number, period). ' +
                'See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info.');
                tmp = val; val = period; period = tmp;
            }

            val = typeof val === 'string' ? +val : val;
            dur = createDuration(val, period);
            addSubtract(this, dur, direction);
            return this;
        };
    }

    function addSubtract (mom, duration, isAdding, updateOffset) {
        var milliseconds = duration._milliseconds,
            days = absRound(duration._days),
            months = absRound(duration._months);

        if (!mom.isValid()) {
            // No op
            return;
        }

        updateOffset = updateOffset == null ? true : updateOffset;

        if (months) {
            setMonth(mom, get(mom, 'Month') + months * isAdding);
        }
        if (days) {
            set$1(mom, 'Date', get(mom, 'Date') + days * isAdding);
        }
        if (milliseconds) {
            mom._d.setTime(mom._d.valueOf() + milliseconds * isAdding);
        }
        if (updateOffset) {
            hooks.updateOffset(mom, days || months);
        }
    }

    var add      = createAdder(1, 'add');
    var subtract = createAdder(-1, 'subtract');

    function getCalendarFormat(myMoment, now) {
        var diff = myMoment.diff(now, 'days', true);
        return diff < -6 ? 'sameElse' :
                diff < -1 ? 'lastWeek' :
                diff < 0 ? 'lastDay' :
                diff < 1 ? 'sameDay' :
                diff < 2 ? 'nextDay' :
                diff < 7 ? 'nextWeek' : 'sameElse';
    }

    function calendar$1 (time, formats) {
        // We want to compare the start of today, vs this.
        // Getting start-of-today depends on whether we're local/utc/offset or not.
        var now = time || createLocal(),
            sod = cloneWithOffset(now, this).startOf('day'),
            format = hooks.calendarFormat(this, sod) || 'sameElse';

        var output = formats && (isFunction(formats[format]) ? formats[format].call(this, now) : formats[format]);

        return this.format(output || this.localeData().calendar(format, this, createLocal(now)));
    }

    function clone () {
        return new Moment(this);
    }

    function isAfter (input, units) {
        var localInput = isMoment(input) ? input : createLocal(input);
        if (!(this.isValid() && localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(units) || 'millisecond';
        if (units === 'millisecond') {
            return this.valueOf() > localInput.valueOf();
        } else {
            return localInput.valueOf() < this.clone().startOf(units).valueOf();
        }
    }

    function isBefore (input, units) {
        var localInput = isMoment(input) ? input : createLocal(input);
        if (!(this.isValid() && localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(units) || 'millisecond';
        if (units === 'millisecond') {
            return this.valueOf() < localInput.valueOf();
        } else {
            return this.clone().endOf(units).valueOf() < localInput.valueOf();
        }
    }

    function isBetween (from, to, units, inclusivity) {
        var localFrom = isMoment(from) ? from : createLocal(from),
            localTo = isMoment(to) ? to : createLocal(to);
        if (!(this.isValid() && localFrom.isValid() && localTo.isValid())) {
            return false;
        }
        inclusivity = inclusivity || '()';
        return (inclusivity[0] === '(' ? this.isAfter(localFrom, units) : !this.isBefore(localFrom, units)) &&
            (inclusivity[1] === ')' ? this.isBefore(localTo, units) : !this.isAfter(localTo, units));
    }

    function isSame (input, units) {
        var localInput = isMoment(input) ? input : createLocal(input),
            inputMs;
        if (!(this.isValid() && localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(units) || 'millisecond';
        if (units === 'millisecond') {
            return this.valueOf() === localInput.valueOf();
        } else {
            inputMs = localInput.valueOf();
            return this.clone().startOf(units).valueOf() <= inputMs && inputMs <= this.clone().endOf(units).valueOf();
        }
    }

    function isSameOrAfter (input, units) {
        return this.isSame(input, units) || this.isAfter(input, units);
    }

    function isSameOrBefore (input, units) {
        return this.isSame(input, units) || this.isBefore(input, units);
    }

    function diff (input, units, asFloat) {
        var that,
            zoneDelta,
            output;

        if (!this.isValid()) {
            return NaN;
        }

        that = cloneWithOffset(input, this);

        if (!that.isValid()) {
            return NaN;
        }

        zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4;

        units = normalizeUnits(units);

        switch (units) {
            case 'year': output = monthDiff(this, that) / 12; break;
            case 'month': output = monthDiff(this, that); break;
            case 'quarter': output = monthDiff(this, that) / 3; break;
            case 'second': output = (this - that) / 1e3; break; // 1000
            case 'minute': output = (this - that) / 6e4; break; // 1000 * 60
            case 'hour': output = (this - that) / 36e5; break; // 1000 * 60 * 60
            case 'day': output = (this - that - zoneDelta) / 864e5; break; // 1000 * 60 * 60 * 24, negate dst
            case 'week': output = (this - that - zoneDelta) / 6048e5; break; // 1000 * 60 * 60 * 24 * 7, negate dst
            default: output = this - that;
        }

        return asFloat ? output : absFloor(output);
    }

    function monthDiff (a, b) {
        // difference in months
        var wholeMonthDiff = ((b.year() - a.year()) * 12) + (b.month() - a.month()),
            // b is in (anchor - 1 month, anchor + 1 month)
            anchor = a.clone().add(wholeMonthDiff, 'months'),
            anchor2, adjust;

        if (b - anchor < 0) {
            anchor2 = a.clone().add(wholeMonthDiff - 1, 'months');
            // linear across the month
            adjust = (b - anchor) / (anchor - anchor2);
        } else {
            anchor2 = a.clone().add(wholeMonthDiff + 1, 'months');
            // linear across the month
            adjust = (b - anchor) / (anchor2 - anchor);
        }

        //check for negative zero, return zero if negative zero
        return -(wholeMonthDiff + adjust) || 0;
    }

    hooks.defaultFormat = 'YYYY-MM-DDTHH:mm:ssZ';
    hooks.defaultFormatUtc = 'YYYY-MM-DDTHH:mm:ss[Z]';

    function toString () {
        return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
    }

    function toISOString(keepOffset) {
        if (!this.isValid()) {
            return null;
        }
        var utc = keepOffset !== true;
        var m = utc ? this.clone().utc() : this;
        if (m.year() < 0 || m.year() > 9999) {
            return formatMoment(m, utc ? 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]' : 'YYYYYY-MM-DD[T]HH:mm:ss.SSSZ');
        }
        if (isFunction(Date.prototype.toISOString)) {
            // native implementation is ~50x faster, use it when we can
            if (utc) {
                return this.toDate().toISOString();
            } else {
                return new Date(this.valueOf() + this.utcOffset() * 60 * 1000).toISOString().replace('Z', formatMoment(m, 'Z'));
            }
        }
        return formatMoment(m, utc ? 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]' : 'YYYY-MM-DD[T]HH:mm:ss.SSSZ');
    }

    /**
     * Return a human readable representation of a moment that can
     * also be evaluated to get a new moment which is the same
     *
     * @link https://nodejs.org/dist/latest/docs/api/util.html#util_custom_inspect_function_on_objects
     */
    function inspect () {
        if (!this.isValid()) {
            return 'moment.invalid(/* ' + this._i + ' */)';
        }
        var func = 'moment';
        var zone = '';
        if (!this.isLocal()) {
            func = this.utcOffset() === 0 ? 'moment.utc' : 'moment.parseZone';
            zone = 'Z';
        }
        var prefix = '[' + func + '("]';
        var year = (0 <= this.year() && this.year() <= 9999) ? 'YYYY' : 'YYYYYY';
        var datetime = '-MM-DD[T]HH:mm:ss.SSS';
        var suffix = zone + '[")]';

        return this.format(prefix + year + datetime + suffix);
    }

    function format (inputString) {
        if (!inputString) {
            inputString = this.isUtc() ? hooks.defaultFormatUtc : hooks.defaultFormat;
        }
        var output = formatMoment(this, inputString);
        return this.localeData().postformat(output);
    }

    function from (time, withoutSuffix) {
        if (this.isValid() &&
                ((isMoment(time) && time.isValid()) ||
                 createLocal(time).isValid())) {
            return createDuration({to: this, from: time}).locale(this.locale()).humanize(!withoutSuffix);
        } else {
            return this.localeData().invalidDate();
        }
    }

    function fromNow (withoutSuffix) {
        return this.from(createLocal(), withoutSuffix);
    }

    function to (time, withoutSuffix) {
        if (this.isValid() &&
                ((isMoment(time) && time.isValid()) ||
                 createLocal(time).isValid())) {
            return createDuration({from: this, to: time}).locale(this.locale()).humanize(!withoutSuffix);
        } else {
            return this.localeData().invalidDate();
        }
    }

    function toNow (withoutSuffix) {
        return this.to(createLocal(), withoutSuffix);
    }

    // If passed a locale key, it will set the locale for this
    // instance.  Otherwise, it will return the locale configuration
    // variables for this instance.
    function locale (key) {
        var newLocaleData;

        if (key === undefined) {
            return this._locale._abbr;
        } else {
            newLocaleData = getLocale(key);
            if (newLocaleData != null) {
                this._locale = newLocaleData;
            }
            return this;
        }
    }

    var lang = deprecate(
        'moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.',
        function (key) {
            if (key === undefined) {
                return this.localeData();
            } else {
                return this.locale(key);
            }
        }
    );

    function localeData () {
        return this._locale;
    }

    var MS_PER_SECOND = 1000;
    var MS_PER_MINUTE = 60 * MS_PER_SECOND;
    var MS_PER_HOUR = 60 * MS_PER_MINUTE;
    var MS_PER_400_YEARS = (365 * 400 + 97) * 24 * MS_PER_HOUR;

    // actual modulo - handles negative numbers (for dates before 1970):
    function mod$1(dividend, divisor) {
        return (dividend % divisor + divisor) % divisor;
    }

    function localStartOfDate(y, m, d) {
        // the date constructor remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0) {
            // preserve leap years using a full 400 year cycle, then reset
            return new Date(y + 400, m, d) - MS_PER_400_YEARS;
        } else {
            return new Date(y, m, d).valueOf();
        }
    }

    function utcStartOfDate(y, m, d) {
        // Date.UTC remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0) {
            // preserve leap years using a full 400 year cycle, then reset
            return Date.UTC(y + 400, m, d) - MS_PER_400_YEARS;
        } else {
            return Date.UTC(y, m, d);
        }
    }

    function startOf (units) {
        var time;
        units = normalizeUnits(units);
        if (units === undefined || units === 'millisecond' || !this.isValid()) {
            return this;
        }

        var startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;

        switch (units) {
            case 'year':
                time = startOfDate(this.year(), 0, 1);
                break;
            case 'quarter':
                time = startOfDate(this.year(), this.month() - this.month() % 3, 1);
                break;
            case 'month':
                time = startOfDate(this.year(), this.month(), 1);
                break;
            case 'week':
                time = startOfDate(this.year(), this.month(), this.date() - this.weekday());
                break;
            case 'isoWeek':
                time = startOfDate(this.year(), this.month(), this.date() - (this.isoWeekday() - 1));
                break;
            case 'day':
            case 'date':
                time = startOfDate(this.year(), this.month(), this.date());
                break;
            case 'hour':
                time = this._d.valueOf();
                time -= mod$1(time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE), MS_PER_HOUR);
                break;
            case 'minute':
                time = this._d.valueOf();
                time -= mod$1(time, MS_PER_MINUTE);
                break;
            case 'second':
                time = this._d.valueOf();
                time -= mod$1(time, MS_PER_SECOND);
                break;
        }

        this._d.setTime(time);
        hooks.updateOffset(this, true);
        return this;
    }

    function endOf (units) {
        var time;
        units = normalizeUnits(units);
        if (units === undefined || units === 'millisecond' || !this.isValid()) {
            return this;
        }

        var startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;

        switch (units) {
            case 'year':
                time = startOfDate(this.year() + 1, 0, 1) - 1;
                break;
            case 'quarter':
                time = startOfDate(this.year(), this.month() - this.month() % 3 + 3, 1) - 1;
                break;
            case 'month':
                time = startOfDate(this.year(), this.month() + 1, 1) - 1;
                break;
            case 'week':
                time = startOfDate(this.year(), this.month(), this.date() - this.weekday() + 7) - 1;
                break;
            case 'isoWeek':
                time = startOfDate(this.year(), this.month(), this.date() - (this.isoWeekday() - 1) + 7) - 1;
                break;
            case 'day':
            case 'date':
                time = startOfDate(this.year(), this.month(), this.date() + 1) - 1;
                break;
            case 'hour':
                time = this._d.valueOf();
                time += MS_PER_HOUR - mod$1(time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE), MS_PER_HOUR) - 1;
                break;
            case 'minute':
                time = this._d.valueOf();
                time += MS_PER_MINUTE - mod$1(time, MS_PER_MINUTE) - 1;
                break;
            case 'second':
                time = this._d.valueOf();
                time += MS_PER_SECOND - mod$1(time, MS_PER_SECOND) - 1;
                break;
        }

        this._d.setTime(time);
        hooks.updateOffset(this, true);
        return this;
    }

    function valueOf () {
        return this._d.valueOf() - ((this._offset || 0) * 60000);
    }

    function unix () {
        return Math.floor(this.valueOf() / 1000);
    }

    function toDate () {
        return new Date(this.valueOf());
    }

    function toArray () {
        var m = this;
        return [m.year(), m.month(), m.date(), m.hour(), m.minute(), m.second(), m.millisecond()];
    }

    function toObject () {
        var m = this;
        return {
            years: m.year(),
            months: m.month(),
            date: m.date(),
            hours: m.hours(),
            minutes: m.minutes(),
            seconds: m.seconds(),
            milliseconds: m.milliseconds()
        };
    }

    function toJSON () {
        // new Date(NaN).toJSON() === null
        return this.isValid() ? this.toISOString() : null;
    }

    function isValid$2 () {
        return isValid(this);
    }

    function parsingFlags () {
        return extend({}, getParsingFlags(this));
    }

    function invalidAt () {
        return getParsingFlags(this).overflow;
    }

    function creationData() {
        return {
            input: this._i,
            format: this._f,
            locale: this._locale,
            isUTC: this._isUTC,
            strict: this._strict
        };
    }

    // FORMATTING

    addFormatToken(0, ['gg', 2], 0, function () {
        return this.weekYear() % 100;
    });

    addFormatToken(0, ['GG', 2], 0, function () {
        return this.isoWeekYear() % 100;
    });

    function addWeekYearFormatToken (token, getter) {
        addFormatToken(0, [token, token.length], 0, getter);
    }

    addWeekYearFormatToken('gggg',     'weekYear');
    addWeekYearFormatToken('ggggg',    'weekYear');
    addWeekYearFormatToken('GGGG',  'isoWeekYear');
    addWeekYearFormatToken('GGGGG', 'isoWeekYear');

    // ALIASES

    addUnitAlias('weekYear', 'gg');
    addUnitAlias('isoWeekYear', 'GG');

    // PRIORITY

    addUnitPriority('weekYear', 1);
    addUnitPriority('isoWeekYear', 1);


    // PARSING

    addRegexToken('G',      matchSigned);
    addRegexToken('g',      matchSigned);
    addRegexToken('GG',     match1to2, match2);
    addRegexToken('gg',     match1to2, match2);
    addRegexToken('GGGG',   match1to4, match4);
    addRegexToken('gggg',   match1to4, match4);
    addRegexToken('GGGGG',  match1to6, match6);
    addRegexToken('ggggg',  match1to6, match6);

    addWeekParseToken(['gggg', 'ggggg', 'GGGG', 'GGGGG'], function (input, week, config, token) {
        week[token.substr(0, 2)] = toInt(input);
    });

    addWeekParseToken(['gg', 'GG'], function (input, week, config, token) {
        week[token] = hooks.parseTwoDigitYear(input);
    });

    // MOMENTS

    function getSetWeekYear (input) {
        return getSetWeekYearHelper.call(this,
                input,
                this.week(),
                this.weekday(),
                this.localeData()._week.dow,
                this.localeData()._week.doy);
    }

    function getSetISOWeekYear (input) {
        return getSetWeekYearHelper.call(this,
                input, this.isoWeek(), this.isoWeekday(), 1, 4);
    }

    function getISOWeeksInYear () {
        return weeksInYear(this.year(), 1, 4);
    }

    function getWeeksInYear () {
        var weekInfo = this.localeData()._week;
        return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
    }

    function getSetWeekYearHelper(input, week, weekday, dow, doy) {
        var weeksTarget;
        if (input == null) {
            return weekOfYear(this, dow, doy).year;
        } else {
            weeksTarget = weeksInYear(input, dow, doy);
            if (week > weeksTarget) {
                week = weeksTarget;
            }
            return setWeekAll.call(this, input, week, weekday, dow, doy);
        }
    }

    function setWeekAll(weekYear, week, weekday, dow, doy) {
        var dayOfYearData = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy),
            date = createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);

        this.year(date.getUTCFullYear());
        this.month(date.getUTCMonth());
        this.date(date.getUTCDate());
        return this;
    }

    // FORMATTING

    addFormatToken('Q', 0, 'Qo', 'quarter');

    // ALIASES

    addUnitAlias('quarter', 'Q');

    // PRIORITY

    addUnitPriority('quarter', 7);

    // PARSING

    addRegexToken('Q', match1);
    addParseToken('Q', function (input, array) {
        array[MONTH] = (toInt(input) - 1) * 3;
    });

    // MOMENTS

    function getSetQuarter (input) {
        return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
    }

    // FORMATTING

    addFormatToken('D', ['DD', 2], 'Do', 'date');

    // ALIASES

    addUnitAlias('date', 'D');

    // PRIORITY
    addUnitPriority('date', 9);

    // PARSING

    addRegexToken('D',  match1to2);
    addRegexToken('DD', match1to2, match2);
    addRegexToken('Do', function (isStrict, locale) {
        // TODO: Remove "ordinalParse" fallback in next major release.
        return isStrict ?
          (locale._dayOfMonthOrdinalParse || locale._ordinalParse) :
          locale._dayOfMonthOrdinalParseLenient;
    });

    addParseToken(['D', 'DD'], DATE);
    addParseToken('Do', function (input, array) {
        array[DATE] = toInt(input.match(match1to2)[0]);
    });

    // MOMENTS

    var getSetDayOfMonth = makeGetSet('Date', true);

    // FORMATTING

    addFormatToken('DDD', ['DDDD', 3], 'DDDo', 'dayOfYear');

    // ALIASES

    addUnitAlias('dayOfYear', 'DDD');

    // PRIORITY
    addUnitPriority('dayOfYear', 4);

    // PARSING

    addRegexToken('DDD',  match1to3);
    addRegexToken('DDDD', match3);
    addParseToken(['DDD', 'DDDD'], function (input, array, config) {
        config._dayOfYear = toInt(input);
    });

    // HELPERS

    // MOMENTS

    function getSetDayOfYear (input) {
        var dayOfYear = Math.round((this.clone().startOf('day') - this.clone().startOf('year')) / 864e5) + 1;
        return input == null ? dayOfYear : this.add((input - dayOfYear), 'd');
    }

    // FORMATTING

    addFormatToken('m', ['mm', 2], 0, 'minute');

    // ALIASES

    addUnitAlias('minute', 'm');

    // PRIORITY

    addUnitPriority('minute', 14);

    // PARSING

    addRegexToken('m',  match1to2);
    addRegexToken('mm', match1to2, match2);
    addParseToken(['m', 'mm'], MINUTE);

    // MOMENTS

    var getSetMinute = makeGetSet('Minutes', false);

    // FORMATTING

    addFormatToken('s', ['ss', 2], 0, 'second');

    // ALIASES

    addUnitAlias('second', 's');

    // PRIORITY

    addUnitPriority('second', 15);

    // PARSING

    addRegexToken('s',  match1to2);
    addRegexToken('ss', match1to2, match2);
    addParseToken(['s', 'ss'], SECOND);

    // MOMENTS

    var getSetSecond = makeGetSet('Seconds', false);

    // FORMATTING

    addFormatToken('S', 0, 0, function () {
        return ~~(this.millisecond() / 100);
    });

    addFormatToken(0, ['SS', 2], 0, function () {
        return ~~(this.millisecond() / 10);
    });

    addFormatToken(0, ['SSS', 3], 0, 'millisecond');
    addFormatToken(0, ['SSSS', 4], 0, function () {
        return this.millisecond() * 10;
    });
    addFormatToken(0, ['SSSSS', 5], 0, function () {
        return this.millisecond() * 100;
    });
    addFormatToken(0, ['SSSSSS', 6], 0, function () {
        return this.millisecond() * 1000;
    });
    addFormatToken(0, ['SSSSSSS', 7], 0, function () {
        return this.millisecond() * 10000;
    });
    addFormatToken(0, ['SSSSSSSS', 8], 0, function () {
        return this.millisecond() * 100000;
    });
    addFormatToken(0, ['SSSSSSSSS', 9], 0, function () {
        return this.millisecond() * 1000000;
    });


    // ALIASES

    addUnitAlias('millisecond', 'ms');

    // PRIORITY

    addUnitPriority('millisecond', 16);

    // PARSING

    addRegexToken('S',    match1to3, match1);
    addRegexToken('SS',   match1to3, match2);
    addRegexToken('SSS',  match1to3, match3);

    var token;
    for (token = 'SSSS'; token.length <= 9; token += 'S') {
        addRegexToken(token, matchUnsigned);
    }

    function parseMs(input, array) {
        array[MILLISECOND] = toInt(('0.' + input) * 1000);
    }

    for (token = 'S'; token.length <= 9; token += 'S') {
        addParseToken(token, parseMs);
    }
    // MOMENTS

    var getSetMillisecond = makeGetSet('Milliseconds', false);

    // FORMATTING

    addFormatToken('z',  0, 0, 'zoneAbbr');
    addFormatToken('zz', 0, 0, 'zoneName');

    // MOMENTS

    function getZoneAbbr () {
        return this._isUTC ? 'UTC' : '';
    }

    function getZoneName () {
        return this._isUTC ? 'Coordinated Universal Time' : '';
    }

    var proto = Moment.prototype;

    proto.add               = add;
    proto.calendar          = calendar$1;
    proto.clone             = clone;
    proto.diff              = diff;
    proto.endOf             = endOf;
    proto.format            = format;
    proto.from              = from;
    proto.fromNow           = fromNow;
    proto.to                = to;
    proto.toNow             = toNow;
    proto.get               = stringGet;
    proto.invalidAt         = invalidAt;
    proto.isAfter           = isAfter;
    proto.isBefore          = isBefore;
    proto.isBetween         = isBetween;
    proto.isSame            = isSame;
    proto.isSameOrAfter     = isSameOrAfter;
    proto.isSameOrBefore    = isSameOrBefore;
    proto.isValid           = isValid$2;
    proto.lang              = lang;
    proto.locale            = locale;
    proto.localeData        = localeData;
    proto.max               = prototypeMax;
    proto.min               = prototypeMin;
    proto.parsingFlags      = parsingFlags;
    proto.set               = stringSet;
    proto.startOf           = startOf;
    proto.subtract          = subtract;
    proto.toArray           = toArray;
    proto.toObject          = toObject;
    proto.toDate            = toDate;
    proto.toISOString       = toISOString;
    proto.inspect           = inspect;
    proto.toJSON            = toJSON;
    proto.toString          = toString;
    proto.unix              = unix;
    proto.valueOf           = valueOf;
    proto.creationData      = creationData;
    proto.year       = getSetYear;
    proto.isLeapYear = getIsLeapYear;
    proto.weekYear    = getSetWeekYear;
    proto.isoWeekYear = getSetISOWeekYear;
    proto.quarter = proto.quarters = getSetQuarter;
    proto.month       = getSetMonth;
    proto.daysInMonth = getDaysInMonth;
    proto.week           = proto.weeks        = getSetWeek;
    proto.isoWeek        = proto.isoWeeks     = getSetISOWeek;
    proto.weeksInYear    = getWeeksInYear;
    proto.isoWeeksInYear = getISOWeeksInYear;
    proto.date       = getSetDayOfMonth;
    proto.day        = proto.days             = getSetDayOfWeek;
    proto.weekday    = getSetLocaleDayOfWeek;
    proto.isoWeekday = getSetISODayOfWeek;
    proto.dayOfYear  = getSetDayOfYear;
    proto.hour = proto.hours = getSetHour;
    proto.minute = proto.minutes = getSetMinute;
    proto.second = proto.seconds = getSetSecond;
    proto.millisecond = proto.milliseconds = getSetMillisecond;
    proto.utcOffset            = getSetOffset;
    proto.utc                  = setOffsetToUTC;
    proto.local                = setOffsetToLocal;
    proto.parseZone            = setOffsetToParsedOffset;
    proto.hasAlignedHourOffset = hasAlignedHourOffset;
    proto.isDST                = isDaylightSavingTime;
    proto.isLocal              = isLocal;
    proto.isUtcOffset          = isUtcOffset;
    proto.isUtc                = isUtc;
    proto.isUTC                = isUtc;
    proto.zoneAbbr = getZoneAbbr;
    proto.zoneName = getZoneName;
    proto.dates  = deprecate('dates accessor is deprecated. Use date instead.', getSetDayOfMonth);
    proto.months = deprecate('months accessor is deprecated. Use month instead', getSetMonth);
    proto.years  = deprecate('years accessor is deprecated. Use year instead', getSetYear);
    proto.zone   = deprecate('moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/', getSetZone);
    proto.isDSTShifted = deprecate('isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information', isDaylightSavingTimeShifted);

    function createUnix (input) {
        return createLocal(input * 1000);
    }

    function createInZone () {
        return createLocal.apply(null, arguments).parseZone();
    }

    function preParsePostFormat (string) {
        return string;
    }

    var proto$1 = Locale.prototype;

    proto$1.calendar        = calendar;
    proto$1.longDateFormat  = longDateFormat;
    proto$1.invalidDate     = invalidDate;
    proto$1.ordinal         = ordinal;
    proto$1.preparse        = preParsePostFormat;
    proto$1.postformat      = preParsePostFormat;
    proto$1.relativeTime    = relativeTime;
    proto$1.pastFuture      = pastFuture;
    proto$1.set             = set;

    proto$1.months            =        localeMonths;
    proto$1.monthsShort       =        localeMonthsShort;
    proto$1.monthsParse       =        localeMonthsParse;
    proto$1.monthsRegex       = monthsRegex;
    proto$1.monthsShortRegex  = monthsShortRegex;
    proto$1.week = localeWeek;
    proto$1.firstDayOfYear = localeFirstDayOfYear;
    proto$1.firstDayOfWeek = localeFirstDayOfWeek;

    proto$1.weekdays       =        localeWeekdays;
    proto$1.weekdaysMin    =        localeWeekdaysMin;
    proto$1.weekdaysShort  =        localeWeekdaysShort;
    proto$1.weekdaysParse  =        localeWeekdaysParse;

    proto$1.weekdaysRegex       =        weekdaysRegex;
    proto$1.weekdaysShortRegex  =        weekdaysShortRegex;
    proto$1.weekdaysMinRegex    =        weekdaysMinRegex;

    proto$1.isPM = localeIsPM;
    proto$1.meridiem = localeMeridiem;

    function get$1 (format, index, field, setter) {
        var locale = getLocale();
        var utc = createUTC().set(setter, index);
        return locale[field](utc, format);
    }

    function listMonthsImpl (format, index, field) {
        if (isNumber(format)) {
            index = format;
            format = undefined;
        }

        format = format || '';

        if (index != null) {
            return get$1(format, index, field, 'month');
        }

        var i;
        var out = [];
        for (i = 0; i < 12; i++) {
            out[i] = get$1(format, i, field, 'month');
        }
        return out;
    }

    // ()
    // (5)
    // (fmt, 5)
    // (fmt)
    // (true)
    // (true, 5)
    // (true, fmt, 5)
    // (true, fmt)
    function listWeekdaysImpl (localeSorted, format, index, field) {
        if (typeof localeSorted === 'boolean') {
            if (isNumber(format)) {
                index = format;
                format = undefined;
            }

            format = format || '';
        } else {
            format = localeSorted;
            index = format;
            localeSorted = false;

            if (isNumber(format)) {
                index = format;
                format = undefined;
            }

            format = format || '';
        }

        var locale = getLocale(),
            shift = localeSorted ? locale._week.dow : 0;

        if (index != null) {
            return get$1(format, (index + shift) % 7, field, 'day');
        }

        var i;
        var out = [];
        for (i = 0; i < 7; i++) {
            out[i] = get$1(format, (i + shift) % 7, field, 'day');
        }
        return out;
    }

    function listMonths (format, index) {
        return listMonthsImpl(format, index, 'months');
    }

    function listMonthsShort (format, index) {
        return listMonthsImpl(format, index, 'monthsShort');
    }

    function listWeekdays (localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, 'weekdays');
    }

    function listWeekdaysShort (localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, 'weekdaysShort');
    }

    function listWeekdaysMin (localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, 'weekdaysMin');
    }

    getSetGlobalLocale('en', {
        dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
        ordinal : function (number) {
            var b = number % 10,
                output = (toInt(number % 100 / 10) === 1) ? 'th' :
                (b === 1) ? 'st' :
                (b === 2) ? 'nd' :
                (b === 3) ? 'rd' : 'th';
            return number + output;
        }
    });

    // Side effect imports

    hooks.lang = deprecate('moment.lang is deprecated. Use moment.locale instead.', getSetGlobalLocale);
    hooks.langData = deprecate('moment.langData is deprecated. Use moment.localeData instead.', getLocale);

    var mathAbs = Math.abs;

    function abs () {
        var data           = this._data;

        this._milliseconds = mathAbs(this._milliseconds);
        this._days         = mathAbs(this._days);
        this._months       = mathAbs(this._months);

        data.milliseconds  = mathAbs(data.milliseconds);
        data.seconds       = mathAbs(data.seconds);
        data.minutes       = mathAbs(data.minutes);
        data.hours         = mathAbs(data.hours);
        data.months        = mathAbs(data.months);
        data.years         = mathAbs(data.years);

        return this;
    }

    function addSubtract$1 (duration, input, value, direction) {
        var other = createDuration(input, value);

        duration._milliseconds += direction * other._milliseconds;
        duration._days         += direction * other._days;
        duration._months       += direction * other._months;

        return duration._bubble();
    }

    // supports only 2.0-style add(1, 's') or add(duration)
    function add$1 (input, value) {
        return addSubtract$1(this, input, value, 1);
    }

    // supports only 2.0-style subtract(1, 's') or subtract(duration)
    function subtract$1 (input, value) {
        return addSubtract$1(this, input, value, -1);
    }

    function absCeil (number) {
        if (number < 0) {
            return Math.floor(number);
        } else {
            return Math.ceil(number);
        }
    }

    function bubble () {
        var milliseconds = this._milliseconds;
        var days         = this._days;
        var months       = this._months;
        var data         = this._data;
        var seconds, minutes, hours, years, monthsFromDays;

        // if we have a mix of positive and negative values, bubble down first
        // check: https://github.com/moment/moment/issues/2166
        if (!((milliseconds >= 0 && days >= 0 && months >= 0) ||
                (milliseconds <= 0 && days <= 0 && months <= 0))) {
            milliseconds += absCeil(monthsToDays(months) + days) * 864e5;
            days = 0;
            months = 0;
        }

        // The following code bubbles up values, see the tests for
        // examples of what that means.
        data.milliseconds = milliseconds % 1000;

        seconds           = absFloor(milliseconds / 1000);
        data.seconds      = seconds % 60;

        minutes           = absFloor(seconds / 60);
        data.minutes      = minutes % 60;

        hours             = absFloor(minutes / 60);
        data.hours        = hours % 24;

        days += absFloor(hours / 24);

        // convert days to months
        monthsFromDays = absFloor(daysToMonths(days));
        months += monthsFromDays;
        days -= absCeil(monthsToDays(monthsFromDays));

        // 12 months -> 1 year
        years = absFloor(months / 12);
        months %= 12;

        data.days   = days;
        data.months = months;
        data.years  = years;

        return this;
    }

    function daysToMonths (days) {
        // 400 years have 146097 days (taking into account leap year rules)
        // 400 years have 12 months === 4800
        return days * 4800 / 146097;
    }

    function monthsToDays (months) {
        // the reverse of daysToMonths
        return months * 146097 / 4800;
    }

    function as (units) {
        if (!this.isValid()) {
            return NaN;
        }
        var days;
        var months;
        var milliseconds = this._milliseconds;

        units = normalizeUnits(units);

        if (units === 'month' || units === 'quarter' || units === 'year') {
            days = this._days + milliseconds / 864e5;
            months = this._months + daysToMonths(days);
            switch (units) {
                case 'month':   return months;
                case 'quarter': return months / 3;
                case 'year':    return months / 12;
            }
        } else {
            // handle milliseconds separately because of floating point math errors (issue #1867)
            days = this._days + Math.round(monthsToDays(this._months));
            switch (units) {
                case 'week'   : return days / 7     + milliseconds / 6048e5;
                case 'day'    : return days         + milliseconds / 864e5;
                case 'hour'   : return days * 24    + milliseconds / 36e5;
                case 'minute' : return days * 1440  + milliseconds / 6e4;
                case 'second' : return days * 86400 + milliseconds / 1000;
                // Math.floor prevents floating point math errors here
                case 'millisecond': return Math.floor(days * 864e5) + milliseconds;
                default: throw new Error('Unknown unit ' + units);
            }
        }
    }

    // TODO: Use this.as('ms')?
    function valueOf$1 () {
        if (!this.isValid()) {
            return NaN;
        }
        return (
            this._milliseconds +
            this._days * 864e5 +
            (this._months % 12) * 2592e6 +
            toInt(this._months / 12) * 31536e6
        );
    }

    function makeAs (alias) {
        return function () {
            return this.as(alias);
        };
    }

    var asMilliseconds = makeAs('ms');
    var asSeconds      = makeAs('s');
    var asMinutes      = makeAs('m');
    var asHours        = makeAs('h');
    var asDays         = makeAs('d');
    var asWeeks        = makeAs('w');
    var asMonths       = makeAs('M');
    var asQuarters     = makeAs('Q');
    var asYears        = makeAs('y');

    function clone$1 () {
        return createDuration(this);
    }

    function get$2 (units) {
        units = normalizeUnits(units);
        return this.isValid() ? this[units + 's']() : NaN;
    }

    function makeGetter(name) {
        return function () {
            return this.isValid() ? this._data[name] : NaN;
        };
    }

    var milliseconds = makeGetter('milliseconds');
    var seconds      = makeGetter('seconds');
    var minutes      = makeGetter('minutes');
    var hours        = makeGetter('hours');
    var days         = makeGetter('days');
    var months       = makeGetter('months');
    var years        = makeGetter('years');

    function weeks () {
        return absFloor(this.days() / 7);
    }

    var round = Math.round;
    var thresholds = {
        ss: 44,         // a few seconds to seconds
        s : 45,         // seconds to minute
        m : 45,         // minutes to hour
        h : 22,         // hours to day
        d : 26,         // days to month
        M : 11          // months to year
    };

    // helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
    function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
        return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
    }

    function relativeTime$1 (posNegDuration, withoutSuffix, locale) {
        var duration = createDuration(posNegDuration).abs();
        var seconds  = round(duration.as('s'));
        var minutes  = round(duration.as('m'));
        var hours    = round(duration.as('h'));
        var days     = round(duration.as('d'));
        var months   = round(duration.as('M'));
        var years    = round(duration.as('y'));

        var a = seconds <= thresholds.ss && ['s', seconds]  ||
                seconds < thresholds.s   && ['ss', seconds] ||
                minutes <= 1             && ['m']           ||
                minutes < thresholds.m   && ['mm', minutes] ||
                hours   <= 1             && ['h']           ||
                hours   < thresholds.h   && ['hh', hours]   ||
                days    <= 1             && ['d']           ||
                days    < thresholds.d   && ['dd', days]    ||
                months  <= 1             && ['M']           ||
                months  < thresholds.M   && ['MM', months]  ||
                years   <= 1             && ['y']           || ['yy', years];

        a[2] = withoutSuffix;
        a[3] = +posNegDuration > 0;
        a[4] = locale;
        return substituteTimeAgo.apply(null, a);
    }

    // This function allows you to set the rounding function for relative time strings
    function getSetRelativeTimeRounding (roundingFunction) {
        if (roundingFunction === undefined) {
            return round;
        }
        if (typeof(roundingFunction) === 'function') {
            round = roundingFunction;
            return true;
        }
        return false;
    }

    // This function allows you to set a threshold for relative time strings
    function getSetRelativeTimeThreshold (threshold, limit) {
        if (thresholds[threshold] === undefined) {
            return false;
        }
        if (limit === undefined) {
            return thresholds[threshold];
        }
        thresholds[threshold] = limit;
        if (threshold === 's') {
            thresholds.ss = limit - 1;
        }
        return true;
    }

    function humanize (withSuffix) {
        if (!this.isValid()) {
            return this.localeData().invalidDate();
        }

        var locale = this.localeData();
        var output = relativeTime$1(this, !withSuffix, locale);

        if (withSuffix) {
            output = locale.pastFuture(+this, output);
        }

        return locale.postformat(output);
    }

    var abs$1 = Math.abs;

    function sign(x) {
        return ((x > 0) - (x < 0)) || +x;
    }

    function toISOString$1() {
        // for ISO strings we do not use the normal bubbling rules:
        //  * milliseconds bubble up until they become hours
        //  * days do not bubble at all
        //  * months bubble up until they become years
        // This is because there is no context-free conversion between hours and days
        // (think of clock changes)
        // and also not between days and months (28-31 days per month)
        if (!this.isValid()) {
            return this.localeData().invalidDate();
        }

        var seconds = abs$1(this._milliseconds) / 1000;
        var days         = abs$1(this._days);
        var months       = abs$1(this._months);
        var minutes, hours, years;

        // 3600 seconds -> 60 minutes -> 1 hour
        minutes           = absFloor(seconds / 60);
        hours             = absFloor(minutes / 60);
        seconds %= 60;
        minutes %= 60;

        // 12 months -> 1 year
        years  = absFloor(months / 12);
        months %= 12;


        // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
        var Y = years;
        var M = months;
        var D = days;
        var h = hours;
        var m = minutes;
        var s = seconds ? seconds.toFixed(3).replace(/\.?0+$/, '') : '';
        var total = this.asSeconds();

        if (!total) {
            // this is the same as C#'s (Noda) and python (isodate)...
            // but not other JS (goog.date)
            return 'P0D';
        }

        var totalSign = total < 0 ? '-' : '';
        var ymSign = sign(this._months) !== sign(total) ? '-' : '';
        var daysSign = sign(this._days) !== sign(total) ? '-' : '';
        var hmsSign = sign(this._milliseconds) !== sign(total) ? '-' : '';

        return totalSign + 'P' +
            (Y ? ymSign + Y + 'Y' : '') +
            (M ? ymSign + M + 'M' : '') +
            (D ? daysSign + D + 'D' : '') +
            ((h || m || s) ? 'T' : '') +
            (h ? hmsSign + h + 'H' : '') +
            (m ? hmsSign + m + 'M' : '') +
            (s ? hmsSign + s + 'S' : '');
    }

    var proto$2 = Duration.prototype;

    proto$2.isValid        = isValid$1;
    proto$2.abs            = abs;
    proto$2.add            = add$1;
    proto$2.subtract       = subtract$1;
    proto$2.as             = as;
    proto$2.asMilliseconds = asMilliseconds;
    proto$2.asSeconds      = asSeconds;
    proto$2.asMinutes      = asMinutes;
    proto$2.asHours        = asHours;
    proto$2.asDays         = asDays;
    proto$2.asWeeks        = asWeeks;
    proto$2.asMonths       = asMonths;
    proto$2.asQuarters     = asQuarters;
    proto$2.asYears        = asYears;
    proto$2.valueOf        = valueOf$1;
    proto$2._bubble        = bubble;
    proto$2.clone          = clone$1;
    proto$2.get            = get$2;
    proto$2.milliseconds   = milliseconds;
    proto$2.seconds        = seconds;
    proto$2.minutes        = minutes;
    proto$2.hours          = hours;
    proto$2.days           = days;
    proto$2.weeks          = weeks;
    proto$2.months         = months;
    proto$2.years          = years;
    proto$2.humanize       = humanize;
    proto$2.toISOString    = toISOString$1;
    proto$2.toString       = toISOString$1;
    proto$2.toJSON         = toISOString$1;
    proto$2.locale         = locale;
    proto$2.localeData     = localeData;

    proto$2.toIsoString = deprecate('toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)', toISOString$1);
    proto$2.lang = lang;

    // Side effect imports

    // FORMATTING

    addFormatToken('X', 0, 0, 'unix');
    addFormatToken('x', 0, 0, 'valueOf');

    // PARSING

    addRegexToken('x', matchSigned);
    addRegexToken('X', matchTimestamp);
    addParseToken('X', function (input, array, config) {
        config._d = new Date(parseFloat(input, 10) * 1000);
    });
    addParseToken('x', function (input, array, config) {
        config._d = new Date(toInt(input));
    });

    // Side effect imports


    hooks.version = '2.24.0';

    setHookCallback(createLocal);

    hooks.fn                    = proto;
    hooks.min                   = min;
    hooks.max                   = max;
    hooks.now                   = now;
    hooks.utc                   = createUTC;
    hooks.unix                  = createUnix;
    hooks.months                = listMonths;
    hooks.isDate                = isDate;
    hooks.locale                = getSetGlobalLocale;
    hooks.invalid               = createInvalid;
    hooks.duration              = createDuration;
    hooks.isMoment              = isMoment;
    hooks.weekdays              = listWeekdays;
    hooks.parseZone             = createInZone;
    hooks.localeData            = getLocale;
    hooks.isDuration            = isDuration;
    hooks.monthsShort           = listMonthsShort;
    hooks.weekdaysMin           = listWeekdaysMin;
    hooks.defineLocale          = defineLocale;
    hooks.updateLocale          = updateLocale;
    hooks.locales               = listLocales;
    hooks.weekdaysShort         = listWeekdaysShort;
    hooks.normalizeUnits        = normalizeUnits;
    hooks.relativeTimeRounding  = getSetRelativeTimeRounding;
    hooks.relativeTimeThreshold = getSetRelativeTimeThreshold;
    hooks.calendarFormat        = getCalendarFormat;
    hooks.prototype             = proto;

    // currently HTML5 input type only supports 24-hour formats
    hooks.HTML5_FMT = {
        DATETIME_LOCAL: 'YYYY-MM-DDTHH:mm',             // <input type="datetime-local" />
        DATETIME_LOCAL_SECONDS: 'YYYY-MM-DDTHH:mm:ss',  // <input type="datetime-local" step="1" />
        DATETIME_LOCAL_MS: 'YYYY-MM-DDTHH:mm:ss.SSS',   // <input type="datetime-local" step="0.001" />
        DATE: 'YYYY-MM-DD',                             // <input type="date" />
        TIME: 'HH:mm',                                  // <input type="time" />
        TIME_SECONDS: 'HH:mm:ss',                       // <input type="time" step="1" />
        TIME_MS: 'HH:mm:ss.SSS',                        // <input type="time" step="0.001" />
        WEEK: 'GGGG-[W]WW',                             // <input type="week" />
        MONTH: 'YYYY-MM'                                // <input type="month" />
    };

    return hooks;

})));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./node_modules/node-libs-browser/node_modules/punycode/punycode.js":
/*!**************************************************************************!*\
  !*** ./node_modules/node-libs-browser/node_modules/punycode/punycode.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module, global) {var __WEBPACK_AMD_DEFINE_RESULT__;/*! https://mths.be/punycode v1.4.1 by @mathias */
;(function(root) {

	/** Detect free variables */
	var freeExports =  true && exports &&
		!exports.nodeType && exports;
	var freeModule =  true && module &&
		!module.nodeType && module;
	var freeGlobal = typeof global == 'object' && global;
	if (
		freeGlobal.global === freeGlobal ||
		freeGlobal.window === freeGlobal ||
		freeGlobal.self === freeGlobal
	) {
		root = freeGlobal;
	}

	/**
	 * The `punycode` object.
	 * @name punycode
	 * @type Object
	 */
	var punycode,

	/** Highest positive signed 32-bit float value */
	maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1

	/** Bootstring parameters */
	base = 36,
	tMin = 1,
	tMax = 26,
	skew = 38,
	damp = 700,
	initialBias = 72,
	initialN = 128, // 0x80
	delimiter = '-', // '\x2D'

	/** Regular expressions */
	regexPunycode = /^xn--/,
	regexNonASCII = /[^\x20-\x7E]/, // unprintable ASCII chars + non-ASCII chars
	regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, // RFC 3490 separators

	/** Error messages */
	errors = {
		'overflow': 'Overflow: input needs wider integers to process',
		'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
		'invalid-input': 'Invalid input'
	},

	/** Convenience shortcuts */
	baseMinusTMin = base - tMin,
	floor = Math.floor,
	stringFromCharCode = String.fromCharCode,

	/** Temporary variable */
	key;

	/*--------------------------------------------------------------------------*/

	/**
	 * A generic error utility function.
	 * @private
	 * @param {String} type The error type.
	 * @returns {Error} Throws a `RangeError` with the applicable error message.
	 */
	function error(type) {
		throw new RangeError(errors[type]);
	}

	/**
	 * A generic `Array#map` utility function.
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} callback The function that gets called for every array
	 * item.
	 * @returns {Array} A new array of values returned by the callback function.
	 */
	function map(array, fn) {
		var length = array.length;
		var result = [];
		while (length--) {
			result[length] = fn(array[length]);
		}
		return result;
	}

	/**
	 * A simple `Array#map`-like wrapper to work with domain name strings or email
	 * addresses.
	 * @private
	 * @param {String} domain The domain name or email address.
	 * @param {Function} callback The function that gets called for every
	 * character.
	 * @returns {Array} A new string of characters returned by the callback
	 * function.
	 */
	function mapDomain(string, fn) {
		var parts = string.split('@');
		var result = '';
		if (parts.length > 1) {
			// In email addresses, only the domain name should be punycoded. Leave
			// the local part (i.e. everything up to `@`) intact.
			result = parts[0] + '@';
			string = parts[1];
		}
		// Avoid `split(regex)` for IE8 compatibility. See #17.
		string = string.replace(regexSeparators, '\x2E');
		var labels = string.split('.');
		var encoded = map(labels, fn).join('.');
		return result + encoded;
	}

	/**
	 * Creates an array containing the numeric code points of each Unicode
	 * character in the string. While JavaScript uses UCS-2 internally,
	 * this function will convert a pair of surrogate halves (each of which
	 * UCS-2 exposes as separate characters) into a single code point,
	 * matching UTF-16.
	 * @see `punycode.ucs2.encode`
	 * @see <https://mathiasbynens.be/notes/javascript-encoding>
	 * @memberOf punycode.ucs2
	 * @name decode
	 * @param {String} string The Unicode input string (UCS-2).
	 * @returns {Array} The new array of code points.
	 */
	function ucs2decode(string) {
		var output = [],
		    counter = 0,
		    length = string.length,
		    value,
		    extra;
		while (counter < length) {
			value = string.charCodeAt(counter++);
			if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
				// high surrogate, and there is a next character
				extra = string.charCodeAt(counter++);
				if ((extra & 0xFC00) == 0xDC00) { // low surrogate
					output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
				} else {
					// unmatched surrogate; only append this code unit, in case the next
					// code unit is the high surrogate of a surrogate pair
					output.push(value);
					counter--;
				}
			} else {
				output.push(value);
			}
		}
		return output;
	}

	/**
	 * Creates a string based on an array of numeric code points.
	 * @see `punycode.ucs2.decode`
	 * @memberOf punycode.ucs2
	 * @name encode
	 * @param {Array} codePoints The array of numeric code points.
	 * @returns {String} The new Unicode string (UCS-2).
	 */
	function ucs2encode(array) {
		return map(array, function(value) {
			var output = '';
			if (value > 0xFFFF) {
				value -= 0x10000;
				output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
				value = 0xDC00 | value & 0x3FF;
			}
			output += stringFromCharCode(value);
			return output;
		}).join('');
	}

	/**
	 * Converts a basic code point into a digit/integer.
	 * @see `digitToBasic()`
	 * @private
	 * @param {Number} codePoint The basic numeric code point value.
	 * @returns {Number} The numeric value of a basic code point (for use in
	 * representing integers) in the range `0` to `base - 1`, or `base` if
	 * the code point does not represent a value.
	 */
	function basicToDigit(codePoint) {
		if (codePoint - 48 < 10) {
			return codePoint - 22;
		}
		if (codePoint - 65 < 26) {
			return codePoint - 65;
		}
		if (codePoint - 97 < 26) {
			return codePoint - 97;
		}
		return base;
	}

	/**
	 * Converts a digit/integer into a basic code point.
	 * @see `basicToDigit()`
	 * @private
	 * @param {Number} digit The numeric value of a basic code point.
	 * @returns {Number} The basic code point whose value (when used for
	 * representing integers) is `digit`, which needs to be in the range
	 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
	 * used; else, the lowercase form is used. The behavior is undefined
	 * if `flag` is non-zero and `digit` has no uppercase form.
	 */
	function digitToBasic(digit, flag) {
		//  0..25 map to ASCII a..z or A..Z
		// 26..35 map to ASCII 0..9
		return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
	}

	/**
	 * Bias adaptation function as per section 3.4 of RFC 3492.
	 * https://tools.ietf.org/html/rfc3492#section-3.4
	 * @private
	 */
	function adapt(delta, numPoints, firstTime) {
		var k = 0;
		delta = firstTime ? floor(delta / damp) : delta >> 1;
		delta += floor(delta / numPoints);
		for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
			delta = floor(delta / baseMinusTMin);
		}
		return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
	}

	/**
	 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
	 * symbols.
	 * @memberOf punycode
	 * @param {String} input The Punycode string of ASCII-only symbols.
	 * @returns {String} The resulting string of Unicode symbols.
	 */
	function decode(input) {
		// Don't use UCS-2
		var output = [],
		    inputLength = input.length,
		    out,
		    i = 0,
		    n = initialN,
		    bias = initialBias,
		    basic,
		    j,
		    index,
		    oldi,
		    w,
		    k,
		    digit,
		    t,
		    /** Cached calculation results */
		    baseMinusT;

		// Handle the basic code points: let `basic` be the number of input code
		// points before the last delimiter, or `0` if there is none, then copy
		// the first basic code points to the output.

		basic = input.lastIndexOf(delimiter);
		if (basic < 0) {
			basic = 0;
		}

		for (j = 0; j < basic; ++j) {
			// if it's not a basic code point
			if (input.charCodeAt(j) >= 0x80) {
				error('not-basic');
			}
			output.push(input.charCodeAt(j));
		}

		// Main decoding loop: start just after the last delimiter if any basic code
		// points were copied; start at the beginning otherwise.

		for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

			// `index` is the index of the next character to be consumed.
			// Decode a generalized variable-length integer into `delta`,
			// which gets added to `i`. The overflow checking is easier
			// if we increase `i` as we go, then subtract off its starting
			// value at the end to obtain `delta`.
			for (oldi = i, w = 1, k = base; /* no condition */; k += base) {

				if (index >= inputLength) {
					error('invalid-input');
				}

				digit = basicToDigit(input.charCodeAt(index++));

				if (digit >= base || digit > floor((maxInt - i) / w)) {
					error('overflow');
				}

				i += digit * w;
				t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

				if (digit < t) {
					break;
				}

				baseMinusT = base - t;
				if (w > floor(maxInt / baseMinusT)) {
					error('overflow');
				}

				w *= baseMinusT;

			}

			out = output.length + 1;
			bias = adapt(i - oldi, out, oldi == 0);

			// `i` was supposed to wrap around from `out` to `0`,
			// incrementing `n` each time, so we'll fix that now:
			if (floor(i / out) > maxInt - n) {
				error('overflow');
			}

			n += floor(i / out);
			i %= out;

			// Insert `n` at position `i` of the output
			output.splice(i++, 0, n);

		}

		return ucs2encode(output);
	}

	/**
	 * Converts a string of Unicode symbols (e.g. a domain name label) to a
	 * Punycode string of ASCII-only symbols.
	 * @memberOf punycode
	 * @param {String} input The string of Unicode symbols.
	 * @returns {String} The resulting Punycode string of ASCII-only symbols.
	 */
	function encode(input) {
		var n,
		    delta,
		    handledCPCount,
		    basicLength,
		    bias,
		    j,
		    m,
		    q,
		    k,
		    t,
		    currentValue,
		    output = [],
		    /** `inputLength` will hold the number of code points in `input`. */
		    inputLength,
		    /** Cached calculation results */
		    handledCPCountPlusOne,
		    baseMinusT,
		    qMinusT;

		// Convert the input in UCS-2 to Unicode
		input = ucs2decode(input);

		// Cache the length
		inputLength = input.length;

		// Initialize the state
		n = initialN;
		delta = 0;
		bias = initialBias;

		// Handle the basic code points
		for (j = 0; j < inputLength; ++j) {
			currentValue = input[j];
			if (currentValue < 0x80) {
				output.push(stringFromCharCode(currentValue));
			}
		}

		handledCPCount = basicLength = output.length;

		// `handledCPCount` is the number of code points that have been handled;
		// `basicLength` is the number of basic code points.

		// Finish the basic string - if it is not empty - with a delimiter
		if (basicLength) {
			output.push(delimiter);
		}

		// Main encoding loop:
		while (handledCPCount < inputLength) {

			// All non-basic code points < n have been handled already. Find the next
			// larger one:
			for (m = maxInt, j = 0; j < inputLength; ++j) {
				currentValue = input[j];
				if (currentValue >= n && currentValue < m) {
					m = currentValue;
				}
			}

			// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
			// but guard against overflow
			handledCPCountPlusOne = handledCPCount + 1;
			if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
				error('overflow');
			}

			delta += (m - n) * handledCPCountPlusOne;
			n = m;

			for (j = 0; j < inputLength; ++j) {
				currentValue = input[j];

				if (currentValue < n && ++delta > maxInt) {
					error('overflow');
				}

				if (currentValue == n) {
					// Represent delta as a generalized variable-length integer
					for (q = delta, k = base; /* no condition */; k += base) {
						t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
						if (q < t) {
							break;
						}
						qMinusT = q - t;
						baseMinusT = base - t;
						output.push(
							stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
						);
						q = floor(qMinusT / baseMinusT);
					}

					output.push(stringFromCharCode(digitToBasic(q, 0)));
					bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
					delta = 0;
					++handledCPCount;
				}
			}

			++delta;
			++n;

		}
		return output.join('');
	}

	/**
	 * Converts a Punycode string representing a domain name or an email address
	 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
	 * it doesn't matter if you call it on a string that has already been
	 * converted to Unicode.
	 * @memberOf punycode
	 * @param {String} input The Punycoded domain name or email address to
	 * convert to Unicode.
	 * @returns {String} The Unicode representation of the given Punycode
	 * string.
	 */
	function toUnicode(input) {
		return mapDomain(input, function(string) {
			return regexPunycode.test(string)
				? decode(string.slice(4).toLowerCase())
				: string;
		});
	}

	/**
	 * Converts a Unicode string representing a domain name or an email address to
	 * Punycode. Only the non-ASCII parts of the domain name will be converted,
	 * i.e. it doesn't matter if you call it with a domain that's already in
	 * ASCII.
	 * @memberOf punycode
	 * @param {String} input The domain name or email address to convert, as a
	 * Unicode string.
	 * @returns {String} The Punycode representation of the given domain name or
	 * email address.
	 */
	function toASCII(input) {
		return mapDomain(input, function(string) {
			return regexNonASCII.test(string)
				? 'xn--' + encode(string)
				: string;
		});
	}

	/*--------------------------------------------------------------------------*/

	/** Define the public API */
	punycode = {
		/**
		 * A string representing the current Punycode.js version number.
		 * @memberOf punycode
		 * @type String
		 */
		'version': '1.4.1',
		/**
		 * An object of methods to convert from JavaScript's internal character
		 * representation (UCS-2) to Unicode code points, and back.
		 * @see <https://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode
		 * @type Object
		 */
		'ucs2': {
			'decode': ucs2decode,
			'encode': ucs2encode
		},
		'decode': decode,
		'encode': encode,
		'toASCII': toASCII,
		'toUnicode': toUnicode
	};

	/** Expose `punycode` */
	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (
		true
	) {
		!(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {
			return punycode;
		}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {}

}(this));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module), __webpack_require__(/*! ./../../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/querystring-es3/decode.js":
/*!************************************************!*\
  !*** ./node_modules/querystring-es3/decode.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = function(qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr, vstr, k, v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};


/***/ }),

/***/ "./node_modules/querystring-es3/encode.js":
/*!************************************************!*\
  !*** ./node_modules/querystring-es3/encode.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var stringifyPrimitive = function(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

module.exports = function(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return map(objectKeys(obj), function(k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (isArray(obj[k])) {
        return map(obj[k], function(v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);

  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq +
         encodeURIComponent(stringifyPrimitive(obj));
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

function map (xs, f) {
  if (xs.map) return xs.map(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }
  return res;
}

var objectKeys = Object.keys || function (obj) {
  var res = [];
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
  }
  return res;
};


/***/ }),

/***/ "./node_modules/querystring-es3/index.js":
/*!***********************************************!*\
  !*** ./node_modules/querystring-es3/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.decode = exports.parse = __webpack_require__(/*! ./decode */ "./node_modules/querystring-es3/decode.js");
exports.encode = exports.stringify = __webpack_require__(/*! ./encode */ "./node_modules/querystring-es3/encode.js");


/***/ }),

/***/ "./node_modules/sockjs-client/dist/sockjs.js":
/*!***************************************************!*\
  !*** ./node_modules/sockjs-client/dist/sockjs.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var require;var require;/* sockjs-client v1.4.0 | http://sockjs.org | MIT license */
(function(f){if(true){module.exports=f()}else { var g; }})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return require(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (global){
'use strict';

var transportList = require('./transport-list');

module.exports = require('./main')(transportList);

// TODO can't get rid of this until all servers do
if ('_sockjs_onload' in global) {
  setTimeout(global._sockjs_onload, 1);
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./main":14,"./transport-list":16}],2:[function(require,module,exports){
'use strict';

var inherits = require('inherits')
  , Event = require('./event')
  ;

function CloseEvent() {
  Event.call(this);
  this.initEvent('close', false, false);
  this.wasClean = false;
  this.code = 0;
  this.reason = '';
}

inherits(CloseEvent, Event);

module.exports = CloseEvent;

},{"./event":4,"inherits":57}],3:[function(require,module,exports){
'use strict';

var inherits = require('inherits')
  , EventTarget = require('./eventtarget')
  ;

function EventEmitter() {
  EventTarget.call(this);
}

inherits(EventEmitter, EventTarget);

EventEmitter.prototype.removeAllListeners = function(type) {
  if (type) {
    delete this._listeners[type];
  } else {
    this._listeners = {};
  }
};

EventEmitter.prototype.once = function(type, listener) {
  var self = this
    , fired = false;

  function g() {
    self.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  this.on(type, g);
};

EventEmitter.prototype.emit = function() {
  var type = arguments[0];
  var listeners = this._listeners[type];
  if (!listeners) {
    return;
  }
  // equivalent of Array.prototype.slice.call(arguments, 1);
  var l = arguments.length;
  var args = new Array(l - 1);
  for (var ai = 1; ai < l; ai++) {
    args[ai - 1] = arguments[ai];
  }
  for (var i = 0; i < listeners.length; i++) {
    listeners[i].apply(this, args);
  }
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener = EventTarget.prototype.addEventListener;
EventEmitter.prototype.removeListener = EventTarget.prototype.removeEventListener;

module.exports.EventEmitter = EventEmitter;

},{"./eventtarget":5,"inherits":57}],4:[function(require,module,exports){
'use strict';

function Event(eventType) {
  this.type = eventType;
}

Event.prototype.initEvent = function(eventType, canBubble, cancelable) {
  this.type = eventType;
  this.bubbles = canBubble;
  this.cancelable = cancelable;
  this.timeStamp = +new Date();
  return this;
};

Event.prototype.stopPropagation = function() {};
Event.prototype.preventDefault = function() {};

Event.CAPTURING_PHASE = 1;
Event.AT_TARGET = 2;
Event.BUBBLING_PHASE = 3;

module.exports = Event;

},{}],5:[function(require,module,exports){
'use strict';

/* Simplified implementation of DOM2 EventTarget.
 *   http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-EventTarget
 */

function EventTarget() {
  this._listeners = {};
}

EventTarget.prototype.addEventListener = function(eventType, listener) {
  if (!(eventType in this._listeners)) {
    this._listeners[eventType] = [];
  }
  var arr = this._listeners[eventType];
  // #4
  if (arr.indexOf(listener) === -1) {
    // Make a copy so as not to interfere with a current dispatchEvent.
    arr = arr.concat([listener]);
  }
  this._listeners[eventType] = arr;
};

EventTarget.prototype.removeEventListener = function(eventType, listener) {
  var arr = this._listeners[eventType];
  if (!arr) {
    return;
  }
  var idx = arr.indexOf(listener);
  if (idx !== -1) {
    if (arr.length > 1) {
      // Make a copy so as not to interfere with a current dispatchEvent.
      this._listeners[eventType] = arr.slice(0, idx).concat(arr.slice(idx + 1));
    } else {
      delete this._listeners[eventType];
    }
    return;
  }
};

EventTarget.prototype.dispatchEvent = function() {
  var event = arguments[0];
  var t = event.type;
  // equivalent of Array.prototype.slice.call(arguments, 0);
  var args = arguments.length === 1 ? [event] : Array.apply(null, arguments);
  // TODO: This doesn't match the real behavior; per spec, onfoo get
  // their place in line from the /first/ time they're set from
  // non-null. Although WebKit bumps it to the end every time it's
  // set.
  if (this['on' + t]) {
    this['on' + t].apply(this, args);
  }
  if (t in this._listeners) {
    // Grab a reference to the listeners list. removeEventListener may alter the list.
    var listeners = this._listeners[t];
    for (var i = 0; i < listeners.length; i++) {
      listeners[i].apply(this, args);
    }
  }
};

module.exports = EventTarget;

},{}],6:[function(require,module,exports){
'use strict';

var inherits = require('inherits')
  , Event = require('./event')
  ;

function TransportMessageEvent(data) {
  Event.call(this);
  this.initEvent('message', false, false);
  this.data = data;
}

inherits(TransportMessageEvent, Event);

module.exports = TransportMessageEvent;

},{"./event":4,"inherits":57}],7:[function(require,module,exports){
'use strict';

var JSON3 = require('json3')
  , iframeUtils = require('./utils/iframe')
  ;

function FacadeJS(transport) {
  this._transport = transport;
  transport.on('message', this._transportMessage.bind(this));
  transport.on('close', this._transportClose.bind(this));
}

FacadeJS.prototype._transportClose = function(code, reason) {
  iframeUtils.postMessage('c', JSON3.stringify([code, reason]));
};
FacadeJS.prototype._transportMessage = function(frame) {
  iframeUtils.postMessage('t', frame);
};
FacadeJS.prototype._send = function(data) {
  this._transport.send(data);
};
FacadeJS.prototype._close = function() {
  this._transport.close();
  this._transport.removeAllListeners();
};

module.exports = FacadeJS;

},{"./utils/iframe":47,"json3":58}],8:[function(require,module,exports){
(function (process){
'use strict';

var urlUtils = require('./utils/url')
  , eventUtils = require('./utils/event')
  , JSON3 = require('json3')
  , FacadeJS = require('./facade')
  , InfoIframeReceiver = require('./info-iframe-receiver')
  , iframeUtils = require('./utils/iframe')
  , loc = require('./location')
  ;

var debug = function() {};
if (process.env.NODE_ENV !== 'production') {
  debug = require('debug')('sockjs-client:iframe-bootstrap');
}

module.exports = function(SockJS, availableTransports) {
  var transportMap = {};
  availableTransports.forEach(function(at) {
    if (at.facadeTransport) {
      transportMap[at.facadeTransport.transportName] = at.facadeTransport;
    }
  });

  // hard-coded for the info iframe
  // TODO see if we can make this more dynamic
  transportMap[InfoIframeReceiver.transportName] = InfoIframeReceiver;
  var parentOrigin;

  /* eslint-disable camelcase */
  SockJS.bootstrap_iframe = function() {
    /* eslint-enable camelcase */
    var facade;
    iframeUtils.currentWindowId = loc.hash.slice(1);
    var onMessage = function(e) {
      if (e.source !== parent) {
        return;
      }
      if (typeof parentOrigin === 'undefined') {
        parentOrigin = e.origin;
      }
      if (e.origin !== parentOrigin) {
        return;
      }

      var iframeMessage;
      try {
        iframeMessage = JSON3.parse(e.data);
      } catch (ignored) {
        debug('bad json', e.data);
        return;
      }

      if (iframeMessage.windowId !== iframeUtils.currentWindowId) {
        return;
      }
      switch (iframeMessage.type) {
      case 's':
        var p;
        try {
          p = JSON3.parse(iframeMessage.data);
        } catch (ignored) {
          debug('bad json', iframeMessage.data);
          break;
        }
        var version = p[0];
        var transport = p[1];
        var transUrl = p[2];
        var baseUrl = p[3];
        debug(version, transport, transUrl, baseUrl);
        // change this to semver logic
        if (version !== SockJS.version) {
          throw new Error('Incompatible SockJS! Main site uses:' +
                    ' "' + version + '", the iframe:' +
                    ' "' + SockJS.version + '".');
        }

        if (!urlUtils.isOriginEqual(transUrl, loc.href) ||
            !urlUtils.isOriginEqual(baseUrl, loc.href)) {
          throw new Error('Can\'t connect to different domain from within an ' +
                    'iframe. (' + loc.href + ', ' + transUrl + ', ' + baseUrl + ')');
        }
        facade = new FacadeJS(new transportMap[transport](transUrl, baseUrl));
        break;
      case 'm':
        facade._send(iframeMessage.data);
        break;
      case 'c':
        if (facade) {
          facade._close();
        }
        facade = null;
        break;
      }
    };

    eventUtils.attachEvent('message', onMessage);

    // Start
    iframeUtils.postMessage('s');
  };
};

}).call(this,{ env: {} })

},{"./facade":7,"./info-iframe-receiver":10,"./location":13,"./utils/event":46,"./utils/iframe":47,"./utils/url":52,"debug":55,"json3":58}],9:[function(require,module,exports){
(function (process){
'use strict';

var EventEmitter = require('events').EventEmitter
  , inherits = require('inherits')
  , JSON3 = require('json3')
  , objectUtils = require('./utils/object')
  ;

var debug = function() {};
if (process.env.NODE_ENV !== 'production') {
  debug = require('debug')('sockjs-client:info-ajax');
}

function InfoAjax(url, AjaxObject) {
  EventEmitter.call(this);

  var self = this;
  var t0 = +new Date();
  this.xo = new AjaxObject('GET', url);

  this.xo.once('finish', function(status, text) {
    var info, rtt;
    if (status === 200) {
      rtt = (+new Date()) - t0;
      if (text) {
        try {
          info = JSON3.parse(text);
        } catch (e) {
          debug('bad json', text);
        }
      }

      if (!objectUtils.isObject(info)) {
        info = {};
      }
    }
    self.emit('finish', info, rtt);
    self.removeAllListeners();
  });
}

inherits(InfoAjax, EventEmitter);

InfoAjax.prototype.close = function() {
  this.removeAllListeners();
  this.xo.close();
};

module.exports = InfoAjax;

}).call(this,{ env: {} })

},{"./utils/object":49,"debug":55,"events":3,"inherits":57,"json3":58}],10:[function(require,module,exports){
'use strict';

var inherits = require('inherits')
  , EventEmitter = require('events').EventEmitter
  , JSON3 = require('json3')
  , XHRLocalObject = require('./transport/sender/xhr-local')
  , InfoAjax = require('./info-ajax')
  ;

function InfoReceiverIframe(transUrl) {
  var self = this;
  EventEmitter.call(this);

  this.ir = new InfoAjax(transUrl, XHRLocalObject);
  this.ir.once('finish', function(info, rtt) {
    self.ir = null;
    self.emit('message', JSON3.stringify([info, rtt]));
  });
}

inherits(InfoReceiverIframe, EventEmitter);

InfoReceiverIframe.transportName = 'iframe-info-receiver';

InfoReceiverIframe.prototype.close = function() {
  if (this.ir) {
    this.ir.close();
    this.ir = null;
  }
  this.removeAllListeners();
};

module.exports = InfoReceiverIframe;

},{"./info-ajax":9,"./transport/sender/xhr-local":37,"events":3,"inherits":57,"json3":58}],11:[function(require,module,exports){
(function (process,global){
'use strict';

var EventEmitter = require('events').EventEmitter
  , inherits = require('inherits')
  , JSON3 = require('json3')
  , utils = require('./utils/event')
  , IframeTransport = require('./transport/iframe')
  , InfoReceiverIframe = require('./info-iframe-receiver')
  ;

var debug = function() {};
if (process.env.NODE_ENV !== 'production') {
  debug = require('debug')('sockjs-client:info-iframe');
}

function InfoIframe(baseUrl, url) {
  var self = this;
  EventEmitter.call(this);

  var go = function() {
    var ifr = self.ifr = new IframeTransport(InfoReceiverIframe.transportName, url, baseUrl);

    ifr.once('message', function(msg) {
      if (msg) {
        var d;
        try {
          d = JSON3.parse(msg);
        } catch (e) {
          debug('bad json', msg);
          self.emit('finish');
          self.close();
          return;
        }

        var info = d[0], rtt = d[1];
        self.emit('finish', info, rtt);
      }
      self.close();
    });

    ifr.once('close', function() {
      self.emit('finish');
      self.close();
    });
  };

  // TODO this seems the same as the 'needBody' from transports
  if (!global.document.body) {
    utils.attachEvent('load', go);
  } else {
    go();
  }
}

inherits(InfoIframe, EventEmitter);

InfoIframe.enabled = function() {
  return IframeTransport.enabled();
};

InfoIframe.prototype.close = function() {
  if (this.ifr) {
    this.ifr.close();
  }
  this.removeAllListeners();
  this.ifr = null;
};

module.exports = InfoIframe;

}).call(this,{ env: {} },typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./info-iframe-receiver":10,"./transport/iframe":22,"./utils/event":46,"debug":55,"events":3,"inherits":57,"json3":58}],12:[function(require,module,exports){
(function (process){
'use strict';

var EventEmitter = require('events').EventEmitter
  , inherits = require('inherits')
  , urlUtils = require('./utils/url')
  , XDR = require('./transport/sender/xdr')
  , XHRCors = require('./transport/sender/xhr-cors')
  , XHRLocal = require('./transport/sender/xhr-local')
  , XHRFake = require('./transport/sender/xhr-fake')
  , InfoIframe = require('./info-iframe')
  , InfoAjax = require('./info-ajax')
  ;

var debug = function() {};
if (process.env.NODE_ENV !== 'production') {
  debug = require('debug')('sockjs-client:info-receiver');
}

function InfoReceiver(baseUrl, urlInfo) {
  debug(baseUrl);
  var self = this;
  EventEmitter.call(this);

  setTimeout(function() {
    self.doXhr(baseUrl, urlInfo);
  }, 0);
}

inherits(InfoReceiver, EventEmitter);

// TODO this is currently ignoring the list of available transports and the whitelist

InfoReceiver._getReceiver = function(baseUrl, url, urlInfo) {
  // determine method of CORS support (if needed)
  if (urlInfo.sameOrigin) {
    return new InfoAjax(url, XHRLocal);
  }
  if (XHRCors.enabled) {
    return new InfoAjax(url, XHRCors);
  }
  if (XDR.enabled && urlInfo.sameScheme) {
    return new InfoAjax(url, XDR);
  }
  if (InfoIframe.enabled()) {
    return new InfoIframe(baseUrl, url);
  }
  return new InfoAjax(url, XHRFake);
};

InfoReceiver.prototype.doXhr = function(baseUrl, urlInfo) {
  var self = this
    , url = urlUtils.addPath(baseUrl, '/info')
    ;
  debug('doXhr', url);

  this.xo = InfoReceiver._getReceiver(baseUrl, url, urlInfo);

  this.timeoutRef = setTimeout(function() {
    debug('timeout');
    self._cleanup(false);
    self.emit('finish');
  }, InfoReceiver.timeout);

  this.xo.once('finish', function(info, rtt) {
    debug('finish', info, rtt);
    self._cleanup(true);
    self.emit('finish', info, rtt);
  });
};

InfoReceiver.prototype._cleanup = function(wasClean) {
  debug('_cleanup');
  clearTimeout(this.timeoutRef);
  this.timeoutRef = null;
  if (!wasClean && this.xo) {
    this.xo.close();
  }
  this.xo = null;
};

InfoReceiver.prototype.close = function() {
  debug('close');
  this.removeAllListeners();
  this._cleanup(false);
};

InfoReceiver.timeout = 8000;

module.exports = InfoReceiver;

}).call(this,{ env: {} })

},{"./info-ajax":9,"./info-iframe":11,"./transport/sender/xdr":34,"./transport/sender/xhr-cors":35,"./transport/sender/xhr-fake":36,"./transport/sender/xhr-local":37,"./utils/url":52,"debug":55,"events":3,"inherits":57}],13:[function(require,module,exports){
(function (global){
'use strict';

module.exports = global.location || {
  origin: 'http://localhost:80'
, protocol: 'http:'
, host: 'localhost'
, port: 80
, href: 'http://localhost/'
, hash: ''
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],14:[function(require,module,exports){
(function (process,global){
'use strict';

require('./shims');

var URL = require('url-parse')
  , inherits = require('inherits')
  , JSON3 = require('json3')
  , random = require('./utils/random')
  , escape = require('./utils/escape')
  , urlUtils = require('./utils/url')
  , eventUtils = require('./utils/event')
  , transport = require('./utils/transport')
  , objectUtils = require('./utils/object')
  , browser = require('./utils/browser')
  , log = require('./utils/log')
  , Event = require('./event/event')
  , EventTarget = require('./event/eventtarget')
  , loc = require('./location')
  , CloseEvent = require('./event/close')
  , TransportMessageEvent = require('./event/trans-message')
  , InfoReceiver = require('./info-receiver')
  ;

var debug = function() {};
if (process.env.NODE_ENV !== 'production') {
  debug = require('debug')('sockjs-client:main');
}

var transports;

// follow constructor steps defined at http://dev.w3.org/html5/websockets/#the-websocket-interface
function SockJS(url, protocols, options) {
  if (!(this instanceof SockJS)) {
    return new SockJS(url, protocols, options);
  }
  if (arguments.length < 1) {
    throw new TypeError("Failed to construct 'SockJS: 1 argument required, but only 0 present");
  }
  EventTarget.call(this);

  this.readyState = SockJS.CONNECTING;
  this.extensions = '';
  this.protocol = '';

  // non-standard extension
  options = options || {};
  if (options.protocols_whitelist) {
    log.warn("'protocols_whitelist' is DEPRECATED. Use 'transports' instead.");
  }
  this._transportsWhitelist = options.transports;
  this._transportOptions = options.transportOptions || {};
  this._timeout = options.timeout || 0;

  var sessionId = options.sessionId || 8;
  if (typeof sessionId === 'function') {
    this._generateSessionId = sessionId;
  } else if (typeof sessionId === 'number') {
    this._generateSessionId = function() {
      return random.string(sessionId);
    };
  } else {
    throw new TypeError('If sessionId is used in the options, it needs to be a number or a function.');
  }

  this._server = options.server || random.numberString(1000);

  // Step 1 of WS spec - parse and validate the url. Issue #8
  var parsedUrl = new URL(url);
  if (!parsedUrl.host || !parsedUrl.protocol) {
    throw new SyntaxError("The URL '" + url + "' is invalid");
  } else if (parsedUrl.hash) {
    throw new SyntaxError('The URL must not contain a fragment');
  } else if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
    throw new SyntaxError("The URL's scheme must be either 'http:' or 'https:'. '" + parsedUrl.protocol + "' is not allowed.");
  }

  var secure = parsedUrl.protocol === 'https:';
  // Step 2 - don't allow secure origin with an insecure protocol
  if (loc.protocol === 'https:' && !secure) {
    throw new Error('SecurityError: An insecure SockJS connection may not be initiated from a page loaded over HTTPS');
  }

  // Step 3 - check port access - no need here
  // Step 4 - parse protocols argument
  if (!protocols) {
    protocols = [];
  } else if (!Array.isArray(protocols)) {
    protocols = [protocols];
  }

  // Step 5 - check protocols argument
  var sortedProtocols = protocols.sort();
  sortedProtocols.forEach(function(proto, i) {
    if (!proto) {
      throw new SyntaxError("The protocols entry '" + proto + "' is invalid.");
    }
    if (i < (sortedProtocols.length - 1) && proto === sortedProtocols[i + 1]) {
      throw new SyntaxError("The protocols entry '" + proto + "' is duplicated.");
    }
  });

  // Step 6 - convert origin
  var o = urlUtils.getOrigin(loc.href);
  this._origin = o ? o.toLowerCase() : null;

  // remove the trailing slash
  parsedUrl.set('pathname', parsedUrl.pathname.replace(/\/+$/, ''));

  // store the sanitized url
  this.url = parsedUrl.href;
  debug('using url', this.url);

  // Step 7 - start connection in background
  // obtain server info
  // http://sockjs.github.io/sockjs-protocol/sockjs-protocol-0.3.3.html#section-26
  this._urlInfo = {
    nullOrigin: !browser.hasDomain()
  , sameOrigin: urlUtils.isOriginEqual(this.url, loc.href)
  , sameScheme: urlUtils.isSchemeEqual(this.url, loc.href)
  };

  this._ir = new InfoReceiver(this.url, this._urlInfo);
  this._ir.once('finish', this._receiveInfo.bind(this));
}

inherits(SockJS, EventTarget);

function userSetCode(code) {
  return code === 1000 || (code >= 3000 && code <= 4999);
}

SockJS.prototype.close = function(code, reason) {
  // Step 1
  if (code && !userSetCode(code)) {
    throw new Error('InvalidAccessError: Invalid code');
  }
  // Step 2.4 states the max is 123 bytes, but we are just checking length
  if (reason && reason.length > 123) {
    throw new SyntaxError('reason argument has an invalid length');
  }

  // Step 3.1
  if (this.readyState === SockJS.CLOSING || this.readyState === SockJS.CLOSED) {
    return;
  }

  // TODO look at docs to determine how to set this
  var wasClean = true;
  this._close(code || 1000, reason || 'Normal closure', wasClean);
};

SockJS.prototype.send = function(data) {
  // #13 - convert anything non-string to string
  // TODO this currently turns objects into [object Object]
  if (typeof data !== 'string') {
    data = '' + data;
  }
  if (this.readyState === SockJS.CONNECTING) {
    throw new Error('InvalidStateError: The connection has not been established yet');
  }
  if (this.readyState !== SockJS.OPEN) {
    return;
  }
  this._transport.send(escape.quote(data));
};

SockJS.version = require('./version');

SockJS.CONNECTING = 0;
SockJS.OPEN = 1;
SockJS.CLOSING = 2;
SockJS.CLOSED = 3;

SockJS.prototype._receiveInfo = function(info, rtt) {
  debug('_receiveInfo', rtt);
  this._ir = null;
  if (!info) {
    this._close(1002, 'Cannot connect to server');
    return;
  }

  // establish a round-trip timeout (RTO) based on the
  // round-trip time (RTT)
  this._rto = this.countRTO(rtt);
  // allow server to override url used for the actual transport
  this._transUrl = info.base_url ? info.base_url : this.url;
  info = objectUtils.extend(info, this._urlInfo);
  debug('info', info);
  // determine list of desired and supported transports
  var enabledTransports = transports.filterToEnabled(this._transportsWhitelist, info);
  this._transports = enabledTransports.main;
  debug(this._transports.length + ' enabled transports');

  this._connect();
};

SockJS.prototype._connect = function() {
  for (var Transport = this._transports.shift(); Transport; Transport = this._transports.shift()) {
    debug('attempt', Transport.transportName);
    if (Transport.needBody) {
      if (!global.document.body ||
          (typeof global.document.readyState !== 'undefined' &&
            global.document.readyState !== 'complete' &&
            global.document.readyState !== 'interactive')) {
        debug('waiting for body');
        this._transports.unshift(Transport);
        eventUtils.attachEvent('load', this._connect.bind(this));
        return;
      }
    }

    // calculate timeout based on RTO and round trips. Default to 5s
    var timeoutMs = Math.max(this._timeout, (this._rto * Transport.roundTrips) || 5000);
    this._transportTimeoutId = setTimeout(this._transportTimeout.bind(this), timeoutMs);
    debug('using timeout', timeoutMs);

    var transportUrl = urlUtils.addPath(this._transUrl, '/' + this._server + '/' + this._generateSessionId());
    var options = this._transportOptions[Transport.transportName];
    debug('transport url', transportUrl);
    var transportObj = new Transport(transportUrl, this._transUrl, options);
    transportObj.on('message', this._transportMessage.bind(this));
    transportObj.once('close', this._transportClose.bind(this));
    transportObj.transportName = Transport.transportName;
    this._transport = transportObj;

    return;
  }
  this._close(2000, 'All transports failed', false);
};

SockJS.prototype._transportTimeout = function() {
  debug('_transportTimeout');
  if (this.readyState === SockJS.CONNECTING) {
    if (this._transport) {
      this._transport.close();
    }

    this._transportClose(2007, 'Transport timed out');
  }
};

SockJS.prototype._transportMessage = function(msg) {
  debug('_transportMessage', msg);
  var self = this
    , type = msg.slice(0, 1)
    , content = msg.slice(1)
    , payload
    ;

  // first check for messages that don't need a payload
  switch (type) {
    case 'o':
      this._open();
      return;
    case 'h':
      this.dispatchEvent(new Event('heartbeat'));
      debug('heartbeat', this.transport);
      return;
  }

  if (content) {
    try {
      payload = JSON3.parse(content);
    } catch (e) {
      debug('bad json', content);
    }
  }

  if (typeof payload === 'undefined') {
    debug('empty payload', content);
    return;
  }

  switch (type) {
    case 'a':
      if (Array.isArray(payload)) {
        payload.forEach(function(p) {
          debug('message', self.transport, p);
          self.dispatchEvent(new TransportMessageEvent(p));
        });
      }
      break;
    case 'm':
      debug('message', this.transport, payload);
      this.dispatchEvent(new TransportMessageEvent(payload));
      break;
    case 'c':
      if (Array.isArray(payload) && payload.length === 2) {
        this._close(payload[0], payload[1], true);
      }
      break;
  }
};

SockJS.prototype._transportClose = function(code, reason) {
  debug('_transportClose', this.transport, code, reason);
  if (this._transport) {
    this._transport.removeAllListeners();
    this._transport = null;
    this.transport = null;
  }

  if (!userSetCode(code) && code !== 2000 && this.readyState === SockJS.CONNECTING) {
    this._connect();
    return;
  }

  this._close(code, reason);
};

SockJS.prototype._open = function() {
  debug('_open', this._transport && this._transport.transportName, this.readyState);
  if (this.readyState === SockJS.CONNECTING) {
    if (this._transportTimeoutId) {
      clearTimeout(this._transportTimeoutId);
      this._transportTimeoutId = null;
    }
    this.readyState = SockJS.OPEN;
    this.transport = this._transport.transportName;
    this.dispatchEvent(new Event('open'));
    debug('connected', this.transport);
  } else {
    // The server might have been restarted, and lost track of our
    // connection.
    this._close(1006, 'Server lost session');
  }
};

SockJS.prototype._close = function(code, reason, wasClean) {
  debug('_close', this.transport, code, reason, wasClean, this.readyState);
  var forceFail = false;

  if (this._ir) {
    forceFail = true;
    this._ir.close();
    this._ir = null;
  }
  if (this._transport) {
    this._transport.close();
    this._transport = null;
    this.transport = null;
  }

  if (this.readyState === SockJS.CLOSED) {
    throw new Error('InvalidStateError: SockJS has already been closed');
  }

  this.readyState = SockJS.CLOSING;
  setTimeout(function() {
    this.readyState = SockJS.CLOSED;

    if (forceFail) {
      this.dispatchEvent(new Event('error'));
    }

    var e = new CloseEvent('close');
    e.wasClean = wasClean || false;
    e.code = code || 1000;
    e.reason = reason;

    this.dispatchEvent(e);
    this.onmessage = this.onclose = this.onerror = null;
    debug('disconnected');
  }.bind(this), 0);
};

// See: http://www.erg.abdn.ac.uk/~gerrit/dccp/notes/ccid2/rto_estimator/
// and RFC 2988.
SockJS.prototype.countRTO = function(rtt) {
  // In a local environment, when using IE8/9 and the `jsonp-polling`
  // transport the time needed to establish a connection (the time that pass
  // from the opening of the transport to the call of `_dispatchOpen`) is
  // around 200msec (the lower bound used in the article above) and this
  // causes spurious timeouts. For this reason we calculate a value slightly
  // larger than that used in the article.
  if (rtt > 100) {
    return 4 * rtt; // rto > 400msec
  }
  return 300 + rtt; // 300msec < rto <= 400msec
};

module.exports = function(availableTransports) {
  transports = transport(availableTransports);
  require('./iframe-bootstrap')(SockJS, availableTransports);
  return SockJS;
};

}).call(this,{ env: {} },typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./event/close":2,"./event/event":4,"./event/eventtarget":5,"./event/trans-message":6,"./iframe-bootstrap":8,"./info-receiver":12,"./location":13,"./shims":15,"./utils/browser":44,"./utils/escape":45,"./utils/event":46,"./utils/log":48,"./utils/object":49,"./utils/random":50,"./utils/transport":51,"./utils/url":52,"./version":53,"debug":55,"inherits":57,"json3":58,"url-parse":61}],15:[function(require,module,exports){
/* eslint-disable */
/* jscs: disable */
'use strict';

// pulled specific shims from https://github.com/es-shims/es5-shim

var ArrayPrototype = Array.prototype;
var ObjectPrototype = Object.prototype;
var FunctionPrototype = Function.prototype;
var StringPrototype = String.prototype;
var array_slice = ArrayPrototype.slice;

var _toString = ObjectPrototype.toString;
var isFunction = function (val) {
    return ObjectPrototype.toString.call(val) === '[object Function]';
};
var isArray = function isArray(obj) {
    return _toString.call(obj) === '[object Array]';
};
var isString = function isString(obj) {
    return _toString.call(obj) === '[object String]';
};

var supportsDescriptors = Object.defineProperty && (function () {
    try {
        Object.defineProperty({}, 'x', {});
        return true;
    } catch (e) { /* this is ES3 */
        return false;
    }
}());

// Define configurable, writable and non-enumerable props
// if they don't exist.
var defineProperty;
if (supportsDescriptors) {
    defineProperty = function (object, name, method, forceAssign) {
        if (!forceAssign && (name in object)) { return; }
        Object.defineProperty(object, name, {
            configurable: true,
            enumerable: false,
            writable: true,
            value: method
        });
    };
} else {
    defineProperty = function (object, name, method, forceAssign) {
        if (!forceAssign && (name in object)) { return; }
        object[name] = method;
    };
}
var defineProperties = function (object, map, forceAssign) {
    for (var name in map) {
        if (ObjectPrototype.hasOwnProperty.call(map, name)) {
          defineProperty(object, name, map[name], forceAssign);
        }
    }
};

var toObject = function (o) {
    if (o == null) { // this matches both null and undefined
        throw new TypeError("can't convert " + o + ' to object');
    }
    return Object(o);
};

//
// Util
// ======
//

// ES5 9.4
// http://es5.github.com/#x9.4
// http://jsperf.com/to-integer

function toInteger(num) {
    var n = +num;
    if (n !== n) { // isNaN
        n = 0;
    } else if (n !== 0 && n !== (1 / 0) && n !== -(1 / 0)) {
        n = (n > 0 || -1) * Math.floor(Math.abs(n));
    }
    return n;
}

function ToUint32(x) {
    return x >>> 0;
}

//
// Function
// ========
//

// ES-5 15.3.4.5
// http://es5.github.com/#x15.3.4.5

function Empty() {}

defineProperties(FunctionPrototype, {
    bind: function bind(that) { // .length is 1
        // 1. Let Target be the this value.
        var target = this;
        // 2. If IsCallable(Target) is false, throw a TypeError exception.
        if (!isFunction(target)) {
            throw new TypeError('Function.prototype.bind called on incompatible ' + target);
        }
        // 3. Let A be a new (possibly empty) internal list of all of the
        //   argument values provided after thisArg (arg1, arg2 etc), in order.
        // XXX slicedArgs will stand in for "A" if used
        var args = array_slice.call(arguments, 1); // for normal call
        // 4. Let F be a new native ECMAScript object.
        // 11. Set the [[Prototype]] internal property of F to the standard
        //   built-in Function prototype object as specified in 15.3.3.1.
        // 12. Set the [[Call]] internal property of F as described in
        //   15.3.4.5.1.
        // 13. Set the [[Construct]] internal property of F as described in
        //   15.3.4.5.2.
        // 14. Set the [[HasInstance]] internal property of F as described in
        //   15.3.4.5.3.
        var binder = function () {

            if (this instanceof bound) {
                // 15.3.4.5.2 [[Construct]]
                // When the [[Construct]] internal method of a function object,
                // F that was created using the bind function is called with a
                // list of arguments ExtraArgs, the following steps are taken:
                // 1. Let target be the value of F's [[TargetFunction]]
                //   internal property.
                // 2. If target has no [[Construct]] internal method, a
                //   TypeError exception is thrown.
                // 3. Let boundArgs be the value of F's [[BoundArgs]] internal
                //   property.
                // 4. Let args be a new list containing the same values as the
                //   list boundArgs in the same order followed by the same
                //   values as the list ExtraArgs in the same order.
                // 5. Return the result of calling the [[Construct]] internal
                //   method of target providing args as the arguments.

                var result = target.apply(
                    this,
                    args.concat(array_slice.call(arguments))
                );
                if (Object(result) === result) {
                    return result;
                }
                return this;

            } else {
                // 15.3.4.5.1 [[Call]]
                // When the [[Call]] internal method of a function object, F,
                // which was created using the bind function is called with a
                // this value and a list of arguments ExtraArgs, the following
                // steps are taken:
                // 1. Let boundArgs be the value of F's [[BoundArgs]] internal
                //   property.
                // 2. Let boundThis be the value of F's [[BoundThis]] internal
                //   property.
                // 3. Let target be the value of F's [[TargetFunction]] internal
                //   property.
                // 4. Let args be a new list containing the same values as the
                //   list boundArgs in the same order followed by the same
                //   values as the list ExtraArgs in the same order.
                // 5. Return the result of calling the [[Call]] internal method
                //   of target providing boundThis as the this value and
                //   providing args as the arguments.

                // equiv: target.call(this, ...boundArgs, ...args)
                return target.apply(
                    that,
                    args.concat(array_slice.call(arguments))
                );

            }

        };

        // 15. If the [[Class]] internal property of Target is "Function", then
        //     a. Let L be the length property of Target minus the length of A.
        //     b. Set the length own property of F to either 0 or L, whichever is
        //       larger.
        // 16. Else set the length own property of F to 0.

        var boundLength = Math.max(0, target.length - args.length);

        // 17. Set the attributes of the length own property of F to the values
        //   specified in 15.3.5.1.
        var boundArgs = [];
        for (var i = 0; i < boundLength; i++) {
            boundArgs.push('$' + i);
        }

        // XXX Build a dynamic function with desired amount of arguments is the only
        // way to set the length property of a function.
        // In environments where Content Security Policies enabled (Chrome extensions,
        // for ex.) all use of eval or Function costructor throws an exception.
        // However in all of these environments Function.prototype.bind exists
        // and so this code will never be executed.
        var bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this, arguments); }')(binder);

        if (target.prototype) {
            Empty.prototype = target.prototype;
            bound.prototype = new Empty();
            // Clean up dangling references.
            Empty.prototype = null;
        }

        // TODO
        // 18. Set the [[Extensible]] internal property of F to true.

        // TODO
        // 19. Let thrower be the [[ThrowTypeError]] function Object (13.2.3).
        // 20. Call the [[DefineOwnProperty]] internal method of F with
        //   arguments "caller", PropertyDescriptor {[[Get]]: thrower, [[Set]]:
        //   thrower, [[Enumerable]]: false, [[Configurable]]: false}, and
        //   false.
        // 21. Call the [[DefineOwnProperty]] internal method of F with
        //   arguments "arguments", PropertyDescriptor {[[Get]]: thrower,
        //   [[Set]]: thrower, [[Enumerable]]: false, [[Configurable]]: false},
        //   and false.

        // TODO
        // NOTE Function objects created using Function.prototype.bind do not
        // have a prototype property or the [[Code]], [[FormalParameters]], and
        // [[Scope]] internal properties.
        // XXX can't delete prototype in pure-js.

        // 22. Return F.
        return bound;
    }
});

//
// Array
// =====
//

// ES5 15.4.3.2
// http://es5.github.com/#x15.4.3.2
// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/isArray
defineProperties(Array, { isArray: isArray });


var boxedString = Object('a');
var splitString = boxedString[0] !== 'a' || !(0 in boxedString);

var properlyBoxesContext = function properlyBoxed(method) {
    // Check node 0.6.21 bug where third parameter is not boxed
    var properlyBoxesNonStrict = true;
    var properlyBoxesStrict = true;
    if (method) {
        method.call('foo', function (_, __, context) {
            if (typeof context !== 'object') { properlyBoxesNonStrict = false; }
        });

        method.call([1], function () {
            'use strict';
            properlyBoxesStrict = typeof this === 'string';
        }, 'x');
    }
    return !!method && properlyBoxesNonStrict && properlyBoxesStrict;
};

defineProperties(ArrayPrototype, {
    forEach: function forEach(fun /*, thisp*/) {
        var object = toObject(this),
            self = splitString && isString(this) ? this.split('') : object,
            thisp = arguments[1],
            i = -1,
            length = self.length >>> 0;

        // If no callback function or if callback is not a callable function
        if (!isFunction(fun)) {
            throw new TypeError(); // TODO message
        }

        while (++i < length) {
            if (i in self) {
                // Invoke the callback function with call, passing arguments:
                // context, property value, property key, thisArg object
                // context
                fun.call(thisp, self[i], i, object);
            }
        }
    }
}, !properlyBoxesContext(ArrayPrototype.forEach));

// ES5 15.4.4.14
// http://es5.github.com/#x15.4.4.14
// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/indexOf
var hasFirefox2IndexOfBug = Array.prototype.indexOf && [0, 1].indexOf(1, 2) !== -1;
defineProperties(ArrayPrototype, {
    indexOf: function indexOf(sought /*, fromIndex */ ) {
        var self = splitString && isString(this) ? this.split('') : toObject(this),
            length = self.length >>> 0;

        if (!length) {
            return -1;
        }

        var i = 0;
        if (arguments.length > 1) {
            i = toInteger(arguments[1]);
        }

        // handle negative indices
        i = i >= 0 ? i : Math.max(0, length + i);
        for (; i < length; i++) {
            if (i in self && self[i] === sought) {
                return i;
            }
        }
        return -1;
    }
}, hasFirefox2IndexOfBug);

//
// String
// ======
//

// ES5 15.5.4.14
// http://es5.github.com/#x15.5.4.14

// [bugfix, IE lt 9, firefox 4, Konqueror, Opera, obscure browsers]
// Many browsers do not split properly with regular expressions or they
// do not perform the split correctly under obscure conditions.
// See http://blog.stevenlevithan.com/archives/cross-browser-split
// I've tested in many browsers and this seems to cover the deviant ones:
//    'ab'.split(/(?:ab)*/) should be ["", ""], not [""]
//    '.'.split(/(.?)(.?)/) should be ["", ".", "", ""], not ["", ""]
//    'tesst'.split(/(s)*/) should be ["t", undefined, "e", "s", "t"], not
//       [undefined, "t", undefined, "e", ...]
//    ''.split(/.?/) should be [], not [""]
//    '.'.split(/()()/) should be ["."], not ["", "", "."]

var string_split = StringPrototype.split;
if (
    'ab'.split(/(?:ab)*/).length !== 2 ||
    '.'.split(/(.?)(.?)/).length !== 4 ||
    'tesst'.split(/(s)*/)[1] === 't' ||
    'test'.split(/(?:)/, -1).length !== 4 ||
    ''.split(/.?/).length ||
    '.'.split(/()()/).length > 1
) {
    (function () {
        var compliantExecNpcg = /()??/.exec('')[1] === void 0; // NPCG: nonparticipating capturing group

        StringPrototype.split = function (separator, limit) {
            var string = this;
            if (separator === void 0 && limit === 0) {
                return [];
            }

            // If `separator` is not a regex, use native split
            if (_toString.call(separator) !== '[object RegExp]') {
                return string_split.call(this, separator, limit);
            }

            var output = [],
                flags = (separator.ignoreCase ? 'i' : '') +
                        (separator.multiline  ? 'm' : '') +
                        (separator.extended   ? 'x' : '') + // Proposed for ES6
                        (separator.sticky     ? 'y' : ''), // Firefox 3+
                lastLastIndex = 0,
                // Make `global` and avoid `lastIndex` issues by working with a copy
                separator2, match, lastIndex, lastLength;
            separator = new RegExp(separator.source, flags + 'g');
            string += ''; // Type-convert
            if (!compliantExecNpcg) {
                // Doesn't need flags gy, but they don't hurt
                separator2 = new RegExp('^' + separator.source + '$(?!\\s)', flags);
            }
            /* Values for `limit`, per the spec:
             * If undefined: 4294967295 // Math.pow(2, 32) - 1
             * If 0, Infinity, or NaN: 0
             * If positive number: limit = Math.floor(limit); if (limit > 4294967295) limit -= 4294967296;
             * If negative number: 4294967296 - Math.floor(Math.abs(limit))
             * If other: Type-convert, then use the above rules
             */
            limit = limit === void 0 ?
                -1 >>> 0 : // Math.pow(2, 32) - 1
                ToUint32(limit);
            while (match = separator.exec(string)) {
                // `separator.lastIndex` is not reliable cross-browser
                lastIndex = match.index + match[0].length;
                if (lastIndex > lastLastIndex) {
                    output.push(string.slice(lastLastIndex, match.index));
                    // Fix browsers whose `exec` methods don't consistently return `undefined` for
                    // nonparticipating capturing groups
                    if (!compliantExecNpcg && match.length > 1) {
                        match[0].replace(separator2, function () {
                            for (var i = 1; i < arguments.length - 2; i++) {
                                if (arguments[i] === void 0) {
                                    match[i] = void 0;
                                }
                            }
                        });
                    }
                    if (match.length > 1 && match.index < string.length) {
                        ArrayPrototype.push.apply(output, match.slice(1));
                    }
                    lastLength = match[0].length;
                    lastLastIndex = lastIndex;
                    if (output.length >= limit) {
                        break;
                    }
                }
                if (separator.lastIndex === match.index) {
                    separator.lastIndex++; // Avoid an infinite loop
                }
            }
            if (lastLastIndex === string.length) {
                if (lastLength || !separator.test('')) {
                    output.push('');
                }
            } else {
                output.push(string.slice(lastLastIndex));
            }
            return output.length > limit ? output.slice(0, limit) : output;
        };
    }());

// [bugfix, chrome]
// If separator is undefined, then the result array contains just one String,
// which is the this value (converted to a String). If limit is not undefined,
// then the output array is truncated so that it contains no more than limit
// elements.
// "0".split(undefined, 0) -> []
} else if ('0'.split(void 0, 0).length) {
    StringPrototype.split = function split(separator, limit) {
        if (separator === void 0 && limit === 0) { return []; }
        return string_split.call(this, separator, limit);
    };
}

// ECMA-262, 3rd B.2.3
// Not an ECMAScript standard, although ECMAScript 3rd Edition has a
// non-normative section suggesting uniform semantics and it should be
// normalized across all browsers
// [bugfix, IE lt 9] IE < 9 substr() with negative value not working in IE
var string_substr = StringPrototype.substr;
var hasNegativeSubstrBug = ''.substr && '0b'.substr(-1) !== 'b';
defineProperties(StringPrototype, {
    substr: function substr(start, length) {
        return string_substr.call(
            this,
            start < 0 ? ((start = this.length + start) < 0 ? 0 : start) : start,
            length
        );
    }
}, hasNegativeSubstrBug);

},{}],16:[function(require,module,exports){
'use strict';

module.exports = [
  // streaming transports
  require('./transport/websocket')
, require('./transport/xhr-streaming')
, require('./transport/xdr-streaming')
, require('./transport/eventsource')
, require('./transport/lib/iframe-wrap')(require('./transport/eventsource'))

  // polling transports
, require('./transport/htmlfile')
, require('./transport/lib/iframe-wrap')(require('./transport/htmlfile'))
, require('./transport/xhr-polling')
, require('./transport/xdr-polling')
, require('./transport/lib/iframe-wrap')(require('./transport/xhr-polling'))
, require('./transport/jsonp-polling')
];

},{"./transport/eventsource":20,"./transport/htmlfile":21,"./transport/jsonp-polling":23,"./transport/lib/iframe-wrap":26,"./transport/websocket":38,"./transport/xdr-polling":39,"./transport/xdr-streaming":40,"./transport/xhr-polling":41,"./transport/xhr-streaming":42}],17:[function(require,module,exports){
(function (process,global){
'use strict';

var EventEmitter = require('events').EventEmitter
  , inherits = require('inherits')
  , utils = require('../../utils/event')
  , urlUtils = require('../../utils/url')
  , XHR = global.XMLHttpRequest
  ;

var debug = function() {};
if (process.env.NODE_ENV !== 'production') {
  debug = require('debug')('sockjs-client:browser:xhr');
}

function AbstractXHRObject(method, url, payload, opts) {
  debug(method, url);
  var self = this;
  EventEmitter.call(this);

  setTimeout(function () {
    self._start(method, url, payload, opts);
  }, 0);
}

inherits(AbstractXHRObject, EventEmitter);

AbstractXHRObject.prototype._start = function(method, url, payload, opts) {
  var self = this;

  try {
    this.xhr = new XHR();
  } catch (x) {
    // intentionally empty
  }

  if (!this.xhr) {
    debug('no xhr');
    this.emit('finish', 0, 'no xhr support');
    this._cleanup();
    return;
  }

  // several browsers cache POSTs
  url = urlUtils.addQuery(url, 't=' + (+new Date()));

  // Explorer tends to keep connection open, even after the
  // tab gets closed: http://bugs.jquery.com/ticket/5280
  this.unloadRef = utils.unloadAdd(function() {
    debug('unload cleanup');
    self._cleanup(true);
  });
  try {
    this.xhr.open(method, url, true);
    if (this.timeout && 'timeout' in this.xhr) {
      this.xhr.timeout = this.timeout;
      this.xhr.ontimeout = function() {
        debug('xhr timeout');
        self.emit('finish', 0, '');
        self._cleanup(false);
      };
    }
  } catch (e) {
    debug('exception', e);
    // IE raises an exception on wrong port.
    this.emit('finish', 0, '');
    this._cleanup(false);
    return;
  }

  if ((!opts || !opts.noCredentials) && AbstractXHRObject.supportsCORS) {
    debug('withCredentials');
    // Mozilla docs says https://developer.mozilla.org/en/XMLHttpRequest :
    // "This never affects same-site requests."

    this.xhr.withCredentials = true;
  }
  if (opts && opts.headers) {
    for (var key in opts.headers) {
      this.xhr.setRequestHeader(key, opts.headers[key]);
    }
  }

  this.xhr.onreadystatechange = function() {
    if (self.xhr) {
      var x = self.xhr;
      var text, status;
      debug('readyState', x.readyState);
      switch (x.readyState) {
      case 3:
        // IE doesn't like peeking into responseText or status
        // on Microsoft.XMLHTTP and readystate=3
        try {
          status = x.status;
          text = x.responseText;
        } catch (e) {
          // intentionally empty
        }
        debug('status', status);
        // IE returns 1223 for 204: http://bugs.jquery.com/ticket/1450
        if (status === 1223) {
          status = 204;
        }

        // IE does return readystate == 3 for 404 answers.
        if (status === 200 && text && text.length > 0) {
          debug('chunk');
          self.emit('chunk', status, text);
        }
        break;
      case 4:
        status = x.status;
        debug('status', status);
        // IE returns 1223 for 204: http://bugs.jquery.com/ticket/1450
        if (status === 1223) {
          status = 204;
        }
        // IE returns this for a bad port
        // http://msdn.microsoft.com/en-us/library/windows/desktop/aa383770(v=vs.85).aspx
        if (status === 12005 || status === 12029) {
          status = 0;
        }

        debug('finish', status, x.responseText);
        self.emit('finish', status, x.responseText);
        self._cleanup(false);
        break;
      }
    }
  };

  try {
    self.xhr.send(payload);
  } catch (e) {
    self.emit('finish', 0, '');
    self._cleanup(false);
  }
};

AbstractXHRObject.prototype._cleanup = function(abort) {
  debug('cleanup');
  if (!this.xhr) {
    return;
  }
  this.removeAllListeners();
  utils.unloadDel(this.unloadRef);

  // IE needs this field to be a function
  this.xhr.onreadystatechange = function() {};
  if (this.xhr.ontimeout) {
    this.xhr.ontimeout = null;
  }

  if (abort) {
    try {
      this.xhr.abort();
    } catch (x) {
      // intentionally empty
    }
  }
  this.unloadRef = this.xhr = null;
};

AbstractXHRObject.prototype.close = function() {
  debug('close');
  this._cleanup(true);
};

AbstractXHRObject.enabled = !!XHR;
// override XMLHttpRequest for IE6/7
// obfuscate to avoid firewalls
var axo = ['Active'].concat('Object').join('X');
if (!AbstractXHRObject.enabled && (axo in global)) {
  debug('overriding xmlhttprequest');
  XHR = function() {
    try {
      return new global[axo]('Microsoft.XMLHTTP');
    } catch (e) {
      return null;
    }
  };
  AbstractXHRObject.enabled = !!new XHR();
}

var cors = false;
try {
  cors = 'withCredentials' in new XHR();
} catch (ignored) {
  // intentionally empty
}

AbstractXHRObject.supportsCORS = cors;

module.exports = AbstractXHRObject;

}).call(this,{ env: {} },typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../../utils/event":46,"../../utils/url":52,"debug":55,"events":3,"inherits":57}],18:[function(require,module,exports){
(function (global){
module.exports = global.EventSource;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],19:[function(require,module,exports){
(function (global){
'use strict';

var Driver = global.WebSocket || global.MozWebSocket;
if (Driver) {
	module.exports = function WebSocketBrowserDriver(url) {
		return new Driver(url);
	};
} else {
	module.exports = undefined;
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],20:[function(require,module,exports){
'use strict';

var inherits = require('inherits')
  , AjaxBasedTransport = require('./lib/ajax-based')
  , EventSourceReceiver = require('./receiver/eventsource')
  , XHRCorsObject = require('./sender/xhr-cors')
  , EventSourceDriver = require('eventsource')
  ;

function EventSourceTransport(transUrl) {
  if (!EventSourceTransport.enabled()) {
    throw new Error('Transport created when disabled');
  }

  AjaxBasedTransport.call(this, transUrl, '/eventsource', EventSourceReceiver, XHRCorsObject);
}

inherits(EventSourceTransport, AjaxBasedTransport);

EventSourceTransport.enabled = function() {
  return !!EventSourceDriver;
};

EventSourceTransport.transportName = 'eventsource';
EventSourceTransport.roundTrips = 2;

module.exports = EventSourceTransport;

},{"./lib/ajax-based":24,"./receiver/eventsource":29,"./sender/xhr-cors":35,"eventsource":18,"inherits":57}],21:[function(require,module,exports){
'use strict';

var inherits = require('inherits')
  , HtmlfileReceiver = require('./receiver/htmlfile')
  , XHRLocalObject = require('./sender/xhr-local')
  , AjaxBasedTransport = require('./lib/ajax-based')
  ;

function HtmlFileTransport(transUrl) {
  if (!HtmlfileReceiver.enabled) {
    throw new Error('Transport created when disabled');
  }
  AjaxBasedTransport.call(this, transUrl, '/htmlfile', HtmlfileReceiver, XHRLocalObject);
}

inherits(HtmlFileTransport, AjaxBasedTransport);

HtmlFileTransport.enabled = function(info) {
  return HtmlfileReceiver.enabled && info.sameOrigin;
};

HtmlFileTransport.transportName = 'htmlfile';
HtmlFileTransport.roundTrips = 2;

module.exports = HtmlFileTransport;

},{"./lib/ajax-based":24,"./receiver/htmlfile":30,"./sender/xhr-local":37,"inherits":57}],22:[function(require,module,exports){
(function (process){
'use strict';

// Few cool transports do work only for same-origin. In order to make
// them work cross-domain we shall use iframe, served from the
// remote domain. New browsers have capabilities to communicate with
// cross domain iframe using postMessage(). In IE it was implemented
// from IE 8+, but of course, IE got some details wrong:
//    http://msdn.microsoft.com/en-us/library/cc197015(v=VS.85).aspx
//    http://stevesouders.com/misc/test-postmessage.php

var inherits = require('inherits')
  , JSON3 = require('json3')
  , EventEmitter = require('events').EventEmitter
  , version = require('../version')
  , urlUtils = require('../utils/url')
  , iframeUtils = require('../utils/iframe')
  , eventUtils = require('../utils/event')
  , random = require('../utils/random')
  ;

var debug = function() {};
if (process.env.NODE_ENV !== 'production') {
  debug = require('debug')('sockjs-client:transport:iframe');
}

function IframeTransport(transport, transUrl, baseUrl) {
  if (!IframeTransport.enabled()) {
    throw new Error('Transport created when disabled');
  }
  EventEmitter.call(this);

  var self = this;
  this.origin = urlUtils.getOrigin(baseUrl);
  this.baseUrl = baseUrl;
  this.transUrl = transUrl;
  this.transport = transport;
  this.windowId = random.string(8);

  var iframeUrl = urlUtils.addPath(baseUrl, '/iframe.html') + '#' + this.windowId;
  debug(transport, transUrl, iframeUrl);

  this.iframeObj = iframeUtils.createIframe(iframeUrl, function(r) {
    debug('err callback');
    self.emit('close', 1006, 'Unable to load an iframe (' + r + ')');
    self.close();
  });

  this.onmessageCallback = this._message.bind(this);
  eventUtils.attachEvent('message', this.onmessageCallback);
}

inherits(IframeTransport, EventEmitter);

IframeTransport.prototype.close = function() {
  debug('close');
  this.removeAllListeners();
  if (this.iframeObj) {
    eventUtils.detachEvent('message', this.onmessageCallback);
    try {
      // When the iframe is not loaded, IE raises an exception
      // on 'contentWindow'.
      this.postMessage('c');
    } catch (x) {
      // intentionally empty
    }
    this.iframeObj.cleanup();
    this.iframeObj = null;
    this.onmessageCallback = this.iframeObj = null;
  }
};

IframeTransport.prototype._message = function(e) {
  debug('message', e.data);
  if (!urlUtils.isOriginEqual(e.origin, this.origin)) {
    debug('not same origin', e.origin, this.origin);
    return;
  }

  var iframeMessage;
  try {
    iframeMessage = JSON3.parse(e.data);
  } catch (ignored) {
    debug('bad json', e.data);
    return;
  }

  if (iframeMessage.windowId !== this.windowId) {
    debug('mismatched window id', iframeMessage.windowId, this.windowId);
    return;
  }

  switch (iframeMessage.type) {
  case 's':
    this.iframeObj.loaded();
    // window global dependency
    this.postMessage('s', JSON3.stringify([
      version
    , this.transport
    , this.transUrl
    , this.baseUrl
    ]));
    break;
  case 't':
    this.emit('message', iframeMessage.data);
    break;
  case 'c':
    var cdata;
    try {
      cdata = JSON3.parse(iframeMessage.data);
    } catch (ignored) {
      debug('bad json', iframeMessage.data);
      return;
    }
    this.emit('close', cdata[0], cdata[1]);
    this.close();
    break;
  }
};

IframeTransport.prototype.postMessage = function(type, data) {
  debug('postMessage', type, data);
  this.iframeObj.post(JSON3.stringify({
    windowId: this.windowId
  , type: type
  , data: data || ''
  }), this.origin);
};

IframeTransport.prototype.send = function(message) {
  debug('send', message);
  this.postMessage('m', message);
};

IframeTransport.enabled = function() {
  return iframeUtils.iframeEnabled;
};

IframeTransport.transportName = 'iframe';
IframeTransport.roundTrips = 2;

module.exports = IframeTransport;

}).call(this,{ env: {} })

},{"../utils/event":46,"../utils/iframe":47,"../utils/random":50,"../utils/url":52,"../version":53,"debug":55,"events":3,"inherits":57,"json3":58}],23:[function(require,module,exports){
(function (global){
'use strict';

// The simplest and most robust transport, using the well-know cross
// domain hack - JSONP. This transport is quite inefficient - one
// message could use up to one http request. But at least it works almost
// everywhere.
// Known limitations:
//   o you will get a spinning cursor
//   o for Konqueror a dumb timer is needed to detect errors

var inherits = require('inherits')
  , SenderReceiver = require('./lib/sender-receiver')
  , JsonpReceiver = require('./receiver/jsonp')
  , jsonpSender = require('./sender/jsonp')
  ;

function JsonPTransport(transUrl) {
  if (!JsonPTransport.enabled()) {
    throw new Error('Transport created when disabled');
  }
  SenderReceiver.call(this, transUrl, '/jsonp', jsonpSender, JsonpReceiver);
}

inherits(JsonPTransport, SenderReceiver);

JsonPTransport.enabled = function() {
  return !!global.document;
};

JsonPTransport.transportName = 'jsonp-polling';
JsonPTransport.roundTrips = 1;
JsonPTransport.needBody = true;

module.exports = JsonPTransport;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./lib/sender-receiver":28,"./receiver/jsonp":31,"./sender/jsonp":33,"inherits":57}],24:[function(require,module,exports){
(function (process){
'use strict';

var inherits = require('inherits')
  , urlUtils = require('../../utils/url')
  , SenderReceiver = require('./sender-receiver')
  ;

var debug = function() {};
if (process.env.NODE_ENV !== 'production') {
  debug = require('debug')('sockjs-client:ajax-based');
}

function createAjaxSender(AjaxObject) {
  return function(url, payload, callback) {
    debug('create ajax sender', url, payload);
    var opt = {};
    if (typeof payload === 'string') {
      opt.headers = {'Content-type': 'text/plain'};
    }
    var ajaxUrl = urlUtils.addPath(url, '/xhr_send');
    var xo = new AjaxObject('POST', ajaxUrl, payload, opt);
    xo.once('finish', function(status) {
      debug('finish', status);
      xo = null;

      if (status !== 200 && status !== 204) {
        return callback(new Error('http status ' + status));
      }
      callback();
    });
    return function() {
      debug('abort');
      xo.close();
      xo = null;

      var err = new Error('Aborted');
      err.code = 1000;
      callback(err);
    };
  };
}

function AjaxBasedTransport(transUrl, urlSuffix, Receiver, AjaxObject) {
  SenderReceiver.call(this, transUrl, urlSuffix, createAjaxSender(AjaxObject), Receiver, AjaxObject);
}

inherits(AjaxBasedTransport, SenderReceiver);

module.exports = AjaxBasedTransport;

}).call(this,{ env: {} })

},{"../../utils/url":52,"./sender-receiver":28,"debug":55,"inherits":57}],25:[function(require,module,exports){
(function (process){
'use strict';

var inherits = require('inherits')
  , EventEmitter = require('events').EventEmitter
  ;

var debug = function() {};
if (process.env.NODE_ENV !== 'production') {
  debug = require('debug')('sockjs-client:buffered-sender');
}

function BufferedSender(url, sender) {
  debug(url);
  EventEmitter.call(this);
  this.sendBuffer = [];
  this.sender = sender;
  this.url = url;
}

inherits(BufferedSender, EventEmitter);

BufferedSender.prototype.send = function(message) {
  debug('send', message);
  this.sendBuffer.push(message);
  if (!this.sendStop) {
    this.sendSchedule();
  }
};

// For polling transports in a situation when in the message callback,
// new message is being send. If the sending connection was started
// before receiving one, it is possible to saturate the network and
// timeout due to the lack of receiving socket. To avoid that we delay
// sending messages by some small time, in order to let receiving
// connection be started beforehand. This is only a halfmeasure and
// does not fix the big problem, but it does make the tests go more
// stable on slow networks.
BufferedSender.prototype.sendScheduleWait = function() {
  debug('sendScheduleWait');
  var self = this;
  var tref;
  this.sendStop = function() {
    debug('sendStop');
    self.sendStop = null;
    clearTimeout(tref);
  };
  tref = setTimeout(function() {
    debug('timeout');
    self.sendStop = null;
    self.sendSchedule();
  }, 25);
};

BufferedSender.prototype.sendSchedule = function() {
  debug('sendSchedule', this.sendBuffer.length);
  var self = this;
  if (this.sendBuffer.length > 0) {
    var payload = '[' + this.sendBuffer.join(',') + ']';
    this.sendStop = this.sender(this.url, payload, function(err) {
      self.sendStop = null;
      if (err) {
        debug('error', err);
        self.emit('close', err.code || 1006, 'Sending error: ' + err);
        self.close();
      } else {
        self.sendScheduleWait();
      }
    });
    this.sendBuffer = [];
  }
};

BufferedSender.prototype._cleanup = function() {
  debug('_cleanup');
  this.removeAllListeners();
};

BufferedSender.prototype.close = function() {
  debug('close');
  this._cleanup();
  if (this.sendStop) {
    this.sendStop();
    this.sendStop = null;
  }
};

module.exports = BufferedSender;

}).call(this,{ env: {} })

},{"debug":55,"events":3,"inherits":57}],26:[function(require,module,exports){
(function (global){
'use strict';

var inherits = require('inherits')
  , IframeTransport = require('../iframe')
  , objectUtils = require('../../utils/object')
  ;

module.exports = function(transport) {

  function IframeWrapTransport(transUrl, baseUrl) {
    IframeTransport.call(this, transport.transportName, transUrl, baseUrl);
  }

  inherits(IframeWrapTransport, IframeTransport);

  IframeWrapTransport.enabled = function(url, info) {
    if (!global.document) {
      return false;
    }

    var iframeInfo = objectUtils.extend({}, info);
    iframeInfo.sameOrigin = true;
    return transport.enabled(iframeInfo) && IframeTransport.enabled();
  };

  IframeWrapTransport.transportName = 'iframe-' + transport.transportName;
  IframeWrapTransport.needBody = true;
  IframeWrapTransport.roundTrips = IframeTransport.roundTrips + transport.roundTrips - 1; // html, javascript (2) + transport - no CORS (1)

  IframeWrapTransport.facadeTransport = transport;

  return IframeWrapTransport;
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../../utils/object":49,"../iframe":22,"inherits":57}],27:[function(require,module,exports){
(function (process){
'use strict';

var inherits = require('inherits')
  , EventEmitter = require('events').EventEmitter
  ;

var debug = function() {};
if (process.env.NODE_ENV !== 'production') {
  debug = require('debug')('sockjs-client:polling');
}

function Polling(Receiver, receiveUrl, AjaxObject) {
  debug(receiveUrl);
  EventEmitter.call(this);
  this.Receiver = Receiver;
  this.receiveUrl = receiveUrl;
  this.AjaxObject = AjaxObject;
  this._scheduleReceiver();
}

inherits(Polling, EventEmitter);

Polling.prototype._scheduleReceiver = function() {
  debug('_scheduleReceiver');
  var self = this;
  var poll = this.poll = new this.Receiver(this.receiveUrl, this.AjaxObject);

  poll.on('message', function(msg) {
    debug('message', msg);
    self.emit('message', msg);
  });

  poll.once('close', function(code, reason) {
    debug('close', code, reason, self.pollIsClosing);
    self.poll = poll = null;

    if (!self.pollIsClosing) {
      if (reason === 'network') {
        self._scheduleReceiver();
      } else {
        self.emit('close', code || 1006, reason);
        self.removeAllListeners();
      }
    }
  });
};

Polling.prototype.abort = function() {
  debug('abort');
  this.removeAllListeners();
  this.pollIsClosing = true;
  if (this.poll) {
    this.poll.abort();
  }
};

module.exports = Polling;

}).call(this,{ env: {} })

},{"debug":55,"events":3,"inherits":57}],28:[function(require,module,exports){
(function (process){
'use strict';

var inherits = require('inherits')
  , urlUtils = require('../../utils/url')
  , BufferedSender = require('./buffered-sender')
  , Polling = require('./polling')
  ;

var debug = function() {};
if (process.env.NODE_ENV !== 'production') {
  debug = require('debug')('sockjs-client:sender-receiver');
}

function SenderReceiver(transUrl, urlSuffix, senderFunc, Receiver, AjaxObject) {
  var pollUrl = urlUtils.addPath(transUrl, urlSuffix);
  debug(pollUrl);
  var self = this;
  BufferedSender.call(this, transUrl, senderFunc);

  this.poll = new Polling(Receiver, pollUrl, AjaxObject);
  this.poll.on('message', function(msg) {
    debug('poll message', msg);
    self.emit('message', msg);
  });
  this.poll.once('close', function(code, reason) {
    debug('poll close', code, reason);
    self.poll = null;
    self.emit('close', code, reason);
    self.close();
  });
}

inherits(SenderReceiver, BufferedSender);

SenderReceiver.prototype.close = function() {
  BufferedSender.prototype.close.call(this);
  debug('close');
  this.removeAllListeners();
  if (this.poll) {
    this.poll.abort();
    this.poll = null;
  }
};

module.exports = SenderReceiver;

}).call(this,{ env: {} })

},{"../../utils/url":52,"./buffered-sender":25,"./polling":27,"debug":55,"inherits":57}],29:[function(require,module,exports){
(function (process){
'use strict';

var inherits = require('inherits')
  , EventEmitter = require('events').EventEmitter
  , EventSourceDriver = require('eventsource')
  ;

var debug = function() {};
if (process.env.NODE_ENV !== 'production') {
  debug = require('debug')('sockjs-client:receiver:eventsource');
}

function EventSourceReceiver(url) {
  debug(url);
  EventEmitter.call(this);

  var self = this;
  var es = this.es = new EventSourceDriver(url);
  es.onmessage = function(e) {
    debug('message', e.data);
    self.emit('message', decodeURI(e.data));
  };
  es.onerror = function(e) {
    debug('error', es.readyState, e);
    // ES on reconnection has readyState = 0 or 1.
    // on network error it's CLOSED = 2
    var reason = (es.readyState !== 2 ? 'network' : 'permanent');
    self._cleanup();
    self._close(reason);
  };
}

inherits(EventSourceReceiver, EventEmitter);

EventSourceReceiver.prototype.abort = function() {
  debug('abort');
  this._cleanup();
  this._close('user');
};

EventSourceReceiver.prototype._cleanup = function() {
  debug('cleanup');
  var es = this.es;
  if (es) {
    es.onmessage = es.onerror = null;
    es.close();
    this.es = null;
  }
};

EventSourceReceiver.prototype._close = function(reason) {
  debug('close', reason);
  var self = this;
  // Safari and chrome < 15 crash if we close window before
  // waiting for ES cleanup. See:
  // https://code.google.com/p/chromium/issues/detail?id=89155
  setTimeout(function() {
    self.emit('close', null, reason);
    self.removeAllListeners();
  }, 200);
};

module.exports = EventSourceReceiver;

}).call(this,{ env: {} })

},{"debug":55,"events":3,"eventsource":18,"inherits":57}],30:[function(require,module,exports){
(function (process,global){
'use strict';

var inherits = require('inherits')
  , iframeUtils = require('../../utils/iframe')
  , urlUtils = require('../../utils/url')
  , EventEmitter = require('events').EventEmitter
  , random = require('../../utils/random')
  ;

var debug = function() {};
if (process.env.NODE_ENV !== 'production') {
  debug = require('debug')('sockjs-client:receiver:htmlfile');
}

function HtmlfileReceiver(url) {
  debug(url);
  EventEmitter.call(this);
  var self = this;
  iframeUtils.polluteGlobalNamespace();

  this.id = 'a' + random.string(6);
  url = urlUtils.addQuery(url, 'c=' + decodeURIComponent(iframeUtils.WPrefix + '.' + this.id));

  debug('using htmlfile', HtmlfileReceiver.htmlfileEnabled);
  var constructFunc = HtmlfileReceiver.htmlfileEnabled ?
      iframeUtils.createHtmlfile : iframeUtils.createIframe;

  global[iframeUtils.WPrefix][this.id] = {
    start: function() {
      debug('start');
      self.iframeObj.loaded();
    }
  , message: function(data) {
      debug('message', data);
      self.emit('message', data);
    }
  , stop: function() {
      debug('stop');
      self._cleanup();
      self._close('network');
    }
  };
  this.iframeObj = constructFunc(url, function() {
    debug('callback');
    self._cleanup();
    self._close('permanent');
  });
}

inherits(HtmlfileReceiver, EventEmitter);

HtmlfileReceiver.prototype.abort = function() {
  debug('abort');
  this._cleanup();
  this._close('user');
};

HtmlfileReceiver.prototype._cleanup = function() {
  debug('_cleanup');
  if (this.iframeObj) {
    this.iframeObj.cleanup();
    this.iframeObj = null;
  }
  delete global[iframeUtils.WPrefix][this.id];
};

HtmlfileReceiver.prototype._close = function(reason) {
  debug('_close', reason);
  this.emit('close', null, reason);
  this.removeAllListeners();
};

HtmlfileReceiver.htmlfileEnabled = false;

// obfuscate to avoid firewalls
var axo = ['Active'].concat('Object').join('X');
if (axo in global) {
  try {
    HtmlfileReceiver.htmlfileEnabled = !!new global[axo]('htmlfile');
  } catch (x) {
    // intentionally empty
  }
}

HtmlfileReceiver.enabled = HtmlfileReceiver.htmlfileEnabled || iframeUtils.iframeEnabled;

module.exports = HtmlfileReceiver;

}).call(this,{ env: {} },typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../../utils/iframe":47,"../../utils/random":50,"../../utils/url":52,"debug":55,"events":3,"inherits":57}],31:[function(require,module,exports){
(function (process,global){
'use strict';

var utils = require('../../utils/iframe')
  , random = require('../../utils/random')
  , browser = require('../../utils/browser')
  , urlUtils = require('../../utils/url')
  , inherits = require('inherits')
  , EventEmitter = require('events').EventEmitter
  ;

var debug = function() {};
if (process.env.NODE_ENV !== 'production') {
  debug = require('debug')('sockjs-client:receiver:jsonp');
}

function JsonpReceiver(url) {
  debug(url);
  var self = this;
  EventEmitter.call(this);

  utils.polluteGlobalNamespace();

  this.id = 'a' + random.string(6);
  var urlWithId = urlUtils.addQuery(url, 'c=' + encodeURIComponent(utils.WPrefix + '.' + this.id));

  global[utils.WPrefix][this.id] = this._callback.bind(this);
  this._createScript(urlWithId);

  // Fallback mostly for Konqueror - stupid timer, 35 seconds shall be plenty.
  this.timeoutId = setTimeout(function() {
    debug('timeout');
    self._abort(new Error('JSONP script loaded abnormally (timeout)'));
  }, JsonpReceiver.timeout);
}

inherits(JsonpReceiver, EventEmitter);

JsonpReceiver.prototype.abort = function() {
  debug('abort');
  if (global[utils.WPrefix][this.id]) {
    var err = new Error('JSONP user aborted read');
    err.code = 1000;
    this._abort(err);
  }
};

JsonpReceiver.timeout = 35000;
JsonpReceiver.scriptErrorTimeout = 1000;

JsonpReceiver.prototype._callback = function(data) {
  debug('_callback', data);
  this._cleanup();

  if (this.aborting) {
    return;
  }

  if (data) {
    debug('message', data);
    this.emit('message', data);
  }
  this.emit('close', null, 'network');
  this.removeAllListeners();
};

JsonpReceiver.prototype._abort = function(err) {
  debug('_abort', err);
  this._cleanup();
  this.aborting = true;
  this.emit('close', err.code, err.message);
  this.removeAllListeners();
};

JsonpReceiver.prototype._cleanup = function() {
  debug('_cleanup');
  clearTimeout(this.timeoutId);
  if (this.script2) {
    this.script2.parentNode.removeChild(this.script2);
    this.script2 = null;
  }
  if (this.script) {
    var script = this.script;
    // Unfortunately, you can't really abort script loading of
    // the script.
    script.parentNode.removeChild(script);
    script.onreadystatechange = script.onerror =
        script.onload = script.onclick = null;
    this.script = null;
  }
  delete global[utils.WPrefix][this.id];
};

JsonpReceiver.prototype._scriptError = function() {
  debug('_scriptError');
  var self = this;
  if (this.errorTimer) {
    return;
  }

  this.errorTimer = setTimeout(function() {
    if (!self.loadedOkay) {
      self._abort(new Error('JSONP script loaded abnormally (onerror)'));
    }
  }, JsonpReceiver.scriptErrorTimeout);
};

JsonpReceiver.prototype._createScript = function(url) {
  debug('_createScript', url);
  var self = this;
  var script = this.script = global.document.createElement('script');
  var script2;  // Opera synchronous load trick.

  script.id = 'a' + random.string(8);
  script.src = url;
  script.type = 'text/javascript';
  script.charset = 'UTF-8';
  script.onerror = this._scriptError.bind(this);
  script.onload = function() {
    debug('onload');
    self._abort(new Error('JSONP script loaded abnormally (onload)'));
  };

  // IE9 fires 'error' event after onreadystatechange or before, in random order.
  // Use loadedOkay to determine if actually errored
  script.onreadystatechange = function() {
    debug('onreadystatechange', script.readyState);
    if (/loaded|closed/.test(script.readyState)) {
      if (script && script.htmlFor && script.onclick) {
        self.loadedOkay = true;
        try {
          // In IE, actually execute the script.
          script.onclick();
        } catch (x) {
          // intentionally empty
        }
      }
      if (script) {
        self._abort(new Error('JSONP script loaded abnormally (onreadystatechange)'));
      }
    }
  };
  // IE: event/htmlFor/onclick trick.
  // One can't rely on proper order for onreadystatechange. In order to
  // make sure, set a 'htmlFor' and 'event' properties, so that
  // script code will be installed as 'onclick' handler for the
  // script object. Later, onreadystatechange, manually execute this
  // code. FF and Chrome doesn't work with 'event' and 'htmlFor'
  // set. For reference see:
  //   http://jaubourg.net/2010/07/loading-script-as-onclick-handler-of.html
  // Also, read on that about script ordering:
  //   http://wiki.whatwg.org/wiki/Dynamic_Script_Execution_Order
  if (typeof script.async === 'undefined' && global.document.attachEvent) {
    // According to mozilla docs, in recent browsers script.async defaults
    // to 'true', so we may use it to detect a good browser:
    // https://developer.mozilla.org/en/HTML/Element/script
    if (!browser.isOpera()) {
      // Naively assume we're in IE
      try {
        script.htmlFor = script.id;
        script.event = 'onclick';
      } catch (x) {
        // intentionally empty
      }
      script.async = true;
    } else {
      // Opera, second sync script hack
      script2 = this.script2 = global.document.createElement('script');
      script2.text = "try{var a = document.getElementById('" + script.id + "'); if(a)a.onerror();}catch(x){};";
      script.async = script2.async = false;
    }
  }
  if (typeof script.async !== 'undefined') {
    script.async = true;
  }

  var head = global.document.getElementsByTagName('head')[0];
  head.insertBefore(script, head.firstChild);
  if (script2) {
    head.insertBefore(script2, head.firstChild);
  }
};

module.exports = JsonpReceiver;

}).call(this,{ env: {} },typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../../utils/browser":44,"../../utils/iframe":47,"../../utils/random":50,"../../utils/url":52,"debug":55,"events":3,"inherits":57}],32:[function(require,module,exports){
(function (process){
'use strict';

var inherits = require('inherits')
  , EventEmitter = require('events').EventEmitter
  ;

var debug = function() {};
if (process.env.NODE_ENV !== 'production') {
  debug = require('debug')('sockjs-client:receiver:xhr');
}

function XhrReceiver(url, AjaxObject) {
  debug(url);
  EventEmitter.call(this);
  var self = this;

  this.bufferPosition = 0;

  this.xo = new AjaxObject('POST', url, null);
  this.xo.on('chunk', this._chunkHandler.bind(this));
  this.xo.once('finish', function(status, text) {
    debug('finish', status, text);
    self._chunkHandler(status, text);
    self.xo = null;
    var reason = status === 200 ? 'network' : 'permanent';
    debug('close', reason);
    self.emit('close', null, reason);
    self._cleanup();
  });
}

inherits(XhrReceiver, EventEmitter);

XhrReceiver.prototype._chunkHandler = function(status, text) {
  debug('_chunkHandler', status);
  if (status !== 200 || !text) {
    return;
  }

  for (var idx = -1; ; this.bufferPosition += idx + 1) {
    var buf = text.slice(this.bufferPosition);
    idx = buf.indexOf('\n');
    if (idx === -1) {
      break;
    }
    var msg = buf.slice(0, idx);
    if (msg) {
      debug('message', msg);
      this.emit('message', msg);
    }
  }
};

XhrReceiver.prototype._cleanup = function() {
  debug('_cleanup');
  this.removeAllListeners();
};

XhrReceiver.prototype.abort = function() {
  debug('abort');
  if (this.xo) {
    this.xo.close();
    debug('close');
    this.emit('close', null, 'user');
    this.xo = null;
  }
  this._cleanup();
};

module.exports = XhrReceiver;

}).call(this,{ env: {} })

},{"debug":55,"events":3,"inherits":57}],33:[function(require,module,exports){
(function (process,global){
'use strict';

var random = require('../../utils/random')
  , urlUtils = require('../../utils/url')
  ;

var debug = function() {};
if (process.env.NODE_ENV !== 'production') {
  debug = require('debug')('sockjs-client:sender:jsonp');
}

var form, area;

function createIframe(id) {
  debug('createIframe', id);
  try {
    // ie6 dynamic iframes with target="" support (thanks Chris Lambacher)
    return global.document.createElement('<iframe name="' + id + '">');
  } catch (x) {
    var iframe = global.document.createElement('iframe');
    iframe.name = id;
    return iframe;
  }
}

function createForm() {
  debug('createForm');
  form = global.document.createElement('form');
  form.style.display = 'none';
  form.style.position = 'absolute';
  form.method = 'POST';
  form.enctype = 'application/x-www-form-urlencoded';
  form.acceptCharset = 'UTF-8';

  area = global.document.createElement('textarea');
  area.name = 'd';
  form.appendChild(area);

  global.document.body.appendChild(form);
}

module.exports = function(url, payload, callback) {
  debug(url, payload);
  if (!form) {
    createForm();
  }
  var id = 'a' + random.string(8);
  form.target = id;
  form.action = urlUtils.addQuery(urlUtils.addPath(url, '/jsonp_send'), 'i=' + id);

  var iframe = createIframe(id);
  iframe.id = id;
  iframe.style.display = 'none';
  form.appendChild(iframe);

  try {
    area.value = payload;
  } catch (e) {
    // seriously broken browsers get here
  }
  form.submit();

  var completed = function(err) {
    debug('completed', id, err);
    if (!iframe.onerror) {
      return;
    }
    iframe.onreadystatechange = iframe.onerror = iframe.onload = null;
    // Opera mini doesn't like if we GC iframe
    // immediately, thus this timeout.
    setTimeout(function() {
      debug('cleaning up', id);
      iframe.parentNode.removeChild(iframe);
      iframe = null;
    }, 500);
    area.value = '';
    // It is not possible to detect if the iframe succeeded or
    // failed to submit our form.
    callback(err);
  };
  iframe.onerror = function() {
    debug('onerror', id);
    completed();
  };
  iframe.onload = function() {
    debug('onload', id);
    completed();
  };
  iframe.onreadystatechange = function(e) {
    debug('onreadystatechange', id, iframe.readyState, e);
    if (iframe.readyState === 'complete') {
      completed();
    }
  };
  return function() {
    debug('aborted', id);
    completed(new Error('Aborted'));
  };
};

}).call(this,{ env: {} },typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../../utils/random":50,"../../utils/url":52,"debug":55}],34:[function(require,module,exports){
(function (process,global){
'use strict';

var EventEmitter = require('events').EventEmitter
  , inherits = require('inherits')
  , eventUtils = require('../../utils/event')
  , browser = require('../../utils/browser')
  , urlUtils = require('../../utils/url')
  ;

var debug = function() {};
if (process.env.NODE_ENV !== 'production') {
  debug = require('debug')('sockjs-client:sender:xdr');
}

// References:
//   http://ajaxian.com/archives/100-line-ajax-wrapper
//   http://msdn.microsoft.com/en-us/library/cc288060(v=VS.85).aspx

function XDRObject(method, url, payload) {
  debug(method, url);
  var self = this;
  EventEmitter.call(this);

  setTimeout(function() {
    self._start(method, url, payload);
  }, 0);
}

inherits(XDRObject, EventEmitter);

XDRObject.prototype._start = function(method, url, payload) {
  debug('_start');
  var self = this;
  var xdr = new global.XDomainRequest();
  // IE caches even POSTs
  url = urlUtils.addQuery(url, 't=' + (+new Date()));

  xdr.onerror = function() {
    debug('onerror');
    self._error();
  };
  xdr.ontimeout = function() {
    debug('ontimeout');
    self._error();
  };
  xdr.onprogress = function() {
    debug('progress', xdr.responseText);
    self.emit('chunk', 200, xdr.responseText);
  };
  xdr.onload = function() {
    debug('load');
    self.emit('finish', 200, xdr.responseText);
    self._cleanup(false);
  };
  this.xdr = xdr;
  this.unloadRef = eventUtils.unloadAdd(function() {
    self._cleanup(true);
  });
  try {
    // Fails with AccessDenied if port number is bogus
    this.xdr.open(method, url);
    if (this.timeout) {
      this.xdr.timeout = this.timeout;
    }
    this.xdr.send(payload);
  } catch (x) {
    this._error();
  }
};

XDRObject.prototype._error = function() {
  this.emit('finish', 0, '');
  this._cleanup(false);
};

XDRObject.prototype._cleanup = function(abort) {
  debug('cleanup', abort);
  if (!this.xdr) {
    return;
  }
  this.removeAllListeners();
  eventUtils.unloadDel(this.unloadRef);

  this.xdr.ontimeout = this.xdr.onerror = this.xdr.onprogress = this.xdr.onload = null;
  if (abort) {
    try {
      this.xdr.abort();
    } catch (x) {
      // intentionally empty
    }
  }
  this.unloadRef = this.xdr = null;
};

XDRObject.prototype.close = function() {
  debug('close');
  this._cleanup(true);
};

// IE 8/9 if the request target uses the same scheme - #79
XDRObject.enabled = !!(global.XDomainRequest && browser.hasDomain());

module.exports = XDRObject;

}).call(this,{ env: {} },typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../../utils/browser":44,"../../utils/event":46,"../../utils/url":52,"debug":55,"events":3,"inherits":57}],35:[function(require,module,exports){
'use strict';

var inherits = require('inherits')
  , XhrDriver = require('../driver/xhr')
  ;

function XHRCorsObject(method, url, payload, opts) {
  XhrDriver.call(this, method, url, payload, opts);
}

inherits(XHRCorsObject, XhrDriver);

XHRCorsObject.enabled = XhrDriver.enabled && XhrDriver.supportsCORS;

module.exports = XHRCorsObject;

},{"../driver/xhr":17,"inherits":57}],36:[function(require,module,exports){
'use strict';

var EventEmitter = require('events').EventEmitter
  , inherits = require('inherits')
  ;

function XHRFake(/* method, url, payload, opts */) {
  var self = this;
  EventEmitter.call(this);

  this.to = setTimeout(function() {
    self.emit('finish', 200, '{}');
  }, XHRFake.timeout);
}

inherits(XHRFake, EventEmitter);

XHRFake.prototype.close = function() {
  clearTimeout(this.to);
};

XHRFake.timeout = 2000;

module.exports = XHRFake;

},{"events":3,"inherits":57}],37:[function(require,module,exports){
'use strict';

var inherits = require('inherits')
  , XhrDriver = require('../driver/xhr')
  ;

function XHRLocalObject(method, url, payload /*, opts */) {
  XhrDriver.call(this, method, url, payload, {
    noCredentials: true
  });
}

inherits(XHRLocalObject, XhrDriver);

XHRLocalObject.enabled = XhrDriver.enabled;

module.exports = XHRLocalObject;

},{"../driver/xhr":17,"inherits":57}],38:[function(require,module,exports){
(function (process){
'use strict';

var utils = require('../utils/event')
  , urlUtils = require('../utils/url')
  , inherits = require('inherits')
  , EventEmitter = require('events').EventEmitter
  , WebsocketDriver = require('./driver/websocket')
  ;

var debug = function() {};
if (process.env.NODE_ENV !== 'production') {
  debug = require('debug')('sockjs-client:websocket');
}

function WebSocketTransport(transUrl, ignore, options) {
  if (!WebSocketTransport.enabled()) {
    throw new Error('Transport created when disabled');
  }

  EventEmitter.call(this);
  debug('constructor', transUrl);

  var self = this;
  var url = urlUtils.addPath(transUrl, '/websocket');
  if (url.slice(0, 5) === 'https') {
    url = 'wss' + url.slice(5);
  } else {
    url = 'ws' + url.slice(4);
  }
  this.url = url;

  this.ws = new WebsocketDriver(this.url, [], options);
  this.ws.onmessage = function(e) {
    debug('message event', e.data);
    self.emit('message', e.data);
  };
  // Firefox has an interesting bug. If a websocket connection is
  // created after onunload, it stays alive even when user
  // navigates away from the page. In such situation let's lie -
  // let's not open the ws connection at all. See:
  // https://github.com/sockjs/sockjs-client/issues/28
  // https://bugzilla.mozilla.org/show_bug.cgi?id=696085
  this.unloadRef = utils.unloadAdd(function() {
    debug('unload');
    self.ws.close();
  });
  this.ws.onclose = function(e) {
    debug('close event', e.code, e.reason);
    self.emit('close', e.code, e.reason);
    self._cleanup();
  };
  this.ws.onerror = function(e) {
    debug('error event', e);
    self.emit('close', 1006, 'WebSocket connection broken');
    self._cleanup();
  };
}

inherits(WebSocketTransport, EventEmitter);

WebSocketTransport.prototype.send = function(data) {
  var msg = '[' + data + ']';
  debug('send', msg);
  this.ws.send(msg);
};

WebSocketTransport.prototype.close = function() {
  debug('close');
  var ws = this.ws;
  this._cleanup();
  if (ws) {
    ws.close();
  }
};

WebSocketTransport.prototype._cleanup = function() {
  debug('_cleanup');
  var ws = this.ws;
  if (ws) {
    ws.onmessage = ws.onclose = ws.onerror = null;
  }
  utils.unloadDel(this.unloadRef);
  this.unloadRef = this.ws = null;
  this.removeAllListeners();
};

WebSocketTransport.enabled = function() {
  debug('enabled');
  return !!WebsocketDriver;
};
WebSocketTransport.transportName = 'websocket';

// In theory, ws should require 1 round trip. But in chrome, this is
// not very stable over SSL. Most likely a ws connection requires a
// separate SSL connection, in which case 2 round trips are an
// absolute minumum.
WebSocketTransport.roundTrips = 2;

module.exports = WebSocketTransport;

}).call(this,{ env: {} })

},{"../utils/event":46,"../utils/url":52,"./driver/websocket":19,"debug":55,"events":3,"inherits":57}],39:[function(require,module,exports){
'use strict';

var inherits = require('inherits')
  , AjaxBasedTransport = require('./lib/ajax-based')
  , XdrStreamingTransport = require('./xdr-streaming')
  , XhrReceiver = require('./receiver/xhr')
  , XDRObject = require('./sender/xdr')
  ;

function XdrPollingTransport(transUrl) {
  if (!XDRObject.enabled) {
    throw new Error('Transport created when disabled');
  }
  AjaxBasedTransport.call(this, transUrl, '/xhr', XhrReceiver, XDRObject);
}

inherits(XdrPollingTransport, AjaxBasedTransport);

XdrPollingTransport.enabled = XdrStreamingTransport.enabled;
XdrPollingTransport.transportName = 'xdr-polling';
XdrPollingTransport.roundTrips = 2; // preflight, ajax

module.exports = XdrPollingTransport;

},{"./lib/ajax-based":24,"./receiver/xhr":32,"./sender/xdr":34,"./xdr-streaming":40,"inherits":57}],40:[function(require,module,exports){
'use strict';

var inherits = require('inherits')
  , AjaxBasedTransport = require('./lib/ajax-based')
  , XhrReceiver = require('./receiver/xhr')
  , XDRObject = require('./sender/xdr')
  ;

// According to:
//   http://stackoverflow.com/questions/1641507/detect-browser-support-for-cross-domain-xmlhttprequests
//   http://hacks.mozilla.org/2009/07/cross-site-xmlhttprequest-with-cors/

function XdrStreamingTransport(transUrl) {
  if (!XDRObject.enabled) {
    throw new Error('Transport created when disabled');
  }
  AjaxBasedTransport.call(this, transUrl, '/xhr_streaming', XhrReceiver, XDRObject);
}

inherits(XdrStreamingTransport, AjaxBasedTransport);

XdrStreamingTransport.enabled = function(info) {
  if (info.cookie_needed || info.nullOrigin) {
    return false;
  }
  return XDRObject.enabled && info.sameScheme;
};

XdrStreamingTransport.transportName = 'xdr-streaming';
XdrStreamingTransport.roundTrips = 2; // preflight, ajax

module.exports = XdrStreamingTransport;

},{"./lib/ajax-based":24,"./receiver/xhr":32,"./sender/xdr":34,"inherits":57}],41:[function(require,module,exports){
'use strict';

var inherits = require('inherits')
  , AjaxBasedTransport = require('./lib/ajax-based')
  , XhrReceiver = require('./receiver/xhr')
  , XHRCorsObject = require('./sender/xhr-cors')
  , XHRLocalObject = require('./sender/xhr-local')
  ;

function XhrPollingTransport(transUrl) {
  if (!XHRLocalObject.enabled && !XHRCorsObject.enabled) {
    throw new Error('Transport created when disabled');
  }
  AjaxBasedTransport.call(this, transUrl, '/xhr', XhrReceiver, XHRCorsObject);
}

inherits(XhrPollingTransport, AjaxBasedTransport);

XhrPollingTransport.enabled = function(info) {
  if (info.nullOrigin) {
    return false;
  }

  if (XHRLocalObject.enabled && info.sameOrigin) {
    return true;
  }
  return XHRCorsObject.enabled;
};

XhrPollingTransport.transportName = 'xhr-polling';
XhrPollingTransport.roundTrips = 2; // preflight, ajax

module.exports = XhrPollingTransport;

},{"./lib/ajax-based":24,"./receiver/xhr":32,"./sender/xhr-cors":35,"./sender/xhr-local":37,"inherits":57}],42:[function(require,module,exports){
(function (global){
'use strict';

var inherits = require('inherits')
  , AjaxBasedTransport = require('./lib/ajax-based')
  , XhrReceiver = require('./receiver/xhr')
  , XHRCorsObject = require('./sender/xhr-cors')
  , XHRLocalObject = require('./sender/xhr-local')
  , browser = require('../utils/browser')
  ;

function XhrStreamingTransport(transUrl) {
  if (!XHRLocalObject.enabled && !XHRCorsObject.enabled) {
    throw new Error('Transport created when disabled');
  }
  AjaxBasedTransport.call(this, transUrl, '/xhr_streaming', XhrReceiver, XHRCorsObject);
}

inherits(XhrStreamingTransport, AjaxBasedTransport);

XhrStreamingTransport.enabled = function(info) {
  if (info.nullOrigin) {
    return false;
  }
  // Opera doesn't support xhr-streaming #60
  // But it might be able to #92
  if (browser.isOpera()) {
    return false;
  }

  return XHRCorsObject.enabled;
};

XhrStreamingTransport.transportName = 'xhr-streaming';
XhrStreamingTransport.roundTrips = 2; // preflight, ajax

// Safari gets confused when a streaming ajax request is started
// before onload. This causes the load indicator to spin indefinetely.
// Only require body when used in a browser
XhrStreamingTransport.needBody = !!global.document;

module.exports = XhrStreamingTransport;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../utils/browser":44,"./lib/ajax-based":24,"./receiver/xhr":32,"./sender/xhr-cors":35,"./sender/xhr-local":37,"inherits":57}],43:[function(require,module,exports){
(function (global){
'use strict';

if (global.crypto && global.crypto.getRandomValues) {
  module.exports.randomBytes = function(length) {
    var bytes = new Uint8Array(length);
    global.crypto.getRandomValues(bytes);
    return bytes;
  };
} else {
  module.exports.randomBytes = function(length) {
    var bytes = new Array(length);
    for (var i = 0; i < length; i++) {
      bytes[i] = Math.floor(Math.random() * 256);
    }
    return bytes;
  };
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],44:[function(require,module,exports){
(function (global){
'use strict';

module.exports = {
  isOpera: function() {
    return global.navigator &&
      /opera/i.test(global.navigator.userAgent);
  }

, isKonqueror: function() {
    return global.navigator &&
      /konqueror/i.test(global.navigator.userAgent);
  }

  // #187 wrap document.domain in try/catch because of WP8 from file:///
, hasDomain: function () {
    // non-browser client always has a domain
    if (!global.document) {
      return true;
    }

    try {
      return !!global.document.domain;
    } catch (e) {
      return false;
    }
  }
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],45:[function(require,module,exports){
'use strict';

var JSON3 = require('json3');

// Some extra characters that Chrome gets wrong, and substitutes with
// something else on the wire.
// eslint-disable-next-line no-control-regex
var extraEscapable = /[\x00-\x1f\ud800-\udfff\ufffe\uffff\u0300-\u0333\u033d-\u0346\u034a-\u034c\u0350-\u0352\u0357-\u0358\u035c-\u0362\u0374\u037e\u0387\u0591-\u05af\u05c4\u0610-\u0617\u0653-\u0654\u0657-\u065b\u065d-\u065e\u06df-\u06e2\u06eb-\u06ec\u0730\u0732-\u0733\u0735-\u0736\u073a\u073d\u073f-\u0741\u0743\u0745\u0747\u07eb-\u07f1\u0951\u0958-\u095f\u09dc-\u09dd\u09df\u0a33\u0a36\u0a59-\u0a5b\u0a5e\u0b5c-\u0b5d\u0e38-\u0e39\u0f43\u0f4d\u0f52\u0f57\u0f5c\u0f69\u0f72-\u0f76\u0f78\u0f80-\u0f83\u0f93\u0f9d\u0fa2\u0fa7\u0fac\u0fb9\u1939-\u193a\u1a17\u1b6b\u1cda-\u1cdb\u1dc0-\u1dcf\u1dfc\u1dfe\u1f71\u1f73\u1f75\u1f77\u1f79\u1f7b\u1f7d\u1fbb\u1fbe\u1fc9\u1fcb\u1fd3\u1fdb\u1fe3\u1feb\u1fee-\u1fef\u1ff9\u1ffb\u1ffd\u2000-\u2001\u20d0-\u20d1\u20d4-\u20d7\u20e7-\u20e9\u2126\u212a-\u212b\u2329-\u232a\u2adc\u302b-\u302c\uaab2-\uaab3\uf900-\ufa0d\ufa10\ufa12\ufa15-\ufa1e\ufa20\ufa22\ufa25-\ufa26\ufa2a-\ufa2d\ufa30-\ufa6d\ufa70-\ufad9\ufb1d\ufb1f\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40-\ufb41\ufb43-\ufb44\ufb46-\ufb4e\ufff0-\uffff]/g
  , extraLookup;

// This may be quite slow, so let's delay until user actually uses bad
// characters.
var unrollLookup = function(escapable) {
  var i;
  var unrolled = {};
  var c = [];
  for (i = 0; i < 65536; i++) {
    c.push( String.fromCharCode(i) );
  }
  escapable.lastIndex = 0;
  c.join('').replace(escapable, function(a) {
    unrolled[ a ] = '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
    return '';
  });
  escapable.lastIndex = 0;
  return unrolled;
};

// Quote string, also taking care of unicode characters that browsers
// often break. Especially, take care of unicode surrogates:
// http://en.wikipedia.org/wiki/Mapping_of_Unicode_characters#Surrogates
module.exports = {
  quote: function(string) {
    var quoted = JSON3.stringify(string);

    // In most cases this should be very fast and good enough.
    extraEscapable.lastIndex = 0;
    if (!extraEscapable.test(quoted)) {
      return quoted;
    }

    if (!extraLookup) {
      extraLookup = unrollLookup(extraEscapable);
    }

    return quoted.replace(extraEscapable, function(a) {
      return extraLookup[a];
    });
  }
};

},{"json3":58}],46:[function(require,module,exports){
(function (global){
'use strict';

var random = require('./random');

var onUnload = {}
  , afterUnload = false
    // detect google chrome packaged apps because they don't allow the 'unload' event
  , isChromePackagedApp = global.chrome && global.chrome.app && global.chrome.app.runtime
  ;

module.exports = {
  attachEvent: function(event, listener) {
    if (typeof global.addEventListener !== 'undefined') {
      global.addEventListener(event, listener, false);
    } else if (global.document && global.attachEvent) {
      // IE quirks.
      // According to: http://stevesouders.com/misc/test-postmessage.php
      // the message gets delivered only to 'document', not 'window'.
      global.document.attachEvent('on' + event, listener);
      // I get 'window' for ie8.
      global.attachEvent('on' + event, listener);
    }
  }

, detachEvent: function(event, listener) {
    if (typeof global.addEventListener !== 'undefined') {
      global.removeEventListener(event, listener, false);
    } else if (global.document && global.detachEvent) {
      global.document.detachEvent('on' + event, listener);
      global.detachEvent('on' + event, listener);
    }
  }

, unloadAdd: function(listener) {
    if (isChromePackagedApp) {
      return null;
    }

    var ref = random.string(8);
    onUnload[ref] = listener;
    if (afterUnload) {
      setTimeout(this.triggerUnloadCallbacks, 0);
    }
    return ref;
  }

, unloadDel: function(ref) {
    if (ref in onUnload) {
      delete onUnload[ref];
    }
  }

, triggerUnloadCallbacks: function() {
    for (var ref in onUnload) {
      onUnload[ref]();
      delete onUnload[ref];
    }
  }
};

var unloadTriggered = function() {
  if (afterUnload) {
    return;
  }
  afterUnload = true;
  module.exports.triggerUnloadCallbacks();
};

// 'unload' alone is not reliable in opera within an iframe, but we
// can't use `beforeunload` as IE fires it on javascript: links.
if (!isChromePackagedApp) {
  module.exports.attachEvent('unload', unloadTriggered);
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./random":50}],47:[function(require,module,exports){
(function (process,global){
'use strict';

var eventUtils = require('./event')
  , JSON3 = require('json3')
  , browser = require('./browser')
  ;

var debug = function() {};
if (process.env.NODE_ENV !== 'production') {
  debug = require('debug')('sockjs-client:utils:iframe');
}

module.exports = {
  WPrefix: '_jp'
, currentWindowId: null

, polluteGlobalNamespace: function() {
    if (!(module.exports.WPrefix in global)) {
      global[module.exports.WPrefix] = {};
    }
  }

, postMessage: function(type, data) {
    if (global.parent !== global) {
      global.parent.postMessage(JSON3.stringify({
        windowId: module.exports.currentWindowId
      , type: type
      , data: data || ''
      }), '*');
    } else {
      debug('Cannot postMessage, no parent window.', type, data);
    }
  }

, createIframe: function(iframeUrl, errorCallback) {
    var iframe = global.document.createElement('iframe');
    var tref, unloadRef;
    var unattach = function() {
      debug('unattach');
      clearTimeout(tref);
      // Explorer had problems with that.
      try {
        iframe.onload = null;
      } catch (x) {
        // intentionally empty
      }
      iframe.onerror = null;
    };
    var cleanup = function() {
      debug('cleanup');
      if (iframe) {
        unattach();
        // This timeout makes chrome fire onbeforeunload event
        // within iframe. Without the timeout it goes straight to
        // onunload.
        setTimeout(function() {
          if (iframe) {
            iframe.parentNode.removeChild(iframe);
          }
          iframe = null;
        }, 0);
        eventUtils.unloadDel(unloadRef);
      }
    };
    var onerror = function(err) {
      debug('onerror', err);
      if (iframe) {
        cleanup();
        errorCallback(err);
      }
    };
    var post = function(msg, origin) {
      debug('post', msg, origin);
      setTimeout(function() {
        try {
          // When the iframe is not loaded, IE raises an exception
          // on 'contentWindow'.
          if (iframe && iframe.contentWindow) {
            iframe.contentWindow.postMessage(msg, origin);
          }
        } catch (x) {
          // intentionally empty
        }
      }, 0);
    };

    iframe.src = iframeUrl;
    iframe.style.display = 'none';
    iframe.style.position = 'absolute';
    iframe.onerror = function() {
      onerror('onerror');
    };
    iframe.onload = function() {
      debug('onload');
      // `onload` is triggered before scripts on the iframe are
      // executed. Give it few seconds to actually load stuff.
      clearTimeout(tref);
      tref = setTimeout(function() {
        onerror('onload timeout');
      }, 2000);
    };
    global.document.body.appendChild(iframe);
    tref = setTimeout(function() {
      onerror('timeout');
    }, 15000);
    unloadRef = eventUtils.unloadAdd(cleanup);
    return {
      post: post
    , cleanup: cleanup
    , loaded: unattach
    };
  }

/* eslint no-undef: "off", new-cap: "off" */
, createHtmlfile: function(iframeUrl, errorCallback) {
    var axo = ['Active'].concat('Object').join('X');
    var doc = new global[axo]('htmlfile');
    var tref, unloadRef;
    var iframe;
    var unattach = function() {
      clearTimeout(tref);
      iframe.onerror = null;
    };
    var cleanup = function() {
      if (doc) {
        unattach();
        eventUtils.unloadDel(unloadRef);
        iframe.parentNode.removeChild(iframe);
        iframe = doc = null;
        CollectGarbage();
      }
    };
    var onerror = function(r) {
      debug('onerror', r);
      if (doc) {
        cleanup();
        errorCallback(r);
      }
    };
    var post = function(msg, origin) {
      try {
        // When the iframe is not loaded, IE raises an exception
        // on 'contentWindow'.
        setTimeout(function() {
          if (iframe && iframe.contentWindow) {
              iframe.contentWindow.postMessage(msg, origin);
          }
        }, 0);
      } catch (x) {
        // intentionally empty
      }
    };

    doc.open();
    doc.write('<html><s' + 'cript>' +
              'document.domain="' + global.document.domain + '";' +
              '</s' + 'cript></html>');
    doc.close();
    doc.parentWindow[module.exports.WPrefix] = global[module.exports.WPrefix];
    var c = doc.createElement('div');
    doc.body.appendChild(c);
    iframe = doc.createElement('iframe');
    c.appendChild(iframe);
    iframe.src = iframeUrl;
    iframe.onerror = function() {
      onerror('onerror');
    };
    tref = setTimeout(function() {
      onerror('timeout');
    }, 15000);
    unloadRef = eventUtils.unloadAdd(cleanup);
    return {
      post: post
    , cleanup: cleanup
    , loaded: unattach
    };
  }
};

module.exports.iframeEnabled = false;
if (global.document) {
  // postMessage misbehaves in konqueror 4.6.5 - the messages are delivered with
  // huge delay, or not at all.
  module.exports.iframeEnabled = (typeof global.postMessage === 'function' ||
    typeof global.postMessage === 'object') && (!browser.isKonqueror());
}

}).call(this,{ env: {} },typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./browser":44,"./event":46,"debug":55,"json3":58}],48:[function(require,module,exports){
(function (global){
'use strict';

var logObject = {};
['log', 'debug', 'warn'].forEach(function (level) {
  var levelExists;

  try {
    levelExists = global.console && global.console[level] && global.console[level].apply;
  } catch(e) {
    // do nothing
  }

  logObject[level] = levelExists ? function () {
    return global.console[level].apply(global.console, arguments);
  } : (level === 'log' ? function () {} : logObject.log);
});

module.exports = logObject;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],49:[function(require,module,exports){
'use strict';

module.exports = {
  isObject: function(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
  }

, extend: function(obj) {
    if (!this.isObject(obj)) {
      return obj;
    }
    var source, prop;
    for (var i = 1, length = arguments.length; i < length; i++) {
      source = arguments[i];
      for (prop in source) {
        if (Object.prototype.hasOwnProperty.call(source, prop)) {
          obj[prop] = source[prop];
        }
      }
    }
    return obj;
  }
};

},{}],50:[function(require,module,exports){
'use strict';

/* global crypto:true */
var crypto = require('crypto');

// This string has length 32, a power of 2, so the modulus doesn't introduce a
// bias.
var _randomStringChars = 'abcdefghijklmnopqrstuvwxyz012345';
module.exports = {
  string: function(length) {
    var max = _randomStringChars.length;
    var bytes = crypto.randomBytes(length);
    var ret = [];
    for (var i = 0; i < length; i++) {
      ret.push(_randomStringChars.substr(bytes[i] % max, 1));
    }
    return ret.join('');
  }

, number: function(max) {
    return Math.floor(Math.random() * max);
  }

, numberString: function(max) {
    var t = ('' + (max - 1)).length;
    var p = new Array(t + 1).join('0');
    return (p + this.number(max)).slice(-t);
  }
};

},{"crypto":43}],51:[function(require,module,exports){
(function (process){
'use strict';

var debug = function() {};
if (process.env.NODE_ENV !== 'production') {
  debug = require('debug')('sockjs-client:utils:transport');
}

module.exports = function(availableTransports) {
  return {
    filterToEnabled: function(transportsWhitelist, info) {
      var transports = {
        main: []
      , facade: []
      };
      if (!transportsWhitelist) {
        transportsWhitelist = [];
      } else if (typeof transportsWhitelist === 'string') {
        transportsWhitelist = [transportsWhitelist];
      }

      availableTransports.forEach(function(trans) {
        if (!trans) {
          return;
        }

        if (trans.transportName === 'websocket' && info.websocket === false) {
          debug('disabled from server', 'websocket');
          return;
        }

        if (transportsWhitelist.length &&
            transportsWhitelist.indexOf(trans.transportName) === -1) {
          debug('not in whitelist', trans.transportName);
          return;
        }

        if (trans.enabled(info)) {
          debug('enabled', trans.transportName);
          transports.main.push(trans);
          if (trans.facadeTransport) {
            transports.facade.push(trans.facadeTransport);
          }
        } else {
          debug('disabled', trans.transportName);
        }
      });
      return transports;
    }
  };
};

}).call(this,{ env: {} })

},{"debug":55}],52:[function(require,module,exports){
(function (process){
'use strict';

var URL = require('url-parse');

var debug = function() {};
if (process.env.NODE_ENV !== 'production') {
  debug = require('debug')('sockjs-client:utils:url');
}

module.exports = {
  getOrigin: function(url) {
    if (!url) {
      return null;
    }

    var p = new URL(url);
    if (p.protocol === 'file:') {
      return null;
    }

    var port = p.port;
    if (!port) {
      port = (p.protocol === 'https:') ? '443' : '80';
    }

    return p.protocol + '//' + p.hostname + ':' + port;
  }

, isOriginEqual: function(a, b) {
    var res = this.getOrigin(a) === this.getOrigin(b);
    debug('same', a, b, res);
    return res;
  }

, isSchemeEqual: function(a, b) {
    return (a.split(':')[0] === b.split(':')[0]);
  }

, addPath: function (url, path) {
    var qs = url.split('?');
    return qs[0] + path + (qs[1] ? '?' + qs[1] : '');
  }

, addQuery: function (url, q) {
    return url + (url.indexOf('?') === -1 ? ('?' + q) : ('&' + q));
  }
};

}).call(this,{ env: {} })

},{"debug":55,"url-parse":61}],53:[function(require,module,exports){
module.exports = '1.4.0';

},{}],54:[function(require,module,exports){
/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var w = d * 7;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function(val, options) {
  options = options || {};
  var type = typeof val;
  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isNaN(val) === false) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error(
    'val is not a non-empty string or a valid number. val=' +
      JSON.stringify(val)
  );
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str);
  if (str.length > 100) {
    return;
  }
  var match = /^((?:\d+)?\-?\d?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
    str
  );
  if (!match) {
    return;
  }
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'weeks':
    case 'week':
    case 'w':
      return n * w;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
    default:
      return undefined;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return Math.round(ms / d) + 'd';
  }
  if (msAbs >= h) {
    return Math.round(ms / h) + 'h';
  }
  if (msAbs >= m) {
    return Math.round(ms / m) + 'm';
  }
  if (msAbs >= s) {
    return Math.round(ms / s) + 's';
  }
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return plural(ms, msAbs, d, 'day');
  }
  if (msAbs >= h) {
    return plural(ms, msAbs, h, 'hour');
  }
  if (msAbs >= m) {
    return plural(ms, msAbs, m, 'minute');
  }
  if (msAbs >= s) {
    return plural(ms, msAbs, s, 'second');
  }
  return ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, msAbs, n, name) {
  var isPlural = msAbs >= n * 1.5;
  return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '');
}

},{}],55:[function(require,module,exports){
(function (process){
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/* eslint-env browser */

/**
 * This is the web browser implementation of `debug()`.
 */
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = localstorage();
/**
 * Colors.
 */

exports.colors = ['#0000CC', '#0000FF', '#0033CC', '#0033FF', '#0066CC', '#0066FF', '#0099CC', '#0099FF', '#00CC00', '#00CC33', '#00CC66', '#00CC99', '#00CCCC', '#00CCFF', '#3300CC', '#3300FF', '#3333CC', '#3333FF', '#3366CC', '#3366FF', '#3399CC', '#3399FF', '#33CC00', '#33CC33', '#33CC66', '#33CC99', '#33CCCC', '#33CCFF', '#6600CC', '#6600FF', '#6633CC', '#6633FF', '#66CC00', '#66CC33', '#9900CC', '#9900FF', '#9933CC', '#9933FF', '#99CC00', '#99CC33', '#CC0000', '#CC0033', '#CC0066', '#CC0099', '#CC00CC', '#CC00FF', '#CC3300', '#CC3333', '#CC3366', '#CC3399', '#CC33CC', '#CC33FF', '#CC6600', '#CC6633', '#CC9900', '#CC9933', '#CCCC00', '#CCCC33', '#FF0000', '#FF0033', '#FF0066', '#FF0099', '#FF00CC', '#FF00FF', '#FF3300', '#FF3333', '#FF3366', '#FF3399', '#FF33CC', '#FF33FF', '#FF6600', '#FF6633', '#FF9900', '#FF9933', '#FFCC00', '#FFCC33'];
/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */
// eslint-disable-next-line complexity

function useColors() {
  // NB: In an Electron preload script, document will be defined but not fully
  // initialized. Since we know we're in Chrome, we'll just detect this case
  // explicitly
  if (typeof window !== 'undefined' && window.process && (window.process.type === 'renderer' || window.process.__nwjs)) {
    return true;
  } // Internet Explorer and Edge do not support colors.


  if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
    return false;
  } // Is webkit? http://stackoverflow.com/a/16459606/376773
  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632


  return typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
  typeof window !== 'undefined' && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
  // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
  typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
  typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
}
/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */


function formatArgs(args) {
  args[0] = (this.useColors ? '%c' : '') + this.namespace + (this.useColors ? ' %c' : ' ') + args[0] + (this.useColors ? '%c ' : ' ') + '+' + module.exports.humanize(this.diff);

  if (!this.useColors) {
    return;
  }

  var c = 'color: ' + this.color;
  args.splice(1, 0, c, 'color: inherit'); // The final "%c" is somewhat tricky, because there could be other
  // arguments passed either before or after the %c, so we need to
  // figure out the correct index to insert the CSS into

  var index = 0;
  var lastC = 0;
  args[0].replace(/%[a-zA-Z%]/g, function (match) {
    if (match === '%%') {
      return;
    }

    index++;

    if (match === '%c') {
      // We only are interested in the *last* %c
      // (the user may have provided their own)
      lastC = index;
    }
  });
  args.splice(lastC, 0, c);
}
/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */


function log() {
  var _console;

  // This hackery is required for IE8/9, where
  // the `console.log` function doesn't have 'apply'
  return (typeof console === "undefined" ? "undefined" : _typeof(console)) === 'object' && console.log && (_console = console).log.apply(_console, arguments);
}
/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */


function save(namespaces) {
  try {
    if (namespaces) {
      exports.storage.setItem('debug', namespaces);
    } else {
      exports.storage.removeItem('debug');
    }
  } catch (error) {// Swallow
    // XXX (@Qix-) should we be logging these?
  }
}
/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */


function load() {
  var r;

  try {
    r = exports.storage.getItem('debug');
  } catch (error) {} // Swallow
  // XXX (@Qix-) should we be logging these?
  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG


  if (!r && typeof process !== 'undefined' && 'env' in process) {
    r = process.env.DEBUG;
  }

  return r;
}
/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */


function localstorage() {
  try {
    // TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context
    // The Browser also has localStorage in the global context.
    return localStorage;
  } catch (error) {// Swallow
    // XXX (@Qix-) should we be logging these?
  }
}

module.exports = require('./common')(exports);
var formatters = module.exports.formatters;
/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

formatters.j = function (v) {
  try {
    return JSON.stringify(v);
  } catch (error) {
    return '[UnexpectedJSONParseError]: ' + error.message;
  }
};


}).call(this,{ env: {} })

},{"./common":56}],56:[function(require,module,exports){
"use strict";

/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 */
function setup(env) {
  createDebug.debug = createDebug;
  createDebug.default = createDebug;
  createDebug.coerce = coerce;
  createDebug.disable = disable;
  createDebug.enable = enable;
  createDebug.enabled = enabled;
  createDebug.humanize = require('ms');
  Object.keys(env).forEach(function (key) {
    createDebug[key] = env[key];
  });
  /**
  * Active `debug` instances.
  */

  createDebug.instances = [];
  /**
  * The currently active debug mode names, and names to skip.
  */

  createDebug.names = [];
  createDebug.skips = [];
  /**
  * Map of special "%n" handling functions, for the debug "format" argument.
  *
  * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
  */

  createDebug.formatters = {};
  /**
  * Selects a color for a debug namespace
  * @param {String} namespace The namespace string for the for the debug instance to be colored
  * @return {Number|String} An ANSI color code for the given namespace
  * @api private
  */

  function selectColor(namespace) {
    var hash = 0;

    for (var i = 0; i < namespace.length; i++) {
      hash = (hash << 5) - hash + namespace.charCodeAt(i);
      hash |= 0; // Convert to 32bit integer
    }

    return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
  }

  createDebug.selectColor = selectColor;
  /**
  * Create a debugger with the given `namespace`.
  *
  * @param {String} namespace
  * @return {Function}
  * @api public
  */

  function createDebug(namespace) {
    var prevTime;

    function debug() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      // Disabled?
      if (!debug.enabled) {
        return;
      }

      var self = debug; // Set `diff` timestamp

      var curr = Number(new Date());
      var ms = curr - (prevTime || curr);
      self.diff = ms;
      self.prev = prevTime;
      self.curr = curr;
      prevTime = curr;
      args[0] = createDebug.coerce(args[0]);

      if (typeof args[0] !== 'string') {
        // Anything else let's inspect with %O
        args.unshift('%O');
      } // Apply any `formatters` transformations


      var index = 0;
      args[0] = args[0].replace(/%([a-zA-Z%])/g, function (match, format) {
        // If we encounter an escaped % then don't increase the array index
        if (match === '%%') {
          return match;
        }

        index++;
        var formatter = createDebug.formatters[format];

        if (typeof formatter === 'function') {
          var val = args[index];
          match = formatter.call(self, val); // Now we need to remove `args[index]` since it's inlined in the `format`

          args.splice(index, 1);
          index--;
        }

        return match;
      }); // Apply env-specific formatting (colors, etc.)

      createDebug.formatArgs.call(self, args);
      var logFn = self.log || createDebug.log;
      logFn.apply(self, args);
    }

    debug.namespace = namespace;
    debug.enabled = createDebug.enabled(namespace);
    debug.useColors = createDebug.useColors();
    debug.color = selectColor(namespace);
    debug.destroy = destroy;
    debug.extend = extend; // Debug.formatArgs = formatArgs;
    // debug.rawLog = rawLog;
    // env-specific initialization logic for debug instances

    if (typeof createDebug.init === 'function') {
      createDebug.init(debug);
    }

    createDebug.instances.push(debug);
    return debug;
  }

  function destroy() {
    var index = createDebug.instances.indexOf(this);

    if (index !== -1) {
      createDebug.instances.splice(index, 1);
      return true;
    }

    return false;
  }

  function extend(namespace, delimiter) {
    return createDebug(this.namespace + (typeof delimiter === 'undefined' ? ':' : delimiter) + namespace);
  }
  /**
  * Enables a debug mode by namespaces. This can include modes
  * separated by a colon and wildcards.
  *
  * @param {String} namespaces
  * @api public
  */


  function enable(namespaces) {
    createDebug.save(namespaces);
    createDebug.names = [];
    createDebug.skips = [];
    var i;
    var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
    var len = split.length;

    for (i = 0; i < len; i++) {
      if (!split[i]) {
        // ignore empty strings
        continue;
      }

      namespaces = split[i].replace(/\*/g, '.*?');

      if (namespaces[0] === '-') {
        createDebug.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
      } else {
        createDebug.names.push(new RegExp('^' + namespaces + '$'));
      }
    }

    for (i = 0; i < createDebug.instances.length; i++) {
      var instance = createDebug.instances[i];
      instance.enabled = createDebug.enabled(instance.namespace);
    }
  }
  /**
  * Disable debug output.
  *
  * @api public
  */


  function disable() {
    createDebug.enable('');
  }
  /**
  * Returns true if the given mode name is enabled, false otherwise.
  *
  * @param {String} name
  * @return {Boolean}
  * @api public
  */


  function enabled(name) {
    if (name[name.length - 1] === '*') {
      return true;
    }

    var i;
    var len;

    for (i = 0, len = createDebug.skips.length; i < len; i++) {
      if (createDebug.skips[i].test(name)) {
        return false;
      }
    }

    for (i = 0, len = createDebug.names.length; i < len; i++) {
      if (createDebug.names[i].test(name)) {
        return true;
      }
    }

    return false;
  }
  /**
  * Coerce `val`.
  *
  * @param {Mixed} val
  * @return {Mixed}
  * @api private
  */


  function coerce(val) {
    if (val instanceof Error) {
      return val.stack || val.message;
    }

    return val;
  }

  createDebug.enable(createDebug.load());
  return createDebug;
}

module.exports = setup;


},{"ms":54}],57:[function(require,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}

},{}],58:[function(require,module,exports){
(function (global){
/*! JSON v3.3.2 | http://bestiejs.github.io/json3 | Copyright 2012-2014, Kit Cambridge | http://kit.mit-license.org */
;(function () {
  // Detect the `define` function exposed by asynchronous module loaders. The
  // strict `define` check is necessary for compatibility with `r.js`.
  var isLoader = typeof define === "function" && define.amd;

  // A set of types used to distinguish objects from primitives.
  var objectTypes = {
    "function": true,
    "object": true
  };

  // Detect the `exports` object exposed by CommonJS implementations.
  var freeExports = objectTypes[typeof exports] && exports && !exports.nodeType && exports;

  // Use the `global` object exposed by Node (including Browserify via
  // `insert-module-globals`), Narwhal, and Ringo as the default context,
  // and the `window` object in browsers. Rhino exports a `global` function
  // instead.
  var root = objectTypes[typeof window] && window || this,
      freeGlobal = freeExports && objectTypes[typeof module] && module && !module.nodeType && typeof global == "object" && global;

  if (freeGlobal && (freeGlobal["global"] === freeGlobal || freeGlobal["window"] === freeGlobal || freeGlobal["self"] === freeGlobal)) {
    root = freeGlobal;
  }

  // Public: Initializes JSON 3 using the given `context` object, attaching the
  // `stringify` and `parse` functions to the specified `exports` object.
  function runInContext(context, exports) {
    context || (context = root["Object"]());
    exports || (exports = root["Object"]());

    // Native constructor aliases.
    var Number = context["Number"] || root["Number"],
        String = context["String"] || root["String"],
        Object = context["Object"] || root["Object"],
        Date = context["Date"] || root["Date"],
        SyntaxError = context["SyntaxError"] || root["SyntaxError"],
        TypeError = context["TypeError"] || root["TypeError"],
        Math = context["Math"] || root["Math"],
        nativeJSON = context["JSON"] || root["JSON"];

    // Delegate to the native `stringify` and `parse` implementations.
    if (typeof nativeJSON == "object" && nativeJSON) {
      exports.stringify = nativeJSON.stringify;
      exports.parse = nativeJSON.parse;
    }

    // Convenience aliases.
    var objectProto = Object.prototype,
        getClass = objectProto.toString,
        isProperty, forEach, undef;

    // Test the `Date#getUTC*` methods. Based on work by @Yaffle.
    var isExtended = new Date(-3509827334573292);
    try {
      // The `getUTCFullYear`, `Month`, and `Date` methods return nonsensical
      // results for certain dates in Opera >= 10.53.
      isExtended = isExtended.getUTCFullYear() == -109252 && isExtended.getUTCMonth() === 0 && isExtended.getUTCDate() === 1 &&
        // Safari < 2.0.2 stores the internal millisecond time value correctly,
        // but clips the values returned by the date methods to the range of
        // signed 32-bit integers ([-2 ** 31, 2 ** 31 - 1]).
        isExtended.getUTCHours() == 10 && isExtended.getUTCMinutes() == 37 && isExtended.getUTCSeconds() == 6 && isExtended.getUTCMilliseconds() == 708;
    } catch (exception) {}

    // Internal: Determines whether the native `JSON.stringify` and `parse`
    // implementations are spec-compliant. Based on work by Ken Snyder.
    function has(name) {
      if (has[name] !== undef) {
        // Return cached feature test result.
        return has[name];
      }
      var isSupported;
      if (name == "bug-string-char-index") {
        // IE <= 7 doesn't support accessing string characters using square
        // bracket notation. IE 8 only supports this for primitives.
        isSupported = "a"[0] != "a";
      } else if (name == "json") {
        // Indicates whether both `JSON.stringify` and `JSON.parse` are
        // supported.
        isSupported = has("json-stringify") && has("json-parse");
      } else {
        var value, serialized = '{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}';
        // Test `JSON.stringify`.
        if (name == "json-stringify") {
          var stringify = exports.stringify, stringifySupported = typeof stringify == "function" && isExtended;
          if (stringifySupported) {
            // A test function object with a custom `toJSON` method.
            (value = function () {
              return 1;
            }).toJSON = value;
            try {
              stringifySupported =
                // Firefox 3.1b1 and b2 serialize string, number, and boolean
                // primitives as object literals.
                stringify(0) === "0" &&
                // FF 3.1b1, b2, and JSON 2 serialize wrapped primitives as object
                // literals.
                stringify(new Number()) === "0" &&
                stringify(new String()) == '""' &&
                // FF 3.1b1, 2 throw an error if the value is `null`, `undefined`, or
                // does not define a canonical JSON representation (this applies to
                // objects with `toJSON` properties as well, *unless* they are nested
                // within an object or array).
                stringify(getClass) === undef &&
                // IE 8 serializes `undefined` as `"undefined"`. Safari <= 5.1.7 and
                // FF 3.1b3 pass this test.
                stringify(undef) === undef &&
                // Safari <= 5.1.7 and FF 3.1b3 throw `Error`s and `TypeError`s,
                // respectively, if the value is omitted entirely.
                stringify() === undef &&
                // FF 3.1b1, 2 throw an error if the given value is not a number,
                // string, array, object, Boolean, or `null` literal. This applies to
                // objects with custom `toJSON` methods as well, unless they are nested
                // inside object or array literals. YUI 3.0.0b1 ignores custom `toJSON`
                // methods entirely.
                stringify(value) === "1" &&
                stringify([value]) == "[1]" &&
                // Prototype <= 1.6.1 serializes `[undefined]` as `"[]"` instead of
                // `"[null]"`.
                stringify([undef]) == "[null]" &&
                // YUI 3.0.0b1 fails to serialize `null` literals.
                stringify(null) == "null" &&
                // FF 3.1b1, 2 halts serialization if an array contains a function:
                // `[1, true, getClass, 1]` serializes as "[1,true,],". FF 3.1b3
                // elides non-JSON values from objects and arrays, unless they
                // define custom `toJSON` methods.
                stringify([undef, getClass, null]) == "[null,null,null]" &&
                // Simple serialization test. FF 3.1b1 uses Unicode escape sequences
                // where character escape codes are expected (e.g., `\b` => `\u0008`).
                stringify({ "a": [value, true, false, null, "\x00\b\n\f\r\t"] }) == serialized &&
                // FF 3.1b1 and b2 ignore the `filter` and `width` arguments.
                stringify(null, value) === "1" &&
                stringify([1, 2], null, 1) == "[\n 1,\n 2\n]" &&
                // JSON 2, Prototype <= 1.7, and older WebKit builds incorrectly
                // serialize extended years.
                stringify(new Date(-8.64e15)) == '"-271821-04-20T00:00:00.000Z"' &&
                // The milliseconds are optional in ES 5, but required in 5.1.
                stringify(new Date(8.64e15)) == '"+275760-09-13T00:00:00.000Z"' &&
                // Firefox <= 11.0 incorrectly serializes years prior to 0 as negative
                // four-digit years instead of six-digit years. Credits: @Yaffle.
                stringify(new Date(-621987552e5)) == '"-000001-01-01T00:00:00.000Z"' &&
                // Safari <= 5.1.5 and Opera >= 10.53 incorrectly serialize millisecond
                // values less than 1000. Credits: @Yaffle.
                stringify(new Date(-1)) == '"1969-12-31T23:59:59.999Z"';
            } catch (exception) {
              stringifySupported = false;
            }
          }
          isSupported = stringifySupported;
        }
        // Test `JSON.parse`.
        if (name == "json-parse") {
          var parse = exports.parse;
          if (typeof parse == "function") {
            try {
              // FF 3.1b1, b2 will throw an exception if a bare literal is provided.
              // Conforming implementations should also coerce the initial argument to
              // a string prior to parsing.
              if (parse("0") === 0 && !parse(false)) {
                // Simple parsing test.
                value = parse(serialized);
                var parseSupported = value["a"].length == 5 && value["a"][0] === 1;
                if (parseSupported) {
                  try {
                    // Safari <= 5.1.2 and FF 3.1b1 allow unescaped tabs in strings.
                    parseSupported = !parse('"\t"');
                  } catch (exception) {}
                  if (parseSupported) {
                    try {
                      // FF 4.0 and 4.0.1 allow leading `+` signs and leading
                      // decimal points. FF 4.0, 4.0.1, and IE 9-10 also allow
                      // certain octal literals.
                      parseSupported = parse("01") !== 1;
                    } catch (exception) {}
                  }
                  if (parseSupported) {
                    try {
                      // FF 4.0, 4.0.1, and Rhino 1.7R3-R4 allow trailing decimal
                      // points. These environments, along with FF 3.1b1 and 2,
                      // also allow trailing commas in JSON objects and arrays.
                      parseSupported = parse("1.") !== 1;
                    } catch (exception) {}
                  }
                }
              }
            } catch (exception) {
              parseSupported = false;
            }
          }
          isSupported = parseSupported;
        }
      }
      return has[name] = !!isSupported;
    }

    if (!has("json")) {
      // Common `[[Class]]` name aliases.
      var functionClass = "[object Function]",
          dateClass = "[object Date]",
          numberClass = "[object Number]",
          stringClass = "[object String]",
          arrayClass = "[object Array]",
          booleanClass = "[object Boolean]";

      // Detect incomplete support for accessing string characters by index.
      var charIndexBuggy = has("bug-string-char-index");

      // Define additional utility methods if the `Date` methods are buggy.
      if (!isExtended) {
        var floor = Math.floor;
        // A mapping between the months of the year and the number of days between
        // January 1st and the first of the respective month.
        var Months = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
        // Internal: Calculates the number of days between the Unix epoch and the
        // first day of the given month.
        var getDay = function (year, month) {
          return Months[month] + 365 * (year - 1970) + floor((year - 1969 + (month = +(month > 1))) / 4) - floor((year - 1901 + month) / 100) + floor((year - 1601 + month) / 400);
        };
      }

      // Internal: Determines if a property is a direct property of the given
      // object. Delegates to the native `Object#hasOwnProperty` method.
      if (!(isProperty = objectProto.hasOwnProperty)) {
        isProperty = function (property) {
          var members = {}, constructor;
          if ((members.__proto__ = null, members.__proto__ = {
            // The *proto* property cannot be set multiple times in recent
            // versions of Firefox and SeaMonkey.
            "toString": 1
          }, members).toString != getClass) {
            // Safari <= 2.0.3 doesn't implement `Object#hasOwnProperty`, but
            // supports the mutable *proto* property.
            isProperty = function (property) {
              // Capture and break the object's prototype chain (see section 8.6.2
              // of the ES 5.1 spec). The parenthesized expression prevents an
              // unsafe transformation by the Closure Compiler.
              var original = this.__proto__, result = property in (this.__proto__ = null, this);
              // Restore the original prototype chain.
              this.__proto__ = original;
              return result;
            };
          } else {
            // Capture a reference to the top-level `Object` constructor.
            constructor = members.constructor;
            // Use the `constructor` property to simulate `Object#hasOwnProperty` in
            // other environments.
            isProperty = function (property) {
              var parent = (this.constructor || constructor).prototype;
              return property in this && !(property in parent && this[property] === parent[property]);
            };
          }
          members = null;
          return isProperty.call(this, property);
        };
      }

      // Internal: Normalizes the `for...in` iteration algorithm across
      // environments. Each enumerated key is yielded to a `callback` function.
      forEach = function (object, callback) {
        var size = 0, Properties, members, property;

        // Tests for bugs in the current environment's `for...in` algorithm. The
        // `valueOf` property inherits the non-enumerable flag from
        // `Object.prototype` in older versions of IE, Netscape, and Mozilla.
        (Properties = function () {
          this.valueOf = 0;
        }).prototype.valueOf = 0;

        // Iterate over a new instance of the `Properties` class.
        members = new Properties();
        for (property in members) {
          // Ignore all properties inherited from `Object.prototype`.
          if (isProperty.call(members, property)) {
            size++;
          }
        }
        Properties = members = null;

        // Normalize the iteration algorithm.
        if (!size) {
          // A list of non-enumerable properties inherited from `Object.prototype`.
          members = ["valueOf", "toString", "toLocaleString", "propertyIsEnumerable", "isPrototypeOf", "hasOwnProperty", "constructor"];
          // IE <= 8, Mozilla 1.0, and Netscape 6.2 ignore shadowed non-enumerable
          // properties.
          forEach = function (object, callback) {
            var isFunction = getClass.call(object) == functionClass, property, length;
            var hasProperty = !isFunction && typeof object.constructor != "function" && objectTypes[typeof object.hasOwnProperty] && object.hasOwnProperty || isProperty;
            for (property in object) {
              // Gecko <= 1.0 enumerates the `prototype` property of functions under
              // certain conditions; IE does not.
              if (!(isFunction && property == "prototype") && hasProperty.call(object, property)) {
                callback(property);
              }
            }
            // Manually invoke the callback for each non-enumerable property.
            for (length = members.length; property = members[--length]; hasProperty.call(object, property) && callback(property));
          };
        } else if (size == 2) {
          // Safari <= 2.0.4 enumerates shadowed properties twice.
          forEach = function (object, callback) {
            // Create a set of iterated properties.
            var members = {}, isFunction = getClass.call(object) == functionClass, property;
            for (property in object) {
              // Store each property name to prevent double enumeration. The
              // `prototype` property of functions is not enumerated due to cross-
              // environment inconsistencies.
              if (!(isFunction && property == "prototype") && !isProperty.call(members, property) && (members[property] = 1) && isProperty.call(object, property)) {
                callback(property);
              }
            }
          };
        } else {
          // No bugs detected; use the standard `for...in` algorithm.
          forEach = function (object, callback) {
            var isFunction = getClass.call(object) == functionClass, property, isConstructor;
            for (property in object) {
              if (!(isFunction && property == "prototype") && isProperty.call(object, property) && !(isConstructor = property === "constructor")) {
                callback(property);
              }
            }
            // Manually invoke the callback for the `constructor` property due to
            // cross-environment inconsistencies.
            if (isConstructor || isProperty.call(object, (property = "constructor"))) {
              callback(property);
            }
          };
        }
        return forEach(object, callback);
      };

      // Public: Serializes a JavaScript `value` as a JSON string. The optional
      // `filter` argument may specify either a function that alters how object and
      // array members are serialized, or an array of strings and numbers that
      // indicates which properties should be serialized. The optional `width`
      // argument may be either a string or number that specifies the indentation
      // level of the output.
      if (!has("json-stringify")) {
        // Internal: A map of control characters and their escaped equivalents.
        var Escapes = {
          92: "\\\\",
          34: '\\"',
          8: "\\b",
          12: "\\f",
          10: "\\n",
          13: "\\r",
          9: "\\t"
        };

        // Internal: Converts `value` into a zero-padded string such that its
        // length is at least equal to `width`. The `width` must be <= 6.
        var leadingZeroes = "000000";
        var toPaddedString = function (width, value) {
          // The `|| 0` expression is necessary to work around a bug in
          // Opera <= 7.54u2 where `0 == -0`, but `String(-0) !== "0"`.
          return (leadingZeroes + (value || 0)).slice(-width);
        };

        // Internal: Double-quotes a string `value`, replacing all ASCII control
        // characters (characters with code unit values between 0 and 31) with
        // their escaped equivalents. This is an implementation of the
        // `Quote(value)` operation defined in ES 5.1 section 15.12.3.
        var unicodePrefix = "\\u00";
        var quote = function (value) {
          var result = '"', index = 0, length = value.length, useCharIndex = !charIndexBuggy || length > 10;
          var symbols = useCharIndex && (charIndexBuggy ? value.split("") : value);
          for (; index < length; index++) {
            var charCode = value.charCodeAt(index);
            // If the character is a control character, append its Unicode or
            // shorthand escape sequence; otherwise, append the character as-is.
            switch (charCode) {
              case 8: case 9: case 10: case 12: case 13: case 34: case 92:
                result += Escapes[charCode];
                break;
              default:
                if (charCode < 32) {
                  result += unicodePrefix + toPaddedString(2, charCode.toString(16));
                  break;
                }
                result += useCharIndex ? symbols[index] : value.charAt(index);
            }
          }
          return result + '"';
        };

        // Internal: Recursively serializes an object. Implements the
        // `Str(key, holder)`, `JO(value)`, and `JA(value)` operations.
        var serialize = function (property, object, callback, properties, whitespace, indentation, stack) {
          var value, className, year, month, date, time, hours, minutes, seconds, milliseconds, results, element, index, length, prefix, result;
          try {
            // Necessary for host object support.
            value = object[property];
          } catch (exception) {}
          if (typeof value == "object" && value) {
            className = getClass.call(value);
            if (className == dateClass && !isProperty.call(value, "toJSON")) {
              if (value > -1 / 0 && value < 1 / 0) {
                // Dates are serialized according to the `Date#toJSON` method
                // specified in ES 5.1 section 15.9.5.44. See section 15.9.1.15
                // for the ISO 8601 date time string format.
                if (getDay) {
                  // Manually compute the year, month, date, hours, minutes,
                  // seconds, and milliseconds if the `getUTC*` methods are
                  // buggy. Adapted from @Yaffle's `date-shim` project.
                  date = floor(value / 864e5);
                  for (year = floor(date / 365.2425) + 1970 - 1; getDay(year + 1, 0) <= date; year++);
                  for (month = floor((date - getDay(year, 0)) / 30.42); getDay(year, month + 1) <= date; month++);
                  date = 1 + date - getDay(year, month);
                  // The `time` value specifies the time within the day (see ES
                  // 5.1 section 15.9.1.2). The formula `(A % B + B) % B` is used
                  // to compute `A modulo B`, as the `%` operator does not
                  // correspond to the `modulo` operation for negative numbers.
                  time = (value % 864e5 + 864e5) % 864e5;
                  // The hours, minutes, seconds, and milliseconds are obtained by
                  // decomposing the time within the day. See section 15.9.1.10.
                  hours = floor(time / 36e5) % 24;
                  minutes = floor(time / 6e4) % 60;
                  seconds = floor(time / 1e3) % 60;
                  milliseconds = time % 1e3;
                } else {
                  year = value.getUTCFullYear();
                  month = value.getUTCMonth();
                  date = value.getUTCDate();
                  hours = value.getUTCHours();
                  minutes = value.getUTCMinutes();
                  seconds = value.getUTCSeconds();
                  milliseconds = value.getUTCMilliseconds();
                }
                // Serialize extended years correctly.
                value = (year <= 0 || year >= 1e4 ? (year < 0 ? "-" : "+") + toPaddedString(6, year < 0 ? -year : year) : toPaddedString(4, year)) +
                  "-" + toPaddedString(2, month + 1) + "-" + toPaddedString(2, date) +
                  // Months, dates, hours, minutes, and seconds should have two
                  // digits; milliseconds should have three.
                  "T" + toPaddedString(2, hours) + ":" + toPaddedString(2, minutes) + ":" + toPaddedString(2, seconds) +
                  // Milliseconds are optional in ES 5.0, but required in 5.1.
                  "." + toPaddedString(3, milliseconds) + "Z";
              } else {
                value = null;
              }
            } else if (typeof value.toJSON == "function" && ((className != numberClass && className != stringClass && className != arrayClass) || isProperty.call(value, "toJSON"))) {
              // Prototype <= 1.6.1 adds non-standard `toJSON` methods to the
              // `Number`, `String`, `Date`, and `Array` prototypes. JSON 3
              // ignores all `toJSON` methods on these objects unless they are
              // defined directly on an instance.
              value = value.toJSON(property);
            }
          }
          if (callback) {
            // If a replacement function was provided, call it to obtain the value
            // for serialization.
            value = callback.call(object, property, value);
          }
          if (value === null) {
            return "null";
          }
          className = getClass.call(value);
          if (className == booleanClass) {
            // Booleans are represented literally.
            return "" + value;
          } else if (className == numberClass) {
            // JSON numbers must be finite. `Infinity` and `NaN` are serialized as
            // `"null"`.
            return value > -1 / 0 && value < 1 / 0 ? "" + value : "null";
          } else if (className == stringClass) {
            // Strings are double-quoted and escaped.
            return quote("" + value);
          }
          // Recursively serialize objects and arrays.
          if (typeof value == "object") {
            // Check for cyclic structures. This is a linear search; performance
            // is inversely proportional to the number of unique nested objects.
            for (length = stack.length; length--;) {
              if (stack[length] === value) {
                // Cyclic structures cannot be serialized by `JSON.stringify`.
                throw TypeError();
              }
            }
            // Add the object to the stack of traversed objects.
            stack.push(value);
            results = [];
            // Save the current indentation level and indent one additional level.
            prefix = indentation;
            indentation += whitespace;
            if (className == arrayClass) {
              // Recursively serialize array elements.
              for (index = 0, length = value.length; index < length; index++) {
                element = serialize(index, value, callback, properties, whitespace, indentation, stack);
                results.push(element === undef ? "null" : element);
              }
              result = results.length ? (whitespace ? "[\n" + indentation + results.join(",\n" + indentation) + "\n" + prefix + "]" : ("[" + results.join(",") + "]")) : "[]";
            } else {
              // Recursively serialize object members. Members are selected from
              // either a user-specified list of property names, or the object
              // itself.
              forEach(properties || value, function (property) {
                var element = serialize(property, value, callback, properties, whitespace, indentation, stack);
                if (element !== undef) {
                  // According to ES 5.1 section 15.12.3: "If `gap` {whitespace}
                  // is not the empty string, let `member` {quote(property) + ":"}
                  // be the concatenation of `member` and the `space` character."
                  // The "`space` character" refers to the literal space
                  // character, not the `space` {width} argument provided to
                  // `JSON.stringify`.
                  results.push(quote(property) + ":" + (whitespace ? " " : "") + element);
                }
              });
              result = results.length ? (whitespace ? "{\n" + indentation + results.join(",\n" + indentation) + "\n" + prefix + "}" : ("{" + results.join(",") + "}")) : "{}";
            }
            // Remove the object from the traversed object stack.
            stack.pop();
            return result;
          }
        };

        // Public: `JSON.stringify`. See ES 5.1 section 15.12.3.
        exports.stringify = function (source, filter, width) {
          var whitespace, callback, properties, className;
          if (objectTypes[typeof filter] && filter) {
            if ((className = getClass.call(filter)) == functionClass) {
              callback = filter;
            } else if (className == arrayClass) {
              // Convert the property names array into a makeshift set.
              properties = {};
              for (var index = 0, length = filter.length, value; index < length; value = filter[index++], ((className = getClass.call(value)), className == stringClass || className == numberClass) && (properties[value] = 1));
            }
          }
          if (width) {
            if ((className = getClass.call(width)) == numberClass) {
              // Convert the `width` to an integer and create a string containing
              // `width` number of space characters.
              if ((width -= width % 1) > 0) {
                for (whitespace = "", width > 10 && (width = 10); whitespace.length < width; whitespace += " ");
              }
            } else if (className == stringClass) {
              whitespace = width.length <= 10 ? width : width.slice(0, 10);
            }
          }
          // Opera <= 7.54u2 discards the values associated with empty string keys
          // (`""`) only if they are used directly within an object member list
          // (e.g., `!("" in { "": 1})`).
          return serialize("", (value = {}, value[""] = source, value), callback, properties, whitespace, "", []);
        };
      }

      // Public: Parses a JSON source string.
      if (!has("json-parse")) {
        var fromCharCode = String.fromCharCode;

        // Internal: A map of escaped control characters and their unescaped
        // equivalents.
        var Unescapes = {
          92: "\\",
          34: '"',
          47: "/",
          98: "\b",
          116: "\t",
          110: "\n",
          102: "\f",
          114: "\r"
        };

        // Internal: Stores the parser state.
        var Index, Source;

        // Internal: Resets the parser state and throws a `SyntaxError`.
        var abort = function () {
          Index = Source = null;
          throw SyntaxError();
        };

        // Internal: Returns the next token, or `"$"` if the parser has reached
        // the end of the source string. A token may be a string, number, `null`
        // literal, or Boolean literal.
        var lex = function () {
          var source = Source, length = source.length, value, begin, position, isSigned, charCode;
          while (Index < length) {
            charCode = source.charCodeAt(Index);
            switch (charCode) {
              case 9: case 10: case 13: case 32:
                // Skip whitespace tokens, including tabs, carriage returns, line
                // feeds, and space characters.
                Index++;
                break;
              case 123: case 125: case 91: case 93: case 58: case 44:
                // Parse a punctuator token (`{`, `}`, `[`, `]`, `:`, or `,`) at
                // the current position.
                value = charIndexBuggy ? source.charAt(Index) : source[Index];
                Index++;
                return value;
              case 34:
                // `"` delimits a JSON string; advance to the next character and
                // begin parsing the string. String tokens are prefixed with the
                // sentinel `@` character to distinguish them from punctuators and
                // end-of-string tokens.
                for (value = "@", Index++; Index < length;) {
                  charCode = source.charCodeAt(Index);
                  if (charCode < 32) {
                    // Unescaped ASCII control characters (those with a code unit
                    // less than the space character) are not permitted.
                    abort();
                  } else if (charCode == 92) {
                    // A reverse solidus (`\`) marks the beginning of an escaped
                    // control character (including `"`, `\`, and `/`) or Unicode
                    // escape sequence.
                    charCode = source.charCodeAt(++Index);
                    switch (charCode) {
                      case 92: case 34: case 47: case 98: case 116: case 110: case 102: case 114:
                        // Revive escaped control characters.
                        value += Unescapes[charCode];
                        Index++;
                        break;
                      case 117:
                        // `\u` marks the beginning of a Unicode escape sequence.
                        // Advance to the first character and validate the
                        // four-digit code point.
                        begin = ++Index;
                        for (position = Index + 4; Index < position; Index++) {
                          charCode = source.charCodeAt(Index);
                          // A valid sequence comprises four hexdigits (case-
                          // insensitive) that form a single hexadecimal value.
                          if (!(charCode >= 48 && charCode <= 57 || charCode >= 97 && charCode <= 102 || charCode >= 65 && charCode <= 70)) {
                            // Invalid Unicode escape sequence.
                            abort();
                          }
                        }
                        // Revive the escaped character.
                        value += fromCharCode("0x" + source.slice(begin, Index));
                        break;
                      default:
                        // Invalid escape sequence.
                        abort();
                    }
                  } else {
                    if (charCode == 34) {
                      // An unescaped double-quote character marks the end of the
                      // string.
                      break;
                    }
                    charCode = source.charCodeAt(Index);
                    begin = Index;
                    // Optimize for the common case where a string is valid.
                    while (charCode >= 32 && charCode != 92 && charCode != 34) {
                      charCode = source.charCodeAt(++Index);
                    }
                    // Append the string as-is.
                    value += source.slice(begin, Index);
                  }
                }
                if (source.charCodeAt(Index) == 34) {
                  // Advance to the next character and return the revived string.
                  Index++;
                  return value;
                }
                // Unterminated string.
                abort();
              default:
                // Parse numbers and literals.
                begin = Index;
                // Advance past the negative sign, if one is specified.
                if (charCode == 45) {
                  isSigned = true;
                  charCode = source.charCodeAt(++Index);
                }
                // Parse an integer or floating-point value.
                if (charCode >= 48 && charCode <= 57) {
                  // Leading zeroes are interpreted as octal literals.
                  if (charCode == 48 && ((charCode = source.charCodeAt(Index + 1)), charCode >= 48 && charCode <= 57)) {
                    // Illegal octal literal.
                    abort();
                  }
                  isSigned = false;
                  // Parse the integer component.
                  for (; Index < length && ((charCode = source.charCodeAt(Index)), charCode >= 48 && charCode <= 57); Index++);
                  // Floats cannot contain a leading decimal point; however, this
                  // case is already accounted for by the parser.
                  if (source.charCodeAt(Index) == 46) {
                    position = ++Index;
                    // Parse the decimal component.
                    for (; position < length && ((charCode = source.charCodeAt(position)), charCode >= 48 && charCode <= 57); position++);
                    if (position == Index) {
                      // Illegal trailing decimal.
                      abort();
                    }
                    Index = position;
                  }
                  // Parse exponents. The `e` denoting the exponent is
                  // case-insensitive.
                  charCode = source.charCodeAt(Index);
                  if (charCode == 101 || charCode == 69) {
                    charCode = source.charCodeAt(++Index);
                    // Skip past the sign following the exponent, if one is
                    // specified.
                    if (charCode == 43 || charCode == 45) {
                      Index++;
                    }
                    // Parse the exponential component.
                    for (position = Index; position < length && ((charCode = source.charCodeAt(position)), charCode >= 48 && charCode <= 57); position++);
                    if (position == Index) {
                      // Illegal empty exponent.
                      abort();
                    }
                    Index = position;
                  }
                  // Coerce the parsed value to a JavaScript number.
                  return +source.slice(begin, Index);
                }
                // A negative sign may only precede numbers.
                if (isSigned) {
                  abort();
                }
                // `true`, `false`, and `null` literals.
                if (source.slice(Index, Index + 4) == "true") {
                  Index += 4;
                  return true;
                } else if (source.slice(Index, Index + 5) == "false") {
                  Index += 5;
                  return false;
                } else if (source.slice(Index, Index + 4) == "null") {
                  Index += 4;
                  return null;
                }
                // Unrecognized token.
                abort();
            }
          }
          // Return the sentinel `$` character if the parser has reached the end
          // of the source string.
          return "$";
        };

        // Internal: Parses a JSON `value` token.
        var get = function (value) {
          var results, hasMembers;
          if (value == "$") {
            // Unexpected end of input.
            abort();
          }
          if (typeof value == "string") {
            if ((charIndexBuggy ? value.charAt(0) : value[0]) == "@") {
              // Remove the sentinel `@` character.
              return value.slice(1);
            }
            // Parse object and array literals.
            if (value == "[") {
              // Parses a JSON array, returning a new JavaScript array.
              results = [];
              for (;; hasMembers || (hasMembers = true)) {
                value = lex();
                // A closing square bracket marks the end of the array literal.
                if (value == "]") {
                  break;
                }
                // If the array literal contains elements, the current token
                // should be a comma separating the previous element from the
                // next.
                if (hasMembers) {
                  if (value == ",") {
                    value = lex();
                    if (value == "]") {
                      // Unexpected trailing `,` in array literal.
                      abort();
                    }
                  } else {
                    // A `,` must separate each array element.
                    abort();
                  }
                }
                // Elisions and leading commas are not permitted.
                if (value == ",") {
                  abort();
                }
                results.push(get(value));
              }
              return results;
            } else if (value == "{") {
              // Parses a JSON object, returning a new JavaScript object.
              results = {};
              for (;; hasMembers || (hasMembers = true)) {
                value = lex();
                // A closing curly brace marks the end of the object literal.
                if (value == "}") {
                  break;
                }
                // If the object literal contains members, the current token
                // should be a comma separator.
                if (hasMembers) {
                  if (value == ",") {
                    value = lex();
                    if (value == "}") {
                      // Unexpected trailing `,` in object literal.
                      abort();
                    }
                  } else {
                    // A `,` must separate each object member.
                    abort();
                  }
                }
                // Leading commas are not permitted, object property names must be
                // double-quoted strings, and a `:` must separate each property
                // name and value.
                if (value == "," || typeof value != "string" || (charIndexBuggy ? value.charAt(0) : value[0]) != "@" || lex() != ":") {
                  abort();
                }
                results[value.slice(1)] = get(lex());
              }
              return results;
            }
            // Unexpected token encountered.
            abort();
          }
          return value;
        };

        // Internal: Updates a traversed object member.
        var update = function (source, property, callback) {
          var element = walk(source, property, callback);
          if (element === undef) {
            delete source[property];
          } else {
            source[property] = element;
          }
        };

        // Internal: Recursively traverses a parsed JSON object, invoking the
        // `callback` function for each value. This is an implementation of the
        // `Walk(holder, name)` operation defined in ES 5.1 section 15.12.2.
        var walk = function (source, property, callback) {
          var value = source[property], length;
          if (typeof value == "object" && value) {
            // `forEach` can't be used to traverse an array in Opera <= 8.54
            // because its `Object#hasOwnProperty` implementation returns `false`
            // for array indices (e.g., `![1, 2, 3].hasOwnProperty("0")`).
            if (getClass.call(value) == arrayClass) {
              for (length = value.length; length--;) {
                update(value, length, callback);
              }
            } else {
              forEach(value, function (property) {
                update(value, property, callback);
              });
            }
          }
          return callback.call(source, property, value);
        };

        // Public: `JSON.parse`. See ES 5.1 section 15.12.2.
        exports.parse = function (source, callback) {
          var result, value;
          Index = 0;
          Source = "" + source;
          result = get(lex());
          // If a JSON string contains multiple tokens, it is invalid.
          if (lex() != "$") {
            abort();
          }
          // Reset the parser state.
          Index = Source = null;
          return callback && getClass.call(callback) == functionClass ? walk((value = {}, value[""] = result, value), "", callback) : result;
        };
      }
    }

    exports["runInContext"] = runInContext;
    return exports;
  }

  if (freeExports && !isLoader) {
    // Export for CommonJS environments.
    runInContext(root, freeExports);
  } else {
    // Export for web browsers and JavaScript engines.
    var nativeJSON = root.JSON,
        previousJSON = root["JSON3"],
        isRestored = false;

    var JSON3 = runInContext(root, (root["JSON3"] = {
      // Public: Restores the original value of the global `JSON` object and
      // returns a reference to the `JSON3` object.
      "noConflict": function () {
        if (!isRestored) {
          isRestored = true;
          root.JSON = nativeJSON;
          root["JSON3"] = previousJSON;
          nativeJSON = previousJSON = null;
        }
        return JSON3;
      }
    }));

    root.JSON = {
      "parse": JSON3.parse,
      "stringify": JSON3.stringify
    };
  }

  // Export for asynchronous module loaders.
  if (isLoader) {
    define(function () {
      return JSON3;
    });
  }
}).call(this);

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],59:[function(require,module,exports){
'use strict';

var has = Object.prototype.hasOwnProperty;

/**
 * Decode a URI encoded string.
 *
 * @param {String} input The URI encoded string.
 * @returns {String} The decoded string.
 * @api private
 */
function decode(input) {
  return decodeURIComponent(input.replace(/\+/g, ' '));
}

/**
 * Simple query string parser.
 *
 * @param {String} query The query string that needs to be parsed.
 * @returns {Object}
 * @api public
 */
function querystring(query) {
  var parser = /([^=?&]+)=?([^&]*)/g
    , result = {}
    , part;

  while (part = parser.exec(query)) {
    var key = decode(part[1])
      , value = decode(part[2]);

    //
    // Prevent overriding of existing properties. This ensures that build-in
    // methods like `toString` or __proto__ are not overriden by malicious
    // querystrings.
    //
    if (key in result) continue;
    result[key] = value;
  }

  return result;
}

/**
 * Transform a query string to an object.
 *
 * @param {Object} obj Object that should be transformed.
 * @param {String} prefix Optional prefix.
 * @returns {String}
 * @api public
 */
function querystringify(obj, prefix) {
  prefix = prefix || '';

  var pairs = [];

  //
  // Optionally prefix with a '?' if needed
  //
  if ('string' !== typeof prefix) prefix = '?';

  for (var key in obj) {
    if (has.call(obj, key)) {
      pairs.push(encodeURIComponent(key) +'='+ encodeURIComponent(obj[key]));
    }
  }

  return pairs.length ? prefix + pairs.join('&') : '';
}

//
// Expose the module.
//
exports.stringify = querystringify;
exports.parse = querystring;

},{}],60:[function(require,module,exports){
'use strict';

/**
 * Check if we're required to add a port number.
 *
 * @see https://url.spec.whatwg.org/#default-port
 * @param {Number|String} port Port number we need to check
 * @param {String} protocol Protocol we need to check against.
 * @returns {Boolean} Is it a default port for the given protocol
 * @api private
 */
module.exports = function required(port, protocol) {
  protocol = protocol.split(':')[0];
  port = +port;

  if (!port) return false;

  switch (protocol) {
    case 'http':
    case 'ws':
    return port !== 80;

    case 'https':
    case 'wss':
    return port !== 443;

    case 'ftp':
    return port !== 21;

    case 'gopher':
    return port !== 70;

    case 'file':
    return false;
  }

  return port !== 0;
};

},{}],61:[function(require,module,exports){
(function (global){
'use strict';

var required = require('requires-port')
  , qs = require('querystringify')
  , protocolre = /^([a-z][a-z0-9.+-]*:)?(\/\/)?([\S\s]*)/i
  , slashes = /^[A-Za-z][A-Za-z0-9+-.]*:\/\//;

/**
 * These are the parse rules for the URL parser, it informs the parser
 * about:
 *
 * 0. The char it Needs to parse, if it's a string it should be done using
 *    indexOf, RegExp using exec and NaN means set as current value.
 * 1. The property we should set when parsing this value.
 * 2. Indication if it's backwards or forward parsing, when set as number it's
 *    the value of extra chars that should be split off.
 * 3. Inherit from location if non existing in the parser.
 * 4. `toLowerCase` the resulting value.
 */
var rules = [
  ['#', 'hash'],                        // Extract from the back.
  ['?', 'query'],                       // Extract from the back.
  function sanitize(address) {          // Sanitize what is left of the address
    return address.replace('\\', '/');
  },
  ['/', 'pathname'],                    // Extract from the back.
  ['@', 'auth', 1],                     // Extract from the front.
  [NaN, 'host', undefined, 1, 1],       // Set left over value.
  [/:(\d+)$/, 'port', undefined, 1],    // RegExp the back.
  [NaN, 'hostname', undefined, 1, 1]    // Set left over.
];

/**
 * These properties should not be copied or inherited from. This is only needed
 * for all non blob URL's as a blob URL does not include a hash, only the
 * origin.
 *
 * @type {Object}
 * @private
 */
var ignore = { hash: 1, query: 1 };

/**
 * The location object differs when your code is loaded through a normal page,
 * Worker or through a worker using a blob. And with the blobble begins the
 * trouble as the location object will contain the URL of the blob, not the
 * location of the page where our code is loaded in. The actual origin is
 * encoded in the `pathname` so we can thankfully generate a good "default"
 * location from it so we can generate proper relative URL's again.
 *
 * @param {Object|String} loc Optional default location object.
 * @returns {Object} lolcation object.
 * @public
 */
function lolcation(loc) {
  var location = global && global.location || {};
  loc = loc || location;

  var finaldestination = {}
    , type = typeof loc
    , key;

  if ('blob:' === loc.protocol) {
    finaldestination = new Url(unescape(loc.pathname), {});
  } else if ('string' === type) {
    finaldestination = new Url(loc, {});
    for (key in ignore) delete finaldestination[key];
  } else if ('object' === type) {
    for (key in loc) {
      if (key in ignore) continue;
      finaldestination[key] = loc[key];
    }

    if (finaldestination.slashes === undefined) {
      finaldestination.slashes = slashes.test(loc.href);
    }
  }

  return finaldestination;
}

/**
 * @typedef ProtocolExtract
 * @type Object
 * @property {String} protocol Protocol matched in the URL, in lowercase.
 * @property {Boolean} slashes `true` if protocol is followed by "//", else `false`.
 * @property {String} rest Rest of the URL that is not part of the protocol.
 */

/**
 * Extract protocol information from a URL with/without double slash ("//").
 *
 * @param {String} address URL we want to extract from.
 * @return {ProtocolExtract} Extracted information.
 * @private
 */
function extractProtocol(address) {
  var match = protocolre.exec(address);

  return {
    protocol: match[1] ? match[1].toLowerCase() : '',
    slashes: !!match[2],
    rest: match[3]
  };
}

/**
 * Resolve a relative URL pathname against a base URL pathname.
 *
 * @param {String} relative Pathname of the relative URL.
 * @param {String} base Pathname of the base URL.
 * @return {String} Resolved pathname.
 * @private
 */
function resolve(relative, base) {
  var path = (base || '/').split('/').slice(0, -1).concat(relative.split('/'))
    , i = path.length
    , last = path[i - 1]
    , unshift = false
    , up = 0;

  while (i--) {
    if (path[i] === '.') {
      path.splice(i, 1);
    } else if (path[i] === '..') {
      path.splice(i, 1);
      up++;
    } else if (up) {
      if (i === 0) unshift = true;
      path.splice(i, 1);
      up--;
    }
  }

  if (unshift) path.unshift('');
  if (last === '.' || last === '..') path.push('');

  return path.join('/');
}

/**
 * The actual URL instance. Instead of returning an object we've opted-in to
 * create an actual constructor as it's much more memory efficient and
 * faster and it pleases my OCD.
 *
 * It is worth noting that we should not use `URL` as class name to prevent
 * clashes with the global URL instance that got introduced in browsers.
 *
 * @constructor
 * @param {String} address URL we want to parse.
 * @param {Object|String} location Location defaults for relative paths.
 * @param {Boolean|Function} parser Parser for the query string.
 * @private
 */
function Url(address, location, parser) {
  if (!(this instanceof Url)) {
    return new Url(address, location, parser);
  }

  var relative, extracted, parse, instruction, index, key
    , instructions = rules.slice()
    , type = typeof location
    , url = this
    , i = 0;

  //
  // The following if statements allows this module two have compatibility with
  // 2 different API:
  //
  // 1. Node.js's `url.parse` api which accepts a URL, boolean as arguments
  //    where the boolean indicates that the query string should also be parsed.
  //
  // 2. The `URL` interface of the browser which accepts a URL, object as
  //    arguments. The supplied object will be used as default values / fall-back
  //    for relative paths.
  //
  if ('object' !== type && 'string' !== type) {
    parser = location;
    location = null;
  }

  if (parser && 'function' !== typeof parser) parser = qs.parse;

  location = lolcation(location);

  //
  // Extract protocol information before running the instructions.
  //
  extracted = extractProtocol(address || '');
  relative = !extracted.protocol && !extracted.slashes;
  url.slashes = extracted.slashes || relative && location.slashes;
  url.protocol = extracted.protocol || location.protocol || '';
  address = extracted.rest;

  //
  // When the authority component is absent the URL starts with a path
  // component.
  //
  if (!extracted.slashes) instructions[3] = [/(.*)/, 'pathname'];

  for (; i < instructions.length; i++) {
    instruction = instructions[i];

    if (typeof instruction === 'function') {
      address = instruction(address);
      continue;
    }

    parse = instruction[0];
    key = instruction[1];

    if (parse !== parse) {
      url[key] = address;
    } else if ('string' === typeof parse) {
      if (~(index = address.indexOf(parse))) {
        if ('number' === typeof instruction[2]) {
          url[key] = address.slice(0, index);
          address = address.slice(index + instruction[2]);
        } else {
          url[key] = address.slice(index);
          address = address.slice(0, index);
        }
      }
    } else if ((index = parse.exec(address))) {
      url[key] = index[1];
      address = address.slice(0, index.index);
    }

    url[key] = url[key] || (
      relative && instruction[3] ? location[key] || '' : ''
    );

    //
    // Hostname, host and protocol should be lowercased so they can be used to
    // create a proper `origin`.
    //
    if (instruction[4]) url[key] = url[key].toLowerCase();
  }

  //
  // Also parse the supplied query string in to an object. If we're supplied
  // with a custom parser as function use that instead of the default build-in
  // parser.
  //
  if (parser) url.query = parser(url.query);

  //
  // If the URL is relative, resolve the pathname against the base URL.
  //
  if (
      relative
    && location.slashes
    && url.pathname.charAt(0) !== '/'
    && (url.pathname !== '' || location.pathname !== '')
  ) {
    url.pathname = resolve(url.pathname, location.pathname);
  }

  //
  // We should not add port numbers if they are already the default port number
  // for a given protocol. As the host also contains the port number we're going
  // override it with the hostname which contains no port number.
  //
  if (!required(url.port, url.protocol)) {
    url.host = url.hostname;
    url.port = '';
  }

  //
  // Parse down the `auth` for the username and password.
  //
  url.username = url.password = '';
  if (url.auth) {
    instruction = url.auth.split(':');
    url.username = instruction[0] || '';
    url.password = instruction[1] || '';
  }

  url.origin = url.protocol && url.host && url.protocol !== 'file:'
    ? url.protocol +'//'+ url.host
    : 'null';

  //
  // The href is just the compiled result.
  //
  url.href = url.toString();
}

/**
 * This is convenience method for changing properties in the URL instance to
 * insure that they all propagate correctly.
 *
 * @param {String} part          Property we need to adjust.
 * @param {Mixed} value          The newly assigned value.
 * @param {Boolean|Function} fn  When setting the query, it will be the function
 *                               used to parse the query.
 *                               When setting the protocol, double slash will be
 *                               removed from the final url if it is true.
 * @returns {URL} URL instance for chaining.
 * @public
 */
function set(part, value, fn) {
  var url = this;

  switch (part) {
    case 'query':
      if ('string' === typeof value && value.length) {
        value = (fn || qs.parse)(value);
      }

      url[part] = value;
      break;

    case 'port':
      url[part] = value;

      if (!required(value, url.protocol)) {
        url.host = url.hostname;
        url[part] = '';
      } else if (value) {
        url.host = url.hostname +':'+ value;
      }

      break;

    case 'hostname':
      url[part] = value;

      if (url.port) value += ':'+ url.port;
      url.host = value;
      break;

    case 'host':
      url[part] = value;

      if (/:\d+$/.test(value)) {
        value = value.split(':');
        url.port = value.pop();
        url.hostname = value.join(':');
      } else {
        url.hostname = value;
        url.port = '';
      }

      break;

    case 'protocol':
      url.protocol = value.toLowerCase();
      url.slashes = !fn;
      break;

    case 'pathname':
    case 'hash':
      if (value) {
        var char = part === 'pathname' ? '/' : '#';
        url[part] = value.charAt(0) !== char ? char + value : value;
      } else {
        url[part] = value;
      }
      break;

    default:
      url[part] = value;
  }

  for (var i = 0; i < rules.length; i++) {
    var ins = rules[i];

    if (ins[4]) url[ins[1]] = url[ins[1]].toLowerCase();
  }

  url.origin = url.protocol && url.host && url.protocol !== 'file:'
    ? url.protocol +'//'+ url.host
    : 'null';

  url.href = url.toString();

  return url;
}

/**
 * Transform the properties back in to a valid and full URL string.
 *
 * @param {Function} stringify Optional query stringify function.
 * @returns {String} Compiled version of the URL.
 * @public
 */
function toString(stringify) {
  if (!stringify || 'function' !== typeof stringify) stringify = qs.stringify;

  var query
    , url = this
    , protocol = url.protocol;

  if (protocol && protocol.charAt(protocol.length - 1) !== ':') protocol += ':';

  var result = protocol + (url.slashes ? '//' : '');

  if (url.username) {
    result += url.username;
    if (url.password) result += ':'+ url.password;
    result += '@';
  }

  result += url.host + url.pathname;

  query = 'object' === typeof url.query ? stringify(url.query) : url.query;
  if (query) result += '?' !== query.charAt(0) ? '?'+ query : query;

  if (url.hash) result += url.hash;

  return result;
}

Url.prototype = { set: set, toString: toString };

//
// Expose the URL parser and some additional properties that might be useful for
// others or testing.
//
Url.extractProtocol = extractProtocol;
Url.location = lolcation;
Url.qs = qs;

module.exports = Url;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"querystringify":59,"requires-port":60}]},{},[1])(1)
});


//# sourceMappingURL=sockjs.js.map

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/url/url.js":
/*!*********************************!*\
  !*** ./node_modules/url/url.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var punycode = __webpack_require__(/*! punycode */ "./node_modules/node-libs-browser/node_modules/punycode/punycode.js");
var util = __webpack_require__(/*! ./util */ "./node_modules/url/util.js");

exports.parse = urlParse;
exports.resolve = urlResolve;
exports.resolveObject = urlResolveObject;
exports.format = urlFormat;

exports.Url = Url;

function Url() {
  this.protocol = null;
  this.slashes = null;
  this.auth = null;
  this.host = null;
  this.port = null;
  this.hostname = null;
  this.hash = null;
  this.search = null;
  this.query = null;
  this.pathname = null;
  this.path = null;
  this.href = null;
}

// Reference: RFC 3986, RFC 1808, RFC 2396

// define these here so at least they only have to be
// compiled once on the first module load.
var protocolPattern = /^([a-z0-9.+-]+:)/i,
    portPattern = /:[0-9]*$/,

    // Special case for a simple path URL
    simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,

    // RFC 2396: characters reserved for delimiting URLs.
    // We actually just auto-escape these.
    delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'],

    // RFC 2396: characters not allowed for various reasons.
    unwise = ['{', '}', '|', '\\', '^', '`'].concat(delims),

    // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
    autoEscape = ['\''].concat(unwise),
    // Characters that are never ever allowed in a hostname.
    // Note that any invalid chars are also handled, but these
    // are the ones that are *expected* to be seen, so we fast-path
    // them.
    nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape),
    hostEndingChars = ['/', '?', '#'],
    hostnameMaxLen = 255,
    hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/,
    hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
    // protocols that can allow "unsafe" and "unwise" chars.
    unsafeProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that never have a hostname.
    hostlessProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that always contain a // bit.
    slashedProtocol = {
      'http': true,
      'https': true,
      'ftp': true,
      'gopher': true,
      'file': true,
      'http:': true,
      'https:': true,
      'ftp:': true,
      'gopher:': true,
      'file:': true
    },
    querystring = __webpack_require__(/*! querystring */ "./node_modules/querystring-es3/index.js");

function urlParse(url, parseQueryString, slashesDenoteHost) {
  if (url && util.isObject(url) && url instanceof Url) return url;

  var u = new Url;
  u.parse(url, parseQueryString, slashesDenoteHost);
  return u;
}

Url.prototype.parse = function(url, parseQueryString, slashesDenoteHost) {
  if (!util.isString(url)) {
    throw new TypeError("Parameter 'url' must be a string, not " + typeof url);
  }

  // Copy chrome, IE, opera backslash-handling behavior.
  // Back slashes before the query string get converted to forward slashes
  // See: https://code.google.com/p/chromium/issues/detail?id=25916
  var queryIndex = url.indexOf('?'),
      splitter =
          (queryIndex !== -1 && queryIndex < url.indexOf('#')) ? '?' : '#',
      uSplit = url.split(splitter),
      slashRegex = /\\/g;
  uSplit[0] = uSplit[0].replace(slashRegex, '/');
  url = uSplit.join(splitter);

  var rest = url;

  // trim before proceeding.
  // This is to support parse stuff like "  http://foo.com  \n"
  rest = rest.trim();

  if (!slashesDenoteHost && url.split('#').length === 1) {
    // Try fast path regexp
    var simplePath = simplePathPattern.exec(rest);
    if (simplePath) {
      this.path = rest;
      this.href = rest;
      this.pathname = simplePath[1];
      if (simplePath[2]) {
        this.search = simplePath[2];
        if (parseQueryString) {
          this.query = querystring.parse(this.search.substr(1));
        } else {
          this.query = this.search.substr(1);
        }
      } else if (parseQueryString) {
        this.search = '';
        this.query = {};
      }
      return this;
    }
  }

  var proto = protocolPattern.exec(rest);
  if (proto) {
    proto = proto[0];
    var lowerProto = proto.toLowerCase();
    this.protocol = lowerProto;
    rest = rest.substr(proto.length);
  }

  // figure out if it's got a host
  // user@server is *always* interpreted as a hostname, and url
  // resolution will treat //foo/bar as host=foo,path=bar because that's
  // how the browser resolves relative URLs.
  if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
    var slashes = rest.substr(0, 2) === '//';
    if (slashes && !(proto && hostlessProtocol[proto])) {
      rest = rest.substr(2);
      this.slashes = true;
    }
  }

  if (!hostlessProtocol[proto] &&
      (slashes || (proto && !slashedProtocol[proto]))) {

    // there's a hostname.
    // the first instance of /, ?, ;, or # ends the host.
    //
    // If there is an @ in the hostname, then non-host chars *are* allowed
    // to the left of the last @ sign, unless some host-ending character
    // comes *before* the @-sign.
    // URLs are obnoxious.
    //
    // ex:
    // http://a@b@c/ => user:a@b host:c
    // http://a@b?@c => user:a host:c path:/?@c

    // v0.12 TODO(isaacs): This is not quite how Chrome does things.
    // Review our test case against browsers more comprehensively.

    // find the first instance of any hostEndingChars
    var hostEnd = -1;
    for (var i = 0; i < hostEndingChars.length; i++) {
      var hec = rest.indexOf(hostEndingChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
        hostEnd = hec;
    }

    // at this point, either we have an explicit point where the
    // auth portion cannot go past, or the last @ char is the decider.
    var auth, atSign;
    if (hostEnd === -1) {
      // atSign can be anywhere.
      atSign = rest.lastIndexOf('@');
    } else {
      // atSign must be in auth portion.
      // http://a@b/c@d => host:b auth:a path:/c@d
      atSign = rest.lastIndexOf('@', hostEnd);
    }

    // Now we have a portion which is definitely the auth.
    // Pull that off.
    if (atSign !== -1) {
      auth = rest.slice(0, atSign);
      rest = rest.slice(atSign + 1);
      this.auth = decodeURIComponent(auth);
    }

    // the host is the remaining to the left of the first non-host char
    hostEnd = -1;
    for (var i = 0; i < nonHostChars.length; i++) {
      var hec = rest.indexOf(nonHostChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
        hostEnd = hec;
    }
    // if we still have not hit it, then the entire thing is a host.
    if (hostEnd === -1)
      hostEnd = rest.length;

    this.host = rest.slice(0, hostEnd);
    rest = rest.slice(hostEnd);

    // pull out port.
    this.parseHost();

    // we've indicated that there is a hostname,
    // so even if it's empty, it has to be present.
    this.hostname = this.hostname || '';

    // if hostname begins with [ and ends with ]
    // assume that it's an IPv6 address.
    var ipv6Hostname = this.hostname[0] === '[' &&
        this.hostname[this.hostname.length - 1] === ']';

    // validate a little.
    if (!ipv6Hostname) {
      var hostparts = this.hostname.split(/\./);
      for (var i = 0, l = hostparts.length; i < l; i++) {
        var part = hostparts[i];
        if (!part) continue;
        if (!part.match(hostnamePartPattern)) {
          var newpart = '';
          for (var j = 0, k = part.length; j < k; j++) {
            if (part.charCodeAt(j) > 127) {
              // we replace non-ASCII char with a temporary placeholder
              // we need this to make sure size of hostname is not
              // broken by replacing non-ASCII by nothing
              newpart += 'x';
            } else {
              newpart += part[j];
            }
          }
          // we test again with ASCII char only
          if (!newpart.match(hostnamePartPattern)) {
            var validParts = hostparts.slice(0, i);
            var notHost = hostparts.slice(i + 1);
            var bit = part.match(hostnamePartStart);
            if (bit) {
              validParts.push(bit[1]);
              notHost.unshift(bit[2]);
            }
            if (notHost.length) {
              rest = '/' + notHost.join('.') + rest;
            }
            this.hostname = validParts.join('.');
            break;
          }
        }
      }
    }

    if (this.hostname.length > hostnameMaxLen) {
      this.hostname = '';
    } else {
      // hostnames are always lower case.
      this.hostname = this.hostname.toLowerCase();
    }

    if (!ipv6Hostname) {
      // IDNA Support: Returns a punycoded representation of "domain".
      // It only converts parts of the domain name that
      // have non-ASCII characters, i.e. it doesn't matter if
      // you call it with a domain that already is ASCII-only.
      this.hostname = punycode.toASCII(this.hostname);
    }

    var p = this.port ? ':' + this.port : '';
    var h = this.hostname || '';
    this.host = h + p;
    this.href += this.host;

    // strip [ and ] from the hostname
    // the host field still retains them, though
    if (ipv6Hostname) {
      this.hostname = this.hostname.substr(1, this.hostname.length - 2);
      if (rest[0] !== '/') {
        rest = '/' + rest;
      }
    }
  }

  // now rest is set to the post-host stuff.
  // chop off any delim chars.
  if (!unsafeProtocol[lowerProto]) {

    // First, make 100% sure that any "autoEscape" chars get
    // escaped, even if encodeURIComponent doesn't think they
    // need to be.
    for (var i = 0, l = autoEscape.length; i < l; i++) {
      var ae = autoEscape[i];
      if (rest.indexOf(ae) === -1)
        continue;
      var esc = encodeURIComponent(ae);
      if (esc === ae) {
        esc = escape(ae);
      }
      rest = rest.split(ae).join(esc);
    }
  }


  // chop off from the tail first.
  var hash = rest.indexOf('#');
  if (hash !== -1) {
    // got a fragment string.
    this.hash = rest.substr(hash);
    rest = rest.slice(0, hash);
  }
  var qm = rest.indexOf('?');
  if (qm !== -1) {
    this.search = rest.substr(qm);
    this.query = rest.substr(qm + 1);
    if (parseQueryString) {
      this.query = querystring.parse(this.query);
    }
    rest = rest.slice(0, qm);
  } else if (parseQueryString) {
    // no query string, but parseQueryString still requested
    this.search = '';
    this.query = {};
  }
  if (rest) this.pathname = rest;
  if (slashedProtocol[lowerProto] &&
      this.hostname && !this.pathname) {
    this.pathname = '/';
  }

  //to support http.request
  if (this.pathname || this.search) {
    var p = this.pathname || '';
    var s = this.search || '';
    this.path = p + s;
  }

  // finally, reconstruct the href based on what has been validated.
  this.href = this.format();
  return this;
};

// format a parsed object into a url string
function urlFormat(obj) {
  // ensure it's an object, and not a string url.
  // If it's an obj, this is a no-op.
  // this way, you can call url_format() on strings
  // to clean up potentially wonky urls.
  if (util.isString(obj)) obj = urlParse(obj);
  if (!(obj instanceof Url)) return Url.prototype.format.call(obj);
  return obj.format();
}

Url.prototype.format = function() {
  var auth = this.auth || '';
  if (auth) {
    auth = encodeURIComponent(auth);
    auth = auth.replace(/%3A/i, ':');
    auth += '@';
  }

  var protocol = this.protocol || '',
      pathname = this.pathname || '',
      hash = this.hash || '',
      host = false,
      query = '';

  if (this.host) {
    host = auth + this.host;
  } else if (this.hostname) {
    host = auth + (this.hostname.indexOf(':') === -1 ?
        this.hostname :
        '[' + this.hostname + ']');
    if (this.port) {
      host += ':' + this.port;
    }
  }

  if (this.query &&
      util.isObject(this.query) &&
      Object.keys(this.query).length) {
    query = querystring.stringify(this.query);
  }

  var search = this.search || (query && ('?' + query)) || '';

  if (protocol && protocol.substr(-1) !== ':') protocol += ':';

  // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
  // unless they had them to begin with.
  if (this.slashes ||
      (!protocol || slashedProtocol[protocol]) && host !== false) {
    host = '//' + (host || '');
    if (pathname && pathname.charAt(0) !== '/') pathname = '/' + pathname;
  } else if (!host) {
    host = '';
  }

  if (hash && hash.charAt(0) !== '#') hash = '#' + hash;
  if (search && search.charAt(0) !== '?') search = '?' + search;

  pathname = pathname.replace(/[?#]/g, function(match) {
    return encodeURIComponent(match);
  });
  search = search.replace('#', '%23');

  return protocol + host + pathname + search + hash;
};

function urlResolve(source, relative) {
  return urlParse(source, false, true).resolve(relative);
}

Url.prototype.resolve = function(relative) {
  return this.resolveObject(urlParse(relative, false, true)).format();
};

function urlResolveObject(source, relative) {
  if (!source) return relative;
  return urlParse(source, false, true).resolveObject(relative);
}

Url.prototype.resolveObject = function(relative) {
  if (util.isString(relative)) {
    var rel = new Url();
    rel.parse(relative, false, true);
    relative = rel;
  }

  var result = new Url();
  var tkeys = Object.keys(this);
  for (var tk = 0; tk < tkeys.length; tk++) {
    var tkey = tkeys[tk];
    result[tkey] = this[tkey];
  }

  // hash is always overridden, no matter what.
  // even href="" will remove it.
  result.hash = relative.hash;

  // if the relative url is empty, then there's nothing left to do here.
  if (relative.href === '') {
    result.href = result.format();
    return result;
  }

  // hrefs like //foo/bar always cut to the protocol.
  if (relative.slashes && !relative.protocol) {
    // take everything except the protocol from relative
    var rkeys = Object.keys(relative);
    for (var rk = 0; rk < rkeys.length; rk++) {
      var rkey = rkeys[rk];
      if (rkey !== 'protocol')
        result[rkey] = relative[rkey];
    }

    //urlParse appends trailing / to urls like http://www.example.com
    if (slashedProtocol[result.protocol] &&
        result.hostname && !result.pathname) {
      result.path = result.pathname = '/';
    }

    result.href = result.format();
    return result;
  }

  if (relative.protocol && relative.protocol !== result.protocol) {
    // if it's a known url protocol, then changing
    // the protocol does weird things
    // first, if it's not file:, then we MUST have a host,
    // and if there was a path
    // to begin with, then we MUST have a path.
    // if it is file:, then the host is dropped,
    // because that's known to be hostless.
    // anything else is assumed to be absolute.
    if (!slashedProtocol[relative.protocol]) {
      var keys = Object.keys(relative);
      for (var v = 0; v < keys.length; v++) {
        var k = keys[v];
        result[k] = relative[k];
      }
      result.href = result.format();
      return result;
    }

    result.protocol = relative.protocol;
    if (!relative.host && !hostlessProtocol[relative.protocol]) {
      var relPath = (relative.pathname || '').split('/');
      while (relPath.length && !(relative.host = relPath.shift()));
      if (!relative.host) relative.host = '';
      if (!relative.hostname) relative.hostname = '';
      if (relPath[0] !== '') relPath.unshift('');
      if (relPath.length < 2) relPath.unshift('');
      result.pathname = relPath.join('/');
    } else {
      result.pathname = relative.pathname;
    }
    result.search = relative.search;
    result.query = relative.query;
    result.host = relative.host || '';
    result.auth = relative.auth;
    result.hostname = relative.hostname || relative.host;
    result.port = relative.port;
    // to support http.request
    if (result.pathname || result.search) {
      var p = result.pathname || '';
      var s = result.search || '';
      result.path = p + s;
    }
    result.slashes = result.slashes || relative.slashes;
    result.href = result.format();
    return result;
  }

  var isSourceAbs = (result.pathname && result.pathname.charAt(0) === '/'),
      isRelAbs = (
          relative.host ||
          relative.pathname && relative.pathname.charAt(0) === '/'
      ),
      mustEndAbs = (isRelAbs || isSourceAbs ||
                    (result.host && relative.pathname)),
      removeAllDots = mustEndAbs,
      srcPath = result.pathname && result.pathname.split('/') || [],
      relPath = relative.pathname && relative.pathname.split('/') || [],
      psychotic = result.protocol && !slashedProtocol[result.protocol];

  // if the url is a non-slashed url, then relative
  // links like ../.. should be able
  // to crawl up to the hostname, as well.  This is strange.
  // result.protocol has already been set by now.
  // Later on, put the first path part into the host field.
  if (psychotic) {
    result.hostname = '';
    result.port = null;
    if (result.host) {
      if (srcPath[0] === '') srcPath[0] = result.host;
      else srcPath.unshift(result.host);
    }
    result.host = '';
    if (relative.protocol) {
      relative.hostname = null;
      relative.port = null;
      if (relative.host) {
        if (relPath[0] === '') relPath[0] = relative.host;
        else relPath.unshift(relative.host);
      }
      relative.host = null;
    }
    mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');
  }

  if (isRelAbs) {
    // it's absolute.
    result.host = (relative.host || relative.host === '') ?
                  relative.host : result.host;
    result.hostname = (relative.hostname || relative.hostname === '') ?
                      relative.hostname : result.hostname;
    result.search = relative.search;
    result.query = relative.query;
    srcPath = relPath;
    // fall through to the dot-handling below.
  } else if (relPath.length) {
    // it's relative
    // throw away the existing file, and take the new path instead.
    if (!srcPath) srcPath = [];
    srcPath.pop();
    srcPath = srcPath.concat(relPath);
    result.search = relative.search;
    result.query = relative.query;
  } else if (!util.isNullOrUndefined(relative.search)) {
    // just pull out the search.
    // like href='?foo'.
    // Put this after the other two cases because it simplifies the booleans
    if (psychotic) {
      result.hostname = result.host = srcPath.shift();
      //occationaly the auth can get stuck only in host
      //this especially happens in cases like
      //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
      var authInHost = result.host && result.host.indexOf('@') > 0 ?
                       result.host.split('@') : false;
      if (authInHost) {
        result.auth = authInHost.shift();
        result.host = result.hostname = authInHost.shift();
      }
    }
    result.search = relative.search;
    result.query = relative.query;
    //to support http.request
    if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
      result.path = (result.pathname ? result.pathname : '') +
                    (result.search ? result.search : '');
    }
    result.href = result.format();
    return result;
  }

  if (!srcPath.length) {
    // no path at all.  easy.
    // we've already handled the other stuff above.
    result.pathname = null;
    //to support http.request
    if (result.search) {
      result.path = '/' + result.search;
    } else {
      result.path = null;
    }
    result.href = result.format();
    return result;
  }

  // if a url ENDs in . or .., then it must get a trailing slash.
  // however, if it ends in anything else non-slashy,
  // then it must NOT get a trailing slash.
  var last = srcPath.slice(-1)[0];
  var hasTrailingSlash = (
      (result.host || relative.host || srcPath.length > 1) &&
      (last === '.' || last === '..') || last === '');

  // strip single dots, resolve double dots to parent dir
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = srcPath.length; i >= 0; i--) {
    last = srcPath[i];
    if (last === '.') {
      srcPath.splice(i, 1);
    } else if (last === '..') {
      srcPath.splice(i, 1);
      up++;
    } else if (up) {
      srcPath.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (!mustEndAbs && !removeAllDots) {
    for (; up--; up) {
      srcPath.unshift('..');
    }
  }

  if (mustEndAbs && srcPath[0] !== '' &&
      (!srcPath[0] || srcPath[0].charAt(0) !== '/')) {
    srcPath.unshift('');
  }

  if (hasTrailingSlash && (srcPath.join('/').substr(-1) !== '/')) {
    srcPath.push('');
  }

  var isAbsolute = srcPath[0] === '' ||
      (srcPath[0] && srcPath[0].charAt(0) === '/');

  // put the host back
  if (psychotic) {
    result.hostname = result.host = isAbsolute ? '' :
                                    srcPath.length ? srcPath.shift() : '';
    //occationaly the auth can get stuck only in host
    //this especially happens in cases like
    //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
    var authInHost = result.host && result.host.indexOf('@') > 0 ?
                     result.host.split('@') : false;
    if (authInHost) {
      result.auth = authInHost.shift();
      result.host = result.hostname = authInHost.shift();
    }
  }

  mustEndAbs = mustEndAbs || (result.host && srcPath.length);

  if (mustEndAbs && !isAbsolute) {
    srcPath.unshift('');
  }

  if (!srcPath.length) {
    result.pathname = null;
    result.path = null;
  } else {
    result.pathname = srcPath.join('/');
  }

  //to support request.http
  if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
    result.path = (result.pathname ? result.pathname : '') +
                  (result.search ? result.search : '');
  }
  result.auth = relative.auth || result.auth;
  result.slashes = result.slashes || relative.slashes;
  result.href = result.format();
  return result;
};

Url.prototype.parseHost = function() {
  var host = this.host;
  var port = portPattern.exec(host);
  if (port) {
    port = port[0];
    if (port !== ':') {
      this.port = port.substr(1);
    }
    host = host.substr(0, host.length - port.length);
  }
  if (host) this.hostname = host;
};


/***/ }),

/***/ "./node_modules/url/util.js":
/*!**********************************!*\
  !*** ./node_modules/url/util.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  isString: function(arg) {
    return typeof(arg) === 'string';
  },
  isObject: function(arg) {
    return typeof(arg) === 'object' && arg !== null;
  },
  isNull: function(arg) {
    return arg === null;
  },
  isNullOrUndefined: function(arg) {
    return arg == null;
  }
};


/***/ }),

/***/ "./node_modules/webpack-dev-server/client/clients/BaseClient.js":
/*!*********************************************************!*\
  !*** (webpack)-dev-server/client/clients/BaseClient.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* eslint-disable
  no-unused-vars
*/

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

module.exports = /*#__PURE__*/function () {
  function BaseClient() {
    _classCallCheck(this, BaseClient);
  }

  _createClass(BaseClient, null, [{
    key: "getClientPath",
    value: function getClientPath(options) {
      throw new Error('Client needs implementation');
    }
  }]);

  return BaseClient;
}();

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/clients/SockJSClient.js":
/*!***********************************************************!*\
  !*** (webpack)-dev-server/client/clients/SockJSClient.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* eslint-disable
  no-unused-vars
*/

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var SockJS = __webpack_require__(/*! sockjs-client/dist/sockjs */ "./node_modules/sockjs-client/dist/sockjs.js");

var BaseClient = __webpack_require__(/*! ./BaseClient */ "./node_modules/webpack-dev-server/client/clients/BaseClient.js");

module.exports = /*#__PURE__*/function (_BaseClient) {
  _inherits(SockJSClient, _BaseClient);

  var _super = _createSuper(SockJSClient);

  function SockJSClient(url) {
    var _this;

    _classCallCheck(this, SockJSClient);

    _this = _super.call(this);
    _this.sock = new SockJS(url);

    _this.sock.onerror = function (err) {// TODO: use logger to log the error event once client and client-src
      // are reorganized to have the same directory structure
    };

    return _this;
  }

  _createClass(SockJSClient, [{
    key: "onOpen",
    value: function onOpen(f) {
      this.sock.onopen = f;
    }
  }, {
    key: "onClose",
    value: function onClose(f) {
      this.sock.onclose = f;
    } // call f with the message string as the first argument

  }, {
    key: "onMessage",
    value: function onMessage(f) {
      this.sock.onmessage = function (e) {
        f(e.data);
      };
    }
  }], [{
    key: "getClientPath",
    value: function getClientPath(options) {
      return /*require.resolve*/(/*! ./SockJSClient */ "./node_modules/webpack-dev-server/client/clients/SockJSClient.js");
    }
  }]);

  return SockJSClient;
}(BaseClient);

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/index.js?http://localhost:9000":
/*!*********************************************************!*\
  !*** (webpack)-dev-server/client?http://localhost:9000 ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__resourceQuery) {
/* global __resourceQuery WorkerGlobalScope self */

/* eslint prefer-destructuring: off */

var stripAnsi = __webpack_require__(/*! strip-ansi */ "./node_modules/webpack-dev-server/node_modules/strip-ansi/index.js");

var socket = __webpack_require__(/*! ./socket */ "./node_modules/webpack-dev-server/client/socket.js");

var overlay = __webpack_require__(/*! ./overlay */ "./node_modules/webpack-dev-server/client/overlay.js");

var _require = __webpack_require__(/*! ./utils/log */ "./node_modules/webpack-dev-server/client/utils/log.js"),
    log = _require.log,
    setLogLevel = _require.setLogLevel;

var sendMessage = __webpack_require__(/*! ./utils/sendMessage */ "./node_modules/webpack-dev-server/client/utils/sendMessage.js");

var reloadApp = __webpack_require__(/*! ./utils/reloadApp */ "./node_modules/webpack-dev-server/client/utils/reloadApp.js");

var createSocketUrl = __webpack_require__(/*! ./utils/createSocketUrl */ "./node_modules/webpack-dev-server/client/utils/createSocketUrl.js");

var status = {
  isUnloading: false,
  currentHash: ''
};
var options = {
  hot: false,
  hotReload: true,
  liveReload: false,
  initial: true,
  useWarningOverlay: false,
  useErrorOverlay: false,
  useProgress: false
};
var socketUrl = createSocketUrl(__resourceQuery);
self.addEventListener('beforeunload', function () {
  status.isUnloading = true;
});

if (typeof window !== 'undefined') {
  var qs = window.location.search.toLowerCase();
  options.hotReload = qs.indexOf('hotreload=false') === -1;
}

var onSocketMessage = {
  hot: function hot() {
    options.hot = true;
    log.info('[WDS] Hot Module Replacement enabled.');
  },
  liveReload: function liveReload() {
    options.liveReload = true;
    log.info('[WDS] Live Reloading enabled.');
  },
  invalid: function invalid() {
    log.info('[WDS] App updated. Recompiling...'); // fixes #1042. overlay doesn't clear if errors are fixed but warnings remain.

    if (options.useWarningOverlay || options.useErrorOverlay) {
      overlay.clear();
    }

    sendMessage('Invalid');
  },
  hash: function hash(_hash) {
    status.currentHash = _hash;
  },
  'still-ok': function stillOk() {
    log.info('[WDS] Nothing changed.');

    if (options.useWarningOverlay || options.useErrorOverlay) {
      overlay.clear();
    }

    sendMessage('StillOk');
  },
  'log-level': function logLevel(level) {
    var hotCtx = __webpack_require__("./node_modules/webpack/hot sync ^\\.\\/log$");

    if (hotCtx.keys().indexOf('./log') !== -1) {
      hotCtx('./log').setLogLevel(level);
    }

    setLogLevel(level);
  },
  overlay: function overlay(value) {
    if (typeof document !== 'undefined') {
      if (typeof value === 'boolean') {
        options.useWarningOverlay = false;
        options.useErrorOverlay = value;
      } else if (value) {
        options.useWarningOverlay = value.warnings;
        options.useErrorOverlay = value.errors;
      }
    }
  },
  progress: function progress(_progress) {
    if (typeof document !== 'undefined') {
      options.useProgress = _progress;
    }
  },
  'progress-update': function progressUpdate(data) {
    if (options.useProgress) {
      log.info("[WDS] ".concat(data.percent, "% - ").concat(data.msg, "."));
    }

    sendMessage('Progress', data);
  },
  ok: function ok() {
    sendMessage('Ok');

    if (options.useWarningOverlay || options.useErrorOverlay) {
      overlay.clear();
    }

    if (options.initial) {
      return options.initial = false;
    } // eslint-disable-line no-return-assign


    reloadApp(options, status);
  },
  'content-changed': function contentChanged() {
    log.info('[WDS] Content base changed. Reloading...');
    self.location.reload();
  },
  warnings: function warnings(_warnings) {
    log.warn('[WDS] Warnings while compiling.');

    var strippedWarnings = _warnings.map(function (warning) {
      return stripAnsi(warning);
    });

    sendMessage('Warnings', strippedWarnings);

    for (var i = 0; i < strippedWarnings.length; i++) {
      log.warn(strippedWarnings[i]);
    }

    if (options.useWarningOverlay) {
      overlay.showMessage(_warnings);
    }

    if (options.initial) {
      return options.initial = false;
    } // eslint-disable-line no-return-assign


    reloadApp(options, status);
  },
  errors: function errors(_errors) {
    log.error('[WDS] Errors while compiling. Reload prevented.');

    var strippedErrors = _errors.map(function (error) {
      return stripAnsi(error);
    });

    sendMessage('Errors', strippedErrors);

    for (var i = 0; i < strippedErrors.length; i++) {
      log.error(strippedErrors[i]);
    }

    if (options.useErrorOverlay) {
      overlay.showMessage(_errors);
    }

    options.initial = false;
  },
  error: function error(_error) {
    log.error(_error);
  },
  close: function close() {
    log.error('[WDS] Disconnected!');
    sendMessage('Close');
  }
};
socket(socketUrl, onSocketMessage);
/* WEBPACK VAR INJECTION */}.call(this, "?http://localhost:9000"))

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/overlay.js":
/*!**********************************************!*\
  !*** (webpack)-dev-server/client/overlay.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // The error overlay is inspired (and mostly copied) from Create React App (https://github.com/facebookincubator/create-react-app)
// They, in turn, got inspired by webpack-hot-middleware (https://github.com/glenjamin/webpack-hot-middleware).

var ansiHTML = __webpack_require__(/*! ansi-html */ "./node_modules/ansi-html/index.js");

var _require = __webpack_require__(/*! html-entities */ "./node_modules/html-entities/lib/index.js"),
    AllHtmlEntities = _require.AllHtmlEntities;

var entities = new AllHtmlEntities();
var colors = {
  reset: ['transparent', 'transparent'],
  black: '181818',
  red: 'E36049',
  green: 'B3CB74',
  yellow: 'FFD080',
  blue: '7CAFC2',
  magenta: '7FACCA',
  cyan: 'C3C2EF',
  lightgrey: 'EBE7E3',
  darkgrey: '6D7891'
};
var overlayIframe = null;
var overlayDiv = null;
var lastOnOverlayDivReady = null;
ansiHTML.setColors(colors);

function createOverlayIframe(onIframeLoad) {
  var iframe = document.createElement('iframe');
  iframe.id = 'webpack-dev-server-client-overlay';
  iframe.src = 'about:blank';
  iframe.style.position = 'fixed';
  iframe.style.left = 0;
  iframe.style.top = 0;
  iframe.style.right = 0;
  iframe.style.bottom = 0;
  iframe.style.width = '100vw';
  iframe.style.height = '100vh';
  iframe.style.border = 'none';
  iframe.style.zIndex = 9999999999;
  iframe.onload = onIframeLoad;
  return iframe;
}

function addOverlayDivTo(iframe) {
  var div = iframe.contentDocument.createElement('div');
  div.id = 'webpack-dev-server-client-overlay-div';
  div.style.position = 'fixed';
  div.style.boxSizing = 'border-box';
  div.style.left = 0;
  div.style.top = 0;
  div.style.right = 0;
  div.style.bottom = 0;
  div.style.width = '100vw';
  div.style.height = '100vh';
  div.style.backgroundColor = 'rgba(0, 0, 0, 0.85)';
  div.style.color = '#E8E8E8';
  div.style.fontFamily = 'Menlo, Consolas, monospace';
  div.style.fontSize = 'large';
  div.style.padding = '2rem';
  div.style.lineHeight = '1.2';
  div.style.whiteSpace = 'pre-wrap';
  div.style.overflow = 'auto';
  iframe.contentDocument.body.appendChild(div);
  return div;
}

function ensureOverlayDivExists(onOverlayDivReady) {
  if (overlayDiv) {
    // Everything is ready, call the callback right away.
    onOverlayDivReady(overlayDiv);
    return;
  } // Creating an iframe may be asynchronous so we'll schedule the callback.
  // In case of multiple calls, last callback wins.


  lastOnOverlayDivReady = onOverlayDivReady;

  if (overlayIframe) {
    // We've already created it.
    return;
  } // Create iframe and, when it is ready, a div inside it.


  overlayIframe = createOverlayIframe(function () {
    overlayDiv = addOverlayDivTo(overlayIframe); // Now we can talk!

    lastOnOverlayDivReady(overlayDiv);
  }); // Zalgo alert: onIframeLoad() will be called either synchronously
  // or asynchronously depending on the browser.
  // We delay adding it so `overlayIframe` is set when `onIframeLoad` fires.

  document.body.appendChild(overlayIframe);
} // Successful compilation.


function clear() {
  if (!overlayDiv) {
    // It is not there in the first place.
    return;
  } // Clean up and reset internal state.


  document.body.removeChild(overlayIframe);
  overlayDiv = null;
  overlayIframe = null;
  lastOnOverlayDivReady = null;
} // Compilation with errors (e.g. syntax error or missing modules).


function showMessage(messages) {
  ensureOverlayDivExists(function (div) {
    // Make it look similar to our terminal.
    div.innerHTML = "<span style=\"color: #".concat(colors.red, "\">Failed to compile.</span><br><br>").concat(ansiHTML(entities.encode(messages[0])));
  });
}

module.exports = {
  clear: clear,
  showMessage: showMessage
};

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/socket.js":
/*!*********************************************!*\
  !*** (webpack)-dev-server/client/socket.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__webpack_dev_server_client__) {
/* global __webpack_dev_server_client__ */

/* eslint-disable
  camelcase
*/
// this SockJSClient is here as a default fallback, in case inline mode
// is off or the client is not injected. This will be switched to
// WebsocketClient when it becomes the default
// important: the path to SockJSClient here is made to work in the 'client'
// directory, but is updated via the webpack compilation when compiled from
// the 'client-src' directory

var Client = typeof __webpack_dev_server_client__ !== 'undefined' ? __webpack_dev_server_client__ : // eslint-disable-next-line import/no-unresolved
__webpack_require__(/*! ./clients/SockJSClient */ "./node_modules/webpack-dev-server/client/clients/SockJSClient.js");
var retries = 0;
var client = null;

var socket = function initSocket(url, handlers) {
  client = new Client(url);
  client.onOpen(function () {
    retries = 0;
  });
  client.onClose(function () {
    if (retries === 0) {
      handlers.close();
    } // Try to reconnect.


    client = null; // After 10 retries stop trying, to prevent logspam.

    if (retries <= 10) {
      // Exponentially increase timeout to reconnect.
      // Respectfully copied from the package `got`.
      // eslint-disable-next-line no-mixed-operators, no-restricted-properties
      var retryInMs = 1000 * Math.pow(2, retries) + Math.random() * 100;
      retries += 1;
      setTimeout(function () {
        socket(url, handlers);
      }, retryInMs);
    }
  });
  client.onMessage(function (data) {
    var msg = JSON.parse(data);

    if (handlers[msg.type]) {
      handlers[msg.type](msg.data);
    }
  });
};

module.exports = socket;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! (webpack)-dev-server/client/clients/SockJSClient.js */ "./node_modules/webpack-dev-server/client/clients/SockJSClient.js")))

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/createSocketUrl.js":
/*!************************************************************!*\
  !*** (webpack)-dev-server/client/utils/createSocketUrl.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* global self */

var url = __webpack_require__(/*! url */ "./node_modules/url/url.js");

var getCurrentScriptSource = __webpack_require__(/*! ./getCurrentScriptSource */ "./node_modules/webpack-dev-server/client/utils/getCurrentScriptSource.js");

function createSocketUrl(resourceQuery, currentLocation) {
  var urlParts;

  if (typeof resourceQuery === 'string' && resourceQuery !== '') {
    // If this bundle is inlined, use the resource query to get the correct url.
    // format is like `?http://0.0.0.0:8096&sockPort=8097&sockHost=localhost`
    urlParts = url.parse(resourceQuery // strip leading `?` from query string to get a valid URL
    .substr(1) // replace first `&` with `?` to have a valid query string
    .replace('&', '?'), true);
  } else {
    // Else, get the url from the <script> this file was called with.
    var scriptHost = getCurrentScriptSource();
    urlParts = url.parse(scriptHost || '/', true, true);
  } // Use parameter to allow passing location in unit tests


  if (typeof currentLocation === 'string' && currentLocation !== '') {
    currentLocation = url.parse(currentLocation);
  } else {
    currentLocation = self.location;
  }

  return getSocketUrl(urlParts, currentLocation);
}
/*
 * Gets socket URL based on Script Source/Location
 * (scriptSrc: URL, location: URL) -> URL
 */


function getSocketUrl(urlParts, loc) {
  var auth = urlParts.auth,
      query = urlParts.query;
  var hostname = urlParts.hostname,
      protocol = urlParts.protocol,
      port = urlParts.port;

  if (!port || port === '0') {
    port = loc.port;
  } // check ipv4 and ipv6 `all hostname`
  // why do we need this check?
  // hostname n/a for file protocol (example, when using electron, ionic)
  // see: https://github.com/webpack/webpack-dev-server/pull/384


  if ((hostname === '0.0.0.0' || hostname === '::') && loc.hostname && loc.protocol.indexOf('http') === 0) {
    hostname = loc.hostname;
  } // `hostname` can be empty when the script path is relative. In that case, specifying
  // a protocol would result in an invalid URL.
  // When https is used in the app, secure websockets are always necessary
  // because the browser doesn't accept non-secure websockets.


  if (hostname && hostname !== '127.0.0.1' && (loc.protocol === 'https:' || urlParts.hostname === '0.0.0.0')) {
    protocol = loc.protocol;
  } // all of these sock url params are optionally passed in through
  // resourceQuery, so we need to fall back to the default if
  // they are not provided


  var sockHost = query.sockHost || hostname;
  var sockPath = query.sockPath || '/sockjs-node';
  var sockPort = query.sockPort || port;

  if (sockPort === 'location') {
    sockPort = loc.port;
  }

  return url.format({
    protocol: protocol,
    auth: auth,
    hostname: sockHost,
    port: sockPort,
    // If sockPath is provided it'll be passed in via the resourceQuery as a
    // query param so it has to be parsed out of the querystring in order for the
    // client to open the socket to the correct location.
    pathname: sockPath
  });
}

module.exports = createSocketUrl;

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/getCurrentScriptSource.js":
/*!*******************************************************************!*\
  !*** (webpack)-dev-server/client/utils/getCurrentScriptSource.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function getCurrentScriptSource() {
  // `document.currentScript` is the most accurate way to find the current script,
  // but is not supported in all browsers.
  if (document.currentScript) {
    return document.currentScript.getAttribute('src');
  } // Fall back to getting all scripts in the document.


  var scriptElements = document.scripts || [];
  var currentScript = scriptElements[scriptElements.length - 1];

  if (currentScript) {
    return currentScript.getAttribute('src');
  } // Fail as there was no script to use.


  throw new Error('[WDS] Failed to get current script source.');
}

module.exports = getCurrentScriptSource;

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/log.js":
/*!************************************************!*\
  !*** (webpack)-dev-server/client/utils/log.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var log = __webpack_require__(/*! loglevel */ "./node_modules/loglevel/lib/loglevel.js").getLogger('webpack-dev-server');

var INFO = 'info';
var WARN = 'warn';
var ERROR = 'error';
var DEBUG = 'debug';
var TRACE = 'trace';
var SILENT = 'silent'; // deprecated
// TODO: remove these at major released
// https://github.com/webpack/webpack-dev-server/pull/1825

var WARNING = 'warning';
var NONE = 'none'; // Set the default log level

log.setDefaultLevel(INFO);

function setLogLevel(level) {
  switch (level) {
    case INFO:
    case WARN:
    case ERROR:
    case DEBUG:
    case TRACE:
      log.setLevel(level);
      break;
    // deprecated

    case WARNING:
      // loglevel's warning name is different from webpack's
      log.setLevel('warn');
      break;
    // deprecated

    case NONE:
    case SILENT:
      log.disableAll();
      break;

    default:
      log.error("[WDS] Unknown clientLogLevel '".concat(level, "'"));
  }
}

module.exports = {
  log: log,
  setLogLevel: setLogLevel
};

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/reloadApp.js":
/*!******************************************************!*\
  !*** (webpack)-dev-server/client/utils/reloadApp.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* global WorkerGlobalScope self */

var _require = __webpack_require__(/*! ./log */ "./node_modules/webpack-dev-server/client/utils/log.js"),
    log = _require.log;

function reloadApp(_ref, _ref2) {
  var hotReload = _ref.hotReload,
      hot = _ref.hot,
      liveReload = _ref.liveReload;
  var isUnloading = _ref2.isUnloading,
      currentHash = _ref2.currentHash;

  if (isUnloading || !hotReload) {
    return;
  }

  if (hot) {
    log.info('[WDS] App hot update...');

    var hotEmitter = __webpack_require__(/*! webpack/hot/emitter */ "./node_modules/webpack/hot/emitter.js");

    hotEmitter.emit('webpackHotUpdate', currentHash);

    if (typeof self !== 'undefined' && self.window) {
      // broadcast update to window
      self.postMessage("webpackHotUpdate".concat(currentHash), '*');
    }
  } // allow refreshing the page only if liveReload isn't disabled
  else if (liveReload) {
      var rootWindow = self; // use parent window for reload (in case we're in an iframe with no valid src)

      var intervalId = self.setInterval(function () {
        if (rootWindow.location.protocol !== 'about:') {
          // reload immediately if protocol is valid
          applyReload(rootWindow, intervalId);
        } else {
          rootWindow = rootWindow.parent;

          if (rootWindow.parent === rootWindow) {
            // if parent equals current window we've reached the root which would continue forever, so trigger a reload anyways
            applyReload(rootWindow, intervalId);
          }
        }
      });
    }

  function applyReload(rootWindow, intervalId) {
    clearInterval(intervalId);
    log.info('[WDS] App updated. Reloading...');
    rootWindow.location.reload();
  }
}

module.exports = reloadApp;

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/sendMessage.js":
/*!********************************************************!*\
  !*** (webpack)-dev-server/client/utils/sendMessage.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* global __resourceQuery WorkerGlobalScope self */
// Send messages to the outside, so plugins can consume it.

function sendMsg(type, data) {
  if (typeof self !== 'undefined' && (typeof WorkerGlobalScope === 'undefined' || !(self instanceof WorkerGlobalScope))) {
    self.postMessage({
      type: "webpack".concat(type),
      data: data
    }, '*');
  }
}

module.exports = sendMsg;

/***/ }),

/***/ "./node_modules/webpack-dev-server/node_modules/ansi-regex/index.js":
/*!*************************************************************!*\
  !*** (webpack)-dev-server/node_modules/ansi-regex/index.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = function () {
	return /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-PRZcf-nqry=><]/g;
};


/***/ }),

/***/ "./node_modules/webpack-dev-server/node_modules/strip-ansi/index.js":
/*!*************************************************************!*\
  !*** (webpack)-dev-server/node_modules/strip-ansi/index.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ansiRegex = __webpack_require__(/*! ansi-regex */ "./node_modules/webpack-dev-server/node_modules/ansi-regex/index.js")();

module.exports = function (str) {
	return typeof str === 'string' ? str.replace(ansiRegex, '') : str;
};


/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./node_modules/webpack/buildin/module.js":
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ "./node_modules/webpack/hot sync ^\\.\\/log$":
/*!*************************************************!*\
  !*** (webpack)/hot sync nonrecursive ^\.\/log$ ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./log": "./node_modules/webpack/hot/log.js"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./node_modules/webpack/hot sync ^\\.\\/log$";

/***/ }),

/***/ "./node_modules/webpack/hot/emitter.js":
/*!********************************!*\
  !*** (webpack)/hot/emitter.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var EventEmitter = __webpack_require__(/*! events */ "./node_modules/events/events.js");
module.exports = new EventEmitter();


/***/ }),

/***/ "./node_modules/webpack/hot/log.js":
/*!****************************!*\
  !*** (webpack)/hot/log.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

var logLevel = "info";

function dummy() {}

function shouldLog(level) {
	var shouldLog =
		(logLevel === "info" && level === "info") ||
		(["info", "warning"].indexOf(logLevel) >= 0 && level === "warning") ||
		(["info", "warning", "error"].indexOf(logLevel) >= 0 && level === "error");
	return shouldLog;
}

function logGroup(logFn) {
	return function(level, msg) {
		if (shouldLog(level)) {
			logFn(msg);
		}
	};
}

module.exports = function(level, msg) {
	if (shouldLog(level)) {
		if (level === "info") {
			console.log(msg);
		} else if (level === "warning") {
			console.warn(msg);
		} else if (level === "error") {
			console.error(msg);
		}
	}
};

/* eslint-disable node/no-unsupported-features/node-builtins */
var group = console.group || dummy;
var groupCollapsed = console.groupCollapsed || dummy;
var groupEnd = console.groupEnd || dummy;
/* eslint-enable node/no-unsupported-features/node-builtins */

module.exports.group = logGroup(group);

module.exports.groupCollapsed = logGroup(groupCollapsed);

module.exports.groupEnd = logGroup(groupEnd);

module.exports.setLogLevel = function(level) {
	logLevel = level;
};

module.exports.formatError = function(err) {
	var message = err.message;
	var stack = err.stack;
	if (!stack) {
		return message;
	} else if (stack.indexOf(message) < 0) {
		return message + "\n" + stack;
	} else {
		return stack;
	}
};


/***/ }),

/***/ "./src/i18n/translation_en.json":
/*!**************************************!*\
  !*** ./src/i18n/translation_en.json ***!
  \**************************************/
/*! exports provided: time, achievements, tournaments, leaderboard, miniLeaderboard, rewards, messages, global, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"time\":{\"days\":\"d\",\"hours\":\"h\",\"minutesShortHand\":\"min\",\"minutes\":\"m\",\"seconds\":\"s\"},\"achievements\":{\"label\":\"Achievements\",\"more\":\"More\",\"complete\":\"complete 100%\"},\"tournaments\":{\"label\":\"Tournaments\",\"enter\":\"Enter Tournament\",\"readyCompetitions\":\"Upcoming Tournaments\",\"activeCompetitions\":\"Active Tournaments\",\"finishedCompetitions\":\"Finished Tournaments\",\"finishing\":\"Finishing\",\"finished\":\"Finished\",\"registered\":\"Registered\",\"noAvailableCompetitions\":\"No available competition\"},\"leaderboard\":{\"rank\":\"Rank\",\"name\":\"Name\",\"points\":\"Points\",\"prize\":\"Prize\",\"you\":\"You\"},\"miniLeaderboard\":{\"highScore\":\"High Score\",\"lastScore\":\"Last Score\",\"rank\":\"Rank\",\"startsIn\":\"Starting In\",\"starting\":\"starting\",\"finishing\":\"finishing\",\"finished\":\"finished\"},\"rewards\":{\"label\":\"Rewards\",\"claim\":\"Claim Now\",\"claimed\":\"Claimed\",\"availableRewards\":\"Available Rewards\",\"rewards\":\"Claimed Rewards\",\"expiredRewards\":\"Expired Rewards\"},\"messages\":{\"label\":\"Messages\"},\"global\":{\"copy\":\"Powered By CompetitionLabs\"}}");

/***/ }),

/***/ "./src/javascript/leaderboard.v3.js":
/*!******************************************!*\
  !*** ./src/javascript/leaderboard.v3.js ***!
  \******************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _polyfills__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./polyfills */ "./src/javascript/polyfills/index.js");
/* harmony import */ var _polyfills__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_polyfills__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _modules_setTimeoutGlobal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/setTimeoutGlobal */ "./src/javascript/modules/setTimeoutGlobal.js");
/* harmony import */ var _modules_setTimeoutGlobal__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_modules_setTimeoutGlobal__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _modules_LbWidget__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/LbWidget */ "./src/javascript/modules/LbWidget.js");
/*
 COMPETITION LABS LTD v1.0.5
 (c) 2015-2020 Aleksandr Bernotas
 License: www.competitionlabs.com/terms-of-service
*/




(function () {
  if (typeof window._CLLBV3Opt === 'undefined') {
    window._CLLBV3Opt = {
      autoStart: false
    };
  }

  if (typeof window._clLeaderBoardV3 === 'undefined') {
    window._clLeaderBoardV3 = new _modules_LbWidget__WEBPACK_IMPORTED_MODULE_2__["LbWidget"](window._CLLBV3Opt);
  } else {
    console.warn('window._clLeaderBoardV3 is already defined, widget is configured to run as a single instance');
  }
})();

/***/ }),

/***/ "./src/javascript/modules/Ajax.js":
/*!****************************************!*\
  !*** ./src/javascript/modules/Ajax.js ***!
  \****************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _cLabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cLabs */ "./src/javascript/modules/cLabs.js");
/* harmony import */ var _utils_sizeof__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/sizeof */ "./src/javascript/utils/sizeof.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }



/**
 * Ajax method
 *
 * @class Ajax
 * @constructor
 */

_cLabs__WEBPACK_IMPORTED_MODULE_0__["default"].Ajax = function () {
  this.xhr = new XMLHttpRequest();
};

_cLabs__WEBPACK_IMPORTED_MODULE_0__["default"].Ajax.prototype.createCORSRequest = function (method, url) {
  var obj = this;

  if ('withCredentials' in obj.xhr) {
    // Most browsers.
    obj.xhr.open(method, url, true);
  } else if (typeof XDomainRequest !== 'undefined') {
    // IE8 & IE9

    /* eslint no-undef: "off" */
    obj.xhr = new XDomainRequest();
    url = url.indexOf('https') > -1 && location.protocol !== 'https:' ? url.replace('https', 'http') : url;
    obj.xhr.open(method, url);
  } else {
    // CORS not supported.
    obj.xhr = null;
  }

  return obj.xhr;
};

_cLabs__WEBPACK_IMPORTED_MODULE_0__["default"].Ajax.prototype.abort = function () {
  var _this = this;

  if (_this.xhr && typeof _this.xhr.readyState !== 'undefined' && _this.xhr.readyState !== 4 && _this.xhr.readyState > 0) {
    // console.error("aborting Ajax", _this.xhr.readyState, _this.xhr);
    _this.xhr.abort();
  }

  return _this;
};
/**
 * Retrieves data from a URL without page refresh
 *
 * @method getData
 * @param {Object} configuration object
 *  - object contains: HTTP method "type: POST, GET", url: to send the request to, data: {object}
 * @return {String} in success object
 */


_cLabs__WEBPACK_IMPORTED_MODULE_0__["default"].Ajax.prototype.getData = function (data) {
  var obj = this;

  try {
    data.type = data.type !== undefined && typeof data.type === 'string' && data.type.length > 0 ? data.type : 'POST';
    data.data = data.data !== undefined && _typeof(data.data) === 'object' ? data.data : {};
    data.url = data.url !== undefined && typeof data.url === 'string' && data.url.length > 0 ? data.url : '';
    data.success = data.success !== undefined ? data.success : function () {};
    data.error = data.error !== undefined ? data.error : function () {};
    data.headers = data.headers !== undefined ? data.headers : {};
    data.extraCallback = data.extraCallback !== undefined ? data.extraCallback : function () {}; // cross browser CORS support

    obj.xhr = this.createCORSRequest(data.type, data.url);

    obj.xhr.onload = function () {
      data.extraCallback(data, obj.xhr);
      data.success(obj.xhr.responseText, data, obj.xhr);
    };

    obj.xhr.onerror = function () {
      data.error(obj.xhr.status);
    };

    if (typeof XDomainRequest === 'undefined') {
      if (Object(_utils_sizeof__WEBPACK_IMPORTED_MODULE_1__["default"])(data.headers) > 0) {
        var item;

        for (item in data.headers) {
          obj.xhr.setRequestHeader(item, data.headers[item]);
        }
      } else if ((data.type === 'POST' || data.type === 'PUT') && Object(_utils_sizeof__WEBPACK_IMPORTED_MODULE_1__["default"])(data.headers) === 0) {
        obj.xhr.setRequestHeader('Content-Type', 'application/json');
      } else {
        obj.xhr.setRequestHeader('Content-Type', 'text/plain');
      }
    }

    obj.xhr.send(JSON.stringify(data.data));
    return obj.xhr;
  } catch (err) {
    console.log(err);
  }
};

/***/ }),

/***/ "./src/javascript/modules/LbWidget.js":
/*!********************************************!*\
  !*** ./src/javascript/modules/LbWidget.js ***!
  \********************************************/
/*! exports provided: LbWidget */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LbWidget", function() { return LbWidget; });
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var identicon_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! identicon.js */ "./node_modules/identicon.js/identicon.js");
/* harmony import */ var identicon_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(identicon_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var jssha__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jssha */ "./node_modules/jssha/dist/sha.mjs");
/* harmony import */ var _utils_mergeObjects__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/mergeObjects */ "./src/javascript/utils/mergeObjects.js");
/* harmony import */ var _utils_formatNumberLeadingZeros__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/formatNumberLeadingZeros */ "./src/javascript/utils/formatNumberLeadingZeros.js");
/* harmony import */ var _utils_stringContains__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/stringContains */ "./src/javascript/utils/stringContains.js");
/* harmony import */ var _utils_objectIterator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/objectIterator */ "./src/javascript/utils/objectIterator.js");
/* harmony import */ var _utils_query__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/query */ "./src/javascript/utils/query.js");
/* harmony import */ var _utils_hasClass__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../utils/hasClass */ "./src/javascript/utils/hasClass.js");
/* harmony import */ var _utils_addClass__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../utils/addClass */ "./src/javascript/utils/addClass.js");
/* harmony import */ var _utils_removeClass__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../utils/removeClass */ "./src/javascript/utils/removeClass.js");
/* harmony import */ var _utils_closest__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../utils/closest */ "./src/javascript/utils/closest.js");
/* harmony import */ var _utils_isMobileTablet__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../utils/isMobileTablet */ "./src/javascript/utils/isMobileTablet.js");
/* harmony import */ var _cLabs__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./cLabs */ "./src/javascript/modules/cLabs.js");
/* harmony import */ var _Ajax__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./Ajax */ "./src/javascript/modules/Ajax.js");
/* harmony import */ var _Notifications__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./Notifications */ "./src/javascript/modules/Notifications.js");
/* harmony import */ var _MiniScoreBoard__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./MiniScoreBoard */ "./src/javascript/modules/MiniScoreBoard.js");
/* harmony import */ var _MainWidget__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./MainWidget */ "./src/javascript/modules/MainWidget.js");
function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }




















var translation = __webpack_require__(/*! ../../i18n/translation_en.json */ "./src/i18n/translation_en.json");
/**
 * Main leaderboard widget, controls all actions and initiation logic.
 * Main responsibility is to control the interactions between different widgets/plugins and user even actions
 * @param options {Object} setting parameters used to overwrite the default settings
 * @constructor
 */


var LbWidget = function LbWidget(options) {
  this.settings = {
    debug: true,
    bindContainer: document.body,
    autoStart: true,
    sseMessaging: null,
    notifications: null,
    miniScoreBoard: null,
    enableNotifications: true,
    mainWidget: null,
    globalAjax: new _cLabs__WEBPACK_IMPORTED_MODULE_13__["default"].Ajax(),
    checkAjax: new _cLabs__WEBPACK_IMPORTED_MODULE_13__["default"].Ajax(),
    language: "en",
    currency: '',
    spaceName: '',
    memberId: '',
    groups: '',
    gameId: '',
    enforceGameLookup: true,
    // tournament lookup will include/exclude game only requests
    apiKey: '',
    member: null,
    competition: {
      activeCompetitionId: null,
      activeContestId: null,
      activeCompetition: null,
      activeContest: null,
      refreshInterval: null,
      refreshIntervalMillis: 10000,
      extractImageHeader: true // will extract the first found image inside the body tag and move it on top

    },
    achievements: {
      list: [],
      availableRewards: [],
      rewards: [],
      expiredRewards: [],
      extractImageHeader: true // will extract the first found image inside the body tag and move it on top

    },
    rewards: {
      availableRewards: [],
      rewards: [],
      expiredRewards: [],
      rewardFormatter: function rewardFormatter(reward) {
        var defaultRewardValue = reward.value;

        if (typeof reward.unitOfMeasure !== 'undefined' && typeof reward.unitOfMeasure.symbol !== 'undefined' && reward.unitOfMeasure.symbol !== null) {
          defaultRewardValue = reward.unitOfMeasure.symbol + reward.value;
        }

        return defaultRewardValue;
      }
    },
    messages: {
      enable: true,
      messages: []
    },
    tournaments: {
      activeCompetitionId: null,
      readyCompetitions: [],
      // statusCode 3
      activeCompetitions: [],
      // statusCode 5
      finishedCompetitions: [] // statusCode 7

    },
    leaderboard: {
      fullLeaderboardSize: 100,
      refreshIntervalMillis: 5000,
      refreshInterval: null,
      refreshLbDataInterval: null,
      leaderboardData: [],
      loadLeaderboardHistory: {}
    },
    uri: {
      gatewayDomain: _cLabs__WEBPACK_IMPORTED_MODULE_13__["default"].api.url,
      members: '/api/v1/:space/members/reference/:id',
      assets: '/assets/attachments/:attachmentId',
      memberSSE: '/api/v1/:space/sse/reference/:id',
      memberSSEHeartbeat: '/api/v1/:space/sse/reference/:id/heartbeat',
      competitions: '/api/v1/:space/competitions',
      competitionById: '/api/v1/:space/competitions/:id',
      contestLeaderboard: '/api/v1/:space/contests/:id/leaderboard',
      achievement: '/api/v1/:space/achievements/:id',
      achievements: '/api/v1/:space/achievements/members/reference/:id',
      // achievements: "/api/v1/:space/achievements",
      achievementsProgression: '/api/v1/:space/members/reference/:id/achievements',
      achievementsIssued: '/api/v1/:space/members/reference/:id/achievements/issued',
      messages: '/api/v1/:space/members/reference/:id/messages',
      messageById: '/api/v1/:space/members/reference/:id/messages/:messageId',
      memberReward: '/api/v1/:space/members/reference/:id/award/:awardId',
      memberRewardClaim: '/api/v1/:space/members/reference/:id/award/:awardId/award',
      memberCompetitions: '/api/v1/:space/members/reference/:id/competitions',
      memberCompetitionById: '/api/v1/:space/members/reference/:id/competition/:competitionId',
      memberCompetitionOptIn: '/api/v1/:space/members/reference/:id/competition/:competitionId/optin',
      memberCompetitionOptInCheck: '/api/v1/:space/members/reference/:id/competition/:competitionId/optin-check',
      translationPath: '' // ../i18n/translation_:language.json

    },
    loadTranslations: true,
    translation: translation,
    resources: [_cLabs__WEBPACK_IMPORTED_MODULE_13__["default"].api.url + '/assets/widgets/leaderboard_v3/css/style.css?t=' + new Date().getTime(), _cLabs__WEBPACK_IMPORTED_MODULE_13__["default"].api.url + '/assets/widgets/leaderboard_v3/css/fonts.css?t=' + new Date().getTime()],
    layoutBuildCallback: function layoutBuildCallback(layout, instance) {}
  };

  if (typeof options !== 'undefined') {
    this.settings = Object(_utils_mergeObjects__WEBPACK_IMPORTED_MODULE_3__["default"])(this.settings, options);
  }

  this.log = function (message) {
    if (this.settings.debug) {
      console.error(message);
    }
  };
  /**
   * Format duration of Date Time from moment() object
   * @param duration {moment}
   * @returns {string}
   */


  this.formatDateTime = function (duration) {
    var _this = this;

    var largeResult = [];
    var result = [];
    if (duration.days()) largeResult.push(duration.days() + '<span class="time-ind">' + _this.settings.translation.time.days + '</span>');

    if (duration.hours() || duration.days() > 0) {
      result.push(Object(_utils_formatNumberLeadingZeros__WEBPACK_IMPORTED_MODULE_4__["default"])(duration.hours(), 2) + '<span class="time-ind">' + _this.settings.translation.time.hours + '</span>');
    } else result.push('00<span class="time-ind">' + _this.settings.translation.time.hours + '</span>');

    if (duration.minutes() || duration.hours() > 0 || duration.days() > 0) {
      result.push(Object(_utils_formatNumberLeadingZeros__WEBPACK_IMPORTED_MODULE_4__["default"])(duration.minutes(), 2) + (duration.days() > 0 ? '<span class="time-ind">' + _this.settings.translation.time.minutes + '</span>' : '<span class="time-ind">' + _this.settings.translation.time.minutesShortHand + '</span>'));
    } else result.push('00' + (duration.days() > 0 ? '<span class="time-ind">' + _this.settings.translation.time.minutes + '</span>' : '<span class="time-ind">' + _this.settings.translation.time.minutesShortHand + '</span>')); // if (duration.seconds() && duration.days() === 0){ result.push( formatNumberLeadingZeros(duration.seconds(), 2) + '<span class="time-ind">s</span>' ) }else if(duration.days() === 0){result.push( '00<span class="time-ind">s</span>' )};


    result.push(Object(_utils_formatNumberLeadingZeros__WEBPACK_IMPORTED_MODULE_4__["default"])(duration.seconds(), 2) + '<span class="time-ind">' + _this.settings.translation.time.seconds + '</span>');
    return largeResult.length > 0 ? largeResult.join(' ') + ' ' + result.join(':') : result.join(':');
  };

  this.populateIdenticonBase64Image = function (str) {
    if (str.length > 0) {
      /* eslint new-cap: "off" */
      var shaObj = new jssha__WEBPACK_IMPORTED_MODULE_2__["default"]('SHA-512', 'TEXT');
      shaObj.update(str);
      var hash = shaObj.getHash('HEX', 1);
      var data = new identicon_js__WEBPACK_IMPORTED_MODULE_1___default.a(hash, {
        background: [255, 255, 255, 255],
        // rgba white
        margin: 0.1,
        // 20% margin
        size: 22,
        // 420px square
        format: 'svg' // use SVG instead of PNG

      }).toString();
      var icon = 'data:image/svg+xml;base64,' + data;
      return icon;
    } else {
      return '';
    }
  };
  /**
   * get a list of available competition filtered by provided global criteria
   * @param callback {Function}
   */


  var competitionCheckAjax = new _cLabs__WEBPACK_IMPORTED_MODULE_13__["default"].Ajax();

  this.checkForAvailableCompetitions = function (callback, ajaxInstance) {
    var _this = this;

    var url = _this.settings.memberId.length === 0 ? _this.settings.uri.competitions.replace(':space', _this.settings.spaceName) : _this.settings.uri.memberCompetitions.replace(':space', _this.settings.spaceName).replace(':id', _this.settings.memberId);
    var filters = ['statusCode>==3', 'statusCode<==5', '_sortByFields=options.scheduledDates.end:desc', '_lang=' + _this.settings.language];
    var ajaxInstanceToUse = typeof ajaxInstance !== 'undefined' && ajaxInstance !== null ? ajaxInstance : competitionCheckAjax;

    if (typeof _this.settings.currency === 'string' && _this.settings.currency.length > 0) {
      filters.push('_uomKey=' + _this.settings.currency);
    }

    if (_this.settings.gameId.length > 0 && _this.settings.enforceGameLookup) {
      filters.push('options.products.productRefId=' + _this.settings.gameId);
    }

    if (_this.settings.groups.length > 0 && _this.settings.memberId.length === 0) {
      filters.push('options.limitEntrantsTo=' + _this.settings.groups);
    }

    ajaxInstanceToUse.abort().getData({
      type: 'GET',
      url: _this.settings.uri.gatewayDomain + url + '?' + filters.join('&'),
      headers: {
        'X-API-KEY': _this.settings.apiKey
      },
      success: function success(response, dataObj, xhr) {
        if (xhr.status === 200) {
          var json = JSON.parse(response);
          _this.settings.tournaments.readyCompetitions = [];
          _this.settings.tournaments.activeCompetitions = [];
          window.mapObject(json.data, function (comp) {
            if (comp.statusCode === 3) {
              _this.settings.tournaments.readyCompetitions.push(comp);
            } else if (comp.statusCode === 5) {
              _this.settings.tournaments.activeCompetitions.push(comp);
            }
          });

          _this.checkForFinishedCompetitions(callback, ajaxInstance);
        } else {
          _this.log('failed to checkForActiveCompetitions ' + response);
        }
      }
    });
  };
  /**
   * get a list of finished competition filtered by provided global criteria
   * @param callback {Function}
   */


  var competitionFinishedCheckAjax = new _cLabs__WEBPACK_IMPORTED_MODULE_13__["default"].Ajax();

  this.checkForFinishedCompetitions = function (callback, ajaxInstance) {
    var _this = this;

    var url = _this.settings.memberId.length === 0 ? _this.settings.uri.competitions.replace(':space', _this.settings.spaceName) : _this.settings.uri.memberCompetitions.replace(':space', _this.settings.spaceName).replace(':id', _this.settings.memberId);
    var filters = ['statusCode=7', '_limit=10', '_sortByFields=options.scheduledDates.end:desc', '_lang=' + _this.settings.language];
    var ajaxInstanceToUse = typeof ajaxInstance !== 'undefined' && ajaxInstance !== null ? ajaxInstance : competitionFinishedCheckAjax;

    if (typeof _this.settings.currency === 'string' && _this.settings.currency.length > 0) {
      filters.push('_uomKey=' + _this.settings.currency);
    }

    if (_this.settings.gameId.length > 0 && _this.settings.enforceGameLookup) {
      filters.push('options.products.productRefId=' + _this.settings.gameId);
    }

    if (_this.settings.groups.length > 0 && _this.settings.memberId.length === 0) {
      filters.push('options.limitEntrantsTo=' + _this.settings.groups);
    }

    ajaxInstanceToUse.abort().getData({
      type: 'GET',
      url: _this.settings.uri.gatewayDomain + url + '?' + filters.join('&'),
      headers: {
        'X-API-KEY': _this.settings.apiKey
      },
      success: function success(response, dataObj, xhr) {
        if (xhr.status === 200) {
          var json = JSON.parse(response);
          _this.settings.tournaments.finishedCompetitions = [];
          window.mapObject(json.data, function (comp) {
            if (comp.statusCode === 7) {
              _this.settings.tournaments.finishedCompetitions.push(comp);
            }
          });

          if (typeof callback === 'function') {
            callback();
          }
        } else {
          _this.log('failed to checkForFinishedCompetitions ' + response);
        }
      }
    });
  };

  this.prepareActiveCompetition = function (callback) {
    var _this = this;

    var activeCompetition = null;
    var activeCompetitionId = null;

    if (_this.settings.tournaments.activeCompetitionId !== null) {
      window.mapObject(_this.settings.tournaments.activeCompetitions, function (comp) {
        if (comp.id === _this.settings.tournaments.activeCompetitionId) {
          activeCompetition = comp;
        }
      });
      window.mapObject(_this.settings.tournaments.readyCompetitions, function (comp) {
        if (comp.id === _this.settings.tournaments.activeCompetitionId) {
          activeCompetition = comp;
        }
      });
      window.mapObject(_this.settings.tournaments.finishedCompetitions, function (comp) {
        if (comp.id === _this.settings.tournaments.activeCompetitionId) {
          activeCompetition = comp;
        }
      });

      if (activeCompetition !== null) {
        activeCompetitionId = _this.settings.tournaments.activeCompetitionId;
      } else {
        _this.settings.tournaments.activeCompetitionId = null;
      }
    }

    if (activeCompetition === null && _this.settings.tournaments.activeCompetitions.length > 0) {
      activeCompetition = _this.settings.tournaments.activeCompetitions[0];
      activeCompetitionId = activeCompetition.id;
    } else if (activeCompetition === null && _this.settings.tournaments.readyCompetitions.length > 0) {
      activeCompetition = _this.settings.tournaments.readyCompetitions[0];
      activeCompetitionId = activeCompetition.id;
    } // no competitions found


    if (activeCompetitionId === null && _this.settings.tournaments.finishedCompetitions.length <= 0) {
      // deactivation requires closing & opening of the mainWidget.
      _this.deactivateCompetitionsAndLeaderboards();
    } else {
      if (_this.settings.competition.activeCompetitionId !== activeCompetitionId && activeCompetitionId !== null) {
        _this.settings.competition.activeCompetition = activeCompetition;
        _this.settings.competition.activeCompetitionId = activeCompetitionId;
      } // load active competition


      if (activeCompetitionId !== null) {
        _this.loadActiveCompetition(function (json) {
          _this.setActiveCompetition(json, callback);
        });
      } else if (typeof callback === 'function') {
        callback();
      }
    }
  };

  this.loadActiveCompetition = function (callback) {
    var _this = this;

    var url = _this.settings.memberId.length === 0 ? _this.settings.uri.competitionById.replace(':space', _this.settings.spaceName).replace(':id', _this.settings.competition.activeCompetitionId) : _this.settings.uri.memberCompetitionById.replace(':space', _this.settings.spaceName).replace(':id', _this.settings.memberId).replace(':competitionId', _this.settings.competition.activeCompetitionId);
    var filters = ['_include=strategy', '_lang=' + _this.settings.language];

    if (typeof _this.settings.currency === 'string' && _this.settings.currency.length > 0) {
      filters.push('_uomKey=' + _this.settings.currency);
    }

    _this.settings.globalAjax.abort().getData({
      type: 'GET',
      url: _this.settings.uri.gatewayDomain + url + '?' + filters.join('&'),
      headers: {
        'X-API-KEY': _this.settings.apiKey
      },
      success: function success(response, dataObj, xhr) {
        if (xhr.status === 200) {
          var json = JSON.parse(response);

          if (typeof callback === 'function') {
            callback(json);
          }
        } else {
          _this.log('failed to loadActiveCompetition ' + response);
        }
      }
    });
  };

  this.setActiveCompetition = function (json, callback) {
    var _this = this;

    _this.settings.competition.activeCompetition = json.data;
    _this.settings.competition.activeContest = null;
    _this.settings.competition.activeContestId = null;

    if (typeof json.data.contests !== 'undefined' && json.data.contests.length > 0) {
      window.mapObject(json.data.contests, function (contest) {
        if (contest.statusCode < 7 && _this.settings.competition.activeContest === null) {
          _this.settings.competition.activeContest = contest;
          _this.settings.competition.activeContestId = contest.id;

          if (typeof _this.settings.competition.activeContest.rewards === 'undefined') {
            _this.settings.competition.activeContest.rewards = [];
          }

          var rewards = [];
          window.mapObject(_this.settings.competition.activeContest.rewards, function (reward) {
            if (typeof reward.rewardRank === 'string') {
              var rankParts = reward.rewardRank.split(',');
              var rewardRank = [];
              window.mapObject(rankParts, function (part) {
                if (Object(_utils_stringContains__WEBPACK_IMPORTED_MODULE_5__["default"])(part, '-')) {
                  var rankRange = part.split('-');
                  var rageStart = parseInt(rankRange[0]);
                  var rangeEnd = parseInt(rankRange[1]);

                  for (var i = rageStart; i <= rangeEnd; i++) {
                    rewardRank.push(i);
                  }
                } else {
                  rewardRank.push(parseInt(part));
                }
              });
              reward.rewardRank = rewardRank;
            }

            rewards.push(reward);
          });
          _this.settings.competition.activeContest.rewards = rewards;
        }
      });
    }

    if (typeof callback === 'function') {
      callback();
    }
  };

  this.getLeaderboardData = function (count, callback) {
    if (this.settings.competition.activeContestId !== null) {
      var _this = this;

      var url = _this.settings.uri.contestLeaderboard.replace(':space', _this.settings.spaceName).replace(':id', _this.settings.competition.activeContestId);

      var filters = ['_limit=' + count, 'rankings=2'];

      if (typeof _this.settings.memberId === 'string' && _this.settings.memberId.length > 0) {
        filters.push('memberId=' + _this.settings.memberId);
      }

      _this.settings.globalAjax.abort().getData({
        type: 'GET',
        url: _this.settings.uri.gatewayDomain + url + '?' + filters.join('&'),
        headers: {
          'X-API-KEY': _this.settings.apiKey
        },
        success: function success(response, dataObj, xhr) {
          if (xhr.status === 200) {
            var json = JSON.parse(response); // if(
            //   typeof _this.settings.loadLeaderboardHistory[_this.settings.competition.activeContestId] === "undefined"
            //   ||
            //   (
            //     typeof _this.settings.loadLeaderboardHistory[_this.settings.competition.activeContestId] !== "undefined"
            //     &&
            //     _this.settings.loadLeaderboardHistory[_this.settings.competition.activeContestId] !== data
            //   )
            // ) {
            //   _this.settings.loadLeaderboardHistory[_this.settings.competition.activeContestId] = {
            //     changed: true,
            //     data: JSON.stringify(json.data)
            //   };
            // }
            // we need to mask competitor's names. We will replace last 4 characters with "*"
            // also first 4 chars are replaced with "*"

            _this.maskNames(json.data, _this.settings.memberId);

            _this.settings.leaderboard.leaderboardData = json.data;
            callback(json.data);
          } else {
            _this.log('failed to getLeaderboardData ' + response);
          }
        }
      });
    } else {
      callback();
    }
  }; // function masks names of users


  this.maskNames = function (data, myname) {
    // myname --> _this.settings.memberId
    var _iterator = _createForOfIteratorHelper(data),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var leadboard = _step.value;

        if (leadboard.name !== myname) {
          // split casino and player name
          var separated = leadboard.name.split(':');
          var casName = this.maskWord(separated[0]);
          var playerName = this.maskWord(separated[1]);
          leadboard.name = casName + ':' + playerName;
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }; // take string as input and put first 4 chars as "*"


  this.maskWord = function (word) {
    var ret = ''; // replace last 4

    if (word.length >= 4) {
      ret = word.substring(0, word.length - 4);
      ret += '****'; // replace all
    } else {
      ret = word.replace(/./g, '*');
    }

    return ret;
  };

  var checkAchievementsAjax = new _cLabs__WEBPACK_IMPORTED_MODULE_13__["default"].Ajax();

  this.checkForAvailableAchievements = function (callback) {
    var _this = this;

    var url = _this.settings.uri.achievements.replace(':space', _this.settings.spaceName).replace(':id', _this.settings.memberId);

    var filters = ['_limit=100', '_include=rewards,products', '_lang=' + _this.settings.language];
    var withGroups = false;

    if (typeof _this.settings.currency === 'string' && _this.settings.currency.length > 0) {
      filters.push('_uomKey=' + _this.settings.currency);
    }

    if (typeof _this.settings.member.groups !== 'undefined' && _this.settings.member.groups.length > 0) {
      withGroups = true;
      filters.push('memberGroups=' + _this.settings.member.groups.join(','));
    }

    checkAchievementsAjax.abort().getData({
      type: 'GET',
      url: _this.settings.uri.gatewayDomain + url + '?_lang=' + _this.settings.language + '&_uomKey=' + _this.settings.currency,
      headers: {
        'X-API-KEY': _this.settings.apiKey
      },
      success: function success(response, dataObj, xhr) {
        if (xhr.status === 200) {
          var jsonForAll = JSON.parse(response); // clear achievements list

          _this.settings.achievements.list = [];
          /*
          window.mapObject(jsonForAll.data, function (ach) {
            // here we add first achievements
            _this.settings.achievements.list.push(ach);
          });
          */

          if (withGroups) {
            checkAchievementsAjax.abort().getData({
              type: 'GET',
              url: _this.settings.uri.gatewayDomain + url + '?' + filters.join('&'),
              headers: {
                'X-API-KEY': _this.settings.apiKey
              },
              success: function success(response, dataObj, xhr) {
                if (xhr.status === 200) {
                  var json = JSON.parse(response);
                  window.mapObject(json.data, function (ach) {
                    // we show the achievement only if it's active for the current game (product)
                    _this.filterAchievementByProduct(ach, _this.settings.gameId, _this);
                  });
                  if (typeof callback === 'function') callback(_this.settings.achievements.list);
                } else {
                  _this.log('failed to checkForAvailableAchievements ' + response);
                }
              }
            });
          } else {
            if (typeof callback === 'function') callback(jsonForAll.data);
          }
        } else {
          _this.log('failed to checkForAvailableAchievements ' + response);
        }
      }
    });
  }; // filter achievement if enabled for current game
  // we show the achievement only if it's active for the current game (product)
  // _this.settings.gameId="55"
  // ach.products = [{name: "Eddie Dundee", productGroups: ["gameart"], productRefId: "55", productType: "slot"}]


  this.filterAchievementByProduct = function (ach, gameid, self) {
    // no product filtering enabled in backoffice
    if (ach.products.length === 0) {
      self.settings.achievements.list.push(ach); // check if achievement enabled for this current game (product)
    } else {
      var _iterator2 = _createForOfIteratorHelper(ach.products),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var prod = _step2.value;

          if (prod.productRefId === self.settings.gameId) {
            // add to achievements list
            self.settings.achievements.list.push(ach);
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }
  };

  var getAchievementsAjax = new _cLabs__WEBPACK_IMPORTED_MODULE_13__["default"].Ajax();

  this.getAchievement = function (achievementId, callback) {
    var _this = this;

    getAchievementsAjax.abort().getData({
      url: _this.settings.uri.gatewayDomain + _this.settings.uri.achievement.replace(':space', _this.settings.spaceName).replace(':id', achievementId) + '?_lang=' + _this.settings.language + '&_uomKey=' + _this.settings.currency,
      headers: {
        'X-API-KEY': _this.settings.apiKey
      },
      type: 'GET',
      success: function success(response, dataObj, xhr) {
        var json = null;

        if (xhr.status === 200) {
          try {
            json = JSON.parse(response);
          } catch (e) {}
        }

        if (typeof callback === 'function') {
          callback(json);
        }
      },
      error: function error() {
        if (typeof callback === 'function') {
          callback(null);
        }
      }
    });
  };

  var getRewardAjax = new _cLabs__WEBPACK_IMPORTED_MODULE_13__["default"].Ajax();

  this.getReward = function (rewardId, callback) {
    var _this = this;

    getRewardAjax.abort().getData({
      url: _this.settings.uri.gatewayDomain + _this.settings.uri.memberReward.replace(':space', _this.settings.spaceName).replace(':id', _this.settings.memberId).replace(':awardId', rewardId),
      headers: {
        'X-API-KEY': _this.settings.apiKey
      },
      type: 'GET',
      success: function success(response, dataObj, xhr) {
        var json = null;

        if (xhr.status === 200) {
          try {
            json = JSON.parse(response);
          } catch (e) {}
        }

        if (typeof callback === 'function') {
          callback(json);
        }
      },
      error: function error() {
        if (typeof callback === 'function') {
          callback(null);
        }
      }
    });
  };

  var getMessageAjax = new _cLabs__WEBPACK_IMPORTED_MODULE_13__["default"].Ajax();

  this.getMessage = function (messageId, callback) {
    var _this = this;

    getMessageAjax.abort().getData({
      url: _this.settings.uri.gatewayDomain + _this.settings.uri.messageById.replace(':space', _this.settings.spaceName).replace(':id', _this.settings.memberId).replace(':messageId', messageId),
      headers: {
        'X-API-KEY': _this.settings.apiKey
      },
      type: 'GET',
      success: function success(response, dataObj, xhr) {
        var json = null;

        if (xhr.status === 200) {
          try {
            json = JSON.parse(response);
          } catch (e) {}
        }

        if (typeof callback === 'function') {
          callback(json);
        }
      },
      error: function error() {
        if (typeof callback === 'function') {
          callback(null);
        }
      }
    });
  };

  var claimRewardAjax = new _cLabs__WEBPACK_IMPORTED_MODULE_13__["default"].Ajax();

  this.claimReward = function (rewardId, callback) {
    var _this = this;

    claimRewardAjax.abort().getData({
      url: _this.settings.uri.gatewayDomain + _this.settings.uri.memberRewardClaim.replace(':space', _this.settings.spaceName).replace(':id', _this.settings.memberId).replace(':awardId', rewardId),
      headers: {
        'X-API-KEY': _this.settings.apiKey
      },
      type: 'POST',
      success: function success(response, dataObj, xhr) {
        var json = null;

        if (xhr.status === 200) {
          try {
            json = JSON.parse(response);
          } catch (e) {}
        }

        if (typeof callback === 'function') {
          callback(json);
        }
      },
      error: function error() {
        if (typeof callback === 'function') {
          callback(null);
        }
      }
    });
  };

  var checkForMemberAchievementsAjax = new _cLabs__WEBPACK_IMPORTED_MODULE_13__["default"].Ajax();

  this.checkForMemberAchievementsIssued = function (callback) {
    var _this = this;

    var url = _this.settings.uri.achievementsIssued.replace(':space', _this.settings.spaceName).replace(':id', _this.settings.memberId);

    checkForMemberAchievementsAjax.abort().getData({
      type: 'GET',
      url: _this.settings.uri.gatewayDomain + url,
      headers: {
        'X-API-KEY': _this.settings.apiKey
      },
      success: function success(response, dataObj, xhr) {
        if (xhr.status === 200) {
          var json = JSON.parse(response);
          var idList = [];

          if (typeof json.aggregations !== 'undefined' && json.aggregations.length > 0) {
            window.mapObject(json.aggregations[0].items, function (item) {
              idList.push(item.value);
            });
          }

          if (typeof callback === 'function') callback(idList);
        } else {
          _this.log('failed to checkForMemberAchievementsIssued ' + response);
        }
      }
    });
  };

  var checkForMemberAchievementsProgressionAjax = new _cLabs__WEBPACK_IMPORTED_MODULE_13__["default"].Ajax();

  this.checkForMemberAchievementsProgression = function (idList, callback) {
    var _this = this;

    var url = _this.settings.uri.achievementsProgression.replace(':space', _this.settings.spaceName).replace(':id', _this.settings.memberId);

    checkForMemberAchievementsProgressionAjax.abort().getData({
      type: 'GET',
      url: _this.settings.uri.gatewayDomain + url + (idList.length > 0 ? '?id=' + idList.join(',') : ''),
      headers: {
        'X-API-KEY': _this.settings.apiKey
      },
      success: function success(response, dataObj, xhr) {
        if (xhr.status === 200) {
          var json = JSON.parse(response);
          if (typeof callback === 'function') callback(json.data);
        } else {
          _this.log('failed to checkForMemberAchievementsProgression ' + response);
        }
      }
    });
  };

  var checkForAvailableRewardsAjax = new _cLabs__WEBPACK_IMPORTED_MODULE_13__["default"].Ajax();

  this.checkForAvailableRewards = function (callback) {
    var _this = this;

    var url = _this.settings.uri.messages.replace(':space', _this.settings.spaceName).replace(':id', _this.settings.memberId); // claimed rewards


    checkForAvailableRewardsAjax.abort().getData({
      type: 'GET',
      url: _this.settings.uri.gatewayDomain + url + '?_sortByFields=created:desc&messageType=Reward&prize.claimed=true&_hasValuesFor=prize&_limit=100',
      headers: {
        'X-API-KEY': _this.settings.apiKey
      },
      success: function success(response, dataObj, xhr) {
        if (xhr.status === 200) {
          var jsonForAll = JSON.parse(response);
          _this.settings.rewards.rewards = [];
          _this.settings.rewards.availableRewards = [];
          _this.settings.rewards.expiredRewards = [];
          window.mapObject(jsonForAll.data, function (message) {
            var expired = typeof message.expiry === 'undefined' ? false : moment__WEBPACK_IMPORTED_MODULE_0___default()(message.expiry).diff(moment__WEBPACK_IMPORTED_MODULE_0___default()()) < 0;

            if (!expired) {
              _this.settings.rewards.rewards.push(message);
            }
          }); // not-claimed rewards

          checkForAvailableRewardsAjax.abort().getData({
            type: 'GET',
            url: _this.settings.uri.gatewayDomain + url + '?_sortByFields=created:desc&messageType=Reward&prize.claimed=false&_hasValuesFor=prize&_limit=100',
            headers: {
              'X-API-KEY': _this.settings.apiKey
            },
            success: function success(response, dataObj, xhr) {
              if (xhr.status === 200) {
                var jsonForAll = JSON.parse(response);
                window.mapObject(jsonForAll.data, function (message) {
                  var expired = typeof message.expiry === 'undefined' ? false : moment__WEBPACK_IMPORTED_MODULE_0___default()(message.expiry).diff(moment__WEBPACK_IMPORTED_MODULE_0___default()()) < 0;

                  if (!expired) {
                    _this.settings.rewards.availableRewards.push(message);
                  }
                }); // expired rewards

                var date = new Date();
                var utcDate = date.getUTCFullYear() + '-' + Object(_utils_formatNumberLeadingZeros__WEBPACK_IMPORTED_MODULE_4__["default"])(date.getUTCMonth() + 1, 2) + '-' + Object(_utils_formatNumberLeadingZeros__WEBPACK_IMPORTED_MODULE_4__["default"])(date.getUTCDate(), 2) + 'T' + Object(_utils_formatNumberLeadingZeros__WEBPACK_IMPORTED_MODULE_4__["default"])(date.getUTCHours(), 2) + ':' + Object(_utils_formatNumberLeadingZeros__WEBPACK_IMPORTED_MODULE_4__["default"])(date.getUTCMinutes(), 2) + ':00';

                _this.settings.globalAjax.abort().getData({
                  type: 'GET',
                  url: _this.settings.uri.gatewayDomain + url + '?_sortByFields=created:desc&_limit=100&messageType=Reward&_hasValuesFor=expiry&expiry<==' + utcDate,
                  headers: {
                    'X-API-KEY': _this.settings.apiKey
                  },
                  success: function success(response, dataObj, xhr) {
                    if (xhr.status === 200) {
                      var jsonForAll = JSON.parse(response);
                      window.mapObject(jsonForAll.data, function (message) {
                        _this.settings.rewards.expiredRewards.push(message);
                      });
                      if (typeof callback === 'function') callback(_this.settings.rewards.rewards, _this.settings.rewards.availableRewards, _this.settings.rewards.expiredRewards);
                    } else {
                      _this.log('failed to checkForAvailableRewards expired ' + response);
                    }
                  }
                });
              } else {
                _this.log('failed to checkForAvailableRewards not-claimed ' + response);
              }
            }
          });
        } else {
          _this.log('failed to checkForAvailableRewards claimed ' + response);
        }
      }
    });
  };

  var checkForAvailableMessagesAjax = new _cLabs__WEBPACK_IMPORTED_MODULE_13__["default"].Ajax();

  this.checkForAvailableMessages = function (callback) {
    var _this = this;

    var url = _this.settings.uri.messages.replace(':space', _this.settings.spaceName).replace(':id', _this.settings.memberId);

    var date = new Date();
    date.setDate(date.getMonth() - 1);
    var createdDateFilter = date.getFullYear() + '-' + Object(_utils_formatNumberLeadingZeros__WEBPACK_IMPORTED_MODULE_4__["default"])(date.getMonth() + 1, 2) + '-' + Object(_utils_formatNumberLeadingZeros__WEBPACK_IMPORTED_MODULE_4__["default"])(date.getDate(), 2);
    checkForAvailableMessagesAjax.abort().getData({
      type: 'GET',
      url: _this.settings.uri.gatewayDomain + url + '?_sortByFields=created:desc&_hasNoValuesFor=prize&_limit=100&created>==' + createdDateFilter,
      headers: {
        'X-API-KEY': _this.settings.apiKey
      },
      success: function success(response, dataObj, xhr) {
        if (xhr.status === 200) {
          var jsonForAll = JSON.parse(response);
          _this.settings.messages.messages = [];
          window.mapObject(jsonForAll.data, function (message) {
            _this.settings.messages.messages.push(message);
          });
          if (typeof callback === 'function') callback(_this.settings.messages.messages);
        } else {
          _this.log('failed to checkForAvailableMessages ' + response);
        }
      }
    });
  };

  var optInMemberAjax = new _cLabs__WEBPACK_IMPORTED_MODULE_13__["default"].Ajax();

  this.optInMemberToActiveCompetition = function (callback) {
    var _this = this;

    var url = _this.settings.uri.memberCompetitionOptIn.replace(':space', _this.settings.spaceName).replace(':id', _this.settings.memberId).replace(':competitionId', _this.settings.competition.activeCompetitionId);

    optInMemberAjax.abort().getData({
      type: 'GET',
      url: _this.settings.uri.gatewayDomain + url,
      headers: {
        'X-API-KEY': _this.settings.apiKey
      },
      success: function success(response, dataObj, xhr) {
        if (xhr.status === 200) {
          callback();
        } else {
          _this.log('failed to optInMemberToActiveCompetition ' + response);
        }
      }
    });
  };

  var revalidationCount = 0;

  this.revalidateIfSuccessfullOptIn = function (callback) {
    var _this = this;

    _this.loadActiveCompetition(function (competitionJson) {
      if (typeof competitionJson.data.optin === 'boolean' && !competitionJson.data.optin) {
        revalidationCount++;

        if (revalidationCount < 5) {
          setTimeout(function () {
            _this.revalidateIfSuccessfullOptIn(callback);
          }, 100);
        } else {
          revalidationCount = 0;
        }
      } else if (typeof competitionJson.data.optin === 'boolean' && competitionJson.data.optin) {
        callback(competitionJson);
      }
    });
  };

  this.leaderboardDataRefresh = function () {
    var _this = this;

    if (_this.settings.leaderboard.refreshLbDataInterval) {
      clearTimeout(_this.settings.leaderboard.refreshLbDataInterval);
    }

    if (_this.settings.competition.activeCompetition !== null && typeof _this.settings.competition.activeCompetition.optinRequired === 'boolean' && !_this.settings.competition.activeCompetition.optinRequired || typeof _this.settings.competition.activeCompetition.optin === 'boolean' && _this.settings.competition.activeCompetition.optin) {
      var count = _this.settings.miniScoreBoard.settings.active ? 0 : _this.settings.leaderboard.fullLeaderboardSize;

      _this.getLeaderboardData(count, function (data) {
        if (_this.settings.miniScoreBoard.settings.active) _this.settings.miniScoreBoard.loadScoreBoard();
        if (_this.settings.mainWidget.settings.active) _this.settings.mainWidget.loadLeaderboard();
      });
    }

    _this.settings.leaderboard.refreshLbDataInterval = setTimeout(function () {
      _this.leaderboardDataRefresh();
    }, _this.settings.leaderboard.refreshIntervalMillis);
  };

  this.activeCompetitionDataRefresh = function (callback) {
    var _this = this;

    if (_this.settings.competition.refreshInterval) {
      clearTimeout(_this.settings.competition.refreshInterval);
    }

    _this.checkForAvailableCompetitions(function () {
      _this.prepareActiveCompetition(function () {
        var count = _this.settings.miniScoreBoard.settings.active ? 0 : _this.settings.leaderboard.fullLeaderboardSize; // clear to not clash with LB refresh that could happen at same time

        if (_this.settings.leaderboard.refreshInterval) {
          clearTimeout(_this.settings.leaderboard.refreshInterval);
        }

        if (_this.settings.miniScoreBoard.settings.active || _this.settings.mainWidget.settings.active) {
          if (_this.settings.competition.activeCompetition !== null && typeof _this.settings.competition.activeCompetition.optinRequired === 'boolean' && !_this.settings.competition.activeCompetition.optinRequired || _this.settings.competition.activeCompetition !== null && typeof _this.settings.competition.activeCompetition.optin === 'boolean' && _this.settings.competition.activeCompetition.optin) {
            _this.getLeaderboardData(count, function (data) {
              if (_this.settings.miniScoreBoard.settings.active) _this.settings.miniScoreBoard.loadScoreBoard();
              if (_this.settings.mainWidget.settings.active) _this.settings.mainWidget.loadLeaderboard(); // re-start leaderboard refresh

              _this.leaderboardDataRefresh();

              if (typeof callback === 'function') {
                callback();
              }
            });
          } else {
            if (_this.settings.miniScoreBoard.settings.active) _this.settings.miniScoreBoard.loadScoreBoard();

            if (_this.settings.mainWidget.settings.active) {
              _this.getLeaderboardData(count, function (data) {
                _this.settings.mainWidget.loadLeaderboard();
              });
            } // restart leaderboard refresh


            _this.leaderboardDataRefresh();

            if (typeof callback === 'function') {
              callback();
            }
          }
        } else {
          if (_this.settings.miniScoreBoard.settings.active) _this.settings.miniScoreBoard.loadScoreBoard();

          if (typeof callback === 'function') {
            callback();
          }
        }
      });
    });

    _this.settings.competition.refreshInterval = setTimeout(function () {
      _this.activeCompetitionDataRefresh();
    }, _this.settings.competition.refreshIntervalMillis);
  };

  this.deactivateCompetitionsAndLeaderboards = function (callback) {
    var _this = this;

    if (_this.settings.leaderboard.refreshInterval) {
      clearTimeout(_this.settings.leaderboard.refreshInterval);
    }

    _this.settings.miniScoreBoard.clearAll();

    _this.settings.mainWidget.clearAll();

    if (typeof callback === 'function') {
      callback();
    }
  };

  this.stopActivity = function (callback) {
    var _this = this;

    if (_this.settings.leaderboard.refreshInterval) {
      clearTimeout(_this.settings.leaderboard.refreshInterval);
      clearInterval(_this.settings.leaderboard.refreshInterval);
    }

    if (_this.settings.leaderboard.refreshLbDataInterval) {
      clearTimeout(_this.settings.leaderboard.refreshLbDataInterval);
      clearInterval(_this.settings.leaderboard.refreshLbDataInterval);
    }

    if (_this.settings.miniScoreBoard.settings.updateInterval) {
      clearTimeout(_this.settings.miniScoreBoard.settings.updateInterval);
      clearInterval(_this.settings.leaderboard.refreshInterval);
    }

    if (typeof callback === 'function') {
      callback();
    }
  };

  this.restartActivity = function (callback) {
    var _this = this;

    _this.activeCompetitionDataRefresh();

    _this.settings.miniScoreBoard.updateScoreBoard();

    if (typeof callback === 'function') {
      callback();
    }
  };

  this.loadMember = function (callback) {
    var _this = this;

    _this.settings.globalAjax.abort().getData({
      type: 'GET',
      url: _this.settings.uri.gatewayDomain + _this.settings.uri.members.replace(':space', _this.settings.spaceName).replace(':id', _this.settings.memberId),
      headers: {
        'X-API-KEY': _this.settings.apiKey
      },
      success: function success(response, dataObj, xhr) {
        if (xhr.status === 200) {
          var json = JSON.parse(response);
          _this.settings.member = json.data;
          callback(json.data);
        } else {
          _this.log('failed to loadMember ' + response); // if user not found, we can retry later to see if it was inserted.
          // normally the spin events will automatically insert the user


          if (xhr.status === 404) {
            // retry in 5 secs
            setTimeout(function () {
              _this.init();
            }, 5000);
          }
        }
      }
    });
  };

  this.loadWidgetTranslations = function (callback) {
    var _this = this;

    if (typeof _this.settings.uri.translationPath === 'string' && _this.settings.uri.translationPath.length > 0 && _this.settings.loadTranslations) {
      _this.settings.globalAjax.abort().getData({
        type: 'GET',
        url: _this.settings.uri.gatewayDomain + _this.settings.uri.translationPath.replace(':language', _this.settings.language),
        headers: {
          'X-API-KEY': _this.settings.apiKey
        },
        success: function success(response, dataObj, xhr) {
          if (xhr.status === 200) {
            var json = JSON.parse(response);
            _this.settings.translation = Object(_utils_mergeObjects__WEBPACK_IMPORTED_MODULE_3__["default"])(_this.settings.translation, json);
            callback();
          } else {
            _this.log('no translation foound ' + response);

            callback();
          }
        },
        error: function error(xhr, ajaxOptions, thrownError) {
          _this.log('Translation File Request Error');
        }
      });
    } else {
      callback();
    }
  };

  this.startup = function () {
    var _this = this;

    _this.settings.miniScoreBoard.initLayout(function () {
      _this.settings.miniScoreBoard.settings.active = true;

      _this.activeCompetitionDataRefresh();

      if (_this.settings.enableNotifications) {
        _this.settings.notifications.init();
      }

      _this.cleanup();
    });
  };

  var _cleanupInstance;

  this.cleanup = function () {
    var _this = this;

    if (_cleanupInstance) {
      clearTimeout(_cleanupInstance);
    }

    _cleanupInstance = setTimeout(function () {
      _this.settings.mainWidget.preLoaderRerun();

      _this.cleanup();
    }, 3000);
  };

  this.loadStylesheet = function (callback) {
    var _this = this;

    var createdResources = false;
    var availableLinks = [];
    Object(_utils_objectIterator__WEBPACK_IMPORTED_MODULE_6__["default"])(Object(_utils_query__WEBPACK_IMPORTED_MODULE_7__["default"])('link'), function (link) {
      if (link !== null) {
        availableLinks.push(link.href);
      }
    });
    window.mapObject(_this.settings.resources, function (resource, key, count) {
      var exists = false;
      window.mapObject(availableLinks, function (link) {
        if (link === resource) {
          exists = true;
        }
      });

      if (!exists) {
        var link = document.createElement('link');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('type', 'text/css');
        link.setAttribute('href', resource);

        if (count === 0) {
          link.onload = function () {
            if (typeof callback === 'function') {
              callback();
            }
          };

          link.onerror = function (e) {
            if (typeof callback === 'function') {
              callback();
            }
          };
        }

        document.body.appendChild(link);
        createdResources = true;
      }
    });

    if (!createdResources && typeof callback === 'function') {
      callback();
    }
  };

  this.clickedMiniScoreBoard = function () {
    var _this = this;

    if (!_this.settings.miniScoreBoard.settings.dragging) {
      _this.deactivateCompetitionsAndLeaderboards(function () {
        _this.settings.leaderboard.leaderboardData = [];

        _this.settings.mainWidget.initLayout(function () {
          _this.activeCompetitionDataRefresh();
        });

        setTimeout(function () {
          _this.settings.miniScoreBoard.settings.container.style.display = 'none';
        }, 200);
      });
    }
  };
  /**
   * Open main widget and open specific tab and loads relevant action
   * @param tab String
   * @param actionCallback Function
   */


  this.openWithTabAndAction = function (tab, actionCallback) {
    var _this = this;

    if (_this.settings.mainWidget.settings.active) {
      var loadTab = Object(_utils_query__WEBPACK_IMPORTED_MODULE_7__["default"])(_this.settings.mainWidget.settings.container, tab);

      _this.settings.mainWidget.navigationSwitch(loadTab, function () {
        _this.activeCompetitionDataRefresh();

        if (typeof actionCallback === 'function') {
          actionCallback();
        }
      });

      setTimeout(function () {
        _this.settings.miniScoreBoard.settings.container.style.display = 'none';
      }, 200);
    } else {
      _this.deactivateCompetitionsAndLeaderboards(function () {
        _this.settings.mainWidget.initLayout(function () {
          _this.settings.mainWidget.navigationSwitch(Object(_utils_query__WEBPACK_IMPORTED_MODULE_7__["default"])(_this.settings.mainWidget.settings.container, tab), function () {
            _this.activeCompetitionDataRefresh();

            if (typeof actionCallback === 'function') {
              actionCallback();
            }
          });
        });

        setTimeout(function () {
          _this.settings.miniScoreBoard.settings.container.style.display = 'none';
        }, 200);
      });
    }
  };

  var loadCompetitionListAjax = new _cLabs__WEBPACK_IMPORTED_MODULE_13__["default"].Ajax();

  this.eventHandlers = function (el) {
    var _this = this; // mini scoreboard opt-in action


    if (Object(_utils_hasClass__WEBPACK_IMPORTED_MODULE_8__["default"])(el, 'cl-widget-ms-optin-action') && !Object(_utils_hasClass__WEBPACK_IMPORTED_MODULE_8__["default"])(el, 'checking')) {
      Object(_utils_addClass__WEBPACK_IMPORTED_MODULE_9__["default"])(el, 'checking');

      _this.optInMemberToActiveCompetition(function () {
        _this.revalidateIfSuccessfullOptIn(function (competitionJson) {
          _this.settings.competition.activeCompetition = competitionJson.data; // _this.getLeaderboardData(1, function( data ){
          //  _this.settings.miniScoreBoard.loadScoreBoard( data );
          // });
          // extra action to load competition details on mini scoreboard opt-in - Product request

          _this.deactivateCompetitionsAndLeaderboards(function () {
            _this.settings.leaderboard.leaderboardData = [];

            _this.settings.mainWidget.initLayout(function () {
              _this.activeCompetitionDataRefresh();

              _this.settings.mainWidget.loadCompetitionDetails(function () {});
            });

            setTimeout(function () {
              _this.settings.miniScoreBoard.settings.container.style.display = 'none';
            }, 200);
          });

          Object(_utils_removeClass__WEBPACK_IMPORTED_MODULE_10__["default"])(el, 'checking');
        });
      }); // Leaderboard details opt-in action

    } else if (Object(_utils_hasClass__WEBPACK_IMPORTED_MODULE_8__["default"])(el, 'cl-main-widget-lb-details-optin-action') && !Object(_utils_hasClass__WEBPACK_IMPORTED_MODULE_8__["default"])(el, 'checking')) {
      Object(_utils_addClass__WEBPACK_IMPORTED_MODULE_9__["default"])(el, 'checking');

      _this.optInMemberToActiveCompetition(function () {
        _this.revalidateIfSuccessfullOptIn(function (competitionJson) {
          _this.settings.competition.activeCompetition = competitionJson.data;

          _this.settings.mainWidget.competitionDetailsOptInButtonState();

          Object(_utils_removeClass__WEBPACK_IMPORTED_MODULE_10__["default"])(el, 'checking');
        });
      }); // Leaderboard details opt-in action

    } else if (Object(_utils_hasClass__WEBPACK_IMPORTED_MODULE_8__["default"])(el, 'cl-main-widget-lb-optin-action') && !Object(_utils_hasClass__WEBPACK_IMPORTED_MODULE_8__["default"])(el, 'checking')) {
      Object(_utils_addClass__WEBPACK_IMPORTED_MODULE_9__["default"])(el, 'checking');

      _this.optInMemberToActiveCompetition(function () {
        _this.revalidateIfSuccessfullOptIn(function (competitionJson) {
          _this.settings.competition.activeCompetition = competitionJson.data;

          _this.settings.mainWidget.loadCompetitionDetails(function () {});

          Object(_utils_removeClass__WEBPACK_IMPORTED_MODULE_10__["default"])(el, 'checking');
          el.parentNode.style.display = 'none';
        });
      }); // close mini scoreboard info area

    } else if (Object(_utils_hasClass__WEBPACK_IMPORTED_MODULE_8__["default"])(el, 'cl-widget-ms-information-close') && !Object(_utils_hasClass__WEBPACK_IMPORTED_MODULE_8__["default"])(el, 'checking')) {
      _this.settings.miniScoreBoard.clearAll(); // close notification window

    } else if (Object(_utils_hasClass__WEBPACK_IMPORTED_MODULE_8__["default"])(el, 'cl-widget-notif-information-close') && !Object(_utils_hasClass__WEBPACK_IMPORTED_MODULE_8__["default"])(el, 'checking')) {
      _this.settings.notifications.hideNotification(); // close leaderboard window

    } else if (Object(_utils_hasClass__WEBPACK_IMPORTED_MODULE_8__["default"])(el, 'cl-main-widget-lb-header-close') || Object(_utils_hasClass__WEBPACK_IMPORTED_MODULE_8__["default"])(el, 'cl-main-widget-ach-header-close') || Object(_utils_hasClass__WEBPACK_IMPORTED_MODULE_8__["default"])(el, 'cl-main-widget-reward-header-close') || Object(_utils_hasClass__WEBPACK_IMPORTED_MODULE_8__["default"])(el, 'cl-main-widget-inbox-header-close')) {
      _this.settings.mainWidget.hide(function () {
        _this.settings.miniScoreBoard.settings.active = true;
        _this.settings.miniScoreBoard.settings.container.style.display = 'block';

        _this.activeCompetitionDataRefresh();
      }); // load competition details

    } else if (Object(_utils_hasClass__WEBPACK_IMPORTED_MODULE_8__["default"])(el, 'cl-main-widget-lb-details-content-label')) {
      if (_this.settings.competition.activeContest !== null) {
        _this.settings.mainWidget.loadCompetitionDetails(function () {});
      } // load achievement details

    } else if (Object(_utils_hasClass__WEBPACK_IMPORTED_MODULE_8__["default"])(el, 'cl-ach-list-more')) {
      _this.getAchievement(el.dataset.id, function (data) {
        _this.settings.mainWidget.loadAchievementDetails(data, function () {});
      }); // leaderboard details back button

    } else if (Object(_utils_hasClass__WEBPACK_IMPORTED_MODULE_8__["default"])(el, 'cl-main-widget-lb-details-back-btn')) {
      _this.settings.mainWidget.hideCompetitionDetails(); // achievements details back button

    } else if (Object(_utils_hasClass__WEBPACK_IMPORTED_MODULE_8__["default"])(el, 'cl-main-widget-ach-details-back-btn')) {
      _this.settings.mainWidget.hideAchievementDetails(function () {}); // rewards details back button

    } else if (Object(_utils_hasClass__WEBPACK_IMPORTED_MODULE_8__["default"])(el, 'cl-main-widget-reward-details-back-btn')) {
      _this.settings.mainWidget.hideRewardDetails(function () {}); // messages details back button

    } else if (Object(_utils_hasClass__WEBPACK_IMPORTED_MODULE_8__["default"])(el, 'cl-main-widget-inbox-details-back-btn')) {
      _this.settings.mainWidget.hideMessageDetails(function () {}); // load rewards details

    } else if (Object(_utils_hasClass__WEBPACK_IMPORTED_MODULE_8__["default"])(el, 'cl-rew-list-item') || Object(_utils_closest__WEBPACK_IMPORTED_MODULE_11__["default"])(el, '.cl-rew-list-item') !== null) {
      var rewardId = Object(_utils_hasClass__WEBPACK_IMPORTED_MODULE_8__["default"])(el, 'cl-rew-list-item') ? el.dataset.rewardId : Object(_utils_closest__WEBPACK_IMPORTED_MODULE_11__["default"])(el, '.cl-rew-list-item').dataset.rewardId;

      _this.getReward(rewardId, function (data) {
        _this.settings.mainWidget.loadRewardDetails(data, function () {});
      }); // load inbox details

    } else if (Object(_utils_hasClass__WEBPACK_IMPORTED_MODULE_8__["default"])(el, 'cl-inbox-list-item') || Object(_utils_closest__WEBPACK_IMPORTED_MODULE_11__["default"])(el, '.cl-inbox-list-item') !== null) {
      var messageId = Object(_utils_hasClass__WEBPACK_IMPORTED_MODULE_8__["default"])(el, 'cl-inbox-list-item') ? el.dataset.rewardId : Object(_utils_closest__WEBPACK_IMPORTED_MODULE_11__["default"])(el, '.cl-inbox-list-item').dataset.id;

      _this.getMessage(messageId, function (data) {
        _this.settings.mainWidget.loadMessageDetails(data, function () {});
      }); // claim reward

    } else if (Object(_utils_hasClass__WEBPACK_IMPORTED_MODULE_8__["default"])(el, 'cl-main-widget-reward-claim-btn')) {
      _this.claimReward(el.dataset.id, function (data) {
        if (data.data.claimed) {
          _this.settings.mainWidget.loadRewards();

          Object(_utils_addClass__WEBPACK_IMPORTED_MODULE_9__["default"])(el, 'cl-claimed');
          el.innerHTML = _this.settings.translation.rewards.claimed;
        } else {
          Object(_utils_removeClass__WEBPACK_IMPORTED_MODULE_10__["default"])(el, 'cl-claimed');
          el.innerHTML = _this.settings.translation.rewards.claim;
        }
      }); // load achievement details window from notification window

    } else if (Object(_utils_hasClass__WEBPACK_IMPORTED_MODULE_8__["default"])(el, 'cl-widget-notif-information-details-wrapper') || Object(_utils_closest__WEBPACK_IMPORTED_MODULE_11__["default"])(el, '.cl-widget-notif-information-details-wrapper') !== null) {
      _this.openWithTabAndAction('.cl-main-widget-navigation-ach-icon', function () {
        var id = Object(_utils_hasClass__WEBPACK_IMPORTED_MODULE_8__["default"])(el, 'cl-widget-notif-information-details-wrapper') ? el.dataset.id : Object(_utils_closest__WEBPACK_IMPORTED_MODULE_11__["default"])(el, '.cl-widget-notif-information-details-wrapper').dataset.id;

        _this.settings.notifications.hideNotification();

        _this.settings.mainWidget.hideAchievementDetails(function () {
          _this.getAchievement(id, function (data) {
            _this.settings.mainWidget.loadAchievementDetails(data);
          });
        });
      }); // primary widget navigation

    } else if (Object(_utils_hasClass__WEBPACK_IMPORTED_MODULE_8__["default"])(el, 'cl-main-navigation-item')) {
      _this.settings.mainWidget.navigationSwitch(el); // competition list

    } else if (Object(_utils_hasClass__WEBPACK_IMPORTED_MODULE_8__["default"])(el, 'cl-main-widget-lb-header-list-icon')) {
      if (_this.settings.leaderboard.refreshInterval) {
        clearTimeout(_this.settings.leaderboard.refreshInterval);
      }

      _this.settings.mainWidget.loadCompetitionList(function () {
        _this.activeCompetitionDataRefresh();
      }, loadCompetitionListAjax); // load competition

    } else if (Object(_utils_hasClass__WEBPACK_IMPORTED_MODULE_8__["default"])(el, 'cl-tour-list-item') || Object(_utils_closest__WEBPACK_IMPORTED_MODULE_11__["default"])(el, '.cl-tour-list-item') !== null) {
      var tournamentId = Object(_utils_hasClass__WEBPACK_IMPORTED_MODULE_8__["default"])(el, 'cl-tour-list-item') ? el.dataset.id : Object(_utils_closest__WEBPACK_IMPORTED_MODULE_11__["default"])(el, '.cl-tour-list-item').dataset.id;

      var preLoader = _this.settings.mainWidget.preloader();

      preLoader.show(function () {
        _this.settings.mainWidget.settings.active = true;
        _this.settings.tournaments.activeCompetitionId = tournamentId;

        _this.activeCompetitionDataRefresh(function () {
          _this.settings.mainWidget.hideCompetitionList(function () {
            preLoader.hide();
          });
        });
      }); // hide competition list view
    } else if (Object(_utils_hasClass__WEBPACK_IMPORTED_MODULE_8__["default"])(el, 'cl-main-widget-tournaments-back-btn')) {
      _this.settings.mainWidget.hideCompetitionList(); // mini scoreboard action to open primary widget

    } else if (Object(_utils_hasClass__WEBPACK_IMPORTED_MODULE_8__["default"])(el, 'cl-widget-ms-icon-wrapper') || Object(_utils_closest__WEBPACK_IMPORTED_MODULE_11__["default"])(el, '.cl-widget-ms-icon-wrapper') !== null || Object(_utils_hasClass__WEBPACK_IMPORTED_MODULE_8__["default"])(el, 'cl-widget-ms-information-wrapper') || Object(_utils_closest__WEBPACK_IMPORTED_MODULE_11__["default"])(el, '.cl-widget-ms-information-wrapper') !== null) {
      _this.clickedMiniScoreBoard(); // accordion navigation

    } else if (Object(_utils_hasClass__WEBPACK_IMPORTED_MODULE_8__["default"])(el, 'cl-accordion-label')) {
      _this.settings.mainWidget.accordionNavigation(el);
    }
  };

  this.eventListeners = function () {
    var _this = this;

    document.body.addEventListener('keyup', function (event) {
      switch (event.keyCode) {
        case 27:
          // on escape
          if (_this.settings.mainWidget.settings.active) {
            _this.settings.mainWidget.hide(function () {
              _this.settings.miniScoreBoard.settings.active = true;
              _this.settings.miniScoreBoard.settings.container.style.display = 'block';

              _this.activeCompetitionDataRefresh();
            });
          }

          break;
      }
    });

    if (_this.isMobile()) {
      document.body.addEventListener('touchend', function (event) {
        var el = event.target;

        if (!_this.settings.miniScoreBoard.settings.dragging) {
          _this.eventHandlers(el);
        }
      });
    } else {
      document.body.addEventListener('click', function (event) {
        var el = event.target;

        _this.eventHandlers(el);
      });
    }
  };

  this.closeEverything = function () {
    var _this = this;

    _this.deactivateCompetitionsAndLeaderboards(function () {
      _this.settings.leaderboard.leaderboardData = [];

      _this.settings.mainWidget.initLayout(function () {
        _this.activeCompetitionDataRefresh();
      });

      setTimeout(function () {
        _this.settings.miniScoreBoard.settings.container.style.display = 'none';
      }, 200);
    });

    _this.settings.mainWidget.hide();

    _this.settings.mainWidget.settings.preLoader.preLoaderActive = false;
  };

  this.isMobile = function () {
    return Object(_utils_isMobileTablet__WEBPACK_IMPORTED_MODULE_12__["default"])();
  };

  this.init = function () {
    var _this = this;

    _this.loadStylesheet(function () {
      _this.loadMember(function (member) {
        _this.loadWidgetTranslations(function () {
          if (_this.settings.miniScoreBoard === null) {
            _this.settings.notifications = new _Notifications__WEBPACK_IMPORTED_MODULE_15__["Notifications"]();
            _this.settings.miniScoreBoard = new _MiniScoreBoard__WEBPACK_IMPORTED_MODULE_16__["MiniScoreBoard"]({
              active: true
            });
            _this.settings.mainWidget = new _MainWidget__WEBPACK_IMPORTED_MODULE_17__["MainWidget"]();
            _this.settings.notifications.settings.lbWidget = _this;
            _this.settings.miniScoreBoard.settings.lbWidget = _this;
            _this.settings.mainWidget.settings.lbWidget = _this;

            _this.startup();

            _this.eventListeners();
          } else {
            _this.settings.mainWidget.hide(function () {
              _this.deactivateCompetitionsAndLeaderboards(function () {
                _this.settings.miniScoreBoard.settings.active = true;
                _this.settings.miniScoreBoard.settings.container.style.display = 'block';

                _this.startup();
              });
            });
          }
        });
      });
    });
  };

  if (this.settings.autoStart) {
    this.init();
  }
};

/***/ }),

/***/ "./src/javascript/modules/MainWidget.js":
/*!**********************************************!*\
  !*** ./src/javascript/modules/MainWidget.js ***!
  \**********************************************/
/*! exports provided: MainWidget */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MainWidget", function() { return MainWidget; });
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_hasClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/hasClass */ "./src/javascript/utils/hasClass.js");
/* harmony import */ var _utils_removeClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/removeClass */ "./src/javascript/utils/removeClass.js");
/* harmony import */ var _utils_objectIterator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/objectIterator */ "./src/javascript/utils/objectIterator.js");
/* harmony import */ var _utils_query__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/query */ "./src/javascript/utils/query.js");
/* harmony import */ var _utils_closest__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/closest */ "./src/javascript/utils/closest.js");
/* harmony import */ var _utils_addClass__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/addClass */ "./src/javascript/utils/addClass.js");
/* harmony import */ var _utils_remove__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/remove */ "./src/javascript/utils/remove.js");
/* harmony import */ var _utils_appendNext__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../utils/appendNext */ "./src/javascript/utils/appendNext.js");
/* harmony import */ var _utils_stripHtml__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../utils/stripHtml */ "./src/javascript/utils/stripHtml.js");










var MainWidget = function MainWidget(options) {
  this.settings = {
    lbWidget: null,
    container: null,
    navigation: null,
    section: null,
    detailsContainer: null,
    tournamentListContainer: null,
    headerDate: null,
    preLoader: {
      preLoaderActive: false,
      preLoaderlastAttempt: null,
      preloaderCallbackRecovery: function preloaderCallbackRecovery() {}
    },
    achievement: {
      container: null,
      detailsContainer: null
    },
    reward: {
      container: null,
      detailsContainer: null
    },
    messages: {
      container: null,
      detailsContainer: null
    },
    leaderboard: {
      defaultEmptyList: 20,
      topResultSize: 3,
      header: null,
      container: null,
      list: null,
      topResults: null,
      timerInterval: null
    },
    tournamentsSection: {
      accordionLayout: [{
        label: 'Upcoming Tournaments',
        type: 'readyCompetitions',
        show: false,
        showTopResults: 1
      }, {
        label: 'Active Tournaments',
        type: 'activeCompetitions',
        show: true,
        showTopResults: 1
      }, {
        label: 'Finished Tournaments',
        type: 'finishedCompetitions',
        show: false,
        showTopResults: 1
      }]
    },
    rewardsSection: {
      accordionLayout: [{
        label: 'Available Rewards',
        type: 'availableRewards',
        show: true,
        showTopResults: 1
      }, {
        label: 'Claimed Rewards',
        type: 'rewards',
        show: false,
        showTopResults: 1
      }, {
        label: 'Expired Rewards',
        type: 'expiredRewards',
        show: false,
        showTopResults: 1
      }]
    },
    active: false,
    navigationSwitchLastAtempt: new Date().getTime(),
    navigationSwitchInProgress: false
  };

  if (typeof options !== 'undefined') {
    for (var opt in options) {
      if (options.hasOwnProperty(opt)) {
        this.settings[opt] = options[opt];
      }
    }
  }
  /**
   * Accordion style layout
   * - parameters:
   *      - label: String "Available rewards"
   *      - type: String "available-rewards"
   *      - shown: Boolean true/false
   * @param data Array
   * @param onLayout Function
   */


  this.accordionStyle = function (data, onLayout) {
    var _this = this;

    var accordionWrapper = document.createElement('div');
    accordionWrapper.setAttribute('class', 'cl-main-accordion-container');
    window.mapObject(data, function (entry) {
      var accordionSection = document.createElement('div');
      var accordionLabel = document.createElement('div');
      var topShownEntry = document.createElement('div');
      var accordionListContainer = document.createElement('div');
      var accordionList = document.createElement('div');
      accordionSection.setAttribute('class', 'cl-accordion ' + entry.type + (typeof entry.show === 'boolean' && entry.show ? ' cl-shown' : ''));
      accordionLabel.setAttribute('class', 'cl-accordion-label');
      topShownEntry.setAttribute('class', 'cl-accordion-entry');
      accordionListContainer.setAttribute('class', 'cl-accordion-list-container');
      accordionList.setAttribute('class', 'cl-accordion-list');

      if (typeof _this.settings.lbWidget.settings.translation.rewards[entry.type] !== 'undefined') {
        accordionLabel.innerHTML = _this.settings.lbWidget.settings.translation.rewards[entry.type];
      } else if (typeof _this.settings.lbWidget.settings.translation.tournaments[entry.type] !== 'undefined') {
        accordionLabel.innerHTML = _this.settings.lbWidget.settings.translation.tournaments[entry.type];
      } else {
        accordionLabel.innerHTML = entry.label;
      }

      if (typeof onLayout === 'function') {
        onLayout(accordionSection, accordionList, topShownEntry, entry);
      }

      accordionListContainer.appendChild(accordionList);
      accordionSection.appendChild(accordionLabel);
      accordionSection.appendChild(topShownEntry);
      accordionSection.appendChild(accordionListContainer);
      accordionWrapper.appendChild(accordionSection);
    });
    return accordionWrapper;
  };

  this.accordionNavigation = function (element) {
    // var _this = this;
    var parentEl = element.parentNode;

    if (Object(_utils_hasClass__WEBPACK_IMPORTED_MODULE_1__["default"])(parentEl, 'cl-shown')) {
      Object(_utils_removeClass__WEBPACK_IMPORTED_MODULE_2__["default"])(parentEl, 'cl-shown');
    } else {
      Object(_utils_objectIterator__WEBPACK_IMPORTED_MODULE_3__["default"])(Object(_utils_query__WEBPACK_IMPORTED_MODULE_4__["default"])(Object(_utils_closest__WEBPACK_IMPORTED_MODULE_5__["default"])(parentEl, '.cl-main-accordion-container'), '.cl-shown'), function (obj) {
        Object(_utils_removeClass__WEBPACK_IMPORTED_MODULE_2__["default"])(obj, 'cl-shown');
      });
      Object(_utils_addClass__WEBPACK_IMPORTED_MODULE_6__["default"])(parentEl, 'cl-shown');
    }
  };

  this.layout = function () {
    var _this = this;

    var wrapper = document.createElement('div');
    var innerWrapper = document.createElement('div');
    var navigationContainer = document.createElement('div');
    var navigationItems = document.createElement('div');
    var navigationItemLB = document.createElement('div');
    var navigationItemLBIcon = document.createElement('div');
    var navigationItemACH = document.createElement('div');
    var navigationItemACHIcon = document.createElement('div');
    var navigationItemRewards = document.createElement('div');
    var navigationItemRewardsIcon = document.createElement('div');
    var navigationItemInbox = document.createElement('div');
    var navigationItemInboxIcon = document.createElement('div');
    var mainSectionContainer = document.createElement('div');
    var preLoaderContainer = document.createElement('div');
    var preLoaderContent = document.createElement('div');
    var preLoaderBar1 = document.createElement('div');
    var preLoaderBar2 = document.createElement('div');
    var preLoaderBar3 = document.createElement('div');

    var sectionLB = _this.leaderboardAreaLayout();

    var sectionACH = _this.achievementsAreaLayout();

    var sectionRewards = _this.rewardsAreaLayout();

    var sectionInbox = _this.inboxAreaLayout();

    wrapper.setAttribute('class', 'cl-main-widget-wrapper');
    innerWrapper.setAttribute('class', 'cl-main-widget-inner-wrapper');
    navigationContainer.setAttribute('class', 'cl-main-widget-navigation-container');
    navigationItems.setAttribute('class', 'cl-main-widget-navigation-items');
    navigationItemLB.setAttribute('class', 'cl-main-widget-navigation-lb cl-active-nav');
    navigationItemLBIcon.setAttribute('class', 'cl-main-widget-navigation-lb-icon cl-main-navigation-item');
    navigationItemACH.setAttribute('class', 'cl-main-widget-navigation-ach');
    navigationItemACHIcon.setAttribute('class', 'cl-main-widget-navigation-ach-icon cl-main-navigation-item');
    navigationItemRewards.setAttribute('class', 'cl-main-widget-navigation-rewards');
    navigationItemRewardsIcon.setAttribute('class', 'cl-main-widget-navigation-rewards-icon cl-main-navigation-item');
    mainSectionContainer.setAttribute('class', 'cl-main-widget-section-container');
    preLoaderContainer.setAttribute('class', 'cl-main-widget-pre-loader');
    preLoaderContent.setAttribute('class', 'cl-main-widget-pre-loader-content');
    preLoaderBar1.setAttribute('class', 'cl-pre-loader-bar');
    preLoaderBar2.setAttribute('class', 'cl-pre-loader-bar');
    preLoaderBar3.setAttribute('class', 'cl-pre-loader-bar');
    preLoaderContent.appendChild(preLoaderBar1);
    preLoaderContent.appendChild(preLoaderBar2);
    preLoaderContent.appendChild(preLoaderBar3);
    preLoaderContainer.appendChild(preLoaderContent);
    navigationItemLB.appendChild(navigationItemLBIcon);
    navigationItems.appendChild(navigationItemLB);
    navigationItemACH.appendChild(navigationItemACHIcon);
    navigationItems.appendChild(navigationItemACH);
    navigationItemRewards.appendChild(navigationItemRewardsIcon);
    navigationItems.appendChild(navigationItemRewards);

    if (_this.settings.lbWidget.settings.messages.enable) {
      navigationItemInbox.setAttribute('class', 'cl-main-widget-navigation-inbox');
      navigationItemInboxIcon.setAttribute('class', 'cl-main-widget-navigation-inbox-icon cl-main-navigation-item');
      navigationItemInbox.appendChild(navigationItemInboxIcon);
      navigationItems.appendChild(navigationItemInbox);
    }

    navigationContainer.appendChild(navigationItems);
    mainSectionContainer.appendChild(sectionLB);
    mainSectionContainer.appendChild(sectionACH);
    mainSectionContainer.appendChild(sectionRewards);
    mainSectionContainer.appendChild(sectionInbox);
    mainSectionContainer.appendChild(preLoaderContainer);
    innerWrapper.appendChild(navigationContainer);
    innerWrapper.appendChild(mainSectionContainer);
    wrapper.appendChild(innerWrapper);
    return wrapper;
  };

  this.leaderboardAreaLayout = function () {
    var _this = this;

    var sectionLB = document.createElement('div');
    var sectionLBHeader = document.createElement('div');
    var sectionLBHeaderList = document.createElement('div');
    var sectionLBHeaderListIcon = document.createElement('div');
    var sectionLBHeaderLabel = document.createElement('div');
    var sectionLBHeaderDate = document.createElement('div');
    var sectionLBHeaderClose = document.createElement('div');
    var sectionLBDetails = document.createElement('div');
    var sectionLBDetailsInfo = document.createElement('div');
    var sectionLBDetailsInfoIcon = document.createElement('div');
    var sectionLBDetailsContentContainer = document.createElement('div');
    var sectionLBDetailsContentContainerLabel = document.createElement('div');
    var sectionLBDetailsContentContainerDate = document.createElement('div');
    var sectionLBLeaderboard = document.createElement('div');
    var sectionLBLeaderboardHeader = document.createElement('div');
    var sectionLBLeaderboardHeaderLabels = document.createElement('div');
    var sectionLBLeaderboardHeaderTopResults = document.createElement('div');
    var sectionLBLeaderboardBody = document.createElement('div');
    var sectionLBLeaderboardBodyResults = document.createElement('div');
    var sectionLBMissingMember = document.createElement('div');
    var sectionLBOptInContainer = document.createElement('div');
    var sectionLBOptInAction = document.createElement('a');
    var sectionLBFooter = document.createElement('div');
    var sectionLBFooterContent = document.createElement('div');
    var sectionTournamentDetailsContainer = document.createElement('div');
    var sectionTournamentDetailsHeader = document.createElement('div');
    var sectionTournamentDetailsHeaderLabel = document.createElement('div');
    var sectionTournamentDetailsHeaderDate = document.createElement('div');
    var sectionTournamentDetailsBackBtn = document.createElement('a');
    var sectionTournamentDetailsBodyContainer = document.createElement('div');
    var sectionTournamentDetailsBodyImageContainer = document.createElement('div');
    var sectionTournamentDetailsBody = document.createElement('div');
    var sectionTournamentDetailsOptInContainer = document.createElement('div');
    var sectionTournamentDetailsOptInAction = document.createElement('a');
    var sectionTournamentList = document.createElement('div');
    var sectionTournamentListBody = document.createElement('div');
    var sectionTournamentListBodyResults = document.createElement('div');
    var sectionTournamentBackAction = document.createElement('a');
    sectionLB.setAttribute('class', 'cl-main-widget-lb cl-main-section-item cl-main-active-section');
    sectionLBHeader.setAttribute('class', 'cl-main-widget-lb-header');
    sectionLBHeaderList.setAttribute('class', 'cl-main-widget-lb-header-list');
    sectionLBHeaderListIcon.setAttribute('class', 'cl-main-widget-lb-header-list-icon');
    sectionLBHeaderLabel.setAttribute('class', 'cl-main-widget-lb-header-label');
    sectionLBHeaderDate.setAttribute('class', 'cl-main-widget-lb-header-date');
    sectionLBHeaderClose.setAttribute('class', 'cl-main-widget-lb-header-close');
    sectionLBDetails.setAttribute('class', 'cl-main-widget-lb-details');
    sectionLBDetailsInfo.setAttribute('class', 'cl-main-widget-lb-details-info');
    sectionLBDetailsInfoIcon.setAttribute('class', 'cl-main-widget-lb-details-info-icon');
    sectionLBDetailsContentContainer.setAttribute('class', 'cl-main-widget-lb-details-content');
    sectionLBDetailsContentContainerLabel.setAttribute('class', 'cl-main-widget-lb-details-content-label');
    sectionLBDetailsContentContainerDate.setAttribute('class', 'cl-main-widget-lb-details-content-date'); // Leaderboard result container

    sectionLBLeaderboard.setAttribute('class', 'cl-main-widget-lb-leaderboard');
    sectionLBLeaderboardHeader.setAttribute('class', 'cl-main-widget-lb-leaderboard-header');
    sectionLBLeaderboardHeaderLabels.setAttribute('class', 'cl-main-widget-lb-leaderboard-header-labels');
    sectionLBLeaderboardHeaderTopResults.setAttribute('class', 'cl-main-widget-lb-leaderboard-header-top-res');
    sectionLBLeaderboardBody.setAttribute('class', 'cl-main-widget-lb-leaderboard-body');
    sectionLBLeaderboardBodyResults.setAttribute('class', 'cl-main-widget-lb-leaderboard-body-res');
    sectionLBMissingMember.setAttribute('class', 'cl-main-widget-lb-missing-member'); // footer

    sectionLBFooter.setAttribute('class', 'cl-main-widget-lb-footer');
    sectionLBFooterContent.setAttribute('class', 'cl-main-widget-lb-footer-content'); // details section

    sectionTournamentDetailsContainer.setAttribute('class', 'cl-main-widget-lb-details-container');
    sectionTournamentDetailsHeader.setAttribute('class', 'cl-main-widget-lb-details-header');
    sectionTournamentDetailsHeaderLabel.setAttribute('class', 'cl-main-widget-lb-details-header-label');
    sectionTournamentDetailsHeaderDate.setAttribute('class', 'cl-main-widget-lb-details-header-date');
    sectionTournamentDetailsBackBtn.setAttribute('class', 'cl-main-widget-lb-details-back-btn');
    sectionTournamentDetailsBodyContainer.setAttribute('class', 'cl-main-widget-lb-details-body-container');
    sectionTournamentDetailsBodyImageContainer.setAttribute('class', 'cl-main-widget-lb-details-body-image-cont');
    sectionTournamentDetailsBody.setAttribute('class', 'cl-main-widget-lb-details-body');
    sectionTournamentDetailsOptInContainer.setAttribute('class', 'cl-main-widget-lb-details-optin-container');
    sectionTournamentDetailsOptInAction.setAttribute('class', 'cl-main-widget-lb-details-optin-action');
    sectionTournamentList.setAttribute('class', 'cl-main-widget-tournaments-list');
    sectionTournamentBackAction.setAttribute('class', 'cl-main-widget-tournaments-back-btn');
    sectionTournamentListBody.setAttribute('class', 'cl-main-widget-tournaments-list-body');
    sectionTournamentListBodyResults.setAttribute('class', 'cl-main-widget-tournaments-list-body-res');
    sectionLBOptInContainer.setAttribute('class', 'cl-main-widget-lb-optin-container');
    sectionLBOptInAction.setAttribute('class', 'cl-main-widget-lb-optin-action');
    sectionLBHeaderLabel.innerHTML = _this.settings.lbWidget.settings.translation.tournaments.label;
    sectionLBFooterContent.innerHTML = _this.settings.lbWidget.settings.translation.global.copy;
    sectionTournamentDetailsOptInAction.innerHTML = _this.settings.lbWidget.settings.translation.tournaments.enter;
    sectionTournamentDetailsOptInAction.href = 'javascript:void(0);';
    sectionLBOptInAction.innerHTML = _this.settings.lbWidget.settings.translation.tournaments.enter;
    sectionLBOptInAction.href = 'javascript:void(0);';
    sectionLBHeaderList.appendChild(sectionLBHeaderListIcon);
    sectionLBHeader.appendChild(sectionLBHeaderList);
    sectionLBHeader.appendChild(sectionLBHeaderLabel);
    sectionLBHeader.appendChild(sectionLBHeaderDate);
    sectionLBHeader.appendChild(sectionLBHeaderClose);
    sectionLBDetailsInfo.appendChild(sectionLBDetailsInfoIcon);
    sectionLBDetailsContentContainer.appendChild(sectionLBDetailsContentContainerLabel);
    sectionLBDetailsContentContainer.appendChild(sectionLBDetailsContentContainerDate);
    sectionLBDetails.appendChild(sectionLBDetailsInfo);
    sectionLBDetails.appendChild(sectionLBDetailsContentContainer);
    sectionLBLeaderboardHeader.appendChild(sectionLBLeaderboardHeaderLabels);
    sectionLBLeaderboard.appendChild(sectionLBLeaderboardHeader);
    sectionLBLeaderboard.appendChild(sectionLBLeaderboardHeaderTopResults);
    sectionLBLeaderboardBody.appendChild(sectionLBLeaderboardBodyResults);
    sectionLBLeaderboard.appendChild(sectionLBLeaderboardBody);
    sectionLBFooter.appendChild(sectionLBFooterContent);
    sectionTournamentListBody.appendChild(sectionTournamentListBodyResults);
    sectionTournamentList.appendChild(sectionTournamentListBody);
    sectionTournamentList.appendChild(sectionTournamentBackAction);
    sectionTournamentDetailsHeader.appendChild(sectionTournamentDetailsHeaderLabel);
    sectionTournamentDetailsHeader.appendChild(sectionTournamentDetailsHeaderDate);
    sectionTournamentDetailsContainer.appendChild(sectionTournamentDetailsHeader);
    sectionTournamentDetailsContainer.appendChild(sectionTournamentDetailsBackBtn);
    sectionTournamentDetailsBodyContainer.appendChild(sectionTournamentDetailsBodyImageContainer);
    sectionTournamentDetailsBodyContainer.appendChild(sectionTournamentDetailsBody);
    sectionTournamentDetailsContainer.appendChild(sectionTournamentDetailsBodyContainer);
    sectionTournamentDetailsOptInContainer.appendChild(sectionTournamentDetailsOptInAction);
    sectionTournamentDetailsContainer.appendChild(sectionTournamentDetailsOptInContainer);
    sectionLBOptInContainer.appendChild(sectionLBOptInAction);
    sectionLB.appendChild(sectionLBHeader);
    sectionLB.appendChild(sectionLBDetails);
    sectionLB.appendChild(sectionLBLeaderboard);
    sectionLB.appendChild(sectionLBMissingMember);
    sectionLB.appendChild(sectionLBOptInContainer);
    sectionLB.appendChild(sectionLBFooter);
    sectionLB.appendChild(sectionTournamentDetailsContainer);
    sectionLB.appendChild(sectionTournamentList);
    return sectionLB;
  };

  this.achievementsAreaLayout = function () {
    var _this = this;

    var sectionACH = document.createElement('div');
    var sectionACHHeader = document.createElement('div');
    var sectionACHHeaderLabel = document.createElement('div');
    var sectionACHHeaderDate = document.createElement('div');
    var sectionACHHeaderClose = document.createElement('div');
    var sectionACHDetails = document.createElement('div');
    var sectionACHDetailsInfo = document.createElement('div');
    var sectionACHDetailsInfoIcon = document.createElement('div');
    var sectionACHDetailsContentContainer = document.createElement('div');
    var sectionACHDetailsContentContainerLabel = document.createElement('div');
    var sectionACHDetailsContentContainerDate = document.createElement('div');
    var sectionACHList = document.createElement('div');
    var sectionACHListBody = document.createElement('div');
    var sectionACHListBodyResults = document.createElement('div');
    var sectionACHFooter = document.createElement('div');
    var sectionACHFooterContent = document.createElement('div');
    var sectionAchievementDetailsContainer = document.createElement('div');
    var sectionAchievementDetailsHeader = document.createElement('div');
    var sectionAchievementDetailsHeaderLabel = document.createElement('div');
    var sectionAchievementDetailsHeaderDate = document.createElement('div');
    var sectionAchievementDetailsBackBtn = document.createElement('a');
    var sectionAchievementDetailsBodyContainer = document.createElement('div');
    var sectionAchievementDetailsBodyImageContainer = document.createElement('div');
    var sectionAchievementDetailsBody = document.createElement('div');
    sectionACH.setAttribute('class', 'cl-main-widget-section-ach cl-main-section-item');
    sectionACHHeader.setAttribute('class', 'cl-main-widget-ach-header');
    sectionACHHeaderLabel.setAttribute('class', 'cl-main-widget-ach-header-label');
    sectionACHHeaderDate.setAttribute('class', 'cl-main-widget-ach-header-date');
    sectionACHHeaderClose.setAttribute('class', 'cl-main-widget-ach-header-close');
    sectionACHDetails.setAttribute('class', 'cl-main-widget-ach-details');
    sectionACHDetailsInfo.setAttribute('class', 'cl-main-widget-ach-details-info');
    sectionACHDetailsInfoIcon.setAttribute('class', 'cl-main-widget-ach-details-info-icon');
    sectionACHDetailsContentContainer.setAttribute('class', 'cl-main-widget-ach-details-content');
    sectionACHDetailsContentContainerLabel.setAttribute('class', 'cl-main-widget-ach-details-content-label');
    sectionACHDetailsContentContainerDate.setAttribute('class', 'cl-main-widget-ach-details-content-date'); // Leaderboard result container

    sectionACHList.setAttribute('class', 'cl-main-widget-ach-list');
    sectionACHListBody.setAttribute('class', 'cl-main-widget-ach-list-body');
    sectionACHListBodyResults.setAttribute('class', 'cl-main-widget-ach-list-body-res'); // footer

    sectionACHFooter.setAttribute('class', 'cl-main-widget-ach-footer');
    sectionACHFooterContent.setAttribute('class', 'cl-main-widget-ach-footer-content'); // details section

    sectionAchievementDetailsContainer.setAttribute('class', 'cl-main-widget-ach-details-container');
    sectionAchievementDetailsHeader.setAttribute('class', 'cl-main-widget-ach-details-header');
    sectionAchievementDetailsHeaderLabel.setAttribute('class', 'cl-main-widget-ach-details-header-label');
    sectionAchievementDetailsHeaderDate.setAttribute('class', 'cl-main-widget-ach-details-header-date');
    sectionAchievementDetailsBackBtn.setAttribute('class', 'cl-main-widget-ach-details-back-btn');
    sectionAchievementDetailsBodyContainer.setAttribute('class', 'cl-main-widget-ach-details-body-container');
    sectionAchievementDetailsBodyImageContainer.setAttribute('class', 'cl-main-widget-ach-details-body-image-cont');
    sectionAchievementDetailsBody.setAttribute('class', 'cl-main-widget-ach-details-body');
    sectionACHHeaderLabel.innerHTML = _this.settings.lbWidget.settings.translation.achievements.label;
    sectionACHFooterContent.innerHTML = _this.settings.lbWidget.settings.translation.global.copy;
    sectionAchievementDetailsHeader.appendChild(sectionAchievementDetailsHeaderLabel);
    sectionAchievementDetailsHeader.appendChild(sectionAchievementDetailsHeaderDate);
    sectionAchievementDetailsContainer.appendChild(sectionAchievementDetailsHeader);
    sectionAchievementDetailsContainer.appendChild(sectionAchievementDetailsBackBtn);
    sectionAchievementDetailsBodyContainer.appendChild(sectionAchievementDetailsBodyImageContainer);
    sectionAchievementDetailsBodyContainer.appendChild(sectionAchievementDetailsBody);
    sectionAchievementDetailsContainer.appendChild(sectionAchievementDetailsBodyContainer);
    sectionACHHeader.appendChild(sectionACHHeaderLabel);
    sectionACHHeader.appendChild(sectionACHHeaderDate);
    sectionACHHeader.appendChild(sectionACHHeaderClose);
    sectionACHDetailsInfo.appendChild(sectionACHDetailsInfoIcon);
    sectionACHDetailsContentContainer.appendChild(sectionACHDetailsContentContainerLabel);
    sectionACHDetailsContentContainer.appendChild(sectionACHDetailsContentContainerDate);
    sectionACHDetails.appendChild(sectionACHDetailsInfo);
    sectionACHDetails.appendChild(sectionACHDetailsContentContainer);
    sectionACHListBody.appendChild(sectionACHListBodyResults);
    sectionACHList.appendChild(sectionACHListBody);
    sectionACHFooter.appendChild(sectionACHFooterContent);
    sectionACH.appendChild(sectionACHHeader);
    sectionACH.appendChild(sectionACHDetails);
    sectionACH.appendChild(sectionACHList);
    sectionACH.appendChild(sectionACHFooter);
    sectionACH.appendChild(sectionAchievementDetailsContainer);
    return sectionACH;
  };

  this.rewardsAreaLayout = function () {
    var _this = this;

    var sectionRewards = document.createElement('div');
    var sectionRewardsHeader = document.createElement('div');
    var sectionRewardsHeaderLabel = document.createElement('div');
    var sectionRewardsHeaderDate = document.createElement('div');
    var sectionRewardsHeaderClose = document.createElement('div');
    var sectionRewardsDetails = document.createElement('div');
    var sectionRewardsDetailsInfo = document.createElement('div');
    var sectionRewardsDetailsInfoIcon = document.createElement('div');
    var sectionRewardsDetailsContentContainer = document.createElement('div');
    var sectionRewardsDetailsContentContainerLabel = document.createElement('div');
    var sectionRewardsDetailsContentContainerDate = document.createElement('div');
    var sectionRewardsList = document.createElement('div');
    var sectionRewardsListBody = document.createElement('div');
    var sectionRewardsListBodyResults = document.createElement('div');
    var sectionRewardsFooter = document.createElement('div');
    var sectionRewardsFooterContent = document.createElement('div');
    var sectionRewardsDetailsContainer = document.createElement('div');
    var sectionRewardsDetailsHeader = document.createElement('div');
    var sectionRewardsDetailsHeaderLabel = document.createElement('div');
    var sectionRewardsDetailsHeaderDate = document.createElement('div');
    var sectionRewardsDetailsBackBtn = document.createElement('a');
    var sectionRewardsDetailsBodyContainer = document.createElement('div');
    var sectionRewardsDetailsBodyImageContainer = document.createElement('div');
    var sectionRewardsDetailsBody = document.createElement('div');
    var sectionRewardsWinningsContainer = document.createElement('div');
    var sectionRewardsWinningsIcon = document.createElement('div');
    var sectionRewardsWinningsValue = document.createElement('div');
    var sectionRewardsClaimContainer = document.createElement('div');
    var sectionRewardsClaimBtn = document.createElement('a');
    sectionRewards.setAttribute('class', 'cl-main-widget-section-reward cl-main-section-item');
    sectionRewardsHeader.setAttribute('class', 'cl-main-widget-reward-header');
    sectionRewardsHeaderLabel.setAttribute('class', 'cl-main-widget-reward-header-label');
    sectionRewardsHeaderDate.setAttribute('class', 'cl-main-widget-reward-header-date');
    sectionRewardsHeaderClose.setAttribute('class', 'cl-main-widget-reward-header-close');
    sectionRewardsDetails.setAttribute('class', 'cl-main-widget-reward-details');
    sectionRewardsDetailsInfo.setAttribute('class', 'cl-main-widget-reward-details-info');
    sectionRewardsDetailsInfoIcon.setAttribute('class', 'cl-main-widget-reward-details-info-icon');
    sectionRewardsDetailsContentContainer.setAttribute('class', 'cl-main-widget-reward-details-content');
    sectionRewardsDetailsContentContainerLabel.setAttribute('class', 'cl-main-widget-reward-details-content-label');
    sectionRewardsDetailsContentContainerDate.setAttribute('class', 'cl-main-widget-reward-details-content-date'); // Leaderboard result container

    sectionRewardsList.setAttribute('class', 'cl-main-widget-reward-list');
    sectionRewardsListBody.setAttribute('class', 'cl-main-widget-reward-list-body');
    sectionRewardsListBodyResults.setAttribute('class', 'cl-main-widget-reward-list-body-res'); // footer

    sectionRewardsFooter.setAttribute('class', 'cl-main-widget-reward-footer');
    sectionRewardsFooterContent.setAttribute('class', 'cl-main-widget-reward-footer-content'); // details section

    sectionRewardsDetailsContainer.setAttribute('class', 'cl-main-widget-reward-details-container');
    sectionRewardsDetailsHeader.setAttribute('class', 'cl-main-widget-reward-details-header');
    sectionRewardsDetailsHeaderLabel.setAttribute('class', 'cl-main-widget-reward-details-header-label');
    sectionRewardsDetailsHeaderDate.setAttribute('class', 'cl-main-widget-reward-details-header-date');
    sectionRewardsDetailsBackBtn.setAttribute('class', 'cl-main-widget-reward-details-back-btn');
    sectionRewardsDetailsBodyContainer.setAttribute('class', 'cl-main-widget-reward-details-body-container');
    sectionRewardsDetailsBodyImageContainer.setAttribute('class', 'cl-main-widget-reward-details-body-image-cont');
    sectionRewardsDetailsBody.setAttribute('class', 'cl-main-widget-reward-details-body');
    sectionRewardsWinningsContainer.setAttribute('class', 'cl-main-widget-reward-winnings-container');
    sectionRewardsWinningsIcon.setAttribute('class', 'cl-main-widget-reward-winnings-icon');
    sectionRewardsWinningsValue.setAttribute('class', 'cl-main-widget-reward-winnings-value');
    sectionRewardsClaimContainer.setAttribute('class', 'cl-main-widget-reward-claim-container');
    sectionRewardsClaimBtn.setAttribute('class', 'cl-main-widget-reward-claim-btn');
    sectionRewardsHeaderLabel.innerHTML = _this.settings.lbWidget.settings.translation.rewards.label;
    sectionRewardsFooterContent.innerHTML = _this.settings.lbWidget.settings.translation.global.copy;
    sectionRewardsClaimBtn.innerHTML = _this.settings.lbWidget.settings.translation.rewards.claim;
    sectionRewardsWinningsContainer.appendChild(sectionRewardsWinningsIcon);
    sectionRewardsWinningsContainer.appendChild(sectionRewardsWinningsValue);
    sectionRewardsClaimContainer.appendChild(sectionRewardsClaimBtn);
    sectionRewardsDetailsHeader.appendChild(sectionRewardsDetailsHeaderLabel);
    sectionRewardsDetailsHeader.appendChild(sectionRewardsDetailsHeaderDate);
    sectionRewardsDetailsContainer.appendChild(sectionRewardsDetailsHeader);
    sectionRewardsDetailsContainer.appendChild(sectionRewardsDetailsBackBtn);
    sectionRewardsDetailsBodyContainer.appendChild(sectionRewardsDetailsBodyImageContainer);
    sectionRewardsDetailsBodyContainer.appendChild(sectionRewardsDetailsBody);
    sectionRewardsDetailsBodyContainer.appendChild(sectionRewardsWinningsContainer);
    sectionRewardsDetailsContainer.appendChild(sectionRewardsDetailsBodyContainer);
    sectionRewardsDetailsContainer.appendChild(sectionRewardsClaimContainer);
    sectionRewardsHeader.appendChild(sectionRewardsHeaderLabel);
    sectionRewardsHeader.appendChild(sectionRewardsHeaderDate);
    sectionRewardsHeader.appendChild(sectionRewardsHeaderClose);
    sectionRewardsDetailsInfo.appendChild(sectionRewardsDetailsInfoIcon);
    sectionRewardsDetailsContentContainer.appendChild(sectionRewardsDetailsContentContainerLabel);
    sectionRewardsDetailsContentContainer.appendChild(sectionRewardsDetailsContentContainerDate);
    sectionRewardsDetails.appendChild(sectionRewardsDetailsInfo);
    sectionRewardsDetails.appendChild(sectionRewardsDetailsContentContainer);
    sectionRewardsListBody.appendChild(sectionRewardsListBodyResults);
    sectionRewardsList.appendChild(sectionRewardsListBody);
    sectionRewardsFooter.appendChild(sectionRewardsFooterContent);
    sectionRewards.appendChild(sectionRewardsHeader);
    sectionRewards.appendChild(sectionRewardsDetails);
    sectionRewards.appendChild(sectionRewardsList);
    sectionRewards.appendChild(sectionRewardsFooter);
    sectionRewards.appendChild(sectionRewardsDetailsContainer);
    return sectionRewards;
  };

  this.inboxAreaLayout = function () {
    var _this = this;

    var sectionInbox = document.createElement('div');
    var sectionInboxHeader = document.createElement('div');
    var sectionInboxHeaderLabel = document.createElement('div');
    var sectionInboxHeaderDate = document.createElement('div');
    var sectionInboxHeaderClose = document.createElement('div');
    var sectionInboxDetails = document.createElement('div');
    var sectionInboxDetailsInfo = document.createElement('div');
    var sectionInboxDetailsInfoIcon = document.createElement('div');
    var sectionInboxDetailsContentContainer = document.createElement('div');
    var sectionInboxDetailsContentContainerLabel = document.createElement('div');
    var sectionInboxDetailsContentContainerDate = document.createElement('div');
    var sectionInboxList = document.createElement('div');
    var sectionInboxListBody = document.createElement('div');
    var sectionInboxListBodyResults = document.createElement('div');
    var sectionInboxFooter = document.createElement('div');
    var sectionInboxFooterContent = document.createElement('div');
    var sectionInboxDetailsContainer = document.createElement('div');
    var sectionInboxDetailsHeader = document.createElement('div');
    var sectionInboxDetailsHeaderLabel = document.createElement('div');
    var sectionInboxDetailsHeaderDate = document.createElement('div');
    var sectionInboxDetailsBackBtn = document.createElement('a');
    var sectionInboxDetailsBodyContainer = document.createElement('div');
    var sectionInboxDetailsBody = document.createElement('div');
    sectionInbox.setAttribute('class', 'cl-main-widget-section-inbox cl-main-section-item');
    sectionInboxHeader.setAttribute('class', 'cl-main-widget-inbox-header');
    sectionInboxHeaderLabel.setAttribute('class', 'cl-main-widget-inbox-header-label');
    sectionInboxHeaderDate.setAttribute('class', 'cl-main-widget-inbox-header-date');
    sectionInboxHeaderClose.setAttribute('class', 'cl-main-widget-inbox-header-close');
    sectionInboxDetails.setAttribute('class', 'cl-main-widget-inbox-details');
    sectionInboxDetailsInfo.setAttribute('class', 'cl-main-widget-inbox-details-info');
    sectionInboxDetailsInfoIcon.setAttribute('class', 'cl-main-widget-inbox-details-info-icon');
    sectionInboxDetailsContentContainer.setAttribute('class', 'cl-main-widget-inbox-details-content');
    sectionInboxDetailsContentContainerLabel.setAttribute('class', 'cl-main-widget-inbox-details-content-label');
    sectionInboxDetailsContentContainerDate.setAttribute('class', 'cl-main-widget-inbox-details-content-date'); // Leaderboard result container

    sectionInboxList.setAttribute('class', 'cl-main-widget-inbox-list');
    sectionInboxListBody.setAttribute('class', 'cl-main-widget-inbox-list-body');
    sectionInboxListBodyResults.setAttribute('class', 'cl-main-widget-inbox-list-body-res'); // footer

    sectionInboxFooter.setAttribute('class', 'cl-main-widget-inbox-footer');
    sectionInboxFooterContent.setAttribute('class', 'cl-main-widget-inbox-footer-content'); // details section

    sectionInboxDetailsContainer.setAttribute('class', 'cl-main-widget-inbox-details-container');
    sectionInboxDetailsHeader.setAttribute('class', 'cl-main-widget-inbox-details-header');
    sectionInboxDetailsHeaderLabel.setAttribute('class', 'cl-main-widget-inbox-details-header-label');
    sectionInboxDetailsHeaderDate.setAttribute('class', 'cl-main-widget-inbox-details-header-date');
    sectionInboxDetailsBackBtn.setAttribute('class', 'cl-main-widget-inbox-details-back-btn');
    sectionInboxDetailsBodyContainer.setAttribute('class', 'cl-main-widget-inbox-details-body-container');
    sectionInboxDetailsBody.setAttribute('class', 'cl-main-widget-inbox-details-body');
    sectionInboxHeaderLabel.innerHTML = _this.settings.lbWidget.settings.translation.messages.label;
    sectionInboxFooterContent.innerHTML = _this.settings.lbWidget.settings.translation.global.copy;
    sectionInboxHeader.appendChild(sectionInboxHeaderLabel);
    sectionInboxHeader.appendChild(sectionInboxHeaderDate);
    sectionInboxHeader.appendChild(sectionInboxHeaderClose);
    sectionInboxDetailsInfo.appendChild(sectionInboxDetailsInfoIcon);
    sectionInboxDetailsContentContainer.appendChild(sectionInboxDetailsContentContainerLabel);
    sectionInboxDetailsContentContainer.appendChild(sectionInboxDetailsContentContainerDate);
    sectionInboxDetails.appendChild(sectionInboxDetailsInfo);
    sectionInboxDetails.appendChild(sectionInboxDetailsContentContainer);
    sectionInboxListBody.appendChild(sectionInboxListBodyResults);
    sectionInboxList.appendChild(sectionInboxListBody);
    sectionInboxDetailsHeader.appendChild(sectionInboxDetailsHeaderLabel);
    sectionInboxDetailsHeader.appendChild(sectionInboxDetailsHeaderDate);
    sectionInboxDetailsContainer.appendChild(sectionInboxDetailsHeader);
    sectionInboxDetailsContainer.appendChild(sectionInboxDetailsBackBtn);
    sectionInboxDetailsBodyContainer.appendChild(sectionInboxDetailsBody);
    sectionInboxDetailsContainer.appendChild(sectionInboxDetailsBodyContainer);
    sectionInboxFooter.appendChild(sectionInboxFooterContent);
    sectionInbox.appendChild(sectionInboxHeader);
    sectionInbox.appendChild(sectionInboxDetails);
    sectionInbox.appendChild(sectionInboxList);
    sectionInbox.appendChild(sectionInboxFooter);
    sectionInbox.appendChild(sectionInboxDetailsContainer);
    return sectionInbox;
  };

  this.leaderboardHeader = function () {
    var _this = this;

    var rankCol = document.createElement('div');
    var iconCol = document.createElement('div');
    var nameCol = document.createElement('div');
    var growthCol = document.createElement('div');
    var pointsCol = document.createElement('div');
    rankCol.setAttribute('class', 'cl-rank-col cl-col');
    iconCol.setAttribute('class', 'cl-icon-col cl-col');
    nameCol.setAttribute('class', 'cl-name-col cl-col');
    growthCol.setAttribute('class', 'cl-growth-col cl-col');
    pointsCol.setAttribute('class', 'cl-points-col cl-col');
    rankCol.innerHTML = _this.settings.lbWidget.settings.translation.leaderboard.rank;
    iconCol.innerHTML = '';
    nameCol.innerHTML = _this.settings.lbWidget.settings.translation.leaderboard.name;
    growthCol.innerHTML = '';
    pointsCol.innerHTML = _this.settings.lbWidget.settings.translation.leaderboard.points;

    _this.settings.leaderboard.header.appendChild(rankCol);

    _this.settings.leaderboard.header.appendChild(iconCol);

    _this.settings.leaderboard.header.appendChild(nameCol);

    _this.settings.leaderboard.header.appendChild(growthCol);

    _this.settings.leaderboard.header.appendChild(pointsCol);

    var rewardCol = document.createElement('div');
    var rewardEnabled = typeof _this.settings.lbWidget.settings.competition.activeContest !== 'undefined' && _this.settings.lbWidget.settings.competition.activeContest !== null && typeof _this.settings.lbWidget.settings.competition.activeContest.rewards !== 'undefined' && _this.settings.lbWidget.settings.competition.activeContest.rewards.length > 0;
    rewardCol.setAttribute('class', 'cl-reward-col cl-col' + (rewardEnabled ? ' cl-col-reward-enabled' : ''));
    rewardCol.innerHTML = _this.settings.lbWidget.settings.translation.leaderboard.prize;
    Object(_utils_addClass__WEBPACK_IMPORTED_MODULE_6__["default"])(_this.settings.leaderboard.header, 'cl-reward-enabled');

    _this.settings.leaderboard.header.appendChild(rewardCol);
  };

  this.leaderboardRow = function (rank, icon, name, change, growth, points, reward, count, memberFound) {
    var _this = this;

    var cellWrapper = document.createElement('div');
    var rankCel = document.createElement('div');
    var rankCelValue = document.createElement('div');
    var iconCel = document.createElement('div');
    var iconCelImg = new Image();
    var nameCel = document.createElement('div');
    var growthCel = document.createElement('div');
    var pointsCel = document.createElement('div');
    var memberFoundClass = memberFound ? ' cl-lb-member-row' : '';
    cellWrapper.setAttribute('class', 'cl-lb-row cl-lb-rank-' + rank + ' cl-lb-count-' + count + memberFoundClass);
    rankCel.setAttribute('class', 'cl-rank-col cl-col cl-rank-' + rank);
    rankCelValue.setAttribute('class', 'cl-rank-col-value');
    iconCel.setAttribute('class', 'cl-icon-col cl-col');
    iconCelImg.setAttribute('class', 'cl-icon-col-img');
    nameCel.setAttribute('class', 'cl-name-col cl-col');
    growthCel.setAttribute('class', 'cl-growth-col cl-col');
    pointsCel.setAttribute('class', 'cl-points-col cl-col');
    cellWrapper.dataset.rank = rank;
    rankCelValue.innerHTML = rank;
    nameCel.innerHTML = name;
    growthCel.dataset.growth = change < 0 ? 'down' : change > 0 ? 'up' : 'same';
    growthCel.dataset.change = change;
    growthCel.innerHTML = growth;
    pointsCel.innerHTML = points;

    if (icon.length > 0) {
      iconCelImg.src = icon;
      iconCelImg.alt = name;
    } else {
      iconCelImg.style.display = 'none';
    }

    rankCel.appendChild(rankCelValue);
    cellWrapper.appendChild(rankCel);
    iconCel.appendChild(iconCelImg);
    cellWrapper.appendChild(iconCel);
    cellWrapper.appendChild(nameCel);
    cellWrapper.appendChild(growthCel);
    cellWrapper.appendChild(pointsCel);
    var rewardCel = document.createElement('div');
    var rewardEnabled = typeof _this.settings.lbWidget.settings.competition.activeContest !== 'undefined' && _this.settings.lbWidget.settings.competition.activeContest !== null && typeof _this.settings.lbWidget.settings.competition.activeContest.rewards !== 'undefined' && _this.settings.lbWidget.settings.competition.activeContest.rewards.length > 0;
    rewardCel.setAttribute('class', 'cl-reward-col cl-col' + (rewardEnabled ? ' cl-col-reward-enabled' : ''));
    rewardCel.innerHTML = typeof reward !== 'undefined' && reward !== null ? reward : '';
    Object(_utils_addClass__WEBPACK_IMPORTED_MODULE_6__["default"])(cellWrapper, 'cl-reward-enabled');
    cellWrapper.appendChild(rewardCel);
    return cellWrapper;
  };

  this.leaderboardRowUpdate = function (rank, icon, name, change, growth, points, reward, count, memberFound, onMissing) {
    var _this = this;

    var cellRow = Object(_utils_query__WEBPACK_IMPORTED_MODULE_4__["default"])(_this.settings.leaderboard.container, '.cl-lb-rank-' + rank + '.cl-lb-count-' + count);

    if (cellRow === null) {
      onMissing(rank, icon, name, change, growth, points, reward, count, memberFound);
    } else {
      var rankCel = Object(_utils_query__WEBPACK_IMPORTED_MODULE_4__["default"])(cellRow, '.cl-rank-col-value');
      var iconCel = Object(_utils_query__WEBPACK_IMPORTED_MODULE_4__["default"])(cellRow, '.cl-icon-col-img');
      var nameCel = Object(_utils_query__WEBPACK_IMPORTED_MODULE_4__["default"])(cellRow, '.cl-name-col');
      var growthCel = Object(_utils_query__WEBPACK_IMPORTED_MODULE_4__["default"])(cellRow, '.cl-growth-col');
      var pointsCel = Object(_utils_query__WEBPACK_IMPORTED_MODULE_4__["default"])(cellRow, '.cl-points-col');
      var memberFoundClass = 'cl-lb-member-row';
      var rowHasClass = Object(_utils_hasClass__WEBPACK_IMPORTED_MODULE_1__["default"])(cellRow, memberFoundClass);

      if (count > 0 && !Object(_utils_hasClass__WEBPACK_IMPORTED_MODULE_1__["default"])(cellRow, 'cl-shared-rank')) {
        Object(_utils_addClass__WEBPACK_IMPORTED_MODULE_6__["default"])(cellRow, 'cl-shared-rank');
      }

      if (memberFound && !rowHasClass) {
        Object(_utils_addClass__WEBPACK_IMPORTED_MODULE_6__["default"])(cellRow, memberFoundClass);
      } else if (!memberFound && rowHasClass) {
        Object(_utils_removeClass__WEBPACK_IMPORTED_MODULE_2__["default"])(cellRow, memberFoundClass);
      }

      cellRow.dataset.rank = rank;
      rankCel.innerHTML = rank;
      nameCel.innerHTML = name;
      growthCel.dataset.growth = change < 0 ? 'down' : change > 0 ? 'up' : 'same';
      growthCel.dataset.change = change;
      growthCel.innerHTML = growth;
      pointsCel.innerHTML = points;

      if (icon.length > 0) {
        iconCel.src = icon;
        iconCel.alt = name;
        iconCel.style.display = 'block';
      } else {
        iconCel.style.display = 'none';
      }

      if (typeof _this.settings.lbWidget.settings.competition.activeContest !== 'undefined' && _this.settings.lbWidget.settings.competition.activeContest !== null && typeof _this.settings.lbWidget.settings.competition.activeContest.rewards !== 'undefined' && _this.settings.lbWidget.settings.competition.activeContest.rewards.length > 0) {
        var rewardCel = Object(_utils_query__WEBPACK_IMPORTED_MODULE_4__["default"])(cellRow, '.cl-reward-col');

        if (rewardCel !== null) {
          rewardCel.innerHTML = typeof reward !== 'undefined' && reward !== null ? reward : '';
        }
      }
    }
  };

  this.populateLeaderboardResultsWithDefaultEntries = function () {
    var _this = this;

    var topResults = [];
    var remainingResults = [];

    for (var i = 0; i < _this.settings.leaderboard.topResultSize; i++) {
      var rank = i + 1;
      topResults.push({
        name: '--',
        rank: rank,
        points: '--',
        memberId: '',
        memberRefId: ''
      });
    }

    for (var s = _this.settings.leaderboard.topResultSize; s < _this.settings.leaderboard.defaultEmptyList; s++) {
      var _rank = s + 1;

      remainingResults.push({
        name: '--',
        rank: _rank,
        points: '--',
        memberId: '',
        memberRefId: ''
      });
    }

    _this.updateLeaderboardTopResults(topResults);

    _this.updateLeaderboardResults(remainingResults);
  };

  this.updateLeaderboardTopResults = function (topResults) {
    var _this = this;

    var rankCheck = [];
    var cleanupRankCheck = []; // cleanup

    window.mapObject(topResults, function (lb) {
      cleanupRankCheck.push(lb.rank);
      Object(_utils_objectIterator__WEBPACK_IMPORTED_MODULE_3__["default"])(Object(_utils_query__WEBPACK_IMPORTED_MODULE_4__["default"])(_this.settings.leaderboard.topResults, '.cl-lb-rank-' + lb.rank + '.cl-shared-rank'), function (obj) {
        Object(_utils_remove__WEBPACK_IMPORTED_MODULE_7__["default"])(obj);
      });
    });
    Object(_utils_objectIterator__WEBPACK_IMPORTED_MODULE_3__["default"])(Object(_utils_query__WEBPACK_IMPORTED_MODULE_4__["default"])(_this.settings.leaderboard.topResults, '.cl-lb-row'), function (obj) {
      var rank = parseInt(obj.dataset.rank);

      if (cleanupRankCheck.indexOf(rank) === -1 && rank > _this.settings.leaderboard.defaultEmptyList) {
        Object(_utils_remove__WEBPACK_IMPORTED_MODULE_7__["default"])(obj);
      }
    });
    window.mapObject(topResults, function (lb) {
      var count = 0;

      var icon = _this.settings.lbWidget.populateIdenticonBase64Image(lb.memberId);

      var memberFound = _this.settings.lbWidget.settings.memberId === lb.memberId || _this.settings.lbWidget.settings.memberId === lb.memberRefId;
      var memberName = memberFound ? _this.settings.lbWidget.settings.translation.leaderboard.you : lb.name;

      var reward = _this.getReward(lb.rank);

      var change = typeof lb.change === 'undefined' ? 0 : lb.change;
      var growthType = change < 0 ? 'down' : change > 0 ? 'up' : 'same';
      var growthIcon = "<span class='cl-growth-icon cl-growth-" + growthType + "'></span>";

      if (rankCheck.indexOf(lb.rank) !== -1) {
        for (var rc = 0; rc < rankCheck.length; rc++) {
          if (lb.rank === rankCheck[rc]) {
            count++;
          }
        }
      }

      _this.leaderboardRowUpdate(lb.rank, icon, // icon
      memberName, change, growthIcon, // growth
      lb.points, reward, // reward
      count, memberFound, function (rank, icon, name, change, growth, points, reward, count, memberFound) {
        var newRow = _this.leaderboardRow(rank, icon, name, change, growth, points, reward, count, memberFound);

        var prevCellRow = Object(_utils_query__WEBPACK_IMPORTED_MODULE_4__["default"])(_this.settings.leaderboard.container, '.cl-lb-rank-' + rank + '.cl-lb-count-' + (count - 1));

        if (prevCellRow !== null && typeof prevCellRow.length === 'undefined') {
          Object(_utils_appendNext__WEBPACK_IMPORTED_MODULE_8__["default"])(prevCellRow, newRow);
        } else {
          _this.settings.leaderboard.topResults.appendChild(newRow);
        }
      });

      rankCheck.push(lb.rank);
    });
  };

  this.getReward = function (rank) {
    var _this = this;

    var rewardResponse = [];

    if (typeof _this.settings.lbWidget.settings.competition.activeContest !== 'undefined' && _this.settings.lbWidget.settings.competition.activeContest !== null) {
      window.mapObject(_this.settings.lbWidget.settings.competition.activeContest.rewards, function (reward) {
        if (reward.rewardRank instanceof Array && reward.rewardRank.indexOf(rank) !== -1) {
          rewardResponse.push(_this.settings.lbWidget.settings.rewards.rewardFormatter(reward));
        }
      });
    }

    return rewardResponse.join(', ');
  };

  this.updateLeaderboardResults = function (remainingResults) {
    var _this = this;

    var rankCheck = [];
    var cleanupRankCheck = []; // cleanup

    window.mapObject(remainingResults, function (lb) {
      cleanupRankCheck.push(lb.rank);
      Object(_utils_objectIterator__WEBPACK_IMPORTED_MODULE_3__["default"])(Object(_utils_query__WEBPACK_IMPORTED_MODULE_4__["default"])(_this.settings.leaderboard.list, '.cl-lb-rank-' + lb.rank + '.cl-shared-rank'), function (obj) {
        Object(_utils_remove__WEBPACK_IMPORTED_MODULE_7__["default"])(obj);
      });
    });
    Object(_utils_objectIterator__WEBPACK_IMPORTED_MODULE_3__["default"])(Object(_utils_query__WEBPACK_IMPORTED_MODULE_4__["default"])(_this.settings.leaderboard.container, '.cl-lb-row'), function (obj) {
      try {
        var rank = parseInt(obj.dataset.rank);

        if (cleanupRankCheck.indexOf(rank) === -1 && rank > _this.settings.leaderboard.defaultEmptyList) {
          Object(_utils_remove__WEBPACK_IMPORTED_MODULE_7__["default"])(obj);
        }
      } catch (e) {
        console.log(obj.dataset, obj.attributes, obj);
        console.error(e);
      }
    });
    window.mapObject(remainingResults, function (lb) {
      var count = 0;

      var icon = _this.settings.lbWidget.populateIdenticonBase64Image(lb.memberId);

      var memberFound = _this.settings.lbWidget.settings.memberId === lb.memberId || _this.settings.lbWidget.settings.memberId === lb.memberRefId;
      var memberName = memberFound ? _this.settings.lbWidget.settings.translation.leaderboard.you : lb.name;

      var reward = _this.getReward(lb.rank);

      var change = typeof lb.change === 'undefined' ? 0 : lb.change;
      var growthType = change < 0 ? 'down' : change > 0 ? 'up' : 'same';
      var growthIcon = "<span class='cl-growth-icon cl-growth-" + growthType + "'></span>";

      if (rankCheck.indexOf(lb.rank) !== -1) {
        for (var rc = 0; rc < rankCheck.length; rc++) {
          if (lb.rank === rankCheck[rc]) {
            count++;
          }
        }
      }

      _this.leaderboardRowUpdate(lb.rank, icon, // icon
      memberName, change, growthIcon, // growth
      lb.points, reward, count, memberFound, function (rank, icon, name, change, growth, points, reward, count, memberFound) {
        var newRow = _this.leaderboardRow(rank, icon, name, name, growth, points, reward, count, memberFound);

        var prevCellRow = Object(_utils_query__WEBPACK_IMPORTED_MODULE_4__["default"])(_this.settings.leaderboard.container, '.cl-lb-rank-' + rank + '.cl-lb-count-' + (count - 1));

        if (prevCellRow !== null && typeof prevCellRow.length === 'undefined') {
          Object(_utils_appendNext__WEBPACK_IMPORTED_MODULE_8__["default"])(prevCellRow, newRow);
        } else {
          _this.settings.leaderboard.list.appendChild(newRow);
        }
      });

      rankCheck.push(lb.rank);
    });
  };

  this.updateLeaderboard = function () {
    var _this = this;

    var topResults = [];
    var remainingResults = [];

    _this.populateLeaderboardResultsWithDefaultEntries();

    window.mapObject(_this.settings.lbWidget.settings.leaderboard.leaderboardData, function (lb) {
      if (lb.rank <= _this.settings.leaderboard.topResultSize) {
        topResults.push(lb);
      } else {
        remainingResults.push(lb);
      }
    });

    _this.updateLeaderboardTopResults(topResults);

    _this.updateLeaderboardResults(remainingResults);

    var member = Object(_utils_query__WEBPACK_IMPORTED_MODULE_4__["default"])(_this.settings.leaderboard.list, '.cl-lb-member-row');

    if (member !== null) {
      _this.missingMember(_this.isElementVisibleInView(member, _this.settings.leaderboard.list.parentNode));
    }
  };

  this.updateLeaderboardTime = function () {
    var _this = this;

    var diff = moment__WEBPACK_IMPORTED_MODULE_0___default()(_this.settings.lbWidget.settings.competition.activeContest.scheduledStart).diff(moment__WEBPACK_IMPORTED_MODULE_0___default()());

    var date = _this.settings.lbWidget.formatDateTime(moment__WEBPACK_IMPORTED_MODULE_0___default.a.duration(diff));

    if (_this.settings.leaderboard.timerInterval) {
      clearTimeout(_this.settings.leaderboard.timerInterval);
    }

    if (diff < 0 && _this.settings.lbWidget.settings.competition.activeContest.statusCode === 0) {
      date = '';
    } else if (_this.settings.lbWidget.settings.competition.activeContest.statusCode > 0 && _this.settings.lbWidget.settings.competition.activeContest.statusCode < 3) {
      diff = moment__WEBPACK_IMPORTED_MODULE_0___default()(_this.settings.lbWidget.settings.competition.activeContest.scheduledEnd).diff(moment__WEBPACK_IMPORTED_MODULE_0___default()());
      date = _this.settings.lbWidget.formatDateTime(moment__WEBPACK_IMPORTED_MODULE_0___default.a.duration(diff));
    } else if (_this.settings.lbWidget.settings.competition.activeContest.statusCode === 3) {
      date = _this.settings.lbWidget.settings.translation.tournaments.finishing;
    } else if (_this.settings.lbWidget.settings.competition.activeContest.statusCode >= 4) {
      date = _this.settings.lbWidget.settings.translation.tournaments.finished;
    }

    _this.settings.headerDate.innerHTML = date;
    _this.settings.detailsContainerDate.innerHTML = date;
    _this.settings.leaderboard.timerInterval = setTimeout(function () {
      _this.updateLeaderboardTime();
    }, 1000);
  };

  this.leaderboardDetailsUpdate = function () {
    var _this = this;

    var mainLabel = Object(_utils_query__WEBPACK_IMPORTED_MODULE_4__["default"])(_this.settings.section, '.cl-main-widget-lb-details-content-label');
    mainLabel.innerHTML = _this.settings.lbWidget.settings.competition.activeContest !== null ? _this.settings.lbWidget.settings.competition.activeContest.label : _this.settings.lbWidget.settings.translation.tournaments.noAvailableCompetitions;
  };

  this.leaderboardOptInCheck = function () {
    var _this = this;

    var optIn = Object(_utils_query__WEBPACK_IMPORTED_MODULE_4__["default"])(_this.settings.section, '.cl-main-widget-lb-optin-action');

    if (typeof _this.settings.lbWidget.settings.competition.activeCompetition !== 'undefined' && _this.settings.lbWidget.settings.competition.activeCompetition !== null && typeof _this.settings.lbWidget.settings.competition.activeCompetition.optinRequired === 'boolean' && _this.settings.lbWidget.settings.competition.activeCompetition.optinRequired) {
      if (typeof _this.settings.lbWidget.settings.competition.activeCompetition.optin === 'boolean' && !_this.settings.lbWidget.settings.competition.activeCompetition.optin) {
        optIn.innerHTML = _this.settings.lbWidget.settings.translation.tournaments.enter;
        optIn.parentNode.style.display = 'block';
      } else {
        optIn.parentNode.style.display = 'none';
      }
    } else {
      optIn.parentNode.style.display = 'none';
    }
  }; // cleanup/recover activity


  this.preLoaderRerun = function () {
    var _this = this;

    if (_this.settings.preLoader.preLoaderActive && _this.settings.preLoader.preloaderCallbackRecovery !== null && _this.settings.preLoader.preLoaderlastAttempt !== null && typeof _this.settings.preLoader.preLoaderlastAttempt === 'number' && _this.settings.preLoader.preLoaderlastAttempt + 8000 < new Date().getTime()) {
      _this.settings.preLoader.preloaderCallbackRecovery();
    }
  };

  this.preloader = function () {
    var _this = this;

    var preLoader = Object(_utils_query__WEBPACK_IMPORTED_MODULE_4__["default"])(_this.settings.section, '.cl-main-widget-pre-loader'); // var content = query(_this.settings.section, '.cl-main-widget-pre-loader-content');

    return {
      show: function show(callback) {
        _this.settings.preLoader.preLoaderActive = true;
        _this.settings.preLoader.preLoaderlastAttempt = new Date().getTime();
        preLoader.style.display = 'block';
        setTimeout(function () {
          preLoader.style.opacity = 1;
        }, 20);

        if (_this.settings.preLoader.preloaderCallbackRecovery === null && typeof callback === 'function') {
          _this.settings.preLoader.preloaderCallbackRecovery = callback;
        }

        callback();
      },
      hide: function hide() {
        _this.settings.preLoader.preLoaderActive = false;
        _this.settings.preLoader.preLoaderlastAttempt = null;
        preLoader.style.opacity = 0;

        if (_this.settings.preLoader.preloaderCallbackRecovery !== null) {
          _this.settings.preLoader.preloaderCallbackRecovery = null;
        }

        setTimeout(function () {
          preLoader.style.display = 'none';
        }, 200);
      }
    };
  };

  this.loadLeaderboard = function (callback) {
    var _this = this;

    if (_this.settings.container === null) {
      _this.settings.container = _this.settings.lbWidget.settings.bindContainer.appendChild(_this.layout());
      _this.settings.navigation = Object(_utils_query__WEBPACK_IMPORTED_MODULE_4__["default"])(_this.settings.container, '.cl-main-widget-navigation-container');
      _this.settings.section = Object(_utils_query__WEBPACK_IMPORTED_MODULE_4__["default"])(_this.settings.container, '.cl-main-widget-section-container');
      _this.settings.leaderboard.container = Object(_utils_query__WEBPACK_IMPORTED_MODULE_4__["default"])(_this.settings.section, '.cl-main-widget-lb-leaderboard');
      _this.settings.leaderboard.header = Object(_utils_query__WEBPACK_IMPORTED_MODULE_4__["default"])(_this.settings.leaderboard.container, '.cl-main-widget-lb-leaderboard-header-labels');
      _this.settings.leaderboard.list = Object(_utils_query__WEBPACK_IMPORTED_MODULE_4__["default"])(_this.settings.leaderboard.container, '.cl-main-widget-lb-leaderboard-body-res');
      _this.settings.leaderboard.topResults = Object(_utils_query__WEBPACK_IMPORTED_MODULE_4__["default"])(_this.settings.leaderboard.container, '.cl-main-widget-lb-leaderboard-header-top-res');
      _this.settings.detailsContainer = Object(_utils_query__WEBPACK_IMPORTED_MODULE_4__["default"])(_this.settings.container, '.cl-main-widget-lb-details-container');
      _this.settings.tournamentListContainer = Object(_utils_query__WEBPACK_IMPORTED_MODULE_4__["default"])(_this.settings.container, '.cl-main-widget-tournaments-list');
      _this.settings.detailsContainerDate = Object(_utils_query__WEBPACK_IMPORTED_MODULE_4__["default"])(_this.settings.container, '.cl-main-widget-lb-details-header-date');
      _this.settings.headerDate = Object(_utils_query__WEBPACK_IMPORTED_MODULE_4__["default"])(_this.settings.container, '.cl-main-widget-lb-header-date');
      _this.settings.achievement.container = Object(_utils_query__WEBPACK_IMPORTED_MODULE_4__["default"])(_this.settings.container, '.cl-main-widget-section-ach');
      _this.settings.achievement.detailsContainer = Object(_utils_query__WEBPACK_IMPORTED_MODULE_4__["default"])(_this.settings.container, '.cl-main-widget-ach-details-container');
      _this.settings.reward.container = Object(_utils_query__WEBPACK_IMPORTED_MODULE_4__["default"])(_this.settings.container, '.cl-main-widget-section-reward');
      _this.settings.reward.detailsContainer = Object(_utils_query__WEBPACK_IMPORTED_MODULE_4__["default"])(_this.settings.container, '.cl-main-widget-reward-details-container');
      _this.settings.messages.container = Object(_utils_query__WEBPACK_IMPORTED_MODULE_4__["default"])(_this.settings.container, '.cl-main-widget-section-inbox');
      _this.settings.messages.detailsContainer = Object(_utils_query__WEBPACK_IMPORTED_MODULE_4__["default"])(_this.settings.container, '.cl-main-widget-inbox-details-container');

      _this.leaderboardHeader();

      _this.eventListeners();
    }

    _this.leaderboardOptInCheck();

    _this.leaderboardDetailsUpdate();

    _this.updateLeaderboard();

    if (_this.settings.lbWidget.settings.competition.activeContest !== null) {
      _this.updateLeaderboardTime();
    }

    if (typeof callback === 'function') {
      callback();
    }
  };

  this.clearAll = function () {
    var _this = this;

    _this.settings.active = false;

    if (_this.settings.leaderboard.timerInterval) {
      clearTimeout(_this.settings.leaderboard.timerInterval);
    }

    _this.settings.preLoader.preLoaderActive = false;
  };

  this.hide = function (callback) {
    var _this = this;

    _this.clearAll();

    if (_this.settings.container !== null) {
      Object(_utils_removeClass__WEBPACK_IMPORTED_MODULE_2__["default"])(_this.settings.container, 'cl-show');
      setTimeout(function () {
        _this.settings.container.style.display = 'none';

        _this.hideCompetitionDetails();

        _this.hideAchievementDetails();

        if (typeof callback === 'function') {
          callback();
        }
      }, 30);
    } else if (typeof callback === 'function') {
      callback();
    }
  };

  this.missingMember = function (isVisible) {
    var _this = this;

    var area = Object(_utils_query__WEBPACK_IMPORTED_MODULE_4__["default"])(_this.settings.container, '.cl-main-widget-lb-missing-member');

    if (!isVisible) {
      var member = Object(_utils_query__WEBPACK_IMPORTED_MODULE_4__["default"])(_this.settings.leaderboard.list, '.cl-lb-member-row');

      if (area !== null && member !== null) {
        area.innerHTML = member.innerHTML;
        area.style.display = 'block';
      } else {
        area.style.display = 'none';
      }
    } else {
      area.style.display = 'none';
    }
  };

  this.isElementVisibleInView = function (el, container) {
    var position = el.getBoundingClientRect();
    var elemContainer = container.getBoundingClientRect();
    var elemTop = position.top;
    var elemBottom = position.bottom;
    var elemHeight = position.height;
    return elemTop <= elemContainer.top ? elemContainer.top - elemTop <= elemHeight : elemBottom - elemContainer.bottom <= elemHeight;
  };

  this.eventListeners = function () {
    var _this = this;

    _this.settings.leaderboard.list.parentNode.onscroll = function (evt) {
      evt.preventDefault();
      var member = Object(_utils_query__WEBPACK_IMPORTED_MODULE_4__["default"])(_this.settings.leaderboard.list, '.cl-lb-member-row');

      if (member !== null) {
        _this.missingMember(_this.isElementVisibleInView(member, evt.target));
      }
    };

    window.onresize = function (evt) {
      var member = Object(_utils_query__WEBPACK_IMPORTED_MODULE_4__["default"])(_this.settings.leaderboard.list, '.cl-lb-member-row');

      if (member !== null) {
        _this.missingMember(_this.isElementVisibleInView(member, _this.settings.leaderboard.list.parentNode));
      }
    };
  }; // this.checkLeaderboardScrollContainer = function(){
  //  var _this = this,
  //    lbScrollContainer = query(_this.settings.leaderboard.container, ".cl-main-widget-lb-leaderboard-body");
  //
  //  if( scrollEnabled(lbScrollContainer) ){
  //    addClass(lbScrollContainer, "cl-element-scrollable");
  //  }else{
  //    removeClass(lbScrollContainer, "cl-element-scrollable");
  //  }
  // };


  this.competitionDetailsOptInButtonState = function () {
    var _this = this;

    var optIn = Object(_utils_query__WEBPACK_IMPORTED_MODULE_4__["default"])(_this.settings.detailsContainer, '.cl-main-widget-lb-details-optin-action');

    if (typeof _this.settings.lbWidget.settings.competition.activeCompetition.optinRequired === 'boolean' && _this.settings.lbWidget.settings.competition.activeCompetition.optinRequired) {
      if (typeof _this.settings.lbWidget.settings.competition.activeCompetition.optin === 'boolean' && !_this.settings.lbWidget.settings.competition.activeCompetition.optin) {
        optIn.innerHTML = _this.settings.lbWidget.settings.translation.tournaments.enter;
        Object(_utils_removeClass__WEBPACK_IMPORTED_MODULE_2__["default"])(optIn, 'cl-disabled');
      } else {
        optIn.innerHTML = _this.settings.lbWidget.settings.translation.tournaments.registered;
        Object(_utils_addClass__WEBPACK_IMPORTED_MODULE_6__["default"])(optIn, 'cl-disabled');
      }

      optIn.parentNode.style.display = 'block';
    } else {
      optIn.parentNode.style.display = 'none';
    }
  };

  this.loadCompetitionDetails = function (callback) {
    var _this = this;

    var label = Object(_utils_query__WEBPACK_IMPORTED_MODULE_4__["default"])(_this.settings.detailsContainer, '.cl-main-widget-lb-details-header-label'); // var date = query(_this.settings.detailsContainer, '.cl-main-widget-lb-details-header-date');

    var body = Object(_utils_query__WEBPACK_IMPORTED_MODULE_4__["default"])(_this.settings.detailsContainer, '.cl-main-widget-lb-details-body');
    var image = Object(_utils_query__WEBPACK_IMPORTED_MODULE_4__["default"])(_this.settings.detailsContainer, '.cl-main-widget-lb-details-body-image-cont');
    image.innerHTML = '';
    label.innerHTML = _this.settings.lbWidget.settings.competition.activeContest.label.length > 0 ? _this.settings.lbWidget.settings.competition.activeContest.label : _this.settings.lbWidget.settings.competition.activeCompetition.label;
    body.innerHTML = _this.settings.lbWidget.settings.competition.activeContest.description.length > 0 ? _this.settings.lbWidget.settings.competition.activeContest.description : _this.settings.lbWidget.settings.competition.activeCompetition.description;

    _this.competitionDetailsOptInButtonState();

    _this.settings.detailsContainer.style.display = 'block';
    _this.settings.headerDate.style.display = 'none';

    if (_this.settings.lbWidget.settings.competition.extractImageHeader) {
      Object(_utils_objectIterator__WEBPACK_IMPORTED_MODULE_3__["default"])(Object(_utils_query__WEBPACK_IMPORTED_MODULE_4__["default"])(body, 'img'), function (img, key, count) {
        if (count === 0) {
          var newImg = img.cloneNode(true);
          image.appendChild(newImg);
          Object(_utils_remove__WEBPACK_IMPORTED_MODULE_7__["default"])(img);
        }
      });
    }

    setTimeout(function () {
      Object(_utils_addClass__WEBPACK_IMPORTED_MODULE_6__["default"])(_this.settings.detailsContainer, 'cl-show');
      if (typeof callback === 'function') callback();
    }, 50);
  };

  this.loadCompetitionList = function (callback, ajaxInstance) {
    var _this = this;

    var listResContainer = Object(_utils_query__WEBPACK_IMPORTED_MODULE_4__["default"])(_this.settings.tournamentListContainer, '.cl-main-widget-tournaments-list-body-res');

    var preLoader = _this.preloader();

    preLoader.show(function () {
      _this.settings.lbWidget.checkForAvailableCompetitions(function () {
        var accordionObj = _this.accordionStyle(_this.settings.tournamentsSection.accordionLayout, function (accordionSection, listContainer, topEntryContainer, layout) {
          var tournamentData = _this.settings.lbWidget.settings.tournaments[layout.type];

          if (typeof tournamentData !== 'undefined') {
            if (tournamentData.length === 0) {
              accordionSection.style.display = 'none';
            }

            window.mapObject(tournamentData, function (tournament, key, count) {
              if (count + 1 <= layout.showTopResults && Object(_utils_query__WEBPACK_IMPORTED_MODULE_4__["default"])(topEntryContainer, '.cl-tournament-' + tournament.id) === null) {
                var topEntryContaineRlistItem = _this.tournamentItem(tournament);

                topEntryContainer.appendChild(topEntryContaineRlistItem);
              }

              if (Object(_utils_query__WEBPACK_IMPORTED_MODULE_4__["default"])(listContainer, '.cl-tournament-' + tournament.id) === null) {
                var listItem = _this.tournamentItem(tournament);

                listContainer.appendChild(listItem);
              }
            });
          }
        });

        listResContainer.innerHTML = '';
        listResContainer.appendChild(accordionObj);
        _this.settings.tournamentListContainer.style.display = 'block';
        setTimeout(function () {
          Object(_utils_addClass__WEBPACK_IMPORTED_MODULE_6__["default"])(_this.settings.tournamentListContainer, 'cl-show');
          if (typeof callback === 'function') callback();
          preLoader.hide();
        }, 50);
      }, ajaxInstance);
    });
  };

  this.hideCompetitionList = function (callback) {
    var _this = this;

    Object(_utils_removeClass__WEBPACK_IMPORTED_MODULE_2__["default"])(_this.settings.tournamentListContainer, 'cl-show');
    setTimeout(function () {
      _this.settings.tournamentListContainer.style.display = 'none';
      if (typeof callback === 'function') callback();
    }, 200);
  };

  this.hideCompetitionDetails = function (callback) {
    var _this = this;

    Object(_utils_removeClass__WEBPACK_IMPORTED_MODULE_2__["default"])(_this.settings.detailsContainer, 'cl-show');
    setTimeout(function () {
      _this.settings.detailsContainer.style.display = 'none';
      _this.settings.headerDate.style.display = 'block';
      if (typeof callback === 'function') callback();
    }, 200);
  };

  this.achievementItem = function (ach, achieved, perc) {
    var _this = this;

    var listItem = document.createElement('div');
    var detailsContainer = document.createElement('div');
    var detailsWrapper = document.createElement('div');
    var label = document.createElement('div');
    var category = document.createElement('div');
    var description = document.createElement('div');
    var progressionWrapper = document.createElement('div');
    var progressionBox = document.createElement('div'); // box with container & bar & percentage

    var progressionCont = document.createElement('div'); // container

    var progressionBar = document.createElement('div');
    var progressionPercent = document.createElement('div');
    var moreButton = document.createElement('a');
    var cpomntainsImage = typeof ach.icon !== 'undefined' && ach.icon.length > 0;
    listItem.setAttribute('class', 'cl-ach-list-item cl-ach-' + ach.id + (cpomntainsImage ? ' cl-ach-with-image' : ''));
    detailsContainer.setAttribute('class', 'cl-ach-list-details-cont');
    detailsWrapper.setAttribute('class', 'cl-ach-list-details-wrap');
    label.setAttribute('class', 'cl-ach-list-details-label');
    category.setAttribute('class', 'cl-ach-list-details-category');
    description.setAttribute('class', 'cl-ach-list-details-description');
    progressionWrapper.setAttribute('class', 'cl-ach-list-progression');
    progressionBox.setAttribute('class', 'cl-ach-list-progression-box');
    progressionCont.setAttribute('class', 'cl-ach-list-progression-cont');
    progressionBar.setAttribute('class', 'cl-ach-list-progression-bar');
    progressionPercent.setAttribute('class', 'cl-ach-list-percent-number');
    moreButton.setAttribute('class', 'cl-ach-list-more'); // start with 0

    progressionPercent.innerHTML = '0%';
    moreButton.dataset.id = ach.id;
    moreButton.innerHTML = _this.settings.lbWidget.settings.translation.achievements.more;
    moreButton.href = 'javascript:void(0);';
    listItem.dataset.id = ach.id;
    label.innerHTML = ach.name;
    category.innerHTML = ach.category.join(', ');
    detailsWrapper.appendChild(label);
    detailsWrapper.appendChild(category);
    detailsWrapper.appendChild(description);

    if (cpomntainsImage) {
      var image = new Image();
      var imageIconWrapper = document.createElement('div');
      imageIconWrapper.setAttribute('class', 'cl-ach-list-item-img-wrapper');
      image.setAttribute('class', 'cl-ach-list-item-img');
      image.src = _this.settings.lbWidget.settings.uri.gatewayDomain + _this.settings.lbWidget.settings.uri.assets.replace(':attachmentId', ach.icon);
      image.alt = ach.name; // image.onload = function(){
      // };

      imageIconWrapper.appendChild(image);
      detailsContainer.appendChild(imageIconWrapper);
    }

    detailsContainer.appendChild(detailsWrapper); // progression contains has bar inside

    progressionCont.appendChild(progressionBar); // progression box has container + percent number

    progressionBox.appendChild(progressionCont);
    progressionBox.appendChild(progressionPercent); // wrapper has box + button

    progressionWrapper.appendChild(progressionBox);
    progressionWrapper.appendChild(moreButton);
    listItem.appendChild(detailsContainer);
    listItem.appendChild(progressionWrapper);
    return listItem;
  };

  this.achievementListLayout = function (achievementData) {
    var _this = this;

    var achList = Object(_utils_query__WEBPACK_IMPORTED_MODULE_4__["default"])(_this.settings.section, '.cl-main-widget-section-ach .cl-main-widget-ach-list-body-res');
    window.mapObject(achievementData, function (ach) {
      if (Object(_utils_query__WEBPACK_IMPORTED_MODULE_4__["default"])(achList, '.cl-ach-' + ach.id) === null) {
        var listItem = _this.achievementItem(ach);

        achList.appendChild(listItem);
      }
    });
  };

  this.loadAchievementDetails = function (data, callback) {
    var _this = this;

    var label = Object(_utils_query__WEBPACK_IMPORTED_MODULE_4__["default"])(_this.settings.achievement.detailsContainer, '.cl-main-widget-ach-details-header-label');
    var body = Object(_utils_query__WEBPACK_IMPORTED_MODULE_4__["default"])(_this.settings.achievement.detailsContainer, '.cl-main-widget-ach-details-body');
    var image = Object(_utils_query__WEBPACK_IMPORTED_MODULE_4__["default"])(_this.settings.achievement.detailsContainer, '.cl-main-widget-ach-details-body-image-cont');
    image.innerHTML = '';
    label.innerHTML = data.data.name;
    body.innerHTML = data.data.description;

    if (_this.settings.lbWidget.settings.achievements.extractImageHeader) {
      var imageLookup = Object(_utils_query__WEBPACK_IMPORTED_MODULE_4__["default"])(body, 'img');
      Object(_utils_objectIterator__WEBPACK_IMPORTED_MODULE_3__["default"])(imageLookup, function (img, key, count) {
        if (count === 0) {
          var newImg = img.cloneNode(true);
          image.appendChild(newImg);
          Object(_utils_remove__WEBPACK_IMPORTED_MODULE_7__["default"])(img);
        }
      });
    }

    _this.settings.achievement.detailsContainer.style.display = 'block';
    setTimeout(function () {
      Object(_utils_addClass__WEBPACK_IMPORTED_MODULE_6__["default"])(_this.settings.achievement.detailsContainer, 'cl-show');
      if (typeof callback === 'function') callback();
    }, 50);
  };

  this.hideAchievementDetails = function (callback) {
    var _this = this;

    Object(_utils_removeClass__WEBPACK_IMPORTED_MODULE_2__["default"])(_this.settings.achievement.detailsContainer, 'cl-show');
    setTimeout(function () {
      _this.settings.achievement.detailsContainer.style.display = 'none';
      if (typeof callback === 'function') callback();
    }, 200);
  };

  this.loadRewardDetails = function (data, callback) {
    var _this = this;

    var label = Object(_utils_query__WEBPACK_IMPORTED_MODULE_4__["default"])(_this.settings.reward.detailsContainer, '.cl-main-widget-reward-details-header-label');
    var body = Object(_utils_query__WEBPACK_IMPORTED_MODULE_4__["default"])(_this.settings.reward.detailsContainer, '.cl-main-widget-reward-details-body');
    var image = Object(_utils_query__WEBPACK_IMPORTED_MODULE_4__["default"])(_this.settings.reward.detailsContainer, '.cl-main-widget-reward-details-body-image-cont');
    var claimBtn = Object(_utils_query__WEBPACK_IMPORTED_MODULE_4__["default"])(_this.settings.reward.detailsContainer, '.cl-main-widget-reward-claim-btn');
    var icon = Object(_utils_query__WEBPACK_IMPORTED_MODULE_4__["default"])(_this.settings.reward.detailsContainer, '.cl-main-widget-reward-winnings-icon');
    var value = Object(_utils_query__WEBPACK_IMPORTED_MODULE_4__["default"])(_this.settings.reward.detailsContainer, '.cl-main-widget-reward-winnings-value');
    label.innerHTML = data.data.reward.rewardName;
    body.innerHTML = data.data.reward.description;
    value.innerHTML = _this.settings.lbWidget.settings.rewards.rewardFormatter(data.data.reward);
    claimBtn.dataset.id = data.data.id;

    if (data.data.claimed) {
      Object(_utils_addClass__WEBPACK_IMPORTED_MODULE_6__["default"])(claimBtn, 'cl-claimed');
      claimBtn.innerHTML = _this.settings.lbWidget.settings.translation.rewards.claimed;
    } else {
      Object(_utils_removeClass__WEBPACK_IMPORTED_MODULE_2__["default"])(claimBtn, 'cl-claimed');
      claimBtn.innerHTML = _this.settings.lbWidget.settings.translation.rewards.claim;
    }

    if (typeof data.data.reward.icon !== 'undefined') {
      icon.innerHTML = '';

      var _image = new Image();

      var imageIconWrapper = document.createElement('div');
      imageIconWrapper.setAttribute('class', 'cl-reward-list-item-img-wrapper');

      _image.setAttribute('class', 'cl-reward-list-item-img');

      _image.src = _this.settings.lbWidget.settings.uri.gatewayDomain + _this.settings.lbWidget.settings.uri.assets.replace(':attachmentId', data.data.reward.icon);
      _image.alt = _this.settings.lbWidget.settings.rewards.rewardFormatter(data.data.reward);
      icon.appendChild(_image);
    } else {
      icon.innerHTML = "<span class='cl-place-holder-reward-image'></span>";
    }

    Object(_utils_objectIterator__WEBPACK_IMPORTED_MODULE_3__["default"])(Object(_utils_query__WEBPACK_IMPORTED_MODULE_4__["default"])(body, 'img'), function (img, key, count) {
      if (count === 0) {
        var newImg = img.cloneNode(true);
        image.innerHTML = '';
        image.appendChild(newImg);
        Object(_utils_remove__WEBPACK_IMPORTED_MODULE_7__["default"])(img);
      }
    });
    _this.settings.reward.detailsContainer.style.display = 'block';
    setTimeout(function () {
      Object(_utils_addClass__WEBPACK_IMPORTED_MODULE_6__["default"])(_this.settings.reward.detailsContainer, 'cl-show');
      if (typeof callback === 'function') callback();
    }, 50);
  };

  this.loadMessageDetails = function (data, callback) {
    var _this = this;

    var label = Object(_utils_query__WEBPACK_IMPORTED_MODULE_4__["default"])(_this.settings.messages.detailsContainer, '.cl-main-widget-inbox-details-header-label');
    var body = Object(_utils_query__WEBPACK_IMPORTED_MODULE_4__["default"])(_this.settings.messages.detailsContainer, '.cl-main-widget-inbox-details-body');
    label.innerHTML = data.data.subject;
    body.innerHTML = data.data.body;
    _this.settings.messages.detailsContainer.style.display = 'block';
    setTimeout(function () {
      Object(_utils_addClass__WEBPACK_IMPORTED_MODULE_6__["default"])(_this.settings.messages.detailsContainer, 'cl-show');
      if (typeof callback === 'function') callback();
    }, 50);
  };

  this.hideRewardDetails = function (callback) {
    var _this = this;

    Object(_utils_removeClass__WEBPACK_IMPORTED_MODULE_2__["default"])(_this.settings.reward.detailsContainer, 'cl-show');
    setTimeout(function () {
      _this.settings.reward.detailsContainer.style.display = 'none';
      if (typeof callback === 'function') callback();
    }, 200);
  };

  this.hideMessageDetails = function (callback) {
    var _this = this;

    Object(_utils_removeClass__WEBPACK_IMPORTED_MODULE_2__["default"])(_this.settings.messages.detailsContainer, 'cl-show');
    setTimeout(function () {
      _this.settings.messages.detailsContainer.style.display = 'none';
      if (typeof callback === 'function') callback();
    }, 200);
  };

  this.updateAchievementProgressionAndIssued = function (issued, progression) {
    var _this = this;

    var achList = Object(_utils_query__WEBPACK_IMPORTED_MODULE_4__["default"])(_this.settings.section, '.cl-main-widget-section-ach .cl-main-widget-ach-list-body-res');
    Object(_utils_objectIterator__WEBPACK_IMPORTED_MODULE_3__["default"])(Object(_utils_query__WEBPACK_IMPORTED_MODULE_4__["default"])(achList, '.cl-ach-list-item'), function (ach) {
      var id = ach.dataset.id; // var issuedStatus = (issued.indexOf(id) !== -1);

      var perc = 0;
      window.mapObject(progression, function (pr) {
        if (pr.achievementId === id) {
          perc = (parseFloat(pr.goalPercentageComplete) * 100).toFixed(1);
        }
      });

      if (ach !== null) {
        var bar = Object(_utils_query__WEBPACK_IMPORTED_MODULE_4__["default"])(ach, '.cl-ach-list-progression-bar');
        var percentNum = Object(_utils_query__WEBPACK_IMPORTED_MODULE_4__["default"])(ach, '.cl-ach-list-percent-number');
        bar.style.width = (perc > 1 || perc === 0 ? perc : 1) + '%';
        percentNum.innerHTML = (perc > 1 || perc === 0 ? Math.round(perc) : 1) + '%';
        /*
        if (issuedStatus) {
          addClass(bar, 'cl-ach-complete');
          bar.innerHTML = _this.settings.lbWidget.settings.translation.achievements.complete;
          bar.style.width = '100%';
        } else {
          bar.style.width = ((perc > 1 || perc === 0) ? perc : 1) + '%';
        }
        */
      }
    });
  };

  this.loadAchievements = function (callback) {
    var _this = this;

    _this.settings.lbWidget.checkForAvailableAchievements(function (achievementData) {
      _this.achievementListLayout(achievementData);

      var idList = [];
      window.mapObject(_this.settings.lbWidget.settings.achievements.list, function (ach) {
        idList.push(ach.id);
      });
      setTimeout(function () {
        _this.settings.lbWidget.checkForMemberAchievementsIssued(function (issued) {
          _this.settings.lbWidget.checkForMemberAchievementsProgression(idList, function (progression) {
            _this.updateAchievementProgressionAndIssued(issued, progression);
          });
        });
      }, 400);

      if (typeof callback === 'function') {
        callback();
      }
    });
  };

  this.rewardItem = function (rew) {
    var _this = this;

    var listItem = document.createElement('div');
    var detailsContainer = document.createElement('div');
    var detailsWrapper = document.createElement('div');
    var label = document.createElement('div');
    var description = document.createElement('div');
    listItem.setAttribute('class', 'cl-rew-list-item cl-rew-' + rew.id);
    detailsContainer.setAttribute('class', 'cl-rew-list-details-cont');
    detailsWrapper.setAttribute('class', 'cl-rew-list-details-wrap');
    label.setAttribute('class', 'cl-rew-list-details-label');
    description.setAttribute('class', 'cl-rew-list-details-description');
    listItem.dataset.id = rew.id;
    var labelText = Object(_utils_stripHtml__WEBPACK_IMPORTED_MODULE_9__["default"])(rew.subject);
    var descriptionText = Object(_utils_stripHtml__WEBPACK_IMPORTED_MODULE_9__["default"])(rew.body);

    if (typeof rew.prize !== 'undefined') {
      listItem.dataset.rewardId = rew.prize.id;
      labelText = Object(_utils_stripHtml__WEBPACK_IMPORTED_MODULE_9__["default"])(rew.subject + ' - ' + rew.prize.reward.rewardName + ' (' + _this.settings.lbWidget.settings.rewards.rewardFormatter(rew.prize.reward) + ')');
      descriptionText = Object(_utils_stripHtml__WEBPACK_IMPORTED_MODULE_9__["default"])(typeof rew.prize.reward.description !== 'undefined' && rew.prize.reward.description.length > 0 ? rew.prize.reward.description : rew.body);
    }

    label.innerHTML = labelText.length > 80 ? labelText.substr(0, 80) + '...' : labelText;
    description.innerHTML = descriptionText.length > 200 ? descriptionText.substr(0, 200) + '...' : descriptionText;
    detailsWrapper.appendChild(label);
    detailsWrapper.appendChild(description);
    detailsContainer.appendChild(detailsWrapper);
    listItem.appendChild(detailsContainer);
    return listItem;
  };

  this.messageItem = function (inbox) {
    // var _this = this;
    var listItem = document.createElement('div');
    var detailsContainer = document.createElement('div');
    var detailsWrapper = document.createElement('div');
    var label = document.createElement('div');
    var description = document.createElement('div');
    var content = Object(_utils_stripHtml__WEBPACK_IMPORTED_MODULE_9__["default"])(inbox.body);
    listItem.setAttribute('class', 'cl-inbox-list-item cl-inbox-' + inbox.id);
    detailsContainer.setAttribute('class', 'cl-inbox-list-details-cont');
    detailsWrapper.setAttribute('class', 'cl-inbox-list-details-wrap');
    label.setAttribute('class', 'cl-inbox-list-details-label');
    description.setAttribute('class', 'cl-inbox-list-details-description');
    listItem.dataset.id = inbox.id;
    label.innerHTML = inbox.subject.length > 36 ? inbox.subject.substr(0, 36) + '...' : inbox.subject;
    description.innerHTML = content.length > 60 ? content.substr(0, 60) + '...' : content;
    detailsWrapper.appendChild(label);
    detailsWrapper.appendChild(description);
    detailsContainer.appendChild(detailsWrapper);
    listItem.appendChild(detailsContainer);
    return listItem;
  };

  this.tournamentItem = function (tournament) {
    // var _this = this;
    var listItem = document.createElement('div');
    var detailsContainer = document.createElement('div');
    var detailsWrapper = document.createElement('div');
    var label = document.createElement('div');
    var description = document.createElement('div');
    var descriptionContent = Object(_utils_stripHtml__WEBPACK_IMPORTED_MODULE_9__["default"])(tournament.description);
    listItem.setAttribute('class', 'cl-tour-list-item cl-tour-' + tournament.id);
    detailsContainer.setAttribute('class', 'cl-tour-list-details-cont');
    detailsWrapper.setAttribute('class', 'cl-tour-list-details-wrap');
    label.setAttribute('class', 'cl-tour-list-details-label');
    description.setAttribute('class', 'cl-tour-list-details-description');
    listItem.dataset.id = tournament.id;
    label.innerHTML = tournament.label;
    description.innerHTML = descriptionContent.length > 100 ? descriptionContent.substr(0, 100) + '...' : descriptionContent;
    detailsWrapper.appendChild(label);
    detailsWrapper.appendChild(description);
    detailsContainer.appendChild(detailsWrapper);
    listItem.appendChild(detailsContainer);
    return listItem;
  };

  this.rewardsListLayout = function (rewards, availableRewards, expiredRewards) {
    var _this = this;

    var rewardList = Object(_utils_query__WEBPACK_IMPORTED_MODULE_4__["default"])(_this.settings.section, '.cl-main-widget-section-reward .cl-main-widget-reward-list-body-res');

    var accordionObj = _this.accordionStyle(_this.settings.rewardsSection.accordionLayout, function (accordionSection, listContainer, topEntryContainer, layout) {
      var rewardData = _this.settings.lbWidget.settings.rewards[layout.type];

      if (typeof rewardData !== 'undefined') {
        if (rewardData.length === 0) {
          accordionSection.style.display = 'none';
        }

        window.mapObject(rewardData, function (rew, key, count) {
          if (count + 1 <= layout.showTopResults && Object(_utils_query__WEBPACK_IMPORTED_MODULE_4__["default"])(topEntryContainer, '.cl-reward-' + rew.id) === null) {
            var topEntryContaineRlistItem = _this.rewardItem(rew);

            topEntryContainer.appendChild(topEntryContaineRlistItem);
          }

          if (Object(_utils_query__WEBPACK_IMPORTED_MODULE_4__["default"])(listContainer, '.cl-reward-' + rew.id) === null) {
            var listItem = _this.rewardItem(rew);

            listContainer.appendChild(listItem);
          }
        });
      }
    });

    rewardList.innerHTML = '';
    rewardList.appendChild(accordionObj); // mapObject(rewardData, function(rew){
    //   if( query(rewardList, ".cl-reward-" + rew.id) === null ) {
    //     var listItem = _this.rewardItem(rew);
    //
    //     rewardList.appendChild(listItem);
    //   }
    // });
  };

  this.messagesListLayout = function (rewards, availableRewards, expiredRewards) {
    var _this = this;

    var messageList = Object(_utils_query__WEBPACK_IMPORTED_MODULE_4__["default"])(_this.settings.section, '.cl-main-widget-section-inbox .cl-main-widget-inbox-list-body-res');
    messageList.innerHTML = '';
    window.mapObject(_this.settings.lbWidget.settings.messages.messages, function (inboxItem, key, count) {
      var listItem = _this.messageItem(inboxItem);

      messageList.appendChild(listItem);
    });
  };

  this.loadRewards = function (callback) {
    var _this = this;

    _this.settings.lbWidget.checkForAvailableRewards(function (rewards, availableRewards, expiredRewards) {
      _this.rewardsListLayout(rewards, availableRewards, expiredRewards);

      if (typeof callback === 'function') {
        callback();
      }
    });
  };

  this.loadMessages = function (callback) {
    var _this = this;

    _this.settings.lbWidget.checkForAvailableMessages(function (rewards, availableRewards, expiredRewards) {
      _this.messagesListLayout(rewards, availableRewards, expiredRewards);

      if (typeof callback === 'function') {
        callback();
      }
    });
  };

  var changeInterval;
  var changeContainerInterval;

  this.navigationSwitch = function (target, callback) {
    var _this = this;

    var preLoader = _this.preloader();

    if (_this.settings.navigationSwitchInProgress && _this.settings.navigationSwitchLastAtempt + 3000 < new Date().getTime()) {
      _this.settings.navigationSwitchInProgress = false;
    }

    if (!_this.settings.navigationSwitchInProgress) {
      _this.settings.navigationSwitchInProgress = true;
      _this.settings.navigationSwitchLastAtempt = new Date().getTime();

      if (!Object(_utils_hasClass__WEBPACK_IMPORTED_MODULE_1__["default"])(target.parentNode, 'cl-active-nav')) {
        preLoader.show(function () {
          if (changeInterval) clearTimeout(changeInterval);
          if (changeContainerInterval) clearTimeout(changeContainerInterval);
          Object(_utils_objectIterator__WEBPACK_IMPORTED_MODULE_3__["default"])(Object(_utils_query__WEBPACK_IMPORTED_MODULE_4__["default"])(_this.settings.container, '.cl-main-widget-navigation-items .cl-active-nav'), function (obj) {
            Object(_utils_removeClass__WEBPACK_IMPORTED_MODULE_2__["default"])(obj, 'cl-active-nav');
          });
          Object(_utils_objectIterator__WEBPACK_IMPORTED_MODULE_3__["default"])(Object(_utils_query__WEBPACK_IMPORTED_MODULE_4__["default"])(_this.settings.container, '.cl-main-widget-section-container .cl-main-active-section'), function (obj) {
            Object(_utils_removeClass__WEBPACK_IMPORTED_MODULE_2__["default"])(obj, 'cl-main-active-section');
            setTimeout(function () {
              obj.style.display = 'none';
            }, 150);
          });
          changeContainerInterval = setTimeout(function () {
            if (Object(_utils_hasClass__WEBPACK_IMPORTED_MODULE_1__["default"])(target, 'cl-main-widget-navigation-lb-icon')) {
              _this.loadLeaderboard(function () {
                var lbContainer = Object(_utils_query__WEBPACK_IMPORTED_MODULE_4__["default"])(_this.settings.container, '.cl-main-widget-section-container .cl-main-widget-lb');
                lbContainer.style.display = 'block';
                changeInterval = setTimeout(function () {
                  Object(_utils_addClass__WEBPACK_IMPORTED_MODULE_6__["default"])(lbContainer, 'cl-main-active-section');
                }, 30);

                if (typeof callback === 'function') {
                  callback();
                }

                preLoader.hide();
                _this.settings.navigationSwitchInProgress = false;
              });
            } else if (Object(_utils_hasClass__WEBPACK_IMPORTED_MODULE_1__["default"])(target, 'cl-main-widget-navigation-ach-icon')) {
              _this.loadAchievements(function () {
                var achContainer = Object(_utils_query__WEBPACK_IMPORTED_MODULE_4__["default"])(_this.settings.container, '.cl-main-widget-section-container .cl-main-widget-section-ach');
                _this.settings.achievement.detailsContainer.style.display = 'none';
                achContainer.style.display = 'block';
                changeInterval = setTimeout(function () {
                  Object(_utils_addClass__WEBPACK_IMPORTED_MODULE_6__["default"])(achContainer, 'cl-main-active-section');

                  if (typeof callback === 'function') {
                    callback();
                  }
                }, 30);
                preLoader.hide();
                _this.settings.navigationSwitchInProgress = false;
              });
            } else if (Object(_utils_hasClass__WEBPACK_IMPORTED_MODULE_1__["default"])(target, 'cl-main-widget-navigation-rewards-icon')) {
              _this.loadRewards(function () {
                var rewardsContainer = Object(_utils_query__WEBPACK_IMPORTED_MODULE_4__["default"])(_this.settings.container, '.cl-main-widget-section-container .cl-main-widget-section-reward');
                rewardsContainer.style.display = 'block';
                changeInterval = setTimeout(function () {
                  Object(_utils_addClass__WEBPACK_IMPORTED_MODULE_6__["default"])(rewardsContainer, 'cl-main-active-section');
                }, 30);

                if (typeof callback === 'function') {
                  callback();
                }

                preLoader.hide();
                _this.settings.navigationSwitchInProgress = false;
              });
            } else if (Object(_utils_hasClass__WEBPACK_IMPORTED_MODULE_1__["default"])(target, 'cl-main-widget-navigation-inbox-icon')) {
              _this.loadMessages(function () {
                var inboxContainer = Object(_utils_query__WEBPACK_IMPORTED_MODULE_4__["default"])(_this.settings.container, '.cl-main-widget-section-container .cl-main-widget-section-inbox');
                inboxContainer.style.display = 'block';
                changeInterval = setTimeout(function () {
                  Object(_utils_addClass__WEBPACK_IMPORTED_MODULE_6__["default"])(inboxContainer, 'cl-main-active-section');
                }, 30);
                preLoader.hide();
                _this.settings.navigationSwitchInProgress = false;
              });
            }
          }, 250);
          Object(_utils_addClass__WEBPACK_IMPORTED_MODULE_6__["default"])(target.parentNode, 'cl-active-nav');
        });
      } else if (typeof callback === 'function') {
        _this.settings.navigationSwitchInProgress = false;
        callback();
      }
    }
  };

  this.resetNavigation = function (callback) {
    var _this = this;

    var lbContainer = Object(_utils_query__WEBPACK_IMPORTED_MODULE_4__["default"])(_this.settings.container, '.cl-main-widget-section-container .cl-main-widget-lb');
    Object(_utils_objectIterator__WEBPACK_IMPORTED_MODULE_3__["default"])(Object(_utils_query__WEBPACK_IMPORTED_MODULE_4__["default"])(_this.settings.container, '.cl-main-widget-navigation-items .cl-active-nav'), function (obj) {
      Object(_utils_removeClass__WEBPACK_IMPORTED_MODULE_2__["default"])(obj, 'cl-active-nav');
    });
    Object(_utils_objectIterator__WEBPACK_IMPORTED_MODULE_3__["default"])(Object(_utils_query__WEBPACK_IMPORTED_MODULE_4__["default"])(_this.settings.container, '.cl-main-widget-section-container .cl-main-active-section'), function (obj) {
      obj.style.display = 'none';
      Object(_utils_removeClass__WEBPACK_IMPORTED_MODULE_2__["default"])(obj, 'cl-main-active-section');
    });
    Object(_utils_addClass__WEBPACK_IMPORTED_MODULE_6__["default"])(Object(_utils_query__WEBPACK_IMPORTED_MODULE_4__["default"])(_this.settings.container, '.cl-main-widget-navigation-items .cl-main-widget-navigation-lb'), 'cl-active-nav');
    setTimeout(function () {
      lbContainer.style.display = 'block';
      setTimeout(function () {
        Object(_utils_addClass__WEBPACK_IMPORTED_MODULE_6__["default"])(lbContainer, 'cl-main-active-section');
        if (typeof callback !== 'undefined') callback();
      }, 30);
    }, 40);
  };

  this.initLayout = function (callback) {
    var _this = this;

    _this.settings.active = true;

    _this.loadLeaderboard();

    _this.settings.container.style.display = 'block';
    setTimeout(function () {
      Object(_utils_addClass__WEBPACK_IMPORTED_MODULE_6__["default"])(_this.settings.container, 'cl-show');
      var member = Object(_utils_query__WEBPACK_IMPORTED_MODULE_4__["default"])(_this.settings.leaderboard.list, '.cl-lb-member-row');

      if (member !== null) {
        _this.missingMember(_this.isElementVisibleInView(member, _this.settings.leaderboard.list.parentNode));
      }

      _this.resetNavigation(callback);
    }, 30);
  };
};

/***/ }),

/***/ "./src/javascript/modules/Messaging.js":
/*!*********************************************!*\
  !*** ./src/javascript/modules/Messaging.js ***!
  \*********************************************/
/*! exports provided: Messaging */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Messaging", function() { return Messaging; });
/* harmony import */ var _cLabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cLabs */ "./src/javascript/modules/cLabs.js");

/**
 * SSE Messaging
 * @param options
 * @constructor
 */

var Messaging = function Messaging(options) {
  this.settings = {
    source: null,
    ajax: {
      url: null,
      apiKey: undefined,
      errorCallback: function errorCallback() {}
    },
    sseUrl: null,
    heartbeat: null,
    lastHeartbeat: null,
    mainAjax: new _cLabs__WEBPACK_IMPORTED_MODULE_0__["default"].Ajax(),
    heartBeatAjax: new _cLabs__WEBPACK_IMPORTED_MODULE_0__["default"].Ajax(),
    heartWaitTime: 25000,
    messageQueue: [],
    messageInterval: 1000,
    startupCheck: true,
    active: false,
    debug: false,
    callback: function callback(data) {},
    onStartupError: function onStartupError() {}
  };

  if (typeof options !== 'undefined') {
    for (var opt in options) {
      if (options.hasOwnProperty(opt)) {
        this.settings[opt] = options[opt];
      }
    }
  }

  this.intervalInstance = null;
  this.heartbeatIntervalInstance = null;

  this.lookupData = function () {
    var _this = this;

    if (_this.settings.messageQueue.length > 0) {
      var data = _this.settings.messageQueue[0];

      var index = _this.settings.messageQueue.indexOf(data);

      if (index > -1) {
        _this.settings.messageQueue.splice(index, 1);
      }

      if (typeof _this.settings.ajax.url === 'string' && _this.settings.ajax.url.length > 0) {
        _this.getData(data);
      } else {
        _this.settings.callback(data);
      }
    }
  };

  this.setInterval = function () {
    var _this = this;

    _this.intervalInstance = setInterval(function () {
      _this.lookupData();
    }, _this.settings.messageInterval);

    if (_this.settings.heartbeat !== null) {
      _this.settings.lastHeartbeat = new Date();
      _this.heartbeatIntervalInstance = setInterval(function () {
        var currentTime = new Date();
        var diff = _this.settings.lastHeartbeat.getTime() - currentTime.getTime();

        if (_this.settings.source.readyState === 0 && diff > _this.settings.heartWaitTime) {
          _this.closeChanel();
        }

        _this.hearBeatCheck();
      }, _this.settings.heartWaitTime);
    }
  };
  /**
   * Request a heartbeat
   * - if the request is failing close the connection
   * - if the request is successful but the connection is closed reopen and call for a heartbeat again
   */


  this.hearBeatCheck = function () {
    var _this = this;

    var dataObj = {
      url: _this.settings.heartbeat,
      headers: _this.settings.ajax.apiKey,
      type: 'GET',
      success: function success(response, dataObject, xhr) {
        if (xhr.status !== 200 && _this.settings.source.readyState === 0) {
          if (_this.settings.debug) console.log('[Msg] SSE Closing connection');

          _this.closeChanel();
        } else if (xhr.status === 200 && _this.settings.source.readyState === 2) {
          if (_this.settings.debug) console.log('[Msg] SSE Trying to re-open the connection');

          _this.openChanel();

          setTimeout(function () {
            _this.hearBeatCheck();
          }, 200);
        }
      }
    };

    if (typeof _this.settings.ajax.apiKey !== 'undefined') {
      dataObj.headers = _this.settings.ajax.apiKey;
    }

    _this.settings.heartBeatAjax.abort().getData(dataObj);
  };

  this.getData = function () {
    var _this = this;

    var dataObj = {
      url: _this.settings.ajax.url,
      type: 'GET',
      success: function success(response, dataObject, xhr) {
        var json = {};

        try {
          json = JSON.parse(response);
        } catch (e) {
          if (_this.settings.debug) console.log(e, _this.settings);
        }

        if (xhr.status === 200) {
          _this.settings.callback(json);
        } else {
          _this.settings.ajax.errorCallback(json);
        }
      }
    };

    if (typeof _this.settings.ajax.apiKey !== 'undefined') {
      dataObj.headers = _this.settings.ajax.apiKey;
    }

    _this.settings.mainAjax.abort().getData(dataObj);
  };

  this.openChanel = function () {
    var _this = this;

    _this.settings.source = new EventSource(_this.settings.sseUrl, {
      withCredentials: true
    });

    _this.serverSideEventListeners(_this.settings.source);
  };

  this.serverSideEventListeners = function (source) {
    var _this = this;

    source.addEventListener('open', function (e) {
      _this.settings.active = true;
      if (_this.settings.debug) console.log('[Msg] connection opened', e);
    }, false);
    source.addEventListener('message', function (e) {
      if (_this.settings.debug) {
        console.log('[Msg] message check', _this.settings.sseUrl);
        console.log(e.data);
      }

      var data = e.data;
      var json = null;

      try {
        json = JSON.parse(data);
      } catch (e) {}

      if (_this.settings.heartbeat !== null) {
        _this.settings.lastHeartbeat = new Date();
      }

      if (json !== null && typeof json.heartbeat === 'undefined') {
        _this.settings.messageQueue.push(json);
      }
    }, false);
    source.addEventListener('error', function (e) {
      if (_this.settings.debug) {
        console.log('[Msg] error check', _this.settings.sseUrl);
      }
      /* eslint eqeqeq: "off" */


      if (e.readyState == EventSource.CLOSED) {
        if (_this.settings.debug) console.warn('[Msg] connection closed', e);
      } else {
        if (_this.settings.debug) console.log(e, e.readyState);
      }

      _this.closeChanel();

      _this.settings.startupCheck = false;
    }, false);
  };

  this.closeChanel = function () {
    this.settings.active = false;
    this.settings.source.close();
  };

  this.sseFailed = function () {
    var _this = this;

    _this.settings.heartbeat = null;
    _this.settings.active = false;

    if (_this.heartbeatIntervalInstance !== null) {
      clearInterval(_this.heartbeatIntervalInstance);
    }

    _this.settings.onStartupError(_this.settings);
  };

  this.windowActivity = function () {
    var _this = this;

    (function () {
      var hidden = 'hidden'; // Standards:

      if (hidden in document) {
        document.addEventListener('visibilitychange', onchange);
      } else if ((hidden = 'mozHidden') in document) {
        document.addEventListener('mozvisibilitychange', onchange);
      } else if ((hidden = 'webkitHidden') in document) {
        document.addEventListener('webkitvisibilitychange', onchange);
      } else if ((hidden = 'msHidden') in document) {
        document.addEventListener('msvisibilitychange', onchange);
      } else if ('onfocusin' in document) {
        // IE 9 and lower:
        document.onfocusin = document.onfocusout = onchange;
      } else {
        // All others:
        window.onpageshow = window.onpagehide = window.onfocus = window.onblur = onchange;
      }

      function onchange(evt) {
        var status = '';
        var v = 'visible';
        var h = 'hidden';
        var evtMap = {
          focus: v,
          focusin: v,
          pageshow: v,
          blur: h,
          focusout: h,
          pagehide: h
        };
        evt = evt || window.event;

        if (evt.type in evtMap) {
          status = evtMap[evt.type];
        } else {
          status = this[hidden] ? 'hidden' : 'visible';
        }

        if (status === 'visible' && _this.settings.source.readyState !== 0 && _this.settings.source.readyState !== 1) {
          _this.openChanel();
        } else if (status === 'hidden' && (_this.settings.source.readyState === 0 || _this.settings.source.readyState === 1)) {
          _this.closeChanel();
        }
      } // set the initial state (but only if browser supports the Page Visibility API)


      if (document[hidden] !== undefined) {
        onchange({
          type: document[hidden] ? 'blur' : 'focus'
        });
      }
    })();
  };

  this.init = function () {
    var _this = this;

    try {
      if (_this.settings.debug) console.log('[Msg] SSE starting', _this.settings.sseUrl, new Date());

      _this.openChanel();

      if (_this.settings.debug) console.log('[Msg] SSE started', _this.settings.sseUrl, new Date(), _this.settings.source.readyState);

      _this.setInterval();

      _this.windowActivity();

      setTimeout(function () {
        if (!_this.settings.startupCheck) {
          console.log('sse failed');

          _this.sseFailed();
        }
      }, 2000);
      window.addEventListener('unload', function (event) {
        if (_this.settings.debug) console.log('[Msg] closing messaging service', new Date());

        _this.settings.source.close();

        _this.settings.active = false;

        _this.settings.heartBeatAjax.abort();

        if (_this.intervalInstance) {
          clearInterval(_this.intervalInstance);
        }
      });
      window.addEventListener('beforeunload', function (event) {
        if (_this.settings.debug) console.log('[Msg] closing messaging service');

        _this.settings.source.close();

        _this.settings.heartBeatAjax.abort();

        if (_this.intervalInstance) {
          clearInterval(_this.intervalInstance);
        }
      });
    } catch (e) {
      if (_this.settings.debug) console.log('EventSource failed');

      _this.sseFailed();
    }
  };

  this.init();
};

/***/ }),

/***/ "./src/javascript/modules/MiniScoreBoard.js":
/*!**************************************************!*\
  !*** ./src/javascript/modules/MiniScoreBoard.js ***!
  \**************************************************/
/*! exports provided: MiniScoreBoard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MiniScoreBoard", function() { return MiniScoreBoard; });
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_query__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/query */ "./src/javascript/utils/query.js");
/* harmony import */ var _utils_addClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/addClass */ "./src/javascript/utils/addClass.js");
/* harmony import */ var _utils_hasClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/hasClass */ "./src/javascript/utils/hasClass.js");
/* harmony import */ var _utils_removeClass__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/removeClass */ "./src/javascript/utils/removeClass.js");
/* harmony import */ var _utils_remove__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/remove */ "./src/javascript/utils/remove.js");
/* harmony import */ var _dragElement__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./dragElement */ "./src/javascript/modules/dragElement.js");







var MiniScoreBoard = function MiniScoreBoard(options) {
  this.settings = {
    lbWidget: null,
    container: null,
    overlayContainer: null,
    infoContainer: null,
    updateInterval: null,
    updateIntervalTime: 1000,
    active: false,
    enableDragging: true,
    dragging: false
  };

  if (typeof options !== 'undefined') {
    for (var opt in options) {
      if (options.hasOwnProperty(opt)) {
        this.settings[opt] = options[opt];
      }
    }
  }

  this.layout = function () {
    var wrapper = document.createElement('div');
    var iconWrapper = document.createElement('div');
    var icon = document.createElement('div');
    var informationWrapper = document.createElement('div');
    var informationTopWrapper = document.createElement('div');
    var informationWrapperClose = document.createElement('div');
    var informationClose = document.createElement('a');
    wrapper.setAttribute('class', 'cl-widget-ms-wrapper');
    iconWrapper.setAttribute('class', 'cl-widget-ms-icon-wrapper');
    icon.setAttribute('class', 'cl-widget-ms-icon');
    informationTopWrapper.setAttribute('class', 'cl-widget-ms-information-top-wrapper');
    informationWrapper.setAttribute('class', 'cl-widget-ms-information-wrapper');
    informationWrapperClose.setAttribute('class', 'cl-widget-ms-information-close-wrapper');
    informationClose.setAttribute('class', 'cl-widget-ms-information-close');
    informationClose.href = 'javascript:void(0);';
    informationClose.innerHTML = 'x';
    informationWrapperClose.appendChild(informationClose);
    informationWrapper.appendChild(informationWrapperClose);
    informationTopWrapper.appendChild(informationWrapper);
    iconWrapper.appendChild(icon);
    wrapper.appendChild(iconWrapper);
    wrapper.appendChild(informationTopWrapper);
    return wrapper;
  };

  this.overlayLayout = function () {
    var wrapper = document.createElement('div');
    wrapper.setAttribute('class', 'cl-widget-ms-overlay-wrapper');
    return wrapper;
  };

  this.timeManagement = function () {
    var _this = this;

    var diff = 0;
    var label = '';
    var date = '';
    var dateObj = '';
    var inverse = false;

    if (_this.settings.lbWidget.settings.competition.activeContest !== null) {
      diff = moment__WEBPACK_IMPORTED_MODULE_0___default()(_this.settings.lbWidget.settings.competition.activeContest.scheduledStart).diff(moment__WEBPACK_IMPORTED_MODULE_0___default()());
      label = _this.settings.lbWidget.settings.translation.miniLeaderboard.startsIn;
      date = _this.settings.lbWidget.formatDateTime(moment__WEBPACK_IMPORTED_MODULE_0___default.a.duration(diff));
      dateObj = _this.settings.lbWidget.formatDateTime(moment__WEBPACK_IMPORTED_MODULE_0___default.a.duration(diff));
      inverse = false;

      if (diff < 0 && _this.settings.lbWidget.settings.competition.activeContest.statusCode === 0) {
        label = _this.settings.lbWidget.settings.translation.miniLeaderboard.starting;
        date = '';
      } else if (_this.settings.lbWidget.settings.competition.activeContest.statusCode > 0 && _this.settings.lbWidget.settings.competition.activeContest.statusCode < 3) {
        diff = moment__WEBPACK_IMPORTED_MODULE_0___default()(_this.settings.lbWidget.settings.competition.activeContest.scheduledEnd).diff(moment__WEBPACK_IMPORTED_MODULE_0___default()());
        dateObj = _this.settings.lbWidget.formatDateTime(moment__WEBPACK_IMPORTED_MODULE_0___default.a.duration(diff));
        label = _this.settings.lbWidget.formatDateTime(moment__WEBPACK_IMPORTED_MODULE_0___default.a.duration(diff));
        date = _this.settings.lbWidget.settings.translation.miniLeaderboard.rank;
        inverse = true;
      } else if (_this.settings.lbWidget.settings.competition.activeContest.statusCode === 3) {
        label = _this.settings.lbWidget.settings.translation.miniLeaderboard.finishing;
        date = _this.settings.lbWidget.settings.translation.miniLeaderboard.rank;
        inverse = true;
      } else if (_this.settings.lbWidget.settings.competition.activeContest.statusCode >= 4) {
        label = _this.settings.lbWidget.settings.translation.miniLeaderboard.finished;
        date = _this.settings.lbWidget.settings.translation.miniLeaderboard.rank;
        inverse = true;
      }
    }

    return {
      label: label,
      diff: diff,
      date: date,
      dateObj: dateObj,
      inverse: inverse
    };
  };

  this.layoutDefaultOrEmptyEntry = function () {
    var lbResultsMemEntry = document.createElement('div');
    var lbResultsMemLabel = document.createElement('div');
    var lbResultsMemRank = document.createElement('div');
    var lbResultsMemIcon = document.createElement('div');
    var lbResultsMemImg = document.createElement('img');
    var lbResultsMemPoints = document.createElement('div');
    lbResultsMemEntry.setAttribute('class', 'cl-widget-ms-default-mem-entry');
    lbResultsMemLabel.setAttribute('class', 'cl-widget-ms-default-mem-label');
    lbResultsMemRank.setAttribute('class', 'cl-widget-ms-default-mem-rank');
    lbResultsMemIcon.setAttribute('class', 'cl-widget-ms-default-mem-icon');
    lbResultsMemImg.setAttribute('class', 'cl-widget-ms-default-mem-img');
    lbResultsMemImg.style.display = 'none';
    lbResultsMemPoints.setAttribute('class', 'cl-widget-ms-default-mem-points');
    lbResultsMemEntry.appendChild(lbResultsMemLabel);
    lbResultsMemEntry.appendChild(lbResultsMemRank);
    lbResultsMemIcon.appendChild(lbResultsMemImg);
    lbResultsMemEntry.appendChild(lbResultsMemIcon);
    lbResultsMemEntry.appendChild(lbResultsMemPoints);
    return lbResultsMemEntry;
  };

  this.layoutFirstToOrEmptyEntry = function () {
    var lbResultsMemEntry = document.createElement('div');
    var lbResultsMemLabel = document.createElement('div');
    var lbResultsMemRank = document.createElement('div');
    var lbResultsMemIcon = document.createElement('div');
    var lbResultsMemImg = document.createElement('img');
    var lbResultsMemPoints = document.createElement('div');
    lbResultsMemEntry.setAttribute('class', 'cl-widget-ms-first-to-mem-entry');
    lbResultsMemLabel.setAttribute('class', 'cl-widget-ms-first-to-mem-label');
    lbResultsMemRank.setAttribute('class', 'cl-widget-ms-first-to-mem-rank');
    lbResultsMemIcon.setAttribute('class', 'cl-widget-ms-first-to-mem-icon');
    lbResultsMemImg.setAttribute('class', 'cl-widget-ms-first-to-mem-img');
    lbResultsMemImg.style.display = 'none';
    lbResultsMemPoints.setAttribute('class', 'cl-widget-ms-first-to-mem-points');
    lbResultsMemEntry.appendChild(lbResultsMemLabel);
    lbResultsMemEntry.appendChild(lbResultsMemRank);
    lbResultsMemIcon.appendChild(lbResultsMemImg);
    lbResultsMemEntry.appendChild(lbResultsMemIcon);
    lbResultsMemEntry.appendChild(lbResultsMemPoints);
    return lbResultsMemEntry;
  }; // let testLive = false;


  this.layoutDefaultOrEmpty = function () {
    var _this = this;

    var timeManagement = _this.timeManagement(); // var diff = timeManagement.diff;


    var label = timeManagement.label;
    var date = timeManagement.date;
    var dateObj = timeManagement.dateObj;
    var wrapperDomObj = _this.settings.infoContainer;
    var defaultDomObj = Object(_utils_query__WEBPACK_IMPORTED_MODULE_1__["default"])(_this.settings.container, '.cl-widget-ms-default-wrapper');
    var inverse = timeManagement.inverse;

    if (defaultDomObj === null) {
      _this.removeUnusedElements();

      Object(_utils_addClass__WEBPACK_IMPORTED_MODULE_2__["default"])(_this.settings.container, 'cl-ms-default-style');
      var lbWrapper = document.createElement('div');
      var lbDateWrapper = document.createElement('div');
      var lbDateLabel = document.createElement('div');
      var lbDate = document.createElement('div');
      var lbResultsWrapper = document.createElement('div');
      var lbResultsList = document.createElement('div');
      var lbHeaders = document.createElement('div');
      var lbHeadersRank = document.createElement('div');
      var lbHeadersPoints = document.createElement('div');

      var lbResultsMemEntry = _this.layoutDefaultOrEmptyEntry();

      var img = Object(_utils_query__WEBPACK_IMPORTED_MODULE_1__["default"])(lbResultsMemEntry, '.cl-widget-ms-default-mem-img');
      lbWrapper.setAttribute('class', 'cl-widget-ms-default-wrapper');
      lbDateLabel.setAttribute('class', 'cl-widget-ms-default-date-label');
      lbDate.setAttribute('class', 'cl-widget-ms-default-date');
      lbDateWrapper.setAttribute('class', 'cl-widget-ms-default-date-wrapper');
      lbResultsWrapper.setAttribute('class', 'cl-widget-ms-default-results-wrapper');
      lbResultsList.setAttribute('class', 'cl-widget-ms-default-results-list');
      lbHeaders.setAttribute('class', 'cl-widget-ms-default-results-headers');
      lbHeadersRank.setAttribute('class', 'cl-widget-ms-default-results-header-rank');
      lbHeadersPoints.setAttribute('class', 'cl-widget-ms-default-results-header-points');
      lbResultsMemEntry.setAttribute('class', 'cl-widget-ms-default-mem-entry'); // lbDateLabel.innerHTML = label;

      lbDate.innerHTML = dateObj;
      lbDateWrapper.appendChild(lbDateLabel);
      lbDateWrapper.appendChild(lbDate);
      Object(_utils_query__WEBPACK_IMPORTED_MODULE_1__["default"])(lbResultsMemEntry, '.cl-widget-ms-default-mem-rank').innerHTML = '--';
      Object(_utils_query__WEBPACK_IMPORTED_MODULE_1__["default"])(lbResultsMemEntry, '.cl-widget-ms-default-mem-points').innerHTML = '--';
      img.src = '';
      img.alt = '';
      img.style.display = 'block';
      lbHeadersRank.innerHTML = _this.settings.lbWidget.settings.translation.leaderboard.rank;
      lbHeadersPoints.innerHTML = _this.settings.lbWidget.settings.translation.leaderboard.points;
      lbHeaders.appendChild(lbHeadersRank);
      lbHeaders.appendChild(lbHeadersPoints);
      lbResultsList.appendChild(lbResultsMemEntry);
      lbResultsWrapper.appendChild(lbHeaders);
      lbResultsWrapper.appendChild(lbResultsList);
      lbWrapper.appendChild(lbDateWrapper);
      lbWrapper.appendChild(lbResultsWrapper);
      defaultDomObj = wrapperDomObj.appendChild(lbWrapper);
      setTimeout(function () {
        Object(_utils_addClass__WEBPACK_IMPORTED_MODULE_2__["default"])(wrapperDomObj, 'cl-show');
      }, 200);
    } else {
      if (!Object(_utils_hasClass__WEBPACK_IMPORTED_MODULE_3__["default"])(wrapperDomObj, 'cl-show')) {
        Object(_utils_addClass__WEBPACK_IMPORTED_MODULE_2__["default"])(wrapperDomObj, 'cl-show');
      }

      Object(_utils_query__WEBPACK_IMPORTED_MODULE_1__["default"])(_this.settings.container, '.cl-widget-ms-default-date-label').innerHTML = label;
      Object(_utils_query__WEBPACK_IMPORTED_MODULE_1__["default"])(_this.settings.container, '.cl-widget-ms-default-date').innerHTML = date;
    }

    window.mapObject(_this.settings.lbWidget.settings.leaderboard.leaderboardData, function (lbEntry) {
      if ((lbEntry.memberRefId === _this.settings.lbWidget.settings.memberId || lbEntry.memberId === _this.settings.lbWidget.settings.memberId) && typeof lbEntry.rankings !== 'undefined') {
        var scoreArea = Object(_utils_query__WEBPACK_IMPORTED_MODULE_1__["default"])(defaultDomObj, '.cl-widget-ms-default-results-list');
        scoreArea.innerHTML = '';
        Object(_utils_query__WEBPACK_IMPORTED_MODULE_1__["default"])(_this.settings.container, '.cl-widget-ms-default-date-label').innerHTML = '';
        Object(_utils_query__WEBPACK_IMPORTED_MODULE_1__["default"])(_this.settings.container, '.cl-widget-ms-default-date').innerHTML = dateObj;
        Object(_utils_addClass__WEBPACK_IMPORTED_MODULE_2__["default"])(Object(_utils_query__WEBPACK_IMPORTED_MODULE_1__["default"])(_this.settings.container, '.cl-widget-ms-default-date-wrapper'), 'cl-widget-ms-default-date-only');
        window.mapObject(lbEntry.rankings, function (lbRankingEntry) {
          var icon = _this.settings.lbWidget.populateIdenticonBase64Image(lbRankingEntry.memberId);

          var lbWrapper = _this.layoutDefaultOrEmptyEntry();

          var img = Object(_utils_query__WEBPACK_IMPORTED_MODULE_1__["default"])(lbWrapper, '.cl-widget-ms-default-mem-img');
          var selfMember = lbRankingEntry.memberRefId === _this.settings.lbWidget.settings.memberId || lbRankingEntry.memberId === _this.settings.lbWidget.settings.memberId;
          img.src = icon;
          img.alt = '';
          img.style.display = 'block';

          if (selfMember) {
            Object(_utils_addClass__WEBPACK_IMPORTED_MODULE_2__["default"])(lbWrapper, 'cl-widget-ms-default-mem-self');
          }

          Object(_utils_query__WEBPACK_IMPORTED_MODULE_1__["default"])(lbWrapper, '.cl-widget-ms-default-mem-label').innerHTML = selfMember ? 'YOU' : '';
          Object(_utils_query__WEBPACK_IMPORTED_MODULE_1__["default"])(lbWrapper, '.cl-widget-ms-default-mem-rank').innerHTML = "<span class='cl-mem-rank-label'>" + _this.settings.lbWidget.settings.translation.leaderboard.rank + "</span><span class='cl-mem-rank'>" + lbRankingEntry.rank + '</span>';
          Object(_utils_query__WEBPACK_IMPORTED_MODULE_1__["default"])(lbWrapper, '.cl-widget-ms-default-mem-points').innerHTML = "<span class='cl-mem-points-label'>" + _this.settings.lbWidget.settings.translation.leaderboard.points + "</span><span class='cl-mem-points'>" + lbRankingEntry.points + '</span>';
          scoreArea.appendChild(lbWrapper);
        }); // testLive = true;
        //  var lastScore = query(_this.settings.container, ".cl-widget-ms-default-last-score").innerHTML,
        //  highScore = query(_this.settings.container, ".cl-widget-ms-default-high-score").innerHTML,
        //  rank = query(_this.settings.container, ".cl-widget-ms-default-rank-value"),
        //  change = (lbEntry.change < 0) ? "down" : ( lbEntry.change > 0 ? "up" : "same" ),
        //  rankValue = lbEntry.rank;
        //
        // if( lastScore !== String(lbEntry.points) && String(lbEntry.points) !== highScore ){
        //  query(_this.settings.container, ".cl-widget-ms-default-last-score").innerHTML = highScore;
        // }
        //
        // query(_this.settings.container, ".cl-widget-ms-default-high-score").innerHTML = lbEntry.points;
        //
        // removeClass(rank, "cl-ms-rank-up");
        // removeClass(rank, "cl-ms-rank-down");
        // removeClass(rank, "cl-ms-rank-same");
        //
        // addClass(rank, "cl-ms-rank-" + change);
        //
        // rank.innerHTML = rankValue;
      }
    });

    if (inverse && !Object(_utils_hasClass__WEBPACK_IMPORTED_MODULE_3__["default"])(defaultDomObj, 'cl-inverse')) {
      Object(_utils_addClass__WEBPACK_IMPORTED_MODULE_2__["default"])(defaultDomObj, 'cl-inverse');
    }
  };

  this.layoutFirstToOrEmpty = function (strategy) {
    var _this = this;

    var timeManagement = _this.timeManagement(); // var diff = timeManagement.diff;


    var label = timeManagement.label;
    var date = timeManagement.date;
    var dateObj = timeManagement.dateObj;
    var wrapperDomObj = _this.settings.infoContainer;
    var defaultDomObj = Object(_utils_query__WEBPACK_IMPORTED_MODULE_1__["default"])(_this.settings.container, '.cl-widget-ms-first-to-wrapper');
    var inverse = timeManagement.inverse;

    if (defaultDomObj === null) {
      _this.removeUnusedElements();

      Object(_utils_addClass__WEBPACK_IMPORTED_MODULE_2__["default"])(_this.settings.container, 'cl-ms-first-to-style');
      var lbWrapper = document.createElement('div');
      var lbDateWrapper = document.createElement('div');
      var lbDateLabel = document.createElement('div');
      var lbDate = document.createElement('div');
      var lbResultsWrapper = document.createElement('div');
      var lbResultsList = document.createElement('div');
      var lbHeaders = document.createElement('div');
      var lbHeadersRank = document.createElement('div');
      var lbHeadersPoints = document.createElement('div');

      var lbResultsMemEntry = _this.layoutFirstToOrEmptyEntry();

      var img = Object(_utils_query__WEBPACK_IMPORTED_MODULE_1__["default"])(lbResultsMemEntry, '.cl-widget-ms-first-to-mem-img');
      lbWrapper.setAttribute('class', 'cl-widget-ms-first-to-wrapper');
      lbDateLabel.setAttribute('class', 'cl-widget-ms-first-to-date-label');
      lbDate.setAttribute('class', 'cl-widget-ms-first-to-date');
      lbDateWrapper.setAttribute('class', 'cl-widget-ms-first-to-date-wrapper');
      lbResultsWrapper.setAttribute('class', 'cl-widget-ms-first-to-results-wrapper');
      lbResultsList.setAttribute('class', 'cl-widget-ms-first-to-results-list');
      lbHeaders.setAttribute('class', 'cl-widget-ms-first-to-results-headers');
      lbHeadersRank.setAttribute('class', 'cl-widget-ms-first-to-results-header-rank');
      lbHeadersPoints.setAttribute('class', 'cl-widget-ms-first-to-results-header-points');
      lbResultsMemEntry.setAttribute('class', 'cl-widget-ms-first-to-mem-entry'); // lbDateLabel.innerHTML = label;

      lbDate.innerHTML = dateObj;
      lbDateWrapper.appendChild(lbDateLabel);
      lbDateWrapper.appendChild(lbDate);
      Object(_utils_query__WEBPACK_IMPORTED_MODULE_1__["default"])(lbResultsMemEntry, '.cl-widget-ms-first-to-mem-rank').innerHTML = '--';
      Object(_utils_query__WEBPACK_IMPORTED_MODULE_1__["default"])(lbResultsMemEntry, '.cl-widget-ms-first-to-mem-points').innerHTML = '--/' + strategy.recordTimeWhenSumReaches;
      img.src = '';
      img.alt = '';
      img.style.display = 'block';
      lbHeadersRank.innerHTML = _this.settings.lbWidget.settings.translation.leaderboard.rank;
      lbHeadersPoints.innerHTML = _this.settings.lbWidget.settings.translation.leaderboard.points;
      lbHeaders.appendChild(lbHeadersRank);
      lbHeaders.appendChild(lbHeadersPoints);
      lbResultsList.appendChild(lbResultsMemEntry);
      lbResultsWrapper.appendChild(lbHeaders);
      lbResultsWrapper.appendChild(lbResultsList);
      lbWrapper.appendChild(lbDateWrapper);
      lbWrapper.appendChild(lbResultsWrapper);
      defaultDomObj = wrapperDomObj.appendChild(lbWrapper);
      setTimeout(function () {
        Object(_utils_addClass__WEBPACK_IMPORTED_MODULE_2__["default"])(wrapperDomObj, 'cl-show');
      }, 200);
    } else {
      if (!Object(_utils_hasClass__WEBPACK_IMPORTED_MODULE_3__["default"])(wrapperDomObj, 'cl-show')) {
        Object(_utils_addClass__WEBPACK_IMPORTED_MODULE_2__["default"])(wrapperDomObj, 'cl-show');
      }

      Object(_utils_query__WEBPACK_IMPORTED_MODULE_1__["default"])(_this.settings.container, '.cl-widget-ms-first-to-date-label').innerHTML = label;
      Object(_utils_query__WEBPACK_IMPORTED_MODULE_1__["default"])(_this.settings.container, '.cl-widget-ms-first-to-date').innerHTML = date;
    }

    window.mapObject(_this.settings.lbWidget.settings.leaderboard.leaderboardData, function (lbEntry) {
      if ((lbEntry.memberRefId === _this.settings.lbWidget.settings.memberId || lbEntry.memberId === _this.settings.lbWidget.settings.memberId) && typeof lbEntry.rankings !== 'undefined') {
        var scoreArea = Object(_utils_query__WEBPACK_IMPORTED_MODULE_1__["default"])(defaultDomObj, '.cl-widget-ms-first-to-results-list');
        scoreArea.innerHTML = '';
        Object(_utils_query__WEBPACK_IMPORTED_MODULE_1__["default"])(_this.settings.container, '.cl-widget-ms-first-to-date-label').innerHTML = '';
        Object(_utils_query__WEBPACK_IMPORTED_MODULE_1__["default"])(_this.settings.container, '.cl-widget-ms-first-to-date').innerHTML = dateObj;
        Object(_utils_addClass__WEBPACK_IMPORTED_MODULE_2__["default"])(Object(_utils_query__WEBPACK_IMPORTED_MODULE_1__["default"])(_this.settings.container, '.cl-widget-ms-first-to-date-wrapper'), 'cl-widget-ms-first-to-date-only');
        window.mapObject(lbEntry.rankings, function (lbRankingEntry) {
          var icon = _this.settings.lbWidget.populateIdenticonBase64Image(lbRankingEntry.memberId);

          var lbWrapper = _this.layoutFirstToOrEmptyEntry();

          var img = Object(_utils_query__WEBPACK_IMPORTED_MODULE_1__["default"])(lbWrapper, '.cl-widget-ms-first-to-mem-img');
          var selfMember = lbRankingEntry.memberRefId === _this.settings.lbWidget.settings.memberId || lbRankingEntry.memberId === _this.settings.lbWidget.settings.memberId;

          if (selfMember) {
            Object(_utils_addClass__WEBPACK_IMPORTED_MODULE_2__["default"])(lbWrapper, 'cl-widget-ms-first-to-mem-self');
          }

          img.src = icon;
          img.alt = '';
          img.style.display = 'block';
          Object(_utils_query__WEBPACK_IMPORTED_MODULE_1__["default"])(lbWrapper, '.cl-widget-ms-first-to-mem-label').innerHTML = selfMember ? 'YOU' : '';
          Object(_utils_query__WEBPACK_IMPORTED_MODULE_1__["default"])(lbWrapper, '.cl-widget-ms-first-to-mem-rank').innerHTML = "<span class='cl-mem-rank-label'>" + _this.settings.lbWidget.settings.translation.leaderboard.rank + "</span><span class='cl-mem-rank'>" + lbRankingEntry.rank + '</span>';
          Object(_utils_query__WEBPACK_IMPORTED_MODULE_1__["default"])(lbWrapper, '.cl-widget-ms-first-to-mem-points').innerHTML = "<span class='cl-mem-points-label'>" + _this.settings.lbWidget.settings.translation.leaderboard.points + "</span><span class='cl-mem-points'>" + lbRankingEntry.points + '/' + strategy.recordTimeWhenSumReaches + '</span>';
          scoreArea.appendChild(lbWrapper);
        });
      }
    });

    if (inverse && !Object(_utils_hasClass__WEBPACK_IMPORTED_MODULE_3__["default"])(defaultDomObj, 'cl-inverse')) {
      Object(_utils_addClass__WEBPACK_IMPORTED_MODULE_2__["default"])(defaultDomObj, 'cl-inverse');
    }
  };

  this.layoutSumBestOf = function () {
    var _this = this;

    var timeManagement = _this.timeManagement(); // var diff = timeManagement.diff;


    var label = timeManagement.label;
    var date = timeManagement.date;
    var wrapperDomObj = _this.settings.infoContainer;
    var sumBestDomObj = Object(_utils_query__WEBPACK_IMPORTED_MODULE_1__["default"])(_this.settings.container, '.cl-widget-ms-sum-best-wrapper');
    var inverse = timeManagement.inverse;

    if (sumBestDomObj === null) {
      _this.removeUnusedElements();

      var lbWrapper = document.createElement('div');
      var lbDateWrapper = document.createElement('div');
      var lbDateLabel = document.createElement('div');
      var lbDate = document.createElement('div');
      var lbResultsWrapper = document.createElement('div');
      var lbResultsScoreArea = document.createElement('div');
      var lbResultsScoreAreaHigh = document.createElement('div');
      var lbResultsScoreAreaHighLabel = document.createElement('div');
      var lbResultsScoreAreaHighScore = document.createElement('div');
      var lbResultsScoreAreaLast = document.createElement('div');
      var lbResultsScoreAreaLastLabel = document.createElement('div');
      var lbResultsScoreAreaLastScore = document.createElement('div');
      var lbResultsRankArea = document.createElement('div');
      var lbResultsRankValue = document.createElement('span');
      lbWrapper.setAttribute('class', 'cl-widget-ms-sum-best-wrapper');
      lbDateLabel.setAttribute('class', 'cl-widget-ms-sum-best-date-label');
      lbDate.setAttribute('class', 'cl-widget-ms-sum-best-date');
      lbDateWrapper.setAttribute('class', 'cl-widget-ms-sum-best-date-wrapper');
      lbResultsWrapper.setAttribute('class', 'cl-widget-ms-sum-best-results-wrapper');
      lbResultsScoreArea.setAttribute('class', 'cl-widget-ms-sum-best-area');
      lbResultsScoreAreaHigh.setAttribute('class', 'cl-widget-ms-sum-best-high-area');
      lbResultsScoreAreaHighLabel.setAttribute('class', 'cl-widget-ms-sum-best-high-label');
      lbResultsScoreAreaHighScore.setAttribute('class', 'cl-widget-ms-sum-best-high-score');
      lbResultsScoreAreaLast.setAttribute('class', 'cl-widget-ms-sum-best-last-area');
      lbResultsScoreAreaLastLabel.setAttribute('class', 'cl-widget-ms-sum-best-last-label');
      lbResultsScoreAreaLastScore.setAttribute('class', 'cl-widget-ms-sum-best-last-score');
      lbResultsRankArea.setAttribute('class', 'cl-widget-ms-sum-best-rank-area');
      lbResultsRankValue.setAttribute('class', 'cl-widget-ms-sum-best-rank-value');
      lbDateLabel.innerHTML = label;
      lbDate.innerHTML = date;
      lbResultsScoreAreaHighLabel.innerHTML = _this.settings.lbWidget.settings.translation.miniLeaderboard.highScore;
      lbResultsScoreAreaHighScore.innerHTML = '--';
      lbResultsScoreAreaHigh.appendChild(lbResultsScoreAreaHighLabel);
      lbResultsScoreAreaHigh.appendChild(lbResultsScoreAreaHighScore);
      lbResultsScoreArea.appendChild(lbResultsScoreAreaHigh);
      lbResultsScoreAreaLastLabel.innerHTML = _this.settings.lbWidget.settings.translation.miniLeaderboard.lastScore;
      lbResultsScoreAreaLastScore.innerHTML = '--';
      lbResultsScoreAreaLast.appendChild(lbResultsScoreAreaLastLabel);
      lbResultsScoreAreaLast.appendChild(lbResultsScoreAreaLastScore);
      lbResultsScoreArea.appendChild(lbResultsScoreAreaLast);
      lbResultsRankValue.innerHTML = '--';
      lbResultsRankArea.appendChild(lbResultsRankValue);
      lbResultsWrapper.appendChild(lbResultsScoreArea);
      lbResultsWrapper.appendChild(lbResultsRankArea);
      lbDateWrapper.appendChild(lbDateLabel);
      lbDateWrapper.appendChild(lbDate);
      lbWrapper.appendChild(lbDateWrapper);
      lbWrapper.appendChild(lbResultsWrapper);
      sumBestDomObj = wrapperDomObj.appendChild(lbWrapper);
      setTimeout(function () {
        Object(_utils_addClass__WEBPACK_IMPORTED_MODULE_2__["default"])(wrapperDomObj, 'cl-show');
      }, 200);
    } else {
      if (!Object(_utils_hasClass__WEBPACK_IMPORTED_MODULE_3__["default"])(wrapperDomObj, 'cl-show')) {
        Object(_utils_addClass__WEBPACK_IMPORTED_MODULE_2__["default"])(wrapperDomObj, 'cl-show');
      }

      Object(_utils_query__WEBPACK_IMPORTED_MODULE_1__["default"])(_this.settings.container, '.cl-widget-ms-sum-best-date-label').innerHTML = label;
      Object(_utils_query__WEBPACK_IMPORTED_MODULE_1__["default"])(_this.settings.container, '.cl-widget-ms-sum-best-date').innerHTML = date;
    }

    window.mapObject(_this.settings.lbWidget.settings.leaderboard.leaderboardData, function (lbEntry) {
      if (lbEntry.memberRefId === _this.settings.lbWidget.settings.memberId || lbEntry.memberId === _this.settings.lbWidget.settings.memberId) {
        var lastScore = Object(_utils_query__WEBPACK_IMPORTED_MODULE_1__["default"])(_this.settings.container, '.cl-widget-ms-sum-best-last-score').innerHTML;
        var highScore = Object(_utils_query__WEBPACK_IMPORTED_MODULE_1__["default"])(_this.settings.container, '.cl-widget-ms-sum-best-high-score').innerHTML;
        var rank = Object(_utils_query__WEBPACK_IMPORTED_MODULE_1__["default"])(_this.settings.container, '.cl-widget-ms-sum-best-rank-value');
        var change = lbEntry.change < 0 ? 'down' : lbEntry.change > 0 ? 'up' : 'same';
        var rankValue = lbEntry.rank;

        if (lastScore !== String(lbEntry.points) && String(lbEntry.points) !== highScore) {
          Object(_utils_query__WEBPACK_IMPORTED_MODULE_1__["default"])(_this.settings.container, '.cl-widget-ms-sum-best-last-score').innerHTML = highScore;
        }

        Object(_utils_query__WEBPACK_IMPORTED_MODULE_1__["default"])(_this.settings.container, '.cl-widget-ms-sum-best-high-score').innerHTML = lbEntry.points;
        Object(_utils_removeClass__WEBPACK_IMPORTED_MODULE_4__["default"])(rank, 'cl-ms-rank-up');
        Object(_utils_removeClass__WEBPACK_IMPORTED_MODULE_4__["default"])(rank, 'cl-ms-rank-down');
        Object(_utils_removeClass__WEBPACK_IMPORTED_MODULE_4__["default"])(rank, 'cl-ms-rank-same');
        Object(_utils_addClass__WEBPACK_IMPORTED_MODULE_2__["default"])(rank, 'cl-ms-rank-' + change);
        rank.innerHTML = rankValue;
      }
    });

    if (inverse && !Object(_utils_hasClass__WEBPACK_IMPORTED_MODULE_3__["default"])(sumBestDomObj, 'cl-inverse')) {
      Object(_utils_addClass__WEBPACK_IMPORTED_MODULE_2__["default"])(sumBestDomObj, 'cl-inverse');
    }
  };

  this.layoutRequiresOptIn = function () {
    var _this = this;

    var diff = moment__WEBPACK_IMPORTED_MODULE_0___default()(_this.settings.lbWidget.settings.competition.activeCompetition.scheduledStart).diff(moment__WEBPACK_IMPORTED_MODULE_0___default()());
    var label = 'Starting In';
    var wrapperDomObj = _this.settings.infoContainer;

    var date = _this.settings.lbWidget.formatDateTime(moment__WEBPACK_IMPORTED_MODULE_0___default.a.duration(diff));

    if (diff < 0 && _this.settings.lbWidget.settings.competition.activeContest.statusCode === 0) {
      label = 'starting';
      date = '';
    } else if (_this.settings.lbWidget.settings.competition.activeContest.statusCode > 0 && _this.settings.lbWidget.settings.competition.activeContest.statusCode < 3) {
      diff = moment__WEBPACK_IMPORTED_MODULE_0___default()(_this.settings.lbWidget.settings.competition.activeContest.scheduledEnd).diff(moment__WEBPACK_IMPORTED_MODULE_0___default()());
      label = 'started';
      date = _this.settings.lbWidget.formatDateTime(moment__WEBPACK_IMPORTED_MODULE_0___default.a.duration(diff));
    } else if (_this.settings.lbWidget.settings.competition.activeContest.statusCode === 3) {
      label = 'finishing';
      date = '';
    } else if (_this.settings.lbWidget.settings.competition.activeContest.statusCode >= 4) {
      label = 'finished';
      date = '';
    }

    if (Object(_utils_query__WEBPACK_IMPORTED_MODULE_1__["default"])(_this.settings.container, '.cl-widget-ms-optin-wrapper') === null) {
      _this.removeUnusedElements();

      var optInWrapper = document.createElement('div');
      var optInDateWrapper = document.createElement('div');
      var optInDateLabel = document.createElement('div');
      var optInDate = document.createElement('div');
      var optInDateActionWrapper = document.createElement('div');
      var optInDateAction = document.createElement('a');
      optInWrapper.setAttribute('class', 'cl-widget-ms-optin-wrapper');
      optInDateLabel.setAttribute('class', 'cl-widget-ms-optin-date-label');
      optInDate.setAttribute('class', 'cl-widget-ms-optin-date');
      optInDateWrapper.setAttribute('class', 'cl-widget-ms-optin-date-wrapper');
      optInDateActionWrapper.setAttribute('class', 'cl-widget-ms-optin-action-wrapper');
      optInDateAction.setAttribute('class', 'cl-widget-ms-optin-action');
      optInDateLabel.innerHTML = label;
      optInDate.innerHTML = date;
      optInDateAction.innerHTML = _this.settings.lbWidget.settings.translation.tournaments.enter;
      optInDateWrapper.appendChild(optInDateLabel);
      optInDateWrapper.appendChild(optInDate);
      optInDateActionWrapper.appendChild(optInDateAction);
      optInWrapper.appendChild(optInDateWrapper);
      optInWrapper.appendChild(optInDateActionWrapper);
      wrapperDomObj.appendChild(optInWrapper);
      setTimeout(function () {
        Object(_utils_addClass__WEBPACK_IMPORTED_MODULE_2__["default"])(wrapperDomObj, 'cl-show');
      }, 200);
    } else {
      if (!Object(_utils_hasClass__WEBPACK_IMPORTED_MODULE_3__["default"])(wrapperDomObj, 'cl-show')) {
        Object(_utils_addClass__WEBPACK_IMPORTED_MODULE_2__["default"])(wrapperDomObj, 'cl-show');
      }

      Object(_utils_query__WEBPACK_IMPORTED_MODULE_1__["default"])(_this.settings.container, '.cl-widget-ms-optin-date-label').innerHTML = label;
      Object(_utils_query__WEBPACK_IMPORTED_MODULE_1__["default"])(_this.settings.container, '.cl-widget-ms-optin-date').innerHTML = date;
    }
  };

  this.removeUnusedElements = function () {
    var _this = this;

    var defaultLayoutWrapperDomObj = Object(_utils_query__WEBPACK_IMPORTED_MODULE_1__["default"])(_this.settings.container, '.cl-widget-ms-default-wrapper');
    var optInWrapperDomObj = Object(_utils_query__WEBPACK_IMPORTED_MODULE_1__["default"])(_this.settings.container, '.cl-widget-ms-optin-wrapper');
    var sumBestDomObj = Object(_utils_query__WEBPACK_IMPORTED_MODULE_1__["default"])(_this.settings.container, '.cl-widget-ms-sum-best-wrapper');
    var firstToDomObj = Object(_utils_query__WEBPACK_IMPORTED_MODULE_1__["default"])(_this.settings.container, '.cl-widget-ms-first-to-wrapper');
    Object(_utils_removeClass__WEBPACK_IMPORTED_MODULE_4__["default"])(_this.settings.container, 'cl-ms-default-style');
    Object(_utils_removeClass__WEBPACK_IMPORTED_MODULE_4__["default"])(_this.settings.container, 'cl-ms-optin-style');
    Object(_utils_removeClass__WEBPACK_IMPORTED_MODULE_4__["default"])(_this.settings.container, 'cl-ms-sum-best-style');
    Object(_utils_removeClass__WEBPACK_IMPORTED_MODULE_4__["default"])(_this.settings.container, 'cl-ms-first-to-style');

    if (defaultLayoutWrapperDomObj !== null) {
      Object(_utils_remove__WEBPACK_IMPORTED_MODULE_5__["default"])(defaultLayoutWrapperDomObj);
    }

    if (optInWrapperDomObj !== null) {
      Object(_utils_remove__WEBPACK_IMPORTED_MODULE_5__["default"])(optInWrapperDomObj);
    }

    if (sumBestDomObj !== null) {
      Object(_utils_remove__WEBPACK_IMPORTED_MODULE_5__["default"])(sumBestDomObj);
    }

    if (firstToDomObj !== null) {
      Object(_utils_remove__WEBPACK_IMPORTED_MODULE_5__["default"])(firstToDomObj);
    }
  };

  this.clearAll = function () {
    var _this = this;

    if (_this.settings.updateInterval) {
      clearTimeout(_this.settings.updateInterval);
    }

    _this.removeInfoArea();

    _this.settings.active = false;
  };

  this.removeInfoArea = function () {
    var _this = this;

    var wrapperDomObj = Object(_utils_query__WEBPACK_IMPORTED_MODULE_1__["default"])(_this.settings.container, '.cl-show');
    var layout = Object(_utils_query__WEBPACK_IMPORTED_MODULE_1__["default"])(_this.settings.container, '.cl-widget-ms-default-wrapper');
    if (wrapperDomObj !== null) Object(_utils_removeClass__WEBPACK_IMPORTED_MODULE_4__["default"])(wrapperDomObj, 'cl-show');

    if (layout !== null) {
      setTimeout(function () {
        Object(_utils_remove__WEBPACK_IMPORTED_MODULE_5__["default"])(layout);
      }, 300);
    }
  };

  this.updateScoreBoard = function () {
    var _this = this;

    if (_this.settings.updateInterval) {
      clearTimeout(_this.settings.updateInterval);
    }

    _this.settings.updateInterval = setTimeout(function () {
      _this.loadInfoArea(function () {
        _this.updateScoreBoard();
      });
    }, _this.settings.updateIntervalTime);
  };

  this.loadInfoArea = function (callback) {
    var _this = this;

    if (_this.settings.active && _this.settings.lbWidget.settings.competition.activeCompetition !== null && _this.settings.lbWidget.settings.competition.activeCompetition.statusCode < 7) {
      if (typeof _this.settings.lbWidget.settings.competition.activeCompetition.optin === 'boolean' && !_this.settings.lbWidget.settings.competition.activeCompetition.optin) {
        _this.layoutRequiresOptIn();

        callback();
      } else if (_this.settings.lbWidget.settings.competition.activeContest !== null && _this.settings.lbWidget.settings.competition.activeContest.strategy.type === 'SumBest') {
        _this.layoutSumBestOf();

        callback();
      } else if (_this.settings.lbWidget.settings.competition.activeContest !== null && _this.settings.lbWidget.settings.competition.activeContest.strategy.type === 'FirstTo') {
        _this.layoutFirstToOrEmpty(_this.settings.lbWidget.settings.competition.activeContest.strategy);

        callback();
      } else if (_this.settings.lbWidget.settings.competition.activeContestId !== null) {
        _this.layoutDefaultOrEmpty();

        callback();
      } else {
        _this.layoutDefaultOrEmpty();
      }
    } else {
      _this.clearAll();
    }
  };

  this.eventListeners = function () {
    var _this = this;

    Object(_dragElement__WEBPACK_IMPORTED_MODULE_6__["default"])(_this.settings.container, Object(_utils_query__WEBPACK_IMPORTED_MODULE_1__["default"])(_this.settings.container, '.cl-widget-ms-icon'), _this.settings.overlayContainer, _this.settings.lbWidget.settings.bindContainer, function (newTop, newLeft) {
      _this.settings.lbWidget.stopActivity();

      if (newTop <= 5) {
        Object(_utils_addClass__WEBPACK_IMPORTED_MODULE_2__["default"])(_this.settings.container, 'cl-vertical-mini');
      } else if (newLeft <= 5) {
        Object(_utils_removeClass__WEBPACK_IMPORTED_MODULE_4__["default"])(_this.settings.container, 'cl-vertical-mini');
      }

      _this.settings.dragging = true;
    }, function () {
      _this.settings.lbWidget.restartActivity();

      setTimeout(function () {
        _this.settings.dragging = false;
      }, 200);
    }, function () {
      _this.settings.lbWidget.clickedMiniScoreBoard();
    });
  };

  this.initLayout = function (callback) {
    var _this = this;

    if (_this.settings.container === null) {
      _this.settings.active = true;
      _this.settings.container = _this.settings.lbWidget.settings.bindContainer.appendChild(_this.layout());
      _this.settings.overlayContainer = _this.settings.lbWidget.settings.bindContainer.appendChild(_this.overlayLayout());
      _this.settings.infoContainer = Object(_utils_query__WEBPACK_IMPORTED_MODULE_1__["default"])(_this.settings.container, '.cl-widget-ms-information-wrapper');

      _this.eventListeners();
    }

    if (typeof callback === 'function') {
      callback();
    }
  };

  this.loadScoreBoard = function () {
    var _this = this;

    _this.initLayout(function () {
      _this.loadInfoArea(function () {
        _this.updateScoreBoard();
      });

      setTimeout(function () {
        _this.updateScoreBoard();
      }, 1000);
    });
  };
};

/***/ }),

/***/ "./src/javascript/modules/Notifications.js":
/*!*************************************************!*\
  !*** ./src/javascript/modules/Notifications.js ***!
  \*************************************************/
/*! exports provided: Notifications */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Notifications", function() { return Notifications; });
/* harmony import */ var _Messaging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Messaging */ "./src/javascript/modules/Messaging.js");
/* harmony import */ var _utils_removeClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/removeClass */ "./src/javascript/utils/removeClass.js");
/* harmony import */ var _utils_query__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/query */ "./src/javascript/utils/query.js");
/* harmony import */ var _utils_stripHtml__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/stripHtml */ "./src/javascript/utils/stripHtml.js");
/* harmony import */ var _utils_addClass__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/addClass */ "./src/javascript/utils/addClass.js");





var Notifications = function Notifications(options) {
  this.settings = {
    container: null,
    detailsContainer: null,
    lbWidget: null,
    eventStream: [],
    checkTimeout: 2000,
    onDisplayCheckTimeout: 10000,
    checkInterval: null,
    autoNotificationHideInterval: null,
    autoNotificationHideTime: 10000,
    displayInProgress: false
  };

  if (typeof options !== 'undefined') {
    for (var opt in options) {
      if (options.hasOwnProperty(opt)) {
        this.settings[opt] = options[opt];
      }
    }
  }

  this.layoutWrapper = function () {
    var wrapper = document.createElement('div');
    var iconWrapper = document.createElement('div');
    var icon = document.createElement('div');
    var informationWrapper = document.createElement('div');
    var informationTopWrapper = document.createElement('div');
    var informationDetailsContainer = document.createElement('div');
    var informationDetailsLabel = document.createElement('div');
    var informationDetailsDescription = document.createElement('div');
    var informationWrapperClose = document.createElement('div');
    var informationClose = document.createElement('a');
    wrapper.setAttribute('class', 'cl-widget-notif-wrapper');
    iconWrapper.setAttribute('class', 'cl-widget-notif-icon-wrapper');
    icon.setAttribute('class', 'cl-widget-notif-icon');
    informationTopWrapper.setAttribute('class', 'cl-widget-notif-information-top-wrapper');
    informationWrapper.setAttribute('class', 'cl-widget-notif-information-wrapper');
    informationDetailsContainer.setAttribute('class', 'cl-widget-notif-information-details-wrapper');
    informationDetailsLabel.setAttribute('class', 'cl-widget-notif-information-details-label');
    informationDetailsDescription.setAttribute('class', 'cl-widget-notif-information-details-description');
    informationWrapperClose.setAttribute('class', 'cl-widget-notif-information-close-wrapper');
    informationClose.setAttribute('class', 'cl-widget-notif-information-close');
    informationClose.href = 'javascript:void(0);';
    informationClose.innerHTML = 'x';
    informationDetailsContainer.appendChild(informationDetailsLabel);
    informationDetailsContainer.appendChild(informationDetailsDescription);
    informationWrapperClose.appendChild(informationClose);
    informationWrapper.appendChild(informationWrapperClose);
    informationWrapper.appendChild(informationDetailsContainer);
    informationTopWrapper.appendChild(informationWrapper);
    iconWrapper.appendChild(icon);
    wrapper.appendChild(iconWrapper);
    wrapper.appendChild(informationTopWrapper);
    return wrapper;
  };

  var processed = {};

  this.startSSE = function () {
    var _this = this;

    _this.settings.sseInstance = new _Messaging__WEBPACK_IMPORTED_MODULE_0__["Messaging"]({
      sseUrl: _this.settings.lbWidget.settings.uri.gatewayDomain + _this.settings.lbWidget.settings.uri.memberSSE.replace(':space', _this.settings.lbWidget.settings.spaceName).replace(':id', _this.settings.lbWidget.settings.memberId),
      heartbeat: _this.settings.lbWidget.settings.uri.gatewayDomain + _this.settings.lbWidget.settings.uri.memberSSEHeartbeat.replace(':space', _this.settings.lbWidget.settings.spaceName).replace(':id', _this.settings.lbWidget.settings.memberId),
      ajax: {
        url: null,
        apiKey: {
          'X-API-KEY': _this.settings.lbWidget.settings.apiKey
        }
      },
      callback: function callback(data) {
        var dataKey = JSON.stringify(data);
        var currentTime = new Date().getTime();

        if (typeof processed[dataKey] === 'undefined' || typeof processed[dataKey] !== 'undefined' && processed[dataKey] + 10000 < currentTime) {
          processed[JSON.stringify(data)] = currentTime;

          _this.settings.eventStream.push(data);
        }
      },
      onStartupError: function onStartupError(settings) {},
      debug: true
    });
  };

  this.autoNotificationHide = function () {
    var _this = this;

    if (_this.settings.autoNotificationHideInterval) {
      clearTimeout(_this.settings.autoNotificationHideInterval);
    }

    _this.settings.autoNotificationHideInterval = setTimeout(function () {
      _this.hideNotification();
    }, _this.settings.autoNotificationHideTime);
  };

  this.hideNotification = function () {
    var _this = this;

    if (_this.settings.autoNotificationHideInterval) {
      clearTimeout(_this.settings.autoNotificationHideInterval);
    }

    _this.settings.displayInProgress = false;
    Object(_utils_removeClass__WEBPACK_IMPORTED_MODULE_1__["default"])(Object(_utils_query__WEBPACK_IMPORTED_MODULE_2__["default"])(_this.settings.container, '.cl-widget-notif-information-wrapper'), 'cl-show');
    setTimeout(function () {
      _this.settings.container.style.display = 'none';
    }, 200);
  };

  this.showAchievementNotification = function (data) {
    var _this = this;

    var label = Object(_utils_query__WEBPACK_IMPORTED_MODULE_2__["default"])(_this.settings.detailsContainer, '.cl-widget-notif-information-details-label');
    var description = Object(_utils_query__WEBPACK_IMPORTED_MODULE_2__["default"])(_this.settings.detailsContainer, '.cl-widget-notif-information-details-description');
    var descriptionText = Object(_utils_stripHtml__WEBPACK_IMPORTED_MODULE_3__["default"])(data.data.description);
    label.innerHTML = data.data.name.length > 23 ? data.data.name.substr(0, 23) + '...' : data.data.name;
    description.innerHTML = descriptionText.length > 60 ? descriptionText.substr(0, 60) + '...' : descriptionText;
    _this.settings.detailsContainer.dataset.id = data.data.id;
    _this.settings.container.style.display = 'block';
    setTimeout(function () {
      Object(_utils_addClass__WEBPACK_IMPORTED_MODULE_4__["default"])(Object(_utils_query__WEBPACK_IMPORTED_MODULE_2__["default"])(_this.settings.container, '.cl-widget-notif-information-wrapper'), 'cl-show');
    }, 200);

    _this.autoNotificationHide();
  };

  this.eventStreamCheck = function () {
    var _this = this;

    if (_this.settings.checkInterval) {
      clearTimeout(_this.settings.checkInterval);
    }

    if (_this.settings.eventStream.length > 0 && !_this.settings.displayInProgress) {
      var data = _this.settings.eventStream[0];

      var index = _this.settings.eventStream.indexOf(data);

      if (typeof data.achievementId !== 'undefined') {
        _this.settings.displayInProgress = true;

        _this.settings.lbWidget.getAchievement(data.achievementId, function (data) {
          _this.showAchievementNotification(data);

          _this.settings.checkInterval = setTimeout(function () {
            _this.eventStreamCheck();
          }, _this.settings.onDisplayCheckTimeout);
        });

        _this.settings.eventStream.splice(index, 1);
      } else if (typeof data.notificationId !== 'undefined') {
        _this.settings.checkInterval = setTimeout(function () {
          _this.eventStreamCheck();
        }, _this.settings.checkTimeout);
      } else {
        _this.settings.checkInterval = setTimeout(function () {
          _this.eventStreamCheck();
        }, _this.settings.checkTimeout);
      }

      if (index > -1) {
        _this.settings.eventStream.splice(index, 1);
      }
    } else {
      _this.settings.checkInterval = setTimeout(function () {
        _this.eventStreamCheck();
      }, _this.settings.checkTimeout);
    }
  };

  this.init = function () {
    var _this = this;

    if (_this.settings.container === null) {
      _this.startSSE();

      _this.settings.container = _this.settings.lbWidget.settings.bindContainer.appendChild(_this.layoutWrapper());
      _this.settings.detailsContainer = Object(_utils_query__WEBPACK_IMPORTED_MODULE_2__["default"])(_this.settings.container, '.cl-widget-notif-information-details-wrapper');
    } else {
      // terminate SSE
      _this.settings.sseInstance.closeChanel(); // update the member


      _this.settings.sseInstance.settings.sseUrl = _this.settings.lbWidget.settings.uri.gatewayDomain + _this.settings.lbWidget.settings.uri.memberSSE.replace(':space', _this.settings.lbWidget.settings.spaceName).replace(':id', _this.settings.lbWidget.settings.memberId);
      _this.settings.sseInstance.settings.heartbeat = _this.settings.lbWidget.settings.uri.gatewayDomain + _this.settings.lbWidget.settings.uri.memberSSEHeartbeat.replace(':space', _this.settings.lbWidget.settings.spaceName).replace(':id', _this.settings.lbWidget.settings.memberId); // re-instantiate SSE

      _this.settings.sseInstance.openChanel();
    }

    _this.eventStreamCheck();
  };
};

/***/ }),

/***/ "./src/javascript/modules/cLabs.js":
/*!*****************************************!*\
  !*** ./src/javascript/modules/cLabs.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// default domain
// var apiURL = "http://192.168.1.8:9998";
var apiURL = 'https://gateway.competitionlabs.com';
var cLabs = {
  api: {
    url: apiURL
  },
  classSelector: /^\.([\w-]+)$/,
  // class string expression check
  idSelector: /^#[\w\d\-\_\&\!\@\*]+$/,
  // ID string expression check
  tagSelector: /^[\w-]+$/ // TAG string expression check

};
/* harmony default export */ __webpack_exports__["default"] = (cLabs);

/***/ }),

/***/ "./src/javascript/modules/dragElement.js":
/*!***********************************************!*\
  !*** ./src/javascript/modules/dragElement.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ "./src/javascript/utils/index.js");
 // var scrollObj2 = null;

var movementInterval;

var dragElement = function dragElement(elmnt, draggableEl, overlayContainer, container, dragging, finishDragging, mobileTouch) {
  var pos1 = 0;
  var pos2 = 0;
  var pos3 = 0;
  var pos4 = 0;
  var isMobile = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["isMobileTablet"])();
  var isiOS = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["isiOSDevice"])();
  var isParentWindow = elmnt.parentNode.nodeName === 'BODY';
  var maxLeft = isParentWindow ? window.innerWidth : container.offsetWidth;
  var maxTop = isParentWindow ? window.innerHeight : container.offsetHeight;
  var touchStart;
  var moving = null; // scrollObj2 = query(".scroll-res");

  if (movementInterval) {
    clearTimeout(movementInterval);
  }

  var onWindowChange = function onWindowChange() {
    var isVertical = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["hasClass"])(elmnt, 'cl-vertical-mini');
    var maxLeft = isParentWindow ? window.innerWidth : container.offsetWidth;
    var maxTop = isParentWindow ? window.innerHeight : container.offsetHeight;
    var offsetMaxLeft = maxLeft - parseInt(elmnt.offsetWidth + (isVertical ? draggableEl.offsetWidth / 7 : draggableEl.offsetWidth / 1.6));
    var offsetMaxTop = maxTop - parseInt(elmnt.offsetHeight + (isVertical ? draggableEl.offsetHeight / 1.2 : draggableEl.offsetHeight / 4));
    var elTop = parseInt(elmnt.style.top);
    var elLeft = parseInt(elmnt.style.left);

    if (elTop > offsetMaxTop && offsetMaxTop > 5) {
      elmnt.style.top = offsetMaxTop + 'px';
    }

    if (elLeft > offsetMaxLeft && offsetMaxLeft > 5) {
      elmnt.style.left = offsetMaxLeft + 'px';
    }
  };

  if (isMobile) {
    /* listen to the touchMove event,
      every time it fires, grab the location
      of touch and assign it to box */
    var justATouch = false;
    draggableEl.addEventListener('touchstart', function (e) {
      justATouch = true;
      if (touchStart) clearTimeout(touchStart);
      maxLeft = isParentWindow ? window.innerWidth : container.offsetWidth;
      maxTop = isParentWindow ? window.innerHeight : container.offsetHeight;
      touchStart = setTimeout(function () {
        justATouch = false;
      }, 100);
    }, {
      passive: isiOS
    });
    draggableEl.addEventListener('touchmove', function (e) {
      e.preventDefault();
      pos3 = e.targetTouches[0].pageX;
      pos4 = e.targetTouches[0].pageY; // moving = new Date().getTime();

      elementDrag(e);
    }, {
      passive: isiOS
    });
    draggableEl.addEventListener('touchend', function (e) {
      // e.preventDefault();
      // current box position.
      closeDragElement(e);
      moving = null;

      if (justATouch && typeof mobileTouch === 'function') {
        mobileTouch();
      }
    }, {
      passive: isiOS
    });
    window.addEventListener('orientationchange', function (e) {
      onWindowChange();
    }, true);
  } else {
    // if present, the header is where you move the DIV from:
    draggableEl.onmousedown = dragMouseDown;
    window.addEventListener('resize', function (e) {
      onWindowChange();
    }, true);
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    maxLeft = isParentWindow ? window.innerWidth : container.offsetWidth;
    maxTop = isParentWindow ? window.innerHeight : container.offsetHeight;
    overlayContainer.style.display = 'block'; // get the mouse cursor position at startup:

    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement; // call a function whenever the cursor moves:

    document.onmousemove = elementDrag;
  }
  /**
   * Adds additional offset to max left and top based on orientation and container width (will be affected by CSS styling so needs to be adjusted accordingly)
   * - elmnt => is the main container that has the positioning applied to
   * - draggableEl => key element that is mean for dragging
   */


  var checkMaxMinRestraints = function checkMaxMinRestraints(newTop, newLeft, offsetMaxLeft, offsetMaxTop) {
    var // minLeft = (isVertical ? elmnt.offsetWidth/4 : 0 ), // attempt to restrict the container to go out of bounds by a few pixels, needs some work
    minLeft = 0;
    var top = newTop <= 0 ? 0 : newTop;
    var left = newLeft <= minLeft ? minLeft : newLeft;

    if (left >= offsetMaxLeft) {
      left = offsetMaxLeft;
    }

    if (top >= offsetMaxTop) {
      top = offsetMaxTop;
    }

    return {
      top: top,
      left: left
    };
  };

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault(); // calculate the new cursor position:

    var posX = isMobile ? e.targetTouches[0].pageX : e.clientX;
    var posY = isMobile ? e.targetTouches[0].pageY : e.clientY;
    var isVertical = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["hasClass"])(elmnt, 'cl-vertical-mini');
    var offsetMaxLeft = maxLeft - parseInt(elmnt.offsetWidth + (isVertical ? draggableEl.offsetWidth / 7 : draggableEl.offsetWidth / 1.6));
    var offsetMaxTop = maxTop - parseInt(elmnt.offsetHeight + (isVertical ? draggableEl.offsetHeight / 1.2 : draggableEl.offsetHeight / 4));
    pos1 = pos3 - posX;
    pos2 = pos4 - posY;
    pos3 = parseInt(posX);
    pos4 = parseInt(posY);
    moving = new Date().getTime();
    checkMovement();
    if (!Object(_utils__WEBPACK_IMPORTED_MODULE_0__["hasClass"])(elmnt, 'cl-being-moved')) Object(_utils__WEBPACK_IMPORTED_MODULE_0__["addClass"])(elmnt, 'cl-being-moved');
    var newTop = isMobile ? posY - parseInt(draggableEl.offsetHeight / 2) : elmnt.offsetTop - pos2;
    var newLeft = isMobile ? posX - parseInt(draggableEl.offsetWidth / 2) : elmnt.offsetLeft - pos1;
    var leftTopCheck = checkMaxMinRestraints(newTop, newLeft, offsetMaxLeft, offsetMaxTop); // set the element's new position:
    // scrollObj2.innerHTML = leftTopCheck.top + "-" + leftTopCheck.left + " : "+ newTop + "-" + newLeft + " : " + (posX < 0 || posY < 0 || posX > maxLeft || posY > maxTop) + "-" + (newTop > offsetMaxTop || newLeft > offsetMaxLeft);
    // scrollObj2.innerHTML = leftTopCheck.top + "-" + leftTopCheck.left + " : "+ newTop +"-"+ newLeft + " : " + (posX < 0 || posY < 0 || posX > maxLeft || posY > maxTop) + "-" + (newTop > offsetMaxTop || newLeft > offsetMaxLeft);

    if (posX < 0 || posY < 0 || posX > maxLeft || posY > maxTop) {
      closeDragElement(e);
    } else if (newTop > offsetMaxTop || newLeft > offsetMaxLeft) {
      closeDragElement(e);
    } else if (leftTopCheck.top > offsetMaxTop || leftTopCheck.left > offsetMaxLeft) {
      closeDragElement(e);
    } else {
      elmnt.style.top = leftTopCheck.top + 'px';
      elmnt.style.left = leftTopCheck.left + 'px';
    }

    if (typeof dragging === 'function') dragging(newTop, newLeft);
  }

  function closeDragElement(e) {
    overlayContainer.style.display = 'none';

    if (isMobile) {
      e.preventDefault();
    } else {
      // stop moving when mouse button is released:
      document.onmouseup = null;
      document.onmousemove = null;
    }

    moving = null;
    Object(_utils__WEBPACK_IMPORTED_MODULE_0__["removeClass"])(elmnt, 'cl-being-moved');
    if (typeof finishDragging === 'function') finishDragging();
  }

  function checkMovement() {
    if (movementInterval) {
      clearTimeout(movementInterval);
    }

    movementInterval = setTimeout(function () {
      if (moving !== null && moving + 3000 < new Date().getTime() && !isMobile) {
        closeDragElement();
      } else if (moving !== null) {
        checkMovement();
      }
    }, 3000);
  }
};

/* harmony default export */ __webpack_exports__["default"] = (dragElement);

/***/ }),

/***/ "./src/javascript/modules/setTimeoutGlobal.js":
/*!****************************************************!*\
  !*** ./src/javascript/modules/setTimeoutGlobal.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// global timeout handling
try {
  if (typeof setTimeoutGlobal !== 'function') {
    window._setTimeoutGlobalRepository = [];

    window.setTimeoutGlobal = function (id, func, timer) {
      var exists = false;
      window.mapObject(window._setTimeoutGlobalRepository, function (instance, key, count) {
        if (id === instance.id) {
          exists = true;
        }
      });

      if (!exists) {
        var interval = setTimeout(function () {
          window.mapObject(window._setTimeoutGlobalRepository, function (instance, key, count) {
            if (id === instance.id) {
              window._setTimeoutGlobalRepository.splice(key, 1);
            }
          });

          if (typeof func === 'function') {
            func();
          }
        }, timer);

        window._setTimeoutGlobalRepository.push({
          id: id,
          func: func,
          timer: timer,
          interval: interval
        });

        return interval;
      } else {
        throw new Error('setTimeoutGlobal - ID [' + id + '] already in use');
      }
    };

    var closeTimeout = function closeTimeout() {
      if (window._setTimeoutGlobalRepository.length > 0) {
        window.mapObject(window._setTimeoutGlobalRepository, function (instance, key, count) {
          if (instance.interval) {
            clearInterval(instance.interval);
            instance.interval = null;
          }
        });
      }
    };

    var reEnableTimeouts = function reEnableTimeouts() {
      if (window._setTimeoutGlobalRepository.length > 0) {
        var tmp = [];
        window.mapObject(window._setTimeoutGlobalRepository, function (instance, key, count) {
          tmp.push(instance);
        });
        window._setTimeoutGlobalRepository = [];
        window.mapObject(tmp, function (instance, key, count) {
          window.setTimeoutGlobal(instance.id, instance.func, instance.timer);
        });
      }
    };

    var windowActivity = function windowActivity() {
      (function () {
        var hidden = 'hidden'; // Standards:

        if (hidden in document) {
          document.addEventListener('visibilitychange', onchange);
        } else if ((hidden = 'mozHidden') in document) {
          document.addEventListener('mozvisibilitychange', onchange);
        } else if ((hidden = 'webkitHidden') in document) {
          document.addEventListener('webkitvisibilitychange', onchange);
        } else if ((hidden = 'msHidden') in document) {
          document.addEventListener('msvisibilitychange', onchange);
        } else if ('onfocusin' in document) {
          // IE 9 and lower:
          document.onfocusin = document.onfocusout = onchange;
        } else {
          // All others:
          window.onpageshow = window.onpagehide = window.onfocus = window.onblur = onchange;
        }

        function onchange(evt) {
          var status = '';
          var v = 'visible';
          var h = 'hidden';
          var evtMap = {
            focus: v,
            focusin: v,
            pageshow: v,
            blur: h,
            focusout: h,
            pagehide: h
          };
          evt = evt || window.event;

          if (evt.type in evtMap) {
            status = evtMap[evt.type];
          } else {
            status = this[hidden] ? 'hidden' : 'visible';
          }

          if (status === 'visible') {
            reEnableTimeouts();
          } else if (status === 'hidden') {
            closeTimeout();
          }
        } // set the initial state (but only if browser supports the Page Visibility API)


        if (document[hidden] !== undefined) {
          onchange({
            type: document[hidden] ? 'blur' : 'focus'
          });
        }
      })();
    };

    windowActivity();
  }
} catch (err) {
  console.log(err);
}

/***/ }),

/***/ "./src/javascript/polyfills/index.js":
/*!*******************************************!*\
  !*** ./src/javascript/polyfills/index.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

//
if (!window.console) {
  window.console = function () {};

  if (typeof XDomainRequest !== 'undefined') {
    window.console.prototype.log = function (err) {
      throw new SyntaxError(err);
    };

    window.console.prototype.warn = function (err) {
      throw new SyntaxError(err);
    };

    window.console.prototype.error = function (err) {
      throw new SyntaxError(err);
    };
  }
} //


try {
  Event.prototype.preventDefault || (Event.prototype.preventDefault = function () {
    this.returnValue = !1;
  });
} catch (err) {
  console.log(err);
} //


try {
  Event.prototype.stopPropagation || (Event.prototype.stopPropagation = function () {
    this.cancelBubble = !0;
  });
} catch (err) {
  console.log(err);
} //


try {
  typeof mapObject !== 'function' && (window.mapObject = function (e, t) {
    if (e !== null) {
      var n = 0;

      for (var r in e) {
        e.hasOwnProperty(r) && (t(e[r], r, n), n++);
      }

      return !0;
    }

    return console.log('returned object is null', _typeof(e)), !1;
  });
} catch (err) {
  console.log(err);
} //


try {
  if (!Element.prototype.addEventListener) {
    var eventListeners = [];

    var addEventListener = function addEventListener(e, t) {
      var n;
      var r = this;

      if (n = function n(e) {
        e.target = e.srcElement, e.currentTarget = r, e.pageX = event.clientX + document.body.scrollLeft, e.pageY = event.clientY + document.body.scrollTop, t.handleEvent ? t.handleEvent(e) : t.call(r, e);
      }, e === 'DOMContentLoaded') {
        var o = function o(e) {
          document.readyState === 'complete' && n(e);
        };

        if (document.attachEvent('onreadystatechange', o), eventListeners.push({
          object: this,
          type: e,
          listener: t,
          wrapper: o
        }), document.readyState == 'complete') {
          var i = new Event();
          i.srcElement = window, o(i);
        }
      } else this.attachEvent('on' + e, n), eventListeners.push({
        object: this,
        type: e,
        listener: t,
        wrapper: n
      });
    };

    var removeEventListener = function removeEventListener(e, t) {
      for (var n = 0; n < eventListeners.length;) {
        var r = eventListeners[n];

        if (r.object == this && r.type == e && r.listener == t) {
          e == 'DOMContentLoaded' ? this.detachEvent('onreadystatechange', r.wrapper) : this.detachEvent('on' + e, r.wrapper);
          break;
        }

        ++n;
      }
    };

    Element.prototype.addEventListener = addEventListener, Element.prototype.removeEventListener = removeEventListener, HTMLDocument && (HTMLDocument.prototype.addEventListener = addEventListener, HTMLDocument.prototype.removeEventListener = removeEventListener), Window && (Window.prototype.addEventListener = addEventListener, Window.prototype.removeEventListener = removeEventListener);
  }

  Element.prototype.remove || (Element.prototype.remove = function () {
    this.parentElement.removeChild(this);
  }, NodeList.prototype.remove = HTMLCollection.prototype.remove = function () {
    for (var e = 0, t = this.length; t > e; e++) {
      this[e] && this[e].parentElement && this[e].parentElement.removeChild(this[e]);
    }
  });
} catch (err) {
  console.log(err);
}

typeof XDomainRequest !== 'undefined' && (_typeof(window.JSON) !== 'object' && (window.JSON = {}), function () {
  'use strict';

  function f(e) {
    return e < 10 ? '0' + e : e;
  }

  function quote(e) {
    return escapable.lastIndex = 0, escapable.test(e) ? '"' + e.replace(escapable, function (e) {
      var t = meta[e];
      return typeof t === 'string' ? t : "\\u" + ('0000' + e.charCodeAt(0).toString(16)).slice(-4);
    }) + '"' : '"' + e + '"';
  }

  function str(e, t) {
    var n;
    var r;
    var o;
    var i;
    var a;
    var p = gap;
    var u = t[e];

    switch (u && _typeof(u) === 'object' && typeof u.toJSON === 'function' && (u = u.toJSON(e)), typeof rep === 'function' && (u = rep.call(t, e, u)), _typeof(u)) {
      case 'string':
        return quote(u);

      case 'number':
        return isFinite(u) ? String(u) : 'null';

      case 'boolean':
      case 'null':
        return String(u);

      case 'object':
        if (!u) return 'null';

        if (gap += indent, a = [], Object.prototype.toString.apply(u) === '[object Array]') {
          for (i = u.length, n = 0; i > n; n += 1) {
            a[n] = str(n, u) || 'null';
          }

          return o = a.length === 0 ? '[]' : gap ? '[\n' + gap + a.join(',\n' + gap) + '\n' + p + ']' : '[' + a.join(',') + ']', gap = p, o;
        }

        if (rep && _typeof(rep) === 'object') for (i = rep.length, n = 0; i > n; n += 1) {
          typeof rep[n] === 'string' && (r = rep[n], o = str(r, u), o && a.push(quote(r) + (gap ? ': ' : ':') + o));
        } else for (r in u) {
          Object.prototype.hasOwnProperty.call(u, r) && (o = str(r, u), o && a.push(quote(r) + (gap ? ': ' : ':') + o));
        }
        return o = a.length === 0 ? '{}' : gap ? '{\n' + gap + a.join(',\n' + gap) + '\n' + p + '}' : '{' + a.join(',') + '}', gap = p, o;
    }
  }

  typeof Date.prototype.toJSON !== 'function' && (Date.prototype.toJSON = function () {
    return isFinite(this.valueOf()) ? this.getUTCFullYear() + '-' + f(this.getUTCMonth() + 1) + '-' + f(this.getUTCDate()) + 'T' + f(this.getUTCHours()) + ':' + f(this.getUTCMinutes()) + ':' + f(this.getUTCSeconds()) + 'Z' : null;
  }, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function () {
    return this.valueOf();
  });
  var cx, escapable, gap, indent, meta, rep;
  typeof window.JSON.stringify !== 'function' && (escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, meta = {
    '\b': '\\b',
    '	': '\\t',
    '\n': '\\n',
    '\f': '\\f',
    '\r': '\\r',
    '"': '\\"',
    '\\': '\\\\'
  }, window.JSON.stringify = function (e, t, n) {
    var r;
    if (gap = '', indent = '', typeof n === 'number') for (r = 0; n > r; r += 1) {
      indent += ' ';
    } else typeof n === 'string' && (indent = n);
    if (rep = t, t && typeof t !== 'function' && (_typeof(t) !== 'object' || typeof t.length !== 'number')) throw new Error('JSON.stringify');
    return str('', {
      '': e
    });
  }), typeof window.JSON.parse !== 'function' && (cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, window.JSON.parse = function (text, reviver) {
    function walk(e, t) {
      var n;
      var r;
      var o = e[t];
      if (o && _typeof(o) === 'object') for (n in o) {
        Object.prototype.hasOwnProperty.call(o, n) && (r = walk(o, n), void 0 !== r ? o[n] = r : delete o[n]);
      }
      return reviver.call(e, t, o);
    }

    var j;
    if (text = String(text), cx.lastIndex = 0, cx.test(text) && (text = text.replace(cx, function (e) {
      return "\\u" + ('0000' + e.charCodeAt(0).toString(16)).slice(-4);
    })), /^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) return j = eval('(' + text + ')'), typeof reviver === 'function' ? walk({
      '': j
    }, '') : j;
    throw new SyntaxError('JSON.parse');
  });
}()); //

var _slice = Array.prototype.slice;

try {
  _slice.call(document.documentElement);
} catch (e) {
  Array.prototype.slice = function (t, e) {
    if (e = typeof e !== 'undefined' ? e : this.length, Object.prototype.toString.call(this) === '[object Array]') return _slice.call(this, t, e);
    var r;
    var i;
    var c = [];
    var l = this.length;
    var o = t || 0;
    o = o >= 0 ? o : l + o;
    var a = e || l;
    if (e < 0 && (a = l + e), i = a - o, i > 0) if (c = new Array(i), this.charAt) for (r = 0; i > r; r++) {
      c[r] = this.charAt(o + r);
    } else for (r = 0; i > r; r++) {
      c[r] = this[o + r];
    }
    return c;
  };
} // [EventSource] Polyfill fix: https://github.com/remy/polyfills/blob/master/EventSource.js


(function (global) {
  if ('EventSource' in global) return;
  var reTrim = /^(\s|\u00A0)+|(\s|\u00A0)+$/g;

  var EventSource = function EventSource(url) {
    var eventsource = this;
    var interval = 500;
    /* polling interval  */

    var lastEventId = null;
    var cache = '';

    if (!url || typeof url !== 'string') {
      throw new SyntaxError('Not enough arguments');
    }

    this.URL = url;
    this.readyState = this.CONNECTING;
    this._pollTimer = null;
    this._xhr = null;

    function pollAgain(interval) {
      eventsource._pollTimer = setTimeout(function () {
        poll.call(eventsource);
      }, interval);
    }

    function poll() {
      try {
        /* force hiding of the error message... insane? */
        if (eventsource.readyState === eventsource.CLOSED) return;
        /* NOTE: IE7 and upwards support */

        var xhr = new XMLHttpRequest();
        xhr.open('GET', eventsource.URL, true);
        xhr.setRequestHeader('Accept', 'text/event-stream');
        xhr.setRequestHeader('Cache-Control', 'no-cache');
        /* we must make use of this on the server side if we're working with Android - because they don't trigger readychange until the server connection is closed */

        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        if (lastEventId != null) xhr.setRequestHeader('Last-Event-ID', lastEventId);
        cache = '';
        xhr.timeout = 50000;

        xhr.onreadystatechange = function () {
          if (this.readyState == 3 || this.readyState == 4 && this.status == 200) {
            /* on success */
            if (eventsource.readyState == eventsource.CONNECTING) {
              eventsource.readyState = eventsource.OPEN;
              eventsource.dispatchEvent('open', {
                type: 'open'
              });
            }

            var responseText = '';

            try {
              responseText = this.responseText || '';
            } catch (e) {}
            /* process this.responseText */


            var parts = responseText.substr(cache.length).split('\n');
            var eventType = 'message';
            var data = [];
            var i = 0;
            var line = '';
            cache = responseText;
            /* TODO handle 'event' (for buffer name), retry */

            for (; i < parts.length; i++) {
              line = parts[i].replace(reTrim, '');

              if (line.indexOf('event') === 0) {
                eventType = line.replace(/event:?\s*/, '');
              } else if (line.indexOf('retry') === 0) {
                var retry = parseInt(line.replace(/retry:?\s*/, ''));

                if (!isNaN(retry)) {
                  interval = retry;
                }
              } else if (line.indexOf('data') === 0) {
                data.push(line.replace(/data:?\s*/, ''));
              } else if (line.indexOf('id:') === 0) {
                lastEventId = line.replace(/id:?\s*/, '');
              } else if (line.indexOf('id') === 0) {
                /* this resets the id */
                lastEventId = null;
              } else if (line === '') {
                if (data.length) {
                  var event = new MessageEvent(data.join('\n'), eventsource.url, lastEventId);
                  eventsource.dispatchEvent(eventType, event);
                  data = [];
                  eventType = 'message';
                }
              }
            }

            if (this.readyState === 4) pollAgain(interval);
            /* don't need to poll again, because we're long-loading */
          } else if (eventsource.readyState !== eventsource.CLOSED) {
            if (this.readyState === 4) {
              /* and some other status dispatch error */
              eventsource.readyState = eventsource.CONNECTING;
              eventsource.dispatchEvent('error', {
                type: 'error'
              });
              pollAgain(interval);
            } else if (this.readyState === 0) {
              /* likely aborted */
              pollAgain(interval);
            } else {}
          }
        };

        xhr.send();
        setTimeout(function () {
          if (true) xhr.abort();
        }, xhr.timeout);
        eventsource._xhr = xhr;
      } catch (e) {
        /* in an attempt to silence the errors */
        eventsource.dispatchEvent('error', {
          type: 'error',
          data: e.message
        });
        /* ??? */
      }
    }

    ;
    poll();
    /* init now */
  };

  EventSource.prototype = {
    close: function close() {
      /* closes the connection - disabling the polling */
      this.readyState = this.CLOSED;
      clearInterval(this._pollTimer);

      this._xhr.abort();
    },
    CONNECTING: 0,
    OPEN: 1,
    CLOSED: 2,
    dispatchEvent: function dispatchEvent(type, event) {
      var handlers = this['_' + type + 'Handlers'];

      if (handlers) {
        for (var i = 0; i < handlers.length; i++) {
          handlers[i].call(this, event);
        }
      }

      if (this['on' + type]) {
        this['on' + type].call(this, event);
      }
    },
    addEventListener: function addEventListener(type, handler) {
      if (!this['_' + type + 'Handlers']) {
        this['_' + type + 'Handlers'] = [];
      }

      this['_' + type + 'Handlers'].push(handler);
    },
    removeEventListener: function removeEventListener(type, handler) {
      var handlers = this['_' + type + 'Handlers'];

      if (!handlers) {
        return;
      }

      for (var i = handlers.length - 1; i >= 0; --i) {
        if (handlers[i] === handler) {
          handlers.splice(i, 1);
          break;
        }
      }
    },
    onerror: null,
    onmessage: null,
    onopen: null,
    readyState: 0,
    URL: ''
  };

  var MessageEvent = function MessageEvent(data, origin, lastEventId) {
    this.data = data;
    this.origin = origin;
    this.lastEventId = lastEventId || '';
  };

  MessageEvent.prototype = {
    data: null,
    type: 'message',
    lastEventId: '',
    origin: ''
  };
  if ('module' in global) module.exports = EventSource;
  global.EventSource = EventSource;
})(window);

/***/ }),

/***/ "./src/javascript/utils/addClass.js":
/*!******************************************!*\
  !*** ./src/javascript/utils/addClass.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * App/Append new class string to the provided DOM element
 * @param element
 * @param className
 * @returns {{classList}|*}
 */
var addClass = function addClass(element, className) {
  try {
    if (element.classList) {
      element.classList.add(className);
    } else {
      element.className += ' ' + className;
    }
  } catch (e) {
    console.trace();
  }

  return element;
};

/* harmony default export */ __webpack_exports__["default"] = (addClass);

/***/ }),

/***/ "./src/javascript/utils/appendNext.js":
/*!********************************************!*\
  !*** ./src/javascript/utils/appendNext.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var appendNext = function appendNext(el, newNode) {
  if (el.nextSibling) {
    el.parentNode.insertBefore(newNode, el.nextSibling);
  } else {
    el.parentNode.appendChild(newNode);
  }
};

/* harmony default export */ __webpack_exports__["default"] = (appendNext);

/***/ }),

/***/ "./src/javascript/utils/closest.js":
/*!*****************************************!*\
  !*** ./src/javascript/utils/closest.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_cLabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../modules/cLabs */ "./src/javascript/modules/cLabs.js");
/* harmony import */ var _hasClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./hasClass */ "./src/javascript/utils/hasClass.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }



/**
 * Iterate up the tree of DOM elements to find the closes match
 * @param element
 * @param selector
 * @returns {null | ParentNode}
 */

var closest = function closest(element, selector) {
  if (_typeof(selector) === 'object') {
    var selectorClassString = selector.getAttribute('class');
    var selectorIdString = selector.id;

    if (selectorIdString !== null && selectorIdString.length > 0) {
      selector = '#' + selectorIdString;
    } else if (selectorClassString !== null && selectorClassString.length > 0) {
      selector = '.' + selectorClassString.split(' ')[0];
    } else {
      selector = selector.nodeName;
    }
  }

  function closest(element, selector) {
    try {
      element = element.parentNode;
    } catch (e) {
      console.log(element, selector);
      console.trace();
    }

    if (element !== null && _typeof(element) === 'object') {
      if (selector.match(_modules_cLabs__WEBPACK_IMPORTED_MODULE_0__["default"].classSelector) && Object(_hasClass__WEBPACK_IMPORTED_MODULE_1__["default"])(element, selector)) {
        return element;
      } else if (selector.match(_modules_cLabs__WEBPACK_IMPORTED_MODULE_0__["default"].idSelector) && element.id === selector.replace('#', '')) {
        return element;
      } else if (selector.match(_modules_cLabs__WEBPACK_IMPORTED_MODULE_0__["default"].tagSelector) && element.nodeName === selector.toUpperCase()) {
        return element;
      } else {
        return closest(element, selector);
      }
    } else {
      return null;
    }
  }

  if (_typeof(element) === 'object') {
    return closest(element, selector);
  } else {
    return null;
  }
};

/* harmony default export */ __webpack_exports__["default"] = (closest);

/***/ }),

/***/ "./src/javascript/utils/formatNumberLeadingZeros.js":
/*!**********************************************************!*\
  !*** ./src/javascript/utils/formatNumberLeadingZeros.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * Prepends 0 the provided number and returns the formated element as a string
 * @param num
 * @param size {number}
 * @returns {string} 1 => 001
 */
var formatNumberLeadingZeros = function formatNumberLeadingZeros(num, size) {
  var s = String(num);

  while (s.length < size) {
    s = '0' + s;
  }

  return s;
};

/* harmony default export */ __webpack_exports__["default"] = (formatNumberLeadingZeros);

/***/ }),

/***/ "./src/javascript/utils/getOffset.js":
/*!*******************************************!*\
  !*** ./src/javascript/utils/getOffset.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var getOffset = function getOffset(el) {
  var _x = 0;
  var _y = 0;

  while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
    _x += el.offsetLeft - el.scrollLeft;
    _y += el.offsetTop - el.scrollTop;
    el = el.offsetParent;
  }

  return {
    top: _y,
    left: _x
  };
};

/* harmony default export */ __webpack_exports__["default"] = (getOffset);

/***/ }),

/***/ "./src/javascript/utils/hasClass.js":
/*!******************************************!*\
  !*** ./src/javascript/utils/hasClass.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * Provides an ability to check if a DOM element contains a class string
 * @param element
 * @param className
 * @returns {boolean}
 */
function _hasClass(element, className) {
  className = className.replace('.', '');

  try {
    if (element.classList) {
      return element.classList.contains(className);
    } else {
      return new RegExp('(^| )' + className + '( |$)', 'gi').test(element.className);
    }
  } catch (e) {
    if (typeof e.stack !== 'undefined') {
      console.log(e.stack);
    }

    console.log(e, element, className);
    return false;
  }
}

var hasClass = function hasClass(element, className) {
  if (typeof className === 'string') {
    return _hasClass(element, className);
  } else if (className instanceof Array) {
    var hasClass = false;

    for (var i in className) {
      if (typeof className[i] === 'string' && _hasClass(element, className[i])) {
        hasClass = true;
      }
    }

    return hasClass;
  }
};

/* harmony default export */ __webpack_exports__["default"] = (hasClass);

/***/ }),

/***/ "./src/javascript/utils/index.js":
/*!***************************************!*\
  !*** ./src/javascript/utils/index.js ***!
  \***************************************/
/*! exports provided: sizeof, isElement, objectCount, remove, objectIterator, addClass, removeClass, hasClass, stringContains, formatNumberLeadingZeros, stripHtml, closest, isMobileTablet, getOffset, isiOSDevice, appendNext, query, trim, mergeObjects, scrollEnabled */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _sizeof__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sizeof */ "./src/javascript/utils/sizeof.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "sizeof", function() { return _sizeof__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _isElement__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./isElement */ "./src/javascript/utils/isElement.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isElement", function() { return _isElement__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _objectCount__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./objectCount */ "./src/javascript/utils/objectCount.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "objectCount", function() { return _objectCount__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _remove__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./remove */ "./src/javascript/utils/remove.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "remove", function() { return _remove__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _objectIterator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./objectIterator */ "./src/javascript/utils/objectIterator.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "objectIterator", function() { return _objectIterator__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _addClass__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./addClass */ "./src/javascript/utils/addClass.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "addClass", function() { return _addClass__WEBPACK_IMPORTED_MODULE_5__["default"]; });

/* harmony import */ var _removeClass__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./removeClass */ "./src/javascript/utils/removeClass.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "removeClass", function() { return _removeClass__WEBPACK_IMPORTED_MODULE_6__["default"]; });

/* harmony import */ var _hasClass__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./hasClass */ "./src/javascript/utils/hasClass.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "hasClass", function() { return _hasClass__WEBPACK_IMPORTED_MODULE_7__["default"]; });

/* harmony import */ var _stringContains__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./stringContains */ "./src/javascript/utils/stringContains.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "stringContains", function() { return _stringContains__WEBPACK_IMPORTED_MODULE_8__["default"]; });

/* harmony import */ var _formatNumberLeadingZeros__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./formatNumberLeadingZeros */ "./src/javascript/utils/formatNumberLeadingZeros.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "formatNumberLeadingZeros", function() { return _formatNumberLeadingZeros__WEBPACK_IMPORTED_MODULE_9__["default"]; });

/* harmony import */ var _stripHtml__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./stripHtml */ "./src/javascript/utils/stripHtml.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "stripHtml", function() { return _stripHtml__WEBPACK_IMPORTED_MODULE_10__["default"]; });

/* harmony import */ var _closest__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./closest */ "./src/javascript/utils/closest.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "closest", function() { return _closest__WEBPACK_IMPORTED_MODULE_11__["default"]; });

/* harmony import */ var _isMobileTablet__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./isMobileTablet */ "./src/javascript/utils/isMobileTablet.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isMobileTablet", function() { return _isMobileTablet__WEBPACK_IMPORTED_MODULE_12__["default"]; });

/* harmony import */ var _getOffset__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./getOffset */ "./src/javascript/utils/getOffset.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getOffset", function() { return _getOffset__WEBPACK_IMPORTED_MODULE_13__["default"]; });

/* harmony import */ var _isiOSDevice__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./isiOSDevice */ "./src/javascript/utils/isiOSDevice.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isiOSDevice", function() { return _isiOSDevice__WEBPACK_IMPORTED_MODULE_14__["default"]; });

/* harmony import */ var _appendNext__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./appendNext */ "./src/javascript/utils/appendNext.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "appendNext", function() { return _appendNext__WEBPACK_IMPORTED_MODULE_15__["default"]; });

/* harmony import */ var _query__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./query */ "./src/javascript/utils/query.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "query", function() { return _query__WEBPACK_IMPORTED_MODULE_16__["default"]; });

/* harmony import */ var _trim__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./trim */ "./src/javascript/utils/trim.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "trim", function() { return _trim__WEBPACK_IMPORTED_MODULE_17__["default"]; });

/* harmony import */ var _mergeObjects__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./mergeObjects */ "./src/javascript/utils/mergeObjects.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mergeObjects", function() { return _mergeObjects__WEBPACK_IMPORTED_MODULE_18__["default"]; });

/* harmony import */ var _scrollEnabled__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./scrollEnabled */ "./src/javascript/utils/scrollEnabled.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "scrollEnabled", function() { return _scrollEnabled__WEBPACK_IMPORTED_MODULE_19__["default"]; });






















/***/ }),

/***/ "./src/javascript/utils/isElement.js":
/*!*******************************************!*\
  !*** ./src/javascript/utils/isElement.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Returns true if it is a DOM element
 *
 * @param o {Object}
 * @return {Boolean}
 */
var isElement = function isElement(o) {
  return (typeof HTMLElement === "undefined" ? "undefined" : _typeof(HTMLElement)) === 'object' ? o instanceof HTMLElement :
  /* DOM2 */
  o && _typeof(o) === 'object' && o !== null && o.nodeType === 1 && typeof o.nodeName === 'string';
};

/* harmony default export */ __webpack_exports__["default"] = (isElement);

/***/ }),

/***/ "./src/javascript/utils/isMobileTablet.js":
/*!************************************************!*\
  !*** ./src/javascript/utils/isMobileTablet.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _stringContains__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./stringContains */ "./src/javascript/utils/stringContains.js");
// a check to test if the device is a mobile or tablet


var isMobileTablet = function isMobileTablet() {
  var check = false;

  (function (a) {
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
  })(navigator.userAgent || navigator.vendor || window.opera); // custom solution because latest iOS 13 userAgent doesn't return correct mobile information


  if (!check) {
    check = Object(_stringContains__WEBPACK_IMPORTED_MODULE_0__["default"])(window.navigator.userAgent.toLowerCase(), 'macintosh') && 'ontouchend' in document;
  }

  return check;
};

/* harmony default export */ __webpack_exports__["default"] = (isMobileTablet);

/***/ }),

/***/ "./src/javascript/utils/isiOSDevice.js":
/*!*********************************************!*\
  !*** ./src/javascript/utils/isiOSDevice.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// check if iOS
var isiOSDevice = function isiOSDevice() {
  return !!navigator.platform && /iP(ad|hone|od)/.test(navigator.platform);
};

/* harmony default export */ __webpack_exports__["default"] = (isiOSDevice);

/***/ }),

/***/ "./src/javascript/utils/mergeObjects.js":
/*!**********************************************!*\
  !*** ./src/javascript/utils/mergeObjects.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _sizeof__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sizeof */ "./src/javascript/utils/sizeof.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }



var mergeObjects = function mergeObjects(obj1, obj2, arrayType) {
  var obj3 = typeof arrayType === 'undefined' || arrayType === false ? {} : [];

  for (var i in obj1) {
    obj3[i] = obj1[i];
  }

  for (var k in obj2) {
    if (_typeof(obj1[k]) !== 'object') {
      obj3[k] = obj2[k];
    } else if (obj1[k] instanceof Array) {
      obj3[k] = obj2[k]; // arrays get overwritten and not extended
    } else if (typeof obj1[k] !== 'undefined' && _typeof(obj1[k]) === 'object' && obj1[k] !== null && typeof obj1[k].nodeType === 'undefined' && Object(_sizeof__WEBPACK_IMPORTED_MODULE_0__["default"])(obj1[k]) > 0) {
      obj3[k] = mergeObjects(obj1[k], obj2[k]);
    } else if (typeof obj1[k] !== 'undefined' && _typeof(obj1[k]) === 'object') {
      obj3[k] = obj2[k];
    } else {
      console.log('fail');
    }

    if (obj3[k] === undefined) {
      delete obj3[k];
    }
  }

  return obj3;
};

/* harmony default export */ __webpack_exports__["default"] = (mergeObjects);

/***/ }),

/***/ "./src/javascript/utils/objectCount.js":
/*!*********************************************!*\
  !*** ./src/javascript/utils/objectCount.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * Returns a count of object from a query result
 * @paramobj  {Object} anything or Array object
 */
var objectCount = function objectCount(obj) {
  if (obj !== null && obj.length !== undefined && obj instanceof Array) {
    return obj.length;
  } else if (obj !== null) {
    return 1;
  } else {
    return 0;
  }
};

/* harmony default export */ __webpack_exports__["default"] = (objectCount);

/***/ }),

/***/ "./src/javascript/utils/objectIterator.js":
/*!************************************************!*\
  !*** ./src/javascript/utils/objectIterator.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Returns true if it is a DOM element
 *
 * @param o {Object}
 * @return {Boolean}
 */
var isElement = function isElement(o) {
  return (typeof HTMLElement === "undefined" ? "undefined" : _typeof(HTMLElement)) === 'object' ? o instanceof HTMLElement :
  /* DOM2 */
  o && _typeof(o) === 'object' && o !== null && o.nodeType === 1 && typeof o.nodeName === 'string';
};
/**
 * Object iterator - best usage is for a list of DOM elements
 * @param obj
 * @param callback
 */


var objectIterator = function objectIterator(obj, callback) {
  if (typeof obj !== 'undefined' && obj !== null && typeof obj.length !== 'undefined' && obj instanceof Array) {
    var count = 0;

    for (var key in obj) {
      // adding additional check to see if object is element or array
      if (isElement(obj[key])) {
        callback(obj[key], key, count, obj.length);
      }

      count++;
    }
  } else if (typeof obj !== 'undefined' && obj !== null) {
    // adding additional check to see if object is element or array
    if (isElement(obj)) {
      callback(obj, 0, 0, 1);
    }
  }
};

/* harmony default export */ __webpack_exports__["default"] = (objectIterator);

/***/ }),

/***/ "./src/javascript/utils/query.js":
/*!***************************************!*\
  !*** ./src/javascript/utils/query.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_cLabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../modules/cLabs */ "./src/javascript/modules/cLabs.js");
/* harmony import */ var _trim__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./trim */ "./src/javascript/utils/trim.js");


/**
 * Query selector, supports CSS element selection
 *
 * Supports:
 *  - Class selection: ".element"
 *  - ID selection: "#element"
 *  - Tag selection: "div"
 *  - Multi depth selection: '.element ul li'
 *
 * @param {Object} "optional"
 * @param {String} CSS element selector
 * @returns {(Object|null|Array)} depending on the provided selector results can vary (null, node, NodeList array)
 */

var query = function query(doc, selector) {
  var result;
  var tmpDoc = doc;
  var tmpSelector = selector; // used for debug only

  if (typeof doc === 'string' && selector === undefined) {
    selector = doc;
    doc = document;
  }

  try {
    if (doc !== null) {
      selector = Object(_trim__WEBPACK_IMPORTED_MODULE_1__["default"])(selector); //

      if (selector.match(_modules_cLabs__WEBPACK_IMPORTED_MODULE_0__["default"].classSelector)) {
        result = doc.getElementsByClassName(selector.replace('.', ''));
      } else if (selector.match(_modules_cLabs__WEBPACK_IMPORTED_MODULE_0__["default"].idSelector)) {
        result = document.getElementById(selector.replace('#', ''));
      } else if (selector.match(_modules_cLabs__WEBPACK_IMPORTED_MODULE_0__["default"].tagSelector)) {
        result = doc.getElementsByTagName(selector);
      } else {
        result = doc.querySelectorAll(selector);
      }
    }

    if (result !== null && result !== undefined && result.nodeType) {
      return result;
    } else if (result !== null && result !== undefined && result.length === 1) {
      return result[0];
    } else if (result !== null && result !== undefined && result.length > 0) {
      return Array.prototype.slice.call(result);
    } else {
      return null;
    }
  } catch (e) {
    console.log(e);
    console.log(tmpSelector);
    console.log(tmpDoc);
    console.log(doc, selector);
  }
};

/* harmony default export */ __webpack_exports__["default"] = (query);

/***/ }),

/***/ "./src/javascript/utils/remove.js":
/*!****************************************!*\
  !*** ./src/javascript/utils/remove.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * Removes an HTML DOM element
 * @paramobj el {Object} DOM element
 */
var remove = function remove(el) {
  if (el !== null) {
    el.parentElement.removeChild(el);
  }
};

/* harmony default export */ __webpack_exports__["default"] = (remove);

/***/ }),

/***/ "./src/javascript/utils/removeClass.js":
/*!*********************************************!*\
  !*** ./src/javascript/utils/removeClass.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * Remove class string from provided DOM element
 * @param element
 * @param className
 * @returns {{classList}|*}
 */
var removeClass = function removeClass(element, className) {
  try {
    if (element.classList) {
      element.classList.remove(className);
    } else {
      element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }
  } catch (e) {
    console.log(element, className); // console.error(e);
    // console.trace();
  }

  return element;
};

/* harmony default export */ __webpack_exports__["default"] = (removeClass);

/***/ }),

/***/ "./src/javascript/utils/scrollEnabled.js":
/*!***********************************************!*\
  !*** ./src/javascript/utils/scrollEnabled.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var scrollEnabled = function scrollEnabled(doc) {
  return doc !== null ? doc.scrollHeight > doc.offsetHeight : false;
};

/* harmony default export */ __webpack_exports__["default"] = (scrollEnabled);

/***/ }),

/***/ "./src/javascript/utils/sizeof.js":
/*!****************************************!*\
  !*** ./src/javascript/utils/sizeof.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _isElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isElement */ "./src/javascript/utils/isElement.js");

/**
 * returns the size of an Object or array
 *
 * @param obj {Object}
 * @return {Number}
 */

var sizeof = function sizeof(obj) {
  var size = 0;
  var key;

  for (key in obj) {
    if (obj.hasOwnProperty(key)) size++;
  }

  if (size === 0 && Object(_isElement__WEBPACK_IMPORTED_MODULE_0__["default"])(obj)) {
    size = 1;
  }

  return size;
};

/* harmony default export */ __webpack_exports__["default"] = (sizeof);

/***/ }),

/***/ "./src/javascript/utils/stringContains.js":
/*!************************************************!*\
  !*** ./src/javascript/utils/stringContains.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * A check if a string contains an entry of searched for term
 * @param str {string}
 * @param partial {string}
 * @returns {boolean}
 */
var stringContains = function stringContains(str, partial) {
  return str.indexOf(partial) > -1;
};

/* harmony default export */ __webpack_exports__["default"] = (stringContains);

/***/ }),

/***/ "./src/javascript/utils/stripHtml.js":
/*!*******************************************!*\
  !*** ./src/javascript/utils/stripHtml.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * Removes HTML tags from the provided input and returns only the text
 * - this is a very basic implementation and should be used carefully
 * @param html {string}
 * @returns {string | string}
 */
var stripHtml = function stripHtml(html) {
  var tmp = document.createElement('DIV');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
};

/* harmony default export */ __webpack_exports__["default"] = (stripHtml);

/***/ }),

/***/ "./src/javascript/utils/trim.js":
/*!**************************************!*\
  !*** ./src/javascript/utils/trim.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var trim = function trim(string) {
  return string.replace(/^\s+|\s+$/g, '');
};

/* harmony default export */ __webpack_exports__["default"] = (trim);

/***/ }),

/***/ "./src/scss/style.scss":
/*!*****************************!*\
  !*** ./src/scss/style.scss ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "../css/style.css");

/***/ }),

/***/ 1:
/*!************************************************************************************************************************!*\
  !*** multi (webpack)-dev-server/client?http://localhost:9000 ./src/javascript/leaderboard.v3.js ./src/scss/style.scss ***!
  \************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! D:\VSCode\widgets.git\leaderboard_v3\node_modules\webpack-dev-server\client\index.js?http://localhost:9000 */"./node_modules/webpack-dev-server/client/index.js?http://localhost:9000");
__webpack_require__(/*! ./src/javascript/leaderboard.v3.js */"./src/javascript/leaderboard.v3.js");
module.exports = __webpack_require__(/*! ./src/scss/style.scss */"./src/scss/style.scss");


/***/ })

/******/ });