const route=require('express-promise-router')()
const TacheControllers=require('../controllers/tache.controllers')
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
.get(verifySecretClient,TacheControllers.getTaches)
.post(verifySecretClient,validateBody(schema.tacheschema),TacheControllers.newTache)

route.route('/:tacheId')
.get(verifySecretClient,validateParam(schema.idschema,'tacheId'),TacheControllers.getOneTache)
.put(verifySecretClient,[validateParam(schema.idschema,'tacheId')
],
TacheControllers.updateTache)

.delete(verifySecretClient,validateParam(schema.idschema,'tacheId'),TacheControllers.deleteTache)

route.route('terminee/:tacheId')
.put(verifySecretClient,[validateParam(schema.idschema,'tacheId')

],
TacheControllers.updateTacheTerminee)
route.route('/:tacheId/bug')
.get(verifySecretClient,validateParam(schema.idschema,'tacheId'),TacheControllers.getBugs)
route.route('/:employeeId/:projetId')
.get(verifySecretClient,validateParam(schema.idschema,'projetId'),TacheControllers.getTachesProjetEmployee)

route.post("/EnvoyerEmailTache", (req, res) => {
    console.log("request came");
    let data = req.body;
    
    TacheControllers.sendMail(data, info => {
      console.log(`The mail has beed send and the id is ${info.messageId}`);
      res.send(info);
    });
  });
module.exports=route