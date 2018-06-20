const _ = require('lodash');
const Path = require('path-parser');
const { URL } = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

//can use model class to create instance of new survey
const Survey = mongoose.model('surveys');

module.exports = app => {
    app.get('/api/surveys/:surveyId/:choice', (req, res) => {
        res.send('Thanks for taking the survey!');
    });

    app.post('/api/surveys/webhooks', (req, res) => {
        // console.log(req.body);
        // res.send({});

        //p is object id we can 
        const p = new Path('/api/aurveys/:surveyId/:choice');

        _.chain(req.body)
            //iterate over req.body(list of events)
            //take destructured event and map over it
            .map(({ email, url, }) => {
                //will either be object or null
                const match = p.test(new URL(url).pathname);
                if (match) {
                    return { email, surveyId: match.surveyId, choice: match.choice };
                }
            })
            //iterate through events, remove any undefined elements by compacting
            .compact()
            //remove any duplicate records, uniqueness check
            .uniqBy('email', 'surveyId')
            .each(({ surveyId, email, choice }) => {
                Survey.updateOne({
                    _id: surveyId,
                    recipients: {
                        $elemMatch: { email: email, responded: false }
                    }
                }, {
                    $inc: { [choice]: 1},
                    $set: { 'recipients.$.responded': true },
                    lastResponded: new Date()
                }).exec();
            })
            .value();

        

        res.send({});


    });

    app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
        const { title, subject, body, recipients } = req.body;
    
        //creates instance of survey, not persisted to database as of yet
        const survey = new Survey({
            title,
            subject,
            body,
            //every string in that array, add comma, return new object wth property email that returns users emal
            recipients: recipients.split(',').map(email => ({ email: email.trim() })),
            _user: req.user.id,
            dateSent: Date.now()
        });    
        //Great place to send an email
        const mailer = new Mailer(survey, surveyTemplate(survey));
        
        try {
            await mailer.send();
            await survey.save();
            req.user.credits -= 1;
            const user = await req.user.save();

            //send back updated user model to udpate header
            res.send(user);
        } catch (err) {
            res.status(422).send(err);
        }
    });
};