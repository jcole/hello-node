# Hello World

  Example app with node.js, express, mongoose, hogan, and coffeescript.

  Uses capistrano to deploy to an EC2 server.
  
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

    nodemon app.coffee
    
If you want to use node:

    node web.js

## Deploy

first-time setup
  
    cap deploy:setup

deploy

    cap deploy production
  
## TODO

* private github repository
* mailer (w/Sendgrid?)
* code organization: models, controllers, layout

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
