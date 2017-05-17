var http    = require('http');
var express = require('express');
var config  = require('./config.json');
var bodyParser = require('body-parser');

// CREATE THE APP
var app     = express();

app.set('PORT', config.webPort);

//MIDDLEWARE STATISCHE BESTANDEN (HTML,CSS, IMAGES)
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({'extended' : 'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));

//ROUTING WITH VERSIONS
app.use('/api', require('./routes/routes_apiv1'));


// START THE SERVER
var port    = process.env.PORT || app.get('PORT');

app.listen(8080, function() {
    console.log('The magic happens at http://localhost:8080');
});