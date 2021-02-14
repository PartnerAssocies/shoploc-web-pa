import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CurrentUser } from 'src/app/models/CurrentUser.model';
import { AuthService } from 'src/app/services/auth.service';
import { PorteMonnaieService } from 'src/app/services/porteMonnaie.service';

@Component({
  selector: 'app-client-portemonnaie',
  templateUrl: './client-portemonnaie.component.html',
  styleUrls: ['./client-portemonnaie.component.scss']
})
export class ClientPortemonnaieComponent implements OnInit {

  showModal : boolean;
  active : boolean;
  username : string;
  soldeClient : number;
  addMoneyForm: FormGroup;
  montantValide : boolean;
  public currentUser : CurrentUser;

  constructor(private porteMonnaieService : PorteMonnaieService,
              private authService : AuthService,
              private formBuilder: FormBuilder,
              private _location : Location) { }

  ngOnInit(): void {
    this.showModal = false;
    this.active = false;
    this.montantValide = true;
    this.initForm();
    this.username = this.authService.currentUserValue.username;
    this.porteMonnaieService.getSoldeClient(this.username).subscribe(res => {
      let solde = res;
      this.soldeClient = solde['solde'];
    });
  }

  openModal(){
    this.showModal = true;
    this.active = true;  
  }

  initForm(){
    this.addMoneyForm = this.formBuilder.group({
      montant : ['', [Validators.required]]
    });
  }

  hide(){
    this.showModal = false;
    this.active = false;
  }

  back(){
    this._location.back();
  }

  onSubmitForm(){
    const formValue = this.addMoneyForm.value;
    let money = formValue['montant'];
    if(money < 1){
      this.montantValide = false;
    } else {
      this.montantValide = true; 
      this.porteMonnaieService.changeMoney(this.username, money).subscribe(res => {
        this.showModal = false;
        this.active = false; 
        window.location.reload();
      });
    }
    
  }

}
