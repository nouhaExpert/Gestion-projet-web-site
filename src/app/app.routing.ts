import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { AuthAdminLayoutComponent } from './layouts/auth-admin-layout/auth-admin-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { GuardGuard } from 'app/guards/guard.guard';
const routes: Routes =[
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: AuthAdminLayoutComponent,
  },
   {
    path: 'admin',
    component: AdminLayoutComponent,canActivate:[GuardGuard],
    children: [{
      path: '',
      loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule)
    }]
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
       useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
