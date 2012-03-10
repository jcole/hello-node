# Routes
app.get "/", (req, res) ->
  res.render "index",
    title: "Express"

app.get "/foo", (req, res) ->
  res.redirect "/"
  
app.get "/hogan",  (req, res) ->
  res.render "hogan.html",
    locals:
      title: "Express test"
      message: "using Hogan templating system"