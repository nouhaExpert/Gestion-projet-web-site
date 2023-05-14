const Fonction=require('../models/fonction.model')



module.exports={
    getFonctions:async(req,res,next) =>{
        const fonction=await Fonction.find({}).populate('employee')
        res.status(200).json(fonction)
            
        
    },
    getOneFonction:async(req,res,next)=>{
        const Id=req.params.fonctionId
        const fonction=await Fonction.findById(Id)
        res.status(200).json(fonction)
    },
    newFonction:async(req,res,next)=>{
        try{ const fonction=await Fonction.findOne({nom:req.body.nom})
        if(fonction){
            res.status(400).json({error:"Fonction est existe"})
        }else{
            const fonction= new Fonction(req.value.body)
        await fonction.save()
        res.status(201).json(fonction)
    }
    }catch(err){
        res.status(400).json({error:"erreur d'ajout"})
      }
    },
    updateFonction:async(req,res,next)=>{
        try{const Id=req.params.fonctionId
        const newfonction=req.body
        const result=await Fonction.findByIdAndUpdate(Id,newfonction)
            
        res.status(200).json(result)
    }catch(err){
        res.status(400).json({error:"erreur de modification"})
      }

    },

    
    deleteFonction:async(req,res,next)=>{
        try{   const Id=req.params.fonctionId
        const fonction=await Fonction.findById(Id)
        if(!fonction){
            return res.status(400).json({error:"fonction don't existe"})
        }
        await fonction.remove()
        res.status(200).json({success:true}) 
    }catch(err){
        res.status(400).json({error:"erreur de suppression"})
      }
    },
    getEmployee:async(req,res,next)=>{
        const Id=req.params.fonctionId
        const fonction=await Fonction.findById(Id).populate('employee')
        res.status(200).json(fonction.employee)

    },
}    