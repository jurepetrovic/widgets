const scrollEnabled = function (doc) {
  return (doc !== null) ? (doc.scrollHeight > doc.offsetHeight) : false;
};

export default scrollEnabled;
