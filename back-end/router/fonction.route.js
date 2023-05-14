const route=require('express-promise-router')()
const FonctionControllers=require('../controllers/fonction.controllers')
const{validateParam,validateBody,schema}=require('../helpers/routeHelpers')

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
.get(verifySecretClient,FonctionControllers.getFonctions)
.post(verifySecretClient,validateBody(schema.fonctionschema),FonctionControllers.newFonction)

route.route('/:fonctionId')
.get(verifySecretClient,validateParam(schema.idschema,'fonctionId'),FonctionControllers.getOneFonction)
.put(verifySecretClient,[validateParam(schema.idschema,'fonctionId'),validateBody(schema.fonctionschema)],FonctionControllers.updateFonction)
.delete(verifySecretClient,validateParam(schema.idschema,'fonctionId'),FonctionControllers.deleteFonction)

route.route('/:fonctionId/employee')
.get(verifySecretClient,validateParam(schema.idschema,'fonctionId'),FonctionControllers.getEmployee)



module.exports=route