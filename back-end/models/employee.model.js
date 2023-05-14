const mongoose=require('mongoose')
const Schema=mongoose.Schema


var schemaEmployee=Schema({
    nom:String,
    prenom:String,
    email:String,
    age:Number,
    tel:Number,
    etat:String,
    motdepasse:String,
    date_creation:Date,
    file:String,
    role:[{
        type: Schema.Types.ObjectId,
        ref: "role"
    }],
    fonction:{
        type: Schema.Types.ObjectId,
        ref: "fonction"
    },
    grade:{
        type: Schema.Types.ObjectId,
        ref: "grade"
    },
    
    projet_cree:[{
        type: Schema.Types.ObjectId,
        ref: "projet"
    }],
    tache_cree:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "tache"
    }],
    tache_realiser:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "tache"
    }],
    projet:[{
        type: Schema.Types.ObjectId,
        ref: "projet"
    }],
    activite_cree:[{
        type: Schema.Types.ObjectId,
        ref: "activite"
    }],
    activite:[{
        type: Schema.Types.ObjectId,
        ref: "activite"
    }],
    bug_cree:[{
        type: Schema.Types.ObjectId,
        ref: "bug"
    }],
    bug_correcter:[{
        type: Schema.Types.ObjectId,
        ref: "bug"
    }],
   
    notification:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "notification"
    }],

})


Employee=mongoose.model('employee',schemaEmployee)
module.exports=Employee

