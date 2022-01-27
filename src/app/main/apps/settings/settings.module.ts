import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { GeneralSettingsComponent } from './pages/general-settings/general-settings.component';
import { AcademicSessionComponent } from './pages/academic-session/academic-session.component';
import { AcademicTermComponent } from './pages/academic-term/academic-term.component';
import { HouseComponent } from './pages/house/house.component';
import { GradeSystemComponent } from './pages/grade-system/grade-system.component';
import { SubjectComponent } from './pages/subject/subject.component';
import { ClassesComponent } from './pages/classes/classes.component';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { FormsModule } from '@angular/forms';
import { FormElementsModule } from 'app/main/forms/form-elements/form-elements.module';
import { DatatablesModule } from 'app/main/tables/datatables/datatables.module';
import { TableModule } from 'app/main/tables/table/table.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DxSelectBoxModule, DxTextAreaModule, DxDateBoxModule, DxFormModule, DxDataGridModule, DxSpeedDialActionModule } from 'devextreme-angular';
import { CoreCommonModule } from '@core/common.module';
import { CardSnippetModule } from '@core/components/card-snippet/card-snippet.module';

const routes: Routes = [
  { path: '', component: SettingsComponent }
];

@NgModule({
  declarations: [
    SettingsComponent,
    GeneralSettingsComponent,
    AcademicSessionComponent,
    AcademicTermComponent,
    HouseComponent,
    GradeSystemComponent,
    SubjectComponent,
    ClassesComponent,
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    ContentHeaderModule,
    FormsModule,
    FormElementsModule,
    DatatablesModule,
    TableModule,
    NgxDatatableModule,
    DxSelectBoxModule,
    DxTextAreaModule,
    DxDateBoxModule,
    DxFormModule,
    DxDataGridModule,
    DxSpeedDialActionModule,
    CardSnippetModule,
    CoreCommonModule,
    RouterModule.forChild(routes)
  ]
})
export class SettingsModule { }
