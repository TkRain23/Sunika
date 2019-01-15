const Shoe = require('../models/shoes');
var User = require("../models/user");

module.exports = (app) => {
    // sign up form
    app.get('/collection', (req,res) => {
        var currentUser = req.user;
        Shoe
            .find()
            .then((shoes) => res.render('collection', { shoes, currentUser }))
            .catch((err) => console.error(err));
    });

};
