import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SignInResponseData } from 'src/app/services/interfaces/signin-response.interface';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
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
    let authObs: Observable<SignInResponseData>;
    const { email, password } = form.value;
    authObs = this.auth.signIn({ email, password });
    authObs.subscribe(
      (result) => {
        form.reset();
        this.isLoading = false;
        if (result.success === true) {
          console.log('User logged in >', result);
          this.router.navigate(['/']);
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
