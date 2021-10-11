import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';
import { SignUpResponseData } from './interfaces/signup-response.interface';
import { environment } from './../../environments/environment';
import { SignInResponseData } from './interfaces/signin-response.interface';
import { User } from '../models/User';
import { Router } from '@angular/router';
import { LocalStorageService } from './local-storage.service';
import { CommonResponse } from './interfaces/common-response.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  //base url
  BaseUrl: string = environment.baseUrl;

  //versions
  Version1: string = '/api/v1';

  //endpoints
  SignUpEndPoint = '/auth/signup';
  SignInEndPoint = '/auth/signin';
  VerifyNewUser = '/auth/verify-user';
  VerifyResetPassword = '/auth/verify-reset-password';
  RequestForgotPassword = '/auth/forgot-password';
  ResetPassword = '/auth/reset-password';

  user = new BehaviorSubject<User>(null);

  //token expiration time
  tokenExpirationTime: any;

  /***
   *this.authservice.pipe(take(1)).subscribe((data)=>{})
   */
  constructor(
    private http: HttpClient,
    private router: Router,
    private localStorage: LocalStorageService
  ) {}

  // authentication routes

  signUp(data) {
    return this.http
      .post<SignUpResponseData>(
        `${this.BaseUrl}${this.Version1}${this.SignUpEndPoint}`,
        {
          email: data.email,
          password: data.password,
          userName: data.userName,
          fullName: data.fullName,
        }
      )
      .pipe(
        catchError((error) => {
          console.log(error, '<<');
          let erMsg = 'Unexpected error occurred!';
          if (!error.error || !error.error.error) {
            return throwError(erMsg);
          }
          let errorMessages = error.error.data.errors.map((er) => er.msg + '!');
          errorMessages = errorMessages.join('\n');
          erMsg = errorMessages || 'Unexpected error occurred!';
          return throwError(erMsg);
        })
      );
  }

  signIn(data) {
    return this.http
      .post<SignInResponseData>(
        `${this.BaseUrl}${this.Version1}${this.SignInEndPoint}`,
        {
          email: data.email,
          password: data.password,
        }
      )
      .pipe(
        catchError((error) => {
          let erMsg = 'Unexpected error occurred!';
          if (!error.error || !error.error.error) {
            return throwError(erMsg);
          }
          erMsg = error.error.message || 'Unexpected error occurred!';
          return throwError(erMsg);
        }),
        tap((resData) => {
          const _tokenExpDate = new Date(
            new Date().getTime() + +resData.data.expiresIn * 1000
          );
          const user = new User({ ...resData.data, _tokenExpDate });
          this.user.next(user);
          this.autoLogout(+resData.data.expiresIn * 1000);
          this.localStorage.saveDataToLocalStorage('user', user);
        })
      );
  }

  autoLogin() {
    const userData = this.localStorage.getDataFromLocalStorage('user');
    if (!userData) {
      return;
    }

    const _tokenExpDate = new Date(
      new Date().getTime() + +userData.expiresIn * 1000
    );

    const loddedUser = new User({ ...userData, _tokenExpDate });

    if (loddedUser.token) {
      this.user.next(loddedUser);
      const expTimeInMiliSec =
        new Date(userData._tokenExpDate).getTime() - new Date().getTime();
      this.autoLogout(+expTimeInMiliSec * 1000);
    }
  }

  autoLogout(expDuration: number) {
    console.log('Logged in till: ' + expDuration);
    this.tokenExpirationTime = setTimeout(() => {
      console.log('This is auto logout');
      this.logOut();
    }, +expDuration);
  }

  logOut() {
    console.log('Logout');
    this.user.next(null);
    this.router.navigate(['/signin']);
    this.localStorage.removeItem('user');
    // this.localStorage.clearAll();
    if (this.tokenExpirationTime) {
      clearTimeout(this.tokenExpirationTime);
      this.tokenExpirationTime = null;
    }
  }

  verifyNewUser(data: { reqId: string; token: string }) {
    console.log('verification request', data);
    return this.http
      .post<CommonResponse>(
        `${this.BaseUrl}${this.Version1}${this.VerifyNewUser}`,
        {
          reqId: data.reqId,
          token: data.token,
        }
      )
      .pipe(
        catchError((error) => {
          let erMsg = 'Unexpected error occurred!';
          if (!error.error || !error.error.error) {
            return throwError(erMsg);
          }
          erMsg = error.error.message || 'Unexpected error occurred!';
          return throwError(erMsg);
        })
      );
  }

  verifyResetPassword(data: { reqId: string; token: string }) {
    console.log('verification request', data);
    return this.http
      .post<CommonResponse>(
        `${this.BaseUrl}${this.Version1}${this.VerifyResetPassword}`,
        {
          reqId: data.reqId,
          token: data.token,
        }
      )
      .pipe(
        catchError((error) => {
          let erMsg = 'Unexpected error occurred!';
          if (!error.error || !error.error.error) {
            return throwError(erMsg);
          }
          erMsg = error.error.message || 'Unexpected error occurred!';
          return throwError(erMsg);
        })
      );
  }

  requestForgotPassword(data: { email: string }) {
    console.log('verification request', data);
    return this.http
      .post<CommonResponse>(
        `${this.BaseUrl}${this.Version1}${this.RequestForgotPassword}`,
        {
          email: data.email,
        }
      )
      .pipe(
        catchError((error) => {
          let erMsg = 'Unexpected error occurred!';
          if (!error.error || !error.error.error) {
            return throwError(erMsg);
          }
          erMsg = error.error.message || 'Unexpected error occurred!';
          return throwError(erMsg);
        })
      );
  }

  resetPassword(data: { password: string; reqId: string; token: string }) {
    console.log('verification request', data);
    return this.http
      .post<CommonResponse>(
        `${this.BaseUrl}${this.Version1}${this.ResetPassword}`,
        {
          password: data.password,
          reqId: data.reqId,
          token: data.token,
        }
      )
      .pipe(
        catchError((error) => {
          let erMsg = 'Unexpected error occurred!';
          if (!error.error || !error.error.error) {
            return throwError(erMsg);
          }
          erMsg = error.error.message || 'Unexpected error occurred!';
          return throwError(erMsg);
        })
      );
  }

  //post routes

  //user routes

  //event routes
}
