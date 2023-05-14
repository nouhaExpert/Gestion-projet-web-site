const Joi = require('joi')
module.exports={
    validateParam:(shema,name)=>{
        return(req,res,next)=>{
            const result= shema.validate({param:req['params'][name]})
        if(result.error){
            return res.status(400).json(result.error)
        }else{
            
            if(!req.value)
                req.value={};
            if(!req.value['params'])
                req.value['params']={};
            req.value['params'][name]=result.value.params    
            next()    
        } 
        
        }

    },
    validateBody:(shema)=>{
        return(req,res,next)=>{
            const result= shema.validate(req.body)
        if(result.error){
            return res.status(400).json(result.error)
        }else{
            
            if(!req.value)
                req.value={};
            if(!req.value['body'])
                req.value['body']={};
            req.value['body']=result.value  
            next()    
        } 
        
        }

    },


    schema:{

        employeeschema:Joi.object().keys({
            nom:Joi.string().min(2).required(),
            prenom:Joi.string().min(2).required(),
            email:Joi.string().email().required(),
            age:Joi.number().min(20).max(65).required(),
            tel:Joi.number().min(10000000).max(999999999).required(),
            motdepasse:Joi.string().required(),
            role:Joi.array().required(),
            fonction:Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            grade:Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            file:Joi.string().required(),
        }),

        projetschema:Joi.object().keys({
            titre:Joi.string().min(2).required(),
            description:Joi.string().min(2).required(),
            date_debut:Joi.date().raw().required(),
            date_fin:Joi.date().raw().required(),
            employee_cree:Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            equipe:Joi.array().required(),
            file:Joi.string().required(),
            
        }),
        projetschemaupdate:Joi.object().keys({
            titre:Joi.string().min(2).required(),
            description:Joi.string().min(2).required(),
            date_debut:Joi.date().raw().required(),
            date_fin:Joi.date().raw().required(),
            equipe:Joi.array().required(),
            file:Joi.string(),
            
        }),
        tacheschema:Joi.object().keys({
            titre:Joi.string().min(2).required(),
            priorite:Joi.number().min(1).max(4).required(),
            employee:Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            projet:Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
        
        }),
        tacheschemaupdate:Joi.object().keys({
            titre:Joi.string().min(2).required(),
            priorite:Joi.number().min(1).max(5).required(),
        
            
        }),
        roleschema:Joi.object().keys({
            nom: Joi.string().min(2).max(50).required()
        }),
        fonctionschema:Joi.object().keys({
            nom: Joi.string().min(2).max(50).required()
        }),
        gradeschema:Joi.object().keys({
            nom: Joi.string().min(2).max(50).required()
        }),
        activiteschema:Joi.object().keys({
            type:Joi.string().required(),
            titre:Joi.string().min(2).required(),
            description:Joi.string().min(2).required(),
            file:Joi.string().required(),
            employee:Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
        
            
        }),
        activiteschemaupdate:Joi.object().keys({
            type:Joi.string().required(),
            titre:Joi.string().min(2).required(),
            description:Joi.string().min(2).required(),
            file:Joi.string(),
            
        
            
        }),
        bugchema:Joi.object().keys({
            type:Joi.string().required(),
            titre:Joi.string().min(2).required(),
            description:Joi.number().min(2).required(),
        
            
        }),
        authschema:Joi.object().keys({
            email:Joi.string().email().required(),
            password:Joi.string().required()
        }),


        idschema: Joi.object().keys({
            param:Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
        })
        
    }

}

