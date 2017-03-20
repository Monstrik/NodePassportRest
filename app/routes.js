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


    app.get('/login',
        passport.authenticate('local-login', {
            session: false
        }),
        function (req, res) {
            console.log(req.loginError)
            res.send(req.user)
        });

    app.get('/signup',
        passport.authenticate('local-signup', {
            session: false,
        }),
        function (req, res) {
            console.log(req.loginError)
            res.send(req.user)
        });


    app.get('/auth/facebook',
        passport.authenticate('facebook', {session: false, scope: ['email']}),
        function (req, res) {
            console.log(req.query)
        }
    );

    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            session: false,
            failureRedirect: '/'
        }),
        function (req, res) {
            res.send(req.user)
        }
    );

    // app.get('/auth/facebook/callback',
    //     passport.authenticate('facebook', { session: false, failureRedirect: "/" }),
    //     function(req, res) {
    //         res.redirect("/profile?access_token=" + req.user.access_token);
    //     }
    // );


    app.get('/auth/facebook/:realm', function (req, res, next) {
        console.log('/auth/facebook/ realm=', req.params.realm);
        passport.authenticate(
            'facebook',
            {
                session: false,
                scope: ['email'],
                callbackURL: '/auth/facebook/callback/' + req.params.realm
            }
        )(req, res, next);
    });


    app.get('/auth/facebook/callback/:realm',
        function (req, res, next) {
            console.log('/auth/facebook/ realm=', req.params.realm);
            passport.authenticate(
                'facebook',
                {
                    callbackURL: "/auth/facebook/callback/" + req.params.realm,
                    failureRedirect: '/',
                    session: false
                }
            )(req, res, next)
        },
        function (req, res) {
            console.log(req.params);
            res.send(req.user)
        });


};
