import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthCardComponent } from './auth-card/auth-card.component';
import { ForgotPasswordComponent } from './auth-card/forgot-password/forgot-password.component';
import { InfoCardComponent } from './auth-card/info-card/info-card.component';
import { LoginComponent } from './auth-card/login/login.component';
import { RequestVerificationComponent } from './auth-card/request-verification/request-verification.component';
import { ResetPasswordComponent } from './auth-card/reset-password/reset-password.component';
import { SignupComponent } from './auth-card/signup/signup.component';
import { AuthGaurdGuard } from './gaurds/auth-gaurd.guard';
import { MainPanelComponent } from './main-panel/main-panel.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';

const routes: Routes = [
  { path: '', canActivate: [AuthGaurdGuard], component: MainPanelComponent },
  {
    path: '',
    component: AuthCardComponent,
    children: [
      { path: 'signin', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },
      { path: 'reset-password', component: ResetPasswordComponent },
      { path: 'info/:infoType', component: InfoCardComponent },
      {
        path: ':verificationType/:reqId/:token',
        component: RequestVerificationComponent,
      },
    ],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
