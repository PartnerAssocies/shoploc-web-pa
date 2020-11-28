import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LieuBody } from 'src/app/models/LieuBody.model';
import { Lieu } from 'src/app/models/Lieu.model';
import { UserService } from 'src/app/services/user.service';
import { LieuService } from 'src/app/services/lieu.service';
import { User } from 'src/app/models/User.model';
import { Router } from '@angular/router';
import { HashService } from 'src/app/services/hash.service';
import { HttpErrorResponse } from '@angular/common/http';

/**
 * Component d'inscription client
 */
@Component({
  selector: 'app-client-sign-up',
  templateUrl: './client-sign-up.component.html',
  styleUrls: ['./client-sign-up.component.scss']
})
export class ClientSignUpComponent implements OnInit {

  signupForm: FormGroup;
  lieu: Lieu;
  errorMessage: string;
  inError: boolean

  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private lieuService: LieuService,
    private hashService: HashService,
    private router: Router) { }

    ngOnInit(): void {
      this.initForm();
      this.errorMessage = "";
      this.inError = false;
    }
  
    /**
     * Initialise le formulaire d'inscription.
     * Les champs "nom", "prenom", "username", "password", "confirmPassword", "adresse" et "ville" sont obligatoires
     */
    initForm(){
      this.signupForm = this.formBuilder.group({
        nom: ['', [Validators.required]],
        prenom: ['', [Validators.required]],
        username: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]],
        adresse: ['', [Validators.required]],
        ville: ['', [Validators.required]],
        role: ['CLIENT'],
        coordx: ['0'],
        coordy: ['0']
      }, {
        validator: this.mustMatch('password', 'confirmPassword')
      });
    }
  
    /**
     * Soumet le formulaire d'inscription.
     * On crée l'adresse de l'user
     * Si l'adresse est ok on crée l'user avec la référence de l'adresse
     * Si la création est ok on redirige vers l'écran de connexion
     */
    onSubmitForm(){
      this.inError = false;
      const formValue = this.signupForm.value;
      console.log(formValue);
      const newLieu = new LieuBody (
        formValue['adresse'],
        +formValue['coordX'],
        +formValue['coord'],
        formValue['ville']
      )
  
      this.lieuService.createLieu(newLieu).subscribe(res => {
        console.log(res);
        this.lieu = res;
  
        const newUser = new User(
          formValue['username'],
          this.hashService.hashPassword(formValue['password']),
          formValue['role'],
          +this.lieu.lid,
          formValue['nom'],
          formValue['prenom']
        )
          
        this.userService.registerClient(newUser).subscribe(response => {
          console.log(response);
          this.router.navigate(["/login"], {queryParams: { message: 'signupclientok' }});
        }, (err: HttpErrorResponse) => {
          this.inError = true;
          this.errorMessage = err.error.message;
        })
      }, (err: HttpErrorResponse) => {
        this.inError = true;
        this.errorMessage = err.error.message;
      })    
  
    }
  
    /**
     * Méthode qui vérifie que le paramètre controlName est strictement égal au paramètre matchingControlName
     * S'ils ne sont pas égaux, il sera alors impossible de soumettre le formulaire d'inscription
     * @param controlName 
     * @param matchingControlName 
     */
    mustMatch(controlName: string, matchingControlName: string){
      return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];
        if(matchingControl.errors && !matchingControl.errors.mustMatch){
          return;
        }
        if(control.value !== matchingControl.value){
          matchingControl.setErrors({mustMatch: true});
        } else {
          matchingControl.setErrors(null);
        }
      }
    }

}
