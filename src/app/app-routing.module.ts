import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivateFn } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { MemberListComponent } from './Components/members/member-list/member-list.component';
import { MemberDetailComponent } from './Components/members/member-detail/member-detail.component';
import { ListsComponent } from './Components/lists/lists.component';
import { MessagesComponent } from './Components/messages/messages.component';
import { authGuard } from './_guards/auth.guard';
import { ErrorsComponent } from './Components/errors/errors.component';
import { NotFoundComponent } from './Components/errors/not-found/not-found.component';
import { ServerErrorComponent } from './Components/errors/server-error/server-error.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [authGuard],
    children: [
      { path: 'members', component: MemberListComponent },
      { path: 'members/:username', component: MemberDetailComponent },
      { path: 'lists', component: ListsComponent },
      { path: 'messages', component: MessagesComponent },
    ],
  },

  { path: 'errors', component: ErrorsComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'server-error', component: ServerErrorComponent },
  { path: '**', component: NotFoundComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
