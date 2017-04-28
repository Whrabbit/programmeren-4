var port = process.env.PORT || 3000;
var express = require('express');
var app = express();


app.get('/', function(request, response) {
    response.send('Hello Avans!');
})

app.get('/about', function(request, response) {
    response.send('Written by whitney');
})

app.get('/json', function(request, response) {
    response.json({
        'some_name': 'Value',
        'an_array_of_objects': [
            {
                'another_name': 'Another value',
                'a_further_name': "A further value"
            },
            {'yet_another_name': 'Yet another value'}
        ],
        'some_boolean': true,
        'some_integer': 42,
        'array_of_ints': [
            2, 3, 5, 7, 11, 13
        ],
        'array_of_strings': [
            "twee", "drie", "vijf", "zeven"
        ]
    })
})

app.post('/', function(request, response) {
    response.send('Hello Avans, POST request received!');
})

app.put('/', function(request, response) {
    response.send('Hello Avans, PUT request received!');
})

app.listen(3000, function() {
    console.log('Server app is listening on port 3000');
})



app.listen(port, function() {
    console.log('Server app is listening on port ' + port);
})