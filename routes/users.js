var express = require('express');
var router = express.Router();

const User = require('../models/user')
const Shoe = require('../models/shoes')

/* GET users listing. */
router.get('/:username', function(req, res, next) {
    var currentUser = req.user;
    const username = req.params.username;
    User.findOne({username}).populate('shoecollection').then((user) => {
        res.render('collection', {currentUser, shoes:user.shoecollection})
    })
});

router.post('/add/:shoeid', function(req, res) {
    const username = req.user.username;
    const shoeId = req.params.shoeid;
    User.findOne({username}).then((user) => {
        user.shoecollection.unshift(shoeId);
        user.save();
        res.redirect('/users/' + username)
    })
});

router.get('/:username/collection'), function(req, res) {
    User.findOne({username}).populate('shoecollection').then((user) => {
        res.render('collection', {shoes:shoecollection})
    })
}

module.exports = router;
