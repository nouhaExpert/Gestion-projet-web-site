import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { Router } from '@angular/router';
import { TokenStorageService } from '../../services/token-storage.service';
import { DataService } from '../../services/data.service';
import {formatDate} from '@angular/common';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    date:any
    date_projet:any
    currentUser:any
    dataProjet:any
    year:any
    month:any
    day:any
    showAdmin:any
    data:any
    data_notification:any=[]
    verif_notification:any=false
    dataUpdateProjet:any
    nbr_notification:any=0
    notification:any
    dataOneNotification:any
    data_notification1:any
    trouve:any=false
verif:any=false
    ImageUrl:any
    
    private listTitles: any[];
    location: Location;
      mobile_menu_visible: any = 0;
    private toggleButton: any;
    private sidebarVisible: boolean;

    constructor(location: Location,  private element: ElementRef, private router: Router,private token: TokenStorageService,private ds:DataService,private authService:AuthService) {
      this.location = location;
          this.sidebarVisible = false;
    }

    ngOnInit(){
        this.showAdmin=this.authService.loggedAdmin()
        this.date=formatDate(new Date(), 'dd/MM/yyyy', 'en');
        this.currentUser = this.token.getUser();
        this.ImageUrl="http://localhost:3000/static/"+this.currentUser.image
        // this.year=new Date(Date.now()).getFullYear().toString()
        // this.month=new Date(Date.now()).getMonth().toString()
        // this.day=new Date(Date.now()).getDay().toString()


      this.listTitles = ROUTES.filter(listTitle => listTitle);
      const navbar: HTMLElement = this.element.nativeElement;
      this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
      this.router.events.subscribe((event) => {
        this.sidebarClose();
         var $layer: any = document.getElementsByClassName('close-layer')[0];
         if ($layer) {
           $layer.remove();
           this.mobile_menu_visible = 0;
         }
     });

     this.ds.getMesprojets(this.token.getUser().id).subscribe(data=>{this.dataProjet=data
        for (let i = 0; i < this.dataProjet.length; i++) {
            // const year_projet=new Date(this.dataProjet[i].date_fin).getFullYear().toString()
            // const month_projet=new Date(this.dataProjet[i].date_fin).getMonth().toString()
            // const day_projet=new Date(this.dataProjet[i].date_fin).getDay()
             this.date_projet=formatDate(new Date(this.dataProjet[i].date_fin), 'dd/MM/yyyy', 'en');
            //  this.ds.getAllnotification().subscribe(dataNotification=>{
            //     this.data_notification=dataNotification
               
            //     this.verif_notification=true
            
                
            // })
            
           
            if(this.date==this.date_projet && this.dataProjet[i].notification==null){
                let data={
                    message:'',
                    projet:''
                }
                data.message='Le projet "'+this.dataProjet[i].titre.toString()+'" - '+"date délais " + this.date_projet
                
                data.projet=this.dataProjet[i]._id
                console.log(data)
                this.ds.addnotification(data).subscribe(data1=>{
                    this.notification=data1
                    this.ds.getOneProjet(this.dataProjet[i]._id).subscribe((response)=>{this.dataUpdateProjet=response
                        this.dataUpdateProjet.notification=this.notification
                    this.ds.updateprojet(this.dataProjet[i]._id,this.dataUpdateProjet).subscribe((response)=>console.log(response))
                })
                this.data_notification.unshift(this.notification)
                this.nbr_notification=this.nbr_notification+1
            })
                    // this.ds.getAllnotification().subscribe(dataNotification=>{
                    //     this.data_notification=dataNotification
                    //     this.verif_notification=true

                    //     for (let i = 0; i < this.data_notification.length; i++) {
                    //         if(this.data_notification[i].etat=='Non consultée'){
                    //             this.nbr_notification=this.nbr_notification+1
                    //         }
                    //       }
                        
                       
                    
                    // })
                    
                 
                
                // let message=this.dataProjet[i].titre.toString()+' - '+"date délais aujourd’hui"

                // this.data_notification.message.push(message)
                // let url='/admin/projetdetails/'+this.dataProjet[i]._id
                // this.data_notification.url.push(url)
                

            }
            if(this.dataProjet[i].notification!=null)
            this.verif_notification=true
           
            this.ds.getOneNotification(this.dataProjet[i].notification).subscribe(data=>{
                this.trouve=false
                this.dataOneNotification=data
                this.data_notification.unshift(this.dataOneNotification)
                for (let j = 0; j < this.dataOneNotification.employee.length; j++) {
                    if(this.dataOneNotification.employee[j]==this.token.getUser().id){
                        this.trouve=true
                    }
                }
                if(this.trouve==false){
                     this.nbr_notification=this.nbr_notification+1
                 }
            })
        
    }
     })
    }
    
    click_notification(){
        this.nbr_notification=0
//         this.ds.getMesprojets(this.token.getUser().id).subscribe(data=>{this.dataProjet=data
//             for (let i = 0; i < this.dataProjet.length; i++) {
//                 if(this.dataProjet[i].notification!=null){
//                     let id=this.data_notification[i]._id
//         this.ds.getOneNotification(id).subscribe(data=>{
//             this.dataOneNotification=data
//             for (let j = 0; j < this.dataOneNotification.employee.length; i++) {
//                 if(this.dataOneNotification.employee[j]==this.token.getUser().id){
//                     this.trouve=true
//                 }
//             }
//             if(this.trouve==false){
//             this.dataOneNotification.employee.push(this.token.getUser().id)
//             this.ds.updateNotification(id,this.dataOneNotification).subscribe((response)=>console.log(response))
            
//             }
//         })
               
//     }
//     }
// }) 
this.ds.getMesprojets(this.token.getUser().id).subscribe(data=>{this.dataProjet=data
for (let i = 0; i < this.dataProjet.length; i++) {
    if(this.dataProjet[i].notification!=null){
           
               
                this.ds.getOneNotification(this.dataProjet[i].notification).subscribe(data=>{
                              this.trouve=false
                                this.dataOneNotification=data
                                for (let j = 0; j < this.dataOneNotification.employee.length; j++) {
                                    if(this.dataOneNotification.employee[j]==this.token.getUser().id){
                                        this.trouve=true
                                    }
                                }
                                if(this.trouve==false){
                                this.dataOneNotification.employee.push(this.token.getUser().id)
                                this.ds.updateNotification(this.dataProjet[i].notification,this.dataOneNotification).subscribe((response)=>console.log(response))
                                
                                }
                            })
                // if(this.data_notification[i].etat=='Non consultée'){
                //     let id=this.data_notification[i]._id
                //     this.ds.getOneNotification(id).subscribe(response=>{this.dataOneNotification=response
                //         this.dataOneNotification.etat="Consultée"
                       
                //         this.ds.updateNotification(id,this.dataOneNotification).subscribe((response)=>console.log(response))
                        
                //     })
                // }
              
    }
            } 
        
        })

    }

    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const body = document.getElementsByTagName('body')[0];
        setTimeout(function(){
            toggleButton.classList.add('toggled');
        }, 500);

        body.classList.add('nav-open');

        this.sidebarVisible = true;
    };
    sidebarClose() {
        const body = document.getElementsByTagName('body')[0];
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        body.classList.remove('nav-open');
    };
    sidebarToggle() {
        // const toggleButton = this.toggleButton;
        // const body = document.getElementsByTagName('body')[0];
        var $toggle = document.getElementsByClassName('navbar-toggler')[0];

        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
        const body = document.getElementsByTagName('body')[0];

        if (this.mobile_menu_visible == 1) {
            // $('html').removeClass('nav-open');
            body.classList.remove('nav-open');
            if ($layer) {
                $layer.remove();
            }
            setTimeout(function() {
                $toggle.classList.remove('toggled');
            }, 400);

            this.mobile_menu_visible = 0;
        } else {
            setTimeout(function() {
                $toggle.classList.add('toggled');
            }, 430);

            var $layer = document.createElement('div');
            $layer.setAttribute('class', 'close-layer');


            if (body.querySelectorAll('.main-panel')) {
                document.getElementsByClassName('main-panel')[0].appendChild($layer);
            }else if (body.classList.contains('off-canvas-sidebar')) {
                document.getElementsByClassName('wrapper-full-page')[0].appendChild($layer);
            }

            setTimeout(function() {
                $layer.classList.add('visible');
            }, 100);

            $layer.onclick = function() { //asign a function
              body.classList.remove('nav-open');
              this.mobile_menu_visible = 0;
              $layer.classList.remove('visible');
              setTimeout(function() {
                  $layer.remove();
                  $toggle.classList.remove('toggled');
              }, 400);
            }.bind(this);

            body.classList.add('nav-open');
            this.mobile_menu_visible = 1;

        }
    };

    getTitle(){
      var titlee = this.location.prepareExternalUrl(this.location.path());
      if(titlee.charAt(0) === '#'){
          titlee = titlee.slice( 1 );
      }

      for(var item = 0; item < this.listTitles.length; item++){
          if(this.listTitles[item].path === titlee){
              return this.listTitles[item].title;
          }
      }
      return '';
    }
    logout(): void {
        this.token.signOut();
        this.router.navigate(['/login'])
    }
    test(){
        
    }



}
