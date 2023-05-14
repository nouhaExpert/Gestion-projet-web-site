const Tache=require('../models/tache.model')
const Bug=require('../models/bug.model')
const Employee=require('../models/employee.model')
const Projet=require('../models/projet.model')


module.exports={
    getBug:async(req,res,next) =>{
        const bugs=await Bug.find({})
        res.status(200).json(bugs)
    },
    getOneBug:async(req,res,next) =>{
        const bug=await Bug.findById(req.params.bugId)
        res.status(200).json(bug)
    },
    newBug:async(req,res,next) =>{
        try{  const bugs=await Bug.findOne({titre:req.body.titre})
        if(bugs){
            res.status(400).json({error:"Bug est existe"})
        }else{
             var tache=await Tache.findById(req.body.tache)
        var employee=await Employee.findById(req.body.employee)
      

        var newBug=req.body

        delete newBug.tache
        delete newBug.employee
        delete newBug.projet

        var bug=new Bug(newBug)
         bug.date_creation=Date.now()
         bug.etat="En cours"

         bug.employee_correcter=null
          bug.employee_cree=employee
            
         
        bug.tache=tache
        
        await bug.save()
        
       
        tache.bug.push(bug._id)
          tache.save()
      
         employee.bug_cree.push(bug._id)
         employee.save()
        
       

        res.status(200).json(bug)
        }
    }catch(err){
        res.status(400).json({error:"erreur d'ajout"})
      } 
    },
    updateBug:async(req,res,next)=>{

            try{   const Id=req.params.bugId
                const employee=await Employee.findById(req.body.employee_correcter)
            const newbug=req.body
            if(newbug.etat=='Corrigé'){
                newbug.employee_correcter=employee
                
            }
            const result=await Bug.findByIdAndUpdate(Id,newbug)
            if(newbug.etat=='Corrigé'){
                employee.bug_correcter.push(result)
                employee.save()
                }
                
            res.status(200).json(result)
    
        }catch(err){
            res.status(400).json({error:"erreur de modification"})
          }
        },
        deleteBug:async(req,res,next)=>{
            try{   const Id=req.params.bugId
            const bug=await Bug.findById(Id)
            if(!bug){
                return res.status(400).json({error:"bug don't existe"})
            }
            
            const employeeCreeId=bug.employee_cree
            if(bug.etat=="Corrigé"){
               const employeeCorrecterId=bug.employee_correcter
               const employeeCorrecter=await Employee.findById(employeeCorrecterId)
               employeeCorrecter.bug_correcter.pull(bug)
               employeeCorrecter.save()
    
            }
            
            
            const employeeCree=await Employee.findById(employeeCreeId)
         
            const tache=await Tache.findById(bug.tache)
            
            await bug.remove()
           
            employeeCree.bug_cree.pull(bug)
            employeeCree.save()
          
            tache.bug.pull(bug)
            tache.save()
            
            res.status(200).json({success:true})
    
        }catch(err){
            res.status(400).json({error:"erreur de suppression"})
          }  
    
        },

        getbugsProjetEmployee:async(req,res,next)=>{
            var bugs = [];
            const IdProjet=req.params.projetId
            const projet=await Projet.findById(IdProjet).populate('bug')
            const IdEmployee=req.params.employeeId
            const employee=await Employee.findById(IdEmployee).populate('bug_cree')
            for (let i = 0; i < projet.bug.length; i++) {
                for (let j = 0; j <employee.bug_cree.length; j++) {
                    // console.log(projet.bug[i]._id)
                    // console.log(employee.bug_cree[j]._id)
            if((projet.bug[i]._id.toString())==(employee.bug_cree[j]._id.toString())){
                bugs.push(projet.bug[i])
                console.log(projet.bug[i])
                    console.log(employee.bug_cree[j]._id)
                
    
            }
        }
        }
        console.log(bugs)
        res.status(200).json(bugs)
        },


        getbugsTacheEmployee:async(req,res,next)=>{
            var bugs = [];
            const IdTache=req.params.tacheId
            const tache=await Tache.findById(IdTache).populate('bug')
            const IdEmployee=req.params.employeeId
            const employee=await Employee.findById(IdEmployee).populate('bug_cree')
            for (let i = 0; i < tache.bug.length; i++) {
                for (let j = 0; j <employee.bug_cree.length; j++) {
                    // console.log(projet.bug[i]._id)
                    // console.log(employee.bug_cree[j]._id)
            if((tache.bug[i]._id.toString())==(employee.bug_cree[j]._id.toString())){
                bugs.push(tache.bug[i])
                console.log(tache.bug[i])
                    console.log(employee.bug_cree[j]._id)
                
    
            }
        }
        }
        console.log(bugs)
        res.status(200).json(bugs)
        },

}    
