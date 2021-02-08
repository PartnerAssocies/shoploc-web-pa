import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
              private router : Router) { }

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

    if(bonus == 'parking'){
      this.router.navigate(['bonus-vfp/parking']);
    } else {
      this.router.navigate(['statut-vfp']);
    }
  }

}
