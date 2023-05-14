const mongoose=require('mongoose')
const Schema=mongoose.Schema


var schemagrade= Schema({
    nom:String,
    employee:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "employee"
    }],
})

var Grade=mongoose.model('grade',schemagrade)
module.exports=Grade