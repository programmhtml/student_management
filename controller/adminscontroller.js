var admindb = require('../model/adminsmodel');
var memberdb = require('../model/membermodel');
var coursedb = require('../model/coursesmodel');
var languagedb = require('../model/languagesmodel');
var studentdb = require('../model/studentsmodel');
const storage = require('node-persist');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');

exports.login = async(req,res)=>{
   
    console.log(req.body.email);
    var data =await admindb.find({email:req.body.email});
   
 
        if(data.length ==1)
        {
            
            if(req.body.password == data[0].password)
            {              
                var token = jwt.sign({id:data[0].id},'admin');

                res.status(200).json({
                    status:"login successfull",
                    token   
                })
            }
            else{
                res.status(200).json({
                    status:"check your email and password"
                })
            }
        }
        else{
            console.log(data)

            res.status(200).json({
                status:"check your email and password"
            })
        }
    }
   


exports.logout = async (req,res)=>{
    await storage.init( /* options ... */ );
    var id = await storage.clear();

    res.status(200).json({
        status:"logout"
    })
}


exports.admin_register = async(req,res)=>{
    if(req.body.role == "fac" || req.body.role == "rec")
    {
        bcrypt.hash(req.body.password, 10,async function(err, hash) {
            // Store hash in your password DB.
            if(!err){
                    req.body.password = hash
                var data = await memberdb.create(req.body);
                res.status(200).json({
                    status:"fac added",
                    data
                })
            }
            else{
                res.status(404).json({
                    status:"error",
                })
            }
        });
    
    }
    else{
         res.status(200).json({
             status:"not add"
         })
    }
}

exports.views = async(req,res)=>{
    if(req.query.role == undefined)
    {
        var data = await memberdb.find();
    }
    else
    {
        var data = await memberdb.find({role:req.query.role});
    }
    res.status(200).json({
        status:"all view member",
        data
    })
}

exports.view_fac = async(req,res)=>{
    var id=req.params.id;
    var data = await memberdb.findById(id)
    res.status(200).json({
        status:"data view fac and rec",
        data
    })
}

exports.student_view = async(req,res)=>{
    var data = await studentdb.find().populate('coures_name');
    res.status(200).json({
        status:"data view student",
        data
    })
}

exports.views_student = async(req,res)=>{
    var id=req.params.id;
    var data = await studentdb.findById(id).populate('coures_name')
    res.status(200).json({
        status:"data view student",
        data
    })
}

exports.update = async(req,res)=>{
    var id=req.params.id;
    var data = await memberdb.findByIdAndUpdate(id,req.body);

    res.status(200).json({
        status:"success",
        data
    })
}

exports.deletes = async(req,res)=>{
    var id=req.params.id;
    console.log(id);
    var data = await memberdb.findByIdAndDelete(id);

    res.status(200).json({
        status:"success",
        data
    })
}

exports.update_search = async(req,res)=>{
    var id=req.params.id;
    var data = await memberdb.findById(id);

    res.status(200).json({
        status:"update search",
        data
    })
}



exports.add_language = async(req,res)=>{
    var data = await languagedb.create(req.body)
    res.status(200).json({
        status: "language added",
        data
    })
}
exports.view_language = async(req,res)=>{
    var data = await languagedb.find()
    res.status(200).json({
        status: "language view",
        data
    })
}

exports.add_course = async(req,res)=>{
    var data = await coursedb.create(req.body);
    res.status(200).json({
        status:"add course",
        data
    })
}

exports.views_course = async(req,res)=>{
    var data = await coursedb.find();
    res.status(200).json({
        status:"course views",
        data
    })
}

