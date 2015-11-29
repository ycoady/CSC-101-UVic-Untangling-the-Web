//based on the great example HERE:
// http://blog.modulus.io/nodejs-and-express-create-rest-api

var express = require('express');

var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

var quotes = [
  { author : 'Audrey Hepburn', text : "Nothing is impossible, the word itself says 'I'm possible'!"},
  { author : 'Walt Disney', text : "You may not realize it when it happens, but a kick in the teeth may be the best thing in the world for you"},
  { author : 'Unknown', text : "Even the greatest was once a beginner. Don't be afraid to take that first step."},
  { author : 'Neale Donald Walsch', text : "You are afraid to die, and you're afraid to live. What a way to exist."}
];

var myPage =
'<!DOCTYPE html><html><body><h1>Hello! WELCOME to your FULL STACK!!!!!</h1><form action="http://node-js-133758.nitrousapp.com:3000/quote" method="post"> <input type="text" name="author" value="Mickey" /> <input type="text" name="text" value="Mickey" />  <input type="submit" /></form></body></html>';

app.get('/', function(req, res) {
  console.log("==> / GET");
  res.json(quotes);
});

app.get('/quote/random', function(req, res) {
  console.log("==> /quote/random GET");
  var id = Math.floor(Math.random() * quotes.length);
  var q = quotes[id];
  res.json(q);
});

app.get('/quote/:id', function(req, res) {
  console.log("==> /quote/id!");
  if(quotes.length <= req.params.id || req.params.id < 0) {
    res.statusCode = 404;
    return res.send('Error 404: No quote found');
  }
  var q = quotes[req.params.id];
  res.json(q);
});

app.get('/addMine', function(req, res) {
  console.log("==> / GET mine!");
  res.send(myPage);
});


app.post('/quote', function(req, res) {
 console.log("==> post!!! "  );

  if(typeof req.body.author == 'undefined' ||
    typeof req.body.text == 'undefined') {
   res.statusCode = 400;
   return res.send('Error 400: Post syntax incorrect.');
 }

  var newQuote = {
    author : req.body.author,
    text : req.body.text
  };

  quotes.push(newQuote);
  res.json(req.body);
});

//now just sit, listen, and respond!!!!
app.listen(process.env.PORT || 3000);
