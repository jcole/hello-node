task :production do

    puts "Sync assets"
    #http://ariejan.net/2011/01/01/rake-task-to-sync-your-assets-to-amazon-s3cloudfront
    
    # NOTE: is this even necessary?
    # heroku config:add MAINTENANCE_PAGE_URL=http://s3.amazonaws.com/your_bucket/your_maintenance_page.html
    puts "Maint"
    #heroku maintenance:on
    
    puts "deploying to production"
    system "git push heroku"
    
    puts "done"
    #heroku maintenance:off
end