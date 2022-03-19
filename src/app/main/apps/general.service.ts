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
  
  // getAllClassRooms() {
  //   return this.httpService.get(`${generalUrl.classroom.list}`);
  // }
  
  // getAllHouses() {
  //   return this.httpService.get(`${generalUrl.house.list}`);
  // }
  
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
