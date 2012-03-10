#set :host, "ec2-23-20-154-189.compute-1.amazonaws.com"                    # host your app will deploy to. List represents multiple hosts
set :deploy_to, "/var/www/node"
set :application_port, 3000
set :user, "ubuntu"                               # user to ssh in as
set :admin_runner, 'ubuntu'                       # user to run the application node_file as
set :application_binary, '/usr/bin/node'  # application for running your app. Use coffee for coffeescript apps
ssh_options[:keys] = [File.join(ENV["HOME"], ".ec2", "jcoleprojectkey.pem")]
set :node_env, 'production'
#set :branch, 'production'
set :keep_releases, 10
server 'ec2-23-20-154-189.compute-1.amazonaws.com', :web, :app, :db, :primary => true
