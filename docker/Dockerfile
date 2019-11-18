FROM node:10

WORKDIR /usr/src/tmp

COPY . /usr/src/tmp/

RUN add-apt-repository main
RUN add-apt-repository universe
RUN add-apt-repository multiverse
RUN add-apt-repository restricted
RUN apt-get update

# install libraries
RUN apt-get install -yyq ca-certificates libappindicator1 libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libnss3 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 gconf-service lsb-release wget xdg-utils fonts-liberation
RUN wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
RUN dpkg -i google-chrome-stable_current_amd64.deb --fix-missing; apt-get -fy install`

# Setup project
RUN npm install
RUN npm run transpile

# Run the application
CMD node ./dist/cli.js -p asd -s -ep "/usr/bin/chromium-browser"
