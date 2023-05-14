import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { TokenStorageService } from '../../services/token-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import{FormBuilder,FormGroup,FormControl, Validators}from'@angular/forms'
@Component({
  selector: 'app-auth-admin-layout',
  templateUrl: './auth-admin-layout.component.html',
  styleUrls: ['./auth-admin-layout.component.scss']
})
export class AuthAdminLayoutComponent implements OnInit {
  form!: FormGroup

  errorMessage = '';
  roles: string[] = []
  nb_fois:any=0
  incorrecte:any=false
  message=''
  showAdmin:any
  
  constructor(private formbuilder:FormBuilder,private authService: AuthService, private tokenStorage: TokenStorageService, private route:Router) { }

  ngOnInit(): void {
    
    this.form=this.formbuilder.group({
      
      email:['', Validators.required],
      
      password:['', Validators.required],
      
    })
    if (this.tokenStorage.getToken()) {
      this.route.navigate(['/admin'])
     
      this.roles = this.tokenStorage.getUser().roles;
    }
  }
  onSubmit(): void {
    const { email, password } = this.form.value;
    if(this.nb_fois<5){
    
    this.authService.login(email, password).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
      
        this.roles = this.tokenStorage.getUser().roles;
        this.showAdmin=this.authService.loggedAdmin
        if(this.showAdmin){
          this.route.navigate(['/admin/employee'])
        }else{
          this.route.navigate(['/admin/dashboard'])
        }
        
      },
      err => {
        
        if(err.error.error)
        this.errorMessage = err.error.error;
        else{
          this.errorMessage ="Erreur d'authentification!"
        }
        this.nb_fois=this.nb_fois+1
      }
    );
    
    }else{
      let input1 = this.form.get('email')
      let input2 = this.form.get('password')
      input1.disable();
      input2.disable();
      this.incorrecte=true
      this.message="attendre 10 secondes"
      console.log('please attend')
      setTimeout(this.fonction, 10000);
      console.log(this.nb_fois)
      console.log(this.incorrecte)
      

    }
    

  }
 
 fonction(){
    
    this.incorrecte=false
    window.location.reload()
  }
 

}
