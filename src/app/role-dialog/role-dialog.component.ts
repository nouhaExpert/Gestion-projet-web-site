import { Component, OnInit,Inject  } from '@angular/core';
import { DataService } from '../services/data.service';
import { HttpErrorResponse } from '@angular/common/http';
import{FormBuilder,FormGroup,FormControl, Validators}from'@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from '../services/dialog.service';
import {MAT_DIALOG_DATA,MatDialogRef} from '@angular/material/dialog';
declare var $: any;
@Component({
  selector: 'app-role-dialog',
  templateUrl: './role-dialog.component.html',
  styleUrls: ['./role-dialog.component.scss']
})
export class RoleDialogComponent implements OnInit {
  formValue!: FormGroup
  dataRole:any
  messageErr=""
  showAdd!:boolean
  showUpdate!:boolean
  isSuccessful=false
  nom:String
  message:String
  actionBtn:String="Ajouter"
  constructor(private formbuilder:FormBuilder, private ds:DataService,private dialogservice:DialogService,private route:Router,
    @Inject(MAT_DIALOG_DATA) public editData,
    public dialogRef: MatDialogRef<RoleDialogComponent>) { }
  showNotification(from, align){
  
    $.notify({
        icon: "notifications",
        message:this.message
 
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
      nom:['', Validators.required],
     
    })
    if(this.editData){
      this.actionBtn="Modifier"
      this.formValue.controls['nom'].setValue(this.editData.nom)
    }
  }
  gestionRole(){
    if(!this.editData){
    let data=this.formValue.value
    console.log(data)
    this.ds.addrole(data).subscribe(data=>{
      this.message="ajouter avec succès"
      this.showNotification('top','center')
      this.formValue.reset()
      this.dialogRef.close('Ajouter')
      
    },(err:HttpErrorResponse)=>{
      this.message=err.error.error
      this.showNotificationDanger('top','center')
    })
    
  }else{
    this.updaterole()
  } 
}
  updaterole(){
    const id=this.editData._id
    let dataupdate=this.formValue.value
    console.log(id)
    console.log(dataupdate)
    this.ds.updaterole(id,dataupdate).subscribe((response)=>
    {console.log(response)
      this.message="modifier avec succès"
      this.showNotification('top','center')
      
      this.formValue.reset()
      this.dialogRef.close('Modifier')
    },(err:HttpErrorResponse)=>
    {this.message=err.error.error
      this.showNotificationDanger('top','center')
    })
    
  }

}