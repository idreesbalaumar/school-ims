import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { School } from 'app/main/apps/school.model';
import { StrapiSingleResponse } from 'app/models/strapi-responses.model';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {

  private schoolPath = '/school';

  constructor(
    private http: HttpClient,
  ) { }

  getSchoolInfor(){
    return this.http.get<StrapiSingleResponse<School>>(environment.BASE_URL+this.schoolPath+'?populate=*');
  }

}
