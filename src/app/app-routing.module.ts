import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './adminModule/admin-login/admin-login.component';
import { UserLoginComponent } from './userModule/user-login/user-login.component';
import { AddNewcardComponent } from './userModule/add-newcard/add-newcard.component';
import { UpdateCardLabelComponent } from './adminModule/update-card-label/update-card-label.component';

const routes: Routes = [
  // { path: 'admin-login', component: AdminLoginComponent },
  { path: 'user-login', component: UserLoginComponent },
  { path: 'add-new-card', component: AddNewcardComponent },
  { path: 'update-card-label', component: UpdateCardLabelComponent },
  { path: '', redirectTo: '/user-login', pathMatch: 'full' },
  {
    path: 'admin-login',
    component: AdminLoginComponent,
    data: {
      title: 'Login Page'
    }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
