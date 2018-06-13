const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
//Same as above
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String,
    credits: { type: Number, default: 0 }
    
});
//loads schema into mongoose
mongoose.model('users', userSchema);