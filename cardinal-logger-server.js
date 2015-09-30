/*var config = {
  "apiKey":"6oD6sSGkBcOXPr2QRYov9yJficUr0BDzfEikkC-pkia",
  "apiUser":"3wFhbBAcyRXNds6f2",
  "debug":"false",
  "project":"6bag3TgjPmoeqncH3"
};*/
var logger = new logger();

function logger() {
    this.init = function(config) {
        logger.apiKey = config.apiKey;
        logger.apiUser = config.apiUser;
        logger.project = config.project;
        logger.debug = config.debug;
    };
    this.sumError = function sumError(err, f) {
        if (f != undefined) {
            sendError(err.message, err.filename, err.stack, f.toString());
        } else {

        }
    };
    this.sendError = function sendError(errorMsg, url, lineNumber, code) {
        /*var xhrurl = 'http://lycheelinux.com:3000/api/logs';
        var xhr = createCORSRequest('POST', xhrurl);
        xhr.withCredentials = true;
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.setRequestHeader("X-User-Id", wombat.apiUser);
        xhr.setRequestHeader("X-Auth-Token", wombat.apiKey);
        xhr.send();*/
        var log = HTTP.call("POST", "https://api.cardinallab.com/api/logs/", {
          params: {
              "X-User-Id": this.apiUser,
              "X-Auth-Token": this.apiKey
            },
            data: {
              "project": this.project,
              "msg": errorMsg,
              "code": code,
              "lines": lineNumber
            }
          });
        /*var invocation = createCORSRequest('POST', xhrurl);
        if (!invocation) {
            return;
        }
        invocation.setRequestHeader("Content-type", "application/json");
        invocation.setRequestHeader("X-User-Id", wombat.apiUser);
        invocation.setRequestHeader("X-Auth-Token", wombat.apiKey);
        invocation.send(JSON.stringify({
            "project": wombat.project,
            "msg": errorMsg,
            "code": code,
            "lines": lineNumber
        }));*/

        /*function createCORSRequest(method, url) {
            var xhr = new XMLHttpRequest();
            if ("withCredentials" in xhr) {
                xhr.open(method, url, true);
            } else if (typeof XDomainRequest != "undefined") {
                xhr = new XDomainRequest();
                xhr.open(method, url);
            } else {
                xhr = null;
            }
            return xhr;
        }*/
    };
    this.log = function(e) {
        sumError(e);
    };
    this.brackets = function(f) {
        var err;
        try {
            f();
        } catch (error) {
            err = error;
        }
        if (err != undefined) {
            sumError(err, f);
        }
    };
}

Meteor.methods({
  cardinalLog:function(e){
    logger.log(e);
  },
  cardinalautolog:function(errorMsg, url, lineNumber){
    logger.sendError(errorMsg, url, lineNumber,"");
  }
});
