import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import Strapi from 'strapi-sdk-js';

@Injectable({
  providedIn: 'root'
})
export class StrapiService {
  client: Strapi;

  constructor() { 
    this.client = new Strapi({
      url: environment.apiUrl,
    });
  }
}
