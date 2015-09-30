var logger = new Logger();
function logger(){
  this.log=function(e){
    Meteor.call('cardinalLog',e);
  };
  this.autologger = function autologger() {
      window.onerror = function(errorMsg, url, lineNumber, test) {
          console.log(errorMsg);
          console.log(test);
          sendError(errorMsg, url, lineNumber);
      };
  };
  logger.autolog = new autologger();
}
