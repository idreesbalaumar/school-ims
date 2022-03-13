import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgApexchartsModule } from 'ng-apexcharts';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { AuthGuard } from 'app/auth/helpers';
import { Role } from 'app/auth/models';

import { CoreCommonModule } from '@core/common.module';

import { InvoiceModule } from 'app/main/apps/invoice/invoice.module';
import { InvoiceListService } from 'app/main/apps/invoice/invoice-list/invoice-list.service';

import { DashboardService } from 'app/main/dashboard/dashboard.service';

import { AnalyticsComponent } from 'app/main/dashboard/analytics/analytics.component';
import { SchoolDashboardComponent } from 'app/main/dashboard/school/school-dashboard.component';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';

const routes = [
  {
    path: 'analytics',
    component: AnalyticsComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin], animation: 'danalytics' },
    resolve: {
      css: DashboardService,
      inv: InvoiceListService
    }
  },
  {
    path: 'school',
    component: SchoolDashboardComponent,
    canActivate: [AuthGuard],
    resolve: {
      css: DashboardService
    },
    data: { animation: 'decommerce' }
  }
];

@NgModule({
  declarations: [AnalyticsComponent, SchoolDashboardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TranslateModule,
    NgbModule,
    PerfectScrollbarModule,
    CoreCommonModule,
    NgApexchartsModule,
    InvoiceModule,
    ContentHeaderModule,
  ],
  providers: [DashboardService, InvoiceListService],
  exports: [SchoolDashboardComponent]
})
export class DashboardModule {}
