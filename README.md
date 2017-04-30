# StuntCoders Deployer Server - [![npm version](https://badge.fury.io/js/stunt-deployer-server.svg)](https://badge.fury.io/js/stunt-deployer-server)
Minimalist nodejs server for automatic deployment

## Install
```sh
npm install --global stunt-deployer-server
```

## Usage
```sh
stunt-deployer-server [--hooks <path_to_hooks_json>] [--port <server_port>]
```
Default port: 3000

## Configuring deployment hooks
All deployment hoos are defined in **hooks.json** file.
```json
{
	"unique-hook-name": {
		"cwd": "./path-to-deploy-script",
		"exec": "bash deploy.sh"
	}
}
```
Hitting `http://example.com:3000/unique-hook-name` will trigger deployment script.

## Licence
Licensed under the MIT license.