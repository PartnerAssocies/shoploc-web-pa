import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GestionCommercantComponent } from './components/gestion-commercant/gestion-commercant.component';
import { HelloComponent } from './components/hello/hello.component';
import { LoginComponent } from './components/login/login.component';
import { ProfilComponent } from './components/profil/profil.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'hello', component: HelloComponent , canActivate: [AuthGuard], data: {expectedRole: 'NONE'}},
  { path: 'login', component: LoginComponent},
  { path: '', component: HelloComponent, canActivate: [AuthGuard], data: {expectedRole: 'ROLE_BOTH'}},
  { path: 'signup', component: SignupComponent },
  { path: 'profil', component: ProfilComponent, canActivate: [AuthGuard], data: {expectedRole: 'ROLE_BOTH'}},
  { path: 'gestionCommercant', component: GestionCommercantComponent, canActivate: [AuthGuard], data: {expectedRole: 'ROLE_ADMIN'}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
