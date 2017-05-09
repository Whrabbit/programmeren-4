var express = require('express');
var app = express();

app.get('/', function(request, response) {
    response.send('Hello Avans!');
})

// START THE SERVER
var port    = process.env.PORT || app.get('PORT');

app.listen(8080, function() {
    console.log('The magic happens at http://localhost:8080');
});
