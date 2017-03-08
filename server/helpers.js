var helpers = {
  printlog: function (str) {
    var isDevMode = process.env.NODE_ENV === 'development';
    if (true || isDevMode) {
      // do not change this to printlog() !!!!!
      console.log(str);
    }
  }
};

module.exports = helpers;