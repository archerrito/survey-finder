const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin =require('../middlewares/requireLogin');
//charges user, updates credits, send user model back to request
module.exports = app => {
    //route handler, pass in response handler
    app.post('/api/stripe', requireLogin, async (req, res) => {
        //handle token, reach to Stripe API, finalize charge, update user credits
        const charge = await stripe.charges.create({
            amount: 500,
            currency: 'usd',
            description: "$5 for 5 credits",
            source: req.body.id
        })
        
        //take user model, add 5 credits
        req.user.credits =+ 5;
        //takes some amount of time, when complete, 
        //will return updated user model
        const user = await req.user.save();

        //respond to request,send back data want to communicate back to browser
        res.send(user);
    });
};