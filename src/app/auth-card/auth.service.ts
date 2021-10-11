import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../models/User';
import { ApiService } from '../services/api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // info card details
  information: {
    title: string;
    description: string;
    isButtonVisible: boolean;
    buttonText: string;
    type: string; // success,error,warning
  } = null;

  // reset password details
  resetPassData: {
    reqId: string;
    token: string;
  };

  constructor(private api: ApiService) {}

  // info card functions

  setInformationData(data) {
    this.information = data;
  }

  getInformationData() {
    return this.information;
  }

  // reset password functions

  setResetPasswordTokenAndReqId(data: { reqId: string; token: string }) {
    this.resetPassData = data;
  }

  getResetPasswordTokenAndReqId() {
    return this.resetPassData;
  }

  clearResetPasswordTokenAndReqId() {
    this.resetPassData = null;
  }

  // API calls

  signUp(data) {
    return this.api.signUp(data);
  }

  signIn(data) {
    return this.api.signIn(data);
  }

  verifyNewUser(data: { reqId: string; token: string }) {
    return this.api.verifyNewUser(data);
  }

  verifyResetPassword(data: { reqId: string; token: string }) {
    return this.api.verifyResetPassword(data);
  }

  requestForgotPassword(data: { email: string }) {
    return this.api.requestForgotPassword(data);
  }

  resetPassword(data: { password: string; reqId: string; token: string }) {
    return this.api.resetPassword(data);
  }
}
