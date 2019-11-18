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
curl -sL https://deb.nodesource.com/setup_10.x | sudo bash -
sudo apt install nodejs
sudo apt-get install npm
```

To run on the Raspberry Pi, you may also need the following:
```bash
sudo apt-get install chromium-browser chromium-codecs-ffmpeg
sudo apt-get install gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget
```
And you will need to specify the executablePath. See the [Arguments section](#arguments) below.

## How to use
```bash
npx restart-ee-router [arguments]
```
or:
```bash
sudo npm -g restart-ee-router
restart-ee-router [arguments]
```

## Using Docker

### Setup
```
docker build -t restart-ee-router -f docker/Dockerfile .
```

### Run
```
docker run restart-ee-router
```

## Arguments

| name                         | default |
| ---------------------------- | ------- |
| `--password` or `-p`         | NA      |
| `--executablePath` or `-ep`  | null    |
| `--debugging` or `-d`        | false   |
| `--silent` or `-s`           | false   |
| `--verbose` or `-v`          | false   |



## Scheduling
macOS and Linux both come with `crontab` preinstalled.

[There's plenty of in-depth information about scheduling tasks in `crontab`](https://ole.michelsen.dk/blog/schedule-jobs-with-crontab-on-mac-osx.html), but I'll help you set up a simple task to restart the router every morning at 0400:

1. Open crontab config:
```bash
env EDITOR=vim crontab -e # sets the editor to vim and opens the crontab config
```

2. Add the task:
```crontab
0 4 * * 1 restart-ee-router -p "MY_ROUTER_ADMIN_PASSWORD" -s
```
## Contributing
 TODO

## Future work

 - [ ] More extensive error handling with more descriptive error messages.
 - [ ] Support other routers (eg BT Home Hub and EE Bright Box Router)
