require('dotenv').config()
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const Employee=require('../models/employee.model')
const Fonction = require('../models/fonction.model')
const Grade=require('../models/grade.model')
const Role=require('../models/role.model')
const Projet=require('../models/projet.model')
const nodemailer = require("nodemailer");
const uploadFile=require('../middlewares/uploadImage')



module.exports={
    getEmployees:async(req,res,next) =>{
        var employee = [];
        const employees=await Employee.find({}).populate('fonction').populate('grade')
        const role=await Role.findOne({nom:'admin'})
        for (let i = 0; i < employees.length; i++) {
            if(!employees[i].role.includes(role._id)){
                employee.push(employees[i]);
            }
          }
        res.status(200).json(employee)
        .catch(err =>{
            next(err)
        })
            
        
    },
    getEmployeesActive:async(req,res,next) =>{
        var employeeactive = [];
        const employees=await Employee.find({})
        const role=await Role.findOne({nom:'admin'})
        for (let i = 0; i < employees.length; i++) {
            if(employees[i].etat=='active' && !employees[i].role.includes(role._id)){
                employeeactive.push(employees[i]);
            }
          }
        res.status(200).json(employeeactive)
        .catch(err =>{
            next(err)
        })
            
        
    },
    
    newEmployee:async(req,res,next)=>{
        try{const employeeTest=await Employee.findOne({email:req.body.email})
        if(employeeTest){
            res.status(400).json({error:"employee est existe"})
        }else{
            
            const role=await Role.find(
                {
                  _id: { $in: req.body.role }
                })
            const IdFonction=req.body.fonction
            const fonction=await Fonction.findById(IdFonction)
            const IdGrade=req.body.grade
            const grade=await Grade.findById(IdGrade)
            const newEmployee= req.body
            delete newEmployee.role
            delete newEmployee.fonction
            delete newEmployee.grade
            const motdepasse=newEmployee.motdepasse
            delete newEmployee.motdepasse

            const salt=await bcrypt.genSalt(10)
            const passwordHash=await bcrypt.hash(motdepasse,salt)

            const employee= new Employee(newEmployee)
            employee.motdepasse=passwordHash
            employee.date_creation=Date.now()
            employee.role = role

            employee.fonction=fonction
            employee.grade=grade
            employee.etat="active"
            await employee.save()
            for (let i = 0; i < role.length; i++) {
            role[i].employee.push(employee._id)
            role[i].save()}
            fonction.employee.push(employee._id)
            fonction.save()
            grade.employee.push(employee._id)
            grade.save()


        res.status(201).json(employee)
    }
    }catch(err){
        res.status(400).json({error:"erreur d'ajout"})
  }  
    },
    async sendMail(user, callback) {
        debugger
        // create reusable transporter object using the default SMTP transport
        try{  let transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
            user: "nouhahammami21@gmail.com",
            pass: 'ocjeomirzjgiqhfs'
          }
        });
      
        let mailOptions = {
          from: 'Gestion des projets: Accéder à votre espace', // sender address
          to: user.email, // list of receivers
          subject: "Gestion des projets: Accéder à votre espace", // Subject line
          html: `Bonjour<strong>  ${user.prenom} ${user.nom},</strong> voici votre mot de passe :<br>${user.motdepasse} <br><br>
          merci de vous entrer sur ce lien pour consulter votre espace:<br><a href="http://localhost:4200">http://localhost:4200</a> `
        };
      
        // send mail with defined transport object
        let info = await transporter.sendMail(mailOptions);
      
        callback(info);
    }catch(err){
        callback(err)
        
            // res.status(400).json({error:"erreur d'envoi l'email"})
      }
      },

      
      upload : async (req, res) => {
     
        try {
          await uploadFile(req, res);
          if (req.file == undefined) {
            return res.status(400).send({ message: "Please upload a image!" });
          }
          res.status(200).send({
            message: req.file.filename,
            
          });
          
        } catch (err) {
          res.status(500).send({
            message: `Please upload a image!`,
          });
        }
        
      },
      
      
    getOneEmployee:async(req,res,next)=>{
        const Id=req.params.employeeId
        const employee=await Employee.findById(Id).populate('fonction').populate('grade').populate('role').populate('projet')
        res.status(200).json(employee)
    },
    updateEmployee:async(req,res,next)=>{
        try{const Id=req.params.employeeId
        const employee=await Employee.findById(Id)
        
        const newEmployee=req.body
       
        //modifier mot de passe
        const motdepasse=newEmployee.motdepasse
        const salt=await bcrypt.genSalt(10)
        const passwordHash=await bcrypt.hash(motdepasse,salt)
        newEmployee.motdepasse=passwordHash
        //modifier fonction
        const Fonctionprecedent=await Fonction.findById(employee.fonction)
        Fonctionprecedent.employee.pull(employee)
        Fonctionprecedent.save()
        const IdFonction=newEmployee.fonction
        const fonction=await Fonction.findById(IdFonction)
        newEmployee.fonction=fonction
        //modifier grade
        const Gradeprecedent=await Grade.findById(employee.grade)
        Gradeprecedent.employee.pull(employee)
        Gradeprecedent.save()
        const IdGrade=req.body.grade
        const grade=await Grade.findById(IdGrade)
        newEmployee.grade=grade
        //modifier role
        const Roleprecedent=await Role.find(
            {
              _id: { $in: employee.role }
            })
            for (let i = 0; i < Roleprecedent.length; i++) {
                Roleprecedent[i].employee.pull(employee)
                Roleprecedent[i].save()}
        const role=await Role.find(
            {
              _id: { $in: req.body.role }
            })
            newEmployee.role=role   



        const result=await Employee.findByIdAndUpdate(Id,newEmployee)
        //save fonction
        fonction.employee.push(result)
        fonction.save()
        //save grade
        grade.employee.push(result)
        grade.save()
        // save role
        for (let i = 0; i < role.length; i++) {
            role[i].employee.push(employee)
            role[i].save()}
        res.status(200).json(result)

    }catch(err){
        res.status(400).json({error:"erreur de modification"})
      }

    },
    updateEmployeeEtat:async(req,res,next)=>{
        try{  const Id=req.params.employeeId
       
        
        const newEmployee=req.body
        
       
        const result=await Employee.findByIdAndUpdate(Id,newEmployee)
        
        res.status(200).json(result)
        
    }catch(err){
        res.status(400).json({error:"erreur de modification"})
      }


    },
    deleteEmployee:async(req,res,next)=>{
        try{ const Id=req.params.employeeId
        const employee=await Employee.findById(Id)
        if(!employee){
            return res.status(400).json({error:"employee don't existe"})
        }
        const IdFonction=employee.fonction
        const IdGrade=employee.grade
        const projet=await Projet.find(
            {
              _id: { $in: employee.projet }
            })
        const role=await Role.find(
            {
              _id: { $in: employee.role }
            })
        const fonction=await Fonction.findById(IdFonction)
        const grade=await Grade.findById(IdGrade)
        await employee.remove()
        for (let i = 0; i < projet.length; i++) {
            projet[i].equipe.pull(employee)
            projet[i].save()}
        for (let i = 0; i < role.length; i++) {
            role[i].employee.pull(employee)
            role[i].save()}
       fonction.employee.pull(employee)
        fonction.save()
        grade.employee.pull(employee)
        grade.save()
        
        res.status(200).json({success:true})
    }catch(err){
        res.status(400).json({error:"erreur de suppression"})
      }
        

    },
    getNotification:async(req,res,next)=>{
        const Id=req.params.employeeId
        const employee=await Employee.findById(Id).populate('notification')
        res.status(200).json(employee.notification)
        

    },
    getProjets:async(req,res,next)=>{
        const Id=req.params.employeeId
        const employee=await Employee.findById(Id).populate('projet')
        res.status(200).json(employee.projet)
        

    },
    getProjetsAnnee:async(req,res,next)=>{
        const Id=req.params.employeeId
        const annee=req.params.annee
        const employee=await Employee.findById(Id).populate('projet')
        const projet=employee.projet
        var projetParAnnee = [];
        for (let i = 0; i < projet.length; i++) {
            const anneeProjet=new Date(projet[i].date_creation).getFullYear()
            if(annee==anneeProjet){
                projetParAnnee.push(projet[i])

            }
        }
      
        res.status(200).json(projetParAnnee)
        

    },
    getProjetsCree:async(req,res,next)=>{
        const Id=req.params.employeeId
        const employee=await Employee.findById(Id).populate('projet_cree')
        res.status(200).json(employee.projet_cree)
        

    },
    
    getTacheCree:async(req,res,next)=>{
        const Id=req.params.employeeId
        const employee=await Employee.findById(Id).populate('tache_cree')
        res.status(200).json(employee.tache_cree)

    },
    getTacheRealiser:async(req,res,next)=>{
        const Id=req.params.employeeId
        const employee=await Employee.findById(Id).populate('tache_realiser')
        res.status(200).json(employee.tache_realiser)

    },
    
    getActivite:async(req,res,next)=>{
        const Id=req.params.employeeId
        const employee=await Employee.findById(Id).populate('activite')
        res.status(200).json(employee.activite)
        

    },
    getActiviteParAnnee:async(req,res,next)=>{
        const Id=req.params.employeeId
        const annee=req.params.annee
        const employee=await Employee.findById(Id).populate('activite')
        const activite=employee.activite
        var activiteParAnnee = [];
        for (let i = 0; i < activite.length; i++) {
            const anneeActivite=new Date(activite[i].date_creation).getFullYear()
            if(annee==anneeActivite){
                activiteParAnnee.push(activite[i])

            }
        }
        res.status(200).json(activiteParAnnee)
        

    },
    countEmploye:async(req,res,next)=>{
        const employees=await Employee.find({}).count()
        res.status(200).json(employees)
        
    },
    countProjetCree:async(req,res,next)=>{
        const Id=req.params.employeeId
        let count=0
        const employe=await Employee.findById(Id)
        for (let i = 0; i < employe.projet_cree.length; i++) {
            count++;
        }
         
        res.status(200).json(count)  

    },
    countProjetParticipe:async(req,res,next)=>{
        const Id=req.params.employeeId
        let count=0
        const employe=await Employee.findById(Id)
        for (let i = 0; i < employe.projet.length; i++) {
            count++;
        }
         
        res.status(200).json(count) 

    },
    countActiviteParticipe:async(req,res,next)=>{
        const Id=req.params.employeeId
        let count=0
        const employe=await Employee.findById(Id)
        for (let i = 0; i < employe.activite.length; i++) {
            count++;
        }
         
        res.status(200).json(count) 

    },
    countActiviteCree:async(req,res,next)=>{
        const Id=req.params.employeeId
        let count=0
        const employe=await Employee.findById(Id)
        for (let i = 0; i < employe.activite_cree.length; i++) {
            count++;
        }
         
        res.status(200).json(count) 

    },
    countTacheRealise:async(req,res,next)=>{
        const Id=req.params.employeeId
        let count=0
        const employe=await Employee.findById(Id)
        for (let i = 0; i < employe.tache_realiser.length; i++) {
            count++;
        }
         
        res.status(200).json(count)  

    },
    countBugs:async(req,res,next)=>{
        const Id=req.params.employeeId
        let count=0
        const employe=await Employee.findById(Id)
        for (let i = 0; i < employe.bug_cree.length; i++) {
            count++;
        }
         
        res.status(200).json(count)  

    },
    login:async(req,res,next)=>{
        try{ privatekey=process.env.PRIVATE_KEY
        const email=req.body.email
        const motdepasse=req.body.password
        const user=await Employee.findOne({email:email}).populate('role')
        if(!user){
            return res.status(400).json({error:"Erreur d'authentification!"})
        }else if(user.etat=='Inactive'){
                return res.status(400).json({error:"Erreur d'authentification!"})
        }else{
           
            const same=await bcrypt.compare(motdepasse,user.motdepasse)
            
            if(same){
                
                let token=jwt.sign({id:user._id},privatekey,{
                    expiresIn:'5h',
                })
                var authoritiesid = [];
                for (let i = 0; i < user.role.length; i++) {
                authoritiesid.push(user.role[i]._id);
                
                }
                var authoritiesnom = [];
                for (let i = 0; i < user.role.length; i++) {
                authoritiesnom.push(user.role[i].nom);
                }
                return res.status(200).json({id: user._id,nom:user.nom,prenom:user.prenom,email: user.email,age:user.age,tel:user.tel,password:user.motdepasse,fonction:user.fonction,grade:user.grade,rolesId: authoritiesid,rolesNom: authoritiesnom,date_creation:user.date_creation,image:user.file,accessToken: token})
            }else{
                return res.status(400).json({error:"Erreur d'authentification!"})
            }    

        }
    }catch(err){
        res.status(400).json({error:"Erreur d'authentification!"})
      }
    },

    
   

}



