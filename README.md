# Hello World

  Example app with node.js, express, mongoose, hogan, and coffeescript.

  Uses capistrano to deploy to an EC2 server.  Currently deployed on:
  http://ec2-23-20-154-189.compute-1.amazonaws.com
  
  Much of the layout for this app was borrowed from:
  https://github.com/datapimp/backbone-express-mongoose-socketio
  
## Setup

    install node, npm, and mongodb
    git clone git@github.com:jcole/hello-node.git
    cd hello-node
    npm install
    start mongo: mongod --dbpath /path/to/your/data
    
## Starting app

Use nodemon instead of node: picks up changes to files and re-starts server

    nodemon app.js
    
Or, if you know you'll be making coffee changes:

    nodemon start.coffee
    
## Deploy

first-time setup
  
    cap deploy:setup

deploy

    cap deploy production
  
## TODO

* authentication
* mailer (w/Sendgrid?)

* asset pipeline: consolidation/minification, asset digesting?  CDN?
* DNS
* monitoring and re-boot
* Newrelic
* Airbrake for Node
* Google Analytics
* delayed jobs
* load balancing
* testing: Jasmine? expresso?
* debugging?
