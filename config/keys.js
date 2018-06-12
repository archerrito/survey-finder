module.exports = {
    googleClientID: '581047459006-4mmtucb7h502hn01f9vqbostm4hveio1.apps.googleusercontent.com',
    googleClientSecret: 'dew-BWj_WLXBSqbiUg7hYj56',
    mongoURI: 'mongodb://archerdev:surveyfinder1@ds115360.mlab.com:15360/survey-finder-dev',
    cookieKey: 'dfgdfgdfglnlkjnwen;n983u45lksdc'
};

if (process.env.NODE_ENV === 'production') {
    //in production - return prod set of keys
    module.exports = require('./prod');
} else {
    //in dev, return dev keys
    module.exports = require('./dev');

}