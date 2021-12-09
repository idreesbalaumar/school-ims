import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';

import { CoreCommonModule } from '@core/common.module';
import { CoreDirectivesModule } from '@core/directives/directives';
import { CorePipesModule } from '@core/pipes/pipes.module';
import { CoreSidebarModule } from '@core/components';

import { InvoiceListService } from 'app/main/apps/invoice/invoice-list/invoice-list.service';
import { InvoiceModule } from 'app/main/apps/invoice/invoice.module';

import { StudentEditComponent } from 'app/main/apps/student/student-edit/student-edit.component';
import { StudentEditService } from 'app/main/apps/student/student-edit/student-edit.service';

import { StudentListComponent } from 'app/main/apps/student/student-list/student-list.component';
import { StudentListService } from 'app/main/apps/student/student-list/student-list.service';

import { StudentViewComponent } from 'app/main/apps/student/student-view/student-view.component';
import { StudentViewService } from 'app/main/apps/student/student-view/student-view.service';
import { NewStudentSidebarComponent } from 'app/main/apps/student/student-list/new-student-sidebar/new-student-sidebar.component';

// routing
const routes: Routes = [
  {
    path: 'student-list',
    component: StudentListComponent,
    resolve: {
      uls: StudentListService
    },
    data: { animation: 'StudentListComponent' }
  },
  {
    path: 'student-view/:id',
    component: StudentViewComponent,
    resolve: {
      data: StudentViewService,
      InvoiceListService
    },
    data: { path: 'view/:id', animation: 'StudentViewComponent' }
  },
  {
    path: 'student-edit/:id',
    component: StudentEditComponent,
    resolve: {
      ues: StudentEditService
    },
    data: { animation: 'StudentEditComponent' }
  },
  {
    path: 'student-view',
    redirectTo: '/apps/student/student-view/2' // Redirection
  },
  {
    path: 'student-edit',
    redirectTo: '/apps/student/student-edit/2' // Redirection
  }
];

@NgModule({
  declarations: [StudentListComponent, StudentViewComponent, StudentEditComponent, NewStudentSidebarComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CoreCommonModule,
    FormsModule,
    NgbModule,
    NgSelectModule,
    Ng2FlatpickrModule,
    NgxDatatableModule,
    CorePipesModule,
    CoreDirectivesModule,
    InvoiceModule,
    CoreSidebarModule
  ],
  providers: [StudentListService, StudentViewService, StudentEditService]
})
export class StudentModule {}
