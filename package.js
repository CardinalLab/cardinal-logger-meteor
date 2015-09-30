Package.describe({
  name: 'cardinallab:cardinal-logger',
  version: '0.0.4',
  summary: 'Package to automatically send logs to CardinalLab',
  git: 'https://github.com/CardinalLab/cardinal-logger-meteor',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.0.2');
  api.use('ecmascript');
  api.use('http');
  api.addFiles('cardinal-logger-client.js','client');
  api.addFiles('cardinal-logger-server.js','server');
  api.export('Controller','server');
  api.export('Logger','client');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('http');
  api.use('cardinallab:cardinal-logger');
  api.addFiles('cardinal-logger-tests.js');
  //api.export('Logger','client');
});
