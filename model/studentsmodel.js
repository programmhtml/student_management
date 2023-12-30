const mongoose = require('mongoose');

const studentdb = new mongoose.Schema({
    firstname:{type:String},
    middlename:{type:String},
    lastname:{type:String},
    gender:{type:String},
    facluty_name:{type:mongoose.Schema.Types.ObjectId,ref: "member"},
    contect:{type:Number},
    address:{type:String},
    coures_name:{type: mongoose.Schema.Types.ObjectId,ref: "course"},
    pc_no:{type:Number},
    startingdate:{type:Date,default:Date.now},
    enddate:{type:Date},
    fee_stu:[]
})

module.exports = mongoose.model('student',studentdb)