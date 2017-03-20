var User = require('./models/user');
module.exports = function (app, passport) {
    app.get('/', function (req, res) {
        res.render('index.ejs');
    });

    app.get('/profile', function (req, res) {

        var flash = req.flash('loginMessage');
        console.log('FLASH', flash);
        if (req.isAuthenticated()) {
            res.send(req.user);
        } else {
            res.status(401).send({message: 'Access Denied', Details: flash});
        }
    });

    app.get('/logout', function (req, res) {
        req.logout();
        res.send({'loged-out': 1});
    })

    app.get('/login',
        function (req, res, next) {
            req.logout();
            next();
        },
        passport.authenticate('local-login', {
            successRedirect: '/profile',
            failureRedirect: '/profile',
            failureFlash: true
        }));

    app.get('/signup', passport.authenticate('local-signup', {
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: true
    }));

    app.get('/auth/facebook', passport.authenticate('facebook', {scope: ['email']}));
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/profile',
            failureRedirect: '/'
        }));


};
