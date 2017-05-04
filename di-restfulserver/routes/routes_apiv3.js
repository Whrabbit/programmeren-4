// API - VERSION 2
var express = require('express');
var router  = express.Router();

var users   = [
    {
        name : 'whitney',
        info : {
            email: 'whitneyrabbitc@gmail.com',
            nick: 'whrabbit'
                }
        },
    {
        name : 'potato',
        info :
            {
                email: 'potato@gmail.com',
                nick: 'piewteto'
            }
    }
]
// die /users is de endpoint
// router.get('/users', function(req, res){
//     //geef object users mee
//     res.json(users);
// });
router.get('/users/:username', function(req, res, next){
    //var username = req,params.username || '';

    var user = users.filter( function(u){
        return( u.name === username);
    })

    console.log(user);

    res.json(user);
});

router.get('/help', function(req, res){
    res.json({
        "msg": "Help functie"
    });
});

//FALL BACK, DISPLAY SOME INFO
router.get('*', function(req, res){
        res.json({
        "msg" : "Api 3"
    });
});

module.exports = router;