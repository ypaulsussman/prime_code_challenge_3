var express = require("express");
var router = express.Router();
var pg = require("pg");

var config = {
  database: "chi", // name of your database
  host: "localhost", //where is your database?
  port: 5432, // port for the database
  max: 10, // how many connections at one time
  idleTimeoutMillis: 30000 //30 seconds to connect
};

var pool = new pg.Pool(config);
// GET /treats
router.get('/', function (req, res) {
  pool.connect(function (err, client, done) {
    if (err) {
      console.log('Error connecting to the DB', err);
      res.sendStatus(500);
      done();
      return;
    }
    /** ---- YOUR CODE BELOW ---- **/
    // Add pg and pSQL code here to get treats from the treatDB
  });
});

/** ---- YOUR CODE BELOW ---- **/

// POST /treats

// PUT /treats/<id>

// DELETE /treats/<id>

/** ---- DO NOT MODIFY BELOW ---- **/
module.exports = router;
