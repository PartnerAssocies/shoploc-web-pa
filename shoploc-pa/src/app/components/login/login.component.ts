import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { first } from 'rxjs/operators';

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

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.initForm();
    this.inError = false;
    this.errorMessage = "";
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
        this.router.navigate(["/"]);
      },
      error => {
        console.log("[onSubmitForm] authentification échoué");
        this.isWait = false;
        this.errorMessage = "Informations de connexion incorrectes."
        this.inError = true;
      }
    );
  }
}

