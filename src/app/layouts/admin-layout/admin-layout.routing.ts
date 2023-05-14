import { Routes } from '@angular/router';
import { GuardAdminGuard } from 'app/guards/guard-admin.guard';
import { GuardNonadminGuard } from 'app/guards/guard-nonadmin.guard';


import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { EmployeeComponent } from 'app/employee/employee.component';
import { ProjetComponent } from 'app/projet/projet.component';
import { DetailsemployeeComponent } from 'app/detailsemployee/detailsemployee.component';
import { DetailsprojetComponent } from 'app/detailsprojet/detailsprojet.component';
import { DetailstacheComponent } from 'app/detailstache/detailstache.component';
import { ActiviteComponent } from 'app/activite/activite.component';
import { DetailsactiviteComponent } from 'app/detailsactivite/detailsactivite.component';
import { RoleComponent } from 'app/role/role.component';
import { GradeComponent } from 'app/grade/grade.component';
import { FonctionComponent } from 'app/fonction/fonction.component';
import { RapportComponent } from 'app/rapport/rapport.component';
export const AdminLayoutRoutes: Routes = [
    // {
    //   path: '',
    //   children: [ {
    //     path: 'dashboard',
    //     component: DashboardComponent
    // }]}, {
    // path: '',
    // children: [ {
    //   path: 'userprofile',
    //   component: UserProfileComponent
    // }]
    // }, {
    //   path: '',
    //   children: [ {
    //     path: 'icons',
    //     component: IconsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'notifications',
    //         component: NotificationsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'maps',
    //         component: MapsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'typography',
    //         component: TypographyComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'upgrade',
    //         component: UpgradeComponent
    //     }]
    // }
    { path: '',      component: DashboardComponent,canActivate:[GuardNonadminGuard]},
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'employee',     component: EmployeeComponent ,canActivate:[GuardAdminGuard]},
    { path: 'employeedetails/:id',     component: DetailsemployeeComponent ,canActivate:[GuardAdminGuard]},
    { path: 'role',     component: RoleComponent ,canActivate:[GuardAdminGuard]},
    { path: 'grade',     component: GradeComponent ,canActivate:[GuardAdminGuard]},
    { path: 'fonction',     component: FonctionComponent ,canActivate:[GuardAdminGuard]},
    { path: 'projet',     component: ProjetComponent ,canActivate:[GuardNonadminGuard]},
    { path: 'activite',     component: ActiviteComponent ,canActivate:[GuardNonadminGuard]},
   
    { path: 'projetdetails/:id',     component: DetailsprojetComponent ,canActivate:[GuardNonadminGuard]},
    { path: 'tachedetails/:id',     component: DetailstacheComponent ,canActivate:[GuardNonadminGuard]},
    
    { path: 'activitedetails/:id',     component: DetailsactiviteComponent ,canActivate:[GuardNonadminGuard]},
    { path: 'rapport',     component: RapportComponent ,canActivate:[GuardNonadminGuard]},




    { path: 'table-list',     component: TableListComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent },
];
