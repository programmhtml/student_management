const mongoose = require('mongoose');

const course = new mongoose.Schema({
  coures_name:{type:String}
})

module.exports = mongoose.model('course',course)