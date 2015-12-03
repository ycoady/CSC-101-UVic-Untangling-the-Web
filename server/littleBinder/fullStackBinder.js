
/**
 * Module dependencies.
 */

var express = require('express')
    , BinderProvider = require('./binderProvider').BinderProvider;

var app = express();

var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

var binderProvider= new BinderProvider('localhost', 27017);

//Routes
app.get('/', function(req, res){
  res.sendFile('/home/nitrous/bikemaps.html');
 });

app.get('/binder', function(req, res){
  binderProvider.findAll(function(error, reports){
    res.json(reports);
  });
});

app.post('/report', function(req, res) {
 console.log("==> post!!! "  );
  binderProvider.save({
    user : req.body.user,
    report : req.body.report,
    lat: parseFloat(req.body.latitude),
    lng: parseFloat(req.body.longitude)
  }, function( error, docs) {
    console.log("??")
  });
  res.redirect('/');
});


//now just sit, listen, and respond!!!!
app.listen(process.env.PORT || 3000);
