import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../services/token-storage.service';
import { DataService } from '../services/data.service';
import { HttpErrorResponse } from '@angular/common/http';
import{FormBuilder,FormGroup,FormControl, Validators}from'@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  currentUser: any;
  id:any;
  formValue!: FormGroup
  dataemployee:any
  dataFonction:any
  dataGrade:any
  dataRole:any
  messageErr=""
  message:String
  image:any
  
  constructor(private token: TokenStorageService,private formbuilder:FormBuilder, private ds:DataService,private route:Router) { }
  
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
  ngOnInit() {
    this.currentUser = this.token.getUser();
    this.id=this.currentUser.id
    this.formValue=this.formbuilder.group({
      nom:[this.currentUser.nom, Validators.required],
      prenom:[this.currentUser.prenom, Validators.required],
      email:[this.currentUser.email, Validators.required],
      age:[this.currentUser.age, Validators.required],
      tel:[this.currentUser.tel, Validators.required],
      motdepasse:[this.currentUser.password, Validators.required],
      role:[this.currentUser.rolesId, Validators.required],
      fonction:[this.currentUser.fonction, Validators.required],
      grade:[this.currentUser.grade, Validators.required],
     
    })
    this.image="http://localhost:3000/static/"+this.currentUser.image
    this.ds.getAllfonction().subscribe(data=>this.dataFonction=data)
    this.ds.getAllgrade().subscribe(data=>this.dataGrade=data)
    this.ds.getAllrole().subscribe(data=>this.dataRole=data)

    let nom = this.formValue.get('nom')
    let prenom = this.formValue.get('prenom')
    let email = this.formValue.get('email')
    let tel = this.formValue.get('tel')
    let age = this.formValue.get('age')
    nom.disable();
    prenom.disable();
    email.disable();
    tel.disable();
    age.disable();
    
    
  }
  
  updatemployee(){
    let dataupdate=this.formValue.value
    this.ds.updateemployee(this.id,dataupdate).subscribe((response)=>
    {console.log(response)
      this.token.signOut()
      this.route.navigate(['/login'])
      
    },(err:HttpErrorResponse)=>
    {this.message=err.error.error
      this.showNotificationDanger('top','center')
    })
  }


}
