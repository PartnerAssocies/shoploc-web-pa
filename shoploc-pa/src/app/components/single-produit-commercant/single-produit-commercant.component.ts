import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddStockProduitRequestBody } from 'src/app/models/http/requestBody/AddStockProduitRequestBody.model';
import { ProduitService } from 'src/app/services/produit.service';

@Component({
  selector: 'app-single-produit-commercant',
  templateUrl: './single-produit-commercant.component.html',
  styleUrls: ['./single-produit-commercant.component.scss']
})
export class SingleProduitCommercantComponent implements OnInit {

  @Input()
  libelle : string;
  @Input()
  prix : number;
  @Input()
  stock : number;
  @Input()
  fidelitePointsRequis : number;
  @Input()
  image: string;
  @Input()
  pid: number;

  initialStock: number;
  error: string;
  inError: boolean;
  stockForm: FormGroup;

  constructor(private produitService : ProduitService,
              private router : Router,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initialStock = this.stock;
    this.error = "Vous ne pouvez pas diminuer ou ajouter une quantité nulle de stock";
    this.inError = false;
    this.initForm();
  }

  initForm(){
    this.stockForm = this.formBuilder.group({
      stock: ['', [Validators.required]],
    });
    this.stockForm.patchValue({
      stock: this.initialStock
    });
  }

  onSubmitForm(){
    const formValue = this.stockForm.value;
    if(formValue['stock'] - this.initialStock <= 0){
      this.inError = true;
    } else {
      this.inError = false;
      const newStock = formValue['stock'] - this.initialStock;
      const addStockProduit = new AddStockProduitRequestBody(
        this.pid,
        newStock
      )
      this.produitService.addStock(addStockProduit).subscribe(res => {
        window.location.reload();
      })
    }
  }

  deleteProduit(){
    this.produitService.deleteProduit(this.pid).subscribe(res => {
      console.log(res);
      window.location.reload();
    });
  }

}
