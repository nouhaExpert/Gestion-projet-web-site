const route=require('express-promise-router')()
const GradeControllers=require('../controllers/grade.controllers')
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
.get(verifySecretClient,GradeControllers.getGrades)
.post(verifySecretClient,validateBody(schema.gradeschema),GradeControllers.newGrade)

route.route('/:gradeId')
.get(verifySecretClient,validateParam(schema.idschema,'gradeId'),GradeControllers.getOneGrade)
.put(verifySecretClient,[validateParam(schema.idschema,'gradeId'),validateBody(schema.gradeschema)],GradeControllers.updateGrade)
.delete(verifySecretClient,validateParam(schema.idschema,'gradeId'),GradeControllers.deleteGrade)

route.route('/:gradeId/employee')
.get(verifySecretClient,validateParam(schema.idschema,'gradeId'),GradeControllers.getEmployees)



module.exports=route