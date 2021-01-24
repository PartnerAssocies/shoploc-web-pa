// Import Services
import { AuthService }  from './services/auth.service';
import { HashService } from './services/hash.service';
import { HelloService } from './services/hello.service';
import { UserService } from './services/user.service';
import { LieuService } from './services/lieu.service';
import { ProduitService} from './services/produit.service';
import { CommandeService } from './services/commande.service';

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

// Import Module
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule,  HTTP_INTERCEPTORS } from '@angular/common/http';
import {MatButtonModule} from '@angular/material/button'; 
import {MatIconModule} from '@angular/material/icon'; 
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
import { NgModule } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import { CommonModule } from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'; 

// Import Autres
import { environment } from '../environments/environment';
import { JwtInterceptor } from './helpers/jwt-interceptor.interceptor';
import {DatePipe} from '@angular/common';
import { EcranPaiementCommandeComponent } from './components/ecran-paiement-commande/ecran-paiement-commande.component';



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
    EcranPaiementCommandeComponent
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
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    CommonModule
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
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
