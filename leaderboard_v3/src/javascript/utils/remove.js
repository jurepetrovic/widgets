/**
 * Removes an HTML DOM element
 * @paramobj el {Object} DOM element
 */
const remove = function (el) {
  if (el !== null) {
    el.parentElement.removeChild(el);
  }
};

export default remove;
