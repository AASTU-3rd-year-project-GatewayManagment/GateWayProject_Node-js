const express = require('express');
const router = express.Router();
const cookieParser = require("cookie-parser");
const sessions = require('express-session');

const con = require('./db_Connection');
let data;
let query = `SELECT * FROM user where ID='${userID}'`;
con.query(query, (err, result) => {
    if (err) throw err;
    data = result[0];
})

let auth = {
    getData: function() {
        return data;
    }
}
module.exports = auth;