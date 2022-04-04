import { HttpClient, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { map } from 'rxjs/operators';
import { API_URL } from './app-config';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private uploadUrl = environment.apiUrl + '/api/upload';
  constructor(private httpClient: HttpClient) { }

  public upload(data, uploadUrl=null) {
    return this.httpClient.post<any>(this.uploadUrl, data, {
      reportProgress: true,
      observe: 'events'
    }).pipe(map((event) => {

      switch (event.type) {

        case HttpEventType.UploadProgress:
          const progress = Math.round(100 * event.loaded / event.total);
          return { status: 'progress', message: progress };

        case HttpEventType.Response:
          return event.body;
        default:
          return `Unhandled event: ${event.type}`;
      }
    })
    );
  }

  public upload2(data, loadUrl) {
    let uploadURL = loadUrl; //`${this.SERVER_URL}/upload`;

    return this.httpClient.post<any>(uploadURL, data);
  }
}
