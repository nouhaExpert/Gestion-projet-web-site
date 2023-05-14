const express=require("express")
// const route=express.Router()
const route=require('express-promise-router')()
const EmployeeControllers=require('../controllers/employee.controllers')
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





route.route('/countEmploye')
.get(verifySecretClient,EmployeeControllers.countEmploye) 

route.route('/countProjetCree/:employeeId')
.get(verifySecretClient,EmployeeControllers.countProjetCree) 
route.route('/countProjet/:employeeId')
.get(verifySecretClient,EmployeeControllers.countProjetParticipe) 
route.route('/countActivite/:employeeId')
.get(verifySecretClient,EmployeeControllers.countActiviteParticipe) 
route.route('/countActiviteCree/:employeeId')
.get(verifySecretClient,EmployeeControllers.countActiviteCree) 
route.route('/countTacheRealisee/:employeeId')
.get(verifySecretClient,EmployeeControllers.countTacheRealise) 
route.route('/countBugCree/:employeeId')
.get(verifySecretClient,EmployeeControllers.countBugs) 

route.route('/')
.get(verifySecretClient,EmployeeControllers.getEmployees)
.post(verifySecretClient,validateBody(schema.employeeschema),EmployeeControllers.newEmployee)

route.route('/upload')
.post(EmployeeControllers.upload)

route.route('/active')
.get(verifySecretClient,EmployeeControllers.getEmployeesActive)

route.route('/:employeeId')
.get(verifySecretClient,validateParam(schema.idschema,'employeeId'),EmployeeControllers.getOneEmployee)
.put(verifySecretClient,[validateParam(schema.idschema,'employeeId')
],
EmployeeControllers.updateEmployee)
.delete(verifySecretClient,validateParam(schema.idschema,'employeeId'),EmployeeControllers.deleteEmployee)

route.route('/etat/:employeeId')
.put(verifySecretClient,[validateParam(schema.idschema,'employeeId')
],
EmployeeControllers.updateEmployeeEtat)

route.route('/:employeeId/notification')
.get(verifySecretClient,validateParam(schema.idschema,'employeeId'),EmployeeControllers.getNotification)

route.route('/:employeeId/projet')
.get(verifySecretClient,validateParam(schema.idschema,'employeeId'),EmployeeControllers.getProjets)

route.route('/:employeeId/projet/:annee')
.get(verifySecretClient,validateParam(schema.idschema,'employeeId'),EmployeeControllers.getProjetsAnnee)


route.route('/:employeeId/projetCree')
.get(verifySecretClient,validateParam(schema.idschema,'employeeId'),EmployeeControllers.getProjetsCree)
route.route('/:employeeId/activite')
.get(verifySecretClient,validateParam(schema.idschema,'employeeId'),EmployeeControllers.getActivite)
route.route('/:employeeId/activite/:annee')
.get(verifySecretClient,validateParam(schema.idschema,'employeeId'),EmployeeControllers.getActiviteParAnnee)

route.route('/:employeeId/tachecree')
.get(verifySecretClient,validateParam(schema.idschema,'employeeId'),EmployeeControllers.getTacheCree)
route.route('/:employeeId/tacherealiser')
.get(verifySecretClient,validateParam(schema.idschema,'employeeId'),EmployeeControllers.getTacheRealiser)
route.route('/login')
.post(validateBody(schema.authschema),EmployeeControllers.login)



route.post("/sendmail", (req, res) => {
    console.log("request came");
    let user = req.body;
    EmployeeControllers.sendMail(user, info => {
      console.log(`The mail has beed send and the id is ${info.messageId}`);
      res.send(info);
    });
  });
 
module.exports=route