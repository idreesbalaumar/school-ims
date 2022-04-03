import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Avatar } from 'app/models/common.model';
import { StrapiListResponse, StrapiSingleResponse } from 'app/models/strapi-responses.model';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AvatarService {

  private avatarPath = '/avatars?populate=*';

  constructor(
    private http: HttpClient,
  ) { }

  // getCurrentUserAvatar(){
  //   return this.http.get<StrapiListResponse<Avatar>>(environment.BASE_URL+this.avatarPath+'?populate=*');
  // }
  getAllUserAvatars(){
    return this.http.get<StrapiListResponse<Avatar>>(environment.BASE_URL+this.avatarPath);
  }

  findAvatarByUserId(userId: number, avatars: Avatar[]): Avatar {
    const avatar = avatars.find(item => {
      return item.user.data.id == userId;
    });

    return avatar;
  }
}
