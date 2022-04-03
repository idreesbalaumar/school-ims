import { Injectable } from '@angular/core';
import { HttpService } from 'app/services/http.service';
import { generalUrl } from './general-url';
import { SubjectData, SubjectPostModel } from './settings/pages/subject/subject.model';
import { LGA } from './student/student.model';
import * as qs from 'qs';
import { HousePostModel } from './settings/pages/house/house.model';
import { TeacherPostModel } from './teacher/teacher.model';
import { ClassRoomPostModel } from './settings/pages/classes/class-room.model';
import { GradePostModel } from './settings/pages/grade-system/grade.model';
import { AcademicSessionPostModel, NewSessionPostModel } from './settings/pages/academic-session/academic-session.model';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { SessionTermPostModel, TermPostModel } from './settings/pages/academic-term/academic-term.model';
import { zip } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  apiURL: 'http://localhost:1337/api';

  lga: LGA[] = [];
  filteredLga: LGA[] = [];

  constructor(
    private httpService: HttpService,
    private http: HttpClient
  ) { }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  getAllGenders() {
    return this.httpService.get(`${generalUrl.gender.list}`);
  }

  getAllStates() {
    return this.httpService.get(`${generalUrl.state.list}`);
  }

  getAllLGA() {
    return this.httpService.get(`${generalUrl.lga.list}`);
  }

  getAllClassCategories() {
    return this.httpService.get(`${generalUrl.classcategory.list}`);
  }

  getAllClass() {
    return this.httpService.get(`${generalUrl.class.list}`);
  }

  // getAllClassRooms() {
  //   return this.httpService.get(`${generalUrl.classroom.list}`);
  // }

  // getAllHouses() {
  //   return this.httpService.get(`${generalUrl.house.list}`);
  // }

  getAllParent() {
    return this.httpService.get(`${generalUrl.parent.list}`);
  }

  // AcademicSession start
  getAllAcademicSessions() {
    const query = qs.stringify({
      pagination: {
        start: 0,
        limit: -1,
      },
    }, {
      encodeValuesOnly: true,
    });
    return this.httpService.get(`${generalUrl.academicsession.list}?${query}`);
  }

  deleteAcademicSession(id: number) {
    return this.httpService.delete(
      `${generalUrl.academicsession.delete}/${id}`
    );
  }

  updateAcademicSession(academicsession: AcademicSessionPostModel) {
    return this.httpService.put(
      `${generalUrl.academicsession.update}/${academicsession.AcademicSessionID}`,
      { data: academicsession }
    );
  }

  addAcademicSession(academicsession: AcademicSessionPostModel) {
    return this.httpService.post(
      `${generalUrl.academicsession.add}`,
      { data: academicsession }
    );
  }


  // AcademicSession end

  // create New Session start
  createNewSession(academicsession: NewSessionPostModel) {
    academicsession.to = null;
    academicsession.is_active = true;
    return this.httpService.post(`${generalUrl.academicsession.add}`, { data: academicsession }).subscribe(
      (response) => {
        // first-term Session Term
        const firstSessionTerm = new SessionTermPostModel();
        firstSessionTerm.start_date = academicsession.from;
        firstSessionTerm.term.id = 1;
        firstSessionTerm.session.id = response.data.id;
        firstSessionTerm.end_date = null;
        firstSessionTerm.is_completed = false;
        this.httpService.post(`${generalUrl.sessionterm.add}`, { data: firstSessionTerm }).subscribe();
        // second-term Session Term
        const secondSessionTerm = new SessionTermPostModel();
        secondSessionTerm.start_date = academicsession.from;
        secondSessionTerm.term.id = 2;
        secondSessionTerm.session.id = response.data.id;
        secondSessionTerm.end_date = null;
        secondSessionTerm.is_completed = false;
        this.httpService.post(`${generalUrl.sessionterm.add}`, { data: secondSessionTerm }).subscribe();
        // second-term Session Term
        const thirdSessionTerm = new SessionTermPostModel();
        thirdSessionTerm.start_date = academicsession.from;
        thirdSessionTerm.term.id = 3;
        thirdSessionTerm.session.id = response.data.id;
        thirdSessionTerm.end_date = null;
        thirdSessionTerm.is_completed = false;
        this.httpService.post(`${generalUrl.sessionterm.add}`, { data: thirdSessionTerm }).subscribe();

        this.updateAllTerms().subscribe(
          (response) => {
            // console.log("Term Update: ", response);
            const term = new TermPostModel();
            term.is_active = true;
            this.updateTerm(1,term).subscribe();
          }
        )
      }
    )
  }

  updateTerm(id: number, term: TermPostModel) {
    return this.httpService.put(
      `${generalUrl.term.update}/${id}`,
      { data: term }
    );
  }

  updateAllTerms() {
    const t1 = new TermPostModel();
    t1.is_active = false;
    const t1Request = this.updateTerm(1, t1);

    const t2 = new TermPostModel();
    t2.is_active = false;
    const t2Request = this.updateTerm(2, t2);

    const t3 = new TermPostModel();
    t3.is_active = false;
    const t3Request = this.updateTerm(3, t3);

    return zip(t1Request, t2Request, t3Request)
      .pipe(mergeMap(x => {
        return x;
      }));
  }

  // updateAllTerms(term: TermPostModel) {
  //   return this.httpService.put(
  //     `${generalUrl.term.update}/${term.TermID}`,
  //     { data: term }
  //   );
  // }



  // create New Session start
  // createNewSession(academicsession: any): Observable<NewSessionPostModel> {
  //   return this.http
  //     .post<NewSessionPostModel>(
  //       this.apiURL + '//sessions',
  //       JSON.stringify(academicsession),
  //       this.httpOptions
  //     )
  //     .pipe(retry(1), catchError(this.handleError));
  // }

  // // Error handling
  // handleError(error: any) {
  //   let errorMessage = '';
  //   if (error.error instanceof ErrorEvent) {
  //     // Get client-side error
  //     errorMessage = error.error.message;
  //   } else {
  //     // Get server-side error
  //     errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  //   }
  //   window.alert(errorMessage);
  //   return throwError(() => {
  //     return errorMessage;
  //   });
  // }
  // create New Session end

  // subjects start
  getAllSubjects() {
    const query = qs.stringify({
      pagination: {
        start: 0,
        limit: -1,
      },
    }, {
      encodeValuesOnly: true,
    });
    return this.httpService.get(`${generalUrl.subject.list}?${query}`);
  }

  deleteSubject(id: number) {
    return this.httpService.delete(
      `${generalUrl.subject.delete}/${id}`
    );
  }

  updateSubject(subject: SubjectPostModel) {
    return this.httpService.put(
      `${generalUrl.subject.update}/${subject.SubjectID}`,
      { data: subject }
    );
  }

  addSubject(subject: SubjectPostModel) {
    return this.httpService.post(
      `${generalUrl.subject.add}`,
      { data: subject }
    );
  }
  // subjects end

  // grade start
  getAllGrades() {
    const query = qs.stringify({
      pagination: {
        start: 0,
        limit: -1,
      },
    }, {
      encodeValuesOnly: true,
    });
    return this.httpService.get(`${generalUrl.grade.list}?${query}`);
  }

  deleteGrade(id: number) {
    return this.httpService.delete(
      `${generalUrl.grade.delete}/${id}`
    );
  }

  updateGrade(grade: GradePostModel) {
    return this.httpService.put(
      `${generalUrl.grade.update}/${grade.GradeID}`,
      { data: grade }
    );
  }

  addGrade(grade: GradePostModel) {
    return this.httpService.post(
      `${generalUrl.grade.add}`,
      { data: grade }
    );
  }
  // grade end

  // houses start
  getAllHouses() {
    return this.httpService.get(`${generalUrl.house.list}`);
  }

  deleteHouse(id: number) {
    return this.httpService.delete(
      `${generalUrl.house.delete}/${id}`
    );
  }

  updateHouse(house: HousePostModel) {
    return this.httpService.put(
      `${generalUrl.house.update}/${house.HouseID}?populate=*`,
      { data: house }
    );
  }

  addHouse(house: HousePostModel) {
    return this.httpService.post(
      `${generalUrl.house.add}`,
      { data: house }
    );
  }
  // houses end

  // class-rooms start
  getAllClassRooms() {
    return this.httpService.get(`${generalUrl.classroom.list}`);
  }

  deleteClassRoom(id: number) {
    return this.httpService.delete(
      `${generalUrl.classroom.delete}/${id}`
    );
  }

  updateClassRoom(classroom: ClassRoomPostModel) {
    return this.httpService.put(
      `${generalUrl.classroom.update}/${classroom.ClassRoomID}?populate=*`,
      { data: classroom }
    );
  }

  addClassRoom(classroom: ClassRoomPostModel) {
    return this.httpService.post(
      `${generalUrl.classroom.add}`,
      { data: classroom }
    );
  }
  // class-rooms end

  // teachers start
  getAllTeachers() {
    return this.httpService.get(`${generalUrl.teacher.list}`);
  }

  deleteTeacher(id: number) {
    return this.httpService.delete(
      `${generalUrl.teacher.delete}/${id}`
    );
  }

  updateTeacher(teacher: TeacherPostModel) {
    return this.httpService.put(
      `${generalUrl.teacher.update}/${teacher.TeacherID}`,
      { data: teacher }
    );
  }

  addTeacher(teacher: TeacherPostModel) {
    return this.httpService.post(
      `${generalUrl.teacher.add}`,
      { data: teacher }
    );
  }
  // teachers end
}
