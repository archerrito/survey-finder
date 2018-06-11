const express = require('express');
const app=express();

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
app.get('/', (req, res) => {
    res.send({hi: 'there' });
});

//Dynamic port binding
const PORT = process.env.PORT || 5000;
app.listen(PORT);

