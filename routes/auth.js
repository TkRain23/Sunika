const User = require('../models/user');

module.exports = (app) => {
    // sign up get
    app.get('/sign-up', (req,res) => {
        res.render('sign-up', { title: 'Sign Up'});
    });

    // sign up post
    app.post('/sign-up', (req,res) => {
        // create user
        const user = new User(req.body);

        user
            .save()
            .then(user => {
                res.redirect('/collection');
            })
            .catch(err => {
                console.log(err.message);
            });
    });

    app.get('/login', (req, res) => {
        res.render('login');
    })

};
