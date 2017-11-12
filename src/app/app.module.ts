import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PostService } from './post.service';
import { HttpModule } from '@angular/http';
import { LoginComponent } from './login/login.component';
import {Angular2FontawesomeModule} from "angular2-fontawesome";
import {RouterModule} from "@angular/router";
import {CurrentUserService} from "./current-user.service";
import { HomeComponent } from './home/home.component';
import {HashLocationStrategy, LocationStrategy} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {JwtModule} from "./jwt/jwt.module";


const ROUTES = [
  {
    path: "",
   component: HomeComponent
  },
  {
    path: "login",
    component: LoginComponent,
  }
];



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(ROUTES),
    FormsModule,
    JwtModule,
    Angular2FontawesomeModule
  ],
  providers: [PostService, CurrentUserService,  {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
