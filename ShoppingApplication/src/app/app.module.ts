import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { NavComponent } from './Components/Value/nav/nav.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from './Services/auth.service';
import { HomeComponent } from './Components/Value/home/home.component';
import { RegisterComponent } from './Components/Value/register/register.component';
import { ErrorInterceptorProvider } from './Services/error.interceptor';
import { BsDropdownModule } from 'ngx-bootstrap';
import { ListsComponent } from './Components/Value/lists/lists.component';
import { MemberListComponent } from './Components/Value/member-list/member-list.component';
import { MessagesComponent } from './Components/Value/messages/messages.component';



@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    ListsComponent,
    MemberListComponent,
    MessagesComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
   HttpClientModule,
   FormsModule,
   BsDropdownModule.forRoot()
  ],
  providers: [
    AuthService,
    ErrorInterceptorProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
