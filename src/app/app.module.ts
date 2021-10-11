import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthCardComponent } from './auth-card/auth-card.component';
import { LoginComponent } from './auth-card/login/login.component';
import { SignupComponent } from './auth-card/signup/signup.component';
import { ForgotPasswordComponent } from './auth-card/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './auth-card/reset-password/reset-password.component';
import { InfoCardComponent } from './auth-card/info-card/info-card.component';
import { MainPanelComponent } from './main-panel/main-panel.component';
import { HeaderComponent } from './shared/header/header.component';
import { LeftSideBarComponent } from './main-panel/left-side-bar/left-side-bar.component';
import { RightSideBarComponent } from './main-panel/right-side-bar/right-side-bar.component';
import { MainContainerComponent } from './main-panel/main-container/main-container.component';
import { StoriesComponent } from './main-panel/main-container/stories/stories.component';
import { PostsComponent } from './main-panel/main-container/posts/posts.component';
import { StoryIconComponent } from './main-panel/main-container/stories/story-icon/story-icon.component';
import { PostComponent } from './main-panel/main-container/posts/post/post.component';

import { IconsModule } from './shared/icons/icons.module';
import { BrandNameComponent } from './shared/brand-name/brand-name.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { FormsModule } from '@angular/forms';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { AuthInterceptorService } from './interceptor/auth-intercepter.service';
import { RequestVerificationComponent } from './auth-card/request-verification/request-verification.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthCardComponent,
    LoginComponent,
    SignupComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    InfoCardComponent,
    MainPanelComponent,
    HeaderComponent,
    LeftSideBarComponent,
    RightSideBarComponent,
    MainContainerComponent,
    StoriesComponent,
    PostsComponent,
    StoryIconComponent,
    PostComponent,
    BrandNameComponent,
    NotFoundComponent,
    LoadingSpinnerComponent,
    RequestVerificationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IconsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    IconsModule,
    HttpClientModule,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
