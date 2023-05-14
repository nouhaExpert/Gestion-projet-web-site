const mongoose=require('mongoose')
const Schema=mongoose.Schema


var schemaactivite= Schema({
    type:String,
    titre:String,
    description:String,
    date_creation:Date,
    file:String,
    employee_cree:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "employee"
    },
    employee:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "employee"
    }],
})

var Activite=mongoose.model('activite',schemaactivite)
module.exports=Activite