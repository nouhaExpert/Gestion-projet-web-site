const Grade=require('../models/grade.model')



module.exports={
    getGrades:async(req,res,next) =>{
        const grade=await Grade.find({}).populate('employee')
        res.status(200).json(grade)
            
        
    },
    getOneGrade:async(req,res,next)=>{
        const Id=req.params.gradeId
        const grade=await Grade.findById(Id)
        res.status(200).json(grade)
    },
    newGrade:async(req,res,next)=>{
    try{const grade=await Grade.findOne({nom:req.body.nom})
    if(grade){
        res.status(400).json({error:"Grade est existe"})
    }else{
        const grade= new Grade(req.value.body)
        await grade.save()
        res.status(201).json(grade)
    }
    }catch(err){
        res.status(400).json({error:"erreur d'ajout"})
      }
    },
    updateGrade:async(req,res,next)=>{
        try{   const Id=req.params.gradeId
        const newgrade=req.body
        const result=await Grade.findByIdAndUpdate(Id,newgrade)
            
        res.status(200).json(result)
    }catch(err){
        res.status(400).json({error:"erreur de modification"})
      }

    },

   
    deleteGrade:async(req,res,next)=>{
        try{    const Id=req.params.gradeId
        const grade=await Grade.findById(Id)
        if(!grade){
            return res.status(400).json({error:"grade don't existe"})
        }
        await grade.remove()
        res.status(200).json({success:true}) 
    }catch(err){
        res.status(400).json({error:"erreur de suppression"})
      }
    },
    getEmployees:async(req,res,next)=>{
        const Id=req.params.gradeId
        const grade=await Grade.findById(Id).populate('employee')
        res.status(200).json(fonctiongrade)
    },
}    