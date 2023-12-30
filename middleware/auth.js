
var jwt = require('jsonwebtoken');

exports.admin = (req,res,next)=>{
    jwt.verify(req.get('authorization'),'admin',next())

}

exports.member = (req,res,next)=>{
    jwt.verify(req.get('authorization'),'member',next())

}