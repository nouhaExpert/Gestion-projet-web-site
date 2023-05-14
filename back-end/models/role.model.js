const mongoose=require('mongoose')
const Schema=mongoose.Schema


var schemarole=Schema({
    nom:String,
    employee:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "employee"
    }],
})


var Role=mongoose.model('role',schemarole)
module.exports=Role