const Projet=require('../models/projet.model')
const Employee=require('../models/employee.model')
const Tache=require('../models/tache.model')
const uploadFile=require('../middlewares/upload')



module.exports={
    getProjets:async(req,res,next) =>{
        const projets=await Projet.find({}).populate('employee_cree')
        res.status(200).json(projets)
    },
    newProjet:async(req,res,next) =>{
        try{    const projetTest=await Projet.findOne({titre:req.body.titre})
        if(projetTest){
            res.status(400).json({error:"Projet est existe"})
        }else if(req.body.date_debut>req.body.date_fin){
                res.status(400).json({error:"Date fin doit être supérieure a la date du début"})
        }else{
        const employee_cree=await Employee.findById(req.body.employee_cree)
        
        const equipe=await Employee.find(
            {
              _id: { $in:req.body.equipe }
            })

        const newprojet=req.body
        delete newprojet.employee_cree
        delete newprojet.equipe

        const projet=new Projet(newprojet)
        projet.notification=null
        projet.employee_cree=employee_cree
        projet.equipe=equipe
        projet.date_creation=Date.now()
  
        await projet.save()
        for (let i = 0; i < equipe.length; i++) {
            equipe[i].projet.push(projet._id)
            equipe[i].save()}

        employee_cree.projet_cree.push(projet._id)
        
        employee_cree.save()
        

        res.status(200).json(projet)
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

    getOneProjet:async(req,res,next) =>{
        const projet=await Projet.findById(req.params.projetId).populate('employee_cree')
        res.status(200).json(projet)
    },
    updateProjet:async(req,res,next)=>{
        try{     const Id=req.params.projetId
        const projet=await Projet.findById(Id)
        const newprojet=req.body
        const equipe=await Employee.find(
            {
              _id: { $in:newprojet.equipe }
            })
        newprojet.equipe=equipe 
        const equipepresédent=await Employee.find(
            {
              _id: { $in:projet.equipe }
            })
         
        const result=await Projet.findByIdAndUpdate(Id,newprojet)
        for (let j = 0; j < equipepresédent.length; j++) {
            equipepresédent[j].projet.pull(projet)
            equipepresédent[j].save()}  
        
        for (let i = 0; i < equipe.length; i++) {
            equipe[i].projet.push(result)
            equipe[i].save()}
            
        res.status(200).json(result)
    }catch(err){
        res.status(400).json({error:"erreur de modification"})
      }

    },
    deleteProjet:async(req,res,next)=>{
        try{   const Id=req.params.projetId
        const projet=await Projet.findById(Id)
        if(!projet){
            return res.status(400).json({error:"projet don't existe"})
        }
        const employee_creeId=projet.employee_cree
        const employee_cree=await Employee.findById(employee_creeId)
        const equipe=await Employee.find(
            {
              _id: { $in:projet.equipe }
            })
            const tache=await Tache.find(
                {
                  _id: { $in:projet.tache }
                })
        await projet.remove()
        employee_cree.projet_cree.pull(projet)
        employee_cree.save()
        for (let i = 0; i < equipe.length; i++) {
            equipe[i].projet.pull(projet)
            equipe[i].save()}
            for (let i = 0; i < tache.length; i++) {
                await tache[i].remove()}
        res.status(200).json({success:true})

    }catch(err){
        res.status(400).json({error:"erreur de suppression"})
      } 

    },
    getTache:async(req,res,next)=>{
        const Id=req.params.projetId
        const projet=await Projet.findById(Id).populate('tache')
        res.status(200).json(projet.tache)

    },
    PourcentageTacheRealiseProjet:async(req,res,next)=>{
      let countTacheEmployee=0
      let countTache=0
      const IdEmploye=req.params.employeeId
      const IdProjet=req.params.projetId
      const projet=await Projet.findById(IdProjet)
      const employee=await Employee.findById(IdEmploye)
      for (let i = 0; i < projet.tache.length; i++) {
        countTache++
        for (let j = 0; j < employee.tache_realiser.length; j++) {
        if(projet.tache[i].toString()==employee.tache_realiser[j].toString()){
          countTacheEmployee++

        }
        }}
        let pourcentage =(countTacheEmployee*100)/countTache
      
      res.status(200).json(pourcentage)

  },
  PourcentageBugProjet:async(req,res,next)=>{
    let countBugEmployee=0
    let countBug=0
    const IdEmploye=req.params.employeeId
    const IdProjet=req.params.projetId
    const projet=await Projet.findById(IdProjet)
    const employee=await Employee.findById(IdEmploye)
    for (let i = 0; i < projet.tache.length; i++) {
      const tache=await Tache.findById(projet.tache[i])
    for (let k = 0; k < tache.bug.length; k++) {
      countBug++
      for (let j = 0; j < employee.bug_cree.length; j++) {
      if(tache.bug[k].toString()==employee.bug_cree[j].toString()){
        countBugEmployee++

      }
      }}
    }
      
      let pourcentage =(countBugEmployee*100)/countBug
    
    res.status(200).json(pourcentage)

},
  
    getEquipe:async(req,res,next)=>{
        const Id=req.params.projetId
        const projet=await Projet.findById(Id).populate('equipe')
        res.status(200).json(projet.equipe)

    },
    
    

}            