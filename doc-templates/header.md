This repo contains the code for template module.

## Prerequisites

* Install NodeJS, if not installed

        * wget -qO- https://deb.nodesource.com/setup_8.x | bash -
        * sudo apt-get install -y nodejs

* Install npm, if not installed

        * sudo apt-get install npm

## To run the project

Steps to run it as a service.

	Step 1: npm install

	Step 2: npm start

## To lint the project

Steps to lint the project before commiting.

	* npm run lint

## Development info

The connection is managed in /model/db.js. It is opened at application start, and closed on application termination. In this file we also monitor the connected, error and disconnected events.

All "false" and "true" are booleans.
