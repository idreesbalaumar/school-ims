import { Injectable } from '@angular/core';
import { HttpService } from 'app/services/http.service';
import { studentUrl } from './student-url';

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
}
