/**
 * Created by Whrabbit on 5/10/2017.
 */
// Sample recipes database
// Source: https://en.wikibooks.org/wiki/Cookbook
var recipes = [
    {
        name: 'Lasagne',
        category: 'Pasta',
        procedure: 'Steps for making lasagne'
    },
    {
        name: 'Calzone',
        category: 'Pizza',
        procedure: 'Steps to make calzone (pizza)'
    },
    {
        name: 'Tuna Salad',
        category: 'Salad',
        procedure: [
            'Mix ingredients in a bowl',
            'Chill before serving'
        ]
    },
    {
        name: 'Bulgogi',
        category: 'Korean Cuisine',
        procedure: [
            'Slice the beef as thin as possible.',
            'Combine all the ingredients in a big bowl.',
            'Marinate beef and vegetables for at least 30 minutes. Marinating overnight will get the best flavor and tenderization.',
            'Grill the beef.',
            'Serve with rice.'
        ]
    }
];
module.exports = recipes;
