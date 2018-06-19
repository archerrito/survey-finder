const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/keys');

//helper.Mail helper object that extends mal class from sendgrd library
//similar to react component setup
class Mailer extends helper.Mail {
    //new, constructor called auato, allows for setup
    constructor( { subject, recipients }, content) {
        super();
        //pass keys, gives object we can use to interact with API
        this.sgApi = sendGrid(keys.sendGridKey);
        this.from_email = new helper.Email('no-reply@surveyfinder.com');
        this.subject = subject;
        this.body = new helper.Content('text/html', content);
        this.recipients = this.formatAddresses(recipients);
        
        //built-in functionality of helper mail class
        this.addContent(this.body);
        //clicktracking
        this.addClickTracking();
        //helper called in class
        this.addRecipients();
    }
    //extract each email from object, iterate through list, then return the array
    formatAddresses(recipients) {
        return recipients.map(({ email }) => {
            //format with helper, pass in email just extracted
            return new helper.Email(email);
        });
    }

    addClickTracking() {
      const trackingSettings = new helper.TrackingSettings();
      const clickTracking = new helper.ClickTracking(true, true);

      trackingSettings.setClickTracking(clickTracking);
      this.addTrackingSettings(trackingSettings);
    }

    addRecipients() {
        const personalize = new helper.Personalization();
        this.recipients.forEach(recipient => {
            //take recipeints and add to personalize object
            personalize.addTo(recipient);
        });
        //function defined by mail base class, add personalize object
        this.addPersonalization(personalize);
    }

    async send() {
        const request = this.sgApi.emptyRequest({
            method: 'POST',
            path:'/v3/mail/send',
            body: this.toJSON()
        });

       const response =  await this.sgApi.API(request);
       return response;
    }
}

module.exports = Mailer;