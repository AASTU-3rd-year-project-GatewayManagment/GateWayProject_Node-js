/* Load mysql module - allow to manipulate the MySQL database */
const mysql = require('mysql');

/* get database authentication keys defined inside db_Authentication file */
const { dbAuth } = require('./db_Authentication');

/* Establish database pool connection */
const dbConn = mysql.createConnection(dbAuth);

/* Debug dbconnection */
dbConn.connect(function(err) {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST')
            console.log('DATABASE_CONNECTION_WAS_CLOSED');

        if (err.code === 'ER_CON_COUNT_ERRORS')
            console.log('DATABASE HAS TO MANY CONNECTIONS');

        if (err.code === 'ECONNREFUSED')
            console.log('DATABASE CONNECTION WAS REFUSED');

        throw (err)
    }

    console.log("DB connected successful");
});
module.exports = dbConn;