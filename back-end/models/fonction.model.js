const mongoose=require('mongoose')
const Schema=mongoose.Schema


var schemafonction= Schema({
    nom:String,
    employee:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "employee"
    }]
})
const Fonction=mongoose.model('fonction',schemafonction)
module.exports=Fonction