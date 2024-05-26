import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './Components/navbar/navbar.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './Components/home/home.component';
import { RegisterComponent } from './Components/register/register.component';
import { MemberListComponent } from './Components/members/member-list/member-list.component';
import { MemberDetailComponent } from './Components/members/member-detail/member-detail.component';
import { ListsComponent } from './Components/lists/lists.component';
import { MessagesComponent } from './Components/messages/messages.component';
import { SharedModule } from './_modules/shared/shared.module';
import { ErrorsComponent } from './Components/errors/errors.component';
import { ErrorInterceptor } from './_interceptor/error.interceptor';
import { NotFoundComponent } from './Components/errors/not-found/not-found.component';
import { ServerErrorComponent } from './Components/errors/server-error/server-error.component';
import { MemberCardComponent } from './Components/members/member-card/member-card.component';
import { jwtInterceptorInterceptor } from './_interceptor/jwt.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    RegisterComponent,
    MemberListComponent,
    MemberDetailComponent,
    ListsComponent,
    MessagesComponent,
    ErrorsComponent,
    NotFoundComponent,
    ServerErrorComponent,
    MemberCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    SharedModule, //shared module
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: jwtInterceptorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
