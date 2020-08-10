
/**
 * Returns true if it is a DOM element
 *
 * @param o {Object}
 * @return {Boolean}
 */
var isElement = function (o) { return (typeof HTMLElement === 'object' ? o instanceof HTMLElement : /* DOM2 */ o && typeof o === 'object' && o !== null && o.nodeType === 1 && typeof o.nodeName === 'string'); };

/**
 * Object iterator - best usage is for a list of DOM elements
 * @param obj
 * @param callback
 */
const objectIterator = function (obj, callback) {
  if (typeof obj !== 'undefined' && obj !== null && typeof obj.length !== 'undefined' && obj instanceof Array) {
    let count = 0;
    for (const key in obj) {
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

export default objectIterator;
