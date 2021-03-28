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
import { CommercantHomeComponent } from './components/commercant-home/commercant-home.component';
import { CarteUserComponent } from './components/carte-user/carte-user.component';
import { LecteurCodeClientComponent } from './components/lecteur-code-client/lecteur-code-client.component';
import { QrcodeCommandeComponent } from './components/qrcode-commande/qrcode-commande.component';
import { CommercantDetailCommandeComponent } from './components/commercant-detail-commande/commercant-detail-commande.component';
import { CommercantAchatMagasinComponent } from './components/commercant-achat-magasin/commercant-achat-magasin.component';
import { LecteurCodeCommercantComponent } from './components/lecteur-code-commercant/lecteur-code-commercant.component';
import { StatutVfpComponent } from './components/statut-vfp/statut-vfp.component';
import { ActivationBonusVfpComponent } from './components/activation-bonus-vfp/activation-bonus-vfp.component';
import { ParkingBonusComponent } from './components/bonus-vfp/parking-bonus/parking-bonus.component';
import { ClientMapEcranComponent } from './components/client-map-ecran/client-map-ecran.component';
import { ClientStatsComponent } from './components/client-stats/client-stats.component';
import { CommercantStatsComponent } from './components/commercant-stats/commercant-stats.component';
import { AssocommerceStatsComponent } from './components/assocommerce-stats/assocommerce-stats.component';
import { MairieStatsComponent } from './components/mairie-stats/mairie-stats.component';
import { ClientTrajetComponent } from './components/client-trajet/client-trajet.component';

const routes: Routes = [
  { path: 'hello', component: HelloComponent, canActivate: [AuthGuard], data: { expectedRole: 'NONE' } },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard], data: { expectedRole: 'NOT_LOGGED' } },
  { path: '', component: HelloComponent, canActivate: [AuthGuard], data: { expectedRole: 'ROLE_BOTH' } },
  { path: 'gestionCommercant', component: GestionCommercantComponent, canActivate: [AuthGuard], data: { expectedRole: 'ROLE_ADMIN' } },
  { path: 'signup', component: SignupComponent, canActivate: [AuthGuard], data: { expectedRole: 'NOT_LOGGED' } },
  { path: 'profil', component: ProfilComponent, canActivate: [AuthGuard], data: { expectedRole: 'ROLE_BOTH' } },
  { path: 'commercant-list', component: CommercantListComponent, canActivate: [AuthGuard], data: { expectedRole: 'ROLE_CLIENT' } },
  { path: 'commande-list', component: CommandeListComponent, canActivate: [AuthGuard], data: { expectedRole: 'ROLE_CLIENT' } },
  { path: 'creation-commande-client', component: CreationCommandeClientComponent, canActivate: [AuthGuard], data: { expectedRole: 'ROLE_BOTH' } },
  { path: 'commercant-produit', component: ProduitCommercantComponent, canActivate: [AuthGuard], data: { expectedRole: 'ROLE_COMMERCANT' } },
  { path: 'add-commercant-produit', component: AjoutProduitCommercantComponent, canActivate: [AuthGuard], data: { expectedRole: 'ROLE_COMMERCANT' } },
  { path: 'paiement-commande-client', component: EcranPaiementCommandeComponent, canActivate: [AuthGuard], data: { expectedRole: 'ROLE_BOTH' } },
  { path: 'commercant-home', component: CommercantHomeComponent, canActivate: [AuthGuard], data: { expectedRole: 'ROLE_COMMERCANT' } },
  { path: 'ma-carte', component: CarteUserComponent, canActivate: [AuthGuard], data: { expectedRole: 'ROLE_CLIENT' } },
  { path: 'lecteur-carte', component: LecteurCodeClientComponent, canActivate: [AuthGuard], data: { expectedRole: 'ROLE_COMMERCANT' } },
  { path: 'qrcode-commande', component: QrcodeCommandeComponent, canActivate: [AuthGuard], data: { expectedRole: 'ROLE_CLIENT' } },
  { path: 'detail-commande-commercant', component: CommercantDetailCommandeComponent, canActivate: [AuthGuard], data: { expectedRole: 'ROLE_COMMERCANT' } },
  { path: 'client-portemonnaie', component: ClientPortemonnaieComponent, canActivate: [AuthGuard], data: { expectedRole: 'ROLE_CLIENT' } },
  { path: 'commercant-achat-magasin', component: CommercantAchatMagasinComponent, canActivate: [AuthGuard], data: { expectedRole: 'ROLE_COMMERCANT' } },
  { path: 'lecteur-carte-commercant', component: LecteurCodeCommercantComponent, canActivate: [AuthGuard], data: { expectedRole: 'ROLE_COMMERCANT' } },
  { path: 'statut-vfp', component: StatutVfpComponent, canActivate: [AuthGuard], data: { expectedRole: 'ROLE_CLIENT' } },
  { path: 'bonus-vfp', component: ActivationBonusVfpComponent, canActivate: [AuthGuard], data: { expectedRole: 'ROLE_CLIENT' } },
  { path: 'bonus-vfp/parking', component: ParkingBonusComponent, canActivate: [AuthGuard], data: { expectedRole: 'ROLE_CLIENT' } },
  { path: 'map', component: ClientMapEcranComponent, canActivate: [AuthGuard], data: { expectedRole: 'ROLE_CLIENT' } },
  { path: 'client-stats', component: ClientStatsComponent, canActivate: [AuthGuard], data: {expectedRole: 'ROLE_CLIENT'}},
  { path: 'commercant-stats', component: CommercantStatsComponent, canActivate: [AuthGuard], data: {expectedRole: 'ROLE_COMMERCANT'}},
  { path: 'asso-commercant-stats', component: AssocommerceStatsComponent, canActivate: [AuthGuard], data: {expectedRole: 'ROLE_COMMERCANT'}},
  { path: 'mairie-stats', component: MairieStatsComponent, canActivate: [AuthGuard], data: {expectedRole: 'ROLE_ADMIN'}},
  { path: 'trajet-commercant', component: ClientTrajetComponent, canActivate: [AuthGuard], data: {expectedRole: 'ROLE_CLIENT'}}

];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
