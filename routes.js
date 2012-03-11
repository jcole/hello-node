app.get("/", function(req, res) {
  return res.render("index", {
    title: "Express"
  });
});

app.get('/404', function(req, res, next){
  next();
});

app.get('/403', function(req, res, next){
  var err = new Error('not allowed!');
  err.status = 403;
  next(err);
});

app.get('/500', function(req, res, next){
  next(new Error('keyboard cat!'));
});

app.get("/foo", function(req, res) {
  return res.redirect("/");
});

app.get("/hogan", function(req, res) {
  return res.render("hogan.html", {
    locals: {
      title: "Express test",
      message: "using Hogan templating system"
    }
  });
});

      
