import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { LieuService } from 'src/app/services/lieu.service';
import { Router } from '@angular/router';
import { HashService } from 'src/app/services/hash.service';

@Component({
  selector: 'app-commercant-sign-up',
  templateUrl: './commercant-sign-up.component.html',
  styleUrls: ['./commercant-sign-up.component.scss']
})
export class CommercantSignUpComponent implements OnInit {

  etape1Form:FormGroup;
  etape2Form:FormGroup;
  etape3Form:FormGroup;
  etapeFinalForm:FormGroup;

  errorMessage: string;
  inError: boolean;

  public etape1: boolean;
  public etape2:boolean;
  public etape3:boolean;
  public etapeFinal:boolean;

  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private lieuService: LieuService,
    private hashService: HashService,
    private router: Router) { }

  ngOnInit(): void {
    this.initForm();
    this.errorMessage = "";
    this.inError = false;
    this.etape1 = true;
    this.etape2 = false;
    this.etape3 = false;
    this.etapeFinal = false;
  }

   /**
     * Initialise le formulaire d'inscription.
     * 
     */
  initForm(){
    this.etape1Form = this.formBuilder.group({
      nom: ['', [Validators.required]],
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    },{
      validator: this.mustMatch('password', 'confirmPassword')
    });

    this.etape2Form = this.formBuilder.group({
      adresse: ['', [Validators.required]],
      ville: ['', [Validators.required]]
    });
    
    this.etape3Form = this.formBuilder.group({
      siret : ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(14), Validators.maxLength(14)]]
    });

    this.etapeFinalForm =this.formBuilder.group({});
  }

  /**
   * Soument le formulaire d'inscription
   * On créé l'adresse du commerçant
   * Si l'adresse du commerçant est OK 
   * @param etape l'étape du formulaire qui est submit
   */
  onSubmitForm(etape:string){
    if("etape-1" == etape){
      this.etape1 = false;
      this.etape2 = true;
      return;
    }
    if("etape-2" == etape){
      this.etape2 = false;
      this.etape3 = true;
      return;
    }
    if("etape-3" == etape){
      this.etape3 = false;
      this.etapeFinal = true;
      return;
    }

    
  }  

  /**
   * Permet de retourner à l'étape précédente du formulaire
   * @param String etape : l'étape à laquelle on veut retourner 
   */
  retour(etape:string){
    if("etape-1" == etape){
      this.etape1 = true;
      this.etape2 = false;
      return;
    }
    if("etape-2" == etape){
      this.etape2 = true;
      this.etape3 = false;
      return;
    }
    if("etape-3" == etape){
      this.etape3 = true;
      this.etapeFinal = false;
      return;
    }
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
