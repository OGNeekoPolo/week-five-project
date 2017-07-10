const express = require('express');
const fs = require('fs');
const words = fs.readFileSync('/usr/share/dict/words', 'utf-8').toLowerCase().split('\n');
const router = express.Router();

function randomWords(arr){
  return arr[Math.floor(Math.random() * arr.length)];
}


router.get('/', function(req, res){
  res.render('menu');
});

router.get('/game', function(req, res){
  console.log(randomWords(words));
  res.render('index');
});

router.post('/guess', function(req, res){
  res.redirect('/game');
});

module.exports = router;
