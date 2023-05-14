import { Component, OnInit,Inject } from '@angular/core';
import { DataService } from '../services/data.service';
import { HttpErrorResponse } from '@angular/common/http';
import{FormBuilder,FormGroup,FormControl, Validators}from'@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
import {MAT_DIALOG_DATA,MatDialogRef} from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { HttpEvent, HttpResponse , HttpEventType } from '@angular/common/http';
declare var $: any;
@Component({
  selector: 'app-dialog-employee',
  templateUrl: './dialog-employee.component.html',
  styleUrls: ['./dialog-employee.component.scss']
})
export class DialogEmployeeComponent implements OnInit {
  formValue!: FormGroup
  dataArray:any
  dataOneEmployee:any
  message:String
  dataFonction:any
  dataGrade:any
  dataRole:any
  messageErr=""
  isSuccessful=false
  actionBtn:String="Ajouter"

  imageUrl: string = "./assets/img/personne.jpg";
  fileToUpload: File = null;

email1=false

  selectedFiles?: FileList;
  currentImg?: File;
  fileInfos?: Observable<any>;
  Image:String

  constructor(private formbuilder:FormBuilder,
     private ds:DataService,
     @Inject(MAT_DIALOG_DATA) public editData,
     public dialogRef: MatDialogRef<DialogEmployeeComponent>) { }

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
        message:this.message

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
      nom:['', Validators.required],
      prenom:['' , Validators.required],
      email:['', Validators.required],
      age:['', Validators.required],
      tel:['', Validators.required],
      
      role:['', Validators.required],
      fonction:['', Validators.required],
      grade:['', Validators.required],
      file:['', Validators.required],
    })
    }else if(this.editData){
      this.formValue=this.formbuilder.group({
        nom:['', Validators.required],
        prenom:['' , Validators.required],
        email:['', Validators.required],
        age:['', Validators.required],
        tel:['', Validators.required],
       
        role:['', Validators.required],
        fonction:['', Validators.required],
        grade:['', Validators.required],
        
      })
    }
    this.ds.getAllfonction().subscribe(data=>this.dataFonction=data)
    this.ds.getAllgrade().subscribe(data=>this.dataGrade=data)
    this.ds.getrolesansAdmin().subscribe(data=>this.dataRole=data)
    if(this.editData){
      this.actionBtn="Modifier"
    this.formValue.controls['nom'].setValue(this.editData.nom)
    this.formValue.controls['prenom'].setValue(this.editData.prenom)
    this.editData.email=this.editData.email.replace("@rns.tn","");
    this.formValue.controls['email'].setValue(this.editData.email)
    this.formValue.controls['age'].setValue(this.editData.age)
    this.formValue.controls['tel'].setValue(this.editData.tel)
    this.formValue.controls['motdepasse'].setValue(this.editData.motdepasse)
    this.formValue.controls['role'].setValue(this.editData.role)
    this.formValue.controls['fonction'].setValue(this.editData.fonction._id)
    this.formValue.controls['grade'].setValue(this.editData.grade._id)
    this.imageUrl =this.editData.file
    }
   
  }
  verifyEmail(){
    if(this.email1==false){
    let email=this.formValue.value.email
    let position = email.indexOf("@");
    if(position!=-1){
     return false
    }
  //   for (let j = 0; j < email.length; j++) {
  //   if (email[j]=='@') {
  //     return false
  // }
// }
  return true
  }}
  selectFile(file: FileList) {
    this.selectedFiles = file;
   
    this.fileToUpload = file.item(0);

    //Show image preview
    var reader = new FileReader();
    reader.onload = (event:any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
  }
  
  gestionEmployee(){
    this.email1=true
    if(!this.editData){

      if (this.selectedFiles) {
        const file: File | null = this.selectedFiles.item(0);
        if (file) {
          this.currentImg = file;
          
          this.ds.uploadImage(this.currentImg).subscribe({
            next: (event: any) => {
             
             if (event instanceof HttpResponse) {
                this.message = event.body.message;
                this.Image=event.body.message;

                let dataprofile=this.formValue.value
                dataprofile.email=this.formValue.value.email+'@rns.tn'
                dataprofile.motdepasse='123456789'
                console.log(dataprofile)

                dataprofile.file=this.Image
                 console.log(this.Image)


    
    this.ds.addemployee(dataprofile).subscribe(data=>{
      this.ds.sendEmail(dataprofile).subscribe(
      data => {
        let res:any = data; 
        console.log(
          ` successfully register and mail has been sent and the message id is ${res.messageId}`);
      this.message="employé ajouté avec succès"
      this.showNotification('top','center')
      
      this.formValue.reset()
      this.dialogRef.close('Ajouter')
      
        
        },(err:HttpErrorResponse)=>{
           debugger
      this.message="employé ajouté avec succès et l'émail n'envoyé pas"
      this.showNotification('top','center')
      this.formValue.reset()
      this.dialogRef.close('Ajouter')
          // this.message=err.error
          // console.log(err.error)
          // this.showNotificationDanger('top','center')
        })
      
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
    this.showNotificationDanger('top','center')
  } else {
    this.message = 'Could not upload the file!';
    this.showNotificationDanger('top','center')
  }
  
  this.currentImg = undefined;
}
});
}

this.selectedFiles = undefined;
}   
      
  }else{
    this.updatemployee()
  }
}
updatemployee(){
  if (this.selectedFiles) {
    const file: File | null = this.selectedFiles.item(0);
    if (file) {
      this.currentImg = file;
      
      this.ds.uploadImage(this.currentImg).subscribe({
        next: (event: any) => {
         
         if (event instanceof HttpResponse) {
            this.message = event.body.message;
            this.Image=event.body.message;



  const id=this.editData._id
  let dataupdate=this.formValue.value
  dataupdate.email=this.formValue.value.email+'@rns.tn'
  dataupdate.file=this.Image
  console.log(this.Image)
  this.ds.updateemployee(id,dataupdate).subscribe((response)=>
  {console.log(response)
    this.message="employé modifié avec succès"
    this.showNotification('top','center')
    this.formValue.reset()
  this.dialogRef.close('Modifier')
    this.ds.getAllemployees().subscribe(data=>this.dataArray=data)
  },(err:HttpErrorResponse)=>
  {this.message=err.error.error
    this.showNotificationDanger('top','center')
  })
         }
},
error: (err: any) => {
  console.log(err);
  
  if (err.error && err.error.message) {
    this.message = err.error.message;
    this.showNotificationDanger('top','center')
  } else {
    this.message = 'Could not upload the file!';
    this.showNotificationDanger('top','center')
  }
  
  this.currentImg = undefined;
}
});
}

this.selectedFiles = undefined;
} else{
  const id=this.editData._id
  let dataupdate=this.formValue.value
  dataupdate.email=this.formValue.value.email+'@rns.tn'
  this.ds.updateemployee(id,dataupdate).subscribe((response)=>
  {console.log(response)
    this.message="employé modifié avec succès"
    this.showNotification('top','center')
    this.formValue.reset()
  this.dialogRef.close('Modifier')
    this.ds.getAllemployees().subscribe(data=>this.dataArray=data)
  },(err:HttpErrorResponse)=>
  {this.message=err.error.error
    this.showNotificationDanger('top','center')
  })
}  
      
}

}
