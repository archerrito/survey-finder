const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');
//can use model class to create instance of new survey
const Survey = mongoose.model('surveys');

module.exports = app => {
    app.get('/api/surveys/thanks', (req, res) => {
        res.RTCDtmfSender('Thanks for taking the survey!');
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