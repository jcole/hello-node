# Hello World

  Example app with node.js, express, mongoose, hogan, and coffeescript.

  Some of the layout for this app was borrowed from:
  https://github.com/datapimp/backbone-express-mongoose-socketio
  
## Setup

    install node, npm, and mongodb
    git clone git@github.com:jcole/hello-node.git
    cd hello-node
    npm install
    start mongo: mongod --dbpath /path/to/your/data
    
## Starting app

Use nodemon instead of node: picks up changes to files and re-starts server

Setup:
    
    npm install nodemon -g
    
To start app:

    nodemon app.js
    
Or, if you know you'll be making coffee changes:

    nodemon start.coffee
    
## Deploy on EC2

http://ec2-23-20-154-189.compute-1.amazonaws.com/people

setup
  
    cap deploy:setup

deploy
    
    git push origin master
    cap deploy production
  
## Deploy on Heroku

http://fierce-mist-2644.herokuapp.com/

setup

    heroku config:add DEPLOY=heroku
    heroku config:add NODE_ENV=production
    heroku addons:add mongolab:starter
    heroku addons:add mongohq:free

deploy 
  
    git push heroku master 

misc commands

    heroku config
    heroku run node #console

## TODO

* resourceful routing: https://github.com/visionmedia/express-resource
* asset pipeline: consolidation/minification, asset digesting?
* rake task for getting assets into S3
* authentication
* mailer (w/Sendgrid?)
* 404/500 pages
* Loggly?

Production-izing

* DNS
* site monitoring, e.g. Pingdom
* perf. monitoring, e.g. Newrelic
* Airbrake for Node
* Google Analytics
* delayed jobs

EC2-specific

* elastic IP routing
* load-balancing
* logging
* monitoring and re-boot, e.g. monit

General node stuff

* testing: Jasmine? expresso?
* debugging?
