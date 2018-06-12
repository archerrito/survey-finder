const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
//Same as above
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String
    
});
//loads schema into mongoose
mongoose.model('users', userSchema);