// API - VERSION 2
var express = require('express');
var router  = express.Router();
var path    = require('path');

//FALL BACK, DISPLAY SOME INFO
router.get('*', function(req, res){
    res.status(200);
    res.json({
        "despcription" : "Project X API version 2. Please use API version 1"
    });
});

module.exports = router;