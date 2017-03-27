var express = require("express");
var router = express.Router();
var pg = require("pg");

var config = {
  database: "treatDB", // name of your database
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
      res.sendStatus(500);
      done();
      return;
    } else {
      client.query('SELECT * from "treats";',
      function(queryError, result) {
        done();
        if (queryError) {
          res.sendStatus(500);
        } else {
          res.send(result.rows);
        }
      });
    }
    /** ---- YOUR CODE ABOVE ---- **/
    // Add pg and pSQL code here to get treats from the treatDB
  });
});

/** ---- YOUR CODE BELOW ---- **/

// POST /treats
router.post('/', function(req, res) {
  var name = req.body.name;
  var description = req.body.description;
  var pic = req.body.pic;
  pool.connect(function(err, client, done) {
    if (err) {
      res.sendStatus(500);
    } else {
      client.query('INSERT INTO "treats" ("name", "description", "pic") VALUES ($1,$2,$3);',
      [name, description, pic],
      function(queryError, result) { done(); if (queryError) { res.sendStatus(500); } else { res.sendStatus(201); }
      });
    }
  });
});

// PUT /treats/<id>
router.put('/:id', function(req, res) {
  var id = req.params.id;
  var name = req.body.name;
  var description = req.body.description;
  var pic = req.body.pic;
  pool.connect(function(err, client, done) {
    if (err) {
      res.sendStatus(500);
    } else {
      client.query('UPDATE "treats" SET "name" = $2, "description" = $3, "pic" = $4 WHERE "id" = $1;',
      [id, name, description, pic],
      function(queryError, result) { done(); if (queryError) { res.sendStatus(500); } else { res.sendStatus(201); }
      });
    }
  });
});

// DELETE /treats/<id>
router.delete('/:id', function(req, res) {
  //NOTE: Same issue here as in the PUT request above. What am I missing???
  console.log(req.params);
  var delTreat = req.params.id;
  pool.connect(function(err, client, done) {
    if (err) {
      res.sendStatus(500);
    } else {
      client.query('DELETE FROM "treats" WHERE "id" = $1;', [delTreat],
      function(queryError, result) { done(); if (queryError) { res.sendStatus(500); } else { res.sendStatus(201); }
      });
    }
  });
});




/** ---- DO NOT MODIFY BELOW ---- **/
module.exports = router;
