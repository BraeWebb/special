const express = require('express');
const router = express.Router();

const getSignOns = require("../util/ldap");

router.get('/', function(req, res, next) {
  res.send("Hi!");
});

router.get('/signon', function(req, res, next) {
  getSignOns(req.user, function(data) {
    res.header("Content-Type",'application/json');
    res.type('json').send(JSON.stringify(data, null, 4));
  });
});


module.exports = router;
