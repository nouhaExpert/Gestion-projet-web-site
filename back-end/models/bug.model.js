const mongoose=require('mongoose')
const Schema=mongoose.Schema


var schemabug= Schema({
    type:String,
    titre:String,
    description:String,
    etat:String,
    date_creation:Date,
    employee_cree:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "employee"
    },
    employee_correcter:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "employee"
    },
    tache:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "tache"
    },
    
})

var Bug=mongoose.model('bug',schemabug)
module.exports=Bug