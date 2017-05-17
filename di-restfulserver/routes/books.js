/**
 * Created by Whrabbit on 5/16/2017.
 */

// API - VERSION 1
var express = require('express');
var router  = express.Router();
var path    = require('path');

//FALL BACK, DISPLAY SOME INFO
// router.get('/v1/volumes', function(req, res){
//     res.status(200);
//     res.json({
//
//     });
// });
router.get('/v1/volumes', function(request, response) {

});

module.exports = router;