var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var md5 = require('md5');

if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('./DB/SketchAI.db');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var gameRouter = require('./routes/gameRoute');
var testRouter = require('./routes/testRoute');
var loginRouter = require('./routes/loginRoute');

var app = express();

app.get('/users/:id', (req,res, next) => {
  db.serialize(()=>{
    db.each('SELECT userID ID, username NAME FROM Users WHERE userID =?', [req.params.id], function(err,row){     
      if(err){
        res.send("Error encountered while displaying");
        return console.error(err.message);
      }
      res.send(` userID: ${row.ID},    Username: ${row.NAME}`);
      console.log("Entry displayed successfully");
    });
  });
});

app.post('/authLogin', urlencodedParser, function(req,res,next){

  var sql = `SELECT * FROM Users WHERE (username==?) AND (password==?)`
  var password = req.body.password;
  var username = req.body.username;
  password = password.replace(/[#_{}()-*+=]/g, '');
  username = username.replace(/[#_{}()-*+=]/g, '');
  password = md5(password);
  var params = [username, password]

  if(req.body.username && req.body.password){
    db.all("SELECT * FROM Users WHERE (username==?) AND (password==?)", params, function(err,rows){
      if (err) {
        res.status(400).json({"error" : err.message})
      }else {
        rows.forEach(function(row){
          console.log("Login Successful");
          req.app.locals.token = username;
          req.app.locals.savedID = row.userID;
          res.sendFile("C:/Users/canne/SketchAI/views/home.html")
        })
      }
    })
  }
});

app.post('/authRegister', urlencodedParser, function(req,res,next){
  var password = req.body.password;
  var username = req.body.username
  password = password.replace(/[#_{}()-*+=]/g, '');
  username = username.replace(/[#_{}()-*+=]/g, '');
  password = md5(password);
  var sql = "INSERT INTO Users (username, password, email) VALUES(?,?,?)"
  var params = [username, password, req.body.email]
  console.log(username);
  db.run(sql, params, function(err, result) {
    if (err) {
      res.status(400).json({"error" : err.message})
      return;
    }
    res.sendFile("C:/Users/canne/SketchAI/views/home.html")
  })
});

app.post('/getarray', jsonParser, function(req,res, next){
  req.app.locals.data = req.body.image
  
});

app.post('/game/:id/:prompt', (req,res, next) => {
  var sql = "INSERT INTO Images (userID,image,prompt) VALUES(?,?,?)"
  var params = [app.locals.savedID, req.app.locals.data, req.params.prompt]
  db.run(sql, params, function(err, result) {
      if (err) {
        res.status(400).json({"error": err.message})
        return;
      }
      res.json({
        "message": "success",
    })
    } )
})

app.get('/game', (req,res,next) => {
  console.log(req.app.locals.token);
  if (req.app.locals.token == null){
    res.sendFile("C:/Users/canne/SketchAI/views/login.html")
  }else {
    res.sendFile("C:/Users/canne/SketchAI/views/game.html")
  }
})

app.get('/profile', (req,res,next) => {
  var sql = "SELECT image, prompt FROM images WHERE userID = '" + app.locals.savedID + "'";
  console.log(app.locals.savedID);
  var username = req.app.locals.token;
  console.log(sql);
  db.all(sql,function(err, rows){
    console.log("testing");
    console.log(rows.prompt);
    if (err) {
      return(res.status(400).json({"error" : err.message}))
    }else {
      return(res.render("profile", {images : rows, username: username}));
    }

  })
})

app.post('/logout', jsonParser,(req,res,next) => {
  if (req.body.token == "username"){
    req.app.locals.token = null;
    console.log("test");
    console.log(req.app.locals.token);
    res.sendFile("C:/Users/canne/SketchAI/views/home.html")
  }
})

// view engine setup
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
//app.use('/game', gameRouter);
app.use('/test', testRouter);
app.use('/login', loginRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
