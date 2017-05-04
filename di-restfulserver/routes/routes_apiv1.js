// API - VERSION 1
var express = require('express');
var router  = express.Router();
var path    = require('path');

//FALL BACK, DISPLAY SOME INFO
router.get('*', function(req, res){
    res.status(200);
    res.json({
        "despcription" : "Project X API version 1. Please use API version 2"
    });
});

module.exports = router;