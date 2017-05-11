var express         = require('express');
var router          = express.Router();
var connector       = require('../db/db_connector');
var pool            = require('../db/db_connector');

//FALL BACK, DISPLAY SOME INFO
router.get('/v1/cities/:ID?', function(req, res, next){
    var id = req.params.ID;

    var query_str;
    if (id){
        query_str = 'SELECT * FROM city WHERE ID = "' + id + '";';
    }else {
        query_str = 'SELECT * FROM city';
    }
router.post('/v1/cities', function (req, res, next){
    var city = req.params.city;

    var query_str;
    query_str = 'INSERT INTO city VALUES ("``")';
})

    pool.getConnection( function(err, connection){
        if (err){throw error}
        connection.query(query_str, function(err, rows,fields){
            connection.release();
            if(err){throw error}
            res.status(200).json(rows);
        });
    });
});

module.exports = router;