import { Injectable } from '@angular/core';
import { HttpService } from 'app/services/http.service';
import { NewStudentApiModel } from './student-add/student-add.model';
import { studentUrl } from './student-url';
import { Student } from './student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(
    private httpService: HttpService
  ) { }

  getAll() {
    return this.httpService.get(`${studentUrl.student.list}`);
  }

  update(student: Student) {
    return this.httpService.put(
      `${studentUrl.student.update}/${student.id}`,
      student
    );
  }

  add(student: NewStudentApiModel) {
    return this.httpService.post(
      `${studentUrl.student.add}`,
      student
    );
  }
}
