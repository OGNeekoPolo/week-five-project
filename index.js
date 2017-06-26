const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const expressValidator = require('express-validator');
const mustacheExpress = require('mustache-express');

const fs = require('fs');
const words = fs.readFileSync("/usr/share/dict/words", "utf-8").toLowerCase().split("\n");

const app = express();

app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');


app.use(express.static("/"));

app.use(bodyParser.urlencoded({extended: true}));

app.use(expressValidator());

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));


app.get('/', function(req, res, next){
  res.render('menu');
});

app.get('/game', function(req, res, next){
  var gameValues = {
    
  }
});

app.post('/game', function(req, res, next){

})

app.listen(3000, function(){
  console.log("Initializing Hangman Protocol.....");
});
