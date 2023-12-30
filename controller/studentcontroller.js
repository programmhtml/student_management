
exports.pending_fees =async(req,res)=>{
    if(req.query.name==undefined){
        var data= await studentdb.find().select('name coursename startingdate faculty_name installment').populate('coursename').populate('faculty_name')
    }
    else{
        var data= await studentdb.find({name:{$regex:'.*'+ req.query.name +'.*'}}).select('name coursename startingdate faculty_name installment').populate('coursename').populate('faculty_name')
    }
    var pending=[];
    for(var i=0;i<data.length;i++){
        for(var j=0;j<data[i].installment.length;j++){
            var date=new Date(data[i].installment[j][0])
            var today = new Date();
            console.log(date)
            if(date<today && data[i].installment[j][1]=='not paid'){
                if(!pending.includes(data[i])){
                    pending.push(data[i]);
                }
            }
        }
    }
    data=pending
    res.status(200).json({
        status: "pending fees",
        data
    })
}
exports.fee_paid=async(req,res)=>{
    var data=await studentdb.findById(req.params.id);

    for(var i=0;i<data.installment.length;i++){
        if(data.installment[i][1]=='not paid'){
            data.installment[i][1]='paid'
            break;
        }
    }
    
    var data = await studentdb.findByIdAndUpdate(req.params.id,{installment:data.installment})
    res.status(200).json({
        status: "success",
    })
}