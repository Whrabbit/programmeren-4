// API version 2
var express = require('express');
var router = express.Router();
var path = require('path');
var recipes  = require('.././recipes.js');

router.get('/info', function(request, response) {
    response.status(200);
    response.json({
        "description": "Recipes REST server API version 2 is no longer supported. Please use API version 1."
    });
});

router.get('/recipes', function(request, response) {
    var categoryQuery = request.query.category || '';

    response.status(200);
    if (categoryQuery !== '') {
        response.json(recipes.filter(function (recipe) {
            return recipe.category === categoryQuery;
        }));
    } else {
        response.json(recipes);
    }
});



router.get('/recipes/3', function(request, response) {
    var number = request.params.number;

    response.status(200);
    response.json(recipes[3]);
});
router.get('/recipes/:number', function(request, response) {
    var number = request.params.number;

    response.status(200);
    response.json(recipes[number]);
});

router.get('*', function(request, response) {
    response.status(404);
    response.json({
        "description": "Not found"
    });
});
module.exports = router;
