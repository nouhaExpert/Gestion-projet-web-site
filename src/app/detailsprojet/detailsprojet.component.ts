import { Component, OnInit ,ViewChild} from '@angular/core';
import { DataService } from '../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { TokenStorageService } from '../services/token-storage.service';
import { DialogService } from '../services/dialog.service';
import { TacheDialogComponent } from 'app/tache-dialog/tache-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import { AuthService } from '../services/auth.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
declare var $: any;
@Component({
  selector: 'app-detailsprojet',
  templateUrl: './detailsprojet.component.html',
  styleUrls: ['./detailsprojet.component.scss']
})
export class DetailsprojetComponent implements OnInit {
  id=''
  dataobject:any
  dataTache:any
  dataArray:any
  dataOneTache:any
 
  titre:String
  message:String
  showDirecteur = false;
  showDeveloppeur = false;
  showTesteur = false;
  file:any

  displayedColumns: string[] = ['Titre', 'Priorite', 'Etat', 'Date_de_creation','Action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private routeactivate:ActivatedRoute,private route:Router, private ds:DataService,private dialogservice:DialogService,private token: TokenStorageService,private dialog:MatDialog,private authService:AuthService) { }

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

    this.ds.getOneProjet(this.id).subscribe(response=>{this.dataobject=response
      this.file="http://localhost:3000/static/"+this.dataobject.file})

   

    this.ds.getAlltaches(this.id).subscribe({next:(res)=>{this.dataTache=res
        this.dataSource=new MatTableDataSource(this.dataTache);
      this.dataSource.paginator=this.paginator;
    this.dataSource.sort=this.sort}})
    this.ds.getEquipe(this.id).subscribe(data=>this.dataArray=data)
    this.showDirecteur=this.authService.loggedDirecteur()
    this.showDeveloppeur=this.authService.loggedDeveloppeur()
    this.showTesteur=this.authService.loggedTesteur()
  }  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  
  clickAddTache(){
    this.dialog.open(TacheDialogComponent,{
      height: '310px',
      width: '400px',
      position: { top: "10px" },
      data:this.id
     }).afterClosed().subscribe(val=>{
       if(val==='Ajouter'){
        this.ds.getAlltaches(this.id).subscribe({next:(res)=>{this.dataTache=res
          this.dataSource=new MatTableDataSource(this.dataTache);
        this.dataSource.paginator=this.paginator;
      this.dataSource.sort=this.sort}})
       }

     })
    
  }

  delete(idtache:any){
    
    this.dialogservice.openConfirmDialog('Supprimer').afterClosed().subscribe(res=>{
      if(res==true){
        this.ds.deletetache(idtache).subscribe(response=>{
            console.log(response)
            this.message="Tâche supprimée avec succès"
            this.showNotification('top','center')
            this.ds.getAlltaches(this.id).subscribe({next:(res)=>{this.dataTache=res
              this.dataSource=new MatTableDataSource(this.dataTache);
            this.dataSource.paginator=this.paginator;
          this.dataSource.sort=this.sort}})
          },(err:HttpErrorResponse)=>
          {this.message=err.error.error
            this.showNotificationDanger('top','center')
          })
      }
    })
  }
  onEdit(item:any){

    this.dialog.open(TacheDialogComponent,{
      height: '310px',
      width: '400px',
      position: { top: "10px" },
      data:item
     }).afterClosed().subscribe(val=>{
       if(val==='Modifier'){
        this.ds.getAlltaches(this.id).subscribe({next:(res)=>{this.dataTache=res
          this.dataSource=new MatTableDataSource(this.dataTache);
        this.dataSource.paginator=this.paginator;
      this.dataSource.sort=this.sort}})
       }

     })
  
  }
 
  
  updatetacheTerminee(id:any){
    this.ds.getOneTache(id).subscribe(response=>{this.dataOneTache=response
    this.dataOneTache.etat="Réalisée"
    this.dataOneTache.employee_realiser=this.token.getUser().id;
    this.dialogservice.openConfirmDialog('Réaliser').afterClosed().subscribe(res=>{
      if(res==true){
    this.ds.updatetache(id,this.dataOneTache).subscribe((response)=>
    {console.log(response)
      this.message="Tâche réalisée avec succès"
      this.showNotification('top','center')
      this.ds.getAlltaches(this.id).subscribe({next:(res)=>{this.dataTache=res
        this.dataSource=new MatTableDataSource(this.dataTache);
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
  details(id:any){
    this.route.navigate(['/admin/tachedetails/'+id])

  }
  
  Search(){
    if(this.titre !=""){
      this.dataTache=this.dataTache.filter(res=>{
        return res.titre.toLocaleLowerCase().match(this.titre.toLocaleLowerCase());
      });

    }else if(this.titre ==""){
      this.ngOnInit();

    }
    
  }
 

}
