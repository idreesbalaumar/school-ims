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

import { ResultListComponent } from 'app/main/apps/result/result-list/result-list.component';
import { ResultListService } from 'app/main/apps/result/result-list/result-list.service';

import { ResultAddComponent } from 'app/main/apps/result/result-add/result-add.component';
import { ResultAddService } from 'app/main/apps/result/result-add/result-add.service';
import { AddCustomerSidebarComponent } from 'app/main/apps/result/result-add/add-customer-sidebar/add-customer-sidebar.component';

import { ResultEditComponent } from 'app/main/apps/result/result-edit/result-edit.component';
import { ResultEditService } from 'app/main/apps/result/result-edit/result-edit.service';
import { SendResultSidebarComponent } from 'app/main/apps/result/result-edit/sidebar/send-result-sidebar/send-result-sidebar.component';
import { AddPaymentSidebarComponent } from 'app/main/apps/result/result-edit/sidebar/add-payment-sidebar/add-payment-sidebar.component';

import { ResultPreviewComponent } from 'app/main/apps/result/result-preview/result-preview.component';
import { ResultPreviewService } from 'app/main/apps/result/result-preview/result-preview.service';
import { AddPaymentSidebarPreviewComponent } from 'app/main/apps/result/result-preview/sidebar/add-payment-sidebar-preview/add-payment-sidebar-preview.component';
import { SendResultSidebarPreviewComponent } from './result-preview/sidebar/send-reult-sidebar-preview/send-result-sidebar-preview.component';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';

// routing
const routes: Routes = [
  {
    path: 'add',
    component: ResultAddComponent,
    resolve: {
      Ias: ResultAddService
    },
    data: { animation: 'ResultAddComponent' }
  },
  {
    path: 'list',
    component: ResultListComponent,
    resolve: {
      uls: ResultListService
    },
    data: { animation: 'ResultListComponent' }
  },
  {
    path: 'preview/:id',
    component: ResultPreviewComponent,
    resolve: {
      data: ResultPreviewService
    },
    data: { path: 'user-view/:id', animation: 'ResultPreviewComponent' }
  },
  {
    path: 'edit/:id',
    component: ResultEditComponent,
    resolve: {
      data: ResultEditService
    },
    data: { path: 'user-view/:id', animation: 'ResultEditComponent' }
  },
  {
    path: 'preview',
    redirectTo: '/apps/result/preview/4989' // Redirection
  },
  {
    path: 'edit',
    redirectTo: '/apps/result/edit/4989' // Redirection
  }
];

@NgModule({
  declarations: [
    ResultAddComponent,
    ResultListComponent,
    ResultPreviewComponent,
    ResultEditComponent,
    AddCustomerSidebarComponent,
    SendResultSidebarComponent,
    AddPaymentSidebarComponent,
    SendResultSidebarPreviewComponent,
    AddPaymentSidebarPreviewComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CoreCommonModule,
    CoreDirectivesModule,
    Ng2FlatpickrModule,
    NgxDatatableModule,
    FormsModule,
    CorePipesModule,
    NgbModule,
    NgSelectModule,
    CoreSidebarModule,
    ContentHeaderModule
  ],
  providers: [ResultListService, ResultPreviewService, ResultEditService, ResultAddService],
  exports: [ResultListComponent]
})
export class ResultModule {}
