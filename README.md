# restart-ee-router

[![Greenkeeper badge](https://badges.greenkeeper.io/georgegillams/restart-ee-router.svg)](https://greenkeeper.io/)

We find that our [EE Smart Hub Router](https://shop.ee.co.uk/broadband/smart-hub) needs restarting around once a week to keep working reliably, and they lack a setting for restarting themselves automatically.

![EE Smart Hub Router](https://shop.ee.co.uk/content/dam/everything-everywhere/images/SHOP/Broadband/smart-hub-HBB-device-1x1.jpg.eeimg.480.480.medium.jpg/1533028192465.jpg)

This is my not-so-simple solution to that problem - a script that can access the router settings, enter your admin password, and restart.

## Prerequisites
Install Node and NPM using your favourite package manager:
```bash
brew install node
```
or:
```bash
sudo apt-get update
sudo apt-get install nodejs
sudo apt-get install npm
```

## How to use
```bash
npx restart-ee-router [arguments]
```
or:
```bash
sudo npm -g restart-ee-router
restart-ee-router [arguments]
```

## Arguments

| name                    | default |
| ----------------------- | ------- |
| `--password` or `-p`    | NA      |
| `--debugging` or `-d`   | false   |
| `--silent` or `-s`      | false   |
| `--verbose` or `-v`     | false   |



## Scheduling
macOS and Linux both come with `crontab` preinstalled.

[There's plenty of in-depth information about scheduling tasks in `crontab`](https://ole.michelsen.dk/blog/schedule-jobs-with-crontab-on-mac-osx.html), but I'll help you set up a simple task to restart the router every Monday morning at 0400:

1. Open crontab config:
```bash
env EDITOR=vim crontab -e # sets the editor to vim and opens the crontab config
```

2. Add the task:
```crontab
0 5 * * 1 restart-ee-router -p "MY_ROUTER_ADMIN_PASSWORD" -s
```
## Contributing
 TODO

## Future work

 - [ ] More extensive error handling with more descriptive error messages.
 - [ ] Support other routers (eg BT Home Hub and EE Bright Box Router)
