#!/usr/bin/env node

'use strict';

let connect = require('connect');
let http = require('http');
var argv = require('minimist')(process.argv.slice(2));
let shell = require('shelljs');

let hooks = require(argv.hooks || './hooks.json');

let app = connect();

app.use((req, res) => {
  let request = req.url.replace(/^\/+/, '').replace(/\/+$/, '');

  if (hooks.hasOwnProperty(request)) {
    let hook = hooks[request];

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
  }
});

http.createServer(app).listen(argv.port || 3000);