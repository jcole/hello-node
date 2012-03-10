# Hello World

  Example app with node.js, express, mongoose, hogan, and coffeescript

## Setup

    npm install
    mongod --dbpath /Users/jeff/development/tools/mongo-data #replace with your path

## Starting app

    nodemon app.js

## Heroku

commands

    git push heroku master 
    heroku config

add-ons

    heroku addons:add mongolab:starter

## TODO

* mailer (w/Sendgrid?)
* background jobs
* CDN w/S3
* asset consolidation/minification
* Newrelic?

* DNS
* testing
* Airbrake
* Google Analytics