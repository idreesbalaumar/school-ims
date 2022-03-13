import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'environments/environment';
import { User as OldUser, Role } from 'app/auth/models';
import { ToastrService } from 'ngx-toastr';
import { AuthLoginResponse } from '../models/login.response';
import { StrapiAuthLoginResponse, User } from 'app/models/auth.model';
import { AvatarService } from 'app/services/avatar.service';
import { StrapiListResponse } from 'app/models/strapi-responses.model';
import { Avatar } from 'app/models/common.model';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  //public
  public currentUser: Observable<User>;

  //private
  private currentUserSubject: BehaviorSubject<User>;

  /**
   *
   * @param {HttpClient} _http
   * @param {ToastrService} _toastrService
   */
  constructor(
    private avatarService: AvatarService,
    private _http: HttpClient,
    private _toastrService: ToastrService
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  // getter: currentUserValue
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  /**
   *  Confirms if user is admin
   */
  get isAdmin() {
    return this.currentUser && this.currentUserSubject.value.role === Role.Admin;
  }

  /**
   *  Confirms if user is client
   */
  get isClient() {
    return this.currentUser && this.currentUserSubject.value.role === Role.Client;
  }

  /**
   *  Confirms if user is form master
   */
  get isFormMaster() {
    return this.currentUser && this.currentUserSubject.value.role === Role.FormMaster;
  }

  /**
   *  Confirms if user is parent
   */
  get isParent() {
    return this.currentUser && this.currentUserSubject.value.role === Role.Parent;
  }

  /**
   *  Confirms if user is user
   */
  get isUser() {
    return this.currentUser && this.currentUserSubject.value.role === Role.User;
  }

  /**
   * User login
   *
   * @param email
   * @param password
   * @returns user
   */
  login(identifier: string, password: string) {
    return this._http
      .post<StrapiAuthLoginResponse>(`${environment.BASE_URL}/auth/local`, { identifier, password })
      .pipe(
        map((data) => {
          console.log(data)
          // login successful if there's a jwt token in the response
          if (data && data.jwt) {
            // get currentUser avatar
            this.avatarService.getAllUserAvatars().subscribe((response) => {
              console.log("HTTP Response:");
              console.log(response);
              const avatar = this.avatarService.findAvatarByUserId(data.user.id, response.data.map(entry => entry.attributes));
              const user = this.currentUserSubject.getValue();
              const avatarUrl = `${environment.apiUrl}${avatar.avatar.data.attributes.url}`;
              const newUser = {...user, avatar: avatarUrl };
              this.currentUserSubject.next(newUser);
              console.log("Avatared User: ", newUser);
            });

            // store data details and jwt token in local storage to keep data logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify({ ...data.user, accessToken: data.jwt, avatar: 'avatar-s-3.jpg', role: Role.User }));

            // Display welcome toast!
            setTimeout(() => {
              this._toastrService.success(
                'You have successfully logged in as an ' +
                Role.User +
                ' user to School-IMS.',
                '👋 Welcome, ' + data.user.username + '!',
                { toastClass: 'toast ngx-toastr', closeButton: true }
              );
            }, 2500);

            data.user.accessToken = data.jwt;
            // notify
            this.currentUserSubject.next({ ...data.user, role: Role.User });
          }

          return data;
        })
      );
  }

  getAvatar(response: StrapiListResponse<Avatar>) {
    const userId = 9;
    const avatar = this.avatarService.findAvatarByUserId(userId, response.data.map(entry => entry.attributes));
  }

  /**
   * User logout
   *
   */
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    // notify
    this.currentUserSubject.next(null);
  }
}
