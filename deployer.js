#!/usr/bin/env node

'use strict';

const connect = require('connect');
const http = require('http');
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
    }, (error, stdout, stderr) => {
      res.write(error ? stderr : stdout);
      res.end();
    });

    req.on('end', () => {
      child.kill();
    });
  } else {
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end();
  }
});

http.createServer(app).listen(argv.port || 3000);