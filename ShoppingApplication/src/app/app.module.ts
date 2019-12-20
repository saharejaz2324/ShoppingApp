import { BrowserModule, HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { JwtModule } from '@auth0/angular-jwt';

import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { NavComponent } from './Components/Value/nav/nav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './Services/auth.service';
import { HomeComponent } from './Components/Value/home/home.component';
import { RegisterComponent } from './Components/Value/register/register.component';
import { ErrorInterceptorProvider } from './Services/error.interceptor';
import { BsDropdownModule, TabsModule, BsDatepickerModule, PaginationModule, ButtonsModule } from 'ngx-bootstrap';
import { ListsComponent } from './Components/Value/lists/lists.component';
import { MemberListComponent } from '../app/members/member-list/member-list.component';
import { MessagesComponent } from './Components/Value/messages/messages.component';
import { MemberCardComponent } from '../app/members/member-list/member-card/member-card.component';
import { MemberDetailComponent } from './members/member-list/member-detail/member-detail.component';
import { MemberDetailresolver } from './resolver/member-detail.resolver';
import { MemberListResolver } from './resolver/member-list.resolver';
import { MemberEditResolver } from './resolver/member-edit.resolver';
import { NgxGalleryModule } from 'ngx-gallery';
import { MemberEditComponent } from './members/member-list/member-edit/member-edit.component';
import { PreventUnsavedChanges } from './Guards/prevent-unsaved-changes.guard';
import { PhotoEditorComponent } from './members/member-list/Photo-editor/Photo-editor.component';
import { FileUploadModule } from 'ng2-file-upload';
import {TimeAgoPipe} from 'time-ago-pipe';
import { ListsResolver } from './resolver/lists.resolver';
import { MessagesResolver } from './resolver/messages.resolver';
import { MemberMessagesComponent } from './members/member-list/member-messages/member-messages.component';


export function tokenGetter() {
  return localStorage.getItem('token');
}

export class CustomHammerConfig extends HammerGestureConfig  {
  overrides = {
      pinch: { enable: false },
      rotate: { enable: false }
  };
}

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    ListsComponent,
    MemberListComponent,
    MessagesComponent,
    MemberCardComponent,
    MemberDetailComponent,
    MemberMessagesComponent,
    MemberEditComponent,
    PhotoEditorComponent,
    TimeAgoPipe

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
   HttpClientModule,
   NgxGalleryModule,
   ReactiveFormsModule,
   PaginationModule.forRoot(),
   FileUploadModule,
   FormsModule,
   ButtonsModule.forRoot(),
   BrowserAnimationsModule,
   BsDatepickerModule.forRoot(),
   TabsModule.forRoot(),
   BsDropdownModule.forRoot(),
   JwtModule.forRoot({
     config: {
       tokenGetter: tokenGetter,
       whitelistedDomains: ['localhost:44354'],
       blacklistedRoutes: ['localhost:44354/api/auth']
     }
   })
  ],
  providers: [
    AuthService,
    ErrorInterceptorProvider,
    PreventUnsavedChanges,
    MemberEditResolver,
    MemberDetailresolver,
    MessagesResolver,
    MemberEditResolver,
    MemberListResolver,
    ListsResolver,
    { provide: HAMMER_GESTURE_CONFIG, useClass: CustomHammerConfig }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
