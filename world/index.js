var http    = require('http');
var express = require('express');
var config  = require('./config.json');

// CREATE THE APP
var app     = express();

app.set('PORT', config.webPort);

//MIDDLEWARE STATISCHE BESTANDEN (HTML,CSS, IMAGES)
app.use(express.static(__dirname + '/public'));

//ROUTING WITH VERSIONS
app.use('/api', require('./routes/routes_apiv1'));

// START THE SERVER
var port    = process.env.PORT || app.get('PORT');

app.listen(8080, function() {
    console.log('The magic happens at http://localhost:8080');
});