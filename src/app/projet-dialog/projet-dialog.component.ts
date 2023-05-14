import { Component, OnInit ,Inject } from '@angular/core';
import { DataService } from '../services/data.service';
import { HttpErrorResponse } from '@angular/common/http';
import{FormBuilder,FormGroup,FormControl, Validators}from'@angular/forms'
import { TokenStorageService } from '../services/token-storage.service';
import {MAT_DIALOG_DATA,MatDialogRef} from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { HttpEvent, HttpResponse , HttpEventType } from '@angular/common/http';
import {formatDate} from '@angular/common';
declare var $: any;
@Component({
  selector: 'app-projet-dialog',
  templateUrl: './projet-dialog.component.html',
  styleUrls: ['./projet-dialog.component.scss']
})
export class ProjetDialogComponent implements OnInit {
  formValue!: FormGroup
  dataEmployee:any
  message:String
  actionBtn:String="Ajouter"
  selectedFiles?: FileList;
  currentFile?: File;
  fileInfos?: Observable<any>;
  currentFile1:String
  verif=false
  readerfile1:any
  date:any
  constructor(private formbuilder:FormBuilder, private ds:DataService,private token: TokenStorageService,
    @Inject(MAT_DIALOG_DATA) public editData,
     public dialogRef: MatDialogRef<ProjetDialogComponent>) { }
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
      titre:['', Validators.required],
      description:['' , Validators.required],
      date_debut:['', Validators.required],
      date_fin:['', Validators.required],
      equipe:['', Validators.required],
      file:['' , Validators.required],
    })
  }else{
    this.formValue=this.formbuilder.group({
      titre:['', Validators.required],
      description:['' , Validators.required],
      date_debut:['', Validators.required],
      date_fin:['', Validators.required],
      equipe:['', Validators.required],
    })
  }
    this.ds.getAllemployeesActive().subscribe(data=>this.dataEmployee=data)
    if(this.editData){
      this.actionBtn="Modifier"
      this.formValue.controls['titre'].setValue(this.editData.titre)
      this.formValue.controls['description'].setValue(this.editData.description)
      this.editData.date_debut=formatDate(new Date(this.editData.date_debut), 'yyyy-MM-dd', 'en');
      this.formValue.controls['date_debut'].setValue(this.editData.date_debut)
      this.editData.date_fin=formatDate(new Date(this.editData.date_fin), 'yyyy-MM-dd', 'en');
      this.formValue.controls['date_fin'].setValue(this.editData.date_fin)
      this.formValue.controls['equipe'].setValue(this.editData.equipe)
    
    }
    
  }
  verifyDateFin(){
    this.date=this.formValue.value.date_fin
    let dateFin=this.formValue.value.date_fin
    let dateDebut=this.formValue.value.date_debut
    if(dateFin<dateDebut){
      return false
    }
    return true
  }
  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }
  gestionProjet(){
    this.verif=true
    if(!this.editData){
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
    data.employee_cree=this.token.getUser().id;
    console.log(data)
    data.file=this.currentFile1
      console.log(this.currentFile1)
   
    this.ds.addprojet(data).subscribe(data=>{
      this.message="Projet ajouté avec succès"
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
    this.showNotificationDanger('top','center')
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

  }else{
    this.updateprojet()
  } 
  }


  updateprojet(){
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
    console.log(dataupdate)
    dataupdate.file=this.currentFile1
    console.log(this.currentFile1)
    this.ds.updateprojet(id,dataupdate).subscribe((response)=>
    {console.log(response)
      this.message="Projet modifié avec succès"
      this.showNotification('top','center')
      this.formValue.reset()
      this.dialogRef.close('Modifier')
      
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
  
  this.currentFile = undefined;
}
});
}

this.selectedFiles = undefined;
}else{
  const id=this.editData._id
  let dataupdate=this.formValue.value
  console.log(dataupdate)
  
  this.ds.updateprojet(id,dataupdate).subscribe((response)=>
  {console.log(response)
    this.message="Projet modifié avec succès"
    this.showNotification('top','center')
    this.formValue.reset()
    this.dialogRef.close('Modifier')
    
  },(err:HttpErrorResponse)=>
  {this.message=err.error.error
    this.showNotificationDanger('top','center')
  })
}
  }
}
