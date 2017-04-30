let connect = require('connect');
let http = require('http');
let shell = require('shelljs');
var argv = require('minimist')(process.argv.slice(2));

let hooks = require(argv.hooks || './hooks.json');

let app = connect();

app.use((req, res) => {
  let request = req.url.replace(/^\/+/, '').replace(/\/+$/, '');

  if (hooks.hasOwnProperty(request)) {
  	let hook = hooks[request];

  	console.log(`[${request}] - Starting deploy`);

  	shell.cd(hook.cwd || '.');
  	shell.exec(hook.exec);

  	console.log(`[${request}] - Deploy finished`);
  }
  
  res.end();
});

http.createServer(app).listen(argv.port || 3000);