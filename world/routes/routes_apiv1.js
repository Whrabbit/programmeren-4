var express = require('express');
var router = express.Router();
var connector = require('../db/db_connector');
var pool = require('../db/db_connector');

router.get('/login', function (req, res, next) {
    var username = req.query.username || '';
    var password = req.query.password || '';

    if (username && password) {
        var query_str = 'SELECT * FROM users WHERE username = "' + username + '" AND password = "' + password + '";';
        console.log(query_str);
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
                if(rows.hasOwnProperty("username", username)){
                    console.log("got em");
                }
            });
        });
    } else {
       res.json({message: "Please provide a valid username and password"});
    }
});

router.all(new RegExp("[^\/login)]"), function (req, res, next) {
    var token = (req.header('X-Acces-Token')) || '';

    auth.decodeToken(token, function (err, payload) {
        if (err) {
            console.log('Error handler: ' + err.message);
            res.status((err.status || 401 )).json({error: new Error("Not authorised").message});
        } else {
            next();
        }
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