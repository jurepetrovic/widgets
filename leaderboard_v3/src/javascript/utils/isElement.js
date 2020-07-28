/**
 * Returns true if it is a DOM element
 *
 * @param o {Object}
 * @return {Boolean}
 */
const isElement = function(o){
  return (
    typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
      o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName==="string"
  );
};

export default isElement;
