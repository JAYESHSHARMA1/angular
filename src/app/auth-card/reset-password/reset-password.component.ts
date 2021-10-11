import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  error: string;
  isLoading: boolean = false;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    const { password, cpassword } = form.value;
    console.log(form.value);

    if (password !== cpassword) {
      return (this.error =
        'New password and confirm new password should match.');
    }

    const reqIdAndToken = this.auth.getResetPasswordTokenAndReqId();
    this.isLoading = true;
    this.auth.resetPassword({ password, ...reqIdAndToken }).subscribe(
      (result) => {
        console.log(result, 'RES');
        form.reset();
        this.isLoading = false;
        this.auth.setInformationData({
          title: 'Successful',
          description: 'Password changed successfully. Please sign in.',
          isButtonVisible: true,
          buttonText: 'Goto Signin',
          href: '/signin',
          type: 'success',
        });
        this.router.navigate(['/info', 'reset-password-request-successful']);
      },
      (errMsg) => {
        form.reset();
        this.error = errMsg;
        console.log(errMsg, 'RES');
        form.reset();
        this.isLoading = false;
        this.auth.setInformationData({
          title: 'Failure',
          description: 'Unable to change password. Please contact admin.',
          isButtonVisible: true,
          buttonText: 'Goto Signin',
          href: '/signin',
          type: 'error',
        });
        this.router.navigate(['/info', 'reset-password-request-failure']);
      }
    );
  }
}
