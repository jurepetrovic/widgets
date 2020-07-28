import {isElement} from './index';

/**
 * returns the size of an Object or array
 *
 * @param obj {Object}
 * @return {Number}
 */
const sizeof = function (obj) {
  let size = 0, key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) size++;
  }

  if (size === 0 && isElement(obj)) {
    size = 1;
  }

  return size;
};

export default sizeof;
