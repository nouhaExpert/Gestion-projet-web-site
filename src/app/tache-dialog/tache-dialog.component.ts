import { Component, OnInit,Inject } from '@angular/core';
import { DataService } from '../services/data.service';
import { HttpErrorResponse } from '@angular/common/http';
import{FormBuilder,FormGroup,FormControl, Validators}from'@angular/forms'
import { TokenStorageService } from '../services/token-storage.service';
import {MAT_DIALOG_DATA,MatDialogRef} from '@angular/material/dialog';
declare var $: any;
interface priorite {
  value:any;
}
@Component({
  selector: 'app-tache-dialog',
  templateUrl: './tache-dialog.component.html',
  styleUrls: ['./tache-dialog.component.scss']
})
export class TacheDialogComponent implements OnInit {
  formValue!: FormGroup
  message:String
  actionBtn:String="Ajouter"
  dataPriorite: priorite[] = [{value:1},{value:2},{value:3},{value:4}]
  envoyerEmail:any=false
  projet:any
employe:any

nouveauTache={
  email:[],
  Nomemployé:'',
  Prenomemployé:'',
  tache:{}
}
  constructor(private ds:DataService,private formbuilder:FormBuilder,private token: TokenStorageService,
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<TacheDialogComponent>) { }
    showNotification(from, align){
     
      $.notify({
          icon: "notifications",
          message: this.message
  
      },{
          type: 'success',
          timer: 3000,
          placement: {
              from: from,
              align: align
          },
          template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
            '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
            '<i class="material-icons" data-notify="icon">notifications</i> ' +
            '<span data-notify="title">{1}</span> ' +
            '<span data-notify="message">{2}</span>' +
            '<div class="progress" data-notify="progressbar">' +
              '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
            '</div>' +
            '<a href="{3}" target="{4}" data-notify="url"></a>' +
          '</div>'
      });
    }

    showNotificationDanger(from, align){
 

      $.notify({
          icon: "notifications",
          message: this.message
    
      },{
          type: 'danger',
          timer: 3000,
          placement: {
              from: from,
              align: align
          },
          template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
            '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
            '<i class="material-icons" data-notify="icon">notifications</i> ' +
            '<span data-notify="title">{1}</span> ' +
            '<span data-notify="message">{2}</span>' +
            '<div class="progress" data-notify="progressbar">' +
              '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
            '</div>' +
            '<a href="{3}" target="{4}" data-notify="url"></a>' +
          '</div>'
      });
      
      
    }
  
  ngOnInit(): void {
    
    this.formValue=this.formbuilder.group({
      titre:['', Validators.required],
      priorite:['' , Validators.required],
      
      
    })
    if(this.data.titre){

      this.actionBtn="Modifier"
      this.formValue.controls['titre'].setValue(this.data.titre)
      this.formValue.controls['priorite'].setValue(this.data.priorite)
    }
    
  }
  gestionTache(){
    if(this.data.titre){
      this.updatetache()
    }else{
      
    let dataform=this.formValue.value
    

    this.ds.getOneProjet(this.data).subscribe(
     data => { this.projet=data
     for (let i = 0; i < this.projet.equipe.length; i++) {
      this.ds.getOneEmployee(this.projet.equipe[i]).subscribe(data => { this.employe=data
        let email=this.employe.email
        
        this.nouveauTache.email.push(email)
       
      })
      
     }
  })
  
    this.nouveauTache.Nomemployé=this.token.getUser().nom
    this.nouveauTache.Prenomemployé=this.token.getUser().prenom
    this.nouveauTache.tache=dataform
    console.log(dataform)
    dataform.employee=this.token.getUser().id;
    dataform.projet=this.data;
    this.ds.addtache(dataform).subscribe(data=>{
      if(this.envoyerEmail==true){
       
        this.ds.EnvoyerEmailTache(this.nouveauTache).subscribe(
          data => {
            let res:any = data;
           
            console.log(
              ` successfully added and mail has been sent and the message id is ${res.messageId}`);
              this.message="Tâche ajoutée avec succès"
              // this.message="Tâche ajoutée avec succès"
             this.showNotification('top','center')
             this.formValue.reset()
             this.dialogRef.close('Ajouter')
            
            },(err:HttpErrorResponse)=>{
              debugger
              this.message="Tâche ajoutée avec succès"
        this.showNotification('top','center')
        this.formValue.reset()
        this.dialogRef.close('Ajouter')
              // this.message="erreur d'ajout"
              // console.log(err.error)
              // this.showNotificationDanger('top','center')
            })

      }else{
        this.message="Tâche ajoutée avec succès"
        this.showNotification('top','center')
        this.formValue.reset()
        this.dialogRef.close('Ajouter')
  
      }
      
    },(err:HttpErrorResponse)=>{
      this.message=err.error.error
      this.showNotificationDanger('top','center')
    })
  }
 
}
  updatetache(){
    const idtache=this.data._id
    let dataupdate=this.formValue.value
    console.log(dataupdate)
    this.ds.updatetache(idtache,dataupdate).subscribe((response)=>
    {console.log(response)
      this.message="Tâche modifiée avec succès"
      this.showNotification('top','center')
      this.formValue.reset()
      this.dialogRef.close('Modifier')

    },(err:HttpErrorResponse)=>
    {this.message=err.message
      this.showNotificationDanger('top','center')
    })
   
  }
  EnvoyerEmail(){
this.envoyerEmail=true
    

  }

}
