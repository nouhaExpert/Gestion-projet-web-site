import { Component, OnInit,Inject } from '@angular/core';
import { DataService } from '../services/data.service';
import { HttpErrorResponse } from '@angular/common/http';
import{FormBuilder,FormGroup,FormControl, Validators}from'@angular/forms'
import { TokenStorageService } from '../services/token-storage.service';
import { DialogService } from '../services/dialog.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpEvent, HttpResponse , HttpEventType } from '@angular/common/http';
import {MAT_DIALOG_DATA,MatDialogRef} from '@angular/material/dialog';
interface type {
  value:any;
}
declare var $: any;
@Component({
  selector: 'app-activite-dialog',
  templateUrl: './activite-dialog.component.html',
  styleUrls: ['./activite-dialog.component.scss']
})
export class ActiviteDialogComponent implements OnInit {
  formValue!: FormGroup
  formValueActivite!: FormGroup

  
  dataActiviteType:any
  dataOneActivite:any
  showAdd:boolean=true
  showUpdate!:boolean
  
  type:any
  titreAll:any
  activite:any
  showinput!:boolean
  message:String
  fichierAEnvoyer: File = null; 

  selectedFiles?: FileList;
  currentFile?: File;
  
  message1 = '';
  fileInfos?: Observable<any>;
  currentFile1:String
  dataType: type[] = [{value:"Commuté"},{value:"Réunion"},{value:"Événement"},{value:"Autre"}]
  constructor(private formbuilder:FormBuilder, private ds:DataService,private token: TokenStorageService,
    @Inject(MAT_DIALOG_DATA) public editData,
    public dialogRef: MatDialogRef<ActiviteDialogComponent>) { }

  
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
    if(!this.editData){
    this.formValue=this.formbuilder.group({
      type:['', Validators.required],
      titre:['', Validators.required],
      description:['' , Validators.required],
      file:['' , Validators.required],
          
      
    })
  }else{
    this.formValue=this.formbuilder.group({
      type:['', Validators.required],
      titre:['', Validators.required],
      description:['' , Validators.required],
      
    })

  }
    this.formValueActivite=this.formbuilder.group({
      activite:['', Validators.required]
      
    })
    if(this.editData){
      this.showAdd=false
      this.showUpdate=true
      this.formValue.controls['type'].setValue(this.editData.type)
      this.formValue.controls['titre'].setValue(this.editData.titre)
      this.formValue.controls['description'].setValue(this.editData.description)
      
      
    }
  }
  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }
//   envoiFichier (event:any) {
//     this.fichierAEnvoyer =( event.target as HTMLInputElement).files.item(0);
//     console.log(" rrrrrrr",this.fichierAEnvoyer)
// }
add(): void {
  
  
  if (this.selectedFiles) {
    const file: File | null = this.selectedFiles.item(0);
    if (file) {
      this.currentFile = file;
      
      this.ds.upload(this.currentFile).subscribe({
        next: (event: any) => {
         
         if (event instanceof HttpResponse) {
            this.message = event.body.message;
            this.currentFile1=event.body.message;
            

            let data=this.formValue.value
            data.employee=this.token.getUser().id;
           
            console.log(data)
            data.file=this.currentFile1
            console.log(this.currentFile1)
            this.ds.addactivite(data).subscribe(data=>{
              this.message="ajouter avec succès"
              this.showNotification('top','center')
              
              
              this.formValue.reset()
              this.dialogRef.close('Ajouter')
            },(err:HttpErrorResponse)=>{
             
              this.message=err.error.error
              this.showNotificationDanger('top','center')
            })
           
            
          }
        },
        error: (err: any) => {
          console.log(err);
          
          if (err.error && err.error.message) {
            this.message = err.error.message;
            this.showNotification('top','center')
          } else {
            this.message = 'Could not upload the file!';
            this.showNotificationDanger('top','center')
          }
          
          this.currentFile = undefined;
        }
      });
    }
    
    this.selectedFiles = undefined;
  }

}
  
  
  affecter(){
    const id=this.formValueActivite.value.activite
    
    this.ds.getOneActivite(id).subscribe(data=>{this.dataOneActivite=data
      this.dataOneActivite.employee=this.token.getUser().id;
      this.ds.affecterActivite(id,this.dataOneActivite).subscribe((response)=>
    {console.log(response)
      this.message="affecter avec succès"
      this.showNotification('top','center')
     
     
      this.formValue.reset()
      this.dialogRef.close('Affecter')
    },(err:HttpErrorResponse)=>
    {
     
      this.message=err.error.error
      this.showNotificationDanger('top','center')
      
    })
    })

  }
  updateactivite(){
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      if (file) {
        this.currentFile = file;
        
        this.ds.upload(this.currentFile).subscribe({
          next: (event: any) => {
           
           if (event instanceof HttpResponse) {
              this.message = event.body.message;
              this.currentFile1=event.body.message;

            
    const id=this.editData._id
    let dataupdate=this.formValue.value
    dataupdate.file=this.currentFile1
    console.log(this.currentFile1)
    console.log(dataupdate)
    this.ds.updateactivite(id,dataupdate).subscribe((response)=>
    {console.log(response)
      this.message="activité modifiée avec succès"
      this.showNotification('top','center')
      
      
      this.formValue.reset()
      this.dialogRef.close('Modifier')
    },(err:HttpErrorResponse)=>
    {
      this.message=err.error.error
      this.showNotificationDanger('top','center')
    })

  }
},
error: (err: any) => {
  console.log(err);
  
  if (err.error && err.error.message) {
    this.message = err.error.message;
    this.showNotification('top','center')
  } else {
    this.message = 'Could not upload the file!';
    this.showNotificationDanger('top','center')
  }
  
  this.currentFile = undefined;
}
});
}

this.selectedFiles = undefined;

}else{
  const id=this.editData._id
  let dataupdate=this.formValue.value
 
  console.log(dataupdate)
  this.ds.updateactivite(id,dataupdate).subscribe((response)=>
  {console.log(response)
    this.message="activité modifiée avec succès"
    this.showNotification('top','center')
    
    
    this.formValue.reset()
    this.dialogRef.close('Modifier')
  },(err:HttpErrorResponse)=>
  {
    this.message=err.error.error
    this.showNotificationDanger('top','center')
  })
}

 }
  getActiviteType(){
    this.type=this.formValue.value.type
   
      this.ds.getactivitesType(this.type).subscribe(data=>this.dataActiviteType=data)
      
      
  
  }
  getTitreActiviteForm(){
    this.activite=this.formValueActivite.value.activite
    console.log(this.activite)
      
  
  }
   myFunction()
    {if( $('input[name=super]').is(':checked') ){
      this.showinput=true
    } else {
    this.showinput=false
    }
   

    }


}
