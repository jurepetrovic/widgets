// default domain
// var apiURL = "http://192.168.1.8:9998";
const apiURL = "http://app.local:9998";

const cLabs = {
  api: {
    url: apiURL
  },
  classSelector: /^\.([\w-]+)$/, // class string expression check
  idSelector: /^#[\w\d\-\_\&\!\@\*]+$/, // ID string expression check
  tagSelector: /^[\w-]+$/ // TAG string expression check
};

export default cLabs;
