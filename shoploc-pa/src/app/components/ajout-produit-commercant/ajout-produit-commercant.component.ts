import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProduitData } from 'src/app/models/data/ProduitData.model';
import { AuthService } from 'src/app/services/auth.service';
import { ProduitService } from 'src/app/services/produit.service';

@Component({
  selector: 'app-ajout-produit-commercant',
  templateUrl: './ajout-produit-commercant.component.html',
  styleUrls: ['./ajout-produit-commercant.component.scss']
})
export class AjoutProduitCommercantComponent implements OnInit {

  addProduitForm: FormGroup;
  isWait: boolean;

  constructor(private _location: Location,
              private formBuilder: FormBuilder,
              private router: Router,
              private authService: AuthService,
              private produitService: ProduitService) { }

  ngOnInit(): void {
    this.initForm();
    this.isWait = false;
  }

  initForm(){
    this.addProduitForm = this.formBuilder.group({
      libelle: ['', [Validators.required]],
      prix: ['', [Validators.required]],
      fidelitePointsRequis: ['', [Validators.required]],
      stock: ['', [Validators.required]],
    });
  }

  back(){
    this._location.back();
  }

  onSubmitForm(){
    this.isWait = true;
    const formValue = this.addProduitForm.value;

    const newProduit = new ProduitData(
      formValue['libelle'],
      formValue['prix'],
      formValue['stock'],
      formValue['fidelitePointsRequis'],
      +"",
      this.authService.currentUserValue.username,
      null
    )
    console.log(newProduit);

    this.produitService.addProduit(newProduit).subscribe(res => {
      this.isWait = false;
      this.router.navigate(["/commercant-produit"], {queryParams: { message: 'addproduitcommercantok' }});
    }, (err: HttpErrorResponse) => {
      this.isWait = false;
      console.log(err.message);
    });
  }

}
