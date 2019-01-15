const express = require('express')
const router = express.Router();
var User = require("../models/user");
const Shoe = require('../models/shoes')

router.get('/:shoe', (req, res) => {
    var currentUser = req.user;
    Shoe
        .findOne({ urlKey: req.params.shoe })
        .then(shoe => res.render('single-shoe', {shoe, currentUser}))
        .catch(err => console.error(err))
})


module.exports = router;
