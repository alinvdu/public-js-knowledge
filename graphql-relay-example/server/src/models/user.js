const mongoose = require('mongoose');

const User = mongoose.model('User', {
    name: String
});

exports.createUser = name => new Promise((resolve, reject) => {
    const newUser = new User({
        name
    });

    newUser.save().then(user => resolve(user)).catch(err => reject(err));
})

exports.getUsers = () => new Promise((resolve, reject) => User.find().then(users => resolve(users)).catch(err => reject(err)));
