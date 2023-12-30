const mongoose = require('mongoose');

const language = new mongoose.Schema({
    course_id:{type:String},
    languages:[ ],
    duration:{type:Number},
    fee:{type:Number}
})

module.exports = mongoose.model('language',language)