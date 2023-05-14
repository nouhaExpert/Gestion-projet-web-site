import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { DialogService } from '../services/dialog.service';
import {MatDialog} from '@angular/material/dialog';
import { GradeDialogComponent } from 'app/grade-dialog/grade-dialog.component';
declare var $: any;
@Component({
  selector: 'app-grade',
  templateUrl: './grade.component.html',
  styleUrls: ['./grade.component.scss']
})
export class GradeComponent implements OnInit {
  
  dataGrade:any
 
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
    

    this.ds.getAllgrade().subscribe(data=>this.dataGrade=data)
  }
  verifygrade(item:any){
    if(item.employee.length!=0){
      return false
    }else{
      return true
    }
   }
  
  clickAddGrade(){
    this.dialog.open(GradeDialogComponent,{
      height: '250px',
      width: '400px',
      position: { top: "10px" },
     }).afterClosed().subscribe(val=>{
       if(val==='Ajouter'){
        this.ds.getAllgrade().subscribe(data=>this.dataGrade=data)

       }

     })
  }

  onEdit(item:any){
    this.dialog.open(GradeDialogComponent,{
      height: '250px',
      width: '400px',
      position: { top: "10px" },
      data:item,
     }).afterClosed().subscribe(val=>{
       if(val==='Modifier'){
        this.ds.getAllgrade().subscribe(data=>this.dataGrade=data)

       }

     })
    
  }
 
  
  delete(id:any){
    
    this.dialogservice.openConfirmDialog('Supprimer').afterClosed().subscribe(res=>{
      if(res==true){
        this.ds.deletegrade(id).subscribe(response=>{
            console.log(response)
            this.message="Grade supprimé avec succès"
            this.showNotification('top','center')
            this.ds.getAllgrade().subscribe(data=>this.dataGrade=data)
          })
      }
    })
  }

  Search(){
    if(this.nom !=""){
      this.dataGrade=this.dataGrade.filter(res=>{
        return res.nom.toLocaleLowerCase().match(this.nom.toLocaleLowerCase());
      });

    }else if(this.nom ==""){
      this.ngOnInit();

    }
    
  }

}
