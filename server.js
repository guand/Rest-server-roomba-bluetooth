var express        	= require('express');
var morgan         	= require('morgan');
var bodyParser     	= require('body-parser');
var app            	= express();
var bluetooth		= require('./bluetooth/bluetooth');

app.use(express.static(__dirname + '/public'));     // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                     // log every request to the console
app.use(bodyParser.urlencoded({ extended: false }))    // parse application/x-www-form-urlencoded
app.use(bodyParser.json())    // parse application/json


app.get('/connect', bluetooth.connect);
app.post('/move', bluetooth.move);

app.listen(8080);   
console.log('Running on port 8080');          // shoutout to the user