const mongoose = require('mongoose');

const member = new mongoose.Schema({
    name:{type:String},
    email:{type:String},
    password:{type:String},
    role:{type:String}
})

module.exports = mongoose.model('member',member)