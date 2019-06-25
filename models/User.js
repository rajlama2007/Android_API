const mongoose = require('mongoose');
const User = mongoose.model('User', {
    firstName: {      //this all name match and should be same in android model
        type: String
    },
    lastName: {
        type: String
    },
    userName: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    }
})
module.exports = User