var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('game.html', {
    root: 'C:/Users/canne/SketchAI/views/'
  });
  //res.render('index.html', { title: 'Express' });
});

router.post('/game/', (req,res, next) => {
    var reqBody = req.body;
    db.run("INSERT INTO Images(userID,image,prompt) VALUES(?,?,?)",[reqBody.params.userID, req.params.image, req.params.prompt],
      function(err, result) {
        if (err) {
          res.status(400).json({"error": err.message})
          return;
        }
        res.status(201).json({"Successfully added" : this.prompt})
      } )
  })

module.exports = router;
