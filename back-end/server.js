const express=require("express")
require('dotenv').config()
const mongoose = require("mongoose");
var logger = require('morgan')
var bodyParser = require('body-parser')
const employeeRoute=require('./router/employee.route')
const projetRoute=require('./router/projet.route')
const TacheRoute=require('./router/tache.route')
const RoleRoute=require('./router/role.route')
const FonctionRoute=require('./router/fonction.route')
const GradeRoute=require('./router/grade.router')
const ActiviteRoute=require('./router/activite.route')
const BugRoute=require('./router/bug.route')
const NotificationRoute=require('./router/notification.route')


const nodemailer = require("nodemailer");
mongoose.Promise = global.Promise;
const app=express()
app.use(bodyParser.json())
const cors = require("cors");
var corsOptions = {
  origin: "http://localhost:4200"
};
global.__basedir = __dirname;
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'))
URL=process.env.URL
mongoose.connect(URL, {useNewUrlParser: true,useUnifiedTopology: true})
  .then(() =>{ 
    console.log("Successfully connect to MongoDB.");
    })
  .catch(err => {
    console.error("Connection error", err)
    process.exit();});




 





app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use((req,res,next)=>{
  res.setHeader('Access-Control-Allow-Origin','*')
  res.setHeader('Access-Control-Request-Methods','*')
  res.setHeader('Access-Control-Allow-Headers','*')
  res.setHeader('Access-Control-Allow-Methods','*')
  next()
})



app.use('/employees',employeeRoute)
app.use('/projets',projetRoute)
app.use('/taches',TacheRoute)
app.use('/roles',RoleRoute)
app.use('/fonctions',FonctionRoute)
app.use('/grades',GradeRoute)
app.use('/activites',ActiviteRoute)
app.use('/bugs',BugRoute)
app.use('/notifications',NotificationRoute)
app.use('/static', express.static(__dirname + '/uploads/fichier'));


PORT=process.env.PORT || 3000;
app.listen(PORT,()=>console.log(`Server is running on port ${PORT}.`));