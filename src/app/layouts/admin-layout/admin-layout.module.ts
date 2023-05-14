import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatProgressBarModule} from '@angular/material/progress-bar';

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

import { DialogEmployeeComponent } from 'app/dialog-employee/dialog-employee.component';
import { ActiviteDialogComponent } from 'app/activite-dialog/activite-dialog.component';
import { ProjetDialogComponent } from 'app/projet-dialog/projet-dialog.component';
import { TacheDialogComponent } from 'app/tache-dialog/tache-dialog.component';
import { RoleDialogComponent } from 'app/role-dialog/role-dialog.component';
import { FonctionDialogComponent } from 'app/fonction-dialog/fonction-dialog.component';
import { GradeDialogComponent } from 'app/grade-dialog/grade-dialog.component';
import { BugDialogComponent } from 'app/bug-dialog/bug-dialog.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressBarModule,
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
    EmployeeComponent,
    ProjetComponent,
    DetailsemployeeComponent,
    DetailsprojetComponent,
    DetailstacheComponent,
    ActiviteComponent,
    DetailsactiviteComponent,
    RoleComponent,
    GradeComponent,
    FonctionComponent,
    DialogEmployeeComponent,
    ActiviteDialogComponent,
    ProjetDialogComponent,
    TacheDialogComponent,
    RoleDialogComponent,
    FonctionDialogComponent,
    GradeDialogComponent,
    BugDialogComponent,
    RapportComponent,
  ]
})

export class AdminLayoutModule {}
