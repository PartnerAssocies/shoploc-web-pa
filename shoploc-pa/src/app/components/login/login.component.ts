import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { first } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';


/**
 * Component pour l'écran de connexion
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errorMessage: string;
  inError:boolean;
  isWait: boolean;
  returnUrl: string;
  message : string;
  isMessaged : boolean;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, 
              private router: Router, private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.initForm();
    this.inError = false;
    this.errorMessage = "";
    this.returnUrl = "";
    this.message = "";
    this.isMessaged = false;
    this.checkMessage();
  }

  /**
   * Initialise le formulaire de connexion.
   * Les champs "email" et "password" sont obligatoires
   */
  initForm() {
		this.loginForm = this.formBuilder.group({
			email: ['', Validators.required],
			password: ['', Validators.required]
		});
  }
  
  /**
   * Submit le formulaire de connexion.
   * On check si le formulaire est valide.
   * On tente de login avec les infos du formulaire.
   * Si le login est OK, on est redirigé vers l'acceuil de l'application.
   * Si le login est OK, on reste sur la mire de login.
   */
  onSubmitForm(){
    this.inError = false;  
    if(this.loginForm.invalid){
        this.errorMessage = "Remplissez tous les champs du formulaire de connexion."
        this.inError = true;
        return;
      }
    
    this.isWait = true;
    const formValue = this.loginForm.value;
    const email = formValue["email"];
    const password = formValue["password"];

    this.authService.login(email, password)  
    .pipe(first())
    .subscribe(
      data => {
        console.log("[onSubmitForm] authentification réussi");
        this.isWait = false;
        this.activateRoute.queryParams.subscribe(params => {
          console.log(params);
          this.returnUrl = params['returnUrl'];
          console.log(this.returnUrl);
        });
        if(this.returnUrl !== undefined){
          this.router.navigate([this.returnUrl]);
        } else {
          this.router.navigate(['/']);
        }
      },
      error => {
        console.log("[onSubmitForm] authentification échoué");
        if (error instanceof HttpErrorResponse && error.status === 423) {
          this.isWait = false;
          this.errorMessage = "Votre compte n'a pas encore été validé."
          this.inError = true;
          return;
        } 
        this.isWait = false;
        this.errorMessage = "Informations de connexion incorrectes."
        this.inError = true;
      }
    );
  }

  /**
   * Check dans les paramètre de l'url si on doit afficher un message ou non
   */
  checkMessage(){
    this.activateRoute.queryParams.subscribe(params => {
      if(!params && !params['message']){
        return;
      }
      if(params['message'] == "signupclientok"){
        this.message = "Votre inscription a réussi";
        this.isMessaged = true;
        return;
      }
      if(params['message'] == "signupcommercantok"){
        this.message = "Votre demande d'inscription a été envoyé";
        this.isMessaged = true;
        return;
      }
      
    });
  }
}

