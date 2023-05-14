const Activite=require('../models/activite.model')
const Employee=require('../models/employee.model')
const uploadFile=require('../middlewares/upload')
const express=require("express")


module.exports={
    getActivites:async(req,res,next) =>{
        const activites=await Activite.find({}).populate('employee_cree')
        res.status(200).json(activites)
    },
    getOneActivitee:async(req,res,next)=>{
        const Id=req.params.activiteId
        const activite=await Activite.findById(Id).populate('employee_cree').populate('employee')
        res.status(200).json(activite)
    },
    getActivitesType:async(req,res,next) =>{
        const type=req.params.type
        const activites=await Activite.find({})
        var  activitetype= [];
        if(type=='Commuté'){
        
        for (let i = 0; i < activites.length; i++) {
            if(activites[i].type=='Commuté'){
                activitetype.push(activites[i]);
            }
          }
        }else if(type=='Réunion'){
            for (let i = 0; i < activites.length; i++) {
                if(activites[i].type=='Réunion'){
                    activitetype.push(activites[i]);
                }
              }

        }else if(type=='Événement'){
            for (let i = 0; i < activites.length; i++) {
                if(activites[i].type=='Événement'){
                    activitetype.push(activites[i]);
                }
              }
        }
        res.status(200).json(activitetype)
    },
   
    
    newActivite:async(req,res,next) =>{
        try{const employee=await Employee.findById(req.body.employee)
        const activiteTest=await Activite.findOne({titre:req.body.titre})
        if(activiteTest){
            res.status(400).json({error:"Activite est existe"})
        }else{

        const newactivite=req.body
        delete newactivite.employee
       
        
        const activite=new Activite(newactivite)
        activite.employee_cree=employee
        activite.employee=employee
        activite.date_creation=Date.now()
        
           
   
           
        
        await activite.save()

        employee.activite_cree.push(activite._id)
        employee.activite.push(activite._id)
        employee.save()
        

        res.status(200).json(activite)
        }
      }catch(err){
        res.status(400).json({error:"erreur d'ajout"})
      }
    },
    upload : async (req, res) => {
     
        try {
          await uploadFile(req, res);
          if (req.file == undefined) {
            return res.status(400).send({ message: "Please upload a file!" });
          }
          res.status(200).send({
            message: req.file.filename,
            
          });
          
        } catch (err) {
          res.status(500).send({
            message: `Could not upload the file: ${req.file}. ${err}`,
          });
        }
        
      },
    //   download : async (req, res) => {
     
    //       const file='/uploads/fichier/' + req.body.filename
    //       console.log(file)
    //       res.sendFile(file)
        
    //   },
    //   downloadPost: async (req, res) => {
     
    //     const filepath=path.join(__dirname,'../uploads/fichier'+'/'+req.body.filename);
    //     res.sendFile(filepath)
       
    // },
      getListFiles: (req, res) => {
        const directoryPath = __basedir + "/uploads/fichier";
        fs.readdir(directoryPath, function (err, files) {
          if (err) {
            res.status(500).send({
              message: "Unable to scan files!",
            });
          }
          let fileInfos = [];
          files.forEach((file) => {
            fileInfos.push({
              name: file,
              url: baseUrl + file,
            });
          });
          res.status(200).send(fileInfos);
        });
      },
    updateActivite:async(req,res,next)=>{
      try{const Id=req.params.activiteId
        const newactivite=req.body
        const result=await Activite.findByIdAndUpdate(Id,newactivite)
         
        res.status(200).json(result)
      }catch(err){
        res.status(400).json({error:"erreur de modification"})
      }

    },
    affecterActivite:async(req,res,next)=>{
      try{const Id=req.params.activiteId
        const employee=await Employee.findById(req.body.employee)
        const verif=false
        const activite=await Activite.findById(Id)
        for (let i = 0; i < activite.employee.length; i++) {
            if(activite.employee[i]==req.body.employee){
               verif=true
               
            
            
            }
        }
        if(verif==false){
        activite.employee.push(employee)
        activite.save()
        employee.activite.push(activite)
        employee.save()    
        res.status(200).json(activite)
        }
      }catch(err){
        res.status(400).json({error:"activité est déjà faite"})
      }


    },
    deleteActivite:async(req,res,next)=>{
      try{const Id=req.params.activiteId
        const activite=await Activite.findById(Id)
        if(!activite){
            return res.status(400).json({error:"activité don't existe"})
        }
        const Idemployee_cree=activite.employee_cree
        const employee_cree=await Employee.findById(Idemployee_cree)
        const employee=await Employee.find(
            {
              _id: { $in:activite.employee }
            })
        await activite.remove()
        employee_cree.activite_cree.pull(activite)
        employee_cree.save()
        for (let i = 0; i < employee.length; i++) {
            employee[i].activite.pull(activite._id)
            employee[i].save()}
        res.status(200).json({success:true})
      }catch(err){
        res.status(400).json({error:"erreur de suppression"})
      }
        

    },
}