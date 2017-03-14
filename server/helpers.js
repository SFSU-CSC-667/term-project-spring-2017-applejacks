/**
 Reset = "\x1b[0m"
 Bright = "\x1b[1m"
 Dim = "\x1b[2m"
 Underscore = "\x1b[4m"
 Blink = "\x1b[5m"
 Reverse = "\x1b[7m"
 Hidden = "\x1b[8m"

 FgBlack = "\x1b[30m"
 FgRed = "\x1b[31m"
 FgGreen = "\x1b[32m"
 FgYellow = "\x1b[33m"
 FgBlue = "\x1b[34m"
 FgMagenta = "\x1b[35m"
 FgCyan = "\x1b[36m"
 FgWhite = "\x1b[37m"

 BgBlack = "\x1b[40m"
 BgRed = "\x1b[41m"
 BgGreen = "\x1b[42m"
 BgYellow = "\x1b[43m"
 BgBlue = "\x1b[44m"
 BgMagenta = "\x1b[45m"
 BgCyan = "\x1b[46m"
 BgWhite = "\x1b[47m"
*/

var helpers = {
  printlog: function (str, type) {
    var isDevMode = process.env.NODE_ENV === 'development',
      pref = '->  ',
      dbPref = '    ';

    // str = str.toString();

    if (true || isDevMode) {
      switch (type) {
        case 'route':
          // do not change this to printlog() !!!!!
          console.log('\x1b[36m%s\x1b[0m', str);
          break;
        case 'error':
          // do not change this to printlog() !!!!!
          console.log('\x1b[31m%s\x1b[0m', str);
          break;
        case 'init':
          // do not change this to printlog() !!!!!
          console.log(str);
          break;
        case 'db':
          // do not change this to printlog() !!!!!
          console.log(dbPref + '\x1b[34m%s\x1b[0m',str);
          break;
        default:
          // do not change this to printlog() !!!!!
          console.log(pref + str);
          break;
      }
    }
  }
};

module.exports = helpers;