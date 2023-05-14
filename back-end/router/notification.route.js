const route=require('express-promise-router')()
const NotificationControllers=require('../controllers/notification.controllers')
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
.get(verifySecretClient,NotificationControllers.getNotification)
.post(verifySecretClient,NotificationControllers.newNotification)
route.route('/:notificationId')
.get(verifySecretClient,validateParam(schema.idschema,'notificationId'),NotificationControllers.getOneNotification)
.put(verifySecretClient,[validateParam(schema.idschema,'notificationId')

],
NotificationControllers.updateNotification)
module.exports=route