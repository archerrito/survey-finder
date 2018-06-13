const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
//not assigning anything
require('./models/User.js');
require('./services/passport');

mongoose.connect(keys.mongoURI);

//const authRoutes = require('./routes/authRoutes');
const app=express();

//any time request that has patch body, this middleware
//will parse body and assign to property of incoming app object
app.use(bodyParser.json())

//using middlewares, making minor adjustments to it
app.use(
    cookieSession({
        //30 days
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);

//tell passport to use cookies to handle authentication
app.use(passport.initialize());
app.use(passport.session());

//return function, call with app object
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

//Deployment checklist
// 1. port binding - heroku tells us which port our app will use, listen to port they tell us
// 2. Specify node environment - use specific version of node, so tell heroku which version
// 3. Specify start script - instruct heroku what command to run to start our server running
// 4. create git ignore file, dont want to include dependences.

//app.-new route handler
//get-watch for incoming requests with this method
// '/'-watch for requests trying to access '/'
// req- object representing incoming request
// res- ibject representing outgoing response
//send - send some JSON back to who ever made request
// app.get('/', (req, res) => {
//     res.send({bye: 'buddy' });
// });

//create new instance of google passport strategy
//how to authenticate users for application

//Dynamic port binding
const PORT = process.env.PORT || 5000;
app.listen(PORT);
