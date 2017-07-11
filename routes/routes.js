const express = require('express');
const fs = require('fs');
const words = fs.readFileSync('/usr/share/dict/words', 'utf-8').toLowerCase().split('\n');
const router = express.Router();

let randomIndex = Math.floor(Math.random() * words.length);
let randomWord = words[randomIndex].toUpperCase();
let wordLetters = randomWord.split('');
let spaces = wordLetters.length;

console.log(wordLetters);

let guessWord = [];
let gameLife = 8;
let lettersBucket = [];
let gameWin = 0;
let gameLose = 0;

let sess;




router.get('/', function(req, res){
  res.render('menu');
});

router.get('/game', function(req, res){
  sess = req.session;
  sess.wordLetters = wordLetters;
  sess.gameLife = gameLife;
  sess.lettersBucket = lettersBucket;
  sess.gameWin = gameWin;
  sess.gameLose = gameLose;
  sess.guessWord = guessWord;
  sess.spaces = spaces;
  let gameTags = {
    wordLetters: sess.wordLetters,
    gameLife: sess.gameLife,
    lettersBucket: sess.lettersBucket,
    gameWin: sess.gameWin,
    gameLose: sess.gameLose,
    guessWord: sess.guessWord,
    spaces: sess.spaces
  };
  if (!sess.wordLetters) {
    let randomWord = words[randomIndex].toUpperCase();
    let wordLetters = randomWord.split('');
    sess.wordLetters = wordLetters;
    console.log(req.session);
    res.render('index', {gameTags: gameTags});
  } else {
    console.log(req.session);
    res.render('index', {gameTags: gameTags});
  }
});

router.post('/guess', function(req, res){
  sess = req.session;
  if (req.body.guess.length > 1) {
    res.send('Please only enter 1 letter at a time');
  }
  let letterGuess = req.body.guess.toUpperCase();
  if (lettersBucket.includes(letterGuess)) {
    res.send('Letter has already been used!!');
  } else if (wordLetters.includes(letterGuess)) {
    for (var i = 0; i < wordLetters.length; i++) {
      if (letterGuess === wordLetters[i]) {
        guessWord[i] = wordLetters[i];
      }
    }
    lettersBucket.push(letterGuess);
  } else if (!wordLetters.includes(letterGuess)) {
    lettersBucket.push(letterGuess);
    gameLife--;
  }
  if (gameLife === 0) {
    gameLose++;
    randomIndex = Math.floor(Math.random() * words.length);
    randomWord = words[randomIndex].toUpperCase();
    wordLetters = randomWord.split('');
    guessWord = [];
    gameLife = 8;
    lettersBucket = [];
    spaces = wordLetters.length;
    sess = req.session;
    sess.wordLetters = wordLetters;
    sess.gameLife = gameLife;
    sess.lettersBucket = lettersBucket;
    sess.guessWord = guessWord;
    sess.spaces = spaces;
  }
if (guessWord.join('') == wordLetters.join('')) {
    gameWin++;
    randomIndex = Math.floor(Math.random() * words.length);
    randomWord = words[randomIndex].toUpperCase();
    wordLetters = randomWord.split('');
    guessWord = [];
    gameLife = 8;
    lettersBucket = [];
    spaces = wordLetters.length;
    sess = req.session;
    sess.wordLetters = wordLetters;
    sess.gameLife = gameLife;
    sess.lettersBucket = lettersBucket;
    sess.guessWord = guessWord;
    sess.spaces = spaces;
  }
  res.redirect('/game');
});

module.exports = router;
