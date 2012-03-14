app.get("/", function(req, res) {
  return res.render("index", {
    locals: {
      title: "Express",
      message: "Welcome to Express"
    }
  });
});

app.get("/foo", function(req, res) {
  return res.redirect("/");
});

// TODO: figure out error pages

// app.get('/404', function(req, res, next){
//   next();
// });
// 
// app.get('/403', function(req, res, next){
//   var err = new Error('not allowed!');
//   err.status = 403;
//   next(err);
// });
// 
// app.get('/500', function(req, res, next){
//   next(new Error('keyboard cat!'));
// });

