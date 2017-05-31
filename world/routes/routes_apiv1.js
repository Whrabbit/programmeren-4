var express = require('express');
var router = express.Router();
var moment = require('moment');
var jwt = require('jwt-simple');
var bcrypt = require('bcrypt');

var bodyParser = require('body-parser');
router.use(bodyParser.json()); // support json encoded bodies
router.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

var path = require('path');
var pool = require('../db/db_connector');
var config = require('../config.json');

function encodeToken(username) {
    const payload = {
        exp: moment().add(10, 'days').unix(),
        iat: moment().unix(),
        sub: username
    };
    return jwt.encode(payload, config.secretkey);
}

function decodeToken(token, cb) {

    try {
        const payload = jwt.decode(token, config.secretkey);

        //check if token has expired
        const now = moment().unix();

        if (now > payload.exp) {
            console.log('Token has expired.')
        }

        //callback
        cb(null, payload);

    } catch (err) {
        //callback
        cb(err, null);
    }
}

router.post('/login', function(req, res, next) {

    var username = req.body.username || '';
    var password = req.body.password || '';

    if (username && password) {
        query_str = 'SELECT * FROM users WHERE username = "' + username + '";';

        pool.getConnection(function (err, connection) {
            if (err) {
                throw err
            }
            connection.query(query_str, function (err, rows, fields) {
                connection.release();
                if (err) {
                    throw err
                }

                if (rows[0]) {
                    if (rows[0].hasOwnProperty('username') && rows[0].hasOwnProperty('password')) {
                        var hash = rows[0].password;
                        console.log(hash);
                        console.log(bcrypt.compareSync(password, hash));
                        if (bcrypt.compareSync(password, hash)){
                            res.status(200).json(encodeToken(username));
                        } else {
                            res.json({message:"Invalid password"});
                        }
                    } else {
                        res.json({error: "Please enter a valid username and password"});
                    }
                } else {
                    res.json({error: "Please enter a valid username and password"});
                }

            });
        });
    } else {
        res.json({error: "Please enter a valid username and password"});
    }

});

router.all(new RegExp("[^\/login)]"), function (req, res, next) {
    var token = (req.header('X-Access-Token')) || '';

    decodeToken(token, function (err, payload) {
        if (err) {
            console.log('Error handler: ' + err.message);
            res.status((err.status || 401 )).json({error: new Error("Not authorised").message});
        } else {
            next();
        }
    });
});

router.post('/register', function(req, res, next){
    var username = req.body.username;
    var password = req.body.password;

    var hash = bcrypt.hashSync(password, 10);

    var query_str = {
        sql: 'INSERT INTO `users`(username, password) VALUES (?,?)',
        values: [username, hash],
        timeout: 2000
    };

    pool.getConnection(function (err, connection) {
        if (err) {
            throw err
        }
        connection.query(query_str, function (err, rows, fields) {
            connection.release();
            if (err) {
                console.log(err);
            }
            res.status(200).json(rows);
        });
    });

});

//FALL BACK, DISPLAY SOME INFO
router.get('/v1/cities/search', function (req, res, next) {
    var countryCode = req.query.CountryCode;
    var limit = req.query.limit;

    var query_str = 'SELECT * FROM city WHERE CountryCode = "' + countryCode + '" LIMIT ' + limit + ';';
    pool.getConnection(function (err, connection) {
        if (err) {
            throw err
        }
        connection.query(query_str, function (err, rows, fields) {
            connection.release();
            if (err) {
                throw err
            }
            res.status(200).json(rows);
        });
    });
});

router.get('/v1/cities/:ID?', function (req, res, next) {
    var id = req.params.ID;

    var query_str;
    if (id) {
        query_str = 'SELECT * FROM city WHERE ID = "' + id + '";';
    } else {
        query_str = 'SELECT * FROM city';
    }
    pool.getConnection(function (err, connection) {
        if (err) {
            throw err
        }
        connection.query(query_str, function (err, rows, fields) {
            connection.release();
            if (err) {
                throw err
            }
            res.status(200).json(rows);
        });
    });
});

router.post('/v1/cities', function (req, res, next) {
    var ID = req.body.ID;
    var name = req.body.Name;
    var countryCode = req.body.CountryCode;
    var district = req.body.District;
    var population = req.body.Population;


    var query_str = {
        sql: 'INSERT INTO `city`(ID, name, countryCode, district, population) VALUES (?,?,?,?,?);',
        values: [ID, name, countryCode, district, population],
        timeout: 2000
    };
    console.log('query:' + query_str.sql);
    res.contentType('application/json');
    pool.getConnection(function (err, connection) {
        if (err) {
            throw err
        }
        connection.query(query_str, function (err, rows, fields) {
            connection.release();
            if (err) {
                throw err
            }
            res.status(200).json(rows);
        });
    });
});

router.put('/v1/cities/:ID?', function (req, res, next) {
    var city = req.body;
    var ID = req.params.ID;

    var query_str = {
        sql: 'UPDATE `city` SET name = ?, district = ?, population = ? WHERE ID = ' + ID,
        values: [city.name, city.district, city.population],
        timeout: 2000
    };

    console.log('query:' + query_str.sql);
    res.contentType('application/json');
    pool.getConnection(function (err, connection) {
        if (err) {
            throw err
        }
        connection.query(query_str, function (err, rows, fields) {
            connection.release();
            if (err) {
                throw err
            }
            res.status(200).json(rows);
        });
    });
});
router.delete('/v1/cities/:ID?', function (req, res, next) {
    var id = req.params.ID;

    var query_str;
    if (id) {
        query_str = 'DELETE FROM city WHERE ID = "' + id + '";';
    } else {
        query_str = 'SELECT * FROM city';
    }
    pool.getConnection(function (err, connection) {
        if (err) {
            throw err
        }
        connection.query(query_str, function (err, rows, fields) {
            connection.release();
            if (err) {
                throw err
            }
            res.status(200).json(rows);
        });
    });
});


module.exports = router;