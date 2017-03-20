var User = require('./models/user');
module.exports = function (app, passport) {

    app.get('/', function (req, res) {
        res.render('index.ejs');
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

    //
    // app.get('/auth/facebook',
    //     passport.authenticate('facebook', {session: false, scope: ['email']})
    // );
    //
    // app.get('/auth/google',
    //     passport.authenticate('google', {session: false, scope: ['profile', 'email']})
    // );
    //
    //
    // app.get('/auth/facebook/callback',
    //     passport.authenticate('facebook', {session: false, failureRedirect: '/'}),
    //     function (req, res) {
    //         res.send(req.user)
    //     }
    // );
    //
    //
    // app.get('/auth/google/callback',
    //     passport.authenticate('google', {session: false, failureRedirect: '/'}),
    //     function (req, res) {
    //         res.send(req.user)
    //     }
    // );


    // //REALM SUPPORT
    //
    // app.get('/auth/facebook/:realm', function (req, res, next) {
    //     console.log('/auth/facebook/ realm=', req.params.realm);
    //     passport.authenticate(
    //         'facebook',
    //         {
    //             session: false,
    //             scope: ['email'],
    //             callbackURL: '/auth/facebook/callback/' + req.params.realm
    //         }
    //     )(req, res, next);
    // });
    //
    // app.get('/auth/facebook/callback/:realm',
    //     function (req, res, next) {
    //         console.log('/auth/facebook/ realm=', req.params.realm);
    //         passport.authenticate(
    //             'facebook',
    //             {
    //                 callbackURL: "/auth/facebook/callback/" + req.params.realm,
    //                 failureRedirect: '/',
    //                 session: false
    //             }
    //         )(req, res, next)
    //     },
    //     function (req, res) {
    //         console.log(req.params);
    //         res.send(req.user)
    //     });
    //
    //
    // app.get('/auth/google/:realm', function (req, res, next) {
    //     console.log('/auth/google/ realm=', req.params.realm);
    //     passport.authenticate(
    //         'google',
    //         {
    //             session: false,
    //             scope: ['profile', 'email'],
    //             callbackURL: '/auth/google/callback/' + req.params.realm
    //         }
    //     )(req, res, next);
    // });
    //
    // app.get('/auth/google/callback/:realm',
    //     function (req, res, next) {
    //         console.log('/auth/google/ realm=', req.params.realm);
    //         passport.authenticate(
    //             'google',
    //             {
    //                 callbackURL: "/auth/google/callback/" + req.params.realm,
    //                 failureRedirect: '/',
    //                 session: false
    //             }
    //         )(req, res, next)
    //     },
    //     function (req, res) {
    //         console.log(req.params);
    //         res.send(req.user)
    //     });


    //params
    app.get("/auth/facebook", function (req, res, next) {
        console.log('---req.query.',req.query);

        var callbackURL = '/auth/facebook/callback?realm=' + req.query.realm;
        //var callbackURL = fbConfig.callbackURL + "?queryParams=" + req.query.queryParams;
        passport.authenticate(
            "facebook",
            {session: false, scope: ['email'], callbackURL: callbackURL}
        )(req, res, next);
    });


    app.get("/auth/facebook/callback", function (req, res, next) {
            console.log('-callback--req.query.',req.query);
            var callbackURL = '/auth/facebook/callback?queryParams=' + req.query.realm;
            //var callbackURL = fbConfig.callbackURL + "?queryParams=" + req.query.queryParams
            passport.authenticate("facebook", {
                callbackURL: callbackURL,
                failureRedirect: "/login",
                session: false
            })(req, res, next)
        },
        function (req, res) {
            console.log(req.query.queryParams);
            res.send(req.user)
        });

};
