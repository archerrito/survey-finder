const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
//Same as above
const { Schema } = mongoose;

const recipientSchema = new Schema({
    email: String,
    responded: { type: Boolean, default: false }
});
//loads schema into mongoose
module.exports = recipientSchema;