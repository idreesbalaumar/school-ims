import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcademicSessionComponent } from './pages/academic-session/academic-session.component';
import { AcademicTermComponent } from './pages/academic-term/academic-term.component';
import { ClassesComponent } from './pages/classes/classes.component';
import { GeneralSettingsComponent } from './pages/general-settings/general-settings.component';
import { GradeSystemComponent } from './pages/grade-system/grade-system.component';
import { HouseComponent } from './pages/house/house.component';
import { SubjectComponent } from './pages/subject/subject.component';

const routes: Routes = [
  { path: '', redirectTo: 'general-settings' },
  { path: 'general-settings', component: GeneralSettingsComponent },
  { path: 'academic-session', component: AcademicSessionComponent },
  { path: 'academic-term', component: AcademicTermComponent },
  { path: 'house', component: HouseComponent },
  { path: 'grade-system', component: GradeSystemComponent },
  { path: 'subject', component: SubjectComponent },
  { path: 'classes', component: ClassesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
