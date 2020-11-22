import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HelloComponent } from './components/hello/hello.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { SignupComponent } from './components/signup/signup.component';

const routes: Routes = [
  { path: 'hello', component: HelloComponent , canActivate: [AuthGuard], data: {expectedRole: 'NONE'}},
  { path: 'login', component: LoginComponent},
  { path: '', component: HelloComponent},
  { path: 'signup', component: SignupComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
