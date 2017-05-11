var express         = require('express');
var router          = express.Router();
var connector       = require('../db/db_connector');
var pool            = require('../db/db_connector');

//FALL BACK, DISPLAY SOME INFO
router.get('/v1/cities', function(req, res, next){
    var lastname = req.params.lastname;

    var query_str;
    query_str = 'SELECT * FROM city';
    // if ( lastname ){
    //     query_str = 'SELECT * FROM actor_info WHERE last_name = "' + lastname + '";';
    // } else {
    //     query_str = 'SELECT * FROM actor_info;';
    // }

    pool.getConnection( function(err, connection){
        if (err){throw error}
        connection.query(query_str, function(err, rows,fields){
            connection.release();
            if(err){throw error}
            res.status(200).json(rows);
        });
    });
    // });
});

module.exports = router;