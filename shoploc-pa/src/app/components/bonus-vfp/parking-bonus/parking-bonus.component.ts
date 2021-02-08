import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
              private formBuilder : FormBuilder) { }

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
    this.router.navigate(['statut-vfp']);
  }

}
