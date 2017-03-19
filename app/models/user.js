// app/models/user.js
// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = new mongoose.Schema({
    isAdmin: {type: Boolean, default: false},
    email: String,
    password: String,
});

userSchema.set('toJSON', {
    transform: function(doc, ret, options) {
        delete ret.password;
        return ret;
    }
});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(String(password), bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(String(password), this.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
