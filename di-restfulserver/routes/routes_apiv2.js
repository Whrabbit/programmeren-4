// API - VERSION 2
var express         = require('express');
var router          = express.Router();
var connector       = require('../db/db_connector');
var pool            = require('../db/db_connector');

//FALL BACK, DISPLAY SOME INFO
router.get('/actors/:lastname?', function(req, res, next){
    var lastname = req.params.lastname;

    var query_str;
    if ( lastname ){
        query_str = 'SELECT * FROM actor_info WHERE last_name = "' + lastname + '";';
    } else {
        query_str = 'SELECT * FROM actor_info;';
    }

        // connector.query(query_str, function(errortato, rows, fields){
        //     if(errortato){
        //         res.status(400).json(errortato);
        //     }else{
        //         res.status(200).json(rows);
        //     }
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