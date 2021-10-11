import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent implements OnInit {
  error: string;
  isLoading: boolean = false;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    console.log(form.value);
    this.error = null;
    if (!form.value) {
      return;
    }
    this.isLoading = true;
    const { email } = form.value;
    this.auth.requestForgotPassword({ email }).subscribe(
      (result) => {
        console.log(result, 'RES');
        form.reset();
        this.isLoading = false;
        this.auth.setInformationData({
          title: 'Successful',
          description:
            'If we find any account related to the requested email, we will send you a reset password link. Please check your mail inbox.',
          isButtonVisible: true,
          buttonText: 'Got It',
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
          title: 'Successful',
          description:
            'If we find any account related to the requested email, we will send you a reset password link. Please check your mail inbox.',
          isButtonVisible: true,
          buttonText: 'Got It',
          href: '/signin',
          type: 'success',
        });
        this.router.navigate(['/info', 'reset-password-request-successful']);
      }
    );
  }
}
