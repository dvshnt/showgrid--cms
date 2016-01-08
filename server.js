var express = require('express'); //express for routing
var debug = require('debug')('api');
var colors = require('colors');
var cfg = require('./data/config');
var app  = express();
var www = express.static('client/www');

var bodyParser = require('body-parser')

app.use(bodyParser.json())

// var urlencode = require('urlencode');
// var json = require('json-middleware');
// var multipart = require('connect-multiparty');
// var multipartMiddleware = multipart();

// app.use(json);
// app.use(urlencoded);

// app.use('/login', multipartMiddleware);

require('./data/routes')(app);
app.use(www);


app.get('*', function (req, res){
  res.sendFile(__dirname+'/client/www/index.html')
})

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});



app.set('port', process.env.PORT || cfg.port);
var server = app.listen(app.get('port'), function() {
  console.log('Showgrid CMS : '.green + String(server.address().port).magenta);
});