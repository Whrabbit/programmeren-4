/**
 * Created by Whrabbit on 5/9/2017.
 */
// var port = process.env.PORT || 3000;
var port    = process.env.PORT || 8080;
var express = require('express');
var app = express();

// START THE SERVER

app.set('PORT', config.webPort);
app.listen(port, function() {
    console.log('The magic happens at http://localhost:8080');
});