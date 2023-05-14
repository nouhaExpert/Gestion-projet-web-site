import { Component, OnInit ,ViewChild,AfterViewInit,} from '@angular/core';
import { DataService } from '../services/data.service';
import { HttpErrorResponse } from '@angular/common/http';
import{FormBuilder,FormGroup,FormControl, Validators}from'@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { DialogService } from '../services/dialog.service';
import {MatDialog} from '@angular/material/dialog';
import { DialogEmployeeComponent } from 'app/dialog-employee/dialog-employee.component';
import { TokenStorageService } from '../services/token-storage.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
declare var $: any;


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
 

  
  dataOneEmployee:any
  dataArray:any
 
  nom:String
  message:String

  constructor(private ds:DataService,private dialogservice:DialogService,private route:Router,private dialog:MatDialog,private token: TokenStorageService) {
    
   }
   displayedColumns: string[] = ['Photo', 'Nom', 'Prénom', 'Email','Téléphone','Fonction','Grade','État','Action'];
   dataEmploye!: MatTableDataSource<any>;
   @ViewChild(MatPaginator) paginator!: MatPaginator;
   @ViewChild(MatSort) sort!: MatSort;
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
    
    this.ds.getAllemployees().subscribe({next:(res)=>{this.dataArray=res
     
      for (let i = 0; i < this.dataArray.length; i++) {
        this.dataArray[i].file="http://localhost:3000/static/"+this.dataArray[i].file
      }
      this.dataEmploye=new MatTableDataSource(this.dataArray);
      this.dataEmploye.paginator=this.paginator;
    this.dataEmploye.sort=this.sort
     
    }})
   
     
  }
  
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataEmploye.filter = filterValue.trim().toLowerCase();

    if (this.dataEmploye.paginator) {
      this.dataEmploye.paginator.firstPage();
    }
  }

  
  
  
 
  
  clickAddEmployee(){
    this.dialog.open(DialogEmployeeComponent,{
      height: '550px',
      width: '500px',
      position: { top: "10px" },
     }).afterClosed().subscribe(val=>{
       if(val==='Ajouter'){
        this.ds.getAllemployees().subscribe({next:(res)=>{this.dataArray=res
     
          for (let i = 0; i < this.dataArray.length; i++) {
            this.dataArray[i].file="http://localhost:3000/static/"+this.dataArray[i].file
          }
          this.dataEmploye=new MatTableDataSource(this.dataArray);
          this.dataEmploye.paginator=this.paginator;
        this.dataEmploye.sort=this.sort
         
        }})
       
       }

     })
    
  }

  delete(id:any){
    
    this.dialogservice.openConfirmDialog('Supprimer').afterClosed().subscribe(res=>{
      if(res==true){
        this.ds.deleteemployee(id).subscribe(response=>{
            console.log(response)
            this.message="employé supprimé avec succès"
            this.showNotification('top','center')
            this.ds.getAllemployees().subscribe({next:(res)=>{this.dataArray=res
     
              for (let i = 0; i < this.dataArray.length; i++) {
                this.dataArray[i].file="http://localhost:3000/static/"+this.dataArray[i].file
              }
              this.dataEmploye=new MatTableDataSource(this.dataArray);
              this.dataEmploye.paginator=this.paginator;
            this.dataEmploye.sort=this.sort
             
            }})
           
          })
      }
    })
    
  }
  onEdit(item:any){
    this.dialog.open(DialogEmployeeComponent,{
      height: '550px',
      width: '500px',
      position: { top: "10px" },
      data:item
     
     }).afterClosed().subscribe(val=>{
      if(val==='Modifier'){
        this.ds.getAllemployees().subscribe({next:(res)=>{this.dataArray=res
     
          for (let i = 0; i < this.dataArray.length; i++) {
            this.dataArray[i].file="http://localhost:3000/static/"+this.dataArray[i].file
          }
          this.dataEmploye=new MatTableDataSource(this.dataArray);
          this.dataEmploye.paginator=this.paginator;
        this.dataEmploye.sort=this.sort
         
        }})
       
      }

    })
   
   
    
  }
 
 

  updatemployeeInactive(id:any){
    this.ds.getOneEmployee(id).subscribe(data=>{this.dataOneEmployee=data
    this.dataOneEmployee.etat="Inactive"
    this.dialogservice.openConfirmDialog('Désactiver').afterClosed().subscribe(res=>{
      if(res==true){
    this.ds.updateemployeeEtat(id,this.dataOneEmployee).subscribe((response)=>
    {console.log(response)
      this.message="employé désactivé avec succès"
      this.showNotification('top','center')
      this.ds.getAllemployees().subscribe({next:(res)=>{this.dataArray=res
     
        for (let i = 0; i < this.dataArray.length; i++) {
          this.dataArray[i].file="http://localhost:3000/static/"+this.dataArray[i].file
        }
        this.dataEmploye=new MatTableDataSource(this.dataArray);
        this.dataEmploye.paginator=this.paginator;
      this.dataEmploye.sort=this.sort
       
      }})
     
    },(err:HttpErrorResponse)=>
    {console.log(err.message)})
  }
})
  })
  }
  updatemployeeactive(id:any){
    this.ds.getOneEmployee(id).subscribe(data=>{this.dataOneEmployee=data
    this.dataOneEmployee.etat="active"
    this.dialogservice.openConfirmDialog('Activer').afterClosed().subscribe(res=>{
      if(res==true){
    this.ds.updateemployeeEtat(id,this.dataOneEmployee).subscribe((response)=>
    {console.log(response)
      this.message="employé activé avec succès"
      this.showNotification('top','center')
      this.ds.getAllemployees().subscribe({next:(res)=>{this.dataArray=res
     
        for (let i = 0; i < this.dataArray.length; i++) {
          this.dataArray[i].file="http://localhost:3000/static/"+this.dataArray[i].file
        }
        this.dataEmploye=new MatTableDataSource(this.dataArray);
        this.dataEmploye.paginator=this.paginator;
      this.dataEmploye.sort=this.sort
       
      }})
     
    },(err:HttpErrorResponse)=>
    {console.log(err.message)})
  }
})
  })
  }
  details(id:any){
    this.route.navigate(['/admin/employeedetails/'+id])

  }
  Search(){
    if(this.nom !=""){
      this.dataArray=this.dataArray.filter(res=>{
        return res.nom.toLocaleLowerCase().match(this.nom.toLocaleLowerCase());
      });

    }else if(this.nom ==""){
      this.ngOnInit();

    }
    
  }
  

}
