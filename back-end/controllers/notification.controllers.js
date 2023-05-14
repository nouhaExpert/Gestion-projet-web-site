const Notification=require('../models/notification.model')
const Employee=require('../models/employee.model')
const Projet=require('../models/projet.model')

module.exports={
    getNotification:async(req,res,next) =>{
        const notification=await Notification.find({})
        res.status(200).json(notification)
            
        
    },
    getOneNotification:async(req,res,next)=>{
        const Id=req.params.notificationId
        const notification=await Notification.findById(Id)
        res.status(200).json(notification)
    },
    newNotification:async(req,res,next)=>{
        const projet=await Projet.findById(req.body.projet)
        const newNotification=req.body
        delete newNotification.projet
        const notification= new Notification(newNotification)
        notification.projet=projet

        await notification.save()
       
        
        res.status(201).json(notification)

    
    },

    // updateNotification:async(req,res,next)=>{
    //     try{    const Id=req.params.notificationId
        
    //     const notification=await Notification.findById(Id)
        
    //     notification.etat="Consultée"
        
    //     const result=await Notification.findByIdAndUpdate(Id,notification)
        
    //     res.status(200).json(result)
    // }catch(err){
    //     res.status(400).json({error:"erreur de modification"})
    //   } 

    // },
    updateNotification:async(req,res,next)=>{
        try{  const Id=req.params.notificationId
        const employee=await Employee.findById(req.body.employee)
        const notification=req.body
      
        const result=await Notification.findByIdAndUpdate(Id,notification)
        employee.notification.push(result)
        employee.save()
        res.status(200).json(result)

    }catch(err){
        res.status(400).json({error:"erreur de modification"})
      }
    },

}    