import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import{FormBuilder,FormGroup,FormControl, Validators}from'@angular/forms'
import { TokenStorageService } from '../services/token-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from '../services/dialog.service';
import {MatDialog} from '@angular/material/dialog';
import { ProjetDialogComponent } from 'app/projet-dialog/projet-dialog.component';
import { AuthService } from '../services/auth.service';
declare var $: any;
@Component({
  selector: 'app-projet',
  templateUrl: './projet.component.html',
  styleUrls: ['./projet.component.scss']
})
export class ProjetComponent implements OnInit {
  formValue!: FormGroup
  dataProjet:any
  dataMesProjet:any
  dataMesProjetCree:any
  dataEmployee:any
  messageErr=""
  showAdd!:boolean
  showUpdate!:boolean
  titre:String
  titreAll:String
  message:String
  showDirecteur = false;

  constructor( private ds:DataService,private dialogservice:DialogService,private token: TokenStorageService,private route:Router,private dialog:MatDialog,private authService:AuthService) { }
  
    
  
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

  ngOnInit(): void {
   
    this.ds.getAllprojets().subscribe(data=>this.dataProjet=data)
    this.ds.getMesprojets(this.token.getUser().id).subscribe(data=>this.dataMesProjet=data)
    
  
    this.showDirecteur=this.authService.loggedDirecteur()

    
    
  }
 

  
  clickAddProjet(){
    this.dialog.open(ProjetDialogComponent,{
      height: '550px',
      width: '430px',
      position: { top: "10px" },
     }).afterClosed().subscribe(val=>{
       if(val==='Ajouter'){
        this.ds.getAllprojets().subscribe(data=>this.dataProjet=data)
        this.ds.getMesprojets(this.token.getUser().id).subscribe(data=>this.dataMesProjet=data)
       }

     })
  }

  delete(id:any){
    
    this.dialogservice.openConfirmDialog('Supprimer').afterClosed().subscribe(res=>{
      if(res==true){
        this.ds.deleteprojet(id).subscribe(response=>{
            console.log(response)
            this.message="Projet supprimé avec succès"
            this.showNotification('top','center')
            this.ds.getAllprojets().subscribe(data=>this.dataProjet=data)
            this.ds.getMesprojets(this.token.getUser().id).subscribe(data=>this.dataMesProjet=data)
            //this.ds.getMesprojetsCree(this.token.getUser().id).subscribe(data=>this.dataMesProjetCree=data)
          })
      }
    })
  }
  onEdit(item:any){
    this.dialog.open(ProjetDialogComponent,{
      height: '510px',
      width: '500px',
      position: { top: "10px" },
      data:item
     }).afterClosed().subscribe(val=>{
       if(val==='Modifier'){
        this.ds.getAllprojets().subscribe(data=>this.dataProjet=data)
        this.ds.getMesprojets(this.token.getUser().id).subscribe(data=>this.dataMesProjet=data)
       }

     })

  }
 
  
  details(id:any){
    this.route.navigate(['/admin/projetdetails/'+id])

  }
  verifyUser(id:any){
    if(this.token.getUser().id==id){
      return true
    }else{
      return false
    }
  }
  verifytache(item:any){
    if(item.tache.length!=0){
      return true
    }else{
      return false
    }
   }
  SearchProjet(){
    if(this.titreAll !=""){
      this.dataProjet=this.dataProjet.filter(res=>{
        return res.titre.toLocaleLowerCase().match(this.titreAll.toLocaleLowerCase());
      });

    }else if(this.titre ==""){
      this.ngOnInit();

    }
    
  }
  SearchMesProjet(){
    if(this.titre !=""){
      this.dataMesProjet=this.dataMesProjet.filter(res=>{
        return res.titre.toLocaleLowerCase().match(this.titre.toLocaleLowerCase());
      });

    }else if(this.titre ==""){
      this.ngOnInit();

    }
    
  }


}
