# StuntCoders Deployer Server - [![npm version](https://badge.fury.io/js/stunt-deployer-server.svg)](https://badge.fury.io/js/stunt-deployer-server)

Minimalist Node.js server for automatic deployments.

## Install
```sh
npm install --global stunt-deployer-server
```

## Usage
```sh
stunt-deployer-server --hooks <path_to_hooks_json> [--port <server_port>] [--ssl_key <key_path>] [--ssl_cert <cert_path>] 
```
Default ports: 3000 (3443)

## Configuring deployment hooks
All deployment hoos are defined in **hooks.json** file.
```json
{
  "unique-hook-name": {
    "cwd": "./path-to-deploy-script",
    "exec": "bash deploy.sh"
  },
  "fabric-unique-hook-name": {
    "cwd": "./path-to-deploy-script",
    "exec": "fab staging deploy"
  },
  "capistrano-unique-hook-name": {
    "cwd": "./path-to-deploy-script",
    "exec": "cap production deploy"
  }
}
```

Hitting `http://example.com:3000/unique-hook-name` via browser, or `curl` will trigger deployment script in it's folder, and run the command under `exec`.

## Run deployer server as a service
First create `/etc/systemd/system/stunt-deployer-server.service`
```
[Unit]
Description=StuntCoders Deployment Server

[Service]
WorkingDirectory=/root/stunt_deployer/
ExecStart=/usr/local/bin/stunt-deployer-server --hooks /root/stunt_deployer/hooks.json
Restart=always

[Install]
WantedBy=multi-user.target
```

Then start the service
```
systemctl daemon-reload
systemctl enable stunt-deployer-server
systemctl start stunt-deployer-server
```

## Licence
Licensed under the MIT license.