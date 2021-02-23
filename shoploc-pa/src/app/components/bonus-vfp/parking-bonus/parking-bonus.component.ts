import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-parking-bonus',
  templateUrl: './parking-bonus.component.html',
  styleUrls: ['./parking-bonus.component.scss']
})
export class ParkingBonusComponent implements OnInit {

  bonusParkingForm: FormGroup;
  isWait: boolean;

  constructor(private _location : Location,
              private router : Router,
              private formBuilder : FormBuilder,
              private authService : AuthService,
              private userService : UserService) { }

  ngOnInit(): void {
    this.initForm();
    this.isWait = false;
  }

  initForm(){
    this.bonusParkingForm = this.formBuilder.group({
      plaque: ['', [Validators.required]]
    });
  }

  back(){
    this._location.back();
  }

  onSubmitForm(){
    const formValue = this.bonusParkingForm.value;
    let username = this.authService.currentUserValue.username;
    let plaque = formValue['plaque'];

    this.userService.addParkingAvantage(username, plaque).subscribe(res => {
      console.log(res);
      this.router.navigate(['statut-vfp']);
    }, (err: HttpErrorResponse) => {
      console.log(err);
    });

  }

}
