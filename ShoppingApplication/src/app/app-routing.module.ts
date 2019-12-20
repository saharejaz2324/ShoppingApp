import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './Components/Value/home/home.component';
import { MemberListComponent } from '../app/members/member-list/member-list.component';
import { ListsComponent } from './Components/Value/lists/lists.component';
import { MessagesComponent } from './Components/Value/messages/messages.component';
import { AuthGuard } from './Guards/auth.guard';
import { MemberDetailComponent } from './members/member-list/member-detail/member-detail.component';
import { MemberDetailresolver } from './resolver/member-detail.resolver';
import { MemberListResolver } from './resolver/member-list.resolver';
import { MemberEditComponent } from './members/member-list/member-edit/member-edit.component';
import { MemberEditResolver } from './resolver/member-edit.resolver';
import { PreventUnsavedChanges } from './Guards/prevent-unsaved-changes.guard';
import { ListsResolver } from './resolver/lists.resolver';
import { MessagesResolver } from './resolver/messages.resolver';


const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'lists',
        component: ListsComponent,
        resolve: {users: ListsResolver}
      },
      {
        path: 'messages',
        component: MessagesComponent,
        resolve: {messages: MessagesResolver}
      },
      {
        path: 'members',
        component: MemberListComponent,
        resolve: {users: MemberListResolver }
      },
      {
        path: 'members/:id',
        component: MemberDetailComponent,
        resolve: {user: MemberDetailresolver}
      },
      {
        path: 'member/edit',
        component: MemberEditComponent,
        resolve: {user: MemberEditResolver},
        canDeactivate: [PreventUnsavedChanges]
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
