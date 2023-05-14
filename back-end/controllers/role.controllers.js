const Role=require('../models/role.model')
const Employee=require('../models/employee.model')




module.exports={
    getRole:async(req,res,next) =>{
        const roles=await Role.find({}).populate('employee')
        res.status(200).json(roles)
    },
    getRolenonAdmin:async(req,res,next) =>{
        var role = [];
        const roles=await Role.find({}).populate('employee')
        for (let i = 0; i < roles.length; i++) {
            if(roles[i].nom!='admin'){
                role.push(roles[i]);
            }
          }
        res.status(200).json(role)
    },
    getOneRole:async(req,res,next) =>{
        const role=await Role.findById(req.params.roleId)
        res.status(200).json(role)
    },
    newRole:async(req,res,next) =>{
        try{  const role=await Role.findOne({nom:req.body.nom})
        if(role){
            res.status(400).json({error:"Role est existe"})
        }else{
             const newrole=req.body
        const role=new Role(newrole)
        await role.save()
        res.status(200).json(role)
    }
    }catch(err){
        res.status(400).json({error:"erreur d'ajout"})
      }
    },
  
    updateRole:async(req,res,next)=>{
        try{   const Id=req.params.roleId
        const newrole=req.body
        const result=await Role.findByIdAndUpdate(Id,newrole)
            
        res.status(200).json(result)

    }catch(err){
        res.status(400).json({error:"erreur de modification"})
      }
    },

    deleteRole:async(req,res,next)=>{
        try{   const Id=req.params.roleId
        const role=await Role.findById(Id)
        if(!role){
            return res.status(400).json({error:"role don't existe"})
        }
        
        const employees=await Employee.find(
            {
              _id: { $in:role.employee }
            })
        await role.remove()
        for (let i = 0; i < employees.length; i++) {
            employees[i].role.pull(role)
            employees[i].save()}
        res.status(200).json({success:true})

    }catch(err){
        res.status(400).json({error:"erreur de suppression"})
      } 

    },
    getEmployee:async(req,res,next)=>{
        const Id=req.params.roleId
        const role=await Role.findById(Id).populate('employee')
        res.status(200).json(role.employee)

    }
}    