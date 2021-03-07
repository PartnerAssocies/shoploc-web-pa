import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-activation-bonus-vfp',
  templateUrl: './activation-bonus-vfp.component.html',
  styleUrls: ['./activation-bonus-vfp.component.scss']
})
export class ActivationBonusVfpComponent implements OnInit {

  bonusVfpForm: FormGroup;
  isWait: boolean;

  constructor(private _location : Location,
              private formBuilder : FormBuilder,
              private router : Router,
              private userService : UserService,
              private authService : AuthService) { }

  ngOnInit(): void {
    this.initForm();
    this.isWait = false;
  }

  initForm(){
    this.bonusVfpForm = this.formBuilder.group({
      bonus: ['', [Validators.required]]
    });
  }

  back(){
    this._location.back();
  }

  onSubmitForm(){
    this.isWait = true;
    const formValue = this.bonusVfpForm.value;
    let bonus = formValue['bonus'];
    let username = this.authService.currentUserValue.username;

    if(bonus == 'parking'){
      this.router.navigate(['bonus-vfp/parking']);
    } else {
      this.userService.addTransportAvantage(username).subscribe(res => {
        console.log(res);
        this.router.navigate(['statut-vfp']);
      }, (err : HttpErrorResponse) => {
        console.log(err);
      });
    }
  }

}
