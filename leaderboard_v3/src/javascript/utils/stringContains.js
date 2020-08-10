/**
 * A check if a string contains an entry of searched for term
 * @param str {string}
 * @param partial {string}
 * @returns {boolean}
 */
const stringContains = function (str, partial) {
  return (str.indexOf(partial) > -1);
};

export default stringContains;
