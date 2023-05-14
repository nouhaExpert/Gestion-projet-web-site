const Tache=require('../models/tache.model')
const Projet=require('../models/projet.model')
const Employee=require('../models/employee.model')
const nodemailer = require("nodemailer");


module.exports={
    getTaches:async(req,res,next) =>{
        const taches=await Tache.find({})
        res.status(200).json(taches)
    },
    newTache:async(req,res,next) =>{
        try{ const tacheTest=await Tache.findOne({titre:req.body.titre})
        if(tacheTest){
            res.status(400).json({error:"Tâche est existe"})
        }else{
              const projet=await Projet.findById(req.body.projet)
        const employee=await Employee.findById(req.body.employee)
        //const employeeRealiser=await Employee.findById(req.body.employee_realiser)

        const newTache=req.body

        delete newTache.projet
        delete newTache.employee
        
        const tache=new Tache(newTache)
            tache.date_creation=Date.now()
            tache.etat="En cours"

            tache.employeeRealiser=null
            tache.employee_cree=employee
            
            

        

        tache.projet=projet
      
        await tache.save()

        projet.tache.push(tache._id)
        
        projet.save()
        employee.tache_cree.push(tache._id)
        employee.save()

        res.status(200).json(tache)
        }
    }catch(err){
        res.status(400).json({error:"erreur d'ajout"})
      } 
    
    },

    async sendMail(data, callback) {
        // create reusable transporter object using the default SMTP transport
        try{  let transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
            user: "nouhahammami21@gmail.com",
            pass: 'ocjeomirzjgiqhfs'
          }
        });
      
        let mailOptions = {
          from: "Gestion des projets: Ajout d'une nouvelle tâche", // sender address
          to: data.email, // list of receivers
          subject: "Gestion des projets: Ajout d'une nouvelle tâche", // Subject line
          html: `Bonjour à tous,<br> Par la présente, Je vous informe que <strong> ${data.Prenomemployé} ${data.Nomemployé} </strong> ajouté une tâche ${data.tache.titre} de priorité ${data.tache.priorite}. `
        };
      
        // send mail with defined transport object
        let info = await transporter.sendMail(mailOptions);
      
        callback(info);
    }catch(err){
         callback(err);
        // res.status(400).json({error:"erreur d'envoi l'email"})
      }
      },
    getOneTache:async(req,res,next) =>{
        const tache=await Tache.findById(req.params.tacheId).populate('employee_cree').populate('employee_realiser')
        res.status(200).json(tache)
    },
    updateTache:async(req,res,next)=>{
        try{    const Id=req.params.tacheId
        const employee=await Employee.findById(req.body.employee_realiser)
        const newtache=req.body
        if(newtache.etat=='Réalisée'){
            newtache.employee_realiser=employee
            
        }
        const result=await Tache.findByIdAndUpdate(Id,newtache)
        if(newtache.etat=='Réalisée'){
        employee.tache_realiser.push(result)
        employee.save()
        }
        res.status(200).json(result)
    }catch(err){
        res.status(400).json({error:"erreur de modification"})
      } 

    },
    updateTacheTerminee:async(req,res,next)=>{
        try{    const Id=req.params.tacheId
        
        const newtache=await Tache.findById(Id)
        
            newtache.etat="Réalisée"
        
        
           // newtache.employee_realiser=employee
        
        
        const result=await Tache.findByIdAndUpdate(Id,newtache)
        // employee.tache_realiser.push(result)
        // employee.save()
        res.status(200).json(result)
    }catch(err){
        res.status(400).json({error:"erreur de modification"})
      } 

    },
    deleteTache:async(req,res,next)=>{
        try{   const Id=req.params.tacheId
        const tache=await Tache.findById(Id)
        if(!tache){
            return res.status(400).json({error:"tache don't existe"})
        }
        const projetId=tache.projet
        const employeeCreeId=tache.employee_cree
        if(tache.etat=="Réalisée"){
           const employeeRealiserId=tache.employee_realiser
           const employeeRealiser=await Employee.findById(employeeRealiserId)
           employeeRealiser.tache_realiser.pull(tache)
           employeeRealiser.save()

        }
        
        const projet=await Projet.findById(projetId)
        const employeeCree=await Employee.findById(employeeCreeId)
        
        await tache.remove()
        projet.tache.pull(tache)
        projet.save()
        employeeCree.tache_cree.pull(tache)
        employeeCree.save()
        
        res.status(200).json({success:true})

    }catch(err){
        res.status(400).json({error:"erreur de suppression"})
      }  

    },
    getBugs:async(req,res,next)=>{
        const Id=req.params.tacheId
        const tache=await Tache.findById(Id).populate('bug')
        res.status(200).json(tache.bug)

    },
    getTachesProjetEmployee:async(req,res,next)=>{
        var tache = [];
        const IdProjet=req.params.projetId
        const projet=await Projet.findById(IdProjet).populate('tache')
        const IdEmployee=req.params.employeeId
        const employee=await Employee.findById(IdEmployee).populate('tache_realiser')
        for (let i = 0; i < projet.tache.length; i++) {
            for (let j = 0; j <employee.tache_realiser.length; j++) {
                console.log(projet.tache[i]._id)
                console.log(employee.tache_realiser[j]._id)
        if((projet.tache[i]._id.toString())==(employee.tache_realiser[j]._id.toString())){
            tache.push(projet.tache[i])
            console.log(projet.tache[i])
                console.log(employee.tache_realiser[j]._id)
            

        }
    }
    }
    res.status(200).json(tache)
    },
}    

