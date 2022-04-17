var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
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
var queryRouter = require('./routes/queryRoute.js');

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

app.post('/getarray', jsonParser, function(req,res, next){
  req.app.locals.data = req.body.image
  
});

app.post('/game/:id/:prompt', (req,res, next) => {
  var sql = "INSERT INTO Images (userID,image,prompt) VALUES(?,?,?)"
  var params = [req.params.id, req.app.locals.data, req.params.prompt]
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

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/game', gameRouter);
app.use('/test', testRouter);
//app.use('/game/', queryRouter);

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
