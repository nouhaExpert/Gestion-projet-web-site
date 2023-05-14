const mongoose=require('mongoose')
const Schema=mongoose.Schema


var schemanotification= Schema({
    message:String,
    employee:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "employee"
    }],
    projet:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "projet"
    },
})

var Notification=mongoose.model('notification',schemanotification)
module.exports=Notification