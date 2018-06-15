const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
//Same as above
const { Schema } = mongoose;
const RecipientSchema = require('./Recipient');

const surveySchema = new Schema({
    title: String,
    body: String,
    subject: String,
    recipients: [RecipientSchema],
    yes: { type: Number, default: 0},
    no: { type: Number, default: 0},
    _user: { type: Schem.Types.ObjectId, ref: 'User' },
    dateSent: Date,
    lastResponded: Date
});
//loads schema into mongoose
mongoose.model('surveys', surveySchema);