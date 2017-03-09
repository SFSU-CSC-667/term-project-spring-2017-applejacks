var helpers = {
  printlog: function (str, type) {
    var isDevMode = process.env.NODE_ENV === 'development',
      pref = '->  ';
    str = str.toString();  
    if (true || isDevMode) {
      if (type === 'route') {
        // do not change this to printlog() !!!!!
        console.log('\x1b[36m%s\x1b[0m', str);
      } else if (type === 'init') {
        // do not change this to printlog() !!!!!
        console.log(str);  
      } else {
        // do not change this to printlog() !!!!!
        console.log(pref + str);  
      }      
    }
  }
};

module.exports = helpers;