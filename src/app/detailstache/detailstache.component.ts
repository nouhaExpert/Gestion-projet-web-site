import { Component, OnInit ,ViewChild} from '@angular/core';
import { DataService } from '../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DialogService } from '../services/dialog.service';
import {MatDialog} from '@angular/material/dialog';
import { BugDialogComponent } from 'app/bug-dialog/bug-dialog.component';
import { AuthService } from '../services/auth.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
declare var $: any;
@Component({
  selector: 'app-detailstache',
  templateUrl: './detailstache.component.html',
  styleUrls: ['./detailstache.component.scss']
})
export class DetailstacheComponent implements OnInit {
  id=''
 
  dataobject:any
  message:String
  databug:any
  dataOneBug:any
  showDirecteur = false;
  showDeveloppeur = false;
  showTesteur = false;
  dataId:any={
    idTache:null,
    idProjet:null
  }
    
  displayedColumns: string[] = ['type', 'Titre', 'Description', 'Date_de_creation','Etat','Action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private routeactivate:ActivatedRoute,private route:Router, private ds:DataService,private token: TokenStorageService,private dialogservice:DialogService,private dialog:MatDialog,private authService:AuthService) { }
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
    this.routeactivate.params.subscribe(response=>this.id=response['id'])

    this.ds.getOneTache(this.id).subscribe(response=>{this.dataobject=response
      this.dataId.idTache=this.dataobject._id
      })

    this.ds.getAllbugs(this.id).subscribe({next:(res)=>{this.databug=res
    this.dataSource=new MatTableDataSource(this.databug);
  this.dataSource.paginator=this.paginator;
this.dataSource.sort=this.sort}})
    this.showDirecteur=this.authService.loggedDirecteur()
    this.showDeveloppeur=this.authService.loggedDeveloppeur()
    this.showTesteur=this.authService.loggedTesteur()
    
    
    
  }
  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();

  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }

  updatetacheTerminee(){
    
    this.dataobject.employee_realiser=this.token.getUser().id;
    this.dialogservice.openConfirmDialog('Réaliser').afterClosed().subscribe(res=>{
      if(res==true){
        this.dataobject.etat="Réalisée"
    this.ds.updatetache(this.id,this.dataobject).subscribe((response)=>
    {console.log(response)
     
      this.message="Tâche réalisée avec succès"
      this.showNotification('top','center')
      this.ds.getOneTache(this.id).subscribe(response=>this.dataobject=response)
      this.route.navigate(['/admin/projetdetails/'+this.dataobject.projet])
    },(err:HttpErrorResponse)=>
    {this.message=err.message
      this.showNotificationDanger('top','center')
    })
  }
})
  }
  clickAddBug(){
    this.dialog.open(BugDialogComponent,{
      height: '380px',
      width: '400px',
      position: { top: "10px" },
      data:this.dataId
     }).afterClosed().subscribe(val=>{
       if(val==='Ajouter'){
        this.ds.getAllbugs(this.id).subscribe({next:(res)=>{this.databug=res
          this.dataSource=new MatTableDataSource(this.databug);
        this.dataSource.paginator=this.paginator;
      this.dataSource.sort=this.sort}})
       }

     })
    
  }
  onEdit(item:any){

    this.dialog.open(BugDialogComponent,{
      height: '380px',
      width: '400px',
      position: { top: "10px" },
      data:item
     }).afterClosed().subscribe(val=>{
       if(val==='Modifier'){
        this.ds.getAllbugs(this.id).subscribe({next:(res)=>{this.databug=res
          this.dataSource=new MatTableDataSource(this.databug);
        this.dataSource.paginator=this.paginator;
      this.dataSource.sort=this.sort}})
       }

     })
 
  }
  delete(idbug:any){
    
    this.dialogservice.openConfirmDialog('Supprimer').afterClosed().subscribe(res=>{
      if(res==true){
        this.ds.deletebug(idbug).subscribe(response=>{
            console.log(response)
            this.message="bug supprimée avec succès"
            this.showNotification('top','center')
            this.ds.getAllbugs(this.id).subscribe({next:(res)=>{this.databug=res
              this.dataSource=new MatTableDataSource(this.databug);
            this.dataSource.paginator=this.paginator;
          this.dataSource.sort=this.sort}})
          },(err:HttpErrorResponse)=>
          {this.message=err.error.error
            this.showNotificationDanger('top','center')
          })
      }
    })
  }
  updateBugCorriger(id:any){
    this.ds.getOneBug(id).subscribe(response=>{this.dataOneBug=response
    
    this.dataOneBug.employee_correcter=this.token.getUser().id;
    this.dialogservice.openConfirmDialog('Corriger').afterClosed().subscribe(res=>{
      if(res==true){
        this.dataOneBug.etat="Corrigé"
    this.ds.updatebug(id,this.dataOneBug).subscribe((response)=>
    {console.log(response)
      this.message="Bug corrigé avec succès"
      this.showNotification('top','center')
      this.ds.getAllbugs(this.id).subscribe({next:(res)=>{this.databug=res
        this.dataSource=new MatTableDataSource(this.databug);
      this.dataSource.paginator=this.paginator;
    this.dataSource.sort=this.sort}})
    },(err:HttpErrorResponse)=>
    {this.message=err.error.error
      this.showNotificationDanger('top','center')
    })
  }
})
  })
  }
  verifyUser(id:any){
    if(this.token.getUser().id==id){
      return true
    }else{
      return false
    }
  }
  retour(){
    this.route.navigate(['/admin/projetdetails/'+this.dataobject.projet])

  }

}
