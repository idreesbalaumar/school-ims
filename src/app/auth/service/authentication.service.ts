import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'environments/environment';
import { User, Role } from 'app/auth/models';
import { ToastrService } from 'ngx-toastr';
import { AuthLoginResponse } from '../models/login.response';

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
  constructor(private _http: HttpClient, private _toastrService: ToastrService) {
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
  login(email: string, password: string) {
    return this._http
      .post<AuthLoginResponse>(`${environment.apiUrl}/auth/login`, { email, password })
      .pipe(
        map((data) => {
          console.log(data)
          // login successful if there's a jwt token in the response
          if (data && data.accessToken) {
            // store data details and jwt token in local storage to keep data logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify({ ...data.user, accessToken: data.accessToken, avatar: 'avatar-s-3.jpg' }));

            // Display welcome toast!
            setTimeout(() => {
              this._toastrService.success(
                'You have successfully logged in as an ' +
                  data.user.role +
                  ' user to School-IMS.',
                '👋 Welcome, ' + data.user.firstName + '!',
                { toastClass: 'toast ngx-toastr', closeButton: true }
              );
            }, 2500);

            // notify
            this.currentUserSubject.next(data.user);
          }

          return data;
        })
      );
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
