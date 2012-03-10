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
    heroku run node #console

add-ons

    heroku addons:add mongolab:starter

## TODO

* models, controllers, layout

* mailer (w/Sendgrid?)
* background jobs
* CDN w/S3
* asset consolidation/minification
* Newrelic?

* DNS
* testing
* Airbrake
* Google Analytics