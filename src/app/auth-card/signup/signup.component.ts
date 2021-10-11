import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  isLoading: boolean = false;
  error: string = null;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    this.error = null;
    if (!form.value) {
      return;
    }
    this.isLoading = true;
    const { fullName, email, userName, password } = form.value;
    this.auth.signUp({ fullName, email, userName, password }).subscribe(
      (result) => {
        console.log(result, 'RES');
        form.reset();
        this.isLoading = false;
        if (result.success === true) {
          this.auth.setInformationData({
            title: 'Congratulations!',
            description:
              'Please verify your account! Check you inbox for further information.',
            isButtonVisible: true,
            buttonText: 'Goto sign in',
            href: '/signin',
            type: 'success',
          });
          this.router.navigate(['/info', 'user-register-success']);
        }
      },
      (errMsg) => {
        form.reset();
        this.error = errMsg;
        this.isLoading = false;
      }
    );
  }
}
