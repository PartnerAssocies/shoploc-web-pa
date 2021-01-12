import { Component, Input, OnInit } from '@angular/core';
import { LieuData } from 'src/app/models/data/LieuData.model';
import { LieuService } from 'src/app/services/lieu.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-commercant-list-element',
  templateUrl: './commercant-list-element.component.html',
  styleUrls: ['./commercant-list-element.component.scss']
})
export class CommercantListElementComponent implements OnInit {

  @Input()
  libelleMagasin : string;
  @Input()
  description : string;
  @Input()
  lienImage : string;
  @Input()
  lieu : LieuData;
  @Input()
  usernameMagasin : string;
  clicked : boolean;
  constructor(
    private lieuService : LieuService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.clicked = false;
  }

  detailCommercant(){
    this.clicked = true;
    this.router.navigate(['creation-commande-client'],{queryParams: { commercant: this.usernameMagasin }});
  }
}
