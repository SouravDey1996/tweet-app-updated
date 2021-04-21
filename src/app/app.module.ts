import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TweetsComponent } from './tweets/tweets.component';
import { UsersComponent } from './users/users.component';
import { ForgetPassPopupComponent } from './login/forget-pass-popup/forget-pass-popup.component';
import {MatDialogModule} from '@angular/material/dialog'
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HashtagMentionColLibModule } from 'hashtag-mention-colorizer';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule} from '@angular/common/http';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TimeagoModule } from 'ngx-timeago';


// import { MentionModule } from 'angular-mentions';

@NgModule({
  declarations: [						
    AppComponent,
   NavComponent, HomeComponent, LoginComponent, RegisterComponent, TweetsComponent, UsersComponent, 
   ForgetPassPopupComponent,
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    HashtagMentionColLibModule,
    ToastrModule.forRoot(),
    BsDropdownModule.forRoot(),
    HttpClientModule,
    TimeagoModule.forRoot(),
    HashtagMentionColLibModule
    
  ],
  exports: [
    HashtagMentionColLibModule,
    TimeagoModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
