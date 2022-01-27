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

// import { InvoiceListService } from 'app/main/apps/invoice/invoice-list/invoice-list.service';
// import { InvoiceModule } from 'app/main/apps/invoice/invoice.module';

import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { ResultListService } from '../result/result-list/result-list.service';
import { ResultModule } from '../result/result.module';
import { TeacherAddService } from './teacher-add/teacher-add.service';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { TeacherAddComponent } from './teacher-add/teacher-add.component';
import { TeacherListComponent } from './teacher-list/teacher-list.component';
import { TeacherEditComponent } from './teacher-edit/teacher-edit.component';
import { TeacherEditService } from './teacher-edit/teacher-edit.service';
import { TeacherListService } from './teacher-list/teacher-list.service';
import { TeacherViewComponent } from './teacher-view/teacher-view.component';
import { TeacherViewService } from './teacher-view/teacher-view.service';
import { NewTeacherSidebarComponent } from './teacher-list/new-teacher-sidebar/new-teacher-sidebar.component';

// routing
const routes: Routes = [
  {
    path: 'teacher-list',
    component: TeacherListComponent,
    resolve: {
      uls: TeacherListService
    },
    data: { animation: 'TeacherListComponent' }
  },
  {
    path: 'teacher-add',
    component: TeacherAddComponent,
    resolve: {
      uls: TeacherAddService
    },
    data: { animation: 'TeacherAddComponent' }
  },
  {
    path: 'teacher-view/:id',
    component: TeacherViewComponent,
    resolve: {
      data: TeacherViewService,
      ResultListService
    },
    data: { path: 'view/:id', animation: 'TeacherViewComponent' }
  },
  {
    path: 'teacher-edit/:id',
    component: TeacherEditComponent,
    resolve: {
      ues: TeacherEditService
    },
    data: { animation: 'TeacherEditComponent' }
  },
  {
    path: 'teacher-view',
    redirectTo: '/apps/teacher/teacher-view/2' // Redirection
  },
  {
    path: 'teacher-edit',
    redirectTo: '/apps/teacher/teacher-edit/2' // Redirection
  }
];

@NgModule({
  declarations: [TeacherListComponent, TeacherViewComponent, TeacherEditComponent, NewTeacherSidebarComponent, TeacherAddComponent],
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
    ResultModule,
    CoreSidebarModule,
    ContentHeaderModule,
    SweetAlert2Module.forRoot()
  ],
  providers: [TeacherListService, TeacherViewService, TeacherEditService, TeacherAddService]
})
export class TeacherModule {}
