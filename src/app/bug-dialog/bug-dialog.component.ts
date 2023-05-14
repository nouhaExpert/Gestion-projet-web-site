import { Component, OnInit ,Inject} from '@angular/core';
import { DataService } from '../services/data.service';
import { HttpErrorResponse } from '@angular/common/http';
import{FormBuilder,FormGroup,FormControl, Validators}from'@angular/forms'
import { TokenStorageService } from '../services/token-storage.service';
import {MAT_DIALOG_DATA,MatDialogRef} from '@angular/material/dialog';
interface type {
  value:any;
}
declare var $: any;
@Component({
  selector: 'app-bug-dialog',
  templateUrl: './bug-dialog.component.html',
  styleUrls: ['./bug-dialog.component.scss']
})
export class BugDialogComponent implements OnInit {
  formValue!: FormGroup
  message:String
  actionBtn:String="Ajouter"
  dataType: type[] = [{value:'Erreur de syntaxe'},{value:'Erreur d’exécution'},{value:'Erreur de logique'}]
  constructor(private ds:DataService,private formbuilder:FormBuilder,private token: TokenStorageService,
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<BugDialogComponent>) { }

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
      type:['', Validators.required],
      titre:['', Validators.required],
      description:['' , Validators.required],
    })
    if(this.data.type){
      this.actionBtn="Modifier"
      this.formValue.controls['type'].setValue(this.data.type)
      this.formValue.controls['titre'].setValue(this.data.titre)
      this.formValue.controls['description'].setValue(this.data.description)
    }
  }
  gestionBug(){
    if(this.data.type){
      this.updateBug()
    }else{
    let data=this.formValue.value
    data.employee=this.token.getUser().id;
    data.tache=this.data.idTache;
    console.log(data)
    this.ds.addbug(data).subscribe(data=>{
      this.message="Bug ajouté avec succès"
      this.showNotification('top','center')
      this.formValue.reset()
      this.dialogRef.close('Ajouter')
      
    },(err:HttpErrorResponse)=>{
      this.message=err.error.error
      this.showNotificationDanger('top','center')
    })
  }
}
updateBug(){
  const idbug=this.data._id
  let dataupdate=this.formValue.value
  console.log(dataupdate)
  this.ds.updatebug(idbug,dataupdate).subscribe((response)=>
  {console.log(response)
    this.message="Bug modifié avec succès"
    this.showNotification('top','center')
    this.formValue.reset()
    this.dialogRef.close('Modifier')

  },(err:HttpErrorResponse)=>
  {this.message=err.message
    this.showNotificationDanger('top','center')
  })
 
}


}
