import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GestionCommercantComponent } from './components/gestion-commercant/gestion-commercant.component';
import { HelloComponent } from './components/hello/hello.component';
import { LoginComponent } from './components/login/login.component';
import { ProfilComponent } from './components/profil/profil.component';
import { SignupComponent } from './components/signup/signup.component';
import { CommercantListComponent } from './components/commercant-list/commercant-list.component';
import { CommandeListComponent } from './components/commande-list/commande-list.component';
import { CreationCommandeClientComponent } from './components/creation-commande-client/creation-commande-client.component';
import { AuthGuard } from './guards/auth.guard';
import { ProduitCommercantComponent } from './components/produit-commercant/produit-commercant.component';
import { AjoutProduitCommercantComponent } from './components/ajout-produit-commercant/ajout-produit-commercant.component';
import { EcranPaiementCommandeComponent } from './components/ecran-paiement-commande/ecran-paiement-commande.component';
import { ClientPortemonnaieComponent } from './components/client-portemonnaie/client-portemonnaie.component';

const routes: Routes = [
  { path: 'hello', component: HelloComponent , canActivate: [AuthGuard], data: {expectedRole: 'NONE'}},
  { path: 'login', component: LoginComponent , canActivate: [AuthGuard], data: {expectedRole: 'NOT_LOGGED'}},
  { path: '', component: HelloComponent, canActivate: [AuthGuard], data: {expectedRole: 'ROLE_BOTH'}},
  { path: 'gestionCommercant', component: GestionCommercantComponent, canActivate: [AuthGuard], data: {expectedRole: 'ROLE_ADMIN'}},
  { path: 'signup', component: SignupComponent , canActivate: [AuthGuard], data: {expectedRole: 'NOT_LOGGED'} },
  { path: 'profil', component: ProfilComponent, canActivate: [AuthGuard], data: {expectedRole: 'ROLE_BOTH'}},
  { path: 'commercant-list', component:  CommercantListComponent, canActivate: [AuthGuard], data: {expectedRole: 'ROLE_CLIENT'}},
  { path: 'commande-list', component:  CommandeListComponent, canActivate: [AuthGuard], data: {expectedRole: 'ROLE_CLIENT'}},
  { path: 'creation-commande-client', component:  CreationCommandeClientComponent, canActivate: [AuthGuard], data: {expectedRole: 'ROLE_CLIENT'}},
  { path: 'commercant-produit', component: ProduitCommercantComponent, canActivate: [AuthGuard], data: {expectedRole: 'ROLE_COMMERCANT'}},
  { path: 'add-commercant-produit', component: AjoutProduitCommercantComponent, canActivate: [AuthGuard], data: {expectedRole: 'ROLE_COMMERCANT'}},
  { path: 'paiement-commande-client', component:  EcranPaiementCommandeComponent, canActivate: [AuthGuard], data: {expectedRole: 'ROLE_CLIENT'}},
  { path: 'client-portemonnaie', component:  ClientPortemonnaieComponent, canActivate: [AuthGuard], data: {expectedRole: 'ROLE_CLIENT'}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
