import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { HttpErrorResponse } from '@angular/common/http';
import{FormBuilder,FormGroup,FormControl, Validators}from'@angular/forms'
import { TokenStorageService } from '../services/token-storage.service';
import { DialogService } from '../services/dialog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { isNgTemplate } from '@angular/compiler';
import { EventListenerFocusTrapInertStrategy } from '@angular/cdk/a11y';
import { HttpEvent, HttpResponse , HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ComponentsModule } from 'app/components/components.module';
import {MatDialog} from '@angular/material/dialog';
import { ActiviteDialogComponent } from 'app/activite-dialog/activite-dialog.component';
import { AuthService } from '../services/auth.service';
declare var $: any;
@Component({
  selector: 'app-activite',
  templateUrl: './activite.component.html',
  styleUrls: ['./activite.component.scss']
})
export class ActiviteComponent implements OnInit {
  formValue!: FormGroup
  formValueActivite!: FormGroup
  messageErr=""
  dataActivite:any
  dataMesActivite:any
  dataActiviteType:any
  dataOneActivite:any
  showAdd!:boolean
  showUpdate!:boolean
  titre:String
  type:any
  titreAll:any
  activite:any
  showinput!:boolean
  message:String
  fichierAEnvoyer: File = null; 

  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message1 = '';
  fileInfos?: Observable<any>;
  currentFile1:String

  showDirecteur = false;
  

  constructor( private ds:DataService,private dialogservice:DialogService,private token: TokenStorageService,private route:Router,private dialog:MatDialog,private authService:AuthService) { }


  
  showNotification(from, align){

    $.notify({
        icon: "notifications",
        message: this.message

    },{
        type:'success',
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
   
    this.ds.getAllactivites().subscribe(data=>this.dataActivite=data)
    this.ds.getMesactivites(this.token.getUser().id).subscribe(data=>this.dataMesActivite=data)
    this.showDirecteur=this.authService.loggedDirecteur()
    
  }
  
  clickAddActivite(){
    
    this.dialog.open(ActiviteDialogComponent,{
      height: '420px',
      width: '380px',
      position: { top: "10px" },
     }).afterClosed().subscribe(val=>{
       if(val==='Ajouter' || val=='Affecter'){
        this.ds.getAllactivites().subscribe(data=>this.dataActivite=data)
      this.ds.getMesactivites(this.token.getUser().id).subscribe(data=>this.dataMesActivite=data)
       }

     })
    
  }
  
  delete(id:any){
    this.dialogservice.openConfirmDialog('Supprimer').afterClosed().subscribe(res=>{
      if(res==true){
        this.ds.deleteactivite(id).subscribe(response=>{
            console.log(response)
            this.message="Activité supprimée avec succès"
            this.showNotification('top','center')
            this.ds.getAllactivites().subscribe(data=>this.dataActivite=data)
            this.ds.getMesactivites(this.token.getUser().id).subscribe(data=>this.dataMesActivite=data)
          })
      }
    })
  }
  onEdit(item:any){
    this.dialog.open(ActiviteDialogComponent,{
      height: '410px',
      width: '400px',
      position: { top: "10px" },
      data:item
     }).afterClosed().subscribe(val=>{
       if(val==='Modifier'){
        this.ds.getAllactivites().subscribe(data=>this.dataActivite=data)
      this.ds.getMesactivites(this.token.getUser().id).subscribe(data=>this.dataMesActivite=data)
       }

     })
    

    
  }
 
  
verifyUser(id:any){
  if(this.token.getUser().id==id){
    return true
  }else{
    return false
  }
}
details(id:any){
  this.route.navigate(['/admin/activitedetails/'+id])

}


  SearchActivite(){
    if(this.titreAll !=""){
      this.dataActivite=this.dataActivite.filter(res=>{
        return res.titre.toLocaleLowerCase().match(this.titreAll.toLocaleLowerCase());
      });

    }else if(this.titre ==""){
      this.ngOnInit();

    }
  }
  SearchMesActivite(){
    if(this.titre !=""){
      this.dataMesActivite=this.dataMesActivite.filter(res=>{
        return res.titre.toLocaleLowerCase().match(this.titre.toLocaleLowerCase());
      });
    

    }else if(this.titre ==""){
      this.ngOnInit();

    }
  }
  
}
