var helpers = {
  printlog: function (str, type) {
    var isDevMode = process.env.NODE_ENV === 'development';    
    if (true || isDevMode) {
      if (type === 'route') {
        // do not change this to printlog() !!!!!
        console.log('\x1b[36m%s\x1b[0m', str);
      } else {
        // do not change this to printlog() !!!!!
        console.log(str);  
      }      
    }
  }
};

module.exports = helpers;