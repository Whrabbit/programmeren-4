var port = process.env.PORT || 8080;
var http    = require('http');
var config  = require('./config.json');
var express = require('express');
var app = express();


app.set('PORT', config.webPort);

app.get('/', function(request, response) {
    response.send('Hello Avans!');
})

app.all('*', function(request, response, next) {
    console.log(request.method + " " + request.url);
    next();
})

app.use('/api/v1', require('./routes/routes_api_v1'));
app.use('/api/v2', require('./routes/routes_api_v2'));

// START THE SERVER
var port    = process.env.PORT || app.get('PORT');

app.listen(port, function() {
    console.log('Server app is listening on port ' + port);
})

module.exports = app;