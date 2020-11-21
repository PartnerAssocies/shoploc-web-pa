// Import Services
import { AuthService }  from './services/auth.service';
import { HashService } from './services/hash.service';
import { HelloService } from './services/hello.service';

// Import Component
import { AppComponent } from './app.component';
import { HelloComponent } from './components/hello/hello.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SignupComponent } from './components/signup/signup.component';

// Import Module
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import {MatButtonModule} from '@angular/material/button'; 
import {MatIconModule} from '@angular/material/icon'; 
import {MatToolbarModule} from '@angular/material/toolbar'
import { NgModule } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';

// Import Autres
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    HelloComponent,
    LoginComponent,
    NavbarComponent,
    SignupComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    HelloService,
    AuthService,
    HashService,  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
