const route=require('express-promise-router')()
const RoleControllers=require('../controllers/role.controllers')
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
.get(verifySecretClient,RoleControllers.getRole)
.post(verifySecretClient,validateBody(schema.roleschema),RoleControllers.newRole)

route.route('/sansadmin')
.get(verifySecretClient,RoleControllers.getRolenonAdmin)

route.route('/:roleId')
.get(verifySecretClient,validateParam(schema.idschema,'roleId'),RoleControllers.getOneRole)
.put(verifySecretClient,[validateParam(schema.idschema,'roleId'),validateBody(schema.roleschema)],RoleControllers.updateRole)
.delete(verifySecretClient,validateParam(schema.idschema,'roleId'),RoleControllers.deleteRole)

route.route('/:roleId/employee')
.get(verifySecretClient,validateParam(schema.idschema,'roleId'),RoleControllers.getEmployee)




module.exports=route