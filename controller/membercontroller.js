var memberdb = require('../model/membermodel');
var languagesdb = require('../model/languagesmodel');
var studentdb = require('../model/studentsmodel');
var coursedb =require('../model/coursesmodel')
const storage = require('node-persist');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');


exports.login = async(req,res)=>{
   

    var data =await memberdb.find({email:req.body.email});
   
    console.log(data[0])
    if(data.length ==1)
    {
        bcrypt.compare(req.body.password, data[0].password, function (err, result) {

            if (result) {
                var token = jwt.sign({ id: data[0].id }, 'member');

                res.status(200).json({
                    status: "login successfull",
                    token
                })
            }
            else {
                res.status(200).json({
                    status: "check your email and password"
                })
            }
        });
       
    } 
    else{

        res.status(200).json({
            status:"check your email and password"
        })
    }
}
    
exports.logout = async (req,res)=>{
    await storage.init( /* options ... */);
    await storage.clear()
    res.status(200).json({
        status:"logout"
    })
}

exports.register = async(req,res)=>{
   
    var content = await languagesdb.find({course_id:req.body.coures_name});
    console.log(content);
    var date= new Date();
    var enddate = date.toString(date.setMonth(date.getMonth() + content[0].duration));
    var temp =[];
    var dates= new Date();
   
    for(var i = content[0].fee; i > 0; i= i - req.body.installment)
    {
       if(req.body.installment<i)
       {
        var arr = [req.body.installment,"not paid",new Date(dates.setMonth(dates.getMonth()+1))];
        console.log(arr);
        temp.push(arr);
       }
       else{
            
            temp.push([i,"not paid"]);
       }
    }
   
    var data =await studentdb.create({ 
        firstname:req.body.firstname,
        middlename:req.body.middlename,
        lastname:req.body.lastname,
        gender:req.body.gender,
        facluty_name:req.body.facluty_name,
        contect:req.body.contect,
        address:req.body.address,
        coures_name:req.body.coures_name,
        pc_no:req.body.pc_no,
        startingdate:new Date,
        enddate:enddate,
        fee_stu:temp
    });
    
    res.status(200).json({
        status:"add student",
        data
    })
}


exports.student_views = async(req,res)=>{
    var data = await studentdb.find().populate('coures_name');
    res.status(200).json({
        status:"data view student",
        data
    })
}
exports.all_members = async(req,res)=>{
    var data = await memberdb.find({role:"fac"});
    res.status(200).json({
        status:"all members",
        data
    })
}

exports.views_student = async(req,res)=>{
    var id=req.params.id;
    var data = await studentdb.findById(id).populate('coures_name');
    res.status(200).json({
        status:"data view student",
        data
    })
}

exports.your_student = async (req,res) =>{
    await storage.init(/* options ... */);
    var user_id = await storage.getItem('user_id')
    var data = await studentdb.find({facluty_name:user_id}).select("contect coures_name");
    res.status(200).json({
        status:"view your student",
        data
    })
}

exports.search_fee = async(req,res) => {
    var id = req.params.id;
    var data = await studentdb.findById(id).select('fee_stu');
    res.status(200).json({
        status:"fee update search",
        data
    })
}

exports.fee_update = async(req,res) => {
     var id = req.params.id;
     var data = await studentdb.findById(id,{fee_stu:req.body.fee_stu});
     res.status(200).json({
        status:"fee update",
        data
    })
}

exports.deletes = async(req,res)=>{
    var id = req.params.id;
    var data = await studentdb.findByIdAndDelete(id);
    res.status(200).json({
        status:"data delete",
        data
    })
}

exports.update = async(req,res)=>{
    var id = req.params.id;
    var data = await studentdb.findByIdAndUpdate(id,req.body);
    res.status(200).json({
        status:"data update",
        data
    })
}

exports.update_student = async (req, res) => {
    var data = await studentdb.findByIdAndUpdate(req.params.id, req.body)
    res.status(200).json({
        status: "view updated",
        data
    })
}
exports.delete_student = async (req, res) => {
    var data = await studentdb.findByIdAndDelete(req.params.id)
    res.status(200).json({
        status: "deleted",
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

exports.paidfee = async (req,res)=>{
    var id = req.params.id;
    var data = await studentdb.findById(id)
    for(var i=0; i<data.fee_stu.length; i++)
    {
       if(data.fee_stu[i][1]=="not paid")
       {
           console.log(data.fee_stu)
           data.fee_stu[i][1] ="paid"
           break;
       }
    }
    var data = await studentdb.findByIdAndUpdate(id,{fee_stu:data.fee_stu})
    res.status(200).json({
        status:"paid fee",
        data
    })
}


exports.pendingfee = async (req,res) =>{
    var data =await studentdb.find();
    var panding = [];
    var today =new Date();
    for(var i=0; i<data.length;)
    {
        for(var j=0; j<data[i].fee_stu.length;)
        {
            var date = new Date(data[i].fee_stu[j][2])
            if("not paid"==data[i].fee_stu[j][1] && today>=date)
            {
                console.log(Number(date))
                panding.push(data[i])
                break;
            }
            j++
        }
        i++
    }
    res.status(200).json({
        status:"pending fee",
        panding
    })
}