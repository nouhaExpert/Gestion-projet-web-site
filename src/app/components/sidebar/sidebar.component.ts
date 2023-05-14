import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../../services/token-storage.service';
declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/admin/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: '/admin/user-profile', title: 'Profil',  icon:'person', class: '' },
    { path: '/admin/employee', title: 'Employés',  icon:'supervisor_account', class: '' },
    { path: '/admin/role', title: 'Rôles',  icon:'person', class: ''},
    { path: '/admin/grade', title: 'Grades',  icon:'person', class: '' },
    { path: '/admin/fonction', title: 'Fonctions',  icon:'person', class: '' },
    { path: '/admin/projet', title: 'Projets',  icon:'assignment', class: '' },
    { path: '/admin/activite', title: 'Activités',  icon:'assignment', class: '' },
    { path: '/admin/rapport', title: 'Rapport annuel',  icon:'library_books', class: '' },
    { path: '/admin/table-list', title: 'Table List',  icon:'content_paste', class: '' },
    { path: '/admin/typography', title: 'Typography',  icon:'library_books', class: '' },
    { path: '/admin/icons', title: 'Icons',  icon:'bubble_chart', class: '' },
    { path: '/admin/maps', title: 'Maps',  icon:'location_on', class: '' },
    { path: '/admin/notifications', title: 'Notifications',  icon:'notifications', class: '' },
    
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  private roles: string[] = [];
  isLoggedIn = false;
  showAdmin = false;
  showDirecteur = false;
  showDeveloppeur = false;
  showTesteur = false;
  username?: string;
  menu: RouteInfo[]=[];

  constructor(private tokenStorageService: TokenStorageService) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.rolesNom;
      
      this.showAdmin = this.roles.includes('admin');
      this.showDirecteur = this.roles.includes('directeur');
      this.showDeveloppeur = this.roles.includes('developpeur');
      this.showTesteur = this.roles.includes('testeur');
      this.username = user.username;




      for (let i = 0; i < this.menuItems.length; i++) {
        if(this.menuItems[i].title=='Profil' ){
        this.menu.push(this.menuItems[i])
         }
         if(this.showAdmin){
          if((this.menuItems[i].title=='Employés') ||
           (this.menuItems[i].title=='Rôles') ||
             (this.menuItems[i].title=='Grades')||
             (this.menuItems[i].title=='Fonctions')){
           
            this.menu.push(this.menuItems[i])}
            
        }else if(this.showDirecteur || this.showDeveloppeur  || this.showTesteur){
          if((this.menuItems[i].title=='Dashboard')|| 
          (this.menuItems[i].title=='Projets') ||
           (this.menuItems[i].title=='Activités')||
           (this.menuItems[i].title=='Rapport annuel')){
            this.menu.push(this.menuItems[i])}
            
        }
        
      }
    }
    
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
