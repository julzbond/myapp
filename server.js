var config = require('./config.json');
var express = require('express');
var app = express();

var bodyparser = require('body-parser');

//sets the directory where the views/templates are kept
app.set('views', './views');

//sets the template engine (or the extension of the file e.g. .ejs or .jade)
app.set('view engine', 'ejs');

//sets the directory where static files are kept (e.g. .js, .css, .jpg, .png, files that are not dynamic)
//if the file extension matches the description, will serve that out
app.use(express.static(__dirname + '/public'));

app.use(bodyparser.json());

app.use('/chatrooms', require('./routes/chatroom.js'));

//route handler for a GET request to our root
app.get('/', function(req, res){
  res.render('index');
});

//starts server, passes in port and callback function
var server = app.listen(config.port, displayServerInfo);

function displayServerInfo(){
  var host = server.address().address;
  var port = server.address().port;
  console.log('Listening at http://%s:%s', host, port);
}