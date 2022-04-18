var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('login.html', {
    root: 'C:/Users/canne/SketchAI/views/'
  });
  //res.render('index.html', { title: 'Express' });
});
module.exports = router;
