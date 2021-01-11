import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GestionCommercantComponent } from './components/gestion-commercant/gestion-commercant.component';
import { HelloComponent } from './components/hello/hello.component';
import { LoginComponent } from './components/login/login.component';
import { ProfilComponent } from './components/profil/profil.component';
import { SignupComponent } from './components/signup/signup.component';
import { CommercantListComponent } from './components/commercant-list/commercant-list.component';
import { CommandeListComponent } from './components/commande-list/commande-list.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'hello', component: HelloComponent , canActivate: [AuthGuard], data: {expectedRole: 'NONE'}},
  { path: 'login', component: LoginComponent , canActivate: [AuthGuard], data: {expectedRole: 'NOT_LOGGED'}},
  { path: '', component: HelloComponent, canActivate: [AuthGuard], data: {expectedRole: 'ROLE_BOTH'}},
  { path: 'gestionCommercant', component: GestionCommercantComponent, canActivate: [AuthGuard], data: {expectedRole: 'ROLE_ADMIN'}},
  { path: 'signup', component: SignupComponent , canActivate: [AuthGuard], data: {expectedRole: 'NOT_LOGGED'} },
  { path: 'profil', component: ProfilComponent, canActivate: [AuthGuard], data: {expectedRole: 'ROLE_BOTH'}},
  { path: 'commercant-list', component:  CommercantListComponent, canActivate: [AuthGuard], data: {expectedRole: 'ROLE_CLIENT'}},
  { path: 'commande-list', component:  CommandeListComponent, canActivate: [AuthGuard], data: {expectedRole: 'ROLE_CLIENT'}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
