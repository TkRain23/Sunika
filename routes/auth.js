const User = require('../models/user');
const jwt = require('jsonwebtoken');


module.exports = (app) => {
    // sign up get

    app.get('/sign-up', (req,res) => {
        var currentUser = req.user;
        res.render('sign-up', { title: 'Sign Up', currentUser});
    });

    // sign up post
    app.post('/sign-up', (req,res) => {
        // create user and jwt
        const user = new User(req.body);

        user
            .save()
            .then(user => {
                var token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: '60 days' });
                res.cookie('nToken', token, { maxAge: 900000 , httpOnly: true });
                res.redirect('/collection');
            })
            .catch(err => {
                console.log(err.message);
                return res.status(400).send({ err: err });
            });
    });

    app.get('/login', (req, res) => {
        var currentUser = req.user;
        res.render('login', {currentUser});
    })

    app.post('/login', (req, res) => {
        const username = req.body.username;
        const password = req.body.password;
        // find this username
        User.findOne({ username }, 'username password')
            .then(user => {
                if (!user) {
                    // user not found
                    return res.status(401).send({ message: 'Wrong Username or Password' });
                }

                // check the password
                user.comparePassword(password, (err, isMatch) => {
                    if (!isMatch) {
                        // password does not match
                        return res.status(401).send({ message: 'Wrong Username or Password' });
                    }
                    // create a token
                    const token = jwt.sign({ _id: user._id, username: user.username }, process.env.SECRET, {
                        expiresIn: '60 days'
                    });
                    // set a cookie and redirect to root
                    res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });
                    res.redirect('/');
                });
            })
            .catch(err => {
                console.log(err);
            });
    })

    app.get('/logout', (req, res) => {
        res.clearCookie('nToken');
        res.redirect('/');
    });

};
