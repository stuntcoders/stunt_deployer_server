#!/usr/bin/env node

'use strict';

const fs = require('fs');
const connect = require('connect');
const http = require('http');
const https = require('https');
const argv = require('minimist')(process.argv.slice(2));
const shell = require('shelljs');

const hooks = require(argv.hooks);

const app = connect();

app.use((req, res) => {
  const request = req._parsedUrl.pathname.replace(/^\/+/, '');

  if (hooks.hasOwnProperty(request)) {
    const hook = hooks[request];

    res.writeHead(200, {'Content-Type': 'text/plain'});

    const child = shell.exec(hook.exec, {
      cwd: hook.cwd || '.',
      async: true,
    });
  } else {
    res.writeHead(404, {'Content-Type': 'text/plain'});
  }

  res.end();
});

http.createServer(app).listen(argv.port || 3000);

if (argv.ssl_key && argv.ssl_cert) {
  https.createServer({
    key: fs.readFileSync(argv.ssl_key),
    cert: fs.readFileSync(argv.ssl_cert),
  }, app).listen(argv.https_port || 3443);
}
