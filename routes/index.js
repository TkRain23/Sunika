var express = require('express');
var router = express.Router();
var User = require("../models/user");

/* GET home page. */
router.get('/', function(req, res, next) {
    var currentUser = req.user;
    res.render('index', { title: 'S U N I K A', currentUser});
});

module.exports = router;
