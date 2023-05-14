const mongoose=require('mongoose')
const Schema=mongoose.Schema


var schemaprojet= Schema({
    titre:String,
    description:String,
    date_creation:Date,
    date_debut:Date,
    date_fin:Date,
    file:String,
    employee_cree:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "employee"
    },
    tache:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "tache"
    }],
    equipe:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "employee"
    }],
    
    notification:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "notification"
    },
})

var Projet=mongoose.model('projet',schemaprojet)
module.exports=Projet
