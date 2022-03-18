import { Injectable } from '@angular/core';
import { HttpService } from 'app/services/http.service';
import { generalUrl } from './general-url';
import { SubjectData, SubjectPostModel } from './settings/pages/subject/subject.model';
import { LGA } from './student/student.model';
import * as qs from 'qs';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  lga: LGA[] = [];
  filteredLga: LGA[] = [];

  constructor(
    private httpService: HttpService
  ) { }

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
  
  getAllClassRooms() {
    return this.httpService.get(`${generalUrl.classroom.list}`);
  }
  
  getAllHouses() {
    return this.httpService.get(`${generalUrl.house.list}`);
  }
  
  getAllParent() {
    return this.httpService.get(`${generalUrl.parent.list}`);
  }
  
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
}