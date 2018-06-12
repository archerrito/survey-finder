const passport = require('passport');


module.exports = (app) => {
    app.get(
        //take them through our oauth flow
        '/auth/google', 
        //google strategy has internal identifier of string google
        passport.authenticate('google', {
            //give access to these internal identifiers
            scope: ['profile', 'email']
        })
    );
    
    app.get(
        '/auth/google/callback', 
        passport.authenticate('google'));

    app.get('/api/logout', (req, res) => {
        req.logout();
        //prove that no longer signed in, get back undefined, no content
        res.send(req.user);
    });
    
        //name whatever we want, req-incoming request, res - outgoing response
    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    })
};