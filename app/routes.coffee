app.get "/", (req, res) ->
  res.render "index",
    title: "Express"
    message: "Welcome to Express"



