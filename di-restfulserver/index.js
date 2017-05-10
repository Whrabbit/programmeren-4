var http    = require('http');
var express = require('express');
var config  = require('./config.json');

// CREATE THE APP
var app     = express();

app.set('PORT', config.webPort);

app.all('*', function(req, res, next){
    console.log(JSON.stringify(req.headers));
    console.log( req.method + "" + req.url);
    next();
});

app.get('/api/v1/hello', function(req, res, next){
    res.contentType('application/json');
    res.json(
        {
            "msg": "Hello to you all!! Have a nice NodeJS day.",
            "temperatuur":
                [
                    10, 20, 30, 40, "koud"
                ]
        });
});

//MIDDLEWARE STATISCHE BESTANDEN (HTML,CSS, IMAGES)
app.use(express.static(__dirname + '/public'));

//ROUTING WITH VERSIONS
app.use('/apiv1', require('./routes/routes_apiv1'));
// app.use('/apiv2', require('./routes/routes_apiv2'));
app.use('/apiv3', require('./routes/routes_apiv3'));

// START THE SERVER
var port    = process.env.PORT || app.get('PORT');

app.listen(8080, function() {
    console.log('The magic happens at http://localhost:8080');
});