import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-request-verification',
  templateUrl: './request-verification.component.html',
  styleUrls: ['./request-verification.component.css'],
})
export class RequestVerificationComponent implements OnInit, AfterViewInit {
  data = {
    title: 'Verifying...',
    description: 'Please Wait! We are verifying your request...',
  };
  requestData: {
    reqId: string;
    token: string;
  };
  verificationType: string;

  constructor(
    private api: ApiService,
    private router: Router,
    private auth: AuthService,
    private route: ActivatedRoute
  ) {}
  //verify-reset-password
  //verify-email

  ngOnInit(): void {
    const reqId = this.route.snapshot.params['reqId'];
    const token = this.route.snapshot.params['token'];
    const verificationType = this.route.snapshot.params['verificationType'];
    this.requestData = {
      reqId,
      token,
    };
    this.verificationType = verificationType;
  }

  ngAfterViewInit() {
    if (this.verificationType === 'verify-email') {
      this.emailVerificationRequest();
    } else if (this.verificationType === 'verify-reset-password') {
      this.resetPasswordVerificationRequest();
    } else {
      this.router.navigate(['/404']);
    }
  }

  emailVerificationRequest() {
    this.auth.verifyNewUser(this.requestData).subscribe(
      (result) => {
        if (result.success === true) {
          console.log('Verified >', result);
          this.auth.setInformationData({
            title: 'Congratulations!',
            description: 'Your email is verified! Please signin.',
            isButtonVisible: true,
            buttonText: 'Goto sign in',
            href: '/signin',
            type: 'success',
          });
          this.router.navigate(['/info', 'user-email-verification-success']);
        }
      },
      (errMsg) => {
        errMsg;
        console.log('error >', errMsg);
        this.auth.setInformationData({
          title: 'Failure!',
          description:
            'Invalid request. Please contact admin if you have a valid verification link.',
          isButtonVisible: true,
          buttonText: 'I Undestand',
          href: '/signin',
          type: 'error',
        });
        this.router.navigate(['/info', 'invalid-request-for-verification']);
      }
    );
  }

  resetPasswordVerificationRequest() {
    console.log(this.requestData, '<<< ');
    this.auth.setResetPasswordTokenAndReqId(this.requestData);
    this.auth.verifyResetPassword(this.requestData).subscribe(
      (result) => {
        if (result.success === true) {
          console.log('Verified >', result);
          this.router.navigate(['/reset-password']);
        } else this.auth.clearResetPasswordTokenAndReqId();
      },
      (errMsg) => {
        errMsg;
        console.log('error >', errMsg);
        this.auth.clearResetPasswordTokenAndReqId();
        this.auth.setInformationData({
          title: 'Failure!',
          description:
            'Invalid request. Please contact admin if you have a valid reset password link.',
          isButtonVisible: true,
          buttonText: 'I Undestand',
          href: '/signin',
          type: 'error',
        });
        this.router.navigate(['/info', 'invalid-request-reset=password']);
      }
    );
  }
}
