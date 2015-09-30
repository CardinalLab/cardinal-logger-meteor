/*var config = {
  "apiKey":"6oD6sSGkBcOXPr2QRYov9yJficUr0BDzfEikkC-pkia",
  "apiUser":"3wFhbBAcyRXNds6f2",
  "debug":"false",
  "project":"6bag3TgjPmoeqncH3"
};*/
var Controller = {};
Controller.functions({
  init:function(config) {
      Controller.apiKey = config.apiKey;
      Controller.apiUser = config.apiUser;
      Controller.project = config.project;
      Controller.debug = config.debug;
  },
  sumError: function sumError(err, f) {
      if (f != undefined) {
          Controller.sendError(err.message, err.filename, err.stack, f.toString());
      } else {

      }
  },
  sendError:function sendError(errorMsg, url, lineNumber, code) {
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
  },
  log:function(e) {
      sumError(e);
  },
  brackets:function(f) {
      var err;
      try {
          f();
      } catch (error) {
          err = error;
      }
      if (err != undefined) {
          sumError(err, f);
      }
  }
});

Meteor.methods({
  cardinalLog:function(e){
    Controller.log(e);
  },
  cardinalAutolog:function(errorMsg, url, lineNumber){
    Controller.sendError(errorMsg, url, lineNumber,"");
  }
});
