const route=require('express-promise-router')()
const { Router } = require('express')
const ActiviteControllers=require('../controllers/activite.controllers')
const{validateParam,validateBody,schema}=require('../helpers/routeHelpers')
const upload=require('../middlewares/upload')

var secretkey=process.env.SECRET_KEY
var clientkey=process.env.CLIENT_KEY
verifySecretClient=(req,ers,next)=>{
    let sk=req.query.secret
    let ck=req.query.client
    if(sk==secretkey && ck==clientkey){
        next()
    }else{
        res.status(400).json({error:"you can't access to this route because you don't sent me secret key and client key"})
    }
}

route.route('/')
.get(verifySecretClient,ActiviteControllers.getActivites)
.post(verifySecretClient,validateBody(schema.activiteschema),ActiviteControllers.newActivite)


route.route('/upload')
.post(ActiviteControllers.upload)





route.get("/files", ActiviteControllers.getListFiles);

route.route('/:activiteId')
.put(verifySecretClient,[validateParam(schema.idschema,'activiteId'),validateBody(schema.activiteschemaupdate)],ActiviteControllers.updateActivite)
.delete(verifySecretClient,validateParam(schema.idschema,'activiteId'),ActiviteControllers.deleteActivite)
.get(verifySecretClient,validateParam(schema.idschema,'activiteId'),ActiviteControllers.getOneActivitee)

route.route('/type/:type')
.get(verifySecretClient,ActiviteControllers.getActivitesType)
route.route('/affecter/:activiteId')
.put(verifySecretClient,validateParam(schema.idschema,'activiteId'),ActiviteControllers.affecterActivite)



module.exports=route