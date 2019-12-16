import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './Components/Value/home/home.component';
import { MemberListComponent } from './Components/Value/member-list/member-list.component';
import { ListsComponent } from './Components/Value/lists/lists.component';
import { MessagesComponent } from './Components/Value/messages/messages.component';
import { AuthGuard } from './Guards/auth.guard';


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
      },
      {
        path: 'messages',
        component: MessagesComponent
      },
      {
        path: 'members',
        component: MemberListComponent,
      },
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
