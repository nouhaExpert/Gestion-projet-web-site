const route=require('express-promise-router')()
const ProjetControllers=require('../controllers/projet.controllers')
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
.get(verifySecretClient,ProjetControllers.getProjets)
.post(verifySecretClient,ProjetControllers.newProjet)

route.route('/upload')
.post(ProjetControllers.upload)

route.route('/:projetId')
.get(verifySecretClient,validateParam(schema.idschema,'projetId'),ProjetControllers.getOneProjet)
.put(verifySecretClient,validateParam(schema.idschema,'projetId'),
ProjetControllers.updateProjet)
.delete(verifySecretClient,validateParam(schema.idschema,'projetId'),ProjetControllers.deleteProjet)


route.route('/:projetId/tache')
.get(verifySecretClient,validateParam(schema.idschema,'projetId'),ProjetControllers.getTache)

route.route('/:projetId/equipe')
.get(verifySecretClient,validateParam(schema.idschema,'projetId'),ProjetControllers.getEquipe)

route.route('/tache/:employeeId/:projetId')
.get(verifySecretClient,validateParam(schema.idschema,'projetId'),ProjetControllers.PourcentageTacheRealiseProjet)
route.route('/bug/:employeeId/:projetId')
.get(verifySecretClient,validateParam(schema.idschema,'projetId'),ProjetControllers.PourcentageBugProjet)


module.exports=route