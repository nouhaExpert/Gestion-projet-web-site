import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { HttpErrorResponse } from '@angular/common/http';
import{FormBuilder,FormGroup,FormControl, Validators}from'@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from '../services/dialog.service';
import {MatDialog} from '@angular/material/dialog';
import { FonctionDialogComponent } from 'app/fonction-dialog/fonction-dialog.component';
declare var $: any;
@Component({
  selector: 'app-fonction',
  templateUrl: './fonction.component.html',
  styleUrls: ['./fonction.component.scss']
})
export class FonctionComponent implements OnInit {
  
  dataFonction:any
 
  
  
  nom:String
  message:String

  constructor( private ds:DataService,private dialogservice:DialogService,private dialog:MatDialog) { }
  
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
  


  ngOnInit(): void {
   
    this.ds.getAllfonction().subscribe(data=>this.dataFonction=data)
  }

  verifyfonction(item:any){
    if(item.employee.length!=0){
      return false
    }else{
      return true
    }
   }
  clickAddFonction(){
    this.dialog.open(FonctionDialogComponent,{
      height: '250px',
      width: '400px',
      position: { top: "10px" },
     }).afterClosed().subscribe(val=>{
       if(val==='Ajouter'){
        this.ds.getAllfonction().subscribe(data=>this.dataFonction=data)
       }

     })
  }

  onEdit(item:any){
    this.dialog.open(FonctionDialogComponent,{
      height: '250px',
      width: '400px',
      position: { top: "10px" },
      data:item,
     }).afterClosed().subscribe(val=>{
       if(val==='Modifier'){
        this.ds.getAllfonction().subscribe(data=>this.dataFonction=data)
       }

     })
    
  }
 
  
  delete(id:any){
    
    this.dialogservice.openConfirmDialog('Supprimer').afterClosed().subscribe(res=>{
      if(res==true){
        this.ds.deletefonction(id).subscribe(response=>{
            console.log(response)
            this.message="Fonction supprimée avec succès"
            this.showNotification('top','center')
            this.ds.getAllfonction().subscribe(data=>this.dataFonction=data)
          })
      }
    })
  }

  Search(){
    if(this.nom !=""){
      this.dataFonction=this.dataFonction.filter(res=>{
        return res.nom.toLocaleLowerCase().match(this.nom.toLocaleLowerCase());
      });

    }else if(this.nom ==""){
      this.ngOnInit();

    }
    
  }


}
