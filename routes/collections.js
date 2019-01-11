module.exports = (app) => {
    // sign up form
    app.get('/collection', (req,res) => {
        res.render('collection', { title: 'My Collection'});
    });

};
