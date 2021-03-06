// Import Services
import { AuthService } from './services/auth.service';
import { HashService } from './services/hash.service';
import { HelloService } from './services/hello.service';
import { UserService } from './services/user.service';
import { LieuService } from './services/lieu.service';
import { ProduitService } from './services/produit.service';
import { CommandeService } from './services/commande.service';
import { PorteMonnaieService } from './services/porteMonnaie.service';

// Import Component
import { AppComponent } from './app.component';
import { ClientSignUpComponent } from './components/client-sign-up/client-sign-up.component';
import { HelloComponent } from './components/hello/hello.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProfilComponent } from './components/profil/profil.component';
import { CommercantSignUpComponent } from './components/commercant-sign-up/commercant-sign-up.component';
import { GestionCommercantComponent } from './components/gestion-commercant/gestion-commercant.component';
import { DemandeCommercantComponent } from './components/demande-commercant/demande-commercant.component';
import { CommercantListComponent } from './components/commercant-list/commercant-list.component';
import { CommercantListElementComponent } from './components/commercant-list-element/commercant-list-element.component';
import { ProduitCommercantComponent } from './components/produit-commercant/produit-commercant.component';
import { SingleProduitCommercantComponent } from './components/single-produit-commercant/single-produit-commercant.component';
import { AjoutProduitCommercantComponent } from './components/ajout-produit-commercant/ajout-produit-commercant.component';
import { CommandeListComponent } from './components/commande-list/commande-list.component';
import { CommandeListElementComponent } from './components/commande-list-element/commande-list-element.component';
import { CreationCommandeClientComponent } from './components/creation-commande-client/creation-commande-client.component';
import { CreationCommandeClientProduitElementComponent } from './components/creation-commande-client-produit-element/creation-commande-client-produit-element.component';
import { EcranPaiementCommandeComponent } from './components/ecran-paiement-commande/ecran-paiement-commande.component';
import { ClientPortemonnaieComponent } from './components/client-portemonnaie/client-portemonnaie.component';
import { CommercantHomeComponent } from './components/commercant-home/commercant-home.component';
import { CommercantDetailCommandeComponent } from './components/commercant-detail-commande/commercant-detail-commande.component';
import { CommercantCommandeListElementComponent } from './components/commercant-commande-list-element/commercant-commande-list-element.component';
import { CarteUserComponent } from './components/carte-user/carte-user.component';
import { LecteurCodeClientComponent } from './components/lecteur-code-client/lecteur-code-client.component';
import { QrcodeCommandeComponent } from './components/qrcode-commande/qrcode-commande.component';
import { CommercantAchatMagasinComponent } from './components/commercant-achat-magasin/commercant-achat-magasin.component';
import { LecteurCodeCommercantComponent } from './components/lecteur-code-commercant/lecteur-code-commercant.component';
import { StatutVfpComponent } from './components/statut-vfp/statut-vfp.component';
import { ActivationBonusVfpComponent } from './components/activation-bonus-vfp/activation-bonus-vfp.component';
import { ParkingBonusComponent } from './components/bonus-vfp/parking-bonus/parking-bonus.component';
import { ClientMapComponent } from './components/client-map/client-map.component';
import { ClientMapEcranComponent } from './components/client-map-ecran/client-map-ecran.component';
import { ClientTrajetComponent } from './components/client-trajet/client-trajet.component';


// Import Module
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { NgModule } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { QRCodeModule } from 'angularx-qrcode'; //generation des qr code 
import { ZXingScannerModule } from '@zxing/ngx-scanner'; //lecture des qrcode

// Import Autres
import { environment } from '../environments/environment';
import { JwtInterceptor } from './helpers/jwt-interceptor.interceptor';
import { ClientStatsComponent } from './components/client-stats/client-stats.component';

//PRIMENG
import {AccordionModule} from 'primeng/accordion';
import {TableModule} from 'primeng/table';
import { CommercantStatsComponent } from './components/commercant-stats/commercant-stats.component';
import { AssocommerceStatsComponent } from './components/assocommerce-stats/assocommerce-stats.component';
import { MairieStatsComponent } from './components/mairie-stats/mairie-stats.component';
import { DatePipe } from '@angular/common';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';

import { NgApexchartsModule } from 'ng-apexcharts';


@NgModule({
  declarations: [
    AppComponent,
    HelloComponent,
    LoginComponent,
    NavbarComponent,
    SignupComponent,
    ClientSignUpComponent,
    CommercantSignUpComponent,
    ProfilComponent,
    GestionCommercantComponent,
    DemandeCommercantComponent,
    CommercantListComponent,
    CommercantListElementComponent,
    CommandeListComponent,
    CommandeListElementComponent,
    CreationCommandeClientComponent,
    ProduitCommercantComponent,
    SingleProduitCommercantComponent,
    AjoutProduitCommercantComponent,
    CreationCommandeClientProduitElementComponent,
    ProduitCommercantComponent,
    SingleProduitCommercantComponent,
    AjoutProduitCommercantComponent,
    EcranPaiementCommandeComponent,
    ClientPortemonnaieComponent,
    CommercantHomeComponent,
    CarteUserComponent,
    LecteurCodeClientComponent,
    QrcodeCommandeComponent,
    CommercantDetailCommandeComponent,
    CommercantCommandeListElementComponent,
    ClientStatsComponent,
    CommercantStatsComponent,
    AssocommerceStatsComponent,
    MairieStatsComponent,
    CommercantAchatMagasinComponent,
    LecteurCodeCommercantComponent,
    StatutVfpComponent,
    ActivationBonusVfpComponent,
    ParkingBonusComponent,
    ClientMapComponent,
    ClientMapEcranComponent,
    ClientTrajetComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatDividerModule,
    MatListModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    QRCodeModule,
    ZXingScannerModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    CommonModule,
    AccordionModule,
    TableModule,
    ButtonModule,
    CardModule,
    NgApexchartsModule,
    
  ],
  providers: [
    HelloService,
    AuthService,
    UserService,
    LieuService,
    HashService,
    CommandeService,
    DatePipe,
    ProduitService,
    PorteMonnaieService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
