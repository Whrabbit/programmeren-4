var port = process.env.PORT || 3000;
var express = require('express');
var app = express();

var person1 = {
    "gender": "male",
    "name": {
        "title": "mr",
        "first": "harold",
        "last": "miller"
    },
    "location": {
        "street": "5301 preston rd",
        "city": "tacoma",
        "state": "washington",
        "postcode": 95516
    },
    "email": "harold.miller@example.com",
    "login": {
        "username": "silverpeacock276",
        "password": "ledzep",
        "salt": "2gcHA24K",
        "md5": "c0fe600e82c25e5a409131385def9115",
        "sha1": "f4e8804c5a142c2f53177a381def1250ff0ff5b7",
        "sha256": "c22ebeefe228dc080bd73082f78689ba0545c8053fd618e0e9e088ce9d20dccd"
    },
    "dob": "1990-11-17 10:42:57",
    "registered": "2014-12-14 15:49:57",
    "phone": "(562)-231-0613",
    "cell": "(687)-758-1122",
    "id": {
        "name": "SSN",
        "value": "377-54-5202"
    },
    "picture": {
        "large": "https://randomuser.me/api/portraits/men/37.jpg",
        "medium": "https://randomuser.me/api/portraits/med/men/37.jpg",
        "thumbnail": "https://randomuser.me/api/portraits/thumb/men/37.jpg"
    },
    "nat": "US"
};

var person2 = {
    "gender": "female",
    "name": {
        "title": "ms",
        "first": "albane",
        "last": "clement"
    },
    "location": {
        "street": "3130 rue de l'abbé-grégoire",
        "city": "courbevoie",
        "state": "drôme",
        "postcode": 36102
    },
    "email": "albane.clement@example.com",
    "login": {
        "username": "redsnake992",
        "password": "lily",
        "salt": "9x8fjPjT",
        "md5": "b1c1b0894f0a8d6badf52a8b185cc3f1",
        "sha1": "09db1482f3645acaac7eae1672778d128ec3e212",
        "sha256": "4ba77e5cea408ac2679069e650e049613cd516dec62fe317c42e454b51a87e59"
    },
    "dob": "1963-10-21 13:38:47",
    "registered": "2009-10-03 10:15:49",
    "phone": "05-90-23-47-20",
    "cell": "06-70-30-13-81",
    "id": {
        "name": "INSEE",
        "value": "263960712776 05"
    },
    "picture": {
        "large": "https://randomuser.me/api/portraits/women/44.jpg",
        "medium": "https://randomuser.me/api/portraits/med/women/44.jpg",
        "thumbnail": "https://randomuser.me/api/portraits/thumb/women/44.jpg"
    },
    "nat": "FR"
};

var person3 = {
    "gender": "male",
    "name": {
        "title": "mr",
        "first": "bobby",
        "last": "woods"
    },
    "location": {
        "street": "7402 spring hill rd",
        "city": "wagga wagga",
        "state": "south australia",
        "postcode": 3503
    },
    "email": "bobby.woods@example.com",
    "login": {
        "username": "silverkoala103",
        "password": "1975",
        "salt": "fXgYfPFh",
        "md5": "6e06b1aff0e6a8d29610c3b47891f94d",
        "sha1": "8451e3dc9ba1ecf3054ee07f5b1a497faa9928e5",
        "sha256": "96dd58e74a62b198a56d8ce3176cb7f059baccd36c0af6e724a3a5cd1571d325"
    },
    "dob": "1944-12-15 12:37:53",
    "registered": "2005-07-11 22:48:23",
    "phone": "00-3887-2391",
    "cell": "0454-462-077",
    "id": {
        "name": "TFN",
        "value": "904248167"
    },
    "picture": {
        "large": "https://randomuser.me/api/portraits/men/13.jpg",
        "medium": "https://randomuser.me/api/portraits/med/men/13.jpg",
        "thumbnail": "https://randomuser.me/api/portraits/thumb/men/13.jpg"
    },
    "nat": "AU"
};

var personArray = [person1, person2, person3];


app.get('/', function(request, response) {
    response.send('Hello Avans!');
})

app.get('/about', function(request, response) {
    response.send('Written by whitney');
})

app.get('/json', function(request, response) {
    var rand = personArray[Math.floor(Math.random() * personArray.length)];
    response.json({
        "results": [ rand ]
    });
});

app.post('/', function(request, response) {
    response.send('Hello Avans, POST request received!');
})

app.put('/', function(request, response) {
    response.send('Hello Avans, PUT request received!');
})

app.listen(port, function() {
    console.log('Server app is listening on port ' + port);
})