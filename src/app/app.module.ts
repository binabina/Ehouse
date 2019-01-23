import {BrowserModule, Title} from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {GoogleChartsModule} from 'angular-google-charts';
import {ToastaModule} from 'ngx-toasta';
import { AppComponent } from './app.component';
import { AppareilsComponent } from './appareils/appareils.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AppareilFormComponent } from './appareils/appareil-form/appareil-form.component';
import { SingleAppareilComponent } from './appareils/single-appareil/single-appareil.component';
import { HeaderComponent } from './header/header.component';

import {AppareilsService} from './services/appareils.service';
import {AuthService} from './services/auth.service';
import {AuthGuardService} from './services/auth-guard.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';
import { AppareilUpdateComponent } from './appareils/appareil-update/appareil-update.component';
import { StateAppareilComponent } from './appareils/state-appareil/state-appareil.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { UserParamComponent } from './auth/user-param/user-param.component';
import {DatePipe} from '@angular/common';
import {FilterPipeService} from './services/filter-pipe.service';
import {NgxPaginationModule} from 'ngx-pagination';

const appRoutes: Routes= [
  {path:'auth/signup', component: SignupComponent},
  {path:'auth/signin', component: SigninComponent},
  {path:'auth/reset-password', component: ResetPasswordComponent},
  {path:'user', canActivate: [AuthGuardService], component: UserParamComponent},
  {path:'appareils', canActivate: [AuthGuardService], component: AppareilsComponent},
  {path:'appareils/new', canActivate: [AuthGuardService], component: AppareilFormComponent},
  {path:'appareils/state', canActivate: [AuthGuardService], component: StateAppareilComponent},
  {path:'appareils/view/:id', canActivate: [AuthGuardService],component: SingleAppareilComponent},
  {path:'appareils/update/:id', canActivate: [AuthGuardService],component: AppareilUpdateComponent},
  {path:'', redirectTo:'appareils', pathMatch:'full'},
  {path:'**', redirectTo:'appareils'}
];

@NgModule({
  declarations: [
    AppComponent,
    AppareilsComponent,
    SigninComponent,
    SignupComponent,
    AppareilFormComponent,
    SingleAppareilComponent,
    HeaderComponent,
    AppareilUpdateComponent,
    StateAppareilComponent,
    ResetPasswordComponent,
    UserParamComponent,
    FilterPipeService
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    GoogleChartsModule.forRoot('AIzaSyCsUSIFvJHJTPf_8d1jgtHgtRPtNUZfLus'),
    ToastaModule.forRoot(),
    NgxPaginationModule
  ],
  providers: [AppareilsService, AuthService, AuthGuardService, DatePipe, Title, FilterPipeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
