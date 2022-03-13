import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(protected http: HttpClient) { }

  get(url: string) {
    return this.http.get<any>(url);
  }

  post(url: string, data: any) {
    return this.http.post<any>(url, data);
  }

  put(url: string, data: any) {
    return this.http.put<any>(url, data);
  }

  delete(url: string) {
    return this.http.delete<any>(url);
  }
}
