/**
 * Created by Whrabbit on 5/9/2017.
 */
var mysql   = require('mysql');
var config  = require('../config');

// var connector = mysql.createConnection({
//     host        : config.dbServer,
//     user        : config.dbUsername,
//     password    : config.dbPassword,
//     database    : config.dbSchema
// });
//
// connector.connect( function(err){
//     if( err ){
//         console.log(err);
//     }else{
//         console.log("Connected to " + config.dbServer + ":" + config.dbSchema);
//     }
//
// });
//
// module.exports = connector;

var pool = mysql.createPool({
    connectionLimit     : 25,
    host                : config.dbServer,
    user                : config.dbUsername,
    password            : config.dbPassword,
    database            : config.dbSchema
});
module.exports = pool;