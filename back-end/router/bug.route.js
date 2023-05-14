const route=require('express-promise-router')()
const BugControllers=require('../controllers/bug.controllers')
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
.get(BugControllers.getBug)
.post(BugControllers.newBug,validateBody(schema.bugchema),)

route.route('/:bugId')
.get(validateParam(schema.idschema,'bugId'),BugControllers.getOneBug)
.put(verifySecretClient,[validateParam(schema.idschema,'bugId')],BugControllers.updateBug)
.delete(verifySecretClient,validateParam(schema.idschema,'bugId'),BugControllers.deleteBug)
route.route('/:employeeId/:projetId')
.get(verifySecretClient,validateParam(schema.idschema,'projetId'),BugControllers.getbugsProjetEmployee)

route.route('/bugTache/:employeeId/:tacheId')
.get(verifySecretClient,validateParam(schema.idschema,'tacheId'),BugControllers.getbugsTacheEmployee)



module.exports=route