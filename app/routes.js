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


    app.get("/auth/facebook", function (req, res, next) {
        console.log('##########/auth/facebook was invoked');
        var callbackURL = '/auth/facebook/callback';
        if (req.query.realm) callbackURL += '?realm=' + req.query.realm;
        console.log('---New callbackURL.', callbackURL);
        passport.authenticate(
            "facebook",
            {session: false, scope: ['email'], callbackURL: callbackURL}
        )(req, res, next);
    });
    app.get("/auth/facebook/callback", function (req, res, next) {
            console.log('##########/auth/facebook/callback was invoked');
            var callbackURL = '/auth/facebook/callback';
            if (req.query.realm) callbackURL += '?realm=' + req.query.realm;
            console.log('---New callbackURL.', callbackURL);
            passport.authenticate("facebook", {
                callbackURL: callbackURL,
                failureRedirect: "/",
                session: false
            })(req, res, next)
        },
        responseFunction
    );


    app.get('/auth/google',
        function (req, res, next) {
            console.log('##########/auth/google was invoked');
            var callbackURL = '/auth/google/callback';
            if (req.query.realm) callbackURL += '?realm=' + req.query.realm;
            console.log('---New callbackURL.', callbackURL);
            passport.authenticate('google', {
                session: false,
                scope: ['profile', 'email'],
                callbackURL: callbackURL
            })(req, res, next);
        }
    );

    app.get('/auth/google/callback',
        function (req, res, next) {
            console.log('##########/auth/google was invoked');
            var callbackURL = '/auth/google/callback';
            if (req.query.realm) callbackURL += '?realm=' + req.query.realm;
            console.log('---New callbackURL.', callbackURL);
            passport.authenticate('google', {
                session: false,
                scope: ['profile', 'email'],
                callbackURL: callbackURL
            })(req, res, next);
        },
        responseFunction
    );


    //REALM in URL SUPPORT

    app.get('/auth/facebook/:realm', function (req, res, next) {
        console.log('##########/auth/facebook/:realm was invoked');
        var callbackURL = '/auth/facebook/callback' + '/' + req.params.realm;
        console.log('---New callbackURL.', callbackURL);
        passport.authenticate(
            'facebook',
            {
                session: false,
                scope: ['email'],
                callbackURL: callbackURL
            }
        )(req, res, next);
    });

    app.get('/auth/facebook/callback/:realm',
        function (req, res, next) {
            console.log('##########/auth/facebook/callback/:realm was invoked');
            var callbackURL = '/auth/facebook/callback' + '/' + req.params.realm;
            console.log('---New callbackURL.', callbackURL);
            passport.authenticate(
                'facebook',
                {
                    callbackURL: callbackURL,
                    failureRedirect: '/',
                    session: false
                }
            )(req, res, next)
        },
        responseFunction);


    app.get('/auth/google/:realm', function (req, res, next) {
        console.log('##########/auth/google/:realm was invoked');
        var callbackURL = '/auth/google/callback' + '/' + req.params.realm;
        console.log('---New callbackURL.', callbackURL);
        passport.authenticate(
            'google',
            {
                session: false,
                scope: ['profile', 'email'],
                callbackURL: callbackURL
            }
        )(req, res, next);
    });
    app.get('/auth/google/callback/:realm', function (req, res, next) {
            console.log('##########/auth/google/callback/:realm was invoked');
            var callbackURL = '/auth/google/callback' + '/' + req.params.realm;
            console.log('---New callbackURL.', callbackURL);
            passport.authenticate(
                'google',
                {
                    callbackURL: callbackURL,
                    failureRedirect: '/',
                    session: false
                }
            )(req, res, next)
        },
        responseFunction);

};

var responseFunction = function (req, res) {
    console.log(req.query);
    res.send(req.user)
}