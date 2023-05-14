const mongoose=require('mongoose')
const Schema=mongoose.Schema


var schemaTache= Schema({
    titre:String,
    priorite:Number,
    etat:String,
    date_creation:Date,
    employee_cree:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "employee"
    },
    employee_realiser:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "employee"
    },
    projet:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "projet"
    },
    bug:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "bug"
    }]
})

var Tache=mongoose.model('tache',schemaTache)
module.exports=Tache